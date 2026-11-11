"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";

export const CAD_EASE = [0.22, 1, 0.36, 1] as const;

interface WriteQueueItem {
  el: Element;
  id: string;
  priority: number;
  totalDurationMs: number;
}

interface BoxQueueItem {
  durationMs: number;
  el: Element;
  id: string;
}

interface CadDraftContextValue {
  activeBoxId: string | null;
  activeWriteId: string | null;
  completedBoxIds: Set<string>;
  completedWriteIds: Set<string>;
  draftEpoch: number;
  enabled: boolean;
  instantDone: boolean;
  isDrafting: boolean;
  isResetting: boolean;
  registerBoxSlot: (item: BoxQueueItem) => () => void;
  registerWriteSlot: (item: WriteQueueItem) => () => void;
  replayDraft: () => void;
  skipDraft: () => void;
}

const CadDraftContext = createContext<CadDraftContextValue>({
  activeBoxId: null,
  activeWriteId: null,
  completedBoxIds: new Set(),
  completedWriteIds: new Set(),
  draftEpoch: 0,
  enabled: false,
  instantDone: true,
  isDrafting: false,
  isResetting: false,
  registerBoxSlot: () => () => {},
  registerWriteSlot: () => () => {},
  replayDraft: () => {},
  skipDraft: () => {},
});

export function useCadDraft() {
  return useContext(CadDraftContext);
}

interface CadBoxContextValue {
  boxReady: boolean;
  inBox: boolean;
}

const CadBoxContext = createContext<CadBoxContextValue>({
  boxReady: true,
  inBox: false,
});

const OPENING_DURATION_MS = 10600;
const EMPTY_SET = new Set<string>();

function isElementDisplayed(el: Element): boolean {
  return el.isConnected && el.getClientRects().length > 0;
}

