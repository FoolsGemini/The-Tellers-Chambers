import { useState, type FormEvent, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { beginCheckout, restorePass } from "@/lib/pass/pass.functions";
import { PRICE_LABEL } from "@/lib/pass/offer";
import { usePass } from "@/lib/pass/use-pass";

export function Paywall({ compact = false }: { compact?: boolean }) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");

  async function buy() {
    setPending(true);
    setError(null);
    try {
      const result = await beginCheckout();
      if (result.url) {
        window.location.href = result.url;
        return;
      }
      setError(result.error ?? "The door did not open.");
    } catch {
      setError("The door did not open.");
    } finally {
      setPending(false);
    }
  }

  async function restore(event: FormEvent) {
    event.preventDefault();
    setPending(true);
    setError(null);
    try {
      const result = await restorePass({ data: { email } });
      if (result.open) {
        window.location.reload();
        return;
      }
      setError(result.error ?? "That email has no payment.");
    } catch {
      setError("The receipt could not be found.");
    } finally {
      setPending(false);
    }
  }

  return (
    <section className={compact ? "mt-6" : "mx-auto mt-10 max-w-md text-center"}>
      <p className="text-xs tracking-[0.18em] text-muted uppercase">One payment</p>
      <h2 className="font-display mt-2 text-3xl font-semibold">The rest of the chamber.</h2>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        The painted deck, the one-card pull, the three paths, and the coin stay open.{" "}
        {PRICE_LABEL} once unlocks the other decks, the longer rites, and the journal. Veil does
        not charge again.
      </p>
      <Button className="mt-5" disabled={pending} onClick={() => void buy()}>
        {pending ? "Opening…" : `Open the chamber · ${PRICE_LABEL}`}
      </Button>
      {error ? <p className="mt-3 text-sm text-red-200/90">{error}</p> : null}
      <form onSubmit={(event) => void restore(event)} className="mt-6 flex flex-col gap-2">
        <label className="text-left text-xs tracking-wide text-muted uppercase" htmlFor="pass-email">
          Already paid
        </label>
        <input
          id="pass-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="The email on the receipt"
          className="h-11 rounded-(--radius-md) border border-border bg-bg px-3 text-sm"
          autoComplete="email"
        />
        <Button type="submit" variant="outline" disabled={pending || !email.includes("@")}>
          Restore this browser
        </Button>
      </form>
      <p className="mt-4 text-xs text-subtle">
        <Link to="/terms" className="underline-offset-2 hover:underline">
          Terms
        </Link>
        <span className="px-2">·</span>
        <Link to="/privacy" className="underline-offset-2 hover:underline">
          Privacy
        </Link>
      </p>
    </section>
  );
}

export function PassGate({ children }: { children: ReactNode }) {
  const pass = usePass();
  if (!pass.ready || pass.open) return children;
  return (
    <main className="pb-16">
      <Paywall />
    </main>
  );
}
