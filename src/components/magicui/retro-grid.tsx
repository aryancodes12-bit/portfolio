import { cn } from "@/lib/utils";

export function RetroGrid({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute h-full w-full overflow-hidden opacity-30 [perspective:200px]",
        className,
      )}
    >
      {/* Grid */}
      <div className="absolute inset-0 [transform:rotateX(60deg)]">
        <div
          className={cn(
            "animate-retro-grid",
            "bg-[linear-gradient(to_right,rgba(0,240,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,240,255,0.15)_1px,transparent_1px)]",
            "bg-[size:40px_40px]",
            "[height:300vh] [margin-left:-50%] [transform-origin:100%_0_0] [width:200%]",
          )}
        />
      </div>

      {/* Shadow Fade */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
    </div>
  );
}