function compareDomOrder(a: Element, b: Element): number {
  if (a === b) return 0;
  const pos = a.compareDocumentPosition(b);
  if (pos & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
  if (pos & Node.DOCUMENT_POSITION_PRECEDING) return 1;
  return 0;
}

function useCadShouldDraw(
  ref: React.RefObject<Element | null>,
  trigger: "mount" | "view",
  threshold = 0.02
) {
  const { draftEpoch, instantDone, isResetting } = useCadDraft();
  const [drawnEpoch, setDrawnEpoch] = useState<number | null>(null);

  useEffect(() => {
    if (trigger !== "view" || instantDone || isResetting) return;
    if (drawnEpoch === draftEpoch) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setDrawnEpoch(draftEpoch);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, trigger, threshold, draftEpoch, drawnEpoch, instantDone, isResetting]);

  if (instantDone || isResetting) return false;
  if (trigger === "mount") return true;
  return drawnEpoch === draftEpoch;
}

/**
 * Coordinates the sequential single-pen handwriting queue across the entire page.
 * Guarantees at most ONE handwritten note writes at any moment, strictly top-to-bottom.
 */
export function useCadWriteSlot({
  ref,
  trigger = "view",
  minDelayMs = 0,
  priority = 100,
  totalDurationMs = 1020,
  requireBoxReady = false,
}: {
  ref: React.RefObject<Element | null>;
  trigger?: "mount" | "view";
  minDelayMs?: number;
  priority?: number;
  totalDurationMs?: number;
  requireBoxReady?: boolean;
}) {
  const slotId = useId();
  const {
    activeWriteId,
    completedWriteIds,
    draftEpoch,
    instantDone,
    isResetting,
    registerWriteSlot,
  } = useCadDraft();
  const { boxReady, inBox } = useContext(CadBoxContext);

  const inViewTriggered = useCadShouldDraw(ref, trigger, 0.05);
  const [delayEpoch, setDelayEpoch] = useState<number | null>(null);
  const [hiddenSettledEpoch, setHiddenSettledEpoch] = useState<number | null>(null);

  useEffect(() => {
    if (instantDone || isResetting) return;
    if (minDelayMs <= 0) return;
    const t = window.setTimeout(() => {
      setDelayEpoch(draftEpoch);
    }, minDelayMs);
    return () => window.clearTimeout(t);
  }, [draftEpoch, instantDone, isResetting, minDelayMs]);

  const effectiveBoxReady = !requireBoxReady || !inBox || boxReady;
  const delayReady = minDelayMs <= 0 || delayEpoch === draftEpoch;
  const eligible =
    !instantDone &&
    !isResetting &&
    inViewTriggered &&
    effectiveBoxReady &&
    delayReady;

  useEffect(() => {
    if (!eligible) return;
    const el = ref.current;
    if (!el) return;

    if (!isElementDisplayed(el)) {
      const mql = window.matchMedia("(min-width: 768px)");
      const mql2xl = window.matchMedia("(min-width: 1536px)");
      const checkLater = () => {
        if (isElementDisplayed(el)) {
          setHiddenSettledEpoch(draftEpoch);
        }
      };
      mql.addEventListener("change", checkLater);
      mql2xl.addEventListener("change", checkLater);
      return () => {
        mql.removeEventListener("change", checkLater);
        mql2xl.removeEventListener("change", checkLater);
      };
    }

    return registerWriteSlot({
      el,
      id: slotId,
      priority,
      totalDurationMs,
    });
  }, [
    draftEpoch,
    eligible,
    priority,
    ref,
    registerWriteSlot,
    slotId,
    totalDurationMs,
  ]);

  if (instantDone || hiddenSettledEpoch === draftEpoch) {
    return "done" as const;
  }
  if (isResetting) {
    return "waiting" as const;
  }
  if (completedWriteIds.has(slotId)) {
    return "done" as const;
  }
  if (activeWriteId === slotId) {
    return "active" as const;
  }
  return "waiting" as const;
}

export function CadDraftProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [prefersReduced, setPrefersReduced] = useState(false);
  const [draftEpoch, setDraftEpoch] = useState(0);
  const [skipped, setSkipped] = useState(false);
  const [openingDone, setOpeningDone] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [visitedSubpage, setVisitedSubpage] = useState(false);

  const [writeState, setWriteState] = useState<{
    activeId: string | null;
    doneIds: Set<string>;
  }>({ activeId: null, doneIds: new Set() });

  const [boxState, setBoxState] = useState<{
    activeId: string | null;
    doneIds: Set<string>;
  }>({ activeId: null, doneIds: new Set() });

  const timersRef = useRef<number[]>([]);

  // Mutable queue state mutated only inside effects / callbacks
  const writeItemsRef = useRef<Map<string, WriteQueueItem>>(new Map());
  const writeActiveRef = useRef<string | null>(null);
  const writeDoneRef = useRef<Set<string>>(new Set());
  const writePumpScheduledRef = useRef(false);
  const writeStepTimerRef = useRef<number | null>(null);
  const pumpWriteRef = useRef<() => void>(() => {});

  const boxItemsRef = useRef<Map<string, BoxQueueItem>>(new Map());
  const boxActiveRef = useRef<string | null>(null);
  const boxDoneRef = useRef<Set<string>>(new Set());
  const boxPumpScheduledRef = useRef(false);
  const boxStepTimerRef = useRef<number | null>(null);
  const pumpBoxRef = useRef<() => void>(() => {});

  const clearQueueTimers = useCallback(() => {
    if (writeStepTimerRef.current !== null) {
      window.clearTimeout(writeStepTimerRef.current);
      writeStepTimerRef.current = null;
    }
    if (boxStepTimerRef.current !== null) {
      window.clearTimeout(boxStepTimerRef.current);
      boxStepTimerRef.current = null;
    }
    writePumpScheduledRef.current = false;
    boxPumpScheduledRef.current = false;
  }, []);

  const clearAllTimers = useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
    clearQueueTimers();
  }, [clearQueueTimers]);

  const resetQueues = useCallback(() => {
    clearQueueTimers();
    writeItemsRef.current.clear();
    writeActiveRef.current = null;
    writeDoneRef.current = new Set();
    boxItemsRef.current.clear();
    boxActiveRef.current = null;
    boxDoneRef.current = new Set();
    setWriteState({ activeId: null, doneIds: new Set() });
    setBoxState({ activeId: null, doneIds: new Set() });
  }, [clearQueueTimers]);

  const pumpWriteQueue = useCallback(() => {
    writePumpScheduledRef.current = false;
    if (writeActiveRef.current !== null) return;

    const pending: WriteQueueItem[] = [];
    const vh = window.innerHeight || 900;
    let settledAny = false;

    for (const item of writeItemsRef.current.values()) {
      if (writeDoneRef.current.has(item.id)) continue;
      if (!item.el.isConnected) continue;

      const rect = item.el.getBoundingClientRect();
      // Scrolled past above the viewport: settle cleanly without blocking current viewport
      if (rect.bottom < -40) {
        writeDoneRef.current.add(item.id);
        settledAny = true;
        continue;
      }

      // Active viewport or Hero notes
      if ((rect.top < vh + 40 && rect.bottom > 0) || item.priority < 50) {
        pending.push(item);
      }
    }

    if (pending.length === 0) {
      if (settledAny) {
        setWriteState({
          activeId: null,
          doneIds: new Set(writeDoneRef.current),
        });
      }
      return;
    }

    pending.sort((a, b) => {
      if (a.priority !== b.priority) return a.priority - b.priority;
      return compareDomOrder(a.el, b.el);
    });

    const next = pending[0];
    writeActiveRef.current = next.id;
    setWriteState({
      activeId: next.id,
      doneIds: new Set(writeDoneRef.current),
    });

    writeStepTimerRef.current = window.setTimeout(() => {
      writeStepTimerRef.current = null;
      writeDoneRef.current.add(next.id);
      writeActiveRef.current = null;
      setWriteState({
        activeId: null,
        doneIds: new Set(writeDoneRef.current),
      });
      pumpWriteRef.current();
    }, next.totalDurationMs);
  }, []);

  const scheduleWritePump = useCallback(() => {
    if (writePumpScheduledRef.current || writeActiveRef.current !== null) return;
    writePumpScheduledRef.current = true;
    window.setTimeout(() => {
      pumpWriteRef.current();
    }, 16);
  }, []);

  const registerWriteSlot = useCallback(
    (item: WriteQueueItem) => {
      writeItemsRef.current.set(item.id, item);
      scheduleWritePump();
      return () => {
        writeItemsRef.current.delete(item.id);
        if (writeActiveRef.current === item.id) {
          if (writeStepTimerRef.current !== null) {
            window.clearTimeout(writeStepTimerRef.current);
            writeStepTimerRef.current = null;
          }
          writeActiveRef.current = null;
          scheduleWritePump();
        }
      };
    },
    [scheduleWritePump]
  );

  const pumpBoxQueue = useCallback(() => {
    boxPumpScheduledRef.current = false;
    if (boxActiveRef.current !== null) return;

    const pending: BoxQueueItem[] = [];
    const vh = window.innerHeight || 900;
    let settledAny = false;

    for (const item of boxItemsRef.current.values()) {
      if (boxDoneRef.current.has(item.id)) continue;
      if (!item.el.isConnected) continue;

      const rect = item.el.getBoundingClientRect();
      if (rect.bottom < -60) {
        boxDoneRef.current.add(item.id);
        settledAny = true;
        continue;
      }
      if (rect.top < vh + 260) {
        pending.push(item);
      }
    }

    if (pending.length === 0) {
      if (settledAny) {
        setBoxState({
          activeId: null,
          doneIds: new Set(boxDoneRef.current),
        });
      }
      return;
    }

    pending.sort((a, b) => compareDomOrder(a.el, b.el));
    const next = pending[0];
    boxActiveRef.current = next.id;
    setBoxState({
      activeId: next.id,
      doneIds: new Set(boxDoneRef.current),
    });

    // Cascade next visible box calmly after ~920ms (as drafting scale finishes top/right edges)
    const cascadeMs = Math.min(920, Math.round(next.durationMs * 0.65));
    boxStepTimerRef.current = window.setTimeout(() => {
      boxStepTimerRef.current = null;
      boxDoneRef.current.add(next.id);
      boxActiveRef.current = null;
      setBoxState({
        activeId: null,
        doneIds: new Set(boxDoneRef.current),
      });
      pumpBoxRef.current();
    }, cascadeMs);
  }, []);

  useEffect(() => {
    pumpWriteRef.current = pumpWriteQueue;
    pumpBoxRef.current = pumpBoxQueue;
  }, [pumpWriteQueue, pumpBoxQueue]);

  const scheduleBoxPump = useCallback(() => {
    if (boxPumpScheduledRef.current || boxActiveRef.current !== null) return;
    boxPumpScheduledRef.current = true;
    window.setTimeout(() => {
      pumpBoxRef.current();
    }, 16);
  }, []);

  const registerBoxSlot = useCallback(
    (item: BoxQueueItem) => {
      boxItemsRef.current.set(item.id, item);
      scheduleBoxPump();
      return () => {
        boxItemsRef.current.delete(item.id);
        if (boxActiveRef.current === item.id) {
          if (boxStepTimerRef.current !== null) {
            window.clearTimeout(boxStepTimerRef.current);
            boxStepTimerRef.current = null;
          }
          boxActiveRef.current = null;
          scheduleBoxPump();
        }
      };
    },
    [scheduleBoxPump]
  );

  // Wake queues on scroll in case items entered/left viewport while busy
  useEffect(() => {
    const onScroll = () => {
      scheduleBoxPump();
      scheduleWritePump();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [scheduleBoxPump, scheduleWritePump]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncReduced = () => setPrefersReduced(mq.matches);
    const t = window.setTimeout(syncReduced, 0);
    mq.addEventListener("change", syncReduced);
    return () => {
      window.clearTimeout(t);
      mq.removeEventListener("change", syncReduced);
    };
  }, []);

  const enabled = isHome && !prefersReduced;
  const instantDone = !enabled || skipped || visitedSubpage;
  const isDrafting = !instantDone && !openingDone && !isResetting;

  const scheduleOpeningFinish = useCallback(() => {
    clearQueueTimers();
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
    const t = window.setTimeout(() => {
      setOpeningDone(true);
    }, OPENING_DURATION_MS);
    timersRef.current.push(t);
  }, [clearQueueTimers]);

  useEffect(() => {
    if (!isHome) {
      const t = window.setTimeout(() => {
        setVisitedSubpage(true);
        setOpeningDone(true);
        resetQueues();
      }, 0);
      return () => window.clearTimeout(t);
    }

    if (!instantDone && !openingDone && !isResetting) {
      const t = window.setTimeout(() => {
        setOpeningDone(true);
      }, OPENING_DURATION_MS);
      return () => window.clearTimeout(t);
    }
  }, [isHome, instantDone, openingDone, isResetting, resetQueues]);

  useEffect(() => {
    return () => clearAllTimers();
  }, [clearAllTimers]);

  const skipDraft = useCallback(() => {
    clearAllTimers();
    resetQueues();
    setSkipped(true);
    setOpeningDone(true);
    setIsResetting(false);
  }, [clearAllTimers, resetQueues]);

  const replayDraft = useCallback(() => {
    if (!isHome || prefersReduced) return;
    clearAllTimers();
    resetQueues();
    window.scrollTo({ top: 0, behavior: "instant" });
    setVisitedSubpage(false);
    setSkipped(false);
    setOpeningDone(false);
    setIsResetting(true);
    setDraftEpoch((prev) => prev + 1);

    const resetTimer = window.setTimeout(() => {
      setIsResetting(false);
      scheduleOpeningFinish();
    }, 55);
    timersRef.current.push(resetTimer);
  }, [clearAllTimers, isHome, prefersReduced, resetQueues, scheduleOpeningFinish]);

  useEffect(() => {
    if (!isDrafting) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        skipDraft();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isDrafting, skipDraft]);

  return (
    <CadDraftContext.Provider
      value={{
        activeBoxId: instantDone ? null : boxState.activeId,
        activeWriteId: instantDone ? null : writeState.activeId,
        completedBoxIds: instantDone ? EMPTY_SET : boxState.doneIds,
        completedWriteIds: instantDone ? EMPTY_SET : writeState.doneIds,
        draftEpoch,
        enabled,
        instantDone,
        isDrafting,
        isResetting,
        registerBoxSlot,
        registerWriteSlot,
        replayDraft,
        skipDraft,
      }}
    >
      {children}
    </CadDraftContext.Provider>
  );
}

