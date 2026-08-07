import { api, type Generation } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export function HistoryPage() {
  const query = useQuery({
    queryKey: ["history"],
    queryFn: () => api<{ items: Generation[]; total: number }>("/history"),
  });
  return (
    <div>
      <h1 className="text-2xl font-semibold text-white sm:text-3xl">
        Generation history
      </h1>
      <div className="mt-7 overflow-hidden rounded-xl border border-white/10 bg-aether-container-low/40">
        {query.data?.items.map((x) => (
          <article
            key={x.id}
            className="border-b border-white/10 p-4 last:border-0"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:gap-5">
              <p className="font-medium text-white">{x.originalPrompt}</p>
              <span className="w-fit shrink-0 rounded-full bg-emerald-400/10 px-2 py-1 text-xs text-emerald-300">
                {x.status}
              </span>
            </div>
            <p className="mt-2 line-clamp-2 text-sm text-aether-on-surface-variant">
              {x.enhancedPrompt}
            </p>
            <p className="mt-2 text-xs text-aether-outline">
              {x.style} · {x.duration}s · {x.aspectRatio}
            </p>
          </article>
        )) ?? (
          <p className="p-5 text-aether-outline">No generation history yet.</p>
        )}
      </div>
    </div>
  );
}
