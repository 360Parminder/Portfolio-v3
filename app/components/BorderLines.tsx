"use client";

import clsx from "clsx";

export function BorderLines() {
  const hatching = {
    background: `repeating-linear-gradient(
      -45deg,
      transparent,
      transparent 4px,
      var(--line-hatch) 4px,
      var(--line-hatch) 5px
    )`,
  };

  return (
    <div
      className={clsx("fixed", "inset-0", "z-50", "pointer-events-none")}
      aria-hidden="true"
    >
      {/* ── Top horizontal band with hatching ── */}
      {/* Top border line */}
      <div
        className={clsx("absolute", "left-0", "right-0", "h-px")}
        style={{ top: "200px", backgroundColor: "var(--line-stroke)" }}
      />
      {/* Hatching fill between top lines */}
      <div
        className={clsx("absolute", "left-0", "right-0")}
        style={{ top: "201px", height: "9px", ...hatching }}
      />
      {/* Bottom border line of top band */}
      <div
        className={clsx("absolute", "left-0", "right-0", "h-px")}
        style={{ top: "210px", backgroundColor: "var(--line-stroke)" }}
      />

      {/* ── Bottom horizontal band with hatching ── */}
      <div
        className={clsx("absolute", "left-0", "right-0", "h-px")}
        style={{ bottom: "56px", backgroundColor: "var(--line-stroke)" }}
      />
      <div
        className={clsx("absolute", "left-0", "right-0")}
        style={{ bottom: "41px", height: "15px", ...hatching }}
      />
      <div
        className={clsx("absolute", "left-0", "right-0", "h-px")}
        style={{ bottom: "40px", backgroundColor: "var(--line-stroke)" }}
      />

      {/* ── Left vertical band with hatching ── */}
      <div
        className={clsx("absolute", "top-0", "bottom-0", "w-px")}
        style={{ left: "400px", backgroundColor: "var(--line-stroke)" }}
      />
      <div
        className={clsx("absolute", "top-0", "bottom-0")}
        style={{ left: "401px", width: "15px", ...hatching }}
      />
      <div
        className={clsx("absolute", "top-0", "bottom-0", "w-px")}
        style={{ left: "416px", backgroundColor: "var(--line-stroke)" }}
      />

      {/* ── Right vertical band with hatching ── */}
      <div
        className={clsx("absolute", "top-0", "bottom-0", "w-px")}
        style={{ right: "416px", backgroundColor: "var(--line-stroke)" }}
      />
      <div
        className={clsx("absolute", "top-0", "bottom-0")}
        style={{ right: "401px", width: "15px", ...hatching }}
      />
      <div
        className={clsx("absolute", "top-0", "bottom-0", "w-px")}
        style={{ right: "400px", backgroundColor: "var(--line-stroke)" }}
      />
    </div>
  );
}