/**
 * Vector drafting mechanical pencil nib whose tip rests at local (0, 0).
 */
export function DraftPencilNib({
  size = 16,
  style,
}: {
  size?: number;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={{
        overflow: "visible",
        pointerEvents: "none",
        transform: "translate(-1px, -15px)",
        ...style,
      }}
    >
      <circle cx="2" cy="22" r="2.2" fill="var(--foreground)" opacity="0.9" />
      <circle cx="2" cy="22" r="4.5" fill="var(--foreground)" opacity="0.18" />
      <path
        d="M 15.5 3.5 L 20.5 8.5 L 7.5 21.5 L 2 22 L 2.5 16.5 Z"
        fill="var(--background)"
        stroke="var(--foreground)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <line x1="13" y1="6" x2="18" y2="11" stroke="var(--foreground)" strokeWidth="1.2" />
      <line x1="3.8" y1="18.2" x2="5.8" y2="20.2" stroke="var(--foreground)" strokeWidth="1.2" />
    </svg>
  );
}

/**
 * Translucent graduated CAD Drafting Scale (straight-edge ruler) aligned against an edge
 * while the mechanical pencil draws along it.
 */
export function DraftingScaleRuler({
  edge,
  delay,
  duration,
  insetMode = false,
}: {
  edge: "top" | "right" | "bottom" | "left";
  delay: number;
  duration: number;
  insetMode?: boolean;
}) {
  const isHorizontal = edge === "top" || edge === "bottom";

  const positionStyle: React.CSSProperties =
    edge === "top"
      ? {
          ...(insetMode
            ? { left: 0, right: 0, top: "3px" }
            : { bottom: "calc(100% + 1px)", left: "-6px", right: "-6px" }),
          height: "11px",
        }
      : edge === "bottom"
        ? {
            height: "11px",
            left: "-6px",
            right: "-6px",
            top: "calc(100% + 1px)",
          }
        : edge === "right"
          ? {
              bottom: "-6px",
              left: "calc(100% + 1px)",
              top: "-6px",
              width: "11px",
            }
          : {
              bottom: "-6px",
              right: "calc(100% + 1px)",
              top: "-6px",
              width: "11px",
            };

  const minorTicks = isHorizontal
    ? "repeating-linear-gradient(90deg, color-mix(in srgb, var(--foreground) 34%, transparent) 0 1px, transparent 1px 6px)"
    : "repeating-linear-gradient(180deg, color-mix(in srgb, var(--foreground) 34%, transparent) 0 1px, transparent 1px 6px)";

  const majorTicks = isHorizontal
    ? "repeating-linear-gradient(90deg, color-mix(in srgb, var(--foreground) 65%, transparent) 0 1px, transparent 1px 30px)"
    : "repeating-linear-gradient(180deg, color-mix(in srgb, var(--foreground) 65%, transparent) 0 1px, transparent 1px 30px)";

  const offsetSlide =
    edge === "top"
      ? { y: [-4, 0, 0, -4] }
      : edge === "bottom"
        ? { y: [4, 0, 0, 4] }
        : edge === "right"
          ? { x: [4, 0, 0, 4] }
          : { x: [-4, 0, 0, -4] };

  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 0.96, 0.96, 0],
        ...offsetSlide,
      }}
      transition={{
        delay,
        duration,
        times: [0, 0.14, 0.86, 1],
        ease: "easeOut",
      }}
      style={{
        ...positionStyle,
        backdropFilter: "blur(2px)",
        backgroundColor: "color-mix(in srgb, var(--background) 84%, var(--foreground) 6%)",
        border: "1px solid var(--line-stroke-accent)",
        borderRadius: "1px",
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.12)",
        overflow: "hidden",
        pointerEvents: "none",
        position: "absolute",
        zIndex: 27,
      }}
    >
      {/* Fine millimeter ticks along the drawing bevel */}
      <div
        style={{
          backgroundImage: minorTicks,
          height: isHorizontal ? "4px" : "100%",
          position: "absolute",
          width: isHorizontal ? "100%" : "4px",
          ...(edge === "top" ? { bottom: 0, left: 0 } : {}),
          ...(edge === "bottom" ? { top: 0, left: 0 } : {}),
          ...(edge === "right" ? { left: 0, top: 0 } : {}),
          ...(edge === "left" ? { right: 0, top: 0 } : {}),
        }}
      />
      {/* Major graduation marks */}
      <div
        style={{
          backgroundImage: majorTicks,
          height: isHorizontal ? "7px" : "100%",
          position: "absolute",
          width: isHorizontal ? "100%" : "7px",
          ...(edge === "top" ? { bottom: 0, left: 0 } : {}),
          ...(edge === "bottom" ? { top: 0, left: 0 } : {}),
          ...(edge === "right" ? { left: 0, top: 0 } : {}),
          ...(edge === "left" ? { right: 0, top: 0 } : {}),
        }}
      />
      {edge === "top" && (
        <span
          style={{
            color: "var(--nav-link)",
            fontFamily: "var(--font-geist-mono)",
            fontSize: "6px",
            left: "5px",
            letterSpacing: "0.08em",
            lineHeight: 1,
            opacity: 0.72,
            position: "absolute",
            top: "1px",
          }}
        >
          SCALE 1:1
        </span>
      )}
    </motion.div>
  );
}

