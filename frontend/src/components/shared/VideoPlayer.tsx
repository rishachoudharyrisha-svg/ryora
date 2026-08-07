import type { Video } from "@/lib/api";
import { useEffect } from "react";

export function VideoPlayer({
  video,
  onClose,
}: {
  video: Video;
  onClose: () => void;
}) {
  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    addEventListener("keydown", close);
    return () => removeEventListener("keydown", close);
  }, [onClose]);
  return (
    <div
      aria-modal="true"
      role="dialog"
      className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-5"
      onMouseDown={onClose}
    >
      <div
        className="w-full max-w-4xl overflow-hidden rounded-2xl border border-aether-primary/20 bg-aether-container-low text-white shadow-2xl"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 p-4">
          <p className="truncate font-medium">{video.title}</p>
          <button
            className="shrink-0 rounded-lg px-3 py-1.5 text-sm text-aether-on-surface-variant transition-colors hover:bg-white/5 hover:text-white"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        <video
          autoPlay
          controls
          playsInline
          poster={video.thumbnailUrl}
          className="aspect-video w-full bg-black"
        >
          <source src={video.url} type="video/mp4" />
          Your browser does not support video playback.
        </video>
      </div>
    </div>
  );
}
