"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ProjectLogo } from "./ProjectLogo";

export interface ProjectSlide {
  badge: string;
  title: string;
  subtitle: string;
  render: (brandColor: string) => React.ReactNode;
}

export interface ProjectCardMeta {
  brandColor: string;
  bgGradient: string;
  stars: string;
}

// ── SLIDE MOCKUP DEFINITIONS FOR EACH PROJECT ──

function getProjectSlides(projectName: string): ProjectSlide[] {
  switch (projectName) {
    case "Kosh":
      return [
        {
          badge: "CHAT_INBOX // V2",
          title: "Next-Gen Chat Mail Interface",
          subtitle: "Fluid messaging UX for modern communication",
          render: (brand) => (
            <div style={{ display: "flex", height: "100%", gap: "8px", padding: "10px 14px 14px" }}>
              {/* Left Column: Email Thread List */}
              <div
                style={{
                  width: "38%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                  borderRight: "1px solid var(--line-stroke)",
                  paddingRight: "8px",
                }}
              >
                <div style={{ fontSize: "9px", color: "var(--nav-link)", letterSpacing: "0.08em", fontWeight: 700 }}>
                  INBOX (24)
                </div>
                {[
                  { sender: "Alex Rivera", snippet: "Custom DNS verified ✓", time: "2m", active: true },
                  { sender: "Sarah Chen", snippet: "API token for tenant #4", time: "14m", active: false },
                  { sender: "SMTP Queue", snippet: "128 inbound emails", time: "1h", active: false },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: "6px 8px",
                      borderRadius: "6px",
                      backgroundColor: item.active ? "var(--line-fill-accent)" : "transparent",
                      border: item.active ? `1px solid ${brand}` : "1px solid transparent",
                      display: "flex",
                      flexDirection: "column",
                      gap: "2px",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "10px", fontWeight: 600, color: "var(--foreground)" }}>{item.sender}</span>
                      <span style={{ fontSize: "8px", color: "var(--nav-link)" }}>{item.time}</span>
                    </div>
                    <span style={{ fontSize: "9px", color: "var(--nav-link-hover)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {item.snippet}
                    </span>
                  </div>
                ))}
              </div>

              {/* Right Column: Chat Email Thread View */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {/* Incoming bubble */}
                  <div style={{ alignSelf: "flex-start", maxWidth: "85%", backgroundColor: "var(--line-fill-accent)", border: "1px solid var(--line-stroke)", borderRadius: "8px", padding: "8px 10px" }}>
                    <div style={{ fontSize: "9px", color: "var(--nav-link)", marginBottom: "2px" }}>Alex Rivera · 10:42 AM</div>
                    <div style={{ fontSize: "10px", color: "var(--foreground)", lineHeight: "1.4" }}>
                      Can you confirm our custom domain MX routing is running on the new SMTP server?
                    </div>
                  </div>

                  {/* Outgoing bubble */}
                  <div style={{ alignSelf: "flex-end", maxWidth: "85%", backgroundColor: brand, color: "#ffffff", borderRadius: "8px", padding: "8px 10px", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}>
                    <div style={{ fontSize: "10px", lineHeight: "1.4", fontWeight: 500 }}>
                      ✓ Verified! Inbound mail queue processed with sub-50ms latency.
                    </div>
                  </div>
                </div>

                {/* AI Prompt Reply Bar */}
                <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "6px 10px", backgroundColor: "var(--line-fill)", border: "1px solid var(--line-stroke)", borderRadius: "8px" }}>
                  <span style={{ color: brand, fontSize: "11px" }}>✨</span>
                  <span style={{ fontSize: "10px", color: "var(--nav-link)" }}>Type a reply or press Tab for AI draft...</span>
                </div>
              </div>
            </div>
          ),
        },
        {
          badge: "SMTP_CORE // ENGINE",
          title: "Custom SMTP & Inbound Processing",
          subtitle: "Zero-dependency mail architecture built from scratch",
          render: (brand) => (
            <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "10px 14px 14px", gap: "10px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
                {[
                  { label: "SMTP PORT", val: "587 TLS", status: "READY" },
                  { label: "QUEUED", val: "0.04 ms", status: "FAST" },
                  { label: "DELIVERABILITY", val: "99.8%", status: "OPTIMAL" },
                ].map((stat, i) => (
                  <div key={i} style={{ padding: "8px", backgroundColor: "var(--line-fill-accent)", border: "1px solid var(--line-stroke)", borderRadius: "6px" }}>
                    <div style={{ fontSize: "8px", color: "var(--nav-link)", letterSpacing: "0.08em" }}>{stat.label}</div>
                    <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--foreground)", marginTop: "2px" }}>{stat.val}</div>
                    <div style={{ fontSize: "7px", color: brand, fontWeight: 600, marginTop: "2px" }}>● {stat.status}</div>
                  </div>
                ))}
              </div>

              {/* Real-time SMTP Log Stream */}
              <div style={{ flex: 1, backgroundColor: "#0b0f19", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "8px 10px", fontFamily: "var(--font-geist-mono), monospace", fontSize: "9px", color: "#94a3b8", display: "flex", flexDirection: "column", gap: "4px", overflow: "hidden" }}>
                <div><span style={{ color: "#22c55e" }}>[250]</span> 2.0.0 OK: queued as 4X8F9a1B</div>
                <div><span style={{ color: brand }}>[TLS]</span> Handshake cipher ECDHE-RSA-AES256-GCM-SHA384</div>
                <div><span style={{ color: "#eab308" }}>[SPF]</span> pass (client-ip=kosh.uno; envelope-from=sys@kosh.uno)</div>
                <div><span style={{ color: "#38bdf8" }}>[DKIM]</span> valid signature (header.s=kosh2025)</div>
              </div>
            </div>
          ),
        },
        {
          badge: "DOMAIN_SETUP // DNS",
          title: "Automated Custom Domain Provisioning",
          subtitle: "Instant tenant setup with automated TXT/MX records",
          render: (brand) => (
            <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "10px 14px 14px", gap: "8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--foreground)" }}>kosh.uno</span>
                  <span style={{ fontSize: "8px", padding: "2px 6px", borderRadius: "4px", backgroundColor: "rgba(34, 197, 94, 0.15)", color: "#22c55e", fontWeight: 600 }}>
                    ACTIVE DOMAIN
                  </span>
                </div>
                <span style={{ fontSize: "9px", color: "var(--nav-link)" }}>TLS 1.3 Certified</span>
              </div>

              {/* DNS Verification Accordion Rows */}
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {[
                  { type: "MX", host: "@", value: "mail.kosh.uno (Pri: 10)", verified: true },
                  { type: "TXT", host: "@", value: "v=spf1 include:kosh.uno ~all", verified: true },
                  { type: "CNAME", host: "mail._domainkey", value: "dkim.kosh.uno", verified: true },
                ].map((row, idx) => (
                  <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 10px", backgroundColor: "var(--line-fill-accent)", border: "1px solid var(--line-stroke)", borderRadius: "6px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontSize: "9px", fontWeight: 700, color: brand, width: "36px" }}>{row.type}</span>
                      <span style={{ fontSize: "9px", color: "var(--foreground)", fontFamily: "var(--font-geist-mono)" }}>{row.value}</span>
                    </div>
                    <span style={{ fontSize: "9px", color: "#22c55e", fontWeight: 600 }}>✓ Verified</span>
                  </div>
                ))}
              </div>
            </div>
          ),
        },
        {
          badge: "AI_FILTER // TRIAGE",
          title: "Neural Email Categorization & Summary",
          subtitle: "Smart sorting, priority alerts & automated thread insights",
          render: (brand) => (
            <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "10px 14px 14px", gap: "8px" }}>
              <div style={{ display: "flex", gap: "6px" }}>
                {["⚡ Urgent (3)", "💼 Work (18)", "📰 Newsletters (42)"].map((cat, i) => (
                  <span key={i} style={{ fontSize: "9px", padding: "3px 8px", borderRadius: "12px", backgroundColor: i === 0 ? brand : "var(--line-fill-accent)", color: i === 0 ? "#ffffff" : "var(--nav-link)", border: "1px solid var(--line-stroke)", fontWeight: 500 }}>
                    {cat}
                  </span>
                ))}
              </div>

              <div style={{ padding: "10px 12px", borderRadius: "8px", backgroundColor: "var(--line-fill-accent)", border: `1px solid ${brand}`, display: "flex", flexDirection: "column", gap: "6px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "10px", fontWeight: 700, color: "var(--foreground)" }}>✨ AI Key Summary · Q3 Security Audit</span>
                  <span style={{ fontSize: "8px", color: brand, fontWeight: 600 }}>High Priority</span>
                </div>
                <div style={{ fontSize: "9px", color: "var(--nav-link-hover)", lineHeight: "1.5" }}>
                  ▪ 0 Critical vulnerabilities detected in SMTP routing pipeline.<br />
                  ▪ Auto-provisioned AWS S3 bucket encryption keys validated.<br />
                  ▪ Socket.io sync throughput increased by 28%.
                </div>
              </div>
            </div>
          ),
        },
      ];

    case "Swasthya":
      return [
        {
          badge: "LIVE_VITALS // BLE_SYNC",
          title: "Real-Time Biometric Health Stream",
          subtitle: "Continuous live pulse, SpO2 & ECG telemetry sync",
          render: (brand) => (
            <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "10px 14px 14px", gap: "10px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
                {[
                  { label: "HEART RATE", val: "72 BPM", desc: "Resting · Normal" },
                  { label: "SPO2 LEVEL", val: "98 %", desc: "Optimal Range" },
                  { label: "BP READING", val: "120/80", desc: "Systolic/Diastolic" },
                ].map((stat, i) => (
                  <div key={i} style={{ padding: "8px", backgroundColor: "var(--line-fill-accent)", border: "1px solid var(--line-stroke)", borderRadius: "6px" }}>
                    <div style={{ fontSize: "8px", color: "var(--nav-link)", letterSpacing: "0.08em" }}>{stat.label}</div>
                    <div style={{ fontSize: "13px", fontWeight: 700, color: brand, marginTop: "2px" }}>{stat.val}</div>
                    <div style={{ fontSize: "8px", color: "var(--nav-link-hover)", marginTop: "2px" }}>{stat.desc}</div>
                  </div>
                ))}
              </div>

              {/* Dynamic ECG Waveform SVG Wireframe */}
              <div style={{ flex: 1, backgroundColor: "#022c22", border: "1px solid rgba(5,150,105,0.3)", borderRadius: "8px", padding: "8px 12px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "8px", color: "#34d399", letterSpacing: "0.1em", fontWeight: 600 }}>LIVE ECG TELEMETRY</span>
                  <span style={{ fontSize: "8px", color: "#6ee7b7" }}>● STREAMING 60Hz</span>
                </div>
                <svg viewBox="0 0 300 40" style={{ width: "100%", height: "35px" }}>
                  <path
                    d="M 0 20 L 40 20 L 50 8 L 60 32 L 70 2 L 80 24 L 90 20 L 140 20 L 150 8 L 160 32 L 170 2 L 180 24 L 190 20 L 240 20 L 250 8 L 260 32 L 270 2 L 280 24 L 290 20 L 300 20"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          ),
        },
        {
          badge: "MEDICATION // SCHEDULE",
          title: "Family Medication Adherence",
          subtitle: "Automated dose reminders & multi-member compliance",
          render: (brand) => (
            <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "10px 14px 14px", gap: "8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", gap: "6px" }}>
                  {["Self", "Mom", "Dad"].map((m, i) => (
                    <span key={i} style={{ fontSize: "8px", padding: "2px 8px", borderRadius: "10px", backgroundColor: i === 0 ? brand : "var(--line-fill-accent)", color: i === 0 ? "#ffffff" : "var(--nav-link)", fontWeight: 600 }}>
                      {m}
                    </span>
                  ))}
                </div>
                <span style={{ fontSize: "9px", color: "var(--nav-link)" }}>3 of 4 Doses Taken</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {[
                  { time: "08:00 AM", med: "Metformin 500mg", status: "Taken", done: true },
                  { time: "02:00 PM", med: "Omega-3 Fatty Acid", status: "Due now", done: false },
                  { time: "08:30 PM", med: "Multivitamin Complex", status: "Scheduled", done: false },
                ].map((row, idx) => (
                  <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 10px", backgroundColor: "var(--line-fill-accent)", border: "1px solid var(--line-stroke)", borderRadius: "6px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span style={{ fontSize: "9px", color: "var(--nav-link)", width: "52px" }}>{row.time}</span>
                      <span style={{ fontSize: "10px", fontWeight: 600, color: "var(--foreground)" }}>{row.med}</span>
                    </div>
                    <span style={{ fontSize: "8px", padding: "2px 6px", borderRadius: "4px", backgroundColor: row.done ? "rgba(34, 197, 94, 0.15)" : "rgba(245, 158, 11, 0.15)", color: row.done ? "#22c55e" : "#f59e0b", fontWeight: 600 }}>
                      {row.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ),
        },
        {
          badge: "HARDWARE_IOT // SENSORS",
          title: "ESP32 Wearable Telemetry Integration",
          subtitle: "Encrypted hardware pipeline syncing biometrics directly",
          render: (brand) => (
            <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "10px 14px 14px", gap: "8px" }}>
              <div style={{ padding: "10px 12px", borderRadius: "8px", backgroundColor: "var(--line-fill-accent)", border: "1px solid var(--line-stroke)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--foreground)" }}>ESP32 BioSensor Module v2</div>
                  <div style={{ fontSize: "9px", color: "var(--nav-link)", marginTop: "2px" }}>BLE 5.2 · Firmware v1.4.2</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: "#22c55e" }}>84% Battery</div>
                  <div style={{ fontSize: "8px", color: "var(--nav-link)" }}>● Connected</div>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
                <div style={{ padding: "8px 10px", backgroundColor: "var(--line-fill)", border: "1px solid var(--line-stroke)", borderRadius: "6px" }}>
                  <div style={{ fontSize: "8px", color: "var(--nav-link)" }}>SKIN TEMPERATURE</div>
                  <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--foreground)", marginTop: "2px" }}>36.6 °C</div>
                </div>
                <div style={{ padding: "8px 10px", backgroundColor: "var(--line-fill)", border: "1px solid var(--line-stroke)", borderRadius: "6px" }}>
                  <div style={{ fontSize: "8px", color: "var(--nav-link)" }}>STEP COUNT TODAY</div>
                  <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--foreground)", marginTop: "2px" }}>8,420 steps</div>
                </div>
              </div>
            </div>
          ),
        },
        {
          badge: "HEALTH_VAULT // ENCRYPTED",
          title: "Personal Medical Records Vault",
          subtitle: "AES-256 encrypted storage on AWS & Cloudinary",
          render: (brand) => (
            <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "10px 14px 14px", gap: "8px" }}>
              <div style={{ fontSize: "9px", color: "var(--nav-link)", letterSpacing: "0.08em", fontWeight: 700 }}>
                RECENT ENCRYPTED LAB REPORTS
              </div>
              {[
                { file: "Annual_Checkup_FullPanel.pdf", date: "Oct 12, 2025", size: "1.2 MB" },
                { file: "ECG_Telemetry_Export_Q3.csv", date: "Sep 28, 2025", size: "340 KB" },
                { file: "Physician_Consult_Notes.pdf", date: "Aug 15, 2025", size: "850 KB" },
              ].map((doc, idx) => (
                <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 10px", backgroundColor: "var(--line-fill-accent)", border: "1px solid var(--line-stroke)", borderRadius: "6px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontSize: "12px" }}>📄</span>
                    <div>
                      <div style={{ fontSize: "9px", fontWeight: 600, color: "var(--foreground)" }}>{doc.file}</div>
                      <div style={{ fontSize: "8px", color: "var(--nav-link)" }}>{doc.date}</div>
                    </div>
                  </div>
                  <span style={{ fontSize: "8px", color: "var(--nav-link)", fontFamily: "var(--font-geist-mono)" }}>{doc.size}</span>
                </div>
              ))}
            </div>
          ),
        },
      ];

    case "Rajdoot":
      return [
        {
          badge: "API_GATEWAY // SUB-100MS",
          title: "High-Throughput Messaging API",
          subtitle: "Ultra-low latency developer platform with global cluster",
          render: (brand) => (
            <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "10px 14px 14px", gap: "10px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
                {[
                  { label: "AVG LATENCY", val: "42 ms", status: "SUB-100MS" },
                  { label: "MESSAGES/DAY", val: "2.4M", status: "HIGH VOL" },
                  { label: "UPTIME SLA", val: "99.99%", status: "OPTIMAL" },
                ].map((stat, i) => (
                  <div key={i} style={{ padding: "8px", backgroundColor: "var(--line-fill-accent)", border: "1px solid var(--line-stroke)", borderRadius: "6px" }}>
                    <div style={{ fontSize: "8px", color: "var(--nav-link)", letterSpacing: "0.08em" }}>{stat.label}</div>
                    <div style={{ fontSize: "13px", fontWeight: 700, color: brand, marginTop: "2px" }}>{stat.val}</div>
                    <div style={{ fontSize: "7px", color: "var(--foreground)", fontWeight: 600, marginTop: "2px" }}>● {stat.status}</div>
                  </div>
                ))}
              </div>

              {/* API Request Sparkline Container */}
              <div style={{ flex: 1, backgroundColor: "#1e1b4b", border: "1px solid rgba(124,58,237,0.3)", borderRadius: "8px", padding: "8px 12px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "8px", color: "#c4b5fd", letterSpacing: "0.08em", fontWeight: 600 }}>DISPATCH THROUGHPUT (REQ/SEC)</span>
                  <span style={{ fontSize: "8px", color: "#a78bfa" }}>PEAK: 1,840/s</span>
                </div>
                <svg viewBox="0 0 300 35" style={{ width: "100%", height: "30px" }}>
                  <path
                    d="M 0 25 Q 40 28, 70 18 T 140 10 T 210 22 T 260 6 T 300 14"
                    fill="none"
                    stroke="#8b5cf6"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          ),
        },
        {
          badge: "SOCKET_INSPECTOR // WSS",
          title: "Real-Time WebSocket Event Stream",
          subtitle: "Inspect incoming payloads and delivery telemetry live",
          render: (brand) => (
            <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "10px 14px 14px", gap: "8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "9px", fontFamily: "var(--font-geist-mono)", color: brand, fontWeight: 700 }}>
                  wss://api.rajdoot.wtf/v1/feed
                </span>
                <span style={{ fontSize: "8px", color: "#22c55e", fontWeight: 600 }}>● CONNECTED</span>
              </div>

              <div style={{ flex: 1, backgroundColor: "#0b0f19", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "8px 10px", fontFamily: "var(--font-geist-mono), monospace", fontSize: "9px", color: "#94a3b8", display: "flex", flexDirection: "column", gap: "4px", overflow: "hidden" }}>
                <div><span style={{ color: "#38bdf8" }}>[15:32:01.04]</span> ws_connect: handshake OK</div>
                <div><span style={{ color: "#a855f7" }}>[15:32:01.08]</span> msg_dispatch: channel=#dev-ops (42ms)</div>
                <div><span style={{ color: "#22c55e" }}>[15:32:01.12]</span> ack_delivery: recipient=client_492</div>
                <div><span style={{ color: "#eab308" }}>[15:32:01.18]</span> iot_event: trigger relay_01 state=ACTIVE</div>
              </div>
            </div>
          ),
        },
        {
          badge: "HARDWARE_TRIGGER // ARDUINO",
          title: "Physical IoT Webhook Triggers",
          subtitle: "Bridge cloud API calls directly into embedded hardware",
          render: (brand) => (
            <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "10px 14px 14px", gap: "8px" }}>
              <div style={{ fontSize: "9px", color: "var(--nav-link)", letterSpacing: "0.08em", fontWeight: 700 }}>
                ACTIVE HARDWARE NODES
              </div>
              {[
                { name: "Arduino Relay Actuator #1", status: "ARMED / READY", pin: "PIN D8" },
                { name: "ESP32 Sensor Interrupt", status: "LISTENING", pin: "PIN GPIO2" },
                { name: "Solenoid Door Trigger", status: "IDLE", pin: "PIN D12" },
              ].map((node, idx) => (
                <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 10px", backgroundColor: "var(--line-fill-accent)", border: "1px solid var(--line-stroke)", borderRadius: "6px" }}>
                  <div>
                    <div style={{ fontSize: "10px", fontWeight: 600, color: "var(--foreground)" }}>{node.name}</div>
                    <div style={{ fontSize: "8px", color: brand, fontFamily: "var(--font-geist-mono)" }}>{node.pin}</div>
                  </div>
                  <span style={{ fontSize: "8px", padding: "2px 6px", borderRadius: "4px", backgroundColor: "rgba(124, 58, 237, 0.15)", color: brand, fontWeight: 600 }}>
                    {node.status}
                  </span>
                </div>
              ))}
            </div>
          ),
        },
        {
          badge: "DEVELOPER_PORTAL // KEYS",
          title: "API Keys & Razorpay Subscriptions",
          subtitle: "Instant secret generation, quota alerts & tiered plans",
          render: (brand) => (
            <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "10px 14px 14px", gap: "8px" }}>
              <div style={{ padding: "8px 10px", borderRadius: "6px", backgroundColor: "var(--line-fill-accent)", border: "1px solid var(--line-stroke)" }}>
                <div style={{ fontSize: "8px", color: "var(--nav-link)", letterSpacing: "0.08em" }}>PRODUCTION API SECRET</div>
                <div style={{ fontSize: "10px", fontWeight: 600, color: "var(--foreground)", fontFamily: "var(--font-geist-mono)", marginTop: "2px" }}>
                  rk_live_9a4f21b7••••••••910c
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 10px", backgroundColor: "var(--line-fill-accent)", border: "1px solid var(--line-stroke)", borderRadius: "6px" }}>
                <div>
                  <div style={{ fontSize: "9px", fontWeight: 600, color: "var(--foreground)" }}>Pro Developer Tier</div>
                  <div style={{ fontSize: "8px", color: "var(--nav-link)" }}>Razorpay Auto-Billed Monthly</div>
                </div>
                <span style={{ fontSize: "9px", fontWeight: 700, color: brand }}>$29 / mo</span>
              </div>
            </div>
          ),
        },
      ];

    case "ZURL":
    default:
      return [
        {
          badge: "SHORTENER_STUDIO // V3",
          title: "Ultra-Fast URL Redirection Engine",
          subtitle: "Custom alias creation with sub-50ms redirection speed",
          render: (brand) => (
            <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "10px 14px 14px", gap: "10px" }}>
              <div style={{ padding: "8px 10px", backgroundColor: "var(--line-fill-accent)", border: "1px solid var(--line-stroke)", borderRadius: "6px" }}>
                <div style={{ fontSize: "8px", color: "var(--nav-link)" }}>LONG DESTINATION URL</div>
                <div style={{ fontSize: "9px", color: "var(--foreground)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginTop: "2px" }}>
                  https://github.com/parminder/portfolio-v3/releases/latest
                </div>
              </div>

              <div style={{ padding: "8px 10px", backgroundColor: "var(--line-fill-accent)", border: `1px solid ${brand}`, borderRadius: "6px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: "8px", color: brand, fontWeight: 700 }}>SHORTENED SLUG</div>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--foreground)", fontFamily: "var(--font-geist-mono)" }}>
                    zurl.parminder.pro/latest
                  </div>
                </div>
                <span style={{ fontSize: "8px", padding: "3px 8px", borderRadius: "4px", backgroundColor: brand, color: "#ffffff", fontWeight: 600 }}>
                  COPY
                </span>
              </div>

              <div style={{ display: "flex", gap: "6px" }}>
                {["⚡ Sub-50ms Lookup", "🔒 Password Lock", "📱 Dynamic QR"].map((tag, i) => (
                  <span key={i} style={{ fontSize: "8px", padding: "3px 6px", borderRadius: "4px", backgroundColor: "var(--line-fill)", border: "1px solid var(--line-stroke)", color: "var(--nav-link)" }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ),
        },
        {
          badge: "GEO_ANALYTICS // CLICKS",
          title: "Real-Time Geolocation Breakdown",
          subtitle: "Device, referrer & country-level click intelligence",
          render: (brand) => (
            <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "10px 14px 14px", gap: "8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "9px", color: "var(--nav-link)", letterSpacing: "0.08em", fontWeight: 700 }}>
                  TOP TRAFFIC LOCATIONS
                </span>
                <span style={{ fontSize: "9px", color: brand, fontWeight: 600 }}>4,820 Total Clicks</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {[
                  { country: "🇺🇸 United States", pct: "42%", count: "2,024" },
                  { country: "🇮🇳 India", pct: "31%", count: "1,494" },
                  { country: "🇩🇪 Germany", pct: "16%", count: "771" },
                ].map((item, idx) => (
                  <div key={idx} style={{ padding: "6px 8px", backgroundColor: "var(--line-fill-accent)", border: "1px solid var(--line-stroke)", borderRadius: "6px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "9px", fontWeight: 600, color: "var(--foreground)", marginBottom: "3px" }}>
                      <span>{item.country}</span>
                      <span>{item.pct} ({item.count})</span>
                    </div>
                    <div style={{ width: "100%", height: "4px", backgroundColor: "var(--line-stroke)", borderRadius: "2px", overflow: "hidden" }}>
                      <div style={{ width: item.pct, height: "100%", backgroundColor: brand, borderRadius: "2px" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ),
        },
        {
          badge: "VECTOR_QR // CUSTOM",
          title: "High-Resolution Branded QR Generator",
          subtitle: "Exportable in SVG, PNG with centered logo branding",
          render: (brand) => (
            <div style={{ display: "flex", height: "100%", padding: "10px 14px 14px", gap: "12px", alignItems: "center" }}>
              {/* QR Code Canvas Mockup */}
              <div style={{ width: "95px", height: "95px", backgroundColor: "#ffffff", borderRadius: "8px", padding: "6px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 14px rgba(0,0,0,0.2)" }}>
                <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
                  {/* Outer corner squares */}
                  <rect x="5" y="5" width="26" height="26" rx="4" fill="#0f172a" />
                  <rect x="10" y="10" width="16" height="16" rx="2" fill="#ffffff" />
                  <rect x="14" y="14" width="8" height="8" rx="1" fill="#0f172a" />

                  <rect x="69" y="5" width="26" height="26" rx="4" fill="#0f172a" />
                  <rect x="74" y="10" width="16" height="16" rx="2" fill="#ffffff" />
                  <rect x="78" y="14" width="8" height="8" rx="1" fill="#0f172a" />

                  <rect x="5" y="69" width="26" height="26" rx="4" fill="#0f172a" />
                  <rect x="10" y="74" width="16" height="16" rx="2" fill="#ffffff" />
                  <rect x="14" y="78" width="8" height="8" rx="1" fill="#0f172a" />

                  {/* Matrix pattern dots */}
                  <circle cx="45" cy="18" r="4" fill="#0f172a" />
                  <circle cx="55" cy="28" r="4" fill="#0f172a" />
                  <circle cx="45" cy="45" r="5" fill={brand} />
                  <circle cx="55" cy="65" r="4" fill="#0f172a" />
                  <circle cx="80" cy="50" r="4" fill="#0f172a" />
                  <circle cx="75" cy="75" r="4" fill="#0f172a" />
                  <circle cx="20" cy="48" r="4" fill="#0f172a" />
                </svg>
              </div>

              {/* QR Options */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
                <div style={{ fontSize: "10px", fontWeight: 700, color: "var(--foreground)" }}>Live Vector QR</div>
                <div style={{ fontSize: "8px", color: "var(--nav-link)", lineHeight: "1.4" }}>
                  Instant scan verification with built-in 30% error correction.
                </div>
                <div style={{ display: "flex", gap: "6px", marginTop: "4px" }}>
                  <span style={{ fontSize: "8px", padding: "3px 8px", borderRadius: "4px", backgroundColor: brand, color: "#ffffff", fontWeight: 600 }}>
                    Export SVG
                  </span>
                  <span style={{ fontSize: "8px", padding: "3px 8px", borderRadius: "4px", backgroundColor: "var(--line-fill-accent)", border: "1px solid var(--line-stroke)", color: "var(--nav-link)" }}>
                    PNG (4K)
                  </span>
                </div>
              </div>
            </div>
          ),
        },
        {
          badge: "SECURITY // ACCESS",
          title: "Link Expiration & Access Controls",
          subtitle: "Password protection, self-destruct timers & privacy rules",
          render: (brand) => (
            <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "10px 14px 14px", gap: "8px" }}>
              <div style={{ fontSize: "9px", color: "var(--nav-link)", letterSpacing: "0.08em", fontWeight: 700 }}>
                PROTECTION POLICIES
              </div>
              {[
                { rule: "Password Protection", state: "Enabled (8-char hash)", active: true },
                { rule: "Self-Destruct Timer", state: "Expires in 7 Days", active: true },
                { rule: "Referrer Anonymizer", state: "Privacy Cloak Active", active: true },
              ].map((policy, idx) => (
                <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 10px", backgroundColor: "var(--line-fill-accent)", border: "1px solid var(--line-stroke)", borderRadius: "6px" }}>
                  <div>
                    <div style={{ fontSize: "9px", fontWeight: 600, color: "var(--foreground)" }}>{policy.rule}</div>
                    <div style={{ fontSize: "8px", color: "var(--nav-link)" }}>{policy.state}</div>
                  </div>
                  <span style={{ fontSize: "8px", color: brand, fontWeight: 700 }}>ON</span>
                </div>
              ))}
            </div>
          ),
        },
      ];
  }
}

// ── CAD PROJECT CARD WITH VERTICAL BOTTOM-TO-TOP CAROUSEL ──

export function CadProjectCardItem({
  prj,
  meta,
  index = 0,
}: {
  prj: {
    id: string;
    name: string;
    description: string | string[];
    link: string;
    status: string;
    tech: string[];
  };
  meta: ProjectCardMeta;
  index?: number;
}) {
  const [hovered, setHovered] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [direction, setDirection] = useState(1);

  const slides = getProjectSlides(prj.name);
  const displayDesc = Array.isArray(prj.description) ? prj.description[0] : prj.description;

  // Auto-play vertical carousel from bottom to top on hover
  useEffect(() => {
    if (!hovered) return;

    const timer = setInterval(() => {
      setDirection(1); // Bottom to top
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 2400);

    return () => clearInterval(timer);
  }, [hovered, slides.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={{ display: "flex", flexDirection: "column" }}
    >
      {/* Title Bar above card: matches reference screenshot */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
          padding: "0 2px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <h3
            style={{
              fontSize: "17px",
              fontWeight: 600,
              margin: 0,
              color: meta.brandColor,
              fontFamily: "var(--font-geist-sans), sans-serif",
              letterSpacing: "-0.01em",
            }}
          >
            {prj.name.toLowerCase()}
          </h3>
        </div>

        <motion.div
          whileHover={{ scale: 1.08 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            color: "var(--nav-link)",
            fontSize: "12px",
            fontFamily: "var(--font-geist-mono), monospace",
            cursor: "default",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          <span>{meta.stars}</span>
        </motion.div>
      </div>

      {/* Card Preview Container with Vertical Bottom-to-Top Carousel */}
      <motion.div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileHover={{ y: -3 }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        style={{
          position: "relative",
          height: "260px",
          borderRadius: "16px",
          overflow: "hidden",
          border: hovered ? `1px solid ${meta.brandColor}` : "1px solid var(--line-stroke-accent)",
          backgroundColor: "var(--line-fill)",
          boxShadow: hovered ? "0 14px 34px -10px rgba(0,0,0,0.3)" : "none",
          transition: "border 0.3s ease, box-shadow 0.3s ease",
          userSelect: "none",
        }}
      >
        {/* Top-Right Circular External Link Button (as seen in reference image) */}
        {prj.link && prj.link !== "#" && (
          <motion.a
            href={prj.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.92 }}
            title={`Visit ${prj.name}`}
            aria-label={`Visit ${prj.name}`}
            style={{
              position: "absolute",
              top: "12px",
              right: "12px",
              zIndex: 30,
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              backgroundColor: "rgba(0, 0, 0, 0.65)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              textDecoration: "none",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </motion.a>
        )}

        {/* Bottom-Right Vertical Indicator Dots (matches reference screenshot) */}
        <div
          style={{
            position: "absolute",
            right: "12px",
            bottom: "12px",
            zIndex: 30,
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            alignItems: "center",
            padding: "5px 4px",
            borderRadius: "12px",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
          }}
        >
          {slides.map((_, dotIdx) => {
            const isActive = activeSlide === dotIdx;
            return (
              <button
                key={dotIdx}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setDirection(dotIdx >= activeSlide ? 1 : -1);
                  setActiveSlide(dotIdx);
                }}
                title={`Slide ${dotIdx + 1}`}
                aria-label={`Slide ${dotIdx + 1}`}
                style={{
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  width: "5px",
                  height: isActive ? "16px" : "5px",
                  borderRadius: isActive ? "3px" : "50%",
                  backgroundColor: isActive ? "#ffffff" : "rgba(255, 255, 255, 0.4)",
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              />
            );
          })}
        </div>

        {/* Animated Vertical Carousel Slides: Flow from Bottom to Top */}
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={activeSlide}
            custom={direction}
            variants={{
              enter: (dir: number) => ({
                y: dir > 0 ? "100%" : "-100%",
                opacity: 0,
              }),
              center: {
                y: 0,
                opacity: 1,
              },
              exit: (dir: number) => ({
                y: dir > 0 ? "-100%" : "100%",
                opacity: 0,
              }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              y: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
              opacity: { duration: 0.25 },
            }}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              backgroundColor: "var(--background)",
            }}
          >
            {/* Slide Top Navigation Header Ribbon */}
            <div
              style={{
                padding: "8px 14px",
                borderBottom: "1px solid var(--line-stroke-accent)",
                backgroundColor: "var(--line-fill-accent)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <ProjectLogo url={prj.link} name={prj.name} size={18} shape="rounded" />
                <span style={{ fontSize: "10px", fontWeight: 700, color: "var(--foreground)", letterSpacing: "0.04em" }}>
                  {prj.name.toUpperCase()}
                </span>
                <span style={{ fontSize: "8px", color: meta.brandColor, fontWeight: 600, letterSpacing: "0.08em" }}>
                  // {slides[activeSlide]?.badge}
                </span>
              </div>

              {/* Faux window action dots */}
              <div style={{ display: "flex", gap: "4px", marginRight: prj.link ? "32px" : "0" }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--line-stroke-accent)" }} />
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--line-stroke-accent)" }} />
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--line-stroke-accent)" }} />
              </div>
            </div>

            {/* Slide Body Content */}
            <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
              {slides[activeSlide]?.render(meta.brandColor)}
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Description below card */}
      <div
        style={{
          marginTop: "12px",
          color: "var(--nav-link-hover)",
          fontSize: "13px",
          lineHeight: "1.6",
          fontFamily: "var(--font-geist-sans), sans-serif",
        }}
      >
        {displayDesc}
      </div>

      {/* Tech pills row with motion */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "6px",
          marginTop: "12px",
        }}
      >
        {prj.tech.map((t: string) => (
          <motion.span
            key={t}
            whileHover={{ scale: 1.06, y: -1 }}
            transition={{ duration: 0.15 }}
            style={{
              backgroundColor: "var(--background)",
              border: "1px solid var(--line-stroke-accent)",
              color: "var(--nav-link)",
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: "9px",
              letterSpacing: "0.04em",
              padding: "2px 6px",
              borderRadius: "3px",
              cursor: "default",
            }}
          >
            {t}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
