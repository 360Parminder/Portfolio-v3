"use client";

import React from "react";
import Image from "next/image";
import clsx from "clsx";


export default function Page() {
  return (
    <main className={clsx("relative", "min-h-full")}>

      {/* ── HERO SECTION ──
          Starts at the top of grid row 5, which is right below the top horizontal band (y ≈ 211px).
          No paddingTop needed — the grid row already positions this correctly.
      */}
      <section
        className={clsx("relative", "flex", "flex-col")}
        style={{
          borderBottom: "1px solid var(--line-stroke)",
          minHeight: "340px",
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
      </section>

    </main>
  );
}