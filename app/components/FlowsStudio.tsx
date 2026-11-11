"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  FLOW_CATEGORIES,
  FlowCategoryId,
  PRODUCT_FLOWS,
  ProductFlowItem,
  ProductSubType,
} from "../data/productFlows";
import { FlowSimulator } from "./FlowSimulator";
import { GatewayLogoTile } from "../data/techLogos";

type SubTypeFilter = "ALL" | ProductSubType;

const SUBTYPE_FILTERS: { id: SubTypeFilter; label: string }[] = [
  { id: "ALL", label: "ALL_GATEWAYS" },
  { id: "INDIA_PG", label: "INDIA_PG" },
  { id: "GLOBAL_PG", label: "GLOBAL_PG" },
  { id: "MERCHANT_OF_RECORD", label: "MERCHANT_OF_RECORD" },
];

function getAccentInk(hex: string) {
  const clean = hex.replace("#", "");
  if (clean.length !== 6) return "#ffffff";
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum > 0.54 ? "#0a0a0a" : "#ffffff";
}

function getReadableAccent(hex: string) {
  return `color-mix(in srgb, ${hex} 74%, var(--foreground))`;
}

export function FlowsStudio() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") as FlowCategoryId | null;
  const gatewayParam = searchParams.get("gateway");
  const scenarioParam = searchParams.get("scenario");

  const returnParams = {
    stripeSessionId: searchParams.get("stripe_session_id") ?? undefined,
    cfOrderId: searchParams.get("cf_order_id") ?? undefined,
    phonepeOrderId: searchParams.get("phonepe_order_id") ?? undefined,
    dodoPaymentId: searchParams.get("payment_id") ?? undefined,
    dodoStatus: searchParams.get("status") ?? undefined,
    cancelled: searchParams.get("cancelled") ?? undefined,
  };

  const activeCategoryId: FlowCategoryId = FLOW_CATEGORIES.some((c) => c.id === categoryParam)
    ? (categoryParam as FlowCategoryId)
    : "payment-gateways";

  const selectedGatewayId: string = PRODUCT_FLOWS.some((p) => p.id === gatewayParam)
    ? (gatewayParam as string)
    : PRODUCT_FLOWS[0]?.id ?? "razorpay";

  const [subTypeFilter, setSubTypeFilter] = useState<SubTypeFilter>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [compareLeftId, setCompareLeftId] = useState<string>("razorpay");
  const [compareRightId, setCompareRightId] = useState<string>("dodo-payments");

  const activeCategory =
    FLOW_CATEGORIES.find((c) => c.id === activeCategoryId) ?? FLOW_CATEGORIES[0];

  const liveProducts = PRODUCT_FLOWS.filter((p) => p.categoryId === "payment-gateways");
  const filteredProducts = liveProducts.filter((product) => {
    const matchesSubType = subTypeFilter === "ALL" || product.subType === subTypeFilter;
    const q = searchQuery.trim().toLowerCase();
    if (!q) return matchesSubType;
    const haystack = [
      product.name,
      product.shortCode,
      product.region,
      product.subTypeLabel,
      product.tagline,
      product.bestFor,
      ...product.paymentMethods,
      ...product.sdks,
    ]
      .join(" ")
      .toLowerCase();
    return matchesSubType && haystack.includes(q);
  });

  const activeProduct: ProductFlowItem =
    liveProducts.find((p) => p.id === selectedGatewayId) ?? liveProducts[0];

  const compareLeft =
    liveProducts.find((p) => p.id === compareLeftId) ?? liveProducts[0];
  const compareRight =
    liveProducts.find((p) => p.id === compareRightId) ?? liveProducts[1] ?? liveProducts[0];

  const updateUrlParams = (catId: FlowCategoryId, gwId?: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("stripe_session_id");
    params.delete("cf_order_id");
    params.delete("phonepe_order_id");
    params.delete("payment_id");
    params.delete("status");
    params.delete("cancelled");
    params.set("category", catId);
    if (gwId && catId === "payment-gateways") {
      params.set("gateway", gwId);
    } else if (catId !== "payment-gateways") {
      params.delete("gateway");
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleSelectCategory = (catId: FlowCategoryId) => {
    updateUrlParams(catId, selectedGatewayId);
  };

  const handleSelectGateway = (id: string, scrollToSim = false) => {
    updateUrlParams("payment-gateways", id);
    if (scrollToSim && typeof document !== "undefined") {
      const el = document.getElementById("flow-simulator");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const totalScenarios = liveProducts.reduce((acc, item) => acc + item.scenarios.length, 0);

  return (
    <main
      style={{
        gridColumn: "2",
        gridRow: "5",
        padding: "80px 24px 60px",
        fontFamily: "var(--font-geist-mono)",
        minWidth: 0,
      }}
    >
      {/* ── PAGE HEADER ── */}
      <div style={{ marginBottom: "28px" }}>
        <div
          style={{
            fontSize: "10px",
            color: "var(--nav-link)",
            letterSpacing: "0.08em",
            marginBottom: "16px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <Link
            href="/"
            style={{ color: "var(--nav-link)", textDecoration: "none", transition: "color 0.2s" }}
          >
            HOME
          </Link>
          <span style={{ opacity: 0.5 }}>/</span>
          <span style={{ color: "var(--foreground)" }}>FLOWS</span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "9px",
                color: "var(--nav-link)",
                letterSpacing: "0.1em",
                marginBottom: "6px",
              }}
            >
              SECTION_04 // INTERACTIVE_PRODUCT_FLOW_LAB
            </div>
            <h1
              style={{
                fontSize: "28px",
                fontWeight: 700,
                color: "var(--foreground)",
                margin: "0 0 6px 0",
                letterSpacing: "-0.02em",
                fontFamily: "var(--font-geist-sans)",
              }}
            >
              Product Flow Studio
            </h1>
            <p
              style={{
                color: "var(--nav-link)",
                fontFamily: "var(--font-geist-sans)",
                fontSize: "13px",
                lineHeight: "1.55",
                margin: 0,
                maxWidth: "680px",
              }}
            >
              Watch real-world product checkout experiences, backend API handshakes, and verified webhook pipelines step by step before picking an integration stack.
            </p>
          </div>

          <div
            style={{
              backgroundColor: "var(--line-fill)",
              border: "1px solid var(--line-stroke-accent)",
              borderRadius: "3px",
              color: "var(--foreground)",
              fontSize: "10px",
              padding: "8px 12px",
              letterSpacing: "0.06em",
            }}
          >
            {String(liveProducts.length).padStart(2, "0")}_GATEWAYS //{" "}
            {String(totalScenarios).padStart(2, "0")}_FLOW_SCENARIOS
          </div>
        </div>
      </div>

      {/* ── CATEGORY SHELF (EXTENSIBLE MULTI-CATEGORY DIRECTORY) ── */}
      <section style={{ marginBottom: "24px" }}>
        <div
          style={{
            backgroundColor: "var(--line-fill)",
            border: "1px solid var(--line-stroke-accent)",
          }}
        >
          <div
            style={{
              alignItems: "center",
              backgroundColor: "var(--line-fill-accent)",
              borderBottom: "1px solid var(--line-stroke-accent)",
              display: "flex",
              flexWrap: "wrap",
              fontSize: "10px",
              gap: "8px",
              justifyContent: "space-between",
              letterSpacing: "0.1em",
              padding: "8px 14px",
            }}
          >
            <span style={{ color: "var(--nav-link-hover)" }}>
              CATEGORY_INDEX // SIMILAR_PRODUCT_SUITES
            </span>
            <span style={{ color: "var(--nav-link)", fontSize: "9px" }}>
              MODULAR SCHEMA FOR FUTURE CATEGORIES
            </span>
          </div>

          <div
            style={{
              display: "grid",
              gap: "0px",
              gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
            }}
          >
            {FLOW_CATEGORIES.map((category, idx) => {
              const isSelected = category.id === activeCategoryId;
              const isLive = category.status === "LIVE";
              return (
                <button
                  key={category.id}
                  onClick={() => handleSelectCategory(category.id)}
                  style={{
                    backgroundColor: isSelected ? "var(--background)" : "transparent",
                    border: "none",
                    borderBottom: "1px solid var(--line-stroke)",
                    borderRight:
                      idx < FLOW_CATEGORIES.length - 1 ? "1px solid var(--line-stroke)" : "none",
                    boxShadow: isSelected ? `inset 0 2px 0 ${category.dotColor}` : "none",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    fontFamily: "var(--font-geist-mono)",
                    gap: "5px",
                    padding: "12px 14px",
                    textAlign: "left",
                    transition: "background-color 0.15s ease",
                  }}
                >
                  <div
                    style={{
                      alignItems: "center",
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <span style={{ color: "var(--nav-link)", fontSize: "9px" }}>
                      {category.code}
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
                        padding: "1px 5px",
                      }}
                    >
                      {category.status}
                    </span>
                  </div>
                  <div
                    style={{
                      alignItems: "center",
                      color: isSelected ? "var(--foreground)" : "var(--nav-link-hover)",
                      display: "flex",
                      fontFamily: "var(--font-geist-sans)",
                      fontSize: "13px",
                      fontWeight: 700,
                      gap: "7px",
                    }}
                  >
                    <span
                      style={{
                        backgroundColor: category.dotColor,
                        borderRadius: "50%",
                        height: "6px",
                        opacity: isLive ? 1 : 0.6,
                        width: "6px",
                      }}
                    />
                    <span>{category.name}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── LIVE CATEGORY: PAYMENT GATEWAYS ── */}
      {activeCategory.status === "LIVE" ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Filter + Gateway Selector Grid */}
          <section
            style={{
              backgroundColor: "var(--line-fill)",
              border: "1px solid var(--line-stroke-accent)",
            }}
          >
            <div
              style={{
                alignItems: "center",
                backgroundColor: "var(--line-fill-accent)",
                borderBottom: "1px solid var(--line-stroke-accent)",
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                justifyContent: "space-between",
                padding: "10px 14px",
              }}
            >
              {/* Subtype filter tabs */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {SUBTYPE_FILTERS.map((filter) => {
                  const selected = subTypeFilter === filter.id;
                  const count =
                    filter.id === "ALL"
                      ? liveProducts.length
                      : liveProducts.filter((p) => p.subType === filter.id).length;
                  return (
                    <button
                      key={filter.id}
                      onClick={() => setSubTypeFilter(filter.id)}
                      style={{
                        backgroundColor: selected ? "var(--background)" : "transparent",
                        border: selected
                          ? "1px solid var(--foreground)"
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
                      {filter.label} ({String(count).padStart(2, "0")})
                    </button>
                  );
                })}
              </div>

              {/* Search Input */}
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by gateway, UPI, MoR, SDK..."
                aria-label="Filter gateways"
                style={{
                  backgroundColor: "var(--background)",
                  border: "1px solid var(--line-stroke-accent)",
                  borderRadius: "2px",
                  color: "var(--foreground)",
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "10px",
                  minWidth: "220px",
                  outline: "none",
                  padding: "6px 10px",
                }}
              />
            </div>

            {filteredProducts.length > 0 ? (
              <div
                style={{
                  backgroundColor: "var(--background)",
                  display: "grid",
                  gap: "10px",
                  gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
                  padding: "14px",
                }}
              >
                {filteredProducts.map((product) => {
                  const isWatching = product.id === activeProduct.id;
                  return (
                    <button
                      key={product.id}
                      onClick={() => handleSelectGateway(product.id, false)}
                      style={{
                        backgroundColor: isWatching
                          ? "var(--line-fill-accent)"
                          : "var(--line-fill)",
                        border: isWatching
                          ? `1.5px solid ${product.accentColor}`
                          : "1px solid var(--line-stroke)",
                        borderRadius: "3px",
                        cursor: "pointer",
                        display: "flex",
                        flexDirection: "column",
                        fontFamily: "var(--font-geist-mono)",
                        gap: "8px",
                        padding: "12px",
                        textAlign: "left",
                        transition: "all 0.15s ease",
                      }}
                    >
                      <div
                        style={{
                          alignItems: "center",
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                        }}
                      >
                        <div style={{ alignItems: "center", display: "flex", gap: "8px", minWidth: 0 }}>
                          <GatewayLogoTile idOrName={product.id} size={26} />
                          <span style={{ color: "var(--nav-link)", fontSize: "9px" }}>
                            {product.subTypeLabel}
                          </span>
                        </div>

                        {isWatching && (
                          <span
                            style={{
                              color: getReadableAccent(product.accentColor),
                              fontSize: "8px",
                              fontWeight: 700,
                              letterSpacing: "0.08em",
                            }}
                          >
                            ● WATCHING
                          </span>
                        )}
                      </div>

                      <div>
                        <div
                          style={{
                            color: "var(--foreground)",
                            fontFamily: "var(--font-geist-sans)",
                            fontSize: "15px",
                            fontWeight: 700,
                            marginBottom: "3px",
                          }}
                        >
                          {product.name}
                        </div>
                        <div
                          style={{
                            color: "var(--nav-link)",
                            fontFamily: "var(--font-geist-sans)",
                            fontSize: "11px",
                            lineHeight: "1.45",
                          }}
                        >
                          {product.bestFor}
                        </div>
                      </div>

                      <div
                        style={{
                          alignItems: "center",
                          borderTop: "1px dashed var(--line-stroke)",
                          color: "var(--nav-link-hover)",
                          display: "flex",
                          fontSize: "9px",
                          justifyContent: "space-between",
                          marginTop: "auto",
                          paddingTop: "8px",
                          width: "100%",
                        }}
                      >
                        <span>{product.scenarios.length} SCENARIOS</span>
                        <span>{product.settlementTime}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div
                style={{
                  backgroundColor: "var(--background)",
                  color: "var(--nav-link)",
                  fontSize: "11px",
                  padding: "24px",
                  textAlign: "center",
                }}
              >
                No gateways match &quot;{searchQuery}&quot;.{" "}
                <button
                  onClick={() => {
                    setSubTypeFilter("ALL");
                    setSearchQuery("");
                  }}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "var(--foreground)",
                    cursor: "pointer",
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: "11px",
                    textDecoration: "underline",
                  }}
                >
                  Reset filters
                </button>
              </div>
            )}
          </section>

          {/* Main Interactive Simulator */}
          <FlowSimulator
            key={`${activeProduct.id}-${scenarioParam ?? "default"}`}
            product={activeProduct}
            initialScenarioId={scenarioParam ?? undefined}
            returnParams={returnParams}
          />

          {/* Comparison Matrix Across All Gateways */}
          <section
            style={{
              backgroundColor: "var(--line-fill)",
              border: "1px solid var(--line-stroke-accent)",
            }}
          >
            <div
              style={{
                alignItems: "center",
                backgroundColor: "var(--line-fill-accent)",
                borderBottom: "1px solid var(--line-stroke-accent)",
                display: "flex",
                flexWrap: "wrap",
                fontSize: "10px",
                gap: "8px",
                justifyContent: "space-between",
                letterSpacing: "0.1em",
                padding: "10px 14px",
              }}
            >
              <span style={{ color: "var(--foreground)", fontWeight: 700 }}>
                SPEC_DATA // SIMILAR_PRODUCTS_MATRIX (CLICK ROW TO WATCH)
              </span>
              <span style={{ color: "var(--nav-link)", fontSize: "9px" }}>
                COMPARE BEFORE INTEGRATION
              </span>
            </div>

            <div className="scrollbar-hide" style={{ overflowX: "auto" }}>
              <table
                style={{
                  backgroundColor: "var(--background)",
                  borderCollapse: "collapse",
                  fontSize: "11px",
                  minWidth: "820px",
                  width: "100%",
                }}
              >
                <thead>
                  <tr
                    style={{
                      backgroundColor: "var(--line-fill)",
                      borderBottom: "1px solid var(--line-stroke-accent)",
                      color: "var(--nav-link)",
                      fontSize: "9px",
                      letterSpacing: "0.08em",
                      textAlign: "left",
                    }}
                  >
                    <th style={{ padding: "10px 12px" }}>GATEWAY</th>
                    <th style={{ padding: "10px 12px" }}>CATEGORY</th>
                    <th style={{ padding: "10px 12px" }}>ORDER / INTENT MODEL</th>
                    <th style={{ padding: "10px 12px" }}>CHECKOUT UX</th>
                    <th style={{ padding: "10px 12px" }}>TAX / MoR</th>
                    <th style={{ padding: "10px 12px" }}>WEBHOOK_HEADER</th>
                    <th style={{ padding: "10px 12px" }}>IDEAL_WHEN</th>
                  </tr>
                </thead>
                <tbody>
                  {liveProducts.map((pg) => {
                    const isSelected = pg.id === activeProduct.id;
                    return (
                      <tr
                        key={pg.id}
                        onClick={() => handleSelectGateway(pg.id, true)}
                        style={{
                          backgroundColor: isSelected
                            ? "var(--line-fill-accent)"
                            : "transparent",
                          borderBottom: "1px solid var(--line-stroke)",
                          cursor: "pointer",
                          transition: "background-color 0.15s ease",
                        }}
                      >
                        <td style={{ padding: "10px 12px", fontWeight: 700, whiteSpace: "nowrap" }}>
                          <div style={{ alignItems: "center", display: "inline-flex", gap: "9px" }}>
                            <GatewayLogoTile idOrName={pg.id} size={22} />
                            <span style={{ color: "var(--foreground)" }}>{pg.name}</span>
                          </div>
                        </td>
                        <td style={{ color: "var(--nav-link)", fontSize: "9px", padding: "10px 12px", whiteSpace: "nowrap" }}>
                          {pg.subTypeLabel}
                        </td>
                        <td style={{ color: "var(--nav-link-hover)", padding: "10px 12px", lineHeight: "1.45" }}>
                          {pg.compareSummary.orderModel}
                        </td>
                        <td style={{ color: "var(--nav-link-hover)", padding: "10px 12px", lineHeight: "1.45" }}>
                          {pg.compareSummary.checkoutUx}
                        </td>
                        <td style={{ padding: "10px 12px", whiteSpace: "nowrap" }}>
                          <span
                            style={{
                              border: pg.compareSummary.morHandled
                                ? "1px solid rgba(34, 197, 94, 0.5)"
                                : "1px solid var(--line-stroke)",
                              borderRadius: "2px",
                              color: pg.compareSummary.morHandled
                                ? "#22c55e"
                                : "var(--nav-link)",
                              fontSize: "9px",
                              fontWeight: 700,
                              padding: "2px 6px",
                            }}
                          >
                            {pg.compareSummary.morHandled ? "YES (MoR)" : "NO (MERCHANT)"}
                          </span>
                        </td>
                        <td style={{ color: "var(--foreground)", fontSize: "10px", padding: "10px 12px", whiteSpace: "nowrap" }}>
                          {pg.compareSummary.webhookHeader}
                        </td>
                        <td style={{ color: "var(--nav-link-hover)", padding: "10px 12px", lineHeight: "1.45" }}>
                          {pg.compareSummary.idealWhen}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          {/* Head-to-Head 2-Gateway Comparison Inspector */}
          <section
            style={{
              backgroundColor: "var(--line-fill)",
              border: "1px solid var(--line-stroke-accent)",
            }}
          >
            <div
              style={{
                alignItems: "center",
                backgroundColor: "var(--line-fill-accent)",
                borderBottom: "1px solid var(--line-stroke-accent)",
                display: "flex",
                flexWrap: "wrap",
                gap: "12px",
                justifyContent: "space-between",
                padding: "10px 14px",
              }}
            >
              <span style={{ color: "var(--foreground)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em" }}>
                HEAD_TO_HEAD // SIDE_BY_SIDE_DIFF
              </span>

              <div style={{ alignItems: "center", display: "flex", flexWrap: "wrap", gap: "8px" }}>
                <select
                  value={compareLeft.id}
                  onChange={(e) => setCompareLeftId(e.target.value)}
                  aria-label="Select first gateway to compare"
                  style={{
                    backgroundColor: "var(--background)",
                    border: "1px solid var(--line-stroke-accent)",
                    borderRadius: "2px",
                    color: "var(--foreground)",
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: "10px",
                    padding: "5px 8px",
                  }}
                >
                  {liveProducts.map((pg) => (
                    <option key={pg.id} value={pg.id}>
                      A: {pg.name}
                    </option>
                  ))}
                </select>
                <span style={{ color: "var(--nav-link)", fontSize: "10px" }}>VS</span>
                <select
                  value={compareRight.id}
                  onChange={(e) => setCompareRightId(e.target.value)}
                  aria-label="Select second gateway to compare"
                  style={{
                    backgroundColor: "var(--background)",
                    border: "1px solid var(--line-stroke-accent)",
                    borderRadius: "2px",
                    color: "var(--foreground)",
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: "10px",
                    padding: "5px 8px",
                  }}
                >
                  {liveProducts.map((pg) => (
                    <option key={pg.id} value={pg.id}>
                      B: {pg.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div
              style={{
                backgroundColor: "var(--background)",
                display: "grid",
                gap: "0px",
                gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
              }}
            >
              {[compareLeft, compareRight].map((item, idx) => (
                <div
                  key={`${item.id}-${idx}`}
                  style={{
                    borderBottom: "1px solid var(--line-stroke)",
                    borderRight: idx === 0 ? "1px solid var(--line-stroke)" : "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    padding: "16px 14px",
                  }}
                >
                  <div
                    style={{
                      alignItems: "center",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ alignItems: "center", display: "flex", gap: "8px" }}>
                      <GatewayLogoTile idOrName={item.id} size={24} />
                      <span
                        style={{
                          backgroundColor: item.accentColor,
                          borderRadius: "2px",
                          color: getAccentInk(item.accentColor),
                          fontSize: "9px",
                          fontWeight: 700,
                          padding: "2px 6px",
                        }}
                      >
                        {idx === 0 ? "NODE_A" : "NODE_B"}
                      </span>
                      <span
                        style={{
                          color: "var(--foreground)",
                          fontFamily: "var(--font-geist-sans)",
                          fontSize: "16px",
                          fontWeight: 700,
                        }}
                      >
                        {item.name}
                      </span>
                    </div>

                    <button
                      onClick={() => handleSelectGateway(item.id, true)}
                      style={{
                        backgroundColor: "var(--line-fill-accent)",
                        border: `1px solid ${item.accentColor}`,
                        borderRadius: "2px",
                        color: "var(--foreground)",
                        cursor: "pointer",
                        fontFamily: "var(--font-geist-mono)",
                        fontSize: "9px",
                        fontWeight: 700,
                        padding: "4px 8px",
                      }}
                    >
                      WATCH FLOW ↑
                    </button>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "7px", fontSize: "11px" }}>
                    <div>
                      <span style={{ color: "var(--nav-link)", fontSize: "9px" }}>PATTERN: </span>
                      <span style={{ color: "var(--foreground)" }}>{item.architecturePattern}</span>
                    </div>
                    <div>
                      <span style={{ color: "var(--nav-link)", fontSize: "9px" }}>ORDER_MODEL: </span>
                      <span style={{ color: "var(--nav-link-hover)" }}>{item.compareSummary.orderModel}</span>
                    </div>
                    <div>
                      <span style={{ color: "var(--nav-link)", fontSize: "9px" }}>CHECKOUT_UX: </span>
                      <span style={{ color: "var(--nav-link-hover)" }}>{item.compareSummary.checkoutUx}</span>
                    </div>
                    <div>
                      <span style={{ color: "var(--nav-link)", fontSize: "9px" }}>TAX_COMPLIANCE: </span>
                      <span style={{ color: "var(--foreground)" }}>{item.taxCompliance}</span>
                    </div>
                    <div>
                      <span style={{ color: "var(--nav-link)", fontSize: "9px" }}>PRICING: </span>
                      <span style={{ color: "var(--foreground)" }}>{item.pricingSummary}</span>
                    </div>
                    <div>
                      <span style={{ color: "var(--nav-link)", fontSize: "9px" }}>SETTLEMENT: </span>
                      <span style={{ color: "var(--foreground)" }}>{item.settlementTime}</span>
                    </div>
                    <div>
                      <span style={{ color: "var(--nav-link)", fontSize: "9px" }}>WEBHOOK_SIG: </span>
                      <span style={{ color: getReadableAccent(item.accentColor), fontWeight: 700 }}>
                        {item.compareSummary.webhookHeader}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      ) : (
        /* ── PLANNED FUTURE CATEGORY BLUEPRINT VIEW ── */
        <section
          style={{
            backgroundColor: "var(--line-fill)",
            border: "1px dashed var(--line-stroke-accent)",
          }}
        >
          <div
            style={{
              alignItems: "center",
              backgroundColor: "var(--line-fill-accent)",
              borderBottom: "1px solid var(--line-stroke-accent)",
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              justifyContent: "space-between",
              padding: "10px 14px",
            }}
          >
            <span style={{ color: "var(--foreground)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em" }}>
              BLUEPRINT_ROADMAP // {activeCategory.code}_{activeCategory.name.toUpperCase()}
            </span>
            <span
              style={{
                border: "1px dashed var(--line-stroke-accent)",
                borderRadius: "2px",
                color: getReadableAccent(activeCategory.dotColor),
                fontSize: "9px",
                fontWeight: 700,
                padding: "2px 7px",
              }}
            >
              STATUS: SCHEDULED_EXPANSION
            </span>
          </div>

          <div style={{ backgroundColor: "var(--background)", padding: "20px 16px" }}>
            <h2
              style={{
                color: "var(--foreground)",
                fontFamily: "var(--font-geist-sans)",
                fontSize: "20px",
                fontWeight: 700,
                margin: "0 0 6px 0",
              }}
            >
              {activeCategory.name} — Coming Soon to Flow Studio
            </h2>
            <p
              style={{
                color: "var(--nav-link-hover)",
                fontFamily: "var(--font-geist-sans)",
                fontSize: "13px",
                lineHeight: "1.6",
                margin: "0 0 18px 0",
                maxWidth: "680px",
              }}
            >
              {activeCategory.description}
            </p>

            <div
              style={{
                display: "grid",
                gap: "12px",
                gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
                marginBottom: "20px",
              }}
            >
              {activeCategory.plannedProducts?.map((planned, idx) => (
                <div
                  key={planned.name}
                  style={{
                    backgroundColor: "var(--line-fill)",
                    border: "1px solid var(--line-stroke)",
                    borderRadius: "3px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    padding: "14px",
                  }}
                >
                  <span style={{ color: "var(--nav-link)", fontSize: "9px" }}>
                    MODULE_0{idx + 1}
                  </span>
                  <div
                    style={{
                      color: "var(--foreground)",
                      fontFamily: "var(--font-geist-sans)",
                      fontSize: "15px",
                      fontWeight: 700,
                    }}
                  >
                    {planned.name}
                  </div>
                  <div
                    style={{
                      color: "var(--nav-link-hover)",
                      fontFamily: "var(--font-geist-sans)",
                      fontSize: "12px",
                      lineHeight: "1.5",
                    }}
                  >
                    {planned.focus}
                  </div>
                  <div
                    style={{
                      backgroundColor: "var(--background)",
                      border: "1px dashed var(--line-stroke)",
                      color: getReadableAccent(activeCategory.dotColor),
                      fontSize: "10px",
                      marginTop: "auto",
                      padding: "7px 8px",
                    }}
                  >
                    {planned.sampleFlow}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => handleSelectCategory("payment-gateways")}
              style={{
                backgroundColor: "var(--line-fill-accent)",
                border: "1px solid var(--line-stroke-accent)",
                borderRadius: "3px",
                color: "var(--foreground)",
                cursor: "pointer",
                fontFamily: "var(--font-geist-mono)",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.08em",
                padding: "9px 14px",
              }}
            >
              ← RETURN TO LIVE PAYMENT GATEWAY FLOWS
            </button>
          </div>
        </section>
      )}

      {/* ── BACK TO HOME LINK ── */}
      <div style={{ marginTop: "40px", display: "flex", justifyContent: "center" }}>
        <Link
          href="/"
          style={{
            fontSize: "11px",
            letterSpacing: "0.08em",
            color: "var(--nav-link)",
            textDecoration: "none",
            padding: "8px 16px",
            border: "1px solid var(--line-stroke-accent)",
            borderRadius: "3px",
            transition: "all 0.2s",
            fontFamily: "var(--font-geist-mono)",
          }}
        >
          ← BACK_TO_HOME
        </Link>
      </div>
    </main>
  );
}

