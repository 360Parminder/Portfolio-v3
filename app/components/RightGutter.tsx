"use client";

export function RightGutter() {
  const stroke = "var(--line-stroke)";
  const strokeLight = "var(--line-stroke-light)";
  const strokeAccent = "var(--line-stroke-accent)";
  const fill = "var(--line-fill)";
  const fillAccent = "var(--line-fill-accent)";

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
      {/* ── Blueprint SVG art ── */}
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
        preserveAspectRatio="xMidYMin meet"
      >
        {/* Engineering grid background */}
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

        {/* ── HARD DRIVE — top area ── */}
        <g transform="translate(60, 70)">
          <text x="0" y="-6" fill={stroke} fontSize="5" fontFamily="var(--font-geist-mono)">
            STORAGE UNIT
          </text>
          {/* Drive housing */}
          <rect x="0" y="0" width="180" height="120" rx="4" fill={fill} stroke={stroke} strokeWidth="0.6" />
          {/* Platter rings */}
          <circle cx="80" cy="55" r="42" fill="none" stroke={stroke} strokeWidth="0.5" />
          <circle cx="80" cy="55" r="30" fill="none" stroke={strokeLight} strokeWidth="0.3" />
          <circle cx="80" cy="55" r="18" fill="none" stroke={strokeLight} strokeWidth="0.3" />
          <circle cx="80" cy="55" r="5" fill={fillAccent} stroke={strokeAccent} strokeWidth="0.5" />
          {/* Actuator arm */}
          <line x1="80" y1="55" x2="158" y2="22" stroke={strokeAccent} strokeWidth="0.7" />
          <rect x="150" y="16" width="22" height="14" rx="2" fill={fill} stroke={stroke} strokeWidth="0.4" />
          {/* Labels */}
          <text x="10" y="115" fill={stroke} fontSize="4.5" fontFamily="var(--font-geist-mono)">PLATTERS</text>
          <text x="152" y="14" fill={stroke} fontSize="4" fontFamily="var(--font-geist-mono)">ACT.</text>
        </g>

        {/* ── Trace from HDD down ── */}
        <polyline
          points="140,190 140,250 380,250 380,320"
          fill="none"
          stroke={stroke}
          strokeWidth="0.5"
        />
        <circle cx="140" cy="250" r="2" fill={strokeAccent} />
        <circle cx="380" cy="320" r="2" fill={strokeAccent} />

        {/* ── IO PORTS — USB ports cluster ── */}
        <g transform="translate(60, 280)">
          <text x="0" y="-8" fill={stroke} fontSize="5" fontFamily="var(--font-geist-mono)">IO PORTS</text>
          {[0, 1, 2].map((i) => (
            <g key={`usb-${i}`} transform={`translate(0, ${i * 42})`}>
              <rect x="0" y="0" width="60" height="30" rx="2" fill={fill} stroke={stroke} strokeWidth="0.5" />
              <rect x="6" y="6" width="48" height="18" rx="1" fill="none" stroke={strokeLight} strokeWidth="0.4" />
              <rect x="12" y="10" width="36" height="10" rx="1" fill={fillAccent} stroke={stroke} strokeWidth="0.3" />
            </g>
          ))}
          {/* Ethernet port */}
          <g transform="translate(80, 0)">
            <rect x="0" y="0" width="55" height="36" rx="2" fill={fill} stroke={stroke} strokeWidth="0.5" />
            {Array.from({ length: 8 }).map((_, i) => (
              <rect key={`eth-${i}`} x={4 + i * 6} y="26" width="4" height="8" fill={fillAccent} stroke={stroke} strokeWidth="0.2" />
            ))}
            <text x="4" y="18" fill={stroke} fontSize="4" fontFamily="var(--font-geist-mono)">RJ-45</text>
          </g>
        </g>

        {/* ── Trace from IO to chipset ── */}
        <polyline
          points="120,440 20,440 20,560"
          fill="none"
          stroke={stroke}
          strokeWidth="0.5"
        />
        <circle cx="20" cy="440" r="2" fill={strokeAccent} />

        {/* ── CHIPSET — lower section ── */}
        <g transform="translate(40, 520)">
          <text x="60" y="-8" textAnchor="middle" fill={stroke} fontSize="5" fontFamily="var(--font-geist-mono)">
            CORE PROCESSOR
          </text>
          <rect x="0" y="0" width="160" height="160" rx="4" fill={fill} stroke={stroke} strokeWidth="0.6" />
          {/* Stacked boards */}
          {[0, 1, 2, 3].map((i) => (
            <rect key={`board-${i}`} x="10" y={10 + i * 35} width="140" height="28" rx="2" fill={fillAccent} stroke={stroke} strokeWidth="0.4" />
          ))}
          {/* Chips on boards */}
          {[0, 1, 2, 3].map((i) =>
            [0, 1, 2].map((j) => (
              <rect
                key={`bchip-${i}-${j}`}
                x={20 + j * 44}
                y={15 + i * 35}
                width="32"
                height="18"
                rx="1"
                fill={fill}
                stroke={strokeLight}
                strokeWidth="0.3"
              />
            ))
          )}
          <text x="80" y="175" textAnchor="middle" fill={stroke} fontSize="4" fontFamily="var(--font-geist-mono)">
            FIG_001.chipset
          </text>
        </g>

        {/* ── Dimension line ── */}
        <g>
          <line x1="20" y1="720" x2="380" y2="720" stroke={strokeLight} strokeWidth="0.3" />
          <line x1="20" y1="715" x2="20" y2="725" stroke={strokeLight} strokeWidth="0.3" />
          <line x1="380" y1="715" x2="380" y2="725" stroke={strokeLight} strokeWidth="0.3" />
          <text x="200" y="718" textAnchor="middle" fill={strokeLight} fontSize="4" fontFamily="var(--font-geist-mono)">
            360mm
          </text>
        </g>

        {/* ── Resistors ── */}
        {[{ x: 230, y: 760 }, { x: 258, y: 760 }, { x: 286, y: 760 }, { x: 240, y: 778 }, { x: 268, y: 778 }].map(
          (pos, i) => (
            <rect key={`res-${i}`} x={pos.x} y={pos.y} width="14" height="6" rx="1" fill={fillAccent} stroke={stroke} strokeWidth="0.3" />
          )
        )}

        {/* ── Capacitors ── */}
        {[{ x: 280, y: 540 }, { x: 306, y: 540 }, { x: 330, y: 555 }, { x: 356, y: 555 }].map((pos, i) => (
          <g key={`cap-${i}`} transform={`translate(${pos.x}, ${pos.y})`}>
            <rect x="0" y="0" width="18" height="30" rx="9" fill={fill} stroke={stroke} strokeWidth="0.4" />
            <line x1="4" y1="9" x2="14" y2="9" stroke={strokeLight} strokeWidth="0.3" />
            <line x1="4" y1="21" x2="14" y2="21" stroke={strokeLight} strokeWidth="0.3" />
          </g>
        ))}

        {/* ── Annotation text (rotated along right edge) ── */}
        <text
          x="386"
          y="200"
          fill={stroke}
          fontSize="5"
          fontFamily="var(--font-geist-mono)"
          transform="rotate(90, 386, 200)"
          letterSpacing="0.08em"
        >
          REV_A · PORTFOLIO · 2025.01
        </text>

        {/* ── FIG label ── */}
        <text x="20" y="1060" fill={stroke} fontSize="4.5" fontFamily="var(--font-geist-mono)">
          FIG_003.right.panel
        </text>
      </svg>

      {/* ── Thin hatching strip on the inner (left) edge ── */}
      <div
        aria-hidden="true"
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
    </div>
  );
}
