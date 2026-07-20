"use client";

import React from "react";
import { LeftGutter } from "./LeftGutter";
import { RightGutter } from "./RightGutter";

/**
 * PageGrid — structural 3-column layout.
 *
 * Column 1 (var(--col-left) = 416px) : LeftGutter  → border-right IS the left vertical line
 * Column 2 (1fr)                      : content
 * Column 3 (var(--col-right) = 400px) : RightGutter → border-left IS the right vertical line
 *
 * Rows:
 *   1 — 200px   top spacer (navbar lives in col-2 via fixed position)
 *   2 — 1px     top band top line
 *   3 — 9px     top band hatching
 *   4 — 1px     top band bottom line
 *   5 — 1fr     main content
 *   6 — 1px     bottom band top line
 *   7 — 15px    bottom band hatching
 *   8 — 1px     bottom band bottom line
 *
 * The gutters span ALL rows (1 → -1).
 * The horizontal band divs span ALL columns (1 → -1) at rows 2-4 and 6-8.
 * CSS Grid stacks overlapping cells in DOM order — bands render on top of gutters at those rows.
 */
export function PageGrid({ children }: { children: React.ReactNode }) {
  const hatching = {
    background: `repeating-linear-gradient(
      -45deg,
      transparent,
      transparent 4px,
      var(--line-hatch) 4px,
      var(--line-hatch) 5px
    )`,
  } as React.CSSProperties;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "var(--col-left) 1fr var(--col-right)",
        gridTemplateRows: "auto 1px 9px 1px 1fr 1px 15px 1px",
        minHeight: "100vh",
      }}
    >
      {/* ── COL 1: Left gutter — spans all rows ── */}
      <div style={{ gridColumn: "1", gridRow: "1 / -1" }}>
        <LeftGutter />
      </div>

      {/* ── COL 3: Right gutter — spans all rows ── */}
      <div style={{ gridColumn: "3", gridRow: "1 / -1" }}>
        <RightGutter />
      </div>

      {/* ── ROWS 2-4: top horizontal band — full width ── */}
      <div
        aria-hidden="true"
        style={{ gridColumn: "1 / -1", gridRow: "2", backgroundColor: "var(--line-stroke)" }}
      />
      <div
        aria-hidden="true"
        style={{ gridColumn: "1 / -1", gridRow: "3", ...hatching, position: "relative" }}
      >
        {/* Horizontal scale (Top) */}
        <div 
          className="absolute inset-0 flex"
          style={{ fontFamily: "var(--font-geist-mono)", fontSize: "10px", color: "var(--line-stroke-accent)", top: "-18px" }}
        >
          {["H", "G", "F", "E", "D", "C", "B", "A"].map((l, i) => (
            <div key={l} className="flex-1 flex items-center justify-center relative">
              <span className="absolute bottom-1 bg-[var(--background)] px-1">{l}</span>
              <div className="absolute bottom-0 w-[1px] h-[6px] bg-[var(--line-stroke)]" />
            </div>
          ))}
        </div>
      </div>
      <div
        aria-hidden="true"
        style={{ gridColumn: "1 / -1", gridRow: "4", backgroundColor: "var(--line-stroke)" }}
      />

      {/* ── MAIN CONTENT (participates directly in grid via display:contents in page.tsx) ── */}
      {children}

      {/* ── ROWS 6-8: bottom horizontal band — full width ── */}
      <div
        aria-hidden="true"
        style={{ gridColumn: "1 / -1", gridRow: "6", backgroundColor: "var(--line-stroke)" }}
      />
      <div
        aria-hidden="true"
        style={{ gridColumn: "1 / -1", gridRow: "7", ...hatching, position: "relative" }}
      >
        {/* Horizontal scale (Bottom) */}
        <div 
          className="absolute inset-0 flex"
          style={{ fontFamily: "var(--font-geist-mono)", fontSize: "10px", color: "var(--line-stroke-accent)", bottom: "-18px" }}
        >
          {["H", "G", "F", "E", "D", "C", "B", "A"].map((l, i) => (
            <div key={l} className="flex-1 flex items-center justify-center relative">
              <div className="absolute top-0 w-[1px] h-[6px] bg-[var(--line-stroke)]" />
              <span className="absolute top-1 bg-[var(--background)] px-1">{l}</span>
            </div>
          ))}
        </div>
      </div>
      <div
        aria-hidden="true"
        style={{ gridColumn: "1 / -1", gridRow: "8", backgroundColor: "var(--line-stroke)" }}
      />
    </div>
  );
}
