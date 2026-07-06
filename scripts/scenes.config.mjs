/**
 * Scene definitions for the Journey homepage (Master_PRP §6).
 *
 * Two prompts per scene:
 *  - `still`  → /v1/text2image/soul  (the establishing frame; also the poster)
 *  - `motion` → /v1/image2video/dop  (how the frame moves; DoP animates the still)
 *
 * All stills share STYLE so the six scenes read as one film.
 */

export const STYLE =
  "dark near-black background, deep space black #0A0A0F, abstract, cinematic, " +
  "subtle cyan and electric blue glow, volumetric light, no text, no people, " +
  "no faces, high detail, shallow depth of field, film still";

export const SCENES = [
  {
    id: "scene-security",
    still:
      "Streams of encrypted data flowing through dark space as thin luminous blue lines, " +
      "a single red anomaly pulse detected and isolated among the streams, " +
      STYLE,
    motion:
      "Slow continuous flow of the data streams left to right, the red anomaly pulses gently, " +
      "subtle camera drift forward, seamless loop, calm and precise",
  },
  {
    id: "scene-monolith",
    still:
      "A dense monolithic wireframe cube of tangled glowing blue circuitry beginning to crack, " +
      "sixteen clean modular blocks separating from it and aligning into an ordered grid, " +
      STYLE,
    motion:
      "The monolith slowly fractures, modular blocks drift apart and align into a grid, " +
      "fine debris particles float, slow orbital camera, seamless loop",
  },
  {
    id: "scene-rag",
    still:
      "A document dissolving into a suspended cloud of thousands of glowing violet and cyan points " +
      "in 3D vector space, a thin beam of light threading through, nearest points illuminated and connected, " +
      STYLE,
    motion:
      "The point cloud slowly rotates and breathes, the light beam sweeps through and nearby points " +
      "brighten in its wake, seamless loop, weightless",
  },
  {
    id: "scene-signal",
    still:
      "Six luminous signal paths crossing a dark network landscape, five paths dim and fading, " +
      "one bright emerald-cyan route converging stable and strong, " +
      STYLE,
    motion:
      "Light pulses travel along the bright route, the dim paths flicker faintly and recede, " +
      "slow lateral camera drift, seamless loop",
  },
  {
    id: "scene-ship",
    still:
      "A calm field of small light packets deploying across a vast dark grid, " +
      "pipelines of soft blue light flowing left to right toward a horizon, " +
      STYLE,
    motion:
      "Continuous steady flow of light packets along the pipelines left to right, " +
      "gentle parallax, ambient and unhurried, seamless loop",
  },
  {
    id: "scene-now",
    still:
      "A steady pulsing core node of warm cyan light with small orbiting agent lights around it, " +
      "quiet forward momentum in dark space, " +
      STYLE,
    motion:
      "The core pulses slowly like a heartbeat, orbiting lights circle at different speeds, " +
      "very slow push-in, seamless loop, alive and calm",
  },
];
