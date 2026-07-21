"use client";

import React from "react";
import Image from "next/image";
import clsx from "clsx";


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