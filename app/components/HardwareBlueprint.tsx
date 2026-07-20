"use client";

export function HardwareBlueprint() {
  const stroke = "var(--line-stroke)";
  const strokeLight = "var(--line-stroke-light)";
  const strokeAccent = "var(--line-stroke-accent)";
  const fill = "var(--line-fill)";
  const fillAccent = "var(--line-fill-accent)";

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1920 1080"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ── Grid Background ── */}
        <defs>
          <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke={strokeLight} strokeWidth="0.3" />
          </pattern>
          <pattern id="largeGrid" width="100" height="100" patternUnits="userSpaceOnUse">
            <rect width="100" height="100" fill="url(#smallGrid)" />
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke={stroke} strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#largeGrid)" />

        {/* ══════════════════════════════════════════
            CPU / PROCESSOR — center-left
        ══════════════════════════════════════════ */}
        <g transform="translate(650, 420)">
          {/* CPU base */}
          <rect x="0" y="0" width="120" height="120" rx="4" fill={fillAccent} stroke={strokeAccent} strokeWidth="0.8" />
          <rect x="10" y="10" width="100" height="100" rx="2" fill={fill} stroke={stroke} strokeWidth="0.5" />
          {/* Die */}
          <rect x="30" y="30" width="60" height="60" rx="1" fill={fillAccent} stroke={strokeAccent} strokeWidth="0.6" />
          <rect x="40" y="40" width="40" height="40" fill={fill} stroke={stroke} strokeWidth="0.4" />
          {/* Pins — top */}
          {[20, 35, 50, 65, 80, 95].map((x) => (
            <line key={`cpu-t-${x}`} x1={x} y1={0} x2={x} y2={-12} stroke={stroke} strokeWidth="0.5" />
          ))}
          {/* Pins — bottom */}
          {[20, 35, 50, 65, 80, 95].map((x) => (
            <line key={`cpu-b-${x}`} x1={x} y1={120} x2={x} y2={132} stroke={stroke} strokeWidth="0.5" />
          ))}
          {/* Pins — left */}
          {[20, 35, 50, 65, 80, 95].map((y) => (
            <line key={`cpu-l-${y}`} x1={0} y1={y} x2={-12} y2={y} stroke={stroke} strokeWidth="0.5" />
          ))}
          {/* Pins — right */}
          {[20, 35, 50, 65, 80, 95].map((y) => (
            <line key={`cpu-r-${y}`} x1={120} y1={y} x2={132} y2={y} stroke={stroke} strokeWidth="0.5" />
          ))}
          {/* Label */}
          <text x="60" y="64" textAnchor="middle" fill={strokeAccent} fontSize="7" fontFamily="var(--font-geist-mono)">CORE</text>
          <text x="60" y="74" textAnchor="middle" fill={stroke} fontSize="5" fontFamily="var(--font-geist-mono)">PROCESSOR</text>
        </g>

        {/* ══════════════════════════════════════════
            HEAT SINK — above CPU
        ══════════════════════════════════════════ */}
        <g transform="translate(640, 250)">
          {/* Fan housing */}
          <rect x="0" y="0" width="140" height="140" rx="70" fill="none" stroke={stroke} strokeWidth="0.5" />
          <circle cx="70" cy="70" r="55" fill={fill} stroke={stroke} strokeWidth="0.5" />
          <circle cx="70" cy="70" r="15" fill={fillAccent} stroke={strokeAccent} strokeWidth="0.6" />
          {/* Fan blades */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <line
              key={`fan-${angle}`}
              x1="70" y1="70"
              x2={70 + 50 * Math.cos((angle * Math.PI) / 180)}
              y2={70 + 50 * Math.sin((angle * Math.PI) / 180)}
              stroke={stroke}
              strokeWidth="0.4"
            />
          ))}
          {/* Heatsink fins */}
          <rect x="-10" y="145" width="160" height="30" rx="2" fill={fill} stroke={stroke} strokeWidth="0.5" />
          {Array.from({ length: 14 }).map((_, i) => (
            <line key={`fin-${i}`} x1={i * 11 + 2} y1="148" x2={i * 11 + 2} y2="172" stroke={strokeLight} strokeWidth="0.4" />
          ))}
        </g>

        {/* ══════════════════════════════════════════
            RAM STICKS — left side
        ══════════════════════════════════════════ */}
        {[0, 1].map((i) => (
          <g key={`ram-${i}`} transform={`translate(200, ${380 + i * 50})`}>
            <rect x="0" y="0" width="300" height="35" rx="2" fill={fill} stroke={stroke} strokeWidth="0.5" />
            {/* Chips on RAM */}
            {Array.from({ length: 8 }).map((_, j) => (
              <rect key={`ram-chip-${i}-${j}`} x={15 + j * 34} y="6" width="24" height="12" rx="1" fill={fillAccent} stroke={stroke} strokeWidth="0.4" />
            ))}
            {/* Notch */}
            <rect x="140" y="28" width="20" height="7" fill="var(--ram-notch)" stroke={stroke} strokeWidth="0.3" />
            {/* Contact pins */}
            {Array.from({ length: 30 }).map((_, j) => (
              <line key={`ram-pin-${i}-${j}`} x1={10 + j * 9.5} y1="35" x2={10 + j * 9.5} y2="40" stroke={strokeLight} strokeWidth="0.3" />
            ))}
            {/* Label */}
            <text x="15" y="30" fill={stroke} fontSize="4" fontFamily="var(--font-geist-mono)">DDR5 SO-DIMM</text>
          </g>
        ))}

        {/* ══════════════════════════════════════════
            HARD DRIVE / STORAGE — top right
        ══════════════════════════════════════════ */}
        <g transform="translate(1200, 150)">
          {/* Drive housing */}
          <rect x="0" y="0" width="180" height="120" rx="4" fill={fill} stroke={stroke} strokeWidth="0.6" />
          {/* Platter */}
          <circle cx="80" cy="55" r="40" fill="none" stroke={stroke} strokeWidth="0.5" />
          <circle cx="80" cy="55" r="30" fill="none" stroke={strokeLight} strokeWidth="0.3" />
          <circle cx="80" cy="55" r="20" fill="none" stroke={strokeLight} strokeWidth="0.3" />
          <circle cx="80" cy="55" r="5" fill={fillAccent} stroke={strokeAccent} strokeWidth="0.5" />
          {/* Actuator arm */}
          <line x1="80" y1="55" x2="155" y2="25" stroke={strokeAccent} strokeWidth="0.7" />
          <rect x="148" y="18" width="20" height="14" rx="2" fill={fill} stroke={stroke} strokeWidth="0.4" />
          {/* Label */}
          <text x="10" y="115" fill={stroke} fontSize="5" fontFamily="var(--font-geist-mono)">PLATTERS</text>
          <text x="140" y="15" fill={stroke} fontSize="4" fontFamily="var(--font-geist-mono)">ACTUATOR</text>
        </g>

        {/* ══════════════════════════════════════════
            IO PORTS — right side
        ══════════════════════════════════════════ */}
        <g transform="translate(1400, 400)">
          {/* USB ports */}
          {[0, 1, 2].map((i) => (
            <g key={`usb-${i}`} transform={`translate(0, ${i * 40})`}>
              <rect x="0" y="0" width="50" height="28" rx="2" fill={fill} stroke={stroke} strokeWidth="0.5" />
              <rect x="5" y="5" width="40" height="18" rx="1" fill="none" stroke={strokeLight} strokeWidth="0.4" />
              <rect x="10" y="9" width="30" height="10" rx="1" fill={fillAccent} stroke={stroke} strokeWidth="0.3" />
            </g>
          ))}
          <text x="0" y="-8" fill={stroke} fontSize="5" fontFamily="var(--font-geist-mono)">IO PORTS</text>
        </g>

        {/* ══════════════════════════════════════════
            POWER CONNECTOR — top left
        ══════════════════════════════════════════ */}
        <g transform="translate(150, 180)">
          <rect x="0" y="0" width="80" height="45" rx="3" fill={fill} stroke={stroke} strokeWidth="0.5" />
          {/* Pin rows */}
          {Array.from({ length: 6 }).map((_, i) => (
            <g key={`pwr-pin-${i}`}>
              <circle cx={12 + i * 10} cy="15" r="3" fill="none" stroke={stroke} strokeWidth="0.4" />
              <circle cx={12 + i * 10} cy="30" r="3" fill="none" stroke={stroke} strokeWidth="0.4" />
            </g>
          ))}
          <text x="0" y="-5" fill={stroke} fontSize="5" fontFamily="var(--font-geist-mono)">POWER CONNECTOR</text>
        </g>

        {/* ══════════════════════════════════════════
            CAPACITORS — scattered
        ══════════════════════════════════════════ */}
        {[
          { x: 550, y: 350 },
          { x: 580, y: 350 },
          { x: 850, y: 500 },
          { x: 880, y: 500 },
          { x: 300, y: 550 },
          { x: 330, y: 550 },
        ].map((pos, i) => (
          <g key={`cap-${i}`} transform={`translate(${pos.x}, ${pos.y})`}>
            <rect x="0" y="0" width="18" height="30" rx="9" fill={fill} stroke={stroke} strokeWidth="0.4" />
            <line x1="4" y1="8" x2="14" y2="8" stroke={strokeLight} strokeWidth="0.3" />
            <line x1="4" y1="22" x2="14" y2="22" stroke={strokeLight} strokeWidth="0.3" />
          </g>
        ))}

        {/* ══════════════════════════════════════════
            CHIPSET — bottom right
        ══════════════════════════════════════════ */}
        <g transform="translate(1150, 500)">
          <rect x="0" y="0" width="160" height="160" rx="4" fill={fill} stroke={stroke} strokeWidth="0.6" />
          {/* Stacked boards */}
          {[0, 1, 2, 3].map((i) => (
            <rect key={`board-${i}`} x="10" y={10 + i * 35} width="140" height="28" rx="2" fill={fillAccent} stroke={stroke} strokeWidth="0.4" />
          ))}
          {/* Chips on boards */}
          {[0, 1, 2, 3].map((i) =>
            [0, 1, 2].map((j) => (
              <rect key={`bchip-${i}-${j}`} x={20 + j * 42} y={15 + i * 35} width="30" height="18" rx="1" fill={fill} stroke={strokeLight} strokeWidth="0.3" />
            ))
          )}
          <text x="80" y="175" textAnchor="middle" fill={stroke} fontSize="5" fontFamily="var(--font-geist-mono)">CORE PROCESSOR</text>
        </g>

        {/* ══════════════════════════════════════════
            CIRCUIT TRACES — connecting components
        ══════════════════════════════════════════ */}
        {/* CPU to Heat Sink */}
        <polyline points="710,420 710,395" fill="none" stroke={stroke} strokeWidth="0.5" />

        {/* CPU to RAM */}
        <polyline points="650,480 500,480 500,400" fill="none" stroke={stroke} strokeWidth="0.5" />
        <polyline points="650,490 500,490 500,450" fill="none" stroke={stroke} strokeWidth="0.5" />

        {/* CPU to Chipset */}
        <polyline points="770,480 900,480 900,580 1150,580" fill="none" stroke={stroke} strokeWidth="0.5" />

        {/* CPU to IO Ports */}
        <polyline points="782,480 900,480 900,420 1400,420" fill="none" stroke={stroke} strokeWidth="0.5" />

        {/* Chipset to IO Ports */}
        <polyline points="1310,540 1400,540" fill="none" stroke={stroke} strokeWidth="0.5" />

        {/* Power connector to CPU */}
        <polyline points="230,200 350,200 350,480 650,480" fill="none" stroke={strokeLight} strokeWidth="0.4" />

        {/* RAM to Power */}
        <polyline points="200,380 150,380 150,225" fill="none" stroke={strokeLight} strokeWidth="0.4" />

        {/* CPU to HDD */}
        <polyline points="710,420 710,300 1000,300 1000,200 1200,200" fill="none" stroke={stroke} strokeWidth="0.5" />

        {/* Trace nodes (dots at junctions) */}
        {[
          [500, 480], [500, 490], [900, 480], [900, 580],
          [350, 200], [350, 480], [150, 380],
          [710, 300], [1000, 300], [1000, 200],
        ].map(([cx, cy], i) => (
          <circle key={`node-${i}`} cx={cx} cy={cy} r="2" fill={strokeAccent} />
        ))}

        {/* ══════════════════════════════════════════
            SMALL COMPONENTS — resistors, transistors
        ══════════════════════════════════════════ */}
        {/* Resistors */}
        {[
          { x: 450, y: 300 },
          { x: 480, y: 300 },
          { x: 510, y: 300 },
          { x: 950, y: 350 },
          { x: 980, y: 350 },
          { x: 1010, y: 350 },
          { x: 1100, y: 450 },
          { x: 1130, y: 450 },
        ].map((pos, i) => (
          <rect key={`res-${i}`} x={pos.x} y={pos.y} width="12" height="5" rx="1" fill={fillAccent} stroke={stroke} strokeWidth="0.3" />
        ))}

        {/* Small ICs */}
        {[
          { x: 900, y: 300 },
          { x: 1050, y: 400 },
          { x: 350, y: 300 },
        ].map((pos, i) => (
          <g key={`ic-${i}`} transform={`translate(${pos.x}, ${pos.y})`}>
            <rect x="0" y="0" width="40" height="25" rx="2" fill={fill} stroke={stroke} strokeWidth="0.4" />
            {[5, 12, 19, 26, 33].map((px) => (
              <g key={`ic-pin-${i}-${px}`}>
                <line x1={px} y1="0" x2={px} y2="-4" stroke={strokeLight} strokeWidth="0.3" />
                <line x1={px} y1="25" x2={px} y2="29" stroke={strokeLight} strokeWidth="0.3" />
              </g>
            ))}
          </g>
        ))}

        {/* ══════════════════════════════════════════
            ANNOTATIONS — blueprint labels
        ══════════════════════════════════════════ */}
        <text x="1205" y="290" fill={stroke} fontSize="5" fontFamily="var(--font-geist-mono)">FIG_001.exploded.view</text>

        {/* Dimension lines */}
        <g>
          <line x1="200" y1="620" x2="500" y2="620" stroke={strokeLight} strokeWidth="0.3" />
          <line x1="200" y1="615" x2="200" y2="625" stroke={strokeLight} strokeWidth="0.3" />
          <line x1="500" y1="615" x2="500" y2="625" stroke={strokeLight} strokeWidth="0.3" />
          <text x="350" y="618" textAnchor="middle" fill={strokeLight} fontSize="4" fontFamily="var(--font-geist-mono)">300mm</text>
        </g>

        {/* Code snippet decoration */}
        <g transform="translate(120, 620)">
          <text y="0" fill={strokeLight} fontSize="4" fontFamily="var(--font-geist-mono)">{"<< #07808 >>"}</text>
          <text y="10" fill={strokeLight} fontSize="4" fontFamily="var(--font-geist-mono)">{"  const = 'handler'"}</text>
          <text y="20" fill={strokeLight} fontSize="4" fontFamily="var(--font-geist-mono)">{"  setState(\"RUNNING\")"}</text>
          <text y="30" fill={strokeLight} fontSize="4" fontFamily="var(--font-geist-mono)">{" << #BBCOO >>"}</text>
        </g>
      </svg>
    </div>
  );
}
