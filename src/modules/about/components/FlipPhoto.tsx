"use client";

import Image from "next/image";
const cn = (...a: (string|false|undefined)[]) => a.filter(Boolean).join(" ");

type FlipPhotoProps = {
  frontSrc: string;
  backSrc: string;
  alt?: string;
  size?: number;
  className?: string;
  rounded?: string;
};

export default function FlipPhoto({
  frontSrc,
  backSrc,
  alt = "Profile",
  size = 280, 
  className,
  rounded = "rounded-3xl",
}: FlipPhotoProps) {
  const responsiveSize = `min(90vw, ${size}px)`;

  return (
    <div
      className={cn(
        "group relative w-full mx-auto [perspective:1200px]",
        className
      )}
      style={{
        width: responsiveSize,
        height: responsiveSize,
        maxWidth: '100%',
        aspectRatio: '1/1'
      }}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 blur-2xl opacity-50 transition-opacity duration-500",
          "bg-[radial-gradient(circle_at_30%_20%,#60a5fa_0%,transparent_45%),radial-gradient(circle_at_70%_80%,#a78bfa_0%,transparent_40%)]",
          "group-hover:opacity-80",
          rounded
        )}
      />
      <div
        className={cn(
          "relative h-full w-full transform-gpu will-change-transform",
          "transition-transform duration-700 [transform-style:preserve-3d]",
          "bg-zinc-900/40 border border-white/10 shadow-[0_6px_40px_-10px_rgba(0,0,0,0.5)]",
          "group-hover:[transform:rotateY(180deg)]",
          rounded
        )}
      >
        <div className={cn("absolute inset-0 overflow-hidden [backface-visibility:hidden]", rounded)}>
          <Image
            src={frontSrc}
            alt={alt}
            fill
            priority
            sizes={`${size}px`}
            className={cn("object-cover opacity-95", rounded)}
          />
          <div className={cn("absolute inset-0 ring-1 ring-white/10", rounded)} />
        </div>

        <div className={cn(
          "absolute inset-0 grid place-items-center bg-zinc-900/70",
          "[transform:rotateY(180deg)] [backface-visibility:hidden]",
          rounded
        )}>
         <Image
            src={backSrc}
            alt={alt}
            fill
            priority
            sizes={`${size}px`}
            className={cn("object-cover opacity-95", rounded)}
          />
          <div className={cn("absolute inset-0 ring-1 ring-white/10", rounded)} />
        </div>
      </div>
    </div>
  );
}