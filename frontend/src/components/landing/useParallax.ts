import { useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useRef, type RefObject } from "react";

/**
 * Maps an element's progress through the viewport onto a vertical offset.
 * Positive `distance` lags the element behind the scroll; negative leads it.
 */
export function useParallax(distance = 60): {
  ref: RefObject<HTMLDivElement | null>;
  y: MotionValue<number>;
} {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const raw = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  const y = useSpring(raw, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return { ref, y };
}
