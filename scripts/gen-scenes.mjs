/**
 * gen:scenes — Higgsfield scene pipeline (Master_PRP §6).
 *
 * Per scene: soul text-to-image still → DoP image-to-video clip →
 * ffmpeg compress to webm+mp4 (<3MB target, muted loop) + webp poster.
 * Outputs land in /public/videos — SceneVideo picks them up with zero
 * code changes.
 *
 * Usage (HF_CREDENTIALS from .env.local via --env-file, see package.json):
 *   npm run gen:scenes                    # all six scenes
 *   npm run gen:scenes -- --scene scene-monolith
 *   npm run gen:scenes -- --stills-only   # cheap pass: posters only, review before video spend
 *
 * Never commit credentials. Generated media in /public is committed.
 */

import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync, statSync } from "node:fs";
import path from "node:path";
import { higgsfield, config } from "@higgsfield/client/v2";
import { SCENES } from "./scenes.config.mjs";

const VIDEOS_DIR = path.resolve("public/videos");
const POSTERS_DIR = path.join(VIDEOS_DIR, "posters");
const TMP_DIR = path.resolve("scripts/.gen-tmp");

const args = process.argv.slice(2);
const onlyScene = args.includes("--scene") ? args[args.indexOf("--scene") + 1] : null;
const stillsOnly = args.includes("--stills-only");

if (!process.env.HF_CREDENTIALS) {
  console.error("HF_CREDENTIALS missing. Run via npm script (uses --env-file=.env.local).");
  process.exit(1);
}
config({ credentials: process.env.HF_CREDENTIALS });

async function download(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`download failed ${res.status}: ${url}`);
  writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
  return dest;
}

const mb = (f) => (statSync(f).size / 1024 / 1024).toFixed(2);

async function generateStill(scene) {
  console.log(`  [t2i] soul still…`);
  // NB: live API expects { params: {...} }; SDK v0.2.1 spreads input as the
  // body root, so we wrap here.
  const res = await higgsfield.subscribe("/v1/text2image/soul", {
    input: {
      params: {
        prompt: scene.still,
        width_and_height: "2048x1152", // 16:9 (API enum)
        quality: "1080p",
        batch_size: 1,
        enhance_prompt: true,
      },
    },
    withPolling: true,
  });
  const url = res.images?.[0]?.url;
  if (res.status !== "completed" || !url) {
    throw new Error(`still failed: status=${res.status}`);
  }
  return url;
}

async function generateClip(scene, stillUrl) {
  console.log(`  [i2v] DoP clip…`);
  const res = await higgsfield.subscribe("/v1/image2video/dop", {
    input: {
      params: {
        model: "dop-standard",
        prompt: scene.motion,
        input_images: [{ type: "image_url", image_url: stillUrl }],
        enhance_prompt: false, // motion prompt is deliberate — don't rewrite it
      },
    },
    withPolling: true,
  });
  const url = res.video?.url;
  if (res.status !== "completed" || !url) {
    throw new Error(`clip failed: status=${res.status}`);
  }
  return url;
}

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

for (const scene of scenes) {
  console.log(`\n▸ ${scene.id}`);
  try {
    const stillUrl = await generateStill(scene);
    const stillPath = await download(stillUrl, path.join(TMP_DIR, `${scene.id}-still.png`));
    poster(scene.id, stillPath, false);

    if (stillsOnly) {
      console.log(`  [skip] stills-only mode — review poster, then run without --stills-only`);
      continue;
    }

    const clipUrl = await generateClip(scene, stillUrl);
    const rawPath = await download(clipUrl, path.join(TMP_DIR, `${scene.id}-raw.mp4`));
    compress(scene.id, rawPath);
  } catch (err) {
    console.error(`  ✗ ${scene.id}: ${err.message}`);
    console.error(`    (other scenes continue; SceneVideo falls back gracefully)`);
  }
}

console.log("\nDone. SceneVideo picks up /public/videos automatically.");
