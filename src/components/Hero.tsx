export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-gold">
            Since 1985
          </p>
          <h1 className="font-display text-4xl font-medium leading-tight text-foreground sm:text-5xl lg:text-6xl">
            Sri Vishnu Priya Jewellers
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Timeless gold, diamond, and temple jewellery crafted with devotion. Every piece tells a
            story of tradition, elegance, and trust passed down through generations.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#collections"
              className="inline-flex items-center justify-center rounded-md bg-gold px-8 py-3 text-sm font-semibold text-gold-foreground shadow-sm transition-colors hover:bg-gold/90"
            >
              Explore Collections
            </a>
            <a
              href="#about"
              className="inline-flex items-center justify-center rounded-md border border-border bg-background px-8 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              Our Story
            </a>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute -top-24 right-0 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-48 w-48 rounded-full bg-gold/10 blur-3xl" />
    </section>
  );
}
