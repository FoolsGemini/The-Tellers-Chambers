import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: Gate });

function Gate() {
  return (
    <main className="grid min-h-dvh place-items-center bg-[#07060a]">
      <div
        className="relative h-dvh"
        style={{ width: "min(100vw, calc(100dvh * 9 / 16))" }}
      >
        <img src="/gate.jpg" alt="" className="absolute inset-0 h-full w-full object-cover object-top" />
        <div className="pointer-events-none absolute inset-x-0 top-16 px-4 text-center">
          <div className="mx-auto w-fit px-2">
            <div className="mx-auto mb-2 h-px w-20 bg-[#e7c98a]" />
            <h1 className="font-display text-[2.65rem] leading-[0.88] font-semibold text-[#f6ecd8] [text-shadow:0_2px_16px_rgba(0,0,0,0.75)] sm:text-6xl">
              The Tellers
              <span className="mt-1 block text-[1.15rem] tracking-[0.34em] uppercase sm:text-2xl">
                Chambers
              </span>
            </h1>
            <div className="mx-auto mt-2 h-px w-28 bg-[#e7c98a]" />
            <p className="mt-2 text-[11px] tracking-[0.22em] text-[#f6ecd8]/85 uppercase">
              Come in when you are ready
            </p>
          </div>
        </div>
        <Link
          to="/chamber"
          className="absolute left-1/2 top-[79%] inline-flex h-12 min-w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#f4ecdf] px-6 text-sm font-medium text-[#1a140f] shadow-[0_0_28px_rgba(186,214,255,0.55)]"
        >
          Enter
        </Link>
      </div>
    </main>
  );
}
