"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ArrowRight, MapPin } from "lucide-react";
import { useMemo, useRef } from "react";
import { Button } from "@/components/ui/button";

const style = {
  cardLg: { boxShadow: "inset 0 0 80px rgba(255,255,255,0.10)" },
};

/* ---------- dotted globe internals ---------- */
function useDotTexture(rgb: string = "255,255,255") {
  return useMemo(() => {
    const size = 64;
    const c = document.createElement("canvas");
    c.width = size;
    c.height = size;
    const ctx = c.getContext("2d")!;
    const g = ctx.createRadialGradient(
      size / 2,
      size / 2,
      0,
      size / 2,
      size / 2,
      size / 2
    );
    g.addColorStop(0, `rgba(${rgb},1)`);
    g.addColorStop(0.6, `rgba(${rgb},0.35)`);
    g.addColorStop(1, `rgba(${rgb},0)`);
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.fill();
    const tex = new THREE.CanvasTexture(c);
    tex.needsUpdate = true;
    return tex;
  }, [rgb]);
}

function DottedGlobe({
  radius = 1,
  count = 3400,
  rotationSpeed = 0.06,
  yOffset = -1.6,
  dotColor = "#60A5FA", // blue dots
  spriteRgb = "255,255,255", // white sprite for clean tinting
  atmosphere = "#60A5FA", // blue rim glow
}: {
  radius?: number;
  count?: number;
  rotationSpeed?: number;
  yOffset?: number;
  dotColor?: string;
  spriteRgb?: string; // "r,g,b"
  atmosphere?: string;
}) {
  const group = useRef<THREE.Group>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const u = Math.random() * 2 - 1;
      const phi = Math.random() * Math.PI * 2;
      const theta = Math.acos(u);
      arr[i * 3 + 0] = radius * Math.sin(theta) * Math.cos(phi);
      arr[i * 3 + 1] = radius * Math.cos(theta);
      arr[i * 3 + 2] = radius * Math.sin(theta) * Math.sin(phi);
    }
    return arr;
  }, [count, radius]);

  const texture = useDotTexture(spriteRgb);

  useFrame((_, d) => {
    if (group.current) group.current.rotation.y += d * rotationSpeed;
  });

  return (
    <group ref={group} rotation={[0.3, -0.6, 0]} position={[0, yOffset, 0]}>
      {/* atmosphere */}
      <mesh scale={1}>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshBasicMaterial
          color={atmosphere}
          transparent
          opacity={0.18}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* dots */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.032}
          sizeAttenuation
          map={texture}
          transparent
          depthWrite={false}
          alphaTest={0.01}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
          color={dotColor}
        />
      </points>
    </group>
  );
}

/* ---------- tiny badge ---------- */
function Badge({
  children,
  highlight = false,
}: {
  children: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm font-medium
        ${
          highlight
            ? "bg-blue-500/15 text-blue-200 ring-1 ring-blue-400/30"
            : "bg-zinc-800/60 text-zinc-300 ring-1 ring-zinc-700/60"
        }`}
    >
      {children}
    </span>
  );
}

export const PMCardMiddleLeft = () => (
  <div
    style={style.cardLg}
    className="
      group border relative flex size-full flex-col justify-between overflow-hidden rounded-xl
      hover:[box-shadow:inset_0_0_100px_rgba(255,255,255,0.14)]
      transform-gpu
      col-span-6 md:col-span-3 lg:col-span-2 md:row-span-2 max-md:h-[32rem]
    "
  >
    {/* BACKGROUND LAYER */}
    <div className="absolute inset-0 -z-10 pointer-events-none">
      {/* base true black */}
      <div className="absolute inset-0 bg-black"/>

      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[70%]"
        style={{
          background: `
      radial-gradient(
        125% 90% at 50% 100%,
        rgba(96,165,250,0.45) 0%,
        rgba(96,165,250,0.12) 45%,
        rgba(0,0,0,0.6) 70%,
        rgba(0,0,0,1) 90%
      )`,
          filter: "blur(1px)",
        }}
      />

      {/* full-card canvas; globe anchored at bottom via yOffset */}
      <Canvas
        className="absolute inset-0"
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 4.2], fov: 45, near: 0.1, far: 100 }}
      >
        <ambientLight intensity={0.35} />
        <DottedGlobe
          yOffset={-1.6}
          radius={1.55}
          dotColor="#60A5FA"
          spriteRgb="255,255,255"
          atmosphere="#60A5FA"
        />
      </Canvas>
    </div>

    {/* CONTENT (on top) */}
    <div className="px-6 pt-6 md:pt-16  text-center relative z-10">
      <h4 className="bg-linear-to-b from-[#DAD4E7] to-[#7F9ACE] bg-clip-text px-4 text-center text-3xl leading-[120%] font-bold tracking-tighter text-transparent select-none dark:from-[#edeffd]">
        I&apos;m very flexible with time zone communications
      </h4>
      <div className="mt-8 flex items-center justify-center gap-3">
        <Badge>🇬🇧 UK</Badge>
        <Badge highlight>🇺🇸 USA</Badge>
        <Badge>🇮🇳 India</Badge>
      </div>
      <div className="mt-6 flex items-center justify-center gap-2">
        <Badge highlight>Around the globe</Badge>
      </div>
    </div>

    <div className="flex-1" />

    <div className="flex items-center justify-between px-6 pb-6 pt-4 relative z-10">
      <div className="space-y-2">
        <MapPin className="size-12 text-zinc-600" />
        <div className=" text-zinc-300">Remote</div>
        <div className="text-sm font-semibold text-zinc-100">USA</div>
      </div>
      <Button className="group inline-flex items-center gap-2 rounded-lg bg-zinc-900/70 px-3 py-1.5 ring-1 ring-zinc-700 hover:ring-zinc-500 transition text-sm">
        Connect now{" "}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </Button>
    </div>
  </div>
);
