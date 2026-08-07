import { motion } from "framer-motion";
import { Film, Search } from "lucide-react";
import { useEffect, useState } from "react";

const menuItems = ["File", "Edit", "View", "Style", "Window", "Help"];

function useClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);
  return now;
}

export function AppBar() {
  const now = useClock();
  const date = now.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  const time = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.9, duration: 0.6 }}
      className="h-10 border-b border-t border-white/10 bg-aether-container-lowest/70 backdrop-blur-md"
    >
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-6 text-xs">
        <div className="flex items-center gap-5">
          <span className="flex items-center gap-1.5 font-bold text-white">
            <Film size={14} className="text-aether-primary" /> Ryora
          </span>
          {menuItems.map((item, i) => (
            <span
              key={item}
              className={
                i > 3 ? "hidden md:inline text-white/60" : i > 2 ? "hidden sm:inline text-white/60" : "text-white/60"
              }
            >
              {item}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2 text-white/60">
          <Search size={14} />
          <span>
            {date} · {time}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
