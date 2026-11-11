"use client";

import { motion } from "motion/react";
import { CAD_EASE, CadDraftRule, useCadDraft } from "./CadDraft";

export function LeftGutter() {
  const { instantDone, isResetting } = useCadDraft();
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
        overflow: "hidden",
      }}
    >
      {/* Vertical right boundary ruled top-to-bottom */}
      <CadDraftRule
        axis="y"
        origin="top"
        delay={0.08}
        duration={1.25}
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          width: "1px",
          backgroundColor: "var(--line-stroke)",
          zIndex: 2,
        }}
      />

      {/* Subtle engineering grid background */}
      <motion.svg
        viewBox="0 0 416 1080"
        xmlns="http://www.w3.org/2000/svg"
        initial={instantDone ? { opacity: 1 } : { opacity: 0 }}
        animate={instantDone ? { opacity: 1 } : isResetting ? { opacity: 0 } : { opacity: 1 }}
        transition={instantDone || isResetting ? { duration: 0 } : { delay: 0.08, duration: 1.3, ease: "easeOut" }}
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
      </motion.svg>

      {/* Thin hatching strip on the inner (right) edge */}
      <motion.div
        initial={instantDone ? { clipPath: "inset(0 0 0% 0)" } : { clipPath: "inset(0 0 100% 0)" }}
        animate={
          instantDone
            ? { clipPath: "inset(0 0 0% 0)" }
            : isResetting
              ? { clipPath: "inset(0 0 100% 0)" }
              : { clipPath: "inset(0 0 0% 0)" }
        }
        transition={instantDone || isResetting ? { duration: 0 } : { delay: 0.65, duration: 1.1, ease: CAD_EASE }}
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
        {/* Left rule of scale strip */}
        <CadDraftRule
          axis="y"
          origin="top"
          delay={0.25}
          duration={1.1}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "1px",
            backgroundColor: "var(--line-stroke)",
          }}
        />
        {["4", "3", "2", "1"].map((n, i) => (
          <motion.div
            key={n}
            initial={instantDone ? { opacity: 1 } : { opacity: 0 }}
            animate={instantDone ? { opacity: 1 } : isResetting ? { opacity: 0 } : { opacity: 1 }}
            transition={instantDone || isResetting ? { duration: 0 } : { delay: 0.6 + i * 0.12, duration: 0.48 }}
            className="flex-1 flex items-center justify-center relative"
          >
            {i < 3 && (
              <CadDraftRule
                axis="x"
                origin="right"
                delay={0.52 + i * 0.12}
                duration={0.44}
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "1px",
                  backgroundColor: "var(--line-stroke)",
                }}
              />
            )}
            {n}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
