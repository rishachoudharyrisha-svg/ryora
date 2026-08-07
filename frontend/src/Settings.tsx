import { useState } from "react";

export function SettingsPage() {
  const [dark, setDark] = useState(true);
  return (
    <div>
      <h1 className="text-2xl font-semibold text-white sm:text-3xl">Settings</h1>
      <div className="mt-7 max-w-lg rounded-xl border border-white/10 bg-aether-container-low/40 p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-white">Dark mode</p>
            <p className="text-sm text-aether-on-surface-variant">
              Use Ryora’s midnight studio theme.
            </p>
          </div>
          <button
            role="switch"
            aria-checked={dark}
            aria-label="Dark mode"
            onClick={() => setDark(!dark)}
            className={`relative h-7 w-12 shrink-0 rounded-full border transition-colors ${
              dark
                ? "border-aether-primary/50 bg-aether-primary/25"
                : "border-aether-outline/40 bg-aether-container-high"
            }`}
          >
            <span
              className={`absolute top-1 size-5 rounded-full transition-all ${
                dark
                  ? "left-6 bg-aether-primary shadow-[0_0_12px_rgba(0,242,255,.7)]"
                  : "left-1 bg-aether-outline"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
