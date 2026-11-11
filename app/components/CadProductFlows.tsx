"use client";

import React, { useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { Caveat } from "next/font/google";
import { motion, AnimatePresence } from "motion/react";
import {
  FLOW_CATEGORIES,
  FlowCategoryId,
  PRODUCT_FLOWS,
} from "../data/productFlows";
import { GatewayLogoTile } from "../data/techLogos";
import {
  CadDimensionLabelAnimated,
  CadDraftBox,
  CadDraftHeightScale,
  CadDraftWidthScale,
} from "./CadDraft";

const caveat = Caveat({
  display: "swap",
  subsets: ["latin"],
  weight: "400",
});

function CategoryGlyph({ id, color }: { id: FlowCategoryId; color: string }) {
  if (id === "payment-gateways") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
        <line x1="6" y1="15" x2="10" y2="15" />
      </svg>
    );
  }
  if (id === "auth-identity") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <circle cx="12" cy="11" r="2" />
      </svg>
    );
  }
  if (id === "email-infra") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    );
  }
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}

export function CadProductFlows() {
  const [expandedCategoryId, setExpandedCategoryId] = useState<string>("payment-gateways");

  const totalLiveProducts = PRODUCT_FLOWS.length;
  const totalPlannedProducts = FLOW_CATEGORIES.reduce(
    (sum, cat) => sum + (cat.plannedProducts?.length ?? 0),
    0
  );

  return (
    <CadDraftBox
      id="flows"
      trigger="view"
      strokeDuration={1.45}
      style={{
        fontFamily: "var(--font-geist-mono)",
        fontSize: "12px",
        marginTop: "24px",
      }}
    >
      <CadDimensionLabelAnimated caveatClassName={caveat.className} trigger="view" />

      {/* CAD Height Dimension Scale (Left Side) */}
      <CadDraftHeightScale />

      {/* CAD Width Dimension Scale (Top Side) */}
      <CadDraftWidthScale />

      {/* Header Bar */}
      <div
        style={{
          alignItems: "center",
          backgroundColor: "var(--line-fill-accent)",
          borderBottom: "1px solid var(--line-stroke-accent)",
          color: "var(--nav-link-hover)",
          display: "flex",
          flexWrap: "wrap",
          fontSize: "11px",
          gap: "8px",
          justifyContent: "space-between",
          letterSpacing: "0.1em",
          padding: "10px 14px",
        }}
      >
        <div style={{ alignItems: "center", display: "flex", gap: "8px" }}>
          <span
            style={{
              backgroundColor: "#06b6d4",
              borderRadius: "50%",
              display: "inline-block",
              height: "6px",
              width: "6px",
            }}
          />
          <span>SPEC_DATA // PRODUCT_FLOW_CATALOG</span>
        </div>

        <span className={clsx("hidden", "sm:inline")} style={{ fontSize: "10px", color: "var(--nav-link)" }}>
          0{FLOW_CATEGORIES.length}_CATEGORIES · {String(totalLiveProducts + totalPlannedProducts).padStart(2, "0")}_PRODUCTS
        </span>
      </div>

      {/* Category List matching CadProjects list aesthetic */}
      <div style={{ display: "grid", gap: "0", gridTemplateColumns: "1fr" }}>
        {FLOW_CATEGORIES.map((category, index) => {
          const isExpanded = expandedCategoryId === category.id;
          const isLast = index === FLOW_CATEGORIES.length - 1;
          const isLive = category.status === "LIVE";
          const categoryProducts = isLive
            ? PRODUCT_FLOWS.filter((p) => p.categoryId === category.id)
            : [];
          const countLabel = isLive
            ? `${String(categoryProducts.length).padStart(2, "0")} GATEWAYS · LIVE`
            : `${String(category.plannedProducts?.length ?? 0).padStart(2, "0")} PRODUCTS · ROADMAP`;

          return (
            <div
              key={category.id}
              style={{
                backgroundColor: "var(--background)",
                borderBottom: isLast ? "none" : "1px solid var(--line-stroke)",
                transition: "background-color 0.2s ease",
              }}
            >
              {/* Category Header Row with Right-Side CHECK OUT button */}
              <div
                onClick={() =>
                  setExpandedCategoryId(isExpanded ? "" : category.id)
                }
                style={{
                  alignItems: "center",
                  cursor: "pointer",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "12px",
                  justifyContent: "space-between",
                  padding: "13px 16px",
                }}
              >
                {/* Left: Glyph + Category Name + Badge + Summary */}
                <div style={{ alignItems: "center", display: "flex", gap: "12px", minWidth: "220px", flex: "1 1 320px" }}>
                  <div
                    style={{
                      alignItems: "center",
                      backgroundColor: "var(--line-fill)",
                      border: "1px solid var(--line-stroke-accent)",
                      borderRadius: "6px",
                      display: "flex",
                      flexShrink: 0,
                      height: "34px",
                      justifyContent: "center",
                      width: "34px",
                    }}
                  >
                    <CategoryGlyph id={category.id} color={category.dotColor} />
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "3px", minWidth: 0 }}>
                    <div style={{ alignItems: "center", display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      <span
                        style={{
                          color: "var(--foreground)",
                          fontFamily: "var(--font-geist-sans)",
                          fontSize: "14px",
                          fontWeight: 700,
                        }}
                      >
                        {category.name}
                      </span>
                      <span
                        style={{
                          border: isLive
                            ? "1px solid rgba(34, 197, 94, 0.5)"
                            : "1px dashed var(--line-stroke-accent)",
                          borderRadius: "2px",
                          color: isLive ? "#22c55e" : "var(--nav-link)",
                          fontSize: "8px",
                          fontWeight: 700,
                          letterSpacing: "0.08em",
                          padding: "2px 6px",
                        }}
                      >
                        {countLabel}
                      </span>
                    </div>
                    <span
                      style={{
                        color: "var(--nav-link)",
                        fontSize: "10px",
                        lineHeight: "1.45",
                      }}
                    >
                      {category.code} {"//"} {category.description}
                    </span>
                  </div>
                </div>

                {/* Right Side: CHECK OUT Button + Expand Chevron */}
                <div style={{ alignItems: "center", display: "flex", gap: "8px", flexShrink: 0 }}>
                  <Link
                    href={`/flows?category=${category.id}`}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      alignItems: "center",
                      backgroundColor: isLive ? "var(--line-fill-accent)" : "var(--line-fill)",
                      border: isLive
                        ? `1px solid ${category.dotColor}`
                        : "1px dashed var(--line-stroke-accent)",
                      borderRadius: "3px",
                      color: "var(--foreground)",
                      display: "inline-flex",
                      fontSize: "10px",
                      fontWeight: 700,
                      gap: "6px",
                      letterSpacing: "0.08em",
                      padding: "6px 11px",
                      textDecoration: "none",
                      transition: "all 0.15s ease",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <span>CHECK OUT</span>
                    <span aria-hidden="true">→</span>
                  </Link>

                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    style={{
                      alignItems: "center",
                      border: "1px solid var(--line-stroke-accent)",
                      borderRadius: "4px",
                      color: "var(--foreground)",
                      display: "flex",
                      height: "28px",
                      justifyContent: "center",
                      width: "28px",
                    }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </motion.div>
                </div>
              </div>

              {/* Expandable Inner List of Products inside the Category */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    style={{ overflow: "hidden" }}
                  >
                    <div
                      style={{
                        borderTop: "1px dashed var(--line-stroke)",
                        padding: "0 16px 14px",
                      }}
                    >
                      {isLive ? (
                        <div style={{ display: "flex", flexDirection: "column" }}>
                          {categoryProducts.map((pg, pIdx) => (
                            <Link
                              key={pg.id}
                              href={`/flows?category=${category.id}&gateway=${pg.id}`}
                              style={{
                                alignItems: "center",
                                borderBottom:
                                  pIdx < categoryProducts.length - 1
                                    ? "1px dashed var(--line-stroke)"
                                    : "none",
                                color: "inherit",
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "10px",
                                justifyContent: "space-between",
                                padding: "10px 6px",
                                textDecoration: "none",
                                transition: "background-color 0.15s ease",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = "var(--line-fill)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = "transparent";
                              }}
                            >
                              <div
                                style={{
                                  alignItems: "center",
                                  display: "flex",
                                  flex: "1 1 260px",
                                  gap: "10px",
                                  minWidth: 0,
                                }}
                              >
                                <GatewayLogoTile idOrName={pg.id} size={28} />

                                <div style={{ minWidth: 0 }}>
                                  <div
                                    style={{
                                      alignItems: "center",
                                      display: "flex",
                                      flexWrap: "wrap",
                                      gap: "6px",
                                    }}
                                  >
                                    <span
                                      style={{
                                        color: "var(--foreground)",
                                        fontFamily: "var(--font-geist-sans)",
                                        fontSize: "13px",
                                        fontWeight: 600,
                                      }}
                                    >
                                      {pg.name}
                                    </span>
                                    <span
                                      style={{
                                        border: "1px solid var(--line-stroke)",
                                        borderRadius: "2px",
                                        color: "var(--nav-link)",
                                        fontSize: "8px",
                                        padding: "1px 5px",
                                      }}
                                    >
                                      {pg.subTypeLabel}
                                    </span>
                                    <span
                                      className={clsx("hidden", "sm:inline")}
                                      style={{ color: "var(--nav-link)", fontSize: "9px" }}
                                    >
                                      · {pg.scenarios.length} flows
                                    </span>
                                  </div>
                                  <div
                                    style={{
                                      color: "var(--nav-link)",
                                      fontSize: "10px",
                                      marginTop: "2px",
                                    }}
                                  >
                                    {pg.bestFor}
                                  </div>
                                </div>
                              </div>

                              <div
                                style={{
                                  alignItems: "center",
                                  border: "1px solid var(--line-stroke-accent)",
                                  borderRadius: "2px",
                                  color: "var(--foreground)",
                                  display: "inline-flex",
                                  flexShrink: 0,
                                  fontSize: "9px",
                                  fontWeight: 700,
                                  gap: "5px",
                                  letterSpacing: "0.06em",
                                  padding: "5px 9px",
                                }}
                              >
                                <span>CHECK OUT</span>
                                <span aria-hidden="true">↗</span>
                              </div>
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <div style={{ display: "flex", flexDirection: "column" }}>
                          {category.plannedProducts?.map((item, idx) => (
                            <Link
                              key={item.name}
                              href={`/flows?category=${category.id}`}
                              style={{
                                alignItems: "center",
                                borderBottom:
                                  idx < (category.plannedProducts?.length ?? 0) - 1
                                    ? "1px dashed var(--line-stroke)"
                                    : "none",
                                color: "inherit",
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "10px",
                                justifyContent: "space-between",
                                padding: "10px 6px",
                                textDecoration: "none",
                              }}
                            >
                              <div style={{ flex: "1 1 260px" }}>
                                <div style={{ alignItems: "center", display: "flex", gap: "8px" }}>
                                  <span style={{ color: "var(--nav-link)", fontSize: "9px" }}>
                                    0{idx + 1}
                                  </span>
                                  <span
                                    style={{
                                      color: "var(--foreground)",
                                      fontFamily: "var(--font-geist-sans)",
                                      fontSize: "13px",
                                      fontWeight: 600,
                                    }}
                                  >
                                    {item.name}
                                  </span>
                                </div>
                                <div style={{ color: "var(--nav-link)", fontSize: "10px", marginTop: "2px" }}>
                                  {item.focus} · {item.sampleFlow}
                                </div>
                              </div>

                              <span
                                style={{
                                  border: "1px dashed var(--line-stroke-accent)",
                                  borderRadius: "2px",
                                  color: "var(--nav-link-hover)",
                                  fontSize: "9px",
                                  padding: "5px 9px",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                CHECK OUT ↗
                              </span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Bottom Action Bar matching SHOW_ALL_PROJECTS // */}
      <div style={{ position: "relative" }}>
        <Link href="/flows" style={{ textDecoration: "none" }}>
          <div
            style={{
              alignItems: "center",
              backgroundColor: "var(--background)",
              borderTop: "1px solid var(--line-stroke)",
              color: "var(--foreground)",
              cursor: "pointer",
              display: "flex",
              fontSize: "11px",
              fontWeight: 600,
              justifyContent: "center",
              letterSpacing: "0.1em",
              padding: "12px 16px",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--line-fill)";
              e.currentTarget.style.color = "var(--nav-link-hover)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "var(--background)";
              e.currentTarget.style.color = "var(--foreground)";
            }}
          >
            OPEN_FLOW_STUDIO // WATCH_&_COMPARE_ALL →
          </div>
        </Link>
      </div>
    </CadDraftBox>
  );
}
