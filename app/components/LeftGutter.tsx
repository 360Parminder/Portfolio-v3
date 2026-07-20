"use client";

export function LeftGutter() {
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
        borderRight: "1px solid var(--line-stroke)",
        overflow: "hidden",
      }}
    >
      {/* ── Blueprint SVG art ── */}
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
        preserveAspectRatio="xMidYMin meet"
      >
        {/* Engineering grid background */}
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

        {/* ── POWER CONNECTOR — near top ── */}
        <g transform="translate(40, 80)">
          <text x="0" y="-6" fill={stroke} fontSize="5" fontFamily="var(--font-geist-mono)">
            POWER CONNECTOR
          </text>
          <rect x="0" y="0" width="90" height="50" rx="3" fill={fill} stroke={stroke} strokeWidth="0.5" />
          {Array.from({ length: 6 }).map((_, i) => (
            <g key={`pwr-${i}`}>
              <circle cx={12 + i * 12} cy="16" r="3.5" fill="none" stroke={stroke} strokeWidth="0.4" />
              <circle cx={12 + i * 12} cy="34" r="3.5" fill="none" stroke={stroke} strokeWidth="0.4" />
            </g>
          ))}
        </g>

        {/* ── Trace from power down to RAM area ── */}
        <polyline
          points="85,130 85,200 30,200 30,340"
          fill="none"
          stroke={strokeLight}
          strokeWidth="0.4"
        />
        <circle cx="85" cy="200" r="2" fill={strokeAccent} />
        <circle cx="30" cy="340" r="2" fill={strokeAccent} />

        {/* ── RAM STICKS — two horizontal sticks ── */}
        {[0, 1].map((i) => (
          <g key={`ram-${i}`} transform={`translate(20, ${340 + i * 55})`}>
            <rect
              x="0"
              y="0"
              width="376"
              height="38"
              rx="2"
              fill={fill}
              stroke={stroke}
              strokeWidth="0.5"
            />
            {/* Chips */}
            {Array.from({ length: 8 }).map((_, j) => (
              <rect
                key={`chip-${i}-${j}`}
                x={16 + j * 44}
                y="7"
                width="32"
                height="14"
                rx="1"
                fill={fillAccent}
                stroke={stroke}
                strokeWidth="0.4"
              />
            ))}
            {/* Notch */}
            <rect x="180" y="30" width="16" height="8" fill="var(--ram-notch)" stroke={stroke} strokeWidth="0.3" />
            {/* Contact pins */}
            {Array.from({ length: 28 }).map((_, j) => (
              <line
                key={`pin-${i}-${j}`}
                x1={12 + j * 13}
                y1="38"
                x2={12 + j * 13}
                y2="44"
                stroke={strokeLight}
                strokeWidth="0.3"
              />
            ))}
            {/* Label */}
            <text x="16" y="33" fill={stroke} fontSize="4" fontFamily="var(--font-geist-mono)">
              DDR5 SO-DIMM
            </text>
          </g>
        ))}

        {/* ── CAPACITORS — scattered below RAM ── */}
        {[
          { x: 40, y: 480 }, { x: 66, y: 480 },
          { x: 160, y: 495 }, { x: 186, y: 495 },
          { x: 290, y: 468 }, { x: 316, y: 468 },
        ].map((pos, i) => (
          <g key={`cap-${i}`} transform={`translate(${pos.x}, ${pos.y})`}>
            <rect x="0" y="0" width="18" height="30" rx="9" fill={fill} stroke={stroke} strokeWidth="0.4" />
            <line x1="4" y1="9" x2="14" y2="9" stroke={strokeLight} strokeWidth="0.3" />
            <line x1="4" y1="21" x2="14" y2="21" stroke={strokeLight} strokeWidth="0.3" />
          </g>
        ))}

        {/* ── Small ICs ── */}
        {[{ x: 120, y: 530 }, { x: 210, y: 530 }].map((pos, i) => (
          <g key={`ic-${i}`} transform={`translate(${pos.x}, ${pos.y})`}>
            <rect x="0" y="0" width="42" height="26" rx="2" fill={fill} stroke={stroke} strokeWidth="0.4" />
            {[6, 14, 22, 30].map((px) => (
              <g key={`p-${px}`}>
                <line x1={px} y1="0" x2={px} y2="-4" stroke={strokeLight} strokeWidth="0.3" />
                <line x1={px} y1="26" x2={px} y2="30" stroke={strokeLight} strokeWidth="0.3" />
              </g>
            ))}
          </g>
        ))}

        {/* ── DIMENSION LINE ── */}
        <g>
          <line x1="20" y1="580" x2="396" y2="580" stroke={strokeLight} strokeWidth="0.3" />
          <line x1="20" y1="575" x2="20" y2="585" stroke={strokeLight} strokeWidth="0.3" />
          <line x1="396" y1="575" x2="396" y2="585" stroke={strokeLight} strokeWidth="0.3" />
          <text
            x="208"
            y="578"
            textAnchor="middle"
            fill={strokeLight}
            fontSize="4"
            fontFamily="var(--font-geist-mono)"
          >
            376mm
          </text>
        </g>

        {/* ── CODE SNIPPET ── */}
        <g transform="translate(28, 620)">
          {[
            "<< #07808 >>",
            "  const handler = () => {",
            "    setState(\"RUNNING\")",
            "    dispatch(load())",
            "  }",
            "<< #BBCOO >>",
          ].map((line, i) => (
            <text
              key={i}
              y={i * 12}
              fill={strokeLight}
              fontSize="4"
              fontFamily="var(--font-geist-mono)"
            >
              {line}
            </text>
          ))}
        </g>

        {/* ── Resistors ── */}
        {[{ x: 60, y: 720 }, { x: 90, y: 720 }, { x: 120, y: 720 }, { x: 200, y: 740 }, { x: 230, y: 740 }].map(
          (pos, i) => (
            <rect
              key={`res-${i}`}
              x={pos.x}
              y={pos.y}
              width="14"
              height="6"
              rx="1"
              fill={fillAccent}
              stroke={stroke}
              strokeWidth="0.3"
            />
          )
        )}

        {/* ── Annotation text (rotated along left edge) ── */}
        <text
          x="14"
          y="900"
          fill={stroke}
          fontSize="5"
          fontFamily="var(--font-geist-mono)"
          transform="rotate(-90, 14, 900)"
          letterSpacing="0.08em"
        >
          REV_A · PARMINDER SINGH · 2025.01
        </text>

        {/* ── FIG label ── */}
        <text x="28" y="1060" fill={stroke} fontSize="4.5" fontFamily="var(--font-geist-mono)">
          FIG_002.left.panel
        </text>
      </svg>

      {/* ── Thin hatching strip on the inner (right) edge ── */}
      <div
        aria-hidden="true"
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
    </div>
  );
}
