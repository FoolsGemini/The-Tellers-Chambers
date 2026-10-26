import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { confirmCheckout } from "@/lib/pass/pass.functions";

export const Route = createFileRoute("/pass")({ component: PassPage });

function PassPage() {
  const [line, setLine] = useState("Checking the receipt.");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("canceled")) {
      setLine("The payment was left unfinished. The free rites are still open.");
      return;
    }
    const sessionId = params.get("session_id");
    if (!sessionId) {
      setLine("There is no receipt on this page.");
      return;
    }
    confirmCheckout({ data: { sessionId } })
      .then((result) => {
        setLine(
          result.open
            ? "The chamber is open. The other decks, the longer rites, and the journal are yours."
            : (result.error ?? "The payment did not open the chamber."),
        );
      })
      .catch(() => setLine("The receipt could not be read."));
  }, []);

  return (
    <main className="mx-auto max-w-md pb-16 text-center">
      <p className="text-xs tracking-[0.18em] text-muted uppercase">Veil</p>
      <h1 className="font-display mt-2 text-4xl font-semibold">The Tellers Chambers</h1>
      <p className="mt-4 text-muted">{line}</p>
      <Link to="/chamber" className="mt-8 inline-flex h-11 items-center text-sm text-fg underline-offset-2 hover:underline">
        Return to the chamber
      </Link>
    </main>
  );
}
