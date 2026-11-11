"use client";

import React from "react";
import { motion } from "motion/react";
import { CAD_EASE, CadDraftRule, useCadDraft } from "./CadDraft";
import { LeftGutter } from "./LeftGutter";
import { RightGutter } from "./RightGutter";

/**
 * PageGrid — structural 3-column layout.
 *
 * Column 1 (var(--col-left) = 416px) : LeftGutter  → border-right IS the left vertical line
 * Column 2 (1fr)                      : content
 * Column 3 (var(--col-right) = 400px) : RightGutter → border-left IS the right vertical line
 */
export function PageGrid({ children }: { children: React.ReactNode }) {
  const { instantDone, isResetting } = useCadDraft();

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
      <CadDraftRule
        axis="x"
        origin="left"
        delay={0.2}
        duration={1.1}
        style={{ gridColumn: "1 / -1", gridRow: "2", backgroundColor: "var(--line-stroke)" }}
      />
      <div
        aria-hidden="true"
        style={{ gridColumn: "1 / -1", gridRow: "3", position: "relative" }}
      >
        <motion.div
          initial={instantDone ? { clipPath: "inset(0 0% 0 0)" } : { clipPath: "inset(0 100% 0 0)" }}
          animate={
            instantDone
              ? { clipPath: "inset(0 0% 0 0)" }
              : isResetting
                ? { clipPath: "inset(0 100% 0 0)" }
                : { clipPath: "inset(0 0% 0 0)" }
          }
          transition={instantDone || isResetting ? { duration: 0 } : { delay: 0.65, duration: 0.9, ease: CAD_EASE }}
          style={{ ...hatching, inset: 0, position: "absolute" }}
        />
        {/* Horizontal scale (Top) */}
        <div
          className="absolute inset-0 flex"
          style={{ fontFamily: "var(--font-geist-mono)", fontSize: "10px", color: "var(--line-stroke-accent)", top: "-18px" }}
        >
          {["H", "G", "F", "E", "D", "C", "B", "A"].map((l, i) => (
            <motion.div
              key={l}
              initial={instantDone ? { opacity: 1 } : { opacity: 0 }}
              animate={instantDone ? { opacity: 1 } : isResetting ? { opacity: 0 } : { opacity: 1 }}
              transition={instantDone || isResetting ? { duration: 0 } : { delay: 0.55 + i * 0.06, duration: 0.4 }}
              className="flex-1 flex items-center justify-center relative"
            >
              <span className="absolute bottom-1 bg-[var(--background)] px-1">{l}</span>
              <div className="absolute bottom-0 w-[1px] h-[6px] bg-[var(--line-stroke)]" />
            </motion.div>
          ))}
        </div>
      </div>
      <CadDraftRule
        axis="x"
        origin="right"
        delay={0.32}
        duration={1.1}
        style={{ gridColumn: "1 / -1", gridRow: "4", backgroundColor: "var(--line-stroke)" }}
      />

      {/* ── MAIN CONTENT (participates directly in grid via display:contents in page.tsx) ── */}
      {children}

      {/* ── ROWS 6-8: bottom horizontal band — full width ── */}
      <CadDraftRule
        axis="x"
        origin="left"
        delay={0.4}
        duration={1.1}
        style={{ gridColumn: "1 / -1", gridRow: "6", backgroundColor: "var(--line-stroke)" }}
      />
      <div
        aria-hidden="true"
        style={{ gridColumn: "1 / -1", gridRow: "7", position: "relative" }}
      >
        <motion.div
          initial={instantDone ? { clipPath: "inset(0 0% 0 0)" } : { clipPath: "inset(0 100% 0 0)" }}
          animate={
            instantDone
              ? { clipPath: "inset(0 0% 0 0)" }
              : isResetting
                ? { clipPath: "inset(0 100% 0 0)" }
                : { clipPath: "inset(0 0% 0 0)" }
          }
          transition={instantDone || isResetting ? { duration: 0 } : { delay: 0.8, duration: 0.9, ease: CAD_EASE }}
          style={{ ...hatching, inset: 0, position: "absolute" }}
        />
        {/* Horizontal scale (Bottom) */}
        <div
          className="absolute inset-0 flex"
          style={{ fontFamily: "var(--font-geist-mono)", fontSize: "10px", color: "var(--line-stroke-accent)", bottom: "-18px" }}
        >
          {["H", "G", "F", "E", "D", "C", "B", "A"].map((l, i) => (
            <motion.div
              key={l}
              initial={instantDone ? { opacity: 1 } : { opacity: 0 }}
              animate={instantDone ? { opacity: 1 } : isResetting ? { opacity: 0 } : { opacity: 1 }}
              transition={instantDone || isResetting ? { duration: 0 } : { delay: 0.66 + i * 0.06, duration: 0.4 }}
              className="flex-1 flex items-center justify-center relative"
            >
              <div className="absolute top-0 w-[1px] h-[6px] bg-[var(--line-stroke)]" />
              <span className="absolute top-1 bg-[var(--background)] px-1">{l}</span>
            </motion.div>
          ))}
        </div>
      </div>
      <CadDraftRule
        axis="x"
        origin="right"
        delay={0.52}
        duration={1.1}
        style={{ gridColumn: "1 / -1", gridRow: "8", backgroundColor: "var(--line-stroke)" }}
      />
    </div>
  );
}
