import { Card } from "@/components/shared/Card";
import { GeneratingCard } from "@/components/shared/GeneratingCard";
import { Button } from "@/components/ui/button";
import { useProfile } from "@/hooks/useProfile";
import { useVideos } from "@/hooks/useVideos";
import { videoService, type Video } from "@/services/videoService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, Sparkles } from "lucide-react";
import { useState } from "react";

const styles = [
  "Pixar",
  "Disney",
  "Anime",
  "Cartoon",
  "Studio Ghibli",
  "Clay Animation",
  "Minecraft",
  "Lego",
  "Comic",
  "Cyberpunk",
  "Realistic 3D",
];

export function Dashboard() {
  const qc = useQueryClient();
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState(styles[0]);
  const [duration, setDuration] = useState(5);
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [message, setMessage] = useState("");
  const profile = useProfile();
  const credits = profile.data?.user.credits;
  const videos = useVideos();
  const toggleFavoriteMutation = useMutation({
    mutationFn: (video: Video) => videoService.toggleFavorite(video),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["videos"] });
    },
  });

  const create = useMutation({
    mutationFn: () =>
      videoService.generateVideo({ prompt, style, duration, aspectRatio }),
    onSuccess: () => {
      setPrompt("");
      setMessage("Your animation is ready.");
      qc.invalidateQueries({ queryKey: ["videos"] });
      qc.invalidateQueries({ queryKey: ["history"] });
      qc.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (e) =>
      setMessage(e instanceof Error ? e.message : "Generation failed"),
  });
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <header>
        <p className="mb-1 text-sm font-medium uppercase tracking-wide text-aether-primary/80">
          Creative workspace
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
          Make something magical
        </h1>
      </header>
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="glass-card rounded-2xl p-6 lg:p-8"
      >
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="A cute baby dragon flying through a magical glowing forest…"
          rows={3}
          className="mb-8 w-full resize-none border-none bg-transparent p-0 text-lg text-white outline-none placeholder:text-aether-on-surface-variant/70 lg:text-xl"
        />
        <div className="mb-6 flex flex-wrap gap-4">
          <select
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            className="form-input-dark w-full min-w-37.5 rounded-lg px-4 py-3 text-sm font-medium sm:w-auto"
          >
            {styles.map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
          <select
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="form-input-dark w-full min-w-37.5 rounded-lg px-4 py-3 text-sm font-medium sm:w-auto"
          >
            {[5, 10, 15].map((x) => (
              <option key={x} value={x}>
                {x} seconds
              </option>
            ))}
          </select>
          <select
            value={aspectRatio}
            onChange={(e) => setAspectRatio(e.target.value)}
            className="form-input-dark w-full min-w-37.5 rounded-lg px-4 py-3 text-sm font-medium sm:w-auto"
          >
            {["16:9", "9:16", "1:1"].map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </div>
        <div className="mt-2 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-center text-sm text-aether-on-surface-variant sm:text-left">
            {message ||
              (credits === 0
                ? "Your free generation has been used. Upgrade your plan to continue."
                : credits === undefined
                  ? "Checking your available credit…"
                  : `${credits} free generation credit remaining.`)}
          </p>
          <div className="flex w-full items-center gap-3 sm:w-auto">
            {credits === 0 && (
              <Button disabled variant="outline" className="flex-1 sm:flex-none">
                Upgrade Plan
              </Button>
            )}
            <Button
              disabled={
                prompt.trim().length < 10 ||
                create.isPending ||
                credits === 0 ||
                credits === undefined
              }
              onClick={() => create.mutate()}
              className="flex-1 animate-pulse-glow px-6 sm:flex-none"
            >
              {create.isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Creating…
                </>
              ) : (
                <>
                  <Sparkles className="size-4" />
                  Generate
                </>
              )}
            </Button>
          </div>
        </div>
      </motion.section>
      <section>
        <h2 className="mb-6 text-xl font-semibold text-white">Recent creations</h2>
        <motion.div
          variants={{ show: { transition: { staggerChildren: 0.07 } } }}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {create.isPending && (
              <motion.div key="generating" layout>
                <GeneratingCard />
              </motion.div>
            )}
            {videos.data?.videos.slice(0, 6).map((video) => (
              <motion.div
                key={video.id}
                layout
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
                }}
              >
                <Card video={video} onToggle={() => toggleFavoriteMutation.mutate(video)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        {!create.isPending && videos.data?.videos.length === 0 && (
          <p className="text-sm text-aether-on-surface-variant">
            Your new creations will appear here.
          </p>
        )}
      </section>
    </div>
  );
}
