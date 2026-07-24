"use client";

import Image from "next/image";
import clsx from "clsx";
import { Caveat } from "next/font/google";

const caveat = Caveat({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export default function Page() {
  return (
    <main style={{ display: "contents" }}>

      {/* ── HERO SECTION ──
          Placed in gridRow: 1 (above the top horizontal band).
          Padding top is 60px to clear the fixed navbar.
      */}
      <section
        className={clsx("relative", "flex", "flex-col")}
        style={{
          gridColumn: "2",
          gridRow: "1",
          paddingTop: "60px",
          borderBottom: "1px solid var(--line-stroke)",
        }}
      >
        {/* Hero image — flush to left and right edges of the content column */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "260px",
            overflow: "hidden",
          }}
        >
          <Image
            src="/hero-art.jpg"
            alt="Hero artwork"
            fill
            style={{ objectFit: "cover", objectPosition: "center 30%" }}
            priority
          />
          {/* Subtle gradient fade at the bottom */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, transparent 60%, var(--background) 100%)",
            }}
          />
          {/* FIG label */}
          <span
            style={{
              position: "absolute",
              bottom: "8px",
              right: "12px",
              fontSize: "9px",
              fontFamily: "var(--font-geist-mono)",
              color: "var(--line-stroke-accent)",
              letterSpacing: "0.1em",
            }}
          >
            FIG_001
          </span>
        </div>

        {/* Profile Image Placeholder */}
        <div
          style={{
            position: "absolute",
            bottom: "0",
            left: "10px",
            transform: "translateY(50%)",
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            border: "1px dashed var(--line-stroke-accent)",
            backgroundColor: "var(--background)",
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* CAD-style rotating role label */}
          <div
            style={{
              position: "absolute",
              top: "-50px",
              left: "-180px",
              width: "200px",
              height: "80px",
              pointerEvents: "none",
              zIndex: 20,
            }}
          >
            <style>{`
              @keyframes cad-ticker {
                0%, 22% { transform: translateY(0); }
                33%, 55% { transform: translateY(-18px); }
                66%, 88% { transform: translateY(-36px); }
                100% { transform: translateY(-54px); }
              }
            `}</style>
            <svg width="100%" height="100%" style={{ overflow: "visible" }}>
              <circle cx="198" cy="68" r="2" fill="var(--line-stroke-accent)" />
              <path
                d="M 198,68 L 165,35 L 0,35"
                fill="none"
                stroke="var(--line-stroke-accent)"
                strokeWidth="1"
              />
            </svg>
            <div
              style={{
                position: "absolute",
                top: "15px",
                left: "0px",
                width: "160px",
                height: "18px",
                overflow: "hidden",
                fontFamily: "var(--font-geist-mono)",
                fontSize: "10px",
                color: "var(--foreground)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              <div
                className={caveat.className}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  animation: "cad-ticker 8s infinite cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                <div style={{ height: "18px", display: "flex", alignItems: "center" }}>Design Engineer</div>
                <div style={{ height: "18px", display: "flex", alignItems: "center" }}>Open Source Contributor</div>
                <div style={{ height: "18px", display: "flex", alignItems: "center" }}>Small details matter</div>
                <div style={{ height: "18px", display: "flex", alignItems: "center" }}>Design Engineer</div>
              </div>
            </div>
          </div>

          {/* CAD Height Dimension */}
          <div
            style={{
              position: "absolute",
              top: "0",
              left: "-25px",
              width: "20px",
              height: "120px",
              pointerEvents: "none",
            }}
          >
            <svg width="100%" height="100%" style={{ overflow: "visible" }}>
              <line x1="25" y1="0" x2="5" y2="0" stroke="var(--line-stroke-accent)" strokeWidth="1" />
              <line x1="25" y1="120" x2="5" y2="120" stroke="var(--line-stroke-accent)" strokeWidth="1" />
              <line x1="10" y1="0" x2="10" y2="120" stroke="var(--line-stroke-accent)" strokeWidth="1" />
              <polygon points="10,0 7,5 13,5" fill="var(--line-stroke-accent)" />
              <polygon points="10,120 7,115 13,115" fill="var(--line-stroke-accent)" />
            </svg>
            <span
              style={{
                position: "absolute",
                top: "50%",
                left: "10px",
                transform: "translate(-50%, -50%) rotate(-90deg)",
                fontSize: "10px",
                fontFamily: "var(--font-geist-mono)",
                color: "var(--line-stroke-accent)",
                backgroundColor: "var(--background)",
                padding: "0 4px",
              }}
            >
              120
            </span>
          </div>

          {/* CAD Width Dimension */}
          <div
            style={{
              position: "absolute",
              bottom: "-25px",
              left: "0",
              width: "120px",
              height: "20px",
              pointerEvents: "none",
            }}
          >
            <svg width="100%" height="100%" style={{ overflow: "visible" }}>
              <line x1="0" y1="-5" x2="0" y2="15" stroke="var(--line-stroke-accent)" strokeWidth="1" />
              <line x1="120" y1="-5" x2="120" y2="15" stroke="var(--line-stroke-accent)" strokeWidth="1" />
              <line x1="0" y1="10" x2="120" y2="10" stroke="var(--line-stroke-accent)" strokeWidth="1" />
              <polygon points="0,10 5,7 5,13" fill="var(--line-stroke-accent)" />
              <polygon points="120,10 115,7 115,13" fill="var(--line-stroke-accent)" />
            </svg>
            <span
              style={{
                position: "absolute",
                top: "10px",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: "10px",
                fontFamily: "var(--font-geist-mono)",
                color: "var(--line-stroke-accent)",
                backgroundColor: "var(--background)",
                padding: "0 4px",
              }}
            >
              120
            </span>
          </div>

          {/* CAD-style label with handwritten name */}
          <div
            style={{
              position: "absolute",
              top: "0px",
              left: "105px",
              width: "160px",
              height: "80px",
              pointerEvents: "none",
              zIndex: 20,
            }}
          >
            <svg width="100%" height="100%" style={{ overflow: "visible" }}>
              <path
                d="M 0,60 L 30,30 L 160,30"
                fill="none"
                stroke="var(--line-stroke-accent)"
                strokeWidth="1"
              />
              <circle cx="0" cy="60" r="2" fill="var(--line-stroke-accent)" />
            </svg>
            <span
              className={caveat.className}
              style={{
                position: "absolute",
                bottom: "52px",
                left: "35px",
                fontSize: "32px",
                color: "var(--foreground)",
                whiteSpace: "nowrap",
                lineHeight: "1",
              }}
            >
              Parminder
            </span>
          </div>

          {/* Inner solid border to make it look like a technical target */}
          <div
            className={clsx("relative", "overflow-hidden")}
            style={{
              width: "104px",
              height: "104px",
              borderRadius: "50%",
              border: "1px solid var(--line-stroke)",
            }}
          >
            <Image
              src="/profile.jpg"
              alt="Hero artwork"
              fill
              style={{ objectFit: "cover", objectPosition: "center 30%" }}
              priority
            />

          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ──
          Placed in gridRow: 5 (below the top horizontal band).
      */}
      <div style={{ gridColumn: "2", gridRow: "5" }}>
        {/* Future page content will go here */}
        <section style={{ minHeight: "50vh", padding: "40px 0" }}>
        </section>
      </div>

    </main>
  );
}