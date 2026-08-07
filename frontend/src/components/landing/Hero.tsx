import { motion } from "framer-motion";
import { ArrowUpRight, Clock, Globe, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { BlurText } from "./BlurText";

const enter = {
  initial: { filter: "blur(10px)", opacity: 0, y: 20 },
  animate: { filter: "blur(0px)", opacity: 1, y: 0 },
};

const stats = [
  { icon: Clock, value: "38 sec", label: "Average time from prompt to finished scene" },
  { icon: Globe, value: "11", label: "Animation styles, from Ghibli to Cyberpunk" },
];

const styleNames = ["Pixar", "Ghibli", "Anime", "Claymation", "Cyberpunk"];

export function Hero() {
  return (
    <div className="flex flex-1 flex-col items-center px-4 pt-24 text-center">
      <motion.div
        {...enter}
        transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
        className="liquid-glass flex items-center gap-3 rounded-full"
      >
        <span className="rounded-full bg-aether-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
          New
        </span>
        <span className="pr-3 text-sm text-white/90">Gemini-directed prompts are live</span>
      </motion.div>

      <BlurText
        text="Turn a sentence into a world in motion"
        delay={0.5}
        className="font-heading mt-6 max-w-3xl text-6xl leading-[0.8] tracking-[-0.03em] text-white md:text-7xl lg:text-[5.5rem]"
      />

      <motion.p
        {...enter}
        transition={{ duration: 0.7, delay: 0.8, ease: "easeOut" }}
        className="font-body mt-4 max-w-2xl text-sm leading-tight font-light text-white md:text-base"
      >
        Describe a scene and Ryora directs it — style, framing, lighting, and motion resolved for
        you. No timeline, no keyframes, no editing experience required.
      </motion.p>

      <motion.div
        {...enter}
        transition={{ duration: 0.7, delay: 1.1, ease: "easeOut" }}
        className="mt-6 flex items-center gap-6"
      >
        <Link
          to="/register"
          className="liquid-glass-strong flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-medium text-aether-primary shadow-[0_0_30px_-8px_rgba(0,242,255,.7)] transition-colors hover:text-white"
        >
          Start creating free <ArrowUpRight className="h-5 w-5" />
        </Link>
        <a
          href="#studio"
          className="flex items-center gap-1.5 text-sm font-medium text-white transition-colors hover:text-aether-primary"
        >
          See the studio <Play className="h-4 w-4 fill-current" />
        </a>
      </motion.div>

      <motion.div
        {...enter}
        transition={{ duration: 0.7, delay: 1.3, ease: "easeOut" }}
        className="mt-8 flex flex-col items-stretch gap-4 sm:flex-row"
      >
        {stats.map(({ icon: Icon, value, label }) => (
          <div key={value} className="liquid-glass w-full rounded-[1.25rem] p-5 text-left sm:w-55">
            <Icon className="h-7 w-7 text-aether-primary" strokeWidth={1.25} />
            <p className="font-heading mt-6 text-4xl leading-none tracking-[-0.02em] text-white">
              {value}
            </p>
            <p className="font-body mt-2 text-xs font-light text-white">{label}</p>
          </div>
        ))}
      </motion.div>

      <motion.div
        {...enter}
        transition={{ duration: 0.7, delay: 1.4, ease: "easeOut" }}
        className="mt-auto flex flex-col items-center gap-4 pt-12 pb-8"
      >
        <span className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white">
          Eleven directed styles, one prompt away
        </span>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {styleNames.map((name) => (
            <span
              key={name}
              className="text-xl font-medium tracking-tight text-white/50 transition-colors hover:text-aether-primary md:text-2xl"
            >
              {name}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
