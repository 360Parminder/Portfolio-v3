"use client";

export function LeftGutter() {
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
        borderRight: "1px solid var(--line-stroke)",
        overflow: "hidden",
      }}
    >
      {/* Subtle engineering grid background */}
      <svg
        viewBox="0 0 416 1080"
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
          <pattern id="lgSmall" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke={strokeLight} strokeWidth="0.3" />
          </pattern>
          <pattern id="lgLarge" width="100" height="100" patternUnits="userSpaceOnUse">
            <rect width="100" height="100" fill="url(#lgSmall)" />
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke={stroke} strokeWidth="0.4" />
          </pattern>
        </defs>
        <rect width="416" height="1080" fill="url(#lgLarge)" opacity="0.5" />
      </svg>

      {/* Thin hatching strip on the inner (right) edge */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: "1px",
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
          right: "16px",
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
              borderLeft: "1px solid var(--line-stroke)",
            }}
          >
            {n}
          </div>
        ))}
      </div>
    </div>
  );
}
