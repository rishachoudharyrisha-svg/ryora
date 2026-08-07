import Hls from "hls.js";
import { useEffect, useRef, type CSSProperties } from "react";

const FADE_MS = 500;
const FADE_OUT_LEAD = 0.55; // seconds before the end to start fading out

/**
 * Looping background video that crossfades its own seam. `loop` is deliberately
 * off: we fade to black just before the end, restart, then fade back in, which
 * hides the hard cut a native loop would show.
 *
 * The fade is driven by requestAnimationFrame rather than a CSS transition so a
 * new fade can pick up from the current opacity mid-flight instead of jumping.
 */
export function FadingVideo({
  src,
  poster,
  className,
  style,
}: {
  src: string;
  poster?: string;
  className?: string;
  style?: CSSProperties;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<number | null>(null);
  const fadingOutRef = useRef(false);

  // HLS (.m3u8) needs hls.js everywhere except Safari, which plays it natively.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src.endsWith(".m3u8")) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
      return () => hls.destroy();
    }
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
    }
  }, [src]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Respect reduced-motion: hold the video static and fully visible.
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

    const fadeTo = (target: number, duration = FADE_MS) => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      const from = Number(video.style.opacity || "0");
      const startedAt = performance.now();

      const step = (now: number) => {
        const progress = Math.min((now - startedAt) / duration, 1);
        video.style.opacity = String(from + (target - from) * progress);
        if (progress < 1) frameRef.current = requestAnimationFrame(step);
      };
      frameRef.current = requestAnimationFrame(step);
    };

    const onLoadedData = () => {
      if (reduced) {
        video.style.opacity = "1";
        return;
      }
      video.style.opacity = "0";
      void video.play().catch(() => {
        // Autoplay can still be refused; leave the poster visible.
        video.style.opacity = "1";
      });
      fadeTo(1);
    };

    const onTimeUpdate = () => {
      if (reduced || fadingOutRef.current) return;
      const remaining = video.duration - video.currentTime;
      if (remaining <= FADE_OUT_LEAD && remaining > 0) {
        fadingOutRef.current = true;
        fadeTo(0);
      }
    };

    const onEnded = () => {
      video.style.opacity = "0";
      setTimeout(() => {
        video.currentTime = 0;
        void video.play().catch(() => {});
        fadingOutRef.current = false;
        if (!reduced) fadeTo(1);
        else video.style.opacity = "1";
      }, 100);
    };

    video.addEventListener("loadeddata", onLoadedData);
    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("ended", onEnded);

    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      video.removeEventListener("loadeddata", onLoadedData);
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("ended", onEnded);
    };
  }, [src]);

  const isHls = src.endsWith(".m3u8");

  return (
    <video
      ref={videoRef}
      // HLS sources are attached by hls.js above; setting src here would race it.
      src={isHls ? undefined : src}
      poster={poster}
      autoPlay
      muted
      playsInline
      preload="auto"
      aria-hidden="true"
      className={className}
      style={{ opacity: 0, ...style }}
    />
  );
}
