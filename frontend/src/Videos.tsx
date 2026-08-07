import { Card } from "@/components/shared/Card";
import { useVideos } from "@/hooks/useVideos";
import { type Video } from "@/lib/api";
import { videoService } from "@/services/videoService";
import { useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";

export function VideosPage({ favorites = false }: { favorites?: boolean }) {
  const qc = useQueryClient();
  const query = useVideos(favorites);

  const toggle = (video: Video) =>
    videoService
      .toggleFavorite(video)
      .then(() => qc.invalidateQueries({ queryKey: ["videos"] }));

  const del = (id: string) =>
    videoService
      .deleteVideo(id)
      .then(() => qc.invalidateQueries({ queryKey: ["videos"] }));

  return (
    <div>
      <h1 className="text-2xl font-semibold text-white sm:text-3xl">
        {favorites ? "Favorites" : "Your videos"}
      </h1>
      <p className="mt-2 text-aether-on-surface-variant">
        {favorites
          ? "The ideas worth returning to."
          : "Download, organize, and revisit every creation."}
      </p>
      <motion.div
        variants={{ show: { transition: { staggerChildren: 0.06 } } }}
        initial="hidden"
        animate="show"
        className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {query.data?.videos.map((video) => (
            <motion.div
              key={video.id}
              layout
              exit={{ opacity: 0, scale: 0.95 }}
              variants={{
                hidden: { opacity: 0, y: 18 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
              }}
            >
              <Card video={video} onToggle={() => toggle(video)} onDelete={() => del(video.id)} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      {query.data?.videos.length === 0 && (
        <p className="mt-7 text-aether-outline">Nothing here yet.</p>
      )}
    </div>
  );
}
