import { Link, useNavigate } from "@tanstack/react-router";
import { useRef } from "react";
import { CartDrawer } from "./CartDrawer";

export function Header() {
  const navigate = useNavigate();
  const clicks = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleLogoClick = (e: React.MouseEvent) => {
    clicks.current += 1;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      clicks.current = 0;
    }, 2000);

    if (clicks.current >= 5) {
      e.preventDefault();
      clicks.current = 0;
      if (timer.current) clearTimeout(timer.current);
      navigate({ to: "/admin" });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2" onClick={handleLogoClick}>
          <span className="font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Sri Vishnu Priya
          </span>
          <span className="hidden text-xs uppercase tracking-widest text-muted-foreground sm:inline">
            Jewellers
          </span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-foreground md:flex">
          <Link to="/" className="transition-colors hover:text-gold">
            Home
          </Link>
          <a href="#collections" className="transition-colors hover:text-gold">
            Collections
          </a>
          <a href="#about" className="transition-colors hover:text-gold">
            About
          </a>
        </nav>
        <CartDrawer />
      </div>
    </header>
  );
}
