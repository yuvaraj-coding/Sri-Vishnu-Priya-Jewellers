import { Link } from "@tanstack/react-router";
import jewelleryVideo from "@/assets/jewellery-hero-background.mp4.asset.json";

export function Hero() {
  return (
    <section className="relative flex min-h-[calc(100dvh-4rem-1px)] items-center overflow-hidden bg-charcoal">
      <video
        className="hero-background-video absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source src={jewelleryVideo.url} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-charcoal/60" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-charcoal/25" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl animate-fade-in text-center">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-gold">
            Since 1985
          </p>
          <h1 className="font-display text-4xl font-medium leading-tight text-cream drop-shadow-sm sm:text-5xl lg:text-6xl">
            Sri Vishnu Priya Jewellers
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-cream/85 drop-shadow-sm">
            Timeless gold, diamond, and temple jewellery crafted with devotion. Every piece tells a
            story of tradition, elegance, and trust passed down through generations.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/collections"
              className="inline-flex items-center justify-center rounded-md bg-gold px-8 py-3 text-sm font-semibold text-gold-foreground shadow-sm transition-colors hover:bg-gold/90"
            >
              Explore Collections
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
