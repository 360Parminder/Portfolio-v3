"use client";

export function TitleBlock({ className = "" }: { className?: string }) {
  return (
    <div
      className={className}
      style={{
        width: "350px",
        borderLeft: "1px solid var(--line-stroke)",
        borderTop: "1px solid var(--line-stroke)",
        borderRight: "1px solid var(--line-stroke)",
        borderBottom: "1px solid var(--line-stroke)",
        backgroundColor: "var(--background)",
        pointerEvents: "auto",
        maxWidth: "100%",
      }}
    >
      <div
        className="absolute -top-5 right-0 text-[9px] tracking-wide"
        style={{ color: "var(--line-stroke-accent)" }}
      >
        ALL SOURCE CODE AND REPOSITORIES ARE AVAILABLE AT GITHUB.COM/PARMINDER360
      </div>

      <div className="flex flex-col uppercase">
        <div className="flex border-b border-[var(--line-stroke)]">
          <div className="w-full p-2 flex items-center justify-center">
            <span className="font-bold text-sm tracking-widest text-[var(--foreground)]">
              PARMINDER DESIGNS
            </span>
          </div>
        </div>

        <div className="flex border-b border-[var(--line-stroke)]">
          <div className="w-[60%] p-2 border-r border-[var(--line-stroke)] flex flex-col justify-center">
            <span className="text-[8px] opacity-70 text-[var(--line-stroke-accent)]">PROJECT TITLE</span>
            <span className="text-xs font-semibold tracking-wide mt-0.5 text-[var(--foreground)]">PORTFOLIO ARCHITECTURE</span>
          </div>
          <div className="w-[40%] flex flex-col">
            <div className="flex-1 border-b border-[var(--line-stroke)] flex items-center px-2">
              <span className="text-[8px] w-8 opacity-70 text-[var(--line-stroke-accent)]">SIZE</span>
              <span className="text-[10px] text-[var(--foreground)]">WEB</span>
            </div>
            <div className="flex-1 flex items-center px-2">
              <span className="text-[8px] w-8 opacity-70 text-[var(--line-stroke-accent)]">REV</span>
              <span className="text-[10px] text-[var(--foreground)]">03</span>
            </div>
          </div>
        </div>

        <div className="flex border-b border-[var(--line-stroke)]">
          <div className="flex-1 border-r border-[var(--line-stroke)] flex flex-col p-1.5 px-2">
            <span className="text-[7px] opacity-70 text-[var(--line-stroke-accent)]">DRAWN BY</span>
            <span className="text-[9px] text-[var(--foreground)]">P. SINGH</span>
          </div>
          <div className="flex-1 border-r border-[var(--line-stroke)] flex flex-col p-1.5 px-2">
            <span className="text-[7px] opacity-70 text-[var(--line-stroke-accent)]">DATE</span>
            <span className="text-[9px] text-[var(--foreground)]">2026-07-20</span>
          </div>
          <div className="flex-1 flex flex-col p-1.5 px-2">
            <span className="text-[7px] opacity-70 text-[var(--line-stroke-accent)]">SCALE</span>
            <span className="text-[9px] text-[var(--foreground)]">1:1 (PIXELS)</span>
          </div>
        </div>

        <div className="flex">
          <div className="flex-1 border-r border-[var(--line-stroke)] flex flex-col p-1.5 px-2">
            <span className="text-[7px] opacity-70 text-[var(--line-stroke-accent)]">APPROVED BY</span>
            <span className="text-[9px] text-[var(--foreground)]">CLIENT</span>
          </div>
          <div className="flex-1 border-r border-[var(--line-stroke)] flex flex-col p-1.5 px-2">
            <span className="text-[7px] opacity-70 text-[var(--line-stroke-accent)]">STATUS</span>
            <span className="text-[9px] text-[var(--foreground)]">PRODUCTION</span>
          </div>
          <div className="flex-1 flex flex-col p-1.5 px-2">
            <span className="text-[7px] opacity-70 text-[var(--line-stroke-accent)]">SHEET</span>
            <span className="text-[9px] text-[var(--foreground)]">1 OF 1</span>
          </div>
        </div>
      </div>
    </div>
  );
}
