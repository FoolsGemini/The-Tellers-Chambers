import { cn } from "@/lib/utils";

export function MoonDisc({
  illumination,
  waxing,
  className,
}: {
  illumination: number;
  waxing: boolean;
  className?: string;
}) {
  const lit = Math.min(1, Math.max(0, illumination));
  const shift = (waxing ? -lit : lit) * 100;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-full bg-[#efe4cf] shadow-[inset_0_0_12px_rgba(28,25,20,0.35)]",
        className,
      )}
      aria-hidden
    >
      <div
        className="absolute inset-0 rounded-full bg-[#1c1914]"
        style={{ transform: `translateX(${shift}%)` }}
      />
      <div className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_-8px_-10px_18px_rgba(28,25,20,0.18)]" />
    </div>
  );
}
