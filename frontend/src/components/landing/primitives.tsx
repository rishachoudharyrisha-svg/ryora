import { cn } from "@/lib/utils";
import { ChevronRight, Film, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export function LogoMark({ className = "size-8" }: { className?: string }) {
  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center rounded-xl border border-aether-primary/50 bg-aether-primary/20 text-aether-primary shadow-[0_0_15px_rgba(0,242,255,0.3)]",
        className,
      )}
    >
      <Film size="60%" />
    </span>
  );
}

export function PrimaryButton({
  label = "Start creating free",
  to = "/register",
  full = false,
  className,
}: {
  label?: string;
  to?: string;
  full?: boolean;
  className?: string;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-full border border-aether-primary/50 bg-aether-primary/15 px-5 py-3 text-sm font-medium text-aether-primary shadow-[0_0_24px_-8px_rgba(0,242,255,.6)] transition-all hover:bg-aether-primary/25 active:scale-[0.98]",
        full && "w-full",
        className,
      )}
    >
      <Sparkles size={16} />
      {label}
      <ChevronRight
        size={16}
        className="transition-transform group-hover:translate-x-0.5"
      />
    </Link>
  );
}

export function SectionEyebrow({ label, tag }: { label: string; tag?: string }) {
  return (
    <div className="inline-flex items-center gap-2">
      <span className="h-1.5 w-1.5 rounded-full bg-white" />
      <span className="text-sm font-medium text-white/70">{label}</span>
      {tag && (
        <span className="rounded-full border border-white/10 px-2 py-0.5 text-xs text-white/50">
          {tag}
        </span>
      )}
    </div>
  );
}

/** Shiny gradient-text treatment for the hero's accent word. Reproduced exactly per spec. */
export const shinyGradientStyle: React.CSSProperties = {
  backgroundImage:
    "linear-gradient(to right, #091020 0%, #0B2551 12.5%, #A4F4FD 32.5%, #00d2ff 50%, #0B2551 67.5%, #091020 87.5%, #091020 100%)",
  backgroundSize: "200% auto",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  WebkitTextFillColor: "transparent",
  filter: "url(#c3-noise)",
};
