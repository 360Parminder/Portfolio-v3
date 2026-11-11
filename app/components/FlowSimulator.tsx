"use client";

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  ActorId,
  FLOW_ACTORS,
  FlowStep,
  ProductFlowItem,
} from "../data/productFlows";
import { LiveGatewayRunner, SandboxReturnParams } from "./LiveGatewayRunner";
import { GatewayLogoTile } from "../data/techLogos";
import {
  GatewaySandboxStatus,
  LiveNetworkTrace,
  isGatewayId,
} from "../lib/gatewaySandboxConfig";

interface FlowSimulatorProps {
  product: ProductFlowItem;
  initialScenarioId?: string;
  returnParams?: SandboxReturnParams;
}

const SPEED_OPTIONS = [
  { label: "0.7x", multiplier: 1.45 },
  { label: "1x", multiplier: 1 },
  { label: "1.5x", multiplier: 0.65 },
] as const;

const ACTOR_ORDER: ActorId[] = ["client", "server", "gateway", "rail", "webhook"];

function getAccentInk(hex: string) {
  const clean = hex.replace("#", "");
  if (clean.length !== 6) return "#ffffff";
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum > 0.54 ? "#0a0a0a" : "#ffffff";
}

function getActorLabel(actorId: ActorId, product: ProductFlowItem) {
  if (actorId === "gateway") {
    return {
      code: "03",
      label: `${product.shortCode}_CORE`,
      subLabel: product.name,
    };
  }
  const found = FLOW_ACTORS.find((a) => a.id === actorId);
  return found ?? { code: "00", label: actorId.toUpperCase(), subLabel: "" };
}

