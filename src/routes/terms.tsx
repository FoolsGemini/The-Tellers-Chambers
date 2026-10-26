import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({ component: TermsPage });

function TermsPage() {
  return (
    <main className="mx-auto max-w-xl pb-16">
      <p className="text-xs tracking-[0.18em] text-muted uppercase">Veil</p>
      <h1 className="font-display mt-2 text-4xl font-semibold">Terms</h1>
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted">
        <p>
          The Tellers Chambers is sold by Veil for a single payment of $9.99. That payment unlocks
          the Woodcut, the Gilded Night, the longer spreads, the moon, the number, feng shui,
          bibliomancy, and the journal on the browser where the receipt is restored.
        </p>
        <p>
          The painted deck, the one-card pull, the past-present-future pull, and the coin remain
          free. Readings are for reflection. They are not medical, legal, financial, or other
          professional advice.
        </p>
        <p>
          Payments are taken by Stripe. Veil does not store your card. If the pass does not open,
          use the same email on the paywall to restore it.
        </p>
      </div>
      <Link to="/chamber" className="mt-8 inline-flex h-11 items-center text-sm text-muted hover:text-fg">
        Return
      </Link>
    </main>
  );
}
