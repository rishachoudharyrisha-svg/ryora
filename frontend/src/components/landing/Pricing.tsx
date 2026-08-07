import { SpotlightBorder } from "@/components/shared/SpotlightBorder";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    tier: "Free",
    price: "$0",
    description: "For creators making their first scene with Ryora.",
    features: [
      "1 free video generation",
      "720p export",
      "All eleven animation styles",
      "Full prompt history",
      "Library, favorites, and downloads",
    ],
    cta: "Get started",
    available: true,
  },
  {
    tier: "Standard",
    price: "Soon",
    description: "For creators who need more room to explore ideas.",
    features: [
      "Generous monthly generations",
      "1080p export",
      "Priority rendering queue",
      "No watermark",
      "Longer durations",
    ],
    cta: "Coming soon",
    available: false,
  },
  {
    tier: "Pro",
    price: "Soon",
    description: "For studios and teams producing at volume.",
    features: [
      "Unlimited generations",
      "4K export",
      "Fastest rendering",
      "Team workspaces",
      "Brand style presets",
    ],
    cta: "Coming soon",
    available: false,
    highlight: true,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="c3-pricing-section">
      {/* Grain filter used by the watermark headline below. */}
      <svg width="0" height="0" aria-hidden="true" className="absolute">
        <filter id="c3-noise-pricing">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.5"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.075" />
          </feComponentTransfer>
          <feComposite in2="SourceGraphic" operator="in" result="noise" />
          <feBlend in="SourceGraphic" in2="noise" mode="overlay" />
        </filter>
      </svg>

      <motion.div
        className="c3-watermark-container"
        initial={{ opacity: 0, scale: 0.94, filter: "blur(12px)" }}
        whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="c3-watermark-main">
          <span className="c3-watermark-line-1">Your ideas.</span>
          <span className="c3-watermark-line-2">Animated.</span>
        </div>
      </motion.div>

      <motion.div
        className="c3-grid"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={{ show: { transition: { staggerChildren: 0.12 } } }}
      >
        {plans.map((plan) => (
          <motion.div
            key={plan.tier}
            className="c3-grid-item"
            variants={{
              hidden: { opacity: 0, y: 40 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            <SpotlightBorder
              radius="none"
              size={520}
              intensity={0.6}
              className="c3-spotlight"
            >
              <article
                className={`c3-card${plan.highlight ? " c3-card-pro" : ""}`}
              >
                <p className="c3-tier-small">{plan.tier}</p>
                <p className="c3-tier-large">{plan.price}</p>
                <p className="c3-desc">{plan.description}</p>
                <ul className="c3-list">
                  {plan.features.map((feature) => (
                    <li key={feature}>
                      <span className="c3-check">
                        <Check
                          size={15}
                          className="text-aether-primary"
                          strokeWidth={3}
                        />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
                {plan.available ? (
                  <Link to="/register" className="c3-btn">
                    {plan.cta}
                  </Link>
                ) : (
                  <button className="c3-btn" disabled>
                    {plan.cta}
                  </button>
                )}
              </article>
            </SpotlightBorder>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