export function FlowSimulator({
  product,
  initialScenarioId,
  returnParams,
}: FlowSimulatorProps) {
  const defaultScenario =
    product.scenarios.find((s) => s.id === initialScenarioId) ?? product.scenarios[0];

  const [scenarioId, setScenarioId] = useState<string>(defaultScenario?.id ?? "");
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speedIdx, setSpeedIdx] = useState<number>(1);
  const [sandboxStatus, setSandboxStatus] = useState<GatewaySandboxStatus | null>(null);
  const [statusLoading, setStatusLoading] = useState<boolean>(true);
  const [liveTraces, setLiveTraces] = useState<LiveNetworkTrace[]>([]);
  const [inspectorTab, setInspectorTab] = useState<"payload" | "code" | "gotchas" | "live">(
    "payload"
  );
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const res = await fetch("/api/flows/sandbox/status", { cache: "no-store" });
        if (!active || !res.ok) {
          if (active) setStatusLoading(false);
          return;
        }
        const data = (await res.json()) as {
          gateways?: Record<string, GatewaySandboxStatus>;
        };
        if (!active) return;
        if (data.gateways && isGatewayId(product.id)) {
          setSandboxStatus(data.gateways[product.id] ?? null);
        }
      } catch {
        // Ignore network hiccup cleanly
      } finally {
        if (active) setStatusLoading(false);
      }
    };
    void load();
    return () => {
      active = false;
    };
  }, [product.id]);

  const activeScenario =
    product.scenarios.find((s) => s.id === scenarioId) ?? product.scenarios[0];
  const steps: FlowStep[] = activeScenario?.steps ?? [];
  const safeIndex = Math.min(stepIndex, Math.max(steps.length - 1, 0));
  const activeStep = steps[safeIndex];

  const durationMs = Math.round(2500 * SPEED_OPTIONS[speedIdx].multiplier);

  useEffect(() => {
    if (!isPlaying || steps.length === 0) return;

    const timer = window.setTimeout(() => {
      if (safeIndex >= steps.length - 1) {
        setIsPlaying(false);
      } else {
        setStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
      }
    }, durationMs);

    return () => window.clearTimeout(timer);
  }, [isPlaying, safeIndex, steps.length, durationMs]);

  useEffect(() => {
    if (!copiedId) return;
    const t = window.setTimeout(() => setCopiedId(null), 1800);
    return () => window.clearTimeout(t);
  }, [copiedId]);

  const handleTogglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      return;
    }
    if (safeIndex >= steps.length - 1) {
      setStepIndex(0);
    }
    setIsPlaying(true);
  };

  const handleScenarioChange = (nextScenarioId: string) => {
    setIsPlaying(false);
    setScenarioId(nextScenarioId);
    setStepIndex(0);
  };

  const handleCopy = (id: string, text: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text).catch(() => {});
      setCopiedId(id);
    }
  };

  if (!activeScenario || !activeStep) {
    return null;
  }

  const fromIdx = ACTOR_ORDER.indexOf(activeStep.from);
  const toIdx = ACTOR_ORDER.indexOf(activeStep.to);
  const visitedActors = new Set<ActorId>();
  steps.slice(0, safeIndex + 1).forEach((s) => {
    visitedActors.add(s.from);
    visitedActors.add(s.to);
  });

  const fromPct = ((fromIdx + 0.5) / ACTOR_ORDER.length) * 100;
  const toPct = ((toIdx + 0.5) / ACTOR_ORDER.length) * 100;
  const bandLeftPct = Math.min(fromPct, toPct);
  const bandWidthPct = Math.max(Math.abs(toPct - fromPct), 2);
  const isReverse = toIdx < fromIdx;
  const isSelfLoop = fromIdx === toIdx;

  const fromMeta = getActorLabel(activeStep.from, product);
  const toMeta = getActorLabel(activeStep.to, product);
  const isComplete = !isPlaying && safeIndex === steps.length - 1;
  const accentInk = getAccentInk(product.accentColor);
  const readableAccent = `color-mix(in srgb, ${product.accentColor} 74%, var(--foreground))`;
  const progressPct = ((safeIndex + 1) / Math.max(steps.length, 1)) * 100;

  return (
    <div
      id="flow-simulator"
      style={{
        backgroundColor: "var(--line-fill)",
        border: "1px solid var(--line-stroke-accent)",
        fontFamily: "var(--font-geist-mono)",
        fontSize: "12px",
        position: "relative",
      }}
    >
      {/* ── HEADER BAR ── */}
      <div
        style={{
          alignItems: "center",
          backgroundColor: "var(--line-fill-accent)",
          borderBottom: "1px solid var(--line-stroke-accent)",
          color: "var(--nav-link-hover)",
          display: "flex",
          flexWrap: "wrap",
          fontSize: "10px",
          gap: "10px",
          justifyContent: "space-between",
          letterSpacing: "0.1em",
          padding: "10px 14px",
        }}
      >
        <div style={{ alignItems: "center", display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <GatewayLogoTile idOrName={product.id} size={20} radius={3} />
          <span
            style={{
              backgroundColor: product.accentColor,
              borderRadius: "50%",
              boxShadow: `0 0 8px ${product.accentColor}`,
              display: "inline-block",
              height: "7px",
              width: "7px",
            }}
          />
          <span style={{ color: "var(--foreground)", fontWeight: 700 }}>
            FLOW_INSPECTOR // {product.shortCode}_{product.name.toUpperCase()}
          </span>
          <span
            style={{
              backgroundColor: "var(--background)",
              border: "1px solid var(--line-stroke)",
              borderRadius: "2px",
              color: "var(--nav-link)",
              fontSize: "9px",
              padding: "2px 6px",
            }}
          >
            {product.subTypeLabel}
          </span>
        </div>

        <div style={{ alignItems: "center", display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <span style={{ color: "var(--nav-link)" }}>INTEGRATION: {product.avgIntegrationTime}</span>
          <a
            href={product.docsUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: "var(--background)",
              border: "1px solid var(--line-stroke-accent)",
              borderRadius: "2px",
              color: "var(--foreground)",
              fontSize: "9px",
              padding: "3px 8px",
              textDecoration: "none",
            }}
          >
            OFFICIAL_DOCS ↗
          </a>
        </div>
      </div>

      {/* ── GATEWAY ARCHITECTURE OVERVIEW ── */}
      <div
        style={{
          backgroundColor: "var(--background)",
          borderBottom: "1px solid var(--line-stroke)",
          padding: "16px 14px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "14px",
          }}
        >
          <div style={{ maxWidth: "700px" }}>
            <div
              style={{
                alignItems: "center",
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                marginBottom: "6px",
              }}
            >
              <GatewayLogoTile idOrName={product.id} size={30} radius={5} />
              <h2
                style={{
                  color: "var(--foreground)",
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "20px",
                  fontWeight: 700,
                  margin: 0,
                  letterSpacing: "-0.01em",
                }}
              >
                {product.name}
              </h2>
              <span
                style={{
                  border: `1px solid ${product.accentColor}`,
                  borderRadius: "2px",
                  color: readableAccent,
                  fontSize: "9px",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  padding: "2px 7px",
                }}
              >
                {product.region}
              </span>
            </div>
            <p
              style={{
                color: "var(--nav-link-hover)",
                fontFamily: "var(--font-geist-sans)",
                fontSize: "13px",
                lineHeight: "1.55",
                margin: "0 0 8px 0",
              }}
            >
              {product.tagline}
            </p>
            <div style={{ color: "var(--nav-link)", fontSize: "10px" }}>
              <span style={{ color: "var(--foreground)", fontWeight: 600 }}>PATTERN:</span>{" "}
              {product.architecturePattern}
            </div>
          </div>

          <div
            style={{
              backgroundColor: "var(--line-fill)",
              border: "1px dashed var(--line-stroke-accent)",
              padding: "10px 12px",
              maxWidth: "320px",
              width: "100%",
            }}
          >
            <div style={{ color: "var(--nav-link)", fontSize: "9px", letterSpacing: "0.08em", marginBottom: "4px" }}>
              BEST_FOR // USE_CASE
            </div>
            <div style={{ color: "var(--foreground)", fontSize: "11px", lineHeight: "1.45" }}>
              {product.bestFor}
            </div>
          </div>
        </div>

        {/* 4-Cell Spec Matrix */}
        <div
          style={{
            border: "1px solid var(--line-stroke)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
            marginBottom: "12px",
          }}
        >
          <div style={{ borderRight: "1px solid var(--line-stroke)", borderBottom: "1px solid var(--line-stroke)", padding: "8px 10px" }}>
            <div style={{ color: "var(--nav-link)", fontSize: "9px", marginBottom: "3px" }}>01 // PRICING</div>
            <div style={{ color: "var(--foreground)", fontSize: "11px", fontWeight: 500 }}>{product.pricingSummary}</div>
          </div>
          <div style={{ borderRight: "1px solid var(--line-stroke)", borderBottom: "1px solid var(--line-stroke)", padding: "8px 10px" }}>
            <div style={{ color: "var(--nav-link)", fontSize: "9px", marginBottom: "3px" }}>02 // SETTLEMENT</div>
            <div style={{ color: "var(--foreground)", fontSize: "11px", fontWeight: 500 }}>{product.settlementTime}</div>
          </div>
          <div style={{ borderRight: "1px solid var(--line-stroke)", borderBottom: "1px solid var(--line-stroke)", padding: "8px 10px" }}>
            <div style={{ color: "var(--nav-link)", fontSize: "9px", marginBottom: "3px" }}>03 // TAX_&_COMPLIANCE</div>
            <div style={{ color: "var(--foreground)", fontSize: "11px", fontWeight: 500 }}>{product.taxCompliance}</div>
          </div>
          <div style={{ borderBottom: "1px solid var(--line-stroke)", padding: "8px 10px" }}>
            <div style={{ color: "var(--nav-link)", fontSize: "9px", marginBottom: "3px" }}>04 // WEBHOOK_VERIFY</div>
            <div style={{ color: "var(--foreground)", fontSize: "11px", fontWeight: 500 }}>{product.webhookAuth}</div>
          </div>
        </div>

        {/* Methods + SDK tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ alignItems: "center", display: "flex", flexWrap: "wrap", gap: "6px" }}>
            <span style={{ color: "var(--nav-link)", fontSize: "9px", letterSpacing: "0.08em" }}>RAILS:</span>
            {product.paymentMethods.map((method) => (
              <span
                key={method}
                style={{
                  backgroundColor: "var(--line-fill)",
                  border: "1px solid var(--line-stroke)",
                  borderRadius: "2px",
                  color: "var(--foreground)",
                  fontSize: "10px",
                  padding: "2px 7px",
                }}
              >
                {method}
              </span>
            ))}
          </div>
          <div style={{ alignItems: "center", display: "flex", flexWrap: "wrap", gap: "6px" }}>
            <span style={{ color: "var(--nav-link)", fontSize: "9px", letterSpacing: "0.08em" }}>SDKS:</span>
            {product.sdks.map((sdk) => (
              <span
                key={sdk}
                style={{
                  border: "1px dashed var(--line-stroke-accent)",
                  color: "var(--nav-link-hover)",
                  fontSize: "9px",
                  padding: "2px 6px",
                }}
              >
                {sdk}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── SCENARIO TABS & PLAYBACK TRANSPORT BAR ── */}
      <div
        style={{
          backgroundColor: "var(--line-fill-accent)",
          borderBottom: "1px solid var(--line-stroke-accent)",
          padding: "12px 14px",
        }}
      >
        {/* Scenario Switcher */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "10px" }}>
          {product.scenarios.map((scenario) => {
            const selected = scenario.id === activeScenario.id;
            return (
              <button
                key={scenario.id}
                onClick={() => handleScenarioChange(scenario.id)}
                style={{
                  backgroundColor: selected ? "var(--background)" : "transparent",
                  border: selected
                    ? `1px solid ${product.accentColor}`
                    : "1px solid var(--line-stroke)",
                  borderRadius: "2px",
                  color: selected ? "var(--foreground)" : "var(--nav-link)",
                  cursor: "pointer",
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "10px",
                  padding: "6px 10px",
                  textAlign: "left",
                  transition: "all 0.15s ease",
                }}
              >
                <span style={{ color: selected ? readableAccent : "var(--nav-link)", fontWeight: 700, marginRight: "6px" }}>
                  {scenario.code}
                </span>
                <span>{scenario.label}</span>
              </button>
            );
          })}
        </div>

        {/* Scenario Description + Controls Row */}
        <div
          style={{
            alignItems: "center",
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            justifyContent: "space-between",
          }}
        >
          <div style={{ color: "var(--nav-link-hover)", fontSize: "11px", lineHeight: "1.5", maxWidth: "620px" }}>
            {activeScenario.description}
          </div>

          <div style={{ alignItems: "center", display: "flex", flexWrap: "wrap", gap: "6px" }}>
            <button
              onClick={handleTogglePlay}
              style={{
                alignItems: "center",
                backgroundColor: isPlaying ? product.accentColor : "var(--background)",
                border: `1px solid ${product.accentColor}`,
                borderRadius: "3px",
                color: isPlaying ? accentInk : "var(--foreground)",
                cursor: "pointer",
                display: "flex",
                fontFamily: "var(--font-geist-mono)",
                fontSize: "10px",
                fontWeight: 700,
                gap: "6px",
                letterSpacing: "0.08em",
                padding: "7px 12px",
              }}
            >
              <span>{isPlaying ? "⏸" : "▶"}</span>
              <span>{isPlaying ? "PAUSE_FLOW" : isComplete ? "REWATCH_FLOW" : "WATCH_FLOW"}</span>
            </button>

            <button
              onClick={() => {
                setIsPlaying(false);
                setStepIndex((s) => Math.max(0, s - 1));
              }}
              disabled={safeIndex === 0}
              style={{
                backgroundColor: "var(--background)",
                border: "1px solid var(--line-stroke)",
                borderRadius: "3px",
                color: safeIndex === 0 ? "var(--line-stroke-accent)" : "var(--foreground)",
                cursor: safeIndex === 0 ? "not-allowed" : "pointer",
                fontFamily: "var(--font-geist-mono)",
                fontSize: "10px",
                padding: "7px 9px",
              }}
            >
              ← PREV
            </button>

            <button
              onClick={() => {
                setIsPlaying(false);
                setStepIndex((s) => Math.min(steps.length - 1, s + 1));
              }}
              disabled={safeIndex >= steps.length - 1}
              style={{
                backgroundColor: "var(--background)",
                border: "1px solid var(--line-stroke)",
                borderRadius: "3px",
                color: safeIndex >= steps.length - 1 ? "var(--line-stroke-accent)" : "var(--foreground)",
                cursor: safeIndex >= steps.length - 1 ? "not-allowed" : "pointer",
                fontFamily: "var(--font-geist-mono)",
                fontSize: "10px",
                padding: "7px 9px",
              }}
            >
              NEXT →
            </button>

            <button
              onClick={() => {
                setIsPlaying(false);
                setStepIndex(0);
              }}
              style={{
                backgroundColor: "var(--background)",
                border: "1px solid var(--line-stroke)",
                borderRadius: "3px",
                color: "var(--nav-link)",
                cursor: "pointer",
                fontFamily: "var(--font-geist-mono)",
                fontSize: "10px",
                padding: "7px 9px",
              }}
              title="Reset to Step 01"
            >
              ↺
            </button>

            {/* Speed control */}
            <div
              style={{
                alignItems: "center",
                backgroundColor: "var(--background)",
                border: "1px solid var(--line-stroke)",
                borderRadius: "3px",
                display: "flex",
                overflow: "hidden",
              }}
            >
              {SPEED_OPTIONS.map((opt, idx) => (
                <button
                  key={opt.label}
                  onClick={() => setSpeedIdx(idx)}
                  style={{
                    backgroundColor: speedIdx === idx ? "var(--line-fill-accent)" : "transparent",
                    border: "none",
                    borderRight: idx < SPEED_OPTIONS.length - 1 ? "1px solid var(--line-stroke)" : "none",
                    color: speedIdx === idx ? "var(--foreground)" : "var(--nav-link)",
                    cursor: "pointer",
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: "9px",
                    fontWeight: speedIdx === idx ? 700 : 400,
                    padding: "6px 7px",
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <div
              style={{
                backgroundColor: "var(--background)",
                border: "1px solid var(--line-stroke-accent)",
                borderRadius: "3px",
                color: "var(--foreground)",
                fontSize: "10px",
                fontWeight: 700,
                padding: "6px 10px",
              }}
            >
              STEP {activeStep.stepNo} / {String(steps.length).padStart(2, "0")}
            </div>
          </div>
        </div>

        {/* Live Animated Step Progress Bar */}
        <div
          style={{
            backgroundColor: "var(--line-stroke)",
            height: "2px",
            marginTop: "10px",
            overflow: "hidden",
            width: "100%",
          }}
        >
          <div
            style={{
              backgroundColor: product.accentColor,
              height: "100%",
              transition: "width 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
              width: `${progressPct}%`,
            }}
          />
        </div>
      </div>

      {/* ── ANIMATED ACTOR TOPOLOGY PIPELINE ── */}
      <div
        style={{
          backgroundColor: "var(--background)",
          borderBottom: "1px solid var(--line-stroke)",
          padding: "16px 14px",
        }}
      >
        <div
          style={{
            alignItems: "center",
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            justifyContent: "space-between",
            marginBottom: "12px",
          }}
        >
          <span style={{ color: "var(--nav-link)", fontSize: "9px", letterSpacing: "0.1em" }}>
            SEQUENCE_BUS // WATCH_SIGNAL_PATH
          </span>
          <div style={{ alignItems: "center", display: "flex", gap: "8px", fontSize: "10px" }}>
            <span style={{ color: readableAccent, fontWeight: 700 }}>
              {fromMeta.label}
            </span>
            <span style={{ color: "var(--nav-link)" }}>
              {isSelfLoop ? "↻" : "──▶"} [{activeStep.protocol} · {activeStep.latencyLabel}]
            </span>
            <span style={{ color: "var(--foreground)", fontWeight: 700 }}>
              {toMeta.label}
            </span>
          </div>
        </div>

        {/* Scrollable 5-node diagram */}
        <div className="scrollbar-hide" style={{ overflowX: "auto", paddingBottom: "4px" }}>
          <div style={{ minWidth: "560px" }}>
            {/* 5 Actor Nodes */}
            <div
              style={{
                display: "grid",
                gap: "8px",
                gridTemplateColumns: "repeat(5, 1fr)",
                marginBottom: "10px",
              }}
            >
              {ACTOR_ORDER.map((actorId) => {
                const actor = getActorLabel(actorId, product);
                const isSource = activeStep.from === actorId;
                const isTarget = activeStep.to === actorId;
                const isVisited = visitedActors.has(actorId);

                return (
                  <div
                    key={actorId}
                    style={{
                      backgroundColor:
                        isSource || isTarget ? "var(--line-fill-accent)" : "var(--line-fill)",
                      border: isTarget
                        ? `1.5px solid ${product.accentColor}`
                        : isSource
                        ? "1.5px solid var(--foreground)"
                        : isVisited
                        ? "1px solid var(--line-stroke-accent)"
                        : "1px dashed var(--line-stroke)",
                      borderRadius: "3px",
                      opacity: isVisited || isSource || isTarget ? 1 : 0.6,
                      padding: "8px 10px",
                      position: "relative",
                      transition: "all 0.25s ease",
                    }}
                  >
                    <div
                      style={{
                        alignItems: "center",
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "4px",
                      }}
                    >
                      <span style={{ color: "var(--nav-link)", fontSize: "8px" }}>
                        NODE_{actor.code}
                      </span>
                      {(isSource || isTarget) && (
                        <span
                          style={{
                            backgroundColor: isTarget ? product.accentColor : "var(--foreground)",
                            borderRadius: "2px",
                            color: isTarget ? accentInk : "var(--background)",
                            fontSize: "8px",
                            fontWeight: 700,
                            padding: "1px 4px",
                          }}
                        >
                          {isSource && isTarget ? "LOOP" : isSource ? "TX" : "RX"}
                        </span>
                      )}
                    </div>
                    <div
                      style={{
                        alignItems: "center",
                        color: "var(--foreground)",
                        display: "flex",
                        fontSize: "10px",
                        fontWeight: 700,
                        gap: "6px",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {actorId === "gateway" && (
                        <GatewayLogoTile idOrName={product.id} size={18} radius={3} />
                      )}
                      <span>{actor.label}</span>
                    </div>
                    <div style={{ color: "var(--nav-link)", fontSize: "9px", marginTop: "2px" }}>
                      {actor.subLabel}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Traveling Packet Track */}
            <div
              style={{
                backgroundColor: "var(--line-fill)",
                border: "1px solid var(--line-stroke)",
                borderRadius: "2px",
                height: "28px",
                position: "relative",
              }}
            >
              {/* Baseline Center Rail */}
              <div
                style={{
                  backgroundColor: "var(--line-stroke-accent)",
                  height: "1px",
                  left: "10%",
                  position: "absolute",
                  right: "10%",
                  top: "50%",
                }}
              />

              {/* Column node ticks */}
              {ACTOR_ORDER.map((id, idx) => (
                <div
                  key={id}
                  style={{
                    backgroundColor: "var(--background)",
                    border: "1px solid var(--line-stroke-accent)",
                    borderRadius: "50%",
                    height: "7px",
                    left: `${((idx + 0.5) / ACTOR_ORDER.length) * 100}%`,
                    position: "absolute",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "7px",
                    zIndex: 1,
                  }}
                />
              ))}

              {/* Active Vector Segment */}
              <div
                style={{
                  backgroundColor: product.accentColor,
                  height: "2px",
                  left: `${bandLeftPct}%`,
                  opacity: 0.7,
                  position: "absolute",
                  top: "50%",
                  transform: "translateY(-50%)",
                  transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                  width: `${bandWidthPct}%`,
                  zIndex: 2,
                }}
              />

              {/* Animated Signal Packet */}
              <motion.div
                key={`${activeStep.id}-packet`}
                initial={{ left: `${fromPct}%`, scale: 0.9 }}
                animate={{ left: `${toPct}%`, scale: [1, 1.35, 1] }}
                transition={{
                  duration: 0.75,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{
                  alignItems: "center",
                  backgroundColor: product.accentColor,
                  border: "2px solid var(--background)",
                  borderRadius: "50%",
                  boxShadow: `0 0 12px ${product.accentColor}`,
                  display: "flex",
                  height: "14px",
                  justifyContent: "center",
                  position: "absolute",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "14px",
                  zIndex: 4,
                }}
                title={`${fromMeta.label} ${isReverse ? "◀─" : "─▶"} ${toMeta.label}`}
              />

              {/* Center Protocol Callout */}
              <div
                style={{
                  backgroundColor: "var(--background)",
                  border: `1px solid ${product.accentColor}`,
                  borderRadius: "2px",
                  color: "var(--foreground)",
                  fontSize: "9px",
                  left: `${(fromPct + toPct) / 2}%`,
                  padding: "1px 6px",
                  position: "absolute",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  whiteSpace: "nowrap",
                  zIndex: 5,
                }}
              >
                {isReverse ? "◀ " : ""}
                {activeStep.protocol}
                {!isReverse ? " ▶" : ""}
              </div>
            </div>
          </div>
        </div>

        {/* Clickable Step Sequencer Timeline */}
        <div
          style={{
            display: "grid",
            gap: "6px",
            gridTemplateColumns: `repeat(auto-fit, minmax(125px, 1fr))`,
            marginTop: "12px",
          }}
        >
          {steps.map((step, idx) => {
            const isCurrent = idx === safeIndex;
            const isPast = idx < safeIndex;
            return (
              <button
                key={step.id}
                onClick={() => {
                  setIsPlaying(false);
                  setStepIndex(idx);
                }}
                style={{
                  backgroundColor: isCurrent ? "var(--line-fill-accent)" : "var(--line-fill)",
                  border: isCurrent
                    ? `1px solid ${product.accentColor}`
                    : isPast
                    ? "1px solid var(--line-stroke-accent)"
                    : "1px solid var(--line-stroke)",
                  borderRadius: "2px",
                  color: isCurrent ? "var(--foreground)" : "var(--nav-link)",
                  cursor: "pointer",
                  fontFamily: "var(--font-geist-mono)",
                  padding: "7px 8px",
                  textAlign: "left",
                  transition: "all 0.15s ease",
                }}
              >
                <div
                  style={{
                    alignItems: "center",
                    display: "flex",
                    fontSize: "9px",
                    justifyContent: "space-between",
                    marginBottom: "2px",
                  }}
                >
                  <span style={{ color: isCurrent ? readableAccent : "var(--nav-link)", fontWeight: 700 }}>
                    STEP_{step.stepNo}
                  </span>
                  <span style={{ opacity: 0.75 }}>{step.latencyLabel}</span>
                </div>
                <div
                  style={{
                    color: isCurrent ? "var(--foreground)" : "var(--nav-link-hover)",
                    fontSize: "10px",
                    fontWeight: isCurrent ? 700 : 500,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {step.title}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── SPLIT CANVAS: PRODUCT UX PREVIEW + DEVELOPER INSPECTOR ── */}
      <div
        style={{
          display: "grid",
          gap: "0px",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        }}
      >
        {/* LEFT PANE: Live Gateway End-User Checkout Stage */}
        <div
          style={{
            backgroundColor: "var(--line-fill)",
            borderBottom: "1px solid var(--line-stroke)",
            borderRight: "1px solid var(--line-stroke)",
            display: "flex",
            flexDirection: "column",
            padding: "16px 14px",
          }}
        >
          <div
            style={{
              alignItems: "center",
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <span style={{ color: "var(--nav-link)", fontSize: "9px", letterSpacing: "0.1em" }}>
              01 // END_USER_EXPERIENCE (WATCH_UI)
            </span>

            <div style={{ alignItems: "center", display: "flex", flexWrap: "wrap", gap: "8px" }}>
              <span
                style={{
                  alignItems: "center",
                  backgroundColor: "var(--background)",
                  border: `1px solid ${product.accentColor}`,
                  borderRadius: "2px",
                  color: "var(--foreground)",
                  display: "inline-flex",
                  fontSize: "8.5px",
                  fontWeight: 700,
                  gap: "5px",
                  padding: "3px 7px",
                }}
              >
                <span
                  style={{
                    backgroundColor: sandboxStatus?.configured ? "#22c55e" : "#f59e0b",
                    borderRadius: "50%",
                    height: "5px",
                    width: "5px",
                  }}
                />
                <span>LIVE_GATEWAY_SDK</span>
              </span>

              <span style={{ color: "var(--nav-link)", fontSize: "9px" }}>
                STATE_{activeStep.stepNo}
              </span>
            </div>
          </div>

          <LiveGatewayRunner
            key={`${product.id}-${activeScenario.id}`}
            product={product}
            scenarioId={activeScenario.id}
            totalSteps={steps.length}
            accentInk={accentInk}
            sandboxStatus={sandboxStatus}
            statusLoading={statusLoading}
            onJumpStep={(idx) => {
              setIsPlaying(false);
              setStepIndex(idx);
            }}
            onTracesChange={(nextTraces) => {
              setLiveTraces(nextTraces);
              if (nextTraces.length > 0) {
                setInspectorTab("live");
              }
            }}
            returnParams={returnParams}
          />
        </div>

        {/* RIGHT PANE: Developer Payload, Code & Gotchas Inspector */}
        <div
          style={{
            backgroundColor: "var(--background)",
            borderBottom: "1px solid var(--line-stroke)",
            display: "flex",
            flexDirection: "column",
            padding: "16px 14px",
          }}
        >
          <div
            style={{
              alignItems: "center",
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <span style={{ color: "var(--nav-link)", fontSize: "9px", letterSpacing: "0.1em" }}>
              02 // DEVELOPER_INSPECTOR (STEP_{activeStep.stepNo})
            </span>
            <span style={{ color: readableAccent, fontSize: "10px", fontWeight: 700 }}>
              {activeStep.protocol} · {activeStep.latencyLabel}
            </span>
          </div>

          <h3
            style={{
              color: "var(--foreground)",
              fontFamily: "var(--font-geist-sans)",
              fontSize: "16px",
              fontWeight: 700,
              margin: "0 0 6px 0",
            }}
          >
            {activeStep.stepNo}. {activeStep.title}
          </h3>

          <p
            style={{
              color: "var(--nav-link-hover)",
              fontFamily: "var(--font-geist-sans)",
              fontSize: "12px",
              lineHeight: "1.6",
              margin: "0 0 12px 0",
            }}
          >
            {activeStep.summary}
          </p>

          {/* Security Highlight Callout */}
          <div
            style={{
              backgroundColor: "var(--line-fill-accent)",
              borderLeft: `3px solid ${product.accentColor}`,
              borderTop: "1px solid var(--line-stroke)",
              borderRight: "1px solid var(--line-stroke)",
              borderBottom: "1px solid var(--line-stroke)",
              marginBottom: "12px",
              padding: "9px 12px",
            }}
          >
            <div style={{ color: readableAccent, fontSize: "9px", fontWeight: 700, letterSpacing: "0.08em", marginBottom: "3px" }}>
              SECURITY_&_RELIABILITY_RULE
            </div>
            <div style={{ color: "var(--foreground)", fontSize: "11px", lineHeight: "1.5" }}>
              {activeStep.securityNote}
            </div>
          </div>

          {/* Inspector Sub-Tabs */}
          <div
            style={{
              borderBottom: "1px solid var(--line-stroke)",
              display: "flex",
              flexWrap: "wrap",
              gap: "6px",
              marginBottom: "10px",
              paddingBottom: "8px",
            }}
          >
            {(
              [
                { id: "payload", label: "PAYLOAD // JSON" },
                { id: "code", label: `CODE // ${activeStep.codeLang.toUpperCase()}` },
                { id: "gotchas", label: `EDGE_CASES (${activeStep.gotchas.length})` },
                ...(liveTraces.length > 0
                  ? [{ id: "live" as const, label: `● LIVE_TRACE (${liveTraces.length})` }]
                  : []),
              ] as const
            ).map((tab) => {
              const selected = inspectorTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setInspectorTab(tab.id)}
                  style={{
                    backgroundColor: selected ? "var(--line-fill-accent)" : "transparent",
                    border: selected
                      ? "1px solid var(--line-stroke-accent)"
                      : "1px solid var(--line-stroke)",
                    borderRadius: "2px",
                    color: selected ? "var(--foreground)" : "var(--nav-link)",
                    cursor: "pointer",
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: "9px",
                    fontWeight: selected ? 700 : 500,
                    padding: "5px 9px",
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Body */}
          {inspectorTab === "payload" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <div style={{ backgroundColor: "var(--line-fill)", border: "1px solid var(--line-stroke)", borderRadius: "3px" }}>
                <div
                  style={{
                    alignItems: "center",
                    borderBottom: "1px solid var(--line-stroke)",
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "5px 10px",
                  }}
                >
                  <span style={{ color: "var(--nav-link)", fontSize: "9px" }}>REQUEST / TRIGGER</span>
                  <button
                    onClick={() => handleCopy("req", activeStep.requestPayload)}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: copiedId === "req" ? "#22c55e" : "var(--nav-link)",
                      cursor: "pointer",
                      fontFamily: "var(--font-geist-mono)",
                      fontSize: "9px",
                    }}
                  >
                    {copiedId === "req" ? "COPIED ✓" : "COPY"}
                  </button>
                </div>
                <pre
                  className="scrollbar-hide"
                  style={{
                    color: "var(--foreground)",
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: "10px",
                    lineHeight: "1.55",
                    margin: 0,
                    maxHeight: "170px",
                    overflow: "auto",
                    padding: "10px",
                  }}
                >
                  <code>{activeStep.requestPayload}</code>
                </pre>
              </div>

              <div style={{ backgroundColor: "var(--line-fill)", border: "1px solid var(--line-stroke)", borderRadius: "3px" }}>
                <div
                  style={{
                    alignItems: "center",
                    borderBottom: "1px solid var(--line-stroke)",
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "5px 10px",
                  }}
                >
                  <span style={{ color: "var(--nav-link)", fontSize: "9px" }}>RESPONSE / STATE_RESULT</span>
                  <button
                    onClick={() => handleCopy("res", activeStep.responsePayload)}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: copiedId === "res" ? "#22c55e" : "var(--nav-link)",
                      cursor: "pointer",
                      fontFamily: "var(--font-geist-mono)",
                      fontSize: "9px",
                    }}
                  >
                    {copiedId === "res" ? "COPIED ✓" : "COPY"}
                  </button>
                </div>
                <pre
                  className="scrollbar-hide"
                  style={{
                    color: "var(--foreground)",
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: "10px",
                    lineHeight: "1.55",
                    margin: 0,
                    maxHeight: "170px",
                    overflow: "auto",
                    padding: "10px",
                  }}
                >
                  <code>{activeStep.responsePayload}</code>
                </pre>
              </div>
            </div>
          )}

          {inspectorTab === "code" && (
            <div style={{ backgroundColor: "var(--line-fill)", border: "1px solid var(--line-stroke)", borderRadius: "3px" }}>
              <div
                style={{
                  alignItems: "center",
                  borderBottom: "1px solid var(--line-stroke)",
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "6px 10px",
                }}
              >
                <span style={{ color: "var(--nav-link)", fontSize: "9px" }}>
                  INTEGRATION_SNIPPET ({activeStep.codeLang})
                </span>
                <button
                  onClick={() => handleCopy("code", activeStep.codeSnippet)}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: copiedId === "code" ? "#22c55e" : "var(--nav-link)",
                    cursor: "pointer",
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: "9px",
                  }}
                >
                  {copiedId === "code" ? "COPIED ✓" : "COPY_SNIPPET"}
                </button>
              </div>
              <pre
                className="scrollbar-hide"
                style={{
                  color: "var(--foreground)",
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "10.5px",
                  lineHeight: "1.6",
                  margin: 0,
                  maxHeight: "340px",
                  overflow: "auto",
                  padding: "12px",
                }}
              >
                <code>{activeStep.codeSnippet}</code>
              </pre>
            </div>
          )}

          {inspectorTab === "gotchas" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {activeStep.gotchas.map((gotcha, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: "var(--line-fill)",
                    border: "1px solid var(--line-stroke)",
                    borderRadius: "3px",
                    display: "flex",
                    gap: "10px",
                    padding: "10px 12px",
                  }}
                >
                  <span style={{ color: readableAccent, fontSize: "10px", fontWeight: 700 }}>
                    [0{idx + 1}]
                  </span>
                  <span style={{ color: "var(--foreground)", fontSize: "11px", lineHeight: "1.55" }}>
                    {gotcha}
                  </span>
                </div>
              ))}
            </div>
          )}

          {inspectorTab === "live" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {liveTraces.length === 0 ? (
                <div style={{ color: "var(--nav-link)", fontSize: "11px", padding: "12px" }}>
                  Run a payment inside END_USER_EXPERIENCE (WATCH_UI) to capture live server &amp; SDK JSON here.
                </div>
              ) : (
                liveTraces.map((tr) => (
                  <div
                    key={tr.id}
                    style={{
                      backgroundColor: "var(--line-fill)",
                      border: "1px solid var(--line-stroke-accent)",
                      borderRadius: "3px",
                      padding: "10px",
                    }}
                  >
                    <div
                      style={{
                        alignItems: "center",
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "6px",
                        justifyContent: "space-between",
                        marginBottom: "5px",
                      }}
                    >
                      <span style={{ color: readableAccent, fontSize: "9.5px", fontWeight: 700 }}>
                        {tr.stage} · {tr.method}
                      </span>
                      <span style={{ color: "var(--nav-link)", fontSize: "9px" }}>
                        {tr.httpStatus ? `HTTP ${tr.httpStatus}` : "CLIENT_SDK"}
                        {typeof tr.durationMs === "number" ? ` · ${tr.durationMs}ms` : ""}
                      </span>
                    </div>
                    <div style={{ color: "var(--foreground)", fontSize: "10px", marginBottom: "5px" }}>
                      {tr.endpoint}
                    </div>
                    <div style={{ color: "var(--nav-link-hover)", fontSize: "10px", marginBottom: "6px" }}>
                      {tr.summary}
                    </div>
                    {tr.responsePayload && (
                      <pre
                        className="scrollbar-hide"
                        style={{
                          backgroundColor: "var(--background)",
                          border: "1px solid var(--line-stroke)",
                          borderRadius: "2px",
                          color: "var(--foreground)",
                          fontFamily: "var(--font-geist-mono)",
                          fontSize: "9.5px",
                          lineHeight: "1.45",
                          margin: 0,
                          maxHeight: "150px",
                          overflow: "auto",
                          padding: "8px",
                        }}
                      >
                        <code>{JSON.stringify(tr.responsePayload, null, 2)}</code>
                      </pre>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── BOTTOM STEP PROGRESS STRIP ── */}
      <div
        style={{
          alignItems: "center",
          borderTop: "1px dashed var(--line-stroke)",
          color: "var(--nav-link)",
          display: "flex",
          flexWrap: "wrap",
          fontSize: "9px",
          gap: "10px",
          justifyContent: "space-between",
          padding: "8px 14px",
        }}
      >
        <span>
          SCENARIO: {activeScenario.id.toUpperCase()} {"//"} STEPS: {steps.length}
        </span>
        <span>
          PLAYBACK: {isPlaying ? "AUTO_ADVANCING" : isComplete ? "COMPLETE" : "MANUAL_SCRUB"}
        </span>
      </div>
    </div>
  );
}
