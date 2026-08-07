import { SpotlightBorder } from "@/components/shared/SpotlightBorder";
import { motion } from "framer-motion";
import { Clapperboard, Sparkles, SunMedium } from "lucide-react";
import { AuroraBackground } from "./AuroraBackground";
import { TextReveal } from "./TextReveal";
import { useParallax } from "./useParallax";

const cards = [
  {
    icon: Sparkles,
    title: "Directed prompts",
    tags: ["Scene framing", "Camera motion", "Mood + palette", "Safety checked"],
    body: "Gemini expands your sentence into full art direction — environment, lighting, movement, and colour — before a single frame renders.",
  },
  {
    icon: Clapperboard,
    title: "Eleven styles",
    tags: ["Ghibli", "Pixar", "Cyberpunk", "Claymation"],
    body: "Swap the entire visual language of a scene without rewriting the prompt. Same idea, rendered as anime, clay, comic, or photoreal 3D.",
  },
  {
    icon: SunMedium,
    title: "Your library",
    tags: ["Instant replay", "Favorites", "Download", "Full history"],
    body: "Every generation is kept with its original and enhanced prompt, so you can trace what produced a result and return to it later.",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

function CapabilityCard({ card, index }: { card: (typeof cards)[number]; index: number }) {
  const { icon: Icon, title, tags, body } = card;
  // Staggered depths make the row drift apart slightly as it scrolls.
  const { ref, y } = useParallax(index === 1 ? 46 : 22);

  return (
    <motion.div ref={ref} style={{ y }}>
      <motion.article
        initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, delay: index * 0.12, ease: EASE }}
        whileHover={{ y: -8 }}
      >
        <SpotlightBorder
          radius="2xl"
          size={420}
          intensity={0.55}
          className="liquid-glass flex h-full min-h-90 flex-col p-6"
        >
          <div className="flex items-start justify-between gap-4">
            <motion.span
              className="liquid-glass grid size-11 shrink-0 place-items-center rounded-xl"
              initial={{ scale: 0.6, opacity: 0, rotate: -12 }}
              whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.12 + 0.15, ease: EASE }}
            >
              <Icon className="h-6 w-6 text-aether-primary" strokeWidth={1.5} />
            </motion.span>

            <motion.div
              className="flex max-w-[70%] flex-wrap justify-end gap-1.5"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={{
                show: { transition: { staggerChildren: 0.06, delayChildren: index * 0.12 + 0.25 } },
              }}
            >
              {tags.map((tag) => (
                <motion.span
                  key={tag}
                  variants={{
                    hidden: { opacity: 0, y: 8, scale: 0.9 },
                    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: EASE } },
                  }}
                  className="liquid-glass font-body rounded-full px-3 py-1 text-[11px] whitespace-nowrap text-white/90"
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          </div>

          <div className="flex-1" />

          <div className="mt-6">
            <TextReveal
              as="h3"
              text={title}
              delay={index * 0.12 + 0.3}
              className="font-heading text-3xl leading-none tracking-[-0.02em] text-white md:text-4xl"
            />
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.12 + 0.45, ease: EASE }}
              className="font-body mt-3 max-w-[32ch] text-sm leading-snug font-light text-white/90"
            >
              {body}
            </motion.p>
          </div>
        </SpotlightBorder>
      </motion.article>
    </motion.div>
  );
}

export function Capabilities() {
  const { ref: headerRef, y: headerY } = useParallax(-40);

  return (
    <section
      id="features"
      className="relative flex min-h-screen flex-col overflow-hidden bg-aether-container-lowest px-8 pt-24 pb-10 md:px-16 lg:px-20"
    >
      <AuroraBackground />

      <div className="relative z-10 flex min-h-screen flex-col">
        <motion.header ref={headerRef} style={{ y: headerY }} className="mb-auto">
          <motion.p
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="font-body mb-6 flex items-center gap-2 text-sm tracking-[.24em] text-aether-primary uppercase"
          >
            <motion.span
              className="inline-block h-1.5 w-1.5 rounded-full bg-aether-primary"
              animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
            Capabilities
          </motion.p>
          <TextReveal
            text="Direction resolved"
            className="font-heading max-w-4xl text-6xl leading-[0.9] tracking-[-0.03em] text-white md:text-7xl lg:text-[6rem]"
          />
        </motion.header>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {cards.map((card, index) => (
            <CapabilityCard key={card.title} card={card} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
