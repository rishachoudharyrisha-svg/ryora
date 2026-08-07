import { cn } from "@/lib/utils";
import { useRef, type CSSProperties, type PointerEvent, type ReactNode } from "react";

const radiusClass = {
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
  /** Defer to the consumer's own border-radius (e.g. the 44px pricing card). */
  none: "",
} as const;

/**
 * Draws a 1px gradient ring that follows the cursor across the element.
 *
 * The ring is a radial gradient clipped to a hairline by compositing two masks
 * — one on the content box, one on the padding box — and excluding the overlap.
 * Position is passed down as CSS custom properties so tracking never triggers a
 * React re-render.
 */
export function SpotlightBorder({
  children,
  className,
  radius = "2xl",
  size = 460,
  intensity = 0.5,
}: {
  children: ReactNode;
  className?: string;
  radius?: keyof typeof radiusClass;
  size?: number;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const track = (event: PointerEvent<HTMLDivElement>) => {
    const element = ref.current;
    if (!element) return;
    const bounds = element.getBoundingClientRect();
    element.style.setProperty("--spot-x", `${event.clientX - bounds.left}px`);
    element.style.setProperty("--spot-y", `${event.clientY - bounds.top}px`);
  };

  // Park the spotlight off-canvas so the ring fades out when the cursor leaves.
  const reset = () => {
    ref.current?.style.setProperty("--spot-x", "-9999px");
    ref.current?.style.setProperty("--spot-y", "-9999px");
  };

  const ringStyle: CSSProperties = {
    padding: "1px",
    background: `radial-gradient(circle var(--spot-size) at var(--spot-x) var(--spot-y), rgba(0,242,255,var(--spot-intensity)), transparent 60%)`,
    WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
    mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
    WebkitMaskComposite: "xor",
    maskComposite: "exclude",
  };

  return (
    <div
      ref={ref}
      onPointerMove={track}
      onPointerLeave={reset}
      className={cn("relative", radiusClass[radius], className)}
      style={
        {
          "--spot-x": "-9999px",
          "--spot-y": "-9999px",
          "--spot-size": `${size}px`,
          "--spot-intensity": intensity,
        } as CSSProperties
      }
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] transition-opacity"
        style={ringStyle}
      />
      {children}
    </div>
  );
}
