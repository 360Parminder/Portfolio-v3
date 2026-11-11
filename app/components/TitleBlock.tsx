"use client";

import clsx from "clsx";
import { motion } from "motion/react";
import { CadDraftBox, useCadDraft } from "./CadDraft";

export function TitleBlock({
  className = "",
  trigger = "view",
}: {
  className?: string;
  trigger?: "mount" | "view";
}) {
  const { instantDone, isResetting } = useCadDraft();
  const baseDelay = trigger === "mount" ? 4.2 : 0.1;

  return (
    <CadDraftBox
      className={className}
      trigger={trigger}
      delay={baseDelay}
      strokeDuration={1.35}
      borderColor="var(--line-stroke)"
      backgroundColor="var(--background)"
      style={{
        width: "350px",
        pointerEvents: "auto",
        maxWidth: "100%",
      }}
    >
      <motion.div
        initial={instantDone ? { opacity: 1 } : { opacity: 0 }}
        animate={instantDone ? { opacity: 1 } : isResetting ? { opacity: 0 } : { opacity: 1 }}
        transition={instantDone || isResetting ? { duration: 0 } : { delay: baseDelay + 0.7, duration: 0.54 }}
        className={clsx("absolute", "right-0", "text-[9px]", "tracking-wide")}
        style={{ color: "var(--line-stroke-super)", bottom: "calc(100% + 6px)" }}
      >
        ALL SOURCE CODE AND REPOSITORIES ARE AVAILABLE AT GITHUB.COM/PARMINDER360
      </motion.div>

      <div className={clsx("flex", "flex-col", "uppercase")}>
        <div className={clsx("flex", "border-b", "border-[var(--line-stroke)]")}>
          <div className={clsx("w-full", "p-2", "flex", "items-center", "justify-center")}>
            <span className={clsx("font-bold", "text-sm", "tracking-widest", "text-[var(--foreground)]")}>
              PARMINDER DESIGNS
            </span>
          </div>
        </div>

        <div className={clsx("flex", "border-b", "border-[var(--line-stroke)]")}>
          <div className={clsx("w-[60%]", "p-2", "border-r", "border-[var(--line-stroke)]", "flex", "flex-col", "justify-center")}>
            <span className={clsx("text-[8px]", "opacity-70", "text-[var(--line-stroke-super)]")}>PROJECT TITLE</span>
            <span className={clsx("text-xs", "font-semibold", "tracking-wide", "mt-0.5", "text-[var(--foreground)]")}>PORTFOLIO ARCHITECTURE</span>
          </div>
          <div className={clsx("w-[40%]", "flex", "flex-col")}>
            <div className={clsx("flex-1", "border-b", "border-[var(--line-stroke)]", "flex", "items-center", "px-2")}>
              <span className={clsx("text-[8px]", "w-8", "opacity-70", "text-[var(--line-stroke-super)]")}>SIZE</span>
              <span className={clsx("text-[10px]", "text-[var(--foreground)]")}>WEB</span>
            </div>
            <div className={clsx("flex-1", "flex", "items-center", "px-2")}>
              <span className={clsx("text-[8px]", "w-8", "opacity-70", "text-[var(--line-stroke-super)]")}>REV</span>
              <span className={clsx("text-[10px]", "text-[var(--foreground)]")}>03</span>
            </div>
          </div>
        </div>

        <div className={clsx("flex", "border-b", "border-[var(--line-stroke)]")}>
          <div className={clsx("flex-1", "border-r", "border-[var(--line-stroke)]", "flex", "flex-col", "p-1.5", "px-2")}>
            <span className={clsx("text-[7px]", "opacity-70", "text-[var(--line-stroke-super)]")}>DRAWN BY</span>
            <span className={clsx("text-[9px]", "text-[var(--foreground)]")}>P. SINGH</span>
          </div>
          <div className={clsx("flex-1", "border-r", "border-[var(--line-stroke)]", "flex", "flex-col", "p-1.5", "px-2")}>
            <span className={clsx("text-[7px]", "opacity-70", "text-[var(--line-stroke-super)]")}>DATE</span>
            <span className={clsx("text-[9px]", "text-[var(--foreground)]")}>2026-07-20</span>
          </div>
          <div className={clsx("flex-1", "flex", "flex-col", "p-1.5", "px-2")}>
            <span className={clsx("text-[7px]", "opacity-70", "text-[var(--line-stroke-super)]")}>SCALE</span>
            <span className={clsx("text-[9px]", "text-[var(--foreground)]")}>1:1 (PIXELS)</span>
          </div>
        </div>

        <div className="flex">
          <div className={clsx("flex-1", "border-r", "border-[var(--line-stroke)]", "flex", "flex-col", "p-1.5", "px-2")}>
            <span className={clsx("text-[7px]", "opacity-70", "text-[var(--line-stroke-super)]")}>APPROVED BY</span>
            <span className={clsx("text-[9px]", "text-[var(--foreground)]")}>CLIENT</span>
          </div>
          <div className={clsx("flex-1", "border-r", "border-[var(--line-stroke)]", "flex", "flex-col", "p-1.5", "px-2")}>
            <span className={clsx("text-[7px]", "opacity-70", "text-[var(--line-stroke-super)]")}>STATUS</span>
            <span className={clsx("text-[9px]", "text-[var(--foreground)]")}>PRODUCTION</span>
          </div>
          <div className={clsx("flex-1", "flex", "flex-col", "p-1.5", "px-2")}>
            <span className={clsx("text-[7px]", "opacity-70", "text-[var(--line-stroke-super)]")}>SHEET</span>
            <span className={clsx("text-[9px]", "text-[var(--foreground)]")}>1 OF 1</span>
          </div>
        </div>
      </div>
    </CadDraftBox>
  );
}