/**
 * Hand-writing reveal for Caveat notes: queued one-by-one across the whole screen
 * and wiped left-to-right synced with a drafting pencil nib.
 */
export function HandwrittenStroke({
  children,
  minDelayMs = 0,
  duration = 0.9,
  trigger = "mount",
  showNib = true,
  nibSize = 15,
  priority = 100,
  requireBoxReady = false,
  className,
  style,
}: {
  children: React.ReactNode;
  minDelayMs?: number;
  duration?: number;
  trigger?: "mount" | "view";
  showNib?: boolean;
  nibSize?: number;
  priority?: number;
  requireBoxReady?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  const { draftEpoch, instantDone, isResetting } = useCadDraft();
  const ref = useRef<HTMLSpanElement | null>(null);
  const slotState = useCadWriteSlot({
    minDelayMs,
    priority,
    ref,
    requireBoxReady,
    totalDurationMs: Math.round(duration * 1000) + 120,
    trigger,
  });

  if (instantDone) {
    return (
      <span className={className} style={style}>
        {children}
      </span>
    );
  }

  const isRevealed = slotState === "active" || slotState === "done";
  const skipAnimation = slotState === "done" && isResetting;

  return (
    <span
      ref={ref}
      className={className}
      style={{
        position: "relative",
        ...style,
        display: "inline-block",
      }}
    >
      <motion.span
        initial={{ clipPath: "inset(-30% 100% -30% -4%)" }}
        animate={
          isRevealed
            ? { clipPath: "inset(-30% -6% -30% -4%)" }
            : { clipPath: "inset(-30% 100% -30% -4%)" }
        }
        transition={
          isResetting || skipAnimation
            ? { duration: 0 }
            : {
                duration,
                ease: [0.32, 0.04, 0.24, 1],
              }
        }
        style={{ display: "inline-block" }}
      >
        {children}
      </motion.span>

      {showNib && slotState === "active" && (
        <motion.span
          key={`nib-${draftEpoch}`}
          aria-hidden="true"
          initial={{ left: "0%", opacity: 0, y: -4 }}
          animate={{
            left: ["0%", "100%"],
            opacity: [0, 1, 1, 1, 0],
            y: [-4, 0, -2.5, 1.5, -2, 1, -6],
          }}
          transition={{
            left: { duration, ease: [0.32, 0.04, 0.24, 1] },
            opacity: {
              duration: duration + 0.08,
              times: [0, 0.08, 0.85, 0.94, 1],
            },
            y: {
              duration,
              ease: "easeInOut",
            },
          }}
          style={{
            bottom: "15%",
            pointerEvents: "none",
            position: "absolute",
            zIndex: 30,
          }}
        >
          <DraftPencilNib size={nibSize} />
        </motion.span>
      )}
    </span>
  );
}

/**
 * CAD Structural Wireframe Box built edge-by-edge with a graduated CAD Drafting Scale
 * (top -> right -> bottom -> left), corner registration ticks, scale caliper support,
 * and sequential completion signaling for inner handwritten margin labels.
 */
export function CadDraftBox({
  id,
  className,
  style,
  delay = 0,
  strokeDuration = 1.45,
  trigger = "view",
  borderColor = "var(--line-stroke-accent)",
  backgroundColor = "var(--line-fill)",
  children,
}: {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  strokeDuration?: number;
  trigger?: "mount" | "view";
  borderColor?: string;
  backgroundColor?: string;
  children: React.ReactNode;
}) {
  const boxId = useId();
  const {
    activeBoxId,
    completedBoxIds,
    draftEpoch,
    instantDone,
    isResetting,
    registerBoxSlot,
  } = useCadDraft();

  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useCadShouldDraw(ref, trigger, 0.02);
  const [boxReadyEpoch, setBoxReadyEpoch] = useState<number | null>(null);

  useEffect(() => {
    if (trigger !== "view" || instantDone || isResetting || !inView) return;
    const el = ref.current;
    if (!el) return;
    return registerBoxSlot({
      durationMs: Math.round(strokeDuration * 1000),
      el,
      id: boxId,
    });
  }, [boxId, instantDone, inView, isResetting, registerBoxSlot, strokeDuration, trigger]);

  const shouldDraw =
    !instantDone &&
    !isResetting &&
    (trigger === "mount"
      ? true
      : inView && (activeBoxId === boxId || completedBoxIds.has(boxId)));

  const effectiveDelay = trigger === "view" ? 0.02 : delay;

  useEffect(() => {
    if (!shouldDraw) return;
    const readyMs = Math.round((effectiveDelay + strokeDuration * 0.88) * 1000);
    const t = window.setTimeout(() => {
      setBoxReadyEpoch(draftEpoch);
    }, readyMs);
    return () => window.clearTimeout(t);
  }, [draftEpoch, effectiveDelay, shouldDraw, strokeDuration]);

  const boxReady = instantDone || (!isResetting && boxReadyEpoch === draftEpoch);

  const hasPositionClass = /\b(absolute|fixed|relative|sticky)\b/.test(className ?? "");
  const defaultPosition = style?.position || hasPositionClass ? undefined : ("relative" as const);

  if (instantDone) {
    return (
      <div
        id={id}
        className={className}
        style={{
          backgroundColor,
          border: `1px solid ${borderColor}`,
          ...(defaultPosition ? { position: defaultPosition } : {}),
          ...style,
        }}
      >
        <CadBoxContext.Provider value={{ boxReady: true, inBox: true }}>
          {children}
        </CadBoxContext.Provider>
      </div>
    );
  }

  // Exact perimeter edge timing aligned with the single moving pencil nib
  const T = strokeDuration;
  const t1 = 0.28;
  const t2 = 0.5;
  const t3 = 0.78;

  const lineStroke = "color-mix(in srgb, var(--foreground) 68%, transparent)";

  return (
    <div
      ref={ref}
      id={id}
      className={className}
      style={{
        ...(defaultPosition ? { position: defaultPosition } : {}),
        ...style,
        backgroundColor: "transparent",
        border: "1px solid transparent",
      }}
    >
      {/* Settled Surface Tint Wash + Permanent Native Border */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: shouldDraw ? 1 : 0 }}
        transition={
          isResetting
            ? { duration: 0 }
            : {
                delay: effectiveDelay + T * 0.66,
                duration: 0.56,
                ease: "easeOut",
              }
        }
        style={{
          backgroundColor,
          border: `1px solid ${borderColor}`,
          inset: "-1px",
          pointerEvents: "none",
          position: "absolute",
          zIndex: 0,
        }}
      />

      {/* Edge-by-Edge Scale & Pencil Construction Overlay */}
      {shouldDraw && (
        <React.Fragment key={`box-scale-draw-${draftEpoch}`}>
          {/* Top, Right, Bottom, Left 1px Hairlines drawn sequentially */}
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 1, scaleX: 0 }}
            animate={{ opacity: [1, 1, 0], scaleX: 1 }}
            transition={{
              opacity: { delay: effectiveDelay + T * 0.82, duration: 0.48, times: [0, 0.4, 1] },
              scaleX: { delay: effectiveDelay, duration: T * t1, ease: "linear" },
            }}
            style={{
              backgroundColor: lineStroke,
              height: "1.25px",
              left: "-1px",
              pointerEvents: "none",
              position: "absolute",
              right: "-1px",
              top: "-1px",
              transformOrigin: "left",
              zIndex: 25,
            }}
          />
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 1, scaleY: 0 }}
            animate={{ opacity: [1, 1, 0], scaleY: 1 }}
            transition={{
              opacity: { delay: effectiveDelay + T * 0.82, duration: 0.48, times: [0, 0.4, 1] },
              scaleY: { delay: effectiveDelay + T * t1, duration: T * (t2 - t1), ease: "linear" },
            }}
            style={{
              backgroundColor: lineStroke,
              bottom: "-1px",
              pointerEvents: "none",
              position: "absolute",
              right: "-1px",
              top: "-1px",
              transformOrigin: "top",
              width: "1.25px",
              zIndex: 25,
            }}
          />
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 1, scaleX: 0 }}
            animate={{ opacity: [1, 1, 0], scaleX: 1 }}
            transition={{
              opacity: { delay: effectiveDelay + T * 0.82, duration: 0.48, times: [0, 0.4, 1] },
              scaleX: { delay: effectiveDelay + T * t2, duration: T * (t3 - t2), ease: "linear" },
            }}
            style={{
              backgroundColor: lineStroke,
              bottom: "-1px",
              height: "1.25px",
              left: "-1px",
              pointerEvents: "none",
              position: "absolute",
              right: "-1px",
              transformOrigin: "right",
              zIndex: 25,
            }}
          />
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 1, scaleY: 0 }}
            animate={{ opacity: [1, 1, 0], scaleY: 1 }}
            transition={{
              opacity: { delay: effectiveDelay + T * 0.82, duration: 0.48, times: [0, 0.4, 1] },
              scaleY: { delay: effectiveDelay + T * t3, duration: T * (1 - t3), ease: "linear" },
            }}
            style={{
              backgroundColor: lineStroke,
              bottom: "-1px",
              left: "-1px",
              pointerEvents: "none",
              position: "absolute",
              top: "-1px",
              transformOrigin: "bottom",
              width: "1.25px",
              zIndex: 25,
            }}
          />

          {/* Graduated CAD Drafting Scale Rulers appearing along each active edge */}
          <DraftingScaleRuler edge="top" delay={effectiveDelay} duration={T * t1 + 0.06} />
          <DraftingScaleRuler edge="right" delay={effectiveDelay + T * t1} duration={T * (t2 - t1) + 0.06} />
          <DraftingScaleRuler edge="bottom" delay={effectiveDelay + T * t2} duration={T * (t3 - t2) + 0.06} />
          <DraftingScaleRuler edge="left" delay={effectiveDelay + T * t3} duration={T * (1 - t3) + 0.06} />

          {/* Single Mechanical Pencil Nib tracing clockwise around all 4 edges */}
          <motion.div
            aria-hidden="true"
            initial={{ left: "0%", opacity: 0, top: "0%" }}
            animate={{
              left: ["0%", "100%", "100%", "0%", "0%"],
              opacity: [0, 1, 1, 1, 1, 0],
              top: ["0%", "0%", "100%", "100%", "0%"],
            }}
            transition={{
              left: { delay: effectiveDelay, duration: T, ease: "linear", times: [0, t1, t2, t3, 1] },
              opacity: {
                delay: effectiveDelay,
                duration: T + 0.08,
                times: [0, 0.04, 0.28, 0.78, 0.94, 1],
              },
              top: { delay: effectiveDelay, duration: T, ease: "linear", times: [0, t1, t2, t3, 1] },
            }}
            style={{
              pointerEvents: "none",
              position: "absolute",
              zIndex: 28,
            }}
          >
            <DraftPencilNib size={15} />
          </motion.div>

          {/* Corner Registration Crosshairs (+) */}
          <motion.svg
            aria-hidden="true"
            width="10"
            height="10"
            viewBox="0 0 10 10"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0] }}
            transition={{ delay: effectiveDelay, duration: T * 0.45, times: [0, 0.25, 1] }}
            style={{ left: "-5px", pointerEvents: "none", position: "absolute", top: "-5px", zIndex: 26 }}
          >
            <line x1="0" y1="5" x2="10" y2="5" stroke="var(--foreground)" strokeWidth="0.9" />
            <line x1="5" y1="0" x2="5" y2="10" stroke="var(--foreground)" strokeWidth="0.9" />
          </motion.svg>
          <motion.svg
            aria-hidden="true"
            width="10"
            height="10"
            viewBox="0 0 10 10"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0] }}
            transition={{ delay: effectiveDelay + T * t2, duration: T * 0.45, times: [0, 0.25, 1] }}
            style={{ bottom: "-5px", pointerEvents: "none", position: "absolute", right: "-5px", zIndex: 26 }}
          >
            <line x1="0" y1="5" x2="10" y2="5" stroke="var(--foreground)" strokeWidth="0.9" />
            <line x1="5" y1="0" x2="5" y2="10" stroke="var(--foreground)" strokeWidth="0.9" />
          </motion.svg>
        </React.Fragment>
      )}

      {/* Inner Content Reveal */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={shouldDraw ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
        transition={
          isResetting
            ? { duration: 0 }
            : {
                delay: effectiveDelay + T * 0.58,
                duration: 0.62,
                ease: CAD_EASE,
              }
        }
        style={{ position: "relative" }}
      >
        <CadBoxContext.Provider value={{ boxReady, inBox: true }}>
          {children}
        </CadBoxContext.Provider>
      </motion.div>
    </div>
  );
}

