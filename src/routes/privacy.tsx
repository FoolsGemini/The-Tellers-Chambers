import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({ component: PrivacyPage });

function PrivacyPage() {
  return (
    <main className="mx-auto max-w-xl pb-16">
      <p className="text-xs tracking-[0.18em] text-muted uppercase">Veil</p>
      <h1 className="font-display mt-2 text-4xl font-semibold">Privacy</h1>
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted">
        <p>
          A reading stays in your browser. Veil does not keep a copy of your questions or your
          journal. Clearing the browser lets that journal go.
        </p>
        <p>
          If you pay, Stripe collects the email and payment details needed to take the $9.99.
          Veil receives the email only so the same receipt can open the chamber again on another
          browser. The pass itself is a cookie on that browser.
        </p>
        <p>Veil does not sell that email, and does not use it to send a list.</p>
      </div>
      <Link to="/chamber" className="mt-8 inline-flex h-11 items-center text-sm text-muted hover:text-fg">
        Return
      </Link>
    </main>
  );
}
