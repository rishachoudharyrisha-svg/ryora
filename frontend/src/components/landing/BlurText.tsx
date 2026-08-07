import { motion } from "framer-motion";

const STEP_DURATION = 0.35;
const STAGGER_MS = 100;

/**
 * Reveals a headline word by word, each easing through a mid blur rather than
 * a straight fade, which reads as depth-of-field pulling into focus.
 */
export function BlurText({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  return (
    <p
      className={className}
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", rowGap: "0.1em" }}
    >
      {text.split(" ").map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          initial={{ filter: "blur(10px)", opacity: 0, y: 50 }}
          whileInView={{
            filter: ["blur(10px)", "blur(5px)", "blur(0px)"],
            opacity: [0, 0.5, 1],
            y: [50, -5, 0],
          }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{
            duration: STEP_DURATION * 2,
            times: [0, 0.5, 1],
            ease: "easeOut",
            delay: delay + (index * STAGGER_MS) / 1000,
          }}
          // Explicit margin instead of a space: tight tracking swallows nbsp.
          style={{ display: "inline-block", marginRight: "0.28em" }}
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
}
