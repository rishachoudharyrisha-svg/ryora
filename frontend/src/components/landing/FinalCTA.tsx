import { motion } from "framer-motion";
import { ArrowUpRight, Film } from "lucide-react";
import { Link } from "react-router-dom";
import { BlurText } from "./BlurText";
import { FadingVideo } from "./FadingVideo";
import { landingMedia } from "./media";

const footerLinks = [
  { label: "Features", href: "#features" },
  { label: "Studio", href: "#studio" },
  { label: "Pricing", href: "#pricing" },
];

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden px-6 py-32 text-center md:px-16 lg:px-24">
      <FadingVideo
        src={landingMedia.cta}
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />

      {/* Fades the video into the black sections above and below, so the
          section reads as one continuous surface rather than a pasted block. */}
      <div
        className="pointer-events-none absolute top-0 right-0 left-0 z-1 h-50"
        style={{ background: "linear-gradient(to bottom, #0e0e13, transparent)" }}
      />
      <div
        className="pointer-events-none absolute right-0 bottom-0 left-0 z-1 h-50"
        style={{ background: "linear-gradient(to top, #0e0e13, transparent)" }}
      />
      {/* Contrast floor: white type over arbitrary video frames. */}
      <div className="pointer-events-none absolute inset-0 z-1 bg-black/45" />

      <div className="relative z-10">
        <BlurText
          text="Your next scene starts here."
          className="font-heading mx-auto mb-4 max-w-3xl text-5xl leading-[0.85] tracking-[-0.03em] text-white md:text-6xl lg:text-7xl"
        />
        <p className="font-body mx-auto mb-8 max-w-xl text-sm font-light text-white/60 md:text-base">
          Your first generation is free. Describe a scene, pick a style, and watch Ryora direct it.
          No card, no timeline, no editing experience.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6"
        >
          <Link
            to="/register"
            className="liquid-glass-strong font-body flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-aether-primary shadow-[0_0_30px_-8px_rgba(0,242,255,.7)] transition-all hover:text-white"
          >
            Start creating free
            <ArrowUpRight className="h-5 w-5" />
          </Link>
          <a
            href="#pricing"
            className="font-body flex items-center gap-2 rounded-full bg-aether-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-aether-primary/90"
          >
            View pricing
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </motion.div>

        <div className="mt-32 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <Link to="/" className="font-body flex items-center gap-2 text-xs text-white/40">
            <Film size={14} className="text-aether-primary" />© {new Date().getFullYear()} Ryora.
            All rights reserved.
          </Link>
          <div className="flex items-center gap-6">
            {footerLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="font-body text-xs font-light text-white/40 transition-colors hover:text-white/70"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
