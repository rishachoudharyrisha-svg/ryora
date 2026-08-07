import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { LogoMark, PrimaryButton } from "./primitives";

const links = [
  { href: "#features", label: "Features" },
  { href: "#studio", label: "Studio" },
  { href: "#pricing", label: "Pricing" },
  { href: "#reviews", label: "Reviews" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative z-20 mx-auto flex h-20 max-w-6xl items-center justify-between px-6"
    >
      <Link to="/" aria-label="Ryora">
        <LogoMark />
      </Link>
      <div className="hidden items-center gap-8 md:flex">
        {links.map(({ href, label }, i) => (
          <motion.a
            key={href}
            href={href}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05 }}
            className="text-sm font-medium text-white/70 hover:text-white"
          >
            {label}
          </motion.a>
        ))}
      </div>
      <div className="hidden md:block">
        <PrimaryButton label="Create free" />
      </div>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle menu"
        aria-expanded={open}
        className="grid size-10 place-items-center rounded-full border border-white/10 bg-white/5 text-white md:hidden"
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>
      {open && (
        <div className="liquid-glass absolute inset-x-4 top-full z-30 mt-2 flex flex-col gap-1 rounded-2xl p-4 md:hidden">
          {links.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-white/70 hover:bg-white/5 hover:text-white"
            >
              {label}
            </a>
          ))}
          <PrimaryButton label="Create free" full className="mt-2" />
        </div>
      )}
    </motion.nav>
  );
}
