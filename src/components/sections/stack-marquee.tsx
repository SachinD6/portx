import { skills } from "@/data";
import { cn } from "@/lib/utils";

function MarqueeRow({
  items,
  direction,
  duration,
}: {
  items: string[];
  direction: "left" | "right";
  duration: string;
}) {
  // Duplicate enough for seamless loop on wide screens
  const loop = [...items, ...items, ...items, ...items];

  return (
    <div className="relative overflow-hidden">
      <div
        className={cn(
          "marquee-track",
          direction === "right" && "marquee-track-reverse",
        )}
        style={{ animationDuration: duration }}
      >
        {loop.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface-elevated/70 px-3.5 py-1.5 text-xs text-muted-foreground"
          >
            <span className="size-1 rounded-full bg-primary/50" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export function StackMarquee() {
  const all = skills.flatMap((cluster) => cluster.items);

  // Three balanced rows (rotate so each line feels full)
  const rowOne = all;
  const rowTwo = [...all.slice(5), ...all.slice(0, 5)];
  const rowThree = [...all.slice(9), ...all.slice(0, 9)];

  return (
    <div
      className="relative space-y-2.5 overflow-hidden py-4"
      aria-hidden="true"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-12 bg-linear-to-r from-background to-transparent sm:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-12 bg-linear-to-l from-background to-transparent sm:w-24" />

      <MarqueeRow items={rowOne} direction="left" duration="36s" />
      <MarqueeRow items={rowTwo} direction="right" duration="42s" />
      <MarqueeRow items={rowThree} direction="left" duration="40s" />
    </div>
  );
}
