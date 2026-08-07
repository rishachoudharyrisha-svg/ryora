import { AppBar } from "@/components/landing/AppBar";
import { Capabilities } from "@/components/landing/Capabilities";
import { FadingVideo } from "@/components/landing/FadingVideo";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Hero } from "@/components/landing/Hero";
import { landingMedia } from "@/components/landing/media";
import { Navbar } from "@/components/landing/Navbar";
import { Pricing } from "@/components/landing/Pricing";
import { ScrollProgress } from "@/components/landing/ScrollProgress";
import { StudioMockup } from "@/components/landing/StudioMockup";

export function Landing() {
  return (
    <main className="font-landing relative min-h-screen overflow-x-hidden bg-aether-container-lowest text-white">
      <ScrollProgress />
      {/* Grain filter referenced by the shiny gradient headline treatment. */}
      <svg width="0" height="0" aria-hidden="true" className="absolute">
        <filter id="c3-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.35 0" />
          <feComposite in2="SourceGraphic" operator="in" result="noise" />
          <feBlend in="SourceGraphic" in2="noise" mode="multiply" />
        </filter>
      </svg>

      {/* Full-viewport hero: video sits behind, chrome and copy ride on top. */}
      <section className="relative flex min-h-screen flex-col overflow-hidden">
        <FadingVideo
          src={landingMedia.hero}
          className="absolute top-0 left-1/2 z-0 -translate-x-1/2 object-cover object-top"
          style={{ width: "120%", height: "120%" }}
        />
        {/* Contrast floor so white type stays readable on bright frames. */}
        <div className="absolute inset-0 z-0 bg-black/45" />
        <div className="relative z-10 flex min-h-screen flex-col">
          <Navbar />
          <Hero />
        </div>
      </section>

      <AppBar />
      <StudioMockup />
      <Capabilities />
      <Pricing />
      <FinalCTA />
    </main>
  );
}
