import { SpotlightBorder } from "@/components/shared/SpotlightBorder";
import type { Video } from "@/lib/api";
import { Download, Heart, Play, Trash2 } from "lucide-react";
import { useState } from "react";
import { VideoPlayer } from "./VideoPlayer";

export const Card = ({
  video,
  onToggle,
  onDelete,
}: {
  video: Video;
  onToggle?: () => void;
  onDelete?: () => void;
}) => {
  const [playing, setPlaying] = useState(false);
  return (
    <>
      <SpotlightBorder
        radius="xl"
        size={340}
        intensity={0.55}
        className="h-full"
      >
        <article className="group relative h-full overflow-hidden rounded-xl border border-aether-outline/10 bg-aether-container-low transition-colors hover:border-aether-primary/30">
          <button
            aria-label={`Play ${video.title}`}
            onClick={() => setPlaying(true)}
            className="relative block aspect-video w-full overflow-hidden bg-aether-container-lowest"
          >
            {video.thumbnailUrl && (
              <img
                src={video.thumbnailUrl}
                alt=""
                className="size-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-105"
              />
            )}
            <span className="absolute inset-0 grid place-items-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
              <span className="grid size-12 place-items-center rounded-full border border-white/30 bg-white/20 backdrop-blur-sm">
                <Play className="size-6 fill-white text-white" />
              </span>
            </span>
          </button>
          <div className="relative z-10 flex items-center justify-between gap-3 bg-aether-container/80 p-4 backdrop-blur-md">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-white">
                {video.title}
              </p>
              <p className="mt-1 text-xs text-aether-on-surface-variant">
                {video.provider}
              </p>
            </div>
            <div className="flex items-center gap-1 text-aether-on-surface-variant">
              <a
                aria-label="Download video"
                className="rounded-md p-1.5 transition-colors hover:bg-white/10 hover:text-white"
                href={video.url}
                download="ryora-demo.mp4"
              >
                <Download size={16} />
              </a>
              {onToggle && (
                <button
                  aria-label="Toggle favorite"
                  onClick={onToggle}
                  className="rounded-md p-1.5 transition-colors hover:bg-white/10 hover:text-pink-400"
                >
                  <Heart
                    size={16}
                    fill={video.isFavorite ? "currentColor" : "none"}
                  />
                </button>
              )}
              {onDelete && (
                <button
                  aria-label="Delete video"
                  onClick={onDelete}
                  className="rounded-md p-1.5 transition-colors hover:bg-white/10 hover:text-red-400"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          </div>
        </article>
      </SpotlightBorder>
      {playing && (
        <VideoPlayer video={video} onClose={() => setPlaying(false)} />
      )}
    </>
  );
};
