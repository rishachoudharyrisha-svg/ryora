import { motion } from "framer-motion";
import { TextReveal } from "./TextReveal";
import { useParallax } from "./useParallax";
import {
  Clapperboard,
  Download,
  Film,
  Heart,
  History,
  Play,
  Search,
  Settings,
  Sparkles,
  Trash2,
  User,
} from "lucide-react";

const sidebarNav = [
  { icon: Clapperboard, label: "Dashboard", active: true },
  { icon: Film, label: "Videos", count: 12 },
  { icon: Heart, label: "Favorites", count: 3 },
  { icon: History, label: "History" },
  { icon: User, label: "Profile" },
  { icon: Settings, label: "Settings" },
];

const styleDots = [
  { label: "Studio Ghibli", color: "#00d2ff" },
  { label: "Pixar", color: "#A4F4FD" },
  { label: "Cyberpunk", color: "#f59e0b" },
  { label: "Claymation", color: "#10b981" },
];

const renders = [
  {
    title: "Baby dragon over a glowing forest",
    meta: "Studio Ghibli · 5s · 16:9",
    time: "9:41 AM",
    active: true,
  },
  { title: "Fox astronaut drifting past a nebula", meta: "Pixar · 10s · 16:9", time: "8:12 AM" },
  { title: "Neon rooftop chase in the rain", meta: "Cyberpunk · 15s · 9:16", time: "Yesterday" },
  { title: "Clay robot tending a rooftop garden", meta: "Claymation · 5s · 1:1", time: "Yesterday" },
  { title: "Paper boat down a monsoon street", meta: "Anime · 10s · 16:9", time: "Mon" },
  { title: "Lighthouse keeper feeding gulls", meta: "Disney · 5s · 16:9", time: "Mon" },
];

export function StudioMockup() {
  const { ref, y } = useParallax(34);

  return (
    <section id="studio" className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <TextReveal
        text="A studio built for one prompt at a time."
        className="font-heading mb-10 max-w-2xl text-3xl leading-[1.05] tracking-[-0.03em] text-white md:text-4xl"
      />
      <motion.div
        ref={ref}
        style={{ y }}
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0e1014]/90 backdrop-blur-2xl"
      >
        {/* Title bar */}
        <div className="flex items-center border-b border-white/10 px-4 py-3">
          <div className="flex gap-2">
            <span className="size-3 rounded-full bg-[#ff5f57]" />
            <span className="size-3 rounded-full bg-[#febc2e]" />
            <span className="size-3 rounded-full bg-[#28c840]" />
          </div>
          <p className="flex-1 text-center text-xs text-white/50">Ryora — Studio</p>
          <div className="w-14" />
        </div>

        <div className="grid grid-cols-12 md:h-130">
          {/* Sidebar */}
          <aside className="col-span-3 hidden flex-col border-r border-white/10 bg-black/30 p-4 md:flex">
            <button className="mb-5 flex items-center justify-center gap-2 rounded-lg bg-white px-3 py-2 text-xs font-semibold text-black">
              <Sparkles size={14} /> New generation
            </button>
            <nav className="flex flex-col gap-0.5">
              {sidebarNav.map(({ icon: Icon, label, count, active }) => (
                <span
                  key={label}
                  className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs ${
                    active ? "bg-white/10 text-white" : "text-white/60"
                  }`}
                >
                  <Icon size={14} />
                  <span className="flex-1">{label}</span>
                  {count && <span className="text-white/40">{count}</span>}
                </span>
              ))}
            </nav>
            <p className="mt-6 mb-2 text-[10px] font-semibold tracking-widest text-white/40 uppercase">
              Styles
            </p>
            <div className="flex flex-col gap-2">
              {styleDots.map(({ label, color }) => (
                <span key={label} className="flex items-center gap-2 text-xs text-white/60">
                  <span className="size-2 rounded-full" style={{ background: color }} />
                  {label}
                </span>
              ))}
            </div>
          </aside>

          {/* Render list */}
          <div className="col-span-12 border-r border-white/10 md:col-span-4">
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3 text-xs text-white/40">
              <Search size={13} /> Search your library
            </div>
            <div className="divide-y divide-white/5">
              {renders.map((item) => (
                <div
                  key={item.title}
                  className={`px-4 py-3 ${item.active ? "border-l-2 border-l-[#00d2ff] bg-white/5" : ""}`}
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="truncate text-xs font-medium text-white">{item.title}</p>
                    <span className="shrink-0 text-[10px] text-white/40">{item.time}</span>
                  </div>
                  <p className="mt-1 text-[11px] text-white/45">{item.meta}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Preview pane */}
          <div className="col-span-12 hidden flex-col md:col-span-5 md:flex">
            <div className="flex items-center gap-1 border-b border-white/10 px-4 py-2.5 text-white/50">
              {[Play, Download, Heart, Trash2].map((Icon, i) => (
                <span key={i} className="grid size-7 place-items-center rounded-md hover:bg-white/5">
                  <Icon size={13} />
                </span>
              ))}
            </div>
            <div className="flex-1 overflow-hidden p-4">
              <div className="relative aspect-video overflow-hidden rounded-lg border border-white/10 bg-linear-to-br from-[#0B2551] via-[#0e1014] to-[#00d2ff]/20">
                <span className="absolute inset-0 grid place-items-center">
                  <span className="grid size-11 place-items-center rounded-full border border-white/30 bg-white/15 backdrop-blur-sm">
                    <Play size={16} className="fill-white text-white" />
                  </span>
                </span>
              </div>
              <p className="mt-3 text-xs font-medium text-white">
                Baby dragon over a glowing forest
              </p>
              <div className="mt-3 rounded-lg border border-white/10 bg-white/3 p-3">
                <p className="flex items-center gap-1.5 text-[11px] font-medium text-[#A4F4FD]">
                  <Sparkles size={12} /> Prompt enhanced by Ryora
                </p>
                <p className="mt-1.5 text-[11px] leading-relaxed text-white/55">
                  Cinematic Studio Ghibli animation, expressive character detail, drifting
                  fireflies, gentle camera push, warm atmospheric lighting.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
