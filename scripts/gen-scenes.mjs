/**
 * gen:scenes — Higgsfield scene pipeline (Master_PRP §6).
 *
 * Per scene: soul text-to-image still → DoP image-to-video clip →
 * ffmpeg compress to webm+mp4 (<3MB target, muted loop) + webp poster.
 * Outputs land in /public/videos — SceneVideo picks them up with zero
 * code changes.
 *
 * Talks to the live platform API directly (the @higgsfield/client SDK
 * predates the current API shape):
 *   POST https://platform.higgsfield.ai/v1/<endpoint>  { params: {...} }
 *     → job set { id, jobs: [{ id, status, results }] }
 *   GET  https://platform.higgsfield.ai/v1/job-sets/<id>   (poll)
 *     → jobs[].status: queued | in_progress | completed | failed | nsfw
 *     → jobs[].results.raw.url  (png for t2i, mp4 for i2v)
 *
 * Usage (HF_CREDENTIALS from .env.local via --env-file, see package.json):
 *   npm run gen:scenes                    # all six scenes
 *   npm run gen:scenes -- --scene scene-monolith
 *   npm run gen:scenes -- --stills-only   # cheap pass: posters only, review before video spend
 *
 * Never commit credentials. Generated media in /public is committed.
 */

import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync, readFileSync, existsSync, statSync } from "node:fs";
import path from "node:path";
import { SCENES } from "./scenes.config.mjs";

const BASE = "https://platform.higgsfield.ai";
const VIDEOS_DIR = path.resolve("public/videos");
const POSTERS_DIR = path.join(VIDEOS_DIR, "posters");
const TMP_DIR = path.resolve("scripts/.gen-tmp");
const POLL_MS = 5000;
const MAX_POLL_MS = 10 * 60 * 1000;

const args = process.argv.slice(2);
const onlyScene = args.includes("--scene") ? args[args.indexOf("--scene") + 1] : null;
const stillsOnly = args.includes("--stills-only");

const CREDS = process.env.HF_CREDENTIALS;
if (!CREDS) {
  console.error("HF_CREDENTIALS missing. Run via npm script (uses --env-file=.env.local).");
  process.exit(1);
}
const HEADERS = { Authorization: `Key ${CREDS}`, "Content-Type": "application/json" };

async function submit(endpoint, params) {
  const res = await fetch(`${BASE}${endpoint}`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({ params }),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(`${endpoint} ${res.status}: ${JSON.stringify(body).slice(0, 200)}`);
  }
  return body; // job set
}

async function pollJobSet(id) {
  const start = Date.now();
  while (Date.now() - start < MAX_POLL_MS) {
    const res = await fetch(`${BASE}/v1/job-sets/${id}`, { headers: HEADERS });
    if (res.ok) {
      const set = await res.json();
      const job = set.jobs?.[0];
      if (job?.status === "completed") return job;
      if (job?.status === "failed" || job?.status === "nsfw") {
        throw new Error(`job ${job.status}`);
      }
    }
    await new Promise((r) => setTimeout(r, POLL_MS));
  }
  throw new Error(`polling timed out after ${MAX_POLL_MS / 1000}s (job set ${id})`);
}

async function generate(endpoint, params) {
  const set = await submit(endpoint, params);
  const job = await pollJobSet(set.id);
  const url = job.results?.raw?.url;
  if (!url) throw new Error("completed but no results.raw.url");
  return url;
}

async function download(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`download failed ${res.status}: ${url}`);
  writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
  return dest;
}

const mb = (f) => (statSync(f).size / 1024 / 1024).toFixed(2);

function compress(id, rawPath) {
  const webm = path.join(VIDEOS_DIR, `${id}.webm`);
  const mp4 = path.join(VIDEOS_DIR, `${id}.mp4`);
  // Muted, 1280w, quality-targeted two outputs. CRF tuned for <3MB on ~6s clips.
  execFileSync("ffmpeg", ["-y", "-i", rawPath, "-an", "-vf", "scale=1280:-2",
    "-c:v", "libvpx-vp9", "-crf", "40", "-b:v", "0", webm], { stdio: "pipe" });
  execFileSync("ffmpeg", ["-y", "-i", rawPath, "-an", "-vf", "scale=1280:-2",
    "-c:v", "libx264", "-crf", "28", "-preset", "slow", "-pix_fmt", "yuv420p",
    "-movflags", "+faststart", mp4], { stdio: "pipe" });
  console.log(`  [ffmpeg] ${id}.webm ${mb(webm)}MB · ${id}.mp4 ${mb(mp4)}MB`);
}

function poster(id, srcPath, isVideo) {
  const out = path.join(POSTERS_DIR, `${id}.webp`);
  const inputArgs = isVideo ? ["-i", srcPath, "-frames:v", "1"] : ["-i", srcPath];
  execFileSync("ffmpeg", ["-y", ...inputArgs, "-vf", "scale=1280:-2",
    "-quality", "80", out], { stdio: "pipe" });
  console.log(`  [poster] posters/${id}.webp ${mb(out)}MB`);
}

const scenes = SCENES.filter((s) => !onlyScene || s.id === onlyScene);
if (scenes.length === 0) {
  console.error(`No scene matches "${onlyScene}". Ids: ${SCENES.map((s) => s.id).join(", ")}`);
  process.exit(1);
}

[VIDEOS_DIR, POSTERS_DIR, TMP_DIR].forEach((d) => mkdirSync(d, { recursive: true }));

// Still-URL manifest: don't re-bill t2i for scenes whose still already exists.
const MANIFEST = path.join(TMP_DIR, "manifest.json");
const manifest = existsSync(MANIFEST) ? JSON.parse(readFileSync(MANIFEST, "utf8")) : {};
const saveManifest = () => writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2));

// Sequential on purpose: the platform caps concurrent requests at 4, and
// sequential keeps credit spend observable scene by scene.
for (const scene of scenes) {
  console.log(`\n▸ ${scene.id}`);
  try {
    let stillUrl = manifest[scene.id];
    if (stillUrl) {
      console.log(`  [t2i] reusing cached still (manifest)`);
    } else {
      console.log(`  [t2i] soul still…`);
      stillUrl = await generate("/v1/text2image/soul", {
        prompt: scene.still,
        width_and_height: "2048x1152", // 16:9 (API enum)
        quality: "1080p",
        batch_size: 1,
        enhance_prompt: false, // prompts are deliberate — don't rewrite them
      });
      manifest[scene.id] = stillUrl;
      saveManifest();
      const stillPath = await download(stillUrl, path.join(TMP_DIR, `${scene.id}-still.png`));
      poster(scene.id, stillPath, false);
    }

    if (stillsOnly) {
      console.log(`  [skip] stills-only mode — review poster, then run without --stills-only`);
      continue;
    }

    console.log(`  [i2v] DoP clip…`);
    const clipUrl = await generate("/v1/image2video/dop", {
      model: "dop-turbo", // live enum: dop-lite | dop-preview | dop-turbo
      prompt: scene.motion,
      input_images: [{ type: "image_url", image_url: stillUrl }],
      enhance_prompt: false,
    });
    const rawPath = await download(clipUrl, path.join(TMP_DIR, `${scene.id}-raw.mp4`));
    compress(scene.id, rawPath);
  } catch (err) {
    console.error(`  ✗ ${scene.id}: ${err.message}`);
    console.error(`    (other scenes continue; SceneVideo falls back gracefully)`);
  }
}

console.log("\nDone. SceneVideo picks up /public/videos automatically.");
