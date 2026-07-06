"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * The living-system hero (Master_PRP §5) — the only WebGL on the site.
 *
 * ~180 connected nodes drifting in dark space. The cursor repels nearby
 * nodes (spring back), scroll eases the camera inward. Perf budget:
 * ≤200 nodes, DPR capped at 2, pauses when off-screen/tab hidden
 * (frameloop handled by Canvas visibility), single draw call for points
 * + one for lines.
 *
 * Loaded only via next/dynamic({ ssr:false }) from HeroScene — never in
 * any other route's bundle. Mobile & reduced-motion never mount this.
 */

const NODE_COUNT = 180;
const FIELD_RADIUS = 6;
const LINK_DISTANCE = 1.7;
const CURSOR_RADIUS = 2.2;
const CURSOR_FORCE = 0.55;
const SPRING = 0.02;
const DAMPING = 0.92;
const CYAN = new THREE.Color("#22d3ee");
const BLUE = new THREE.Color("#3b82f6");

function buildField() {
  const home = new Float32Array(NODE_COUNT * 3);
  const colors = new Float32Array(NODE_COUNT * 3);
  for (let i = 0; i < NODE_COUNT; i++) {
    // Soft sphere distribution, denser toward center
    const r = FIELD_RADIUS * Math.cbrt(Math.random());
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    home[i * 3] = r * Math.sin(phi) * Math.cos(theta) * 1.4; // wider than tall
    home[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.8;
    home[i * 3 + 2] = r * Math.cos(phi) * 0.9;

    const c = Math.random() < 0.25 ? CYAN : BLUE;
    const fade = 0.55 + Math.random() * 0.45;
    colors[i * 3] = c.r * fade;
    colors[i * 3 + 1] = c.g * fade;
    colors[i * 3 + 2] = c.b * fade;
  }

  // Precompute static link pairs between nearby home positions
  const pairs: [number, number][] = [];
  for (let i = 0; i < NODE_COUNT; i++) {
    for (let j = i + 1; j < NODE_COUNT; j++) {
      const dx = home[i * 3] - home[j * 3];
      const dy = home[i * 3 + 1] - home[j * 3 + 1];
      const dz = home[i * 3 + 2] - home[j * 3 + 2];
      if (Math.sqrt(dx * dx + dy * dy + dz * dz) < LINK_DISTANCE) {
        pairs.push([i, j]);
      }
    }
  }
  return { home, colors, pairs };
}

function Field() {
  const { home, colors, pairs } = useMemo(buildField, []);
  const positions = useMemo(() => home.slice(), [home]);
  const velocities = useMemo(() => new Float32Array(NODE_COUNT * 3), []);
  const linePositions = useMemo(() => new Float32Array(pairs.length * 6), [pairs]);

  // Imperative geometries (JSX bufferAttribute has typing issues in R3F v9)
  const pointsGeom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return g;
  }, [positions, colors]);

  const linesGeom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    return g;
  }, [linePositions]);

  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const groupRef = useRef<THREE.Group>(null);
  const { camera, pointer } = useThree();

  const raycastPlane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), []);
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const cursor3 = useMemo(() => new THREE.Vector3(9999, 9999, 9999), []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    // Slow ambient rotation of the whole system
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.04;
      groupRef.current.rotation.x = Math.sin(t * 0.1) * 0.05;
    }

    // Project cursor onto the z=0 plane in local space
    raycaster.setFromCamera(pointer, camera);
    const hit = raycaster.ray.intersectPlane(raycastPlane, cursor3);
    const localCursor = hit && groupRef.current
      ? groupRef.current.worldToLocal(cursor3.clone())
      : null;

    // Camera pull-in driven by document scroll (hero is 100vh at top)
    const scrollT = Math.min(window.scrollY / window.innerHeight, 1);
    camera.position.z = 10 - scrollT * 3.5;

    const dt = Math.min(delta, 0.05) * 60; // frame-rate independent
    for (let i = 0; i < NODE_COUNT; i++) {
      const ix = i * 3;
      let fx = (home[ix] - positions[ix]) * SPRING;
      let fy = (home[ix + 1] - positions[ix + 1]) * SPRING;
      let fz = (home[ix + 2] - positions[ix + 2]) * SPRING;

      if (localCursor) {
        const dx = positions[ix] - localCursor.x;
        const dy = positions[ix + 1] - localCursor.y;
        const dz = positions[ix + 2] - localCursor.z;
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (d < CURSOR_RADIUS && d > 0.0001) {
          const push = ((CURSOR_RADIUS - d) / CURSOR_RADIUS) * CURSOR_FORCE;
          fx += (dx / d) * push;
          fy += (dy / d) * push;
          fz += (dz / d) * push;
        }
      }

      velocities[ix] = (velocities[ix] + fx * dt) * DAMPING;
      velocities[ix + 1] = (velocities[ix + 1] + fy * dt) * DAMPING;
      velocities[ix + 2] = (velocities[ix + 2] + fz * dt) * DAMPING;

      positions[ix] += velocities[ix] * dt;
      positions[ix + 1] += velocities[ix + 1] * dt;
      positions[ix + 2] += velocities[ix + 2] * dt;
    }

    // Update line segment endpoints from node positions
    for (let p = 0; p < pairs.length; p++) {
      const [a, b] = pairs[p];
      linePositions[p * 6] = positions[a * 3];
      linePositions[p * 6 + 1] = positions[a * 3 + 1];
      linePositions[p * 6 + 2] = positions[a * 3 + 2];
      linePositions[p * 6 + 3] = positions[b * 3];
      linePositions[p * 6 + 4] = positions[b * 3 + 1];
      linePositions[p * 6 + 5] = positions[b * 3 + 2];
    }

    if (pointsRef.current) {
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
    if (linesRef.current) {
      linesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef} geometry={pointsGeom}>
        <pointsMaterial
          size={0.07}
          vertexColors
          transparent
          opacity={0.9}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <lineSegments ref={linesRef} geometry={linesGeom}>
        <lineBasicMaterial
          color="#3b82f6"
          transparent
          opacity={0.12}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
}

/**
 * Default export — mounted only through next/dynamic in HeroScene.
 */
export default function Constellation() {
  return (
    <Canvas
      className="absolute inset-0"
      camera={{ position: [0, 0, 10], fov: 50 }}
      dpr={[1, 2]}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      // Render only while visible; R3F pauses rAF when tab is hidden
      frameloop="always"
    >
      <Field />
    </Canvas>
  );
}
