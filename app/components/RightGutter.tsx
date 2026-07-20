"use client";

export function RightGutter() {
  const strokeLight = "var(--line-stroke-light)";
  const stroke = "var(--line-stroke)";

  const hatching = `repeating-linear-gradient(
    -45deg,
    transparent,
    transparent 4px,
    var(--line-hatch) 4px,
    var(--line-hatch) 5px
  )`;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        borderLeft: "1px solid var(--line-stroke)",
        overflow: "hidden",
      }}
    >
      {/* Subtle engineering grid background */}
      <svg
        viewBox="0 0 400 1080"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "block",
        }}
        preserveAspectRatio="xMidYMin slice"
      >
        <defs>
          <pattern id="rgSmall" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke={strokeLight} strokeWidth="0.3" />
          </pattern>
          <pattern id="rgLarge" width="100" height="100" patternUnits="userSpaceOnUse">
            <rect width="100" height="100" fill="url(#rgSmall)" />
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke={stroke} strokeWidth="0.4" />
          </pattern>
        </defs>
        <rect width="400" height="1080" fill="url(#rgLarge)" opacity="0.5" />
      </svg>

      {/* Thin hatching strip on the inner (left) edge */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "1px",
          width: "15px",
          bottom: 0,
          background: hatching,
          pointerEvents: "none",
        }}
      />

      {/* Coordinate Scale (Numbers) */}
      <div
        className="absolute top-0 bottom-0 flex flex-col"
        style={{
          left: "16px",
          width: "24px",
          fontFamily: "var(--font-geist-mono)",
          fontSize: "10px",
          color: "var(--line-stroke-accent)",
        }}
      >
        {["4", "3", "2", "1"].map((n, i) => (
          <div
            key={n}
            className="flex-1 flex items-center justify-center"
            style={{
              borderBottom: i < 3 ? "1px solid var(--line-stroke)" : "none",
              borderRight: "1px solid var(--line-stroke)",
            }}
          >
            {n}
          </div>
        ))}
      </div>

      {/* Title Block (Bottom Right) */}
      <div
        className="absolute bottom-[24px] right-[24px]"
        style={{
          width: "350px",
          borderLeft: "1px solid var(--line-stroke)",
          borderTop: "1px solid var(--line-stroke)",
          backgroundColor: "var(--background)",
          pointerEvents: "auto",
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
    </div>
  );
}