/**
 * Animated Left CAD Height Scale Bracket ("H: AUTO").
 * Extends end-ticks and vertical caliper span right after the parent box finishes ruling.
 */
export function CadDraftHeightScale({ label = "H: AUTO" }: { label?: string }) {
  const { instantDone, isResetting } = useCadDraft();
  const { boxReady } = useContext(CadBoxContext);
  const visible = !isResetting && (instantDone || boxReady);

  return (
    <div
      className="hidden md:block"
      style={{
        bottom: "0",
        left: "-12px",
        pointerEvents: "none",
        position: "absolute",
        top: "0",
        width: "6px",
      }}
    >
      {/* Top extension tick */}
      <motion.div
        initial={instantDone ? { scaleX: 1 } : { scaleX: 0 }}
        animate={{ scaleX: visible ? 1 : 0 }}
        transition={instantDone || isResetting ? { duration: 0 } : { duration: 0.34, ease: CAD_EASE }}
        style={{
          backgroundColor: "var(--line-stroke-accent)",
          height: "1px",
          left: 0,
          position: "absolute",
          right: 0,
          top: 0,
          transformOrigin: "right",
        }}
      />
      {/* Bottom extension tick */}
      <motion.div
        initial={instantDone ? { scaleX: 1 } : { scaleX: 0 }}
        animate={{ scaleX: visible ? 1 : 0 }}
        transition={instantDone || isResetting ? { duration: 0 } : { delay: 0.08, duration: 0.34, ease: CAD_EASE }}
        style={{
          backgroundColor: "var(--line-stroke-accent)",
          bottom: 0,
          height: "1px",
          left: 0,
          position: "absolute",
          right: 0,
          transformOrigin: "right",
        }}
      />
      {/* Vertical caliper line */}
      <motion.div
        initial={instantDone ? { scaleY: 1 } : { scaleY: 0 }}
        animate={{ scaleY: visible ? 1 : 0 }}
        transition={instantDone || isResetting ? { duration: 0 } : { delay: 0.16, duration: 0.46, ease: CAD_EASE }}
        style={{
          backgroundColor: "var(--line-stroke-accent)",
          bottom: 0,
          left: 0,
          position: "absolute",
          top: 0,
          transformOrigin: "center",
          width: "1px",
        }}
      />
      <motion.span
        initial={instantDone ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={instantDone || isResetting ? { duration: 0 } : { delay: 0.38, duration: 0.36 }}
        style={{
          backgroundColor: "var(--background)",
          color: "var(--line-stroke-accent)",
          fontFamily: "var(--font-geist-mono)",
          fontSize: "9px",
          left: "0",
          letterSpacing: "0.1em",
          padding: "0 4px",
          position: "absolute",
          top: "50%",
          transform: "translate(-50%, -50%) rotate(-90deg)",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </motion.span>
    </div>
  );
}

/**
 * Animated Top CAD Width Scale Bracket ("W: 100% (SCALE 1:1)").
 * Extends left/right end-ticks and horizontal caliper span right after the parent box finishes ruling.
 */
export function CadDraftWidthScale({
  label = "W: 100% (SCALE 1:1)",
}: {
  label?: string;
}) {
  const { instantDone, isResetting } = useCadDraft();
  const { boxReady } = useContext(CadBoxContext);
  const visible = !isResetting && (instantDone || boxReady);

  return (
    <div
      className="hidden md:block"
      style={{
        height: "6px",
        left: "0",
        pointerEvents: "none",
        position: "absolute",
        right: "0",
        top: "-12px",
      }}
    >
      {/* Left extension tick */}
      <motion.div
        initial={instantDone ? { scaleY: 1 } : { scaleY: 0 }}
        animate={{ scaleY: visible ? 1 : 0 }}
        transition={instantDone || isResetting ? { duration: 0 } : { duration: 0.34, ease: CAD_EASE }}
        style={{
          backgroundColor: "var(--line-stroke-accent)",
          bottom: 0,
          left: 0,
          position: "absolute",
          top: 0,
          transformOrigin: "bottom",
          width: "1px",
        }}
      />
      {/* Right extension tick */}
      <motion.div
        initial={instantDone ? { scaleY: 1 } : { scaleY: 0 }}
        animate={{ scaleY: visible ? 1 : 0 }}
        transition={instantDone || isResetting ? { duration: 0 } : { delay: 0.08, duration: 0.34, ease: CAD_EASE }}
        style={{
          backgroundColor: "var(--line-stroke-accent)",
          bottom: 0,
          position: "absolute",
          right: 0,
          top: 0,
          transformOrigin: "bottom",
          width: "1px",
        }}
      />
      {/* Horizontal caliper span */}
      <motion.div
        initial={instantDone ? { scaleX: 1 } : { scaleX: 0 }}
        animate={{ scaleX: visible ? 1 : 0 }}
        transition={instantDone || isResetting ? { duration: 0 } : { delay: 0.16, duration: 0.46, ease: CAD_EASE }}
        style={{
          backgroundColor: "var(--line-stroke-accent)",
          height: "1px",
          left: 0,
          position: "absolute",
          right: 0,
          top: 0,
          transformOrigin: "center",
        }}
      />
      <motion.span
        initial={instantDone ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={instantDone || isResetting ? { duration: 0 } : { delay: 0.38, duration: 0.36 }}
        style={{
          backgroundColor: "var(--background)",
          color: "var(--line-stroke-accent)",
          fontFamily: "var(--font-geist-mono)",
          fontSize: "9px",
          left: "50%",
          letterSpacing: "0.1em",
          padding: "0 4px",
          position: "absolute",
          top: "0",
          transform: "translate(-50%, -50%)",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </motion.span>
    </div>
  );
}

/**
 * Animated CAD Ruler Line (1px structural axis line that draws cleanly along X or Y).
 */
export function CadDraftRule({
  axis = "x",
  origin,
  delay = 0,
  duration = 0.72,
  className,
  style,
}: {
  axis?: "x" | "y";
  origin?: "left" | "right" | "top" | "bottom" | "center";
  delay?: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const { instantDone, isResetting } = useCadDraft();
  const transformOrigin = origin ?? (axis === "x" ? "left" : "top");

  if (instantDone) {
    return <div aria-hidden="true" className={className} style={style} />;
  }

  return (
    <motion.div
      aria-hidden="true"
      className={className}
      initial={axis === "x" ? { scaleX: 0 } : { scaleY: 0 }}
      animate={
        isResetting
          ? axis === "x"
            ? { scaleX: 0 }
            : { scaleY: 0 }
          : axis === "x"
            ? { scaleX: 1 }
            : { scaleY: 1 }
      }
      transition={
        isResetting
          ? { duration: 0 }
          : { delay, duration, ease: CAD_EASE }
      }
      style={{
        ...style,
        transformOrigin,
      }}
    />
  );
}

/**
 * Animated CAD Margin Annotation ("Height: Auto, Size: 11px, Weight: 600")
 * Queued strictly one-by-one across the whole screen:
 * Anchor dot -> Leader polyline -> Handwritten stroke with single active pencil nib.
 */
export function CadDimensionLabelAnimated({
  caveatClassName,
  trigger = "view",
  minDelayMs = 0,
}: {
  caveatClassName: string;
  trigger?: "mount" | "view";
  minDelayMs?: number;
}) {
  const { draftEpoch, instantDone, isResetting } = useCadDraft();
  const ref = useRef<HTMLDivElement | null>(null);
  const slotState = useCadWriteSlot({
    minDelayMs,
    priority: 100,
    ref,
    requireBoxReady: true,
    totalDurationMs: 1280,
    trigger,
  });

  const isRevealed = instantDone || slotState === "active" || slotState === "done";
  const skipAnimation = instantDone || (slotState === "done" && isResetting);

  return (
    <div
      ref={ref}
      className="hidden md:block"
      style={{
        height: "40px",
        pointerEvents: "none",
        position: "absolute",
        right: "-200px",
        top: "50%",
        transform: "translateY(-50%)",
        width: "220px",
        zIndex: 20,
      }}
    >
      <svg width="100%" height="100%" style={{ overflow: "visible" }}>
        {instantDone ? (
          <>
            <path
              d="M 20,20 L 40,40 L 210,40"
              fill="none"
              stroke="var(--line-stroke-accent)"
              strokeWidth="1"
            />
            <circle cx="20" cy="20" r="2" fill="var(--line-stroke-accent)" />
          </>
        ) : (
          <>
            <motion.circle
              key={`dim-dot-${draftEpoch}`}
              cx="20"
              cy="20"
              r="2"
              fill="var(--line-stroke-accent)"
              initial={{ scale: 0, opacity: 0 }}
              animate={isRevealed ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={
                isResetting || skipAnimation
                  ? { duration: 0 }
                  : { duration: 0.22, ease: "easeOut" }
              }
              style={{ transformOrigin: "20px 20px" }}
            />
            <motion.path
              key={`dim-line-${draftEpoch}`}
              d="M 20,20 L 40,40 L 210,40"
              fill="none"
              stroke="var(--line-stroke-accent)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={isRevealed ? { pathLength: 1 } : { pathLength: 0 }}
              transition={
                isResetting || skipAnimation
                  ? { duration: 0 }
                  : { delay: 0.08, duration: 0.4, ease: CAD_EASE }
              }
            />
          </>
        )}
      </svg>

      {instantDone ? (
        <span
          className={caveatClassName}
          style={{
            bottom: "-8px",
            color: "var(--foreground)",
            fontSize: "18px",
            left: "45px",
            lineHeight: "1",
            position: "absolute",
            whiteSpace: "nowrap",
          }}
        >
          Height: Auto, Size: 11px, Weight: 600
        </span>
      ) : (
        <span
          className={caveatClassName}
          style={{
            bottom: "-8px",
            color: "var(--foreground)",
            fontSize: "18px",
            left: "45px",
            lineHeight: "1",
            position: "absolute",
            whiteSpace: "nowrap",
          }}
        >
          <motion.span
            initial={{ clipPath: "inset(-30% 100% -30% -4%)" }}
            animate={
              isRevealed
                ? { clipPath: "inset(-30% -6% -30% -4%)" }
                : { clipPath: "inset(-30% 100% -30% -4%)" }
            }
            transition={
              isResetting || skipAnimation
                ? { duration: 0 }
                : { delay: 0.4, duration: 0.78, ease: [0.32, 0.04, 0.24, 1] }
            }
            style={{ display: "inline-block" }}
          >
            Height: Auto, Size: 11px, Weight: 600
          </motion.span>

          {slotState === "active" && (
            <motion.span
              key={`dim-nib-${draftEpoch}`}
              aria-hidden="true"
              initial={{ left: "0%", opacity: 0, y: -3 }}
              animate={{
                left: ["0%", "100%"],
                opacity: [0, 1, 1, 1, 0],
                y: [-3, 0, -2, 1.5, -1.5, -5],
              }}
              transition={{
                left: { delay: 0.4, duration: 0.78, ease: [0.32, 0.04, 0.24, 1] },
                opacity: {
                  delay: 0.4,
                  duration: 0.84,
                  times: [0, 0.08, 0.84, 0.94, 1],
                },
                y: { delay: 0.4, duration: 0.78, ease: "easeInOut" },
              }}
              style={{
                bottom: "15%",
                pointerEvents: "none",
                position: "absolute",
                zIndex: 30,
              }}
            >
              <DraftPencilNib size={13} />
            </motion.span>
          )}
        </span>
      )}
    </div>
  );
}

/**
 * Unobtrusive CAD control badge inside Hero top-right:
 * Allows skipping during initial draw or replaying the hand-drawing sequence anytime.
 */
export function CadDraftStatusControl() {
  const { enabled, isDrafting, replayDraft, skipDraft } = useCadDraft();

  if (!enabled) return null;

  return (
    <AnimatePresence mode="wait">
      {isDrafting ? (
        <motion.button
          key="skip-draft"
          type="button"
          onClick={skipDraft}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          style={{
            alignItems: "center",
            backdropFilter: "blur(6px)",
            backgroundColor: "color-mix(in srgb, var(--background) 78%, transparent)",
            border: "1px solid var(--line-stroke-accent)",
            borderRadius: "3px",
            color: "var(--foreground)",
            cursor: "pointer",
            display: "inline-flex",
            fontFamily: "var(--font-geist-mono)",
            fontSize: "9px",
            gap: "6px",
            letterSpacing: "0.08em",
            padding: "4px 8px",
            position: "absolute",
            right: "10px",
            top: "10px",
            zIndex: 35,
          }}
          title="Skip drafting animation (Esc)"
        >
          <motion.span
            animate={{ opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 1, repeat: Infinity }}
            style={{
              backgroundColor: "#22c55e",
              borderRadius: "50%",
              display: "inline-block",
              height: "5px",
              width: "5px",
            }}
          />
          <span>DRAFTING // SKIP [ESC]</span>
        </motion.button>
      ) : (
        <motion.button
          key="replay-draft"
          type="button"
          onClick={replayDraft}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.72 }}
          exit={{ opacity: 0 }}
          whileHover={{ opacity: 1, scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.2 }}
          style={{
            alignItems: "center",
            backdropFilter: "blur(6px)",
            backgroundColor: "color-mix(in srgb, var(--background) 72%, transparent)",
            border: "1px solid var(--line-stroke-accent)",
            borderRadius: "3px",
            color: "var(--foreground)",
            cursor: "pointer",
            display: "inline-flex",
            fontFamily: "var(--font-geist-mono)",
            fontSize: "9px",
            gap: "5px",
            letterSpacing: "0.08em",
            padding: "4px 8px",
            position: "absolute",
            right: "10px",
            top: "10px",
            zIndex: 35,
          }}
          title="Replay hand-drawn CAD opening animation"
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
          </svg>
          <span>REDRAW_SHEET</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
