import { motion, useReducedMotion } from "framer-motion";

/** Slow-drifting cyan light pools. Each blob has a different period so the
 *  composite never visibly repeats. */
const blobs = [
  {
    className: "left-[-10%] top-[-15%] h-[38rem] w-[38rem] bg-aether-primary/25",
    animate: { x: [0, 120, -40, 0], y: [0, 70, 140, 0], scale: [1, 1.15, 0.95, 1] },
    duration: 26,
  },
  {
    className: "right-[-15%] top-[20%] h-[32rem] w-[32rem] bg-[#0B2551]/60",
    animate: { x: [0, -110, 50, 0], y: [0, 90, -60, 0], scale: [1, 0.9, 1.2, 1] },
    duration: 32,
  },
  {
    className: "bottom-[-20%] left-[25%] h-[34rem] w-[34rem] bg-[#A4F4FD]/15",
    animate: { x: [0, 80, -90, 0], y: [0, -70, 40, 0], scale: [1, 1.1, 0.9, 1] },
    duration: 38,
  },
];

export function AuroraBackground({ className = "" }: { className?: string }) {
  const reduced = useReducedMotion();

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {blobs.map((blob, index) => (
        <motion.div
          key={index}
          className={`absolute rounded-full blur-[100px] ${blob.className}`}
          animate={reduced ? undefined : blob.animate}
          transition={{ duration: blob.duration, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      {/* Fine grid gives the light something to sit against. */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse at 50% 40%, #000 20%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 40%, #000 20%, transparent 75%)",
        }}
      />
    </div>
  );
}
