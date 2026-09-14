import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { unlockAdmin } from "@/lib/gate.functions";

export const Route = createFileRoute("/unlock")({
  ssr: false,
  component: UnlockPage,
  head: () => ({
    meta: [
      { title: "Enter password | Sri Vishnu Priya Jewellers" },
      {
        name: "description",
        content: "Private area for Sri Vishnu Priya Jewellers. Enter your password to continue.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Enter password | Sri Vishnu Priya Jewellers" },
      { property: "og:description", content: "Private area. Password required." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

function UnlockPage() {
  const router = useRouter();
  const unlock = useServerFn(unlockAdmin);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError(false);
    try {
      const { ok } = await unlock({ data: { password } });
      if (ok) {
        await router.navigate({ to: "/admin" });
      } else {
        setError(true);
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-12">
      <div className="rounded-2xl border border-border bg-card p-8">
        <h1 className="font-display text-2xl font-medium text-foreground">Private area</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Enter your password to manage collections and items.
        </p>
        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <div>
            <label
              className="mb-1 block text-xs font-medium uppercase tracking-wide text-muted-foreground"
              htmlFor="admin-password"
            >
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-gold"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-sm text-destructive">Incorrect password.</p>}
          <button
            type="submit"
            disabled={busy}
            className="inline-flex w-full items-center justify-center rounded-md bg-gold px-4 py-2 text-sm font-medium text-gold-foreground transition-colors hover:bg-gold/90 disabled:opacity-60"
          >
            {busy ? "Checking..." : "Enter"}
          </button>
        </form>
      </div>
    </div>
  );
}
