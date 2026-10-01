import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/chamber", label: "Chamber" },
  { to: "/rites", label: "Rites" },
  { to: "/deck", label: "Deck" },
  { to: "/journal", label: "Journal" },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const gate = pathname === "/";

  return (
    <div className="grain veil-wash min-h-dvh">
      <header
        className={cn(
          "top-0 z-30",
          gate
            ? "absolute inset-x-0 bg-transparent"
            : "sticky border-b border-border bg-bg/80 backdrop-blur-md",
        )}
      >
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2.5 text-fg">
            <span
              aria-hidden
              className="grid size-8 place-items-center rounded-(--radius-sm) border border-border-strong"
            >
              <span className="block size-3.5 rounded-[1px] border border-accent/80" />
            </span>
            <span className="font-display text-xl font-semibold tracking-tight">
              Veil
            </span>
          </Link>
          <nav className="flex items-center gap-1">
            {NAV.map((item) => {
              const active = pathname === item.to || pathname.startsWith(`${item.to}/`);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "inline-flex h-11 items-center rounded-(--radius-sm) px-2 text-sm transition-colors duration-150 sm:px-3",
                    active ? "text-fg" : "text-muted hover:text-fg",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
      <div className={cn(!gate && "mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-10")}>
        {children}
      </div>
    </div>
  );
}
