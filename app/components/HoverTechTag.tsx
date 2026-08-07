"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { techLogos, getTechLogo } from "../data/techLogos";

export function HoverTechTag({ techName, baseStyle }: { techName: string; baseStyle: React.CSSProperties }) {
  const [isHovered, setIsHovered] = useState(false);
  const logo = getTechLogo(techName) || techLogos[techName];

  const height = baseStyle.height || "32px";
  const minWidth = baseStyle.minWidth || "32px";

  const smoothEase = [0.16, 1, 0.3, 1] as const;

  return (
    <motion.div
      layout
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={false}
      animate={{
        borderColor: isHovered ? "var(--foreground)" : (baseStyle.borderColor as string || "var(--line-stroke-accent)"),
        backgroundColor: isHovered ? "var(--line-fill-accent)" : (baseStyle.backgroundColor as string || "transparent"),
      }}
      transition={{
        duration: 0.3,
        ease: smoothEase,
        layout: { duration: 0.3, ease: smoothEase },
      }}
      style={{
        ...baseStyle,
        height,
        minWidth,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        overflow: "hidden",
        whiteSpace: "nowrap",
        userSelect: "none",
        position: "relative",
        padding: baseStyle.padding || "0 10px",
      }}
    >
      {/* Icon on Left with Shadow on the right side when text is coming out */}
      {logo ? (
        <motion.span
          layout
          animate={{
            filter: isHovered
              ? "drop-shadow(3px 0px 4px rgba(0,0,0,0.5))"
              : "drop-shadow(0px 0px 0px rgba(0,0,0,0))",
          }}
          transition={{ duration: 0.25, ease: smoothEase }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            zIndex: 2,
            position: "relative",
          }}
        >
          {logo}
        </motion.span>
      ) : null}

      {/* Tech Name on Right - Instant Text View with Smooth Width Expansion */}
      <AnimatePresence initial={false}>
        {(isHovered || !logo) && (
          <motion.span
            initial={{ opacity: 1, width: 0, marginLeft: 0 }}
            animate={{ opacity: 1, width: "auto", marginLeft: logo ? 6 : 0 }}
            exit={{ opacity: 1, width: 0, marginLeft: 0 }}
            transition={{
              duration: 0.3,
              ease: smoothEase,
            }}
            style={{
              display: "inline-block",
              overflow: "hidden",
              whiteSpace: "nowrap",
              fontSize: baseStyle.fontSize || "11px",
              fontWeight: baseStyle.fontWeight || 500,
              color: baseStyle.color || "var(--foreground)",
              letterSpacing: baseStyle.letterSpacing || "normal",
              zIndex: 1,
            }}
          >
            {techName}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
