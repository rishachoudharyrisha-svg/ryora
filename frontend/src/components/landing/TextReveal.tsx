import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Reveals text word by word, each rising from behind a clipping mask rather
 * than fading. The overflow-hidden wrapper is what sells it — words appear to
 * emerge from a hard edge instead of materialising in place.
 */
export function TextReveal({
  text,
  className,
  delay = 0,
  stagger = 0.055,
  as: Tag = "h2",
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "p";
}) {
  const words = text.split(" ");

  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden="true"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={{ show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
        className="inline"
      >
        {words.map((word, index) => (
          <span
            key={`${word}-${index}`}
            // Mask each word individually so descenders aren't clipped mid-rise.
            className="inline-flex overflow-hidden pb-[0.12em] align-bottom"
          >
            <motion.span
              className="inline-block"
              variants={{
                hidden: { y: "110%", opacity: 0 },
                show: { y: "0%", opacity: 1, transition: { duration: 0.75, ease: EASE } },
              }}
            >
              {word}
              {index < words.length - 1 ? " " : ""}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
