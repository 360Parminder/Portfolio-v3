"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HoverTechTag } from "./HoverTechTag";
import { ProjectLogo } from "./ProjectLogo";

interface ComponentItem {
  id: string;
  name: string;
  package: string;
  category: "REACT_NATIVE" | "REACT_WEB";
  status: "NPM_PACKAGE" | "PRODUCTION" | "CORE";
  statusColor: string;
  description: string;
  features: string[];
  installCmd?: string;
  codeSnippet: string;
  propsList: { name: string; type: string; default: string; description: string }[];
}

export default function ComponentsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTabMap, setActiveTabMap] = useState<Record<string, "preview" | "code" | "props">>({
    "CMP-01": "preview",
    "CMP-02": "preview",
    "CMP-03": "preview",
    "CMP-04": "preview",
  });

  // Interactive state for MeasurementCard demo
  const [measurementVal, setMeasurementVal] = useState<number>(250);
  const [measurementUnit, setMeasurementUnit] = useState<string>("mg");
  const [measurementExpanded, setMeasurementExpanded] = useState<boolean>(true);

  // Interactive state for Button demo
  const [btnVariant, setBtnVariant] = useState<"primary" | "secondary" | "outline" | "ghost">("primary");
  const [btnSize, setBtnSize] = useState<"sm" | "md" | "lg">("md");
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [btnDisabled, setBtnDisabled] = useState<boolean>(false);

  // Interactive state for ProjectLogo demo
  const [customLogoUrl, setCustomLogoUrl] = useState<string>("https://kosh.uno");

  const componentsData: ComponentItem[] = [
    {
      id: "CMP-01",
      name: "MeasurementCard",
      package: "@360parminder/components",
      category: "REACT_NATIVE",
      status: "NPM_PACKAGE",
      statusColor: "#22c55e",
      description:
        "An expandable, calibrated measurement card designed for healthcare and vital tracking apps in React Native. Features a smooth interactive ruler slider, precision steppers, unit switcher, and layout animations.",
      features: [
        "Calibrated horizontal interactive ruler with snap ticks",
        "Multi-unit selector pills (e.g., mg, mcg, g, ml)",
        "Precision + / − stepper buttons with minimum/maximum boundaries",
        "Collapsible / expandable card layout with smooth LayoutAnimation",
        "Styled with NativeWind v4 & Tailwind CSS tokens",
      ],
      installCmd: "bun add @360parminder/components",
      codeSnippet: `import React, { useState } from 'react';
import { MeasurementCard } from '@360parminder/components';

export function DosageSelector() {
  const [strength, setStrength] = useState(250);
  const [unit, setUnit] = useState('mg');

  return (
    <MeasurementCard
      title="Medication Strength"
      value={strength}
      onChange={setStrength}
      unit={unit}
      units={['mg', 'mcg', 'g', 'ml']}
      onUnitChange={setUnit}
      min={1}
      max={1000}
      step={10}
      defaultExpanded={true}
    />
  );
}`,
      propsList: [
        { name: "title", type: "string", default: "'Title'", description: "Header label displayed on the card" },
        { name: "value", type: "number", default: "min", description: "Controlled numeric value" },
        { name: "onChange", type: "(val: number) => void", default: "undefined", description: "Callback fired when value changes" },
        { name: "unit", type: "string", default: "units[0]", description: "Currently active measurement unit" },
        { name: "units", type: "string[]", default: "['mg', 'mcg', 'g', 'ml']", description: "Array of selectable unit options" },
        { name: "min / max", type: "number", default: "1 / 1000", description: "Boundary limits for the stepper and ruler" },
        { name: "defaultExpanded", type: "boolean", default: "false", description: "Initial expanded state" },
      ],
    },
    {
      id: "CMP-02",
      name: "Button System",
      package: "@360parminder/components",
      category: "REACT_NATIVE",
      status: "NPM_PACKAGE",
      statusColor: "#22c55e",
      description:
        "A modular, accessible button system built with Tailwind Variants and NativeWind. Supports multiple visual variants, tactile sizes, loading spinner states, and custom icon slots.",
      features: [
        "4 visual hierarchy variants: Primary, Secondary, Outline, Ghost",
        "3 size scales: Small (sm), Medium (md), Large (lg)",
        "Integrated animated loading spinner and disabled state logic",
        "Full width container option with edge-to-edge support",
        "Fully typed with TypeScript & React Native accessibility attributes",
      ],
      installCmd: "bun add @360parminder/components",
      codeSnippet: `import { Button } from '@360parminder/components';

// Primary with Full Width
<Button variant="primary" label="Confirm & Continue" fullWidth />

// Secondary Medium with Custom Icon
<Button variant="secondary" size="md" label="Save Draft" />

// Loading & Disabled State Handling
<Button variant="outline" loading={isSubmitting} disabled={!isValid} label="Submit" />`,
      propsList: [
        { name: "variant", type: "'primary' | 'secondary' | 'outline' | 'ghost'", default: "'primary'", description: "Visual appearance style" },
        { name: "size", type: "'sm' | 'md' | 'lg'", default: "'md'", description: "Padding and typography size scale" },
        { name: "label", type: "string", default: "undefined", description: "Text displayed inside the button" },
        { name: "loading", type: "boolean", default: "false", description: "Displays activity indicator and disables press" },
        { name: "disabled", type: "boolean", default: "false", description: "Reduces opacity and prevents interaction" },
        { name: "fullWidth", type: "boolean", default: "false", description: "Expands button across 100% of container width" },
      ],
    },
    {
      id: "CMP-03",
      name: "HoverTechTag",
      package: "portfolio-v3",
      category: "REACT_WEB",
      status: "CORE",
      statusColor: "#3b82f6",
      description:
        "An animated micro-interaction badge built with Motion (Framer Motion). Smoothly expands to reveal authentic technology brand icons upon mouse hover with physics-based spring easing.",
      features: [
        "Spring layout animations using Motion/React",
        "Dynamic SVG brand logo resolution via getTechLogo catalog",
        "Subtle CAD border styling matching blueprint grid themes",
        "Zero layout shift with smooth CSS flex expansion",
      ],
      codeSnippet: `import { HoverTechTag } from "@/components/HoverTechTag";

export function TechList() {
  return (
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
      <HoverTechTag techName="TypeScript" baseStyle={{ height: "30px" }} />
      <HoverTechTag techName="React" baseStyle={{ height: "30px" }} />
      <HoverTechTag techName="Next.js" baseStyle={{ height: "30px" }} />
    </div>
  );
}`,
      propsList: [
        { name: "techName", type: "string", default: "required", description: "Name of the technology (e.g. 'TypeScript', 'Node.js')" },
        { name: "baseStyle", type: "React.CSSProperties", default: "{}", description: "Custom dimensions and container styling" },
      ],
    },
    {
      id: "CMP-04",
      name: "ProjectLogo",
      package: "portfolio-v3",
      category: "REACT_WEB",
      status: "PRODUCTION",
      statusColor: "#f59e0b",
      description:
        "An intelligent website logo extraction and rendering component. Automatically queries the `/api/extract-logo` endpoint to resolve high-res favicons, touch-icons, and SVG marks with multi-tier fallback.",
      features: [
        "Automated website HTML parsing & favicon extraction",
        "In-memory client-side cache to avoid repeat network requests",
        "Multi-tier graceful fallback: Extracted SVG/PNG → Google 128px favicon → CAD monogram initial",
        "Unclipped geometry preserving sharp brand contours",
      ],
      codeSnippet: `import { ProjectLogo } from "@/components/ProjectLogo";

// Usage with automatic web extraction
<ProjectLogo 
  url="https://kosh.uno" 
  name="Kosh" 
  size={36} 
  shape="circle" 
/>`,
      propsList: [
        { name: "url", type: "string", default: "undefined", description: "Target website link to extract the logo from" },
        { name: "name", type: "string", default: "required", description: "Project name used for alt text and monogram fallback" },
        { name: "size", type: "number", default: "32", description: "Diameter / box size in pixels" },
        { name: "shape", type: "'circle' | 'rounded'", default: "'rounded'", description: "Container radius format (50% vs 8px)" },
      ],
    },
  ];

  const filteredComponents = componentsData.filter((item) => {
    if (selectedCategory === "ALL") return true;
    return item.category === selectedCategory;
  });

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

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
      {/* ── Page Header & Breadcrumb ── */}
      <div style={{ marginBottom: "32px" }}>
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
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--nav-link-hover)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--nav-link)")}
          >
            HOME
          </Link>
          <span style={{ opacity: 0.5 }}>/</span>
          <span style={{ color: "var(--foreground)" }}>COMPONENTS</span>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <div style={{ fontSize: "9px", color: "var(--nav-link)", letterSpacing: "0.1em", marginBottom: "6px" }}>
              SECTION_04 // UI_COMPONENTS_REGISTRY
            </div>
            <h1
              style={{
                fontSize: "28px",
                fontWeight: 700,
                color: "var(--foreground)",
                margin: 0,
                letterSpacing: "-0.02em",
                fontFamily: "var(--font-geist-sans)",
              }}
            >
              Components
            </h1>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "10px",
              letterSpacing: "0.08em",
              color: "var(--nav-link)",
            }}
          >
            <span style={{ border: "1px solid var(--line-stroke-accent)", padding: "4px 8px", borderRadius: "3px", backgroundColor: "var(--line-fill-accent)" }}>
              PKG: @360parminder/components
            </span>
            <span style={{ border: "1px solid var(--line-stroke-accent)", padding: "4px 8px", borderRadius: "3px", backgroundColor: "var(--line-fill-accent)" }}>
              TOTAL: 0{componentsData.length}_NODES
            </span>
          </div>
        </div>

        <p
          style={{
            marginTop: "12px",
            fontSize: "13px",
            color: "var(--nav-link-hover)",
            lineHeight: "1.6",
            maxWidth: "760px",
            fontFamily: "var(--font-geist-sans)",
          }}
        >
          A catalog of custom-engineered UI components, publishable React Native component libraries, and CAD blueprint primitives crafted for high performance, visual beauty, and developer ergonomics.
        </p>
      </div>

      {/* ── Category Tabs ── */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          marginBottom: "28px",
          overflowX: "auto",
          paddingBottom: "4px",
          scrollbarWidth: "none",
        }}
      >
        {[
          { key: "ALL", label: "ALL_COMPONENTS" },
          { key: "REACT_NATIVE", label: "REACT_NATIVE_UI" },
          { key: "REACT_WEB", label: "WEB_PRIMITIVES" },
        ].map((tab) => {
          const isActive = selectedCategory === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setSelectedCategory(tab.key)}
              style={{
                fontSize: "10px",
                letterSpacing: "0.08em",
                padding: "6px 12px",
                border: "1px solid",
                borderColor: isActive ? "var(--foreground)" : "var(--line-stroke-accent)",
                borderRadius: "3px",
                backgroundColor: isActive ? "var(--line-fill-accent)" : "transparent",
                color: isActive ? "var(--foreground)" : "var(--nav-link)",
                cursor: "pointer",
                transition: "all 0.2s ease",
                fontFamily: "var(--font-geist-mono)",
                whiteSpace: "nowrap",
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ── Component Cards List ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
        {filteredComponents.map((cmp) => {
          const activeTab = activeTabMap[cmp.id] || "preview";

          return (
            <div
              key={cmp.id}
              id={cmp.id.toLowerCase()}
              style={{
                border: "1px solid var(--line-stroke-accent)",
                backgroundColor: "var(--line-fill)",
                borderRadius: "4px",
                overflow: "hidden",
                position: "relative",
              }}
            >
              {/* Header Bar */}
              <div
                style={{
                  borderBottom: "1px solid var(--line-stroke-accent)",
                  padding: "10px 16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: "var(--line-fill-accent)",
                  fontSize: "11px",
                  letterSpacing: "0.08em",
                  flexWrap: "wrap",
                  gap: "10px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      backgroundColor: cmp.statusColor,
                      borderRadius: "50%",
                      display: "inline-block",
                    }}
                  />
                  <span style={{ fontWeight: 700, color: "var(--foreground)", fontSize: "13px" }}>{cmp.name}</span>
                  <span
                    style={{
                      fontSize: "9px",
                      color: "var(--nav-link)",
                      border: "1px solid var(--line-stroke-accent)",
                      borderRadius: "2px",
                      padding: "1px 5px",
                    }}
                  >
                    {cmp.id}
                  </span>
                  <span
                    style={{
                      fontSize: "9px",
                      color: cmp.statusColor,
                      border: `1px solid ${cmp.statusColor}`,
                      borderRadius: "2px",
                      padding: "1px 5px",
                    }}
                  >
                    {cmp.status}
                  </span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "10px", color: "var(--nav-link)" }}>{cmp.package}</span>
                  {cmp.installCmd && (
                    <button
                      onClick={() => copyToClipboard(cmp.installCmd!, `${cmp.id}-install`)}
                      style={{
                        padding: "3px 8px",
                        fontSize: "9px",
                        letterSpacing: "0.05em",
                        backgroundColor: "var(--background)",
                        border: "1px solid var(--line-stroke-accent)",
                        borderRadius: "3px",
                        color: "var(--foreground)",
                        cursor: "pointer",
                        fontFamily: "var(--font-geist-mono)",
                        transition: "all 0.2s",
                      }}
                      title="Copy install command"
                    >
                      {copiedId === `${cmp.id}-install` ? "COPIED ✓" : "COPY_INSTALL"}
                    </button>
                  )}
                </div>
              </div>

              {/* Sub-Header Tabs */}
              <div
                style={{
                  display: "flex",
                  borderBottom: "1px solid var(--line-stroke-accent)",
                  backgroundColor: "var(--background)",
                  fontSize: "10px",
                  letterSpacing: "0.08em",
                }}
              >
                {(["preview", "code", "props"] as const).map((tab) => {
                  const isActive = activeTab === tab;
                  return (
                    <button
                      key={tab}
                      onClick={() => setActiveTabMap((prev) => ({ ...prev, [cmp.id]: tab }))}
                      style={{
                        padding: "8px 16px",
                        backgroundColor: isActive ? "var(--line-fill-accent)" : "transparent",
                        color: isActive ? "var(--foreground)" : "var(--nav-link)",
                        border: "none",
                        borderRight: "1px solid var(--line-stroke-accent)",
                        borderBottom: isActive ? "2px solid #3b82f6" : "none",
                        cursor: "pointer",
                        fontFamily: "var(--font-geist-mono)",
                        textTransform: "uppercase",
                        transition: "background 0.2s",
                      }}
                    >
                      {tab === "props" ? "SPECS_&_PROPS" : tab}
                    </button>
                  );
                })}
              </div>

              {/* Tab 1: PREVIEW */}
              {activeTab === "preview" && (
                <div style={{ padding: "20px", backgroundColor: "var(--background)" }}>
                  {/* Description */}
                  <p style={{ margin: "0 0 16px", fontSize: "12px", color: "var(--nav-link-hover)", lineHeight: "1.6", fontFamily: "var(--font-geist-sans)" }}>
                    {cmp.description}
                  </p>

                  {/* Dynamic Interactive Demo Rendering */}
                  <div
                    style={{
                      padding: "24px",
                      backgroundColor: "var(--line-fill)",
                      border: "1px dashed var(--line-stroke-accent)",
                      borderRadius: "4px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      minHeight: "180px",
                    }}
                  >
                    {/* Demo 1: MeasurementCard */}
                    {cmp.id === "CMP-01" && (
                      <div
                        style={{
                          width: "100%",
                          maxWidth: "460px",
                          backgroundColor: "var(--background)",
                          border: "1px solid var(--line-stroke-accent)",
                          borderRadius: "16px",
                          padding: "16px",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                          fontFamily: "var(--font-geist-sans)",
                        }}
                      >
                        {/* Header Row */}
                        <div
                          onClick={() => setMeasurementExpanded(!measurementExpanded)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            cursor: "pointer",
                            userSelect: "none",
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <div
                              style={{
                                width: "32px",
                                height: "32px",
                                borderRadius: "8px",
                                border: "1px solid var(--line-stroke-accent)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#3b82f6",
                                backgroundColor: "var(--line-fill-accent)",
                              }}
                            >
                              💊
                            </div>
                            <span style={{ fontWeight: 600, fontSize: "14px", color: "var(--foreground)" }}>Medication Strength</span>
                          </div>
                          <span style={{ fontWeight: 700, fontSize: "15px", color: "var(--foreground)" }}>
                            {measurementVal} {measurementUnit}
                          </span>
                        </div>

                        {/* Expandable Controls */}
                        {measurementExpanded && (
                          <div style={{ marginTop: "16px", borderTop: "1px solid var(--line-stroke-accent)", paddingTop: "14px" }}>
                            {/* Unit Selector Pills */}
                            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "16px" }}>
                              {["mg", "mcg", "g", "ml"].map((u) => {
                                const isSel = measurementUnit === u;
                                return (
                                  <button
                                    key={u}
                                    onClick={() => setMeasurementUnit(u)}
                                    style={{
                                      padding: "4px 12px",
                                      borderRadius: "999px",
                                      fontSize: "12px",
                                      fontWeight: isSel ? 700 : 500,
                                      border: "1px solid",
                                      borderColor: isSel ? "#3b82f6" : "var(--line-stroke-accent)",
                                      backgroundColor: isSel ? "rgba(59, 130, 246, 0.15)" : "transparent",
                                      color: isSel ? "#3b82f6" : "var(--nav-link)",
                                      cursor: "pointer",
                                    }}
                                  >
                                    {isSel && <span style={{ marginRight: "4px" }}>✓</span>}
                                    {u}
                                  </button>
                                );
                              })}
                            </div>

                            {/* Stepper + Value Display */}
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "16px 0" }}>
                              <button
                                onClick={() => setMeasurementVal((v) => Math.max(10, v - 10))}
                                style={{
                                  width: "40px",
                                  height: "40px",
                                  borderRadius: "50%",
                                  border: "1px solid var(--line-stroke-accent)",
                                  backgroundColor: "var(--line-fill-accent)",
                                  color: "var(--foreground)",
                                  fontSize: "20px",
                                  cursor: "pointer",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                −
                              </button>

                              <div style={{ textAlign: "center" }}>
                                <span style={{ fontSize: "32px", fontWeight: 800, color: "var(--foreground)" }}>{measurementVal}</span>
                                <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--nav-link)", marginLeft: "4px" }}>{measurementUnit}</span>
                              </div>

                              <button
                                onClick={() => setMeasurementVal((v) => Math.min(1000, v + 10))}
                                style={{
                                  width: "40px",
                                  height: "40px",
                                  borderRadius: "50%",
                                  border: "1px solid var(--line-stroke-accent)",
                                  backgroundColor: "var(--line-fill-accent)",
                                  color: "var(--foreground)",
                                  fontSize: "20px",
                                  cursor: "pointer",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                +
                              </button>
                            </div>

                            {/* Interactive Ruler Slider */}
                            <div style={{ padding: "0 8px" }}>
                              <input
                                type="range"
                                min={10}
                                max={1000}
                                step={10}
                                value={measurementVal}
                                onChange={(e) => setMeasurementVal(Number(e.target.value))}
                                style={{ width: "100%", cursor: "pointer", accentColor: "#3b82f6" }}
                              />
                              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: "var(--nav-link)", marginTop: "4px" }}>
                                <span>10 {measurementUnit}</span>
                                <span style={{ color: "#3b82f6", fontWeight: 700 }}>LIVE_CALIBRATED_RULER</span>
                                <span>1000 {measurementUnit}</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Demo 2: Button System */}
                    {cmp.id === "CMP-02" && (
                      <div style={{ width: "100%", maxWidth: "480px" }}>
                        {/* Interactive Controls Bar */}
                        <div
                          style={{
                            display: "flex",
                            gap: "8px",
                            flexWrap: "wrap",
                            marginBottom: "16px",
                            fontSize: "10px",
                            paddingBottom: "12px",
                            borderBottom: "1px dashed var(--line-stroke-accent)",
                          }}
                        >
                          <div>
                            <span style={{ color: "var(--nav-link)", marginRight: "6px" }}>VARIANT:</span>
                            {(["primary", "secondary", "outline", "ghost"] as const).map((v) => (
                              <button
                                key={v}
                                onClick={() => setBtnVariant(v)}
                                style={{
                                  padding: "2px 6px",
                                  fontSize: "9px",
                                  marginRight: "4px",
                                  border: "1px solid",
                                  borderColor: btnVariant === v ? "#3b82f6" : "var(--line-stroke-accent)",
                                  backgroundColor: btnVariant === v ? "#3b82f6" : "transparent",
                                  color: btnVariant === v ? "#fff" : "var(--nav-link)",
                                  borderRadius: "2px",
                                  cursor: "pointer",
                                }}
                              >
                                {v}
                              </button>
                            ))}
                          </div>

                          <div>
                            <span style={{ color: "var(--nav-link)", marginRight: "6px" }}>SIZE:</span>
                            {(["sm", "md", "lg"] as const).map((s) => (
                              <button
                                key={s}
                                onClick={() => setBtnSize(s)}
                                style={{
                                  padding: "2px 6px",
                                  fontSize: "9px",
                                  marginRight: "4px",
                                  border: "1px solid",
                                  borderColor: btnSize === s ? "#3b82f6" : "var(--line-stroke-accent)",
                                  backgroundColor: btnSize === s ? "#3b82f6" : "transparent",
                                  color: btnSize === s ? "#fff" : "var(--nav-link)",
                                  borderRadius: "2px",
                                  cursor: "pointer",
                                }}
                              >
                                {s}
                              </button>
                            ))}
                          </div>

                          <div style={{ display: "flex", gap: "6px" }}>
                            <button
                              onClick={() => setBtnLoading(!btnLoading)}
                              style={{
                                padding: "2px 6px",
                                fontSize: "9px",
                                border: "1px solid var(--line-stroke-accent)",
                                backgroundColor: btnLoading ? "#f59e0b" : "transparent",
                                color: btnLoading ? "#000" : "var(--nav-link)",
                                borderRadius: "2px",
                                cursor: "pointer",
                              }}
                            >
                              LOADING: {btnLoading ? "ON" : "OFF"}
                            </button>

                            <button
                              onClick={() => setBtnDisabled(!btnDisabled)}
                              style={{
                                padding: "2px 6px",
                                fontSize: "9px",
                                border: "1px solid var(--line-stroke-accent)",
                                backgroundColor: btnDisabled ? "#ef4444" : "transparent",
                                color: btnDisabled ? "#fff" : "var(--nav-link)",
                                borderRadius: "2px",
                                cursor: "pointer",
                              }}
                            >
                              DISABLED: {btnDisabled ? "ON" : "OFF"}
                            </button>
                          </div>
                        </div>

                        {/* Rendered Live Button */}
                        <div style={{ display: "flex", justifyContent: "center", padding: "12px 0" }}>
                          <button
                            disabled={btnDisabled || btnLoading}
                            style={{
                              padding: btnSize === "sm" ? "6px 14px" : btnSize === "lg" ? "14px 28px" : "10px 20px",
                              fontSize: btnSize === "sm" ? "12px" : btnSize === "lg" ? "16px" : "14px",
                              fontWeight: 600,
                              borderRadius: "8px",
                              cursor: btnDisabled || btnLoading ? "not-allowed" : "pointer",
                              opacity: btnDisabled ? 0.4 : 1,
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: "8px",
                              transition: "all 0.2s ease",
                              boxShadow: btnVariant === "primary" ? "0 2px 8px rgba(234, 88, 12, 0.25)" : "none",
                              backgroundColor:
                                btnVariant === "primary"
                                  ? "#ea580c"
                                  : btnVariant === "secondary"
                                  ? "var(--line-fill-accent)"
                                  : "transparent",
                              color:
                                btnVariant === "primary"
                                  ? "#ffffff"
                                  : btnVariant === "secondary"
                                  ? "var(--foreground)"
                                  : btnVariant === "outline"
                                  ? "var(--foreground)"
                                  : "var(--foreground)",
                              border:
                                btnVariant === "outline"
                                  ? "1px solid var(--line-stroke-accent)"
                                  : btnVariant === "secondary"
                                  ? "1px solid var(--line-stroke-accent)"
                                  : "none",
                            }}
                          >
                            {btnLoading && (
                              <span style={{ display: "inline-block", animation: "spin 1s linear infinite" }}>⏳</span>
                            )}
                            <span>{btnLoading ? "Processing..." : "Confirm Action"}</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Demo 3: HoverTechTag */}
                    {cmp.id === "CMP-03" && (
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
                        <span style={{ fontSize: "11px", color: "var(--nav-link)" }}>
                          HOVER_OVER_TAGS_TO_INSPECT_LOGO_EXPANSION //
                        </span>
                        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" }}>
                          {["TypeScript", "React", "Next.js", "Node.js", "MongoDB", "AWS"].map((tech) => (
                            <HoverTechTag key={tech} techName={tech} baseStyle={{ height: "34px", padding: "0 12px" }} />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Demo 4: ProjectLogo */}
                    {cmp.id === "CMP-04" && (
                      <div style={{ width: "100%", maxWidth: "440px", display: "flex", flexDirection: "column", gap: "14px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <span style={{ fontSize: "10px", color: "var(--nav-link)" }}>TEST_URL:</span>
                          <input
                            type="text"
                            value={customLogoUrl}
                            onChange={(e) => setCustomLogoUrl(e.target.value)}
                            style={{
                              flex: 1,
                              fontSize: "11px",
                              padding: "6px 10px",
                              backgroundColor: "var(--background)",
                              border: "1px solid var(--line-stroke-accent)",
                              borderRadius: "3px",
                              color: "var(--foreground)",
                              fontFamily: "var(--font-geist-mono)",
                            }}
                          />
                        </div>

                        {/* Presets */}
                        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                          {["https://kosh.uno", "https://Rajdoot.wtf", "https://swasthya.parminder.pro", "https://zurl.parminder.pro"].map((url) => (
                            <button
                              key={url}
                              onClick={() => setCustomLogoUrl(url)}
                              style={{
                                fontSize: "9px",
                                padding: "2px 6px",
                                border: "1px solid var(--line-stroke-accent)",
                                borderRadius: "2px",
                                backgroundColor: customLogoUrl === url ? "var(--line-fill-accent)" : "transparent",
                                color: customLogoUrl === url ? "var(--foreground)" : "var(--nav-link)",
                                cursor: "pointer",
                              }}
                            >
                              {new URL(url).hostname}
                            </button>
                          ))}
                        </div>

                        {/* Live Previews: Circle vs Rounded */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-around",
                            padding: "16px",
                            backgroundColor: "var(--background)",
                            border: "1px solid var(--line-stroke-accent)",
                            borderRadius: "4px",
                          }}
                        >
                          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                            <ProjectLogo url={customLogoUrl} name="Test" size={44} shape="circle" />
                            <span style={{ fontSize: "9px", color: "var(--nav-link)" }}>SHAPE: CIRCLE</span>
                          </div>

                          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                            <ProjectLogo url={customLogoUrl} name="Test" size={44} shape="rounded" />
                            <span style={{ fontSize: "9px", color: "var(--nav-link)" }}>SHAPE: ROUNDED (8PX)</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Feature Checklist */}
                  <div style={{ marginTop: "16px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "8px" }}>
                    {cmp.features.map((feat, idx) => (
                      <div key={idx} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", color: "var(--nav-link-hover)" }}>
                        <span style={{ color: cmp.statusColor }}>✓</span>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 2: CODE */}
              {activeTab === "code" && (
                <div style={{ position: "relative", backgroundColor: "var(--background)", padding: "16px" }}>
                  <button
                    onClick={() => copyToClipboard(cmp.codeSnippet, `${cmp.id}-code`)}
                    style={{
                      position: "absolute",
                      top: "20px",
                      right: "20px",
                      fontSize: "9px",
                      padding: "4px 8px",
                      border: "1px solid var(--line-stroke-accent)",
                      backgroundColor: "var(--line-fill-accent)",
                      color: "var(--foreground)",
                      borderRadius: "3px",
                      cursor: "pointer",
                      fontFamily: "var(--font-geist-mono)",
                    }}
                  >
                    {copiedId === `${cmp.id}-code` ? "COPIED ✓" : "COPY_CODE"}
                  </button>

                  <pre
                    style={{
                      margin: 0,
                      padding: "16px",
                      backgroundColor: "var(--line-fill)",
                      border: "1px solid var(--line-stroke-accent)",
                      borderRadius: "4px",
                      fontSize: "11px",
                      lineHeight: "1.6",
                      color: "var(--foreground)",
                      overflowX: "auto",
                      fontFamily: "var(--font-geist-mono)",
                    }}
                  >
                    <code>{cmp.codeSnippet}</code>
                  </pre>
                </div>
              )}

              {/* Tab 3: PROPS & SPECS */}
              {activeTab === "props" && (
                <div style={{ backgroundColor: "var(--background)", padding: "16px", overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "11px", textAlign: "left" }}>
                    <thead>
                      <tr style={{ borderBottom: "1px solid var(--line-stroke-accent)", color: "var(--nav-link)" }}>
                        <th style={{ padding: "8px" }}>PROP</th>
                        <th style={{ padding: "8px" }}>TYPE</th>
                        <th style={{ padding: "8px" }}>DEFAULT</th>
                        <th style={{ padding: "8px" }}>DESCRIPTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cmp.propsList.map((p, idx) => (
                        <tr key={idx} style={{ borderBottom: "1px solid var(--line-stroke)", color: "var(--foreground)" }}>
                          <td style={{ padding: "8px", fontWeight: 700, color: "#3b82f6" }}>{p.name}</td>
                          <td style={{ padding: "8px", color: "var(--nav-link)" }}><code>{p.type}</code></td>
                          <td style={{ padding: "8px", color: "var(--nav-link)" }}><code>{p.default}</code></td>
                          <td style={{ padding: "8px", color: "var(--nav-link-hover)" }}>{p.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Back to Home Link ── */}
      <div style={{ marginTop: "48px", display: "flex", justifyContent: "center" }}>
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
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--foreground)";
            e.currentTarget.style.borderColor = "var(--foreground)";
            e.currentTarget.style.backgroundColor = "var(--line-fill-accent)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--nav-link)";
            e.currentTarget.style.borderColor = "var(--line-stroke-accent)";
            e.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          ← BACK_TO_HOME
        </Link>
      </div>
    </main>
  );
}
