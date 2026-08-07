import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * Pacing copy for the generate request. The API returns in a single call with
 * no progress events, so these are time-based stages describing the work the
 * backend genuinely performs — not a measured percentage.
 */
const stages = [
  "Reading your prompt…",
  "Directing the scene…",
  "Setting lighting and palette…",
  "Rendering frames…",
  "Almost there…",
];

const STAGE_MS = 2600;

export function GeneratingCard() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      // Hold on the final line rather than looping back to the start.
      setStage((current) => Math.min(current + 1, stages.length - 1));
    }, STAGE_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden rounded-xl border border-aether-primary/20 bg-aether-container-low"
    >
      <div className="relative aspect-video overflow-hidden bg-aether-container-lowest">
        {/* Sweeping sheen conveys ongoing work without implying a percentage. */}
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(100deg, transparent 20%, rgba(0,242,255,0.10) 50%, transparent 80%)",
            backgroundSize: "200% 100%",
          }}
          animate={{ backgroundPosition: ["150% 0%", "-50% 0%"] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute inset-0 grid place-items-center">
          <motion.span
            animate={{ scale: [1, 1.12, 1], opacity: [0.75, 1, 0.75] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="grid size-12 place-items-center rounded-full border border-aether-primary/40 bg-aether-primary/10"
          >
            <Sparkles className="size-5 text-aether-primary" />
          </motion.span>
        </div>
      </div>

      <div className="bg-aether-container/80 p-4">
        <AnimatePresence mode="wait">
          <motion.p
            key={stage}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35 }}
            className="text-sm font-medium text-white"
          >
            {stages[stage]}
          </motion.p>
        </AnimatePresence>
        <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full w-1/3 rounded-full bg-aether-primary"
            animate={{ x: ["-100%", "300%"] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
}
