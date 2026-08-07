import { motion, useScroll, useSpring } from "framer-motion";

/** Thin cyan bar tracking page scroll. Spring-smoothed so it glides rather than
 *  tracking the wheel one-to-one. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 right-0 left-0 z-50 h-0.5 origin-left bg-aether-primary shadow-[0_0_12px_rgba(0,242,255,.8)]"
    />
  );
}
