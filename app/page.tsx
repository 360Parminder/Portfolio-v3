"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import clsx from "clsx";
import { Caveat } from "next/font/google";

const caveat = Caveat({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

/* ── CAD SPEC ICONS ── */
function BriefcaseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function UserBadgeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

/* ── LIVE CAD TIME & TIMEZONE COMPARISON ── */
function CadTimeTracker() {
  const [indiaTime, setIndiaTime] = useState<string>("");
  const [timeDiffText, setTimeDiffText] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      const timeStr = new Intl.DateTimeFormat("en-US", options).format(now);
      setIndiaTime(timeStr + " IST");

      const userOffsetMinutes = -now.getTimezoneOffset();
      const indiaOffsetMinutes = 330; // IST is UTC+5:30
      const diffMinutes = indiaOffsetMinutes - userOffsetMinutes;

      if (diffMinutes === 0) {
        setTimeDiffText("Same as your local time");
      } else {
        const isAhead = diffMinutes > 0;
        const absDiff = Math.abs(diffMinutes);
        const hours = Math.floor(absDiff / 60);
        const mins = absDiff % 60;

        let diffStr = "";
        if (hours > 0 && mins > 0) {
          diffStr = `${hours}h ${mins}m`;
        } else if (hours > 0) {
          diffStr = `${hours}h`;
        } else {
          diffStr = `${mins}m`;
        }

        setTimeDiffText(`${diffStr} ${isAhead ? "ahead of" : "behind"} your local time`);
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
      <span style={{ fontWeight: 600, fontSize: "12px", letterSpacing: "0.02em" }}>
        {indiaTime || "--:--:-- IST"}
      </span>
      <span style={{ fontSize: "9px", color: "var(--nav-link)", fontFamily: "var(--font-geist-mono)" }}>
        {timeDiffText ? `[ ${timeDiffText} ]` : "[ Calculating offset... ]"}
      </span>
    </div>
  );
}

/* ── SOCIAL MEDIA SVG ICONS ── */
function XIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function GithubSocialIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
    </svg>
  );
}

function DailyDevIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  );
}

function DiscordIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .373-.292.074.074 0 0 1 .077-.01c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

function MediumIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42c1.87 0 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
    </svg>
  );
}

/* ── CAD TECH STACK SPECIFICATION MATRIX ── */
function CadTechStack() {
  const stackCategories = [
    {
      id: "01",
      name: "Language",
      skills: [
        { name: "TypeScript", icon: "TS" },
        { name: "JavaScript", icon: "JS" },
        { name: "Python", icon: "PY" },
        { name: "Java", icon: "JV" },
      ],
    },
    {
      id: "02",
      name: "Frontend & Mobile",
      skills: [
        { name: "React", icon: "⚛" },
        { name: "React Native", icon: "📱" },
        { name: "Next.js", icon: "N" },
        { name: "Tailwind CSS", icon: "≈" },
        { name: "shadcn/ui", icon: "//" },
        { name: "Radix UI", icon: "⁘" },
        { name: "Base UI", icon: "b" },
        { name: "Motion", icon: "///" },
        { name: "Expo", icon: "▲" },
        { name: "TanStack", icon: "🏝" },
        { name: "MobX-State-Tree", icon: "▵" },
      ],
    },
    {
      id: "03",
      name: "Backend & Database",
      skills: [
        { name: "Node.js", icon: "⬢" },
        { name: "Bun", icon: "🧅" },
        { name: "PostgreSQL", icon: "🐘" },
        { name: "MongoDB", icon: "🍃" },
        { name: "Redis", icon: "⚡" },
        { name: "nginx", icon: "N" },
      ],
    },
    {
      id: "04",
      name: "Workflow & AI",
      skills: [
        { name: "Cursor", icon: "✦" },
        { name: "Claude", icon: "✳" },
        { name: "Gemini", icon: "✦" },
        { name: "ChatGPT", icon: "❖" },
        { name: "Git", icon: "⎇" },
        { name: "GitHub", icon: "🐙" },
        { name: "Docker", icon: "🐳" },
        { name: "Vercel", icon: "▲" },
      ],
    },
    {
      id: "05",
      name: "IoT & Hardware",
      skills: [
        { name: "Arduino", icon: "♾" },
        { name: "ESP32", icon: "📻" },
      ],
    },
    {
      id: "06",
      name: "Analytics",
      skills: [
        { name: "OpenPanel", icon: "OI" },
        { name: "PostHog", icon: "🦔" },
      ],
    },
    {
      id: "07",
      name: "Design",
      skills: [
        { name: "Figma", icon: "❖" },
        { name: "Paper", icon: "🗏" },
        { name: "Photoshop", icon: "Ps" },
      ],
    },
  ];

  return (
    <div
      id="skills"
      style={{
        marginTop: "24px",
        border: "1px solid var(--line-stroke-accent)",
        backgroundColor: "var(--line-fill)",
        position: "relative",
        fontSize: "12px",
        fontFamily: "var(--font-geist-mono)",
      }}
    >
      {/* CAD Corner Crosshairs */}
      <div style={{ position: "absolute", top: "-6px", left: "-6px", color: "var(--line-stroke-accent)", fontSize: "10px", lineHeight: "1" }}>+</div>
      <div style={{ position: "absolute", top: "-6px", right: "-6px", color: "var(--line-stroke-accent)", fontSize: "10px", lineHeight: "1" }}>+</div>
      <div style={{ position: "absolute", bottom: "-6px", left: "-6px", color: "var(--line-stroke-accent)", fontSize: "10px", lineHeight: "1" }}>+</div>
      <div style={{ position: "absolute", bottom: "-6px", right: "-6px", color: "var(--line-stroke-accent)", fontSize: "10px", lineHeight: "1" }}>+</div>

      {/* Header Bar */}
      <div
        style={{
          borderBottom: "1px solid var(--line-stroke-accent)",
          padding: "10px 14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "var(--line-fill-accent)",
          fontSize: "11px",
          letterSpacing: "0.1em",
          color: "var(--nav-link-hover)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ width: "6px", height: "6px", backgroundColor: "#22c55e", borderRadius: "50%", display: "inline-block" }} />
          <span>SPEC_DATA // TECH_STACK_MATRIX</span>
        </div>
        <span>TOTAL: 36_ENGINEERING_TOOLS</span>
      </div>

      {/* Category Rows */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {stackCategories.map((cat, index) => (
          <div
            key={cat.id}
            style={{
              display: "grid",
              gridTemplateColumns: "200px 1fr",
              borderBottom: index === stackCategories.length - 1 ? "none" : "1px solid var(--line-stroke)",
            }}
          >
            {/* Category Header */}
            <div
              style={{
                padding: "14px 16px",
                borderRight: "1px dashed var(--line-stroke)",
                backgroundColor: "var(--line-fill)",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "11px",
              }}
            >
              <span style={{ color: "var(--nav-link)", fontSize: "9px" }}>{cat.id} //</span>
              <span style={{ color: "var(--foreground)", fontWeight: 600 }}>{cat.name}</span>
            </div>

            {/* Chips Container */}
            <div
              style={{
                padding: "12px 16px",
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                alignItems: "center",
                backgroundColor: "var(--background)",
              }}
            >
              {cat.skills.map((skill) => (
                <div
                  key={skill.name}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "5px 11px",
                    border: "1px solid var(--line-stroke-accent)",
                    borderRadius: "4px",
                    backgroundColor: "var(--line-fill)",
                    color: "var(--foreground)",
                    fontSize: "12px",
                    fontWeight: 500,
                    transition: "all 0.2s ease",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--foreground)";
                    e.currentTarget.style.backgroundColor = "var(--line-fill-accent)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--line-stroke-accent)";
                    e.currentTarget.style.backgroundColor = "var(--line-fill)";
                  }}
                >
                  <span
                    style={{
                      fontSize: "9px",
                      fontWeight: 700,
                      opacity: 0.8,
                      padding: "1px 4px",
                      borderRadius: "2px",
                      border: "1px solid var(--line-stroke)",
                      backgroundColor: "var(--background)",
                    }}
                  >
                    {skill.icon}
                  </span>
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── CAD GITHUB CONTRIBUTION MATRIX ── */
function CadGithubChart() {
  const [weeks, setWeeks] = useState<{ date: string; count: number; level: number }[][]>([]);
  const [totalContributions, setTotalContributions] = useState<number | null>(null);
  const [monthLabels, setMonthLabels] = useState<{ label: string; x: number }[]>([]);

  useEffect(() => {
    // Fetch live contribution data from our GraphQL API proxy
    fetch("/api/github-contributions")
      .then((res) => res.json())
      .then((payload) => {
        if (payload?.data?.user?.contributionsCollection?.contributionCalendar) {
          const calendar = payload.data.user.contributionsCollection.contributionCalendar;
          setTotalContributions(calendar.totalContributions);

          const gridWeeks: { date: string; count: number; level: number }[][] = [];
          const months: { label: string; x: number }[] = [];
          const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
          let lastMonth = -1;

          calendar.weeks.forEach((week: any, wIndex: number) => {
            // Initialize a 7-day week (Sunday to Saturday) with empty cells
            const currentW: { date: string; count: number; level: number }[] = Array(7).fill({ date: "", count: 0, level: 0 });

            week.contributionDays.forEach((day: any) => {
              // Parse date as local timezone to avoid off-by-one errors with UTC
              const parts = day.date.split("-");
              const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
              const dayOfWeek = d.getDay();

              // Calculate intensity level based on commit counts (GitHub standard tiers)
              let level = 0;
              if (day.contributionCount === 0) level = 0;
              else if (day.contributionCount <= 2) level = 1;
              else if (day.contributionCount <= 5) level = 2;
              else if (day.contributionCount <= 9) level = 3;
              else level = 4;

              currentW[dayOfWeek] = { date: day.date, count: day.contributionCount, level };

              // Month labels at the first Sunday of a new month
              if (dayOfWeek === 0) {
                const m = d.getMonth();
                if (m !== lastMonth) {
                  months.push({ label: monthNames[m], x: 30 + wIndex * 13 });
                  lastMonth = m;
                }
              }
            });

            gridWeeks.push(currentW);
          });

          setWeeks(gridWeeks);
          setMonthLabels(months);
        } else if (payload.error) {
          console.error("GitHub API Error:", payload.error);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch GitHub contributions:", err);
      });
  }, []);

  return (
    <div
      style={{
        marginTop: "16px",
        border: "1px solid var(--line-stroke-accent)",
        backgroundColor: "var(--line-fill)",
        position: "relative",
        fontSize: "12px",
        fontFamily: "var(--font-geist-mono)",
      }}
    >
      {/* SVG Pencil Hatching Pattern Definitions */}
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          {/* Level 1: Light Diagonal Lines /// */}
          <pattern id="cad-hatch-1" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="4" stroke="var(--foreground)" strokeWidth="1" opacity="0.6" />
          </pattern>

          {/* Level 2: Dense Diagonal Lines /// */}
          <pattern id="cad-hatch-2" width="2.5" height="2.5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="2.5" stroke="var(--foreground)" strokeWidth="1.1" opacity="0.8" />
          </pattern>

          {/* Level 3: Cross Hatching XXX */}
          <pattern id="cad-hatch-3" width="3.5" height="3.5" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="3.5" y2="3.5" stroke="var(--foreground)" strokeWidth="1.1" opacity="0.9" />
            <line x1="3.5" y1="0" x2="0" y2="3.5" stroke="var(--foreground)" strokeWidth="1.1" opacity="0.9" />
          </pattern>

          {/* Level 4: Heavy Solid Hatch Fill █ */}
          <pattern id="cad-hatch-4" width="2.5" height="2.5" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="2.5" y2="2.5" stroke="var(--foreground)" strokeWidth="1.3" opacity="1" />
            <line x1="2.5" y1="0" x2="0" y2="2.5" stroke="var(--foreground)" strokeWidth="1.3" opacity="1" />
            <line x1="0" y1="1.25" x2="2.5" y2="1.25" stroke="var(--foreground)" strokeWidth="1" opacity="1" />
          </pattern>
        </defs>
      </svg>

      {/* CAD Corner Crosshairs */}
      <div style={{ position: "absolute", top: "-6px", left: "-6px", color: "var(--line-stroke-accent)", fontSize: "10px", lineHeight: "1" }}>+</div>
      <div style={{ position: "absolute", top: "-6px", right: "-6px", color: "var(--line-stroke-accent)", fontSize: "10px", lineHeight: "1" }}>+</div>
      <div style={{ position: "absolute", bottom: "-6px", left: "-6px", color: "var(--line-stroke-accent)", fontSize: "10px", lineHeight: "1" }}>+</div>
      <div style={{ position: "absolute", bottom: "-6px", right: "-6px", color: "var(--line-stroke-accent)", fontSize: "10px", lineHeight: "1" }}>+</div>

      {/* Header Bar */}
      <div
        style={{
          borderBottom: "1px solid var(--line-stroke-accent)",
          padding: "8px 14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "var(--line-fill-accent)",
          fontSize: "10px",
          letterSpacing: "0.1em",
          color: "var(--nav-link-hover)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ width: "6px", height: "6px", backgroundColor: "#22c55e", borderRadius: "50%", display: "inline-block" }} />
          <span>GITHUB_METRICS // PENCIL_HATCHING_MATRIX</span>
        </div>
        <span>USER: @360Parminder</span>
      </div>

      {/* Main Vector SVG Grid Container */}
      <div style={{ padding: "16px 14px", overflowX: "auto" }}>
        <div style={{ minWidth: "700px" }}>
          <svg width="100%" height="130" viewBox={`0 0 ${30 + weeks.length * 13} 130`} style={{ overflow: "visible" }}>
            {/* Dynamic Month Labels */}
            {monthLabels.map((m, i) => (
              <text
                key={`${m.label}-${i}`}
                x={m.x}
                y="14"
                fill="var(--foreground)"
                fontSize="10"
                fontFamily="var(--font-geist-mono)"
                opacity="0.8"
              >
                {m.label}
              </text>
            ))}

            {/* Day Labels */}
            <text x="0" y="38" fill="var(--foreground)" fontSize="9" fontFamily="var(--font-geist-mono)" opacity="0.7">Mon</text>
            <text x="0" y="64" fill="var(--foreground)" fontSize="9" fontFamily="var(--font-geist-mono)" opacity="0.7">Wed</text>
            <text x="0" y="90" fill="var(--foreground)" fontSize="9" fontFamily="var(--font-geist-mono)" opacity="0.7">Fri</text>

            {/* 53 Weeks x 7 Days Tiles Grid (Sunday=row0, Saturday=row6) */}
            <g transform="translate(30, 24)">
              {weeks.map((week, wIndex) => (
                <g key={wIndex} transform={`translate(${wIndex * 13}, 0)`}>
                  {week.map((day, dIndex) => {
                    let fillStyle = "none";
                    if (day.level === 1) fillStyle = "url(#cad-hatch-1)";
                    else if (day.level === 2) fillStyle = "url(#cad-hatch-2)";
                    else if (day.level === 3) fillStyle = "url(#cad-hatch-3)";
                    else if (day.level === 4) fillStyle = "url(#cad-hatch-4)";

                    return (
                      <rect
                        key={dIndex}
                        x="0"
                        y={dIndex * 13}
                        width="10"
                        height="10"
                        rx="1"
                        fill={fillStyle}
                        stroke="var(--line-stroke-accent)"
                        strokeWidth="1"
                      >
                        <title>{`${day.date}: ${day.level === 0 ? "No activity" : day.level === 1 ? "Low activity" : day.level === 2 ? "Moderate activity" : day.level === 3 ? "High activity" : "Intense activity"}`}</title>
                      </rect>
                    );
                  })}
                </g>
              ))}
            </g>
          </svg>
        </div>

        {/* CAD Legend & Metadata Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "9px",
            color: "var(--nav-link-hover)",
            letterSpacing: "0.05em",
            paddingTop: "8px",
            borderTop: "1px dashed var(--line-stroke)",
          }}
        >
          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <span>CAD HATCHING SPECIFICATION</span>
            <span>•</span>
            <span>TOTAL: {totalContributions !== null ? `${totalContributions} COMMITS` : "365 DAYS SYNCED"}</span>
          </div>
          <span>GRID: 52_WEEKS x 7_DAYS</span>
        </div>

        {/* CAD Hatching Symbol Legend & Spec Callouts */}
        <div
          style={{
            marginTop: "10px",
            borderTop: "1px dashed var(--line-stroke)",
            paddingTop: "10px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(125px, 1fr))",
            gap: "8px",
          }}
        >
          {/* Level 0 */}
          <div style={{ border: "1px solid var(--line-stroke)", padding: "6px 8px", borderRadius: "3px", backgroundColor: "var(--background)", display: "flex", alignItems: "center", gap: "8px" }}>
            <svg width="14" height="14">
              <rect width="14" height="14" rx="2" fill="none" stroke="var(--foreground)" strokeWidth="1" opacity="0.4" />
            </svg>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "8px", color: "var(--nav-link)", letterSpacing: "0.05em" }}>LVL_0 // INACTIVE</span>
              <span style={{ fontSize: "10px", fontWeight: 600, color: "var(--foreground)" }}>0 Commits</span>
            </div>
          </div>

          {/* Level 1 */}
          <div style={{ border: "1px solid var(--line-stroke)", padding: "6px 8px", borderRadius: "3px", backgroundColor: "var(--background)", display: "flex", alignItems: "center", gap: "8px" }}>
            <svg width="14" height="14">
              <rect width="14" height="14" rx="2" fill="url(#cad-hatch-1)" stroke="var(--foreground)" strokeWidth="1" />
            </svg>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "8px", color: "var(--nav-link)", letterSpacing: "0.05em" }}>LVL_1 // LIGHT (///)</span>
              <span style={{ fontSize: "10px", fontWeight: 600, color: "var(--foreground)" }}>1 - 2 Commits</span>
            </div>
          </div>

          {/* Level 2 */}
          <div style={{ border: "1px solid var(--line-stroke)", padding: "6px 8px", borderRadius: "3px", backgroundColor: "var(--background)", display: "flex", alignItems: "center", gap: "8px" }}>
            <svg width="14" height="14">
              <rect width="14" height="14" rx="2" fill="url(#cad-hatch-2)" stroke="var(--foreground)" strokeWidth="1" />
            </svg>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "8px", color: "var(--nav-link)", letterSpacing: "0.05em" }}>LVL_2 // MEDIUM (///)</span>
              <span style={{ fontSize: "10px", fontWeight: 600, color: "var(--foreground)" }}>3 - 5 Commits</span>
            </div>
          </div>

          {/* Level 3 */}
          <div style={{ border: "1px solid var(--line-stroke)", padding: "6px 8px", borderRadius: "3px", backgroundColor: "var(--background)", display: "flex", alignItems: "center", gap: "8px" }}>
            <svg width="14" height="14">
              <rect width="14" height="14" rx="2" fill="url(#cad-hatch-3)" stroke="var(--foreground)" strokeWidth="1" />
            </svg>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "8px", color: "var(--nav-link)", letterSpacing: "0.05em" }}>LVL_3 // CROSS (XXX)</span>
              <span style={{ fontSize: "10px", fontWeight: 600, color: "var(--foreground)" }}>6 - 9 Commits</span>
            </div>
          </div>

          {/* Level 4 */}
          <div style={{ border: "1px solid var(--line-stroke)", padding: "6px 8px", borderRadius: "3px", backgroundColor: "var(--background)", display: "flex", alignItems: "center", gap: "8px" }}>
            <svg width="14" height="14">
              <rect width="14" height="14" rx="2" fill="url(#cad-hatch-4)" stroke="var(--foreground)" strokeWidth="1" opacity="0.9" />
            </svg>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "8px", color: "var(--nav-link)", letterSpacing: "0.08em" }}>LVL_4 // DENSE (≡≡≡)</span>
              <span style={{ fontSize: "10px", fontWeight: 600, color: "var(--foreground)" }}>10+ Commits</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <main style={{ display: "contents" }}>

      {/* ── HERO SECTION ──
          Placed in gridRow: 1 (above the top horizontal band).
          Padding top is 60px to clear the fixed navbar.
      */}
      <section
        className={clsx("relative", "flex", "flex-col")}
        style={{
          gridColumn: "2",
          gridRow: "1",
          paddingTop: "60px",
          borderBottom: "1px solid var(--line-stroke)",
        }}
      >
        {/* Hero image — flush to left and right edges of the content column */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "260px",
            overflow: "hidden",
          }}
        >
          <Image
            src="/hero-art.jpg"
            alt="Hero artwork"
            fill
            style={{ objectFit: "cover", objectPosition: "center 30%" }}
            priority
          />
          {/* Subtle gradient fade at the bottom */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, transparent 60%, var(--background) 100%)",
            }}
          />
          {/* FIG label */}
          <span
            style={{
              position: "absolute",
              bottom: "8px",
              right: "12px",
              fontSize: "9px",
              fontFamily: "var(--font-geist-mono)",
              color: "var(--line-stroke-accent)",
              letterSpacing: "0.1em",
            }}
          >
            FIG_001
          </span>
        </div>

        {/* Profile Image Placeholder */}
        <div
          style={{
            position: "absolute",
            bottom: "0",
            left: "10px",
            transform: "translateY(50%)",
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            border: "1px dashed var(--line-stroke-accent)",
            backgroundColor: "var(--background)",
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* CAD-style rotating role label */}
          <div
            style={{
              position: "absolute",
              top: "-55px",
              left: "-240px",
              width: "260px",
              height: "90px",
              pointerEvents: "none",
              zIndex: 20,
            }}
          >
            <style>{`
              @keyframes cad-ticker {
                0%, 22% { transform: translateY(0); }
                33%, 55% { transform: translateY(-28px); }
                66%, 88% { transform: translateY(-56px); }
                100% { transform: translateY(-84px); }
              }
            `}</style>
            <svg width="100%" height="100%" style={{ overflow: "visible" }}>
              <circle cx="258" cy="73" r="2" fill="var(--line-stroke-accent)" />
              <path
                d="M 258,73 L 225,40 L 0,40"
                fill="none"
                stroke="var(--line-stroke-accent)"
                strokeWidth="1"
              />
            </svg>
            <div
              style={{
                position: "absolute",
                top: "10px",
                left: "0px",
                width: "220px",
                height: "28px",
                overflow: "hidden",
                color: "var(--foreground)",
                whiteSpace: "nowrap",
              }}
            >
              <div
                className={caveat.className}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  animation: "cad-ticker 8s infinite cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                <div style={{ height: "28px", display: "flex", alignItems: "center", fontSize: "24px" }}>Design Engineer</div>
                <div style={{ height: "28px", display: "flex", alignItems: "center", fontSize: "24px" }}>Open Source Contributor</div>
                <div style={{ height: "28px", display: "flex", alignItems: "center", fontSize: "24px" }}>Small details matter</div>
                <div style={{ height: "28px", display: "flex", alignItems: "center", fontSize: "24px" }}>Design Engineer</div>
              </div>
            </div>
          </div>

          {/* CAD Height Dimension */}
          <div
            style={{
              position: "absolute",
              top: "0",
              left: "-25px",
              width: "20px",
              height: "120px",
              pointerEvents: "none",
            }}
          >
            <svg width="100%" height="100%" style={{ overflow: "visible" }}>
              <line x1="25" y1="0" x2="5" y2="0" stroke="var(--line-stroke-accent)" strokeWidth="1" />
              <line x1="25" y1="120" x2="5" y2="120" stroke="var(--line-stroke-accent)" strokeWidth="1" />
              <line x1="10" y1="0" x2="10" y2="120" stroke="var(--line-stroke-accent)" strokeWidth="1" />
              <polygon points="10,0 7,5 13,5" fill="var(--line-stroke-accent)" />
              <polygon points="10,120 7,115 13,115" fill="var(--line-stroke-accent)" />
            </svg>
            <span
              style={{
                position: "absolute",
                top: "50%",
                left: "10px",
                transform: "translate(-50%, -50%) rotate(-90deg)",
                fontSize: "10px",
                fontFamily: "var(--font-geist-mono)",
                color: "var(--line-stroke-accent)",
                backgroundColor: "var(--background)",
                padding: "0 4px",
              }}
            >
              120
            </span>
          </div>

          {/* CAD Width Dimension */}
          <div
            style={{
              position: "absolute",
              bottom: "-25px",
              left: "0",
              width: "120px",
              height: "20px",
              pointerEvents: "none",
            }}
          >
            <svg width="100%" height="100%" style={{ overflow: "visible" }}>
              <line x1="0" y1="-5" x2="0" y2="15" stroke="var(--line-stroke-accent)" strokeWidth="1" />
              <line x1="120" y1="-5" x2="120" y2="15" stroke="var(--line-stroke-accent)" strokeWidth="1" />
              <line x1="0" y1="10" x2="120" y2="10" stroke="var(--line-stroke-accent)" strokeWidth="1" />
              <polygon points="0,10 5,7 5,13" fill="var(--line-stroke-accent)" />
              <polygon points="120,10 115,7 115,13" fill="var(--line-stroke-accent)" />
            </svg>
            <span
              style={{
                position: "absolute",
                top: "10px",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: "10px",
                fontFamily: "var(--font-geist-mono)",
                color: "var(--line-stroke-accent)",
                backgroundColor: "var(--background)",
                padding: "0 4px",
              }}
            >
              120
            </span>
          </div>

          {/* CAD-style label with handwritten name */}
          <div
            style={{
              position: "absolute",
              top: "0px",
              left: "105px",
              width: "270px",
              height: "80px",
              pointerEvents: "none",
              zIndex: 20,
            }}
          >
            <svg width="100%" height="100%" style={{ overflow: "visible" }}>
              <path
                d="M 0,60 L 30,30 L 270,30"
                fill="none"
                stroke="var(--line-stroke-accent)"
                strokeWidth="1"
              />
              <circle cx="0" cy="60" r="2" fill="var(--line-stroke-accent)" />
            </svg>
            <span
              className={caveat.className}
              style={{
                position: "absolute",
                bottom: "52px",
                left: "35px",
                fontSize: "32px",
                color: "var(--foreground)",
                whiteSpace: "nowrap",
                lineHeight: "1",
              }}
            >
              Parminder Singh
            </span>
          </div>

          {/* CAD-style label for Age */}
          <div
            style={{
              position: "absolute",
              bottom: "-25px",
              left: "-140px",
              width: "150px",
              height: "70px",
              pointerEvents: "none",
              zIndex: 20,
            }}
          >
            <svg width="100%" height="100%" style={{ overflow: "visible" }}>
              <path
                d="M 140,15 L 85,55 L 0,55"
                fill="none"
                stroke="var(--line-stroke-accent)"
                strokeWidth="1"
              />
              <circle cx="140" cy="15" r="2" fill="var(--line-stroke-accent)" />
            </svg>
            <span
              className={caveat.className}
              style={{
                position: "absolute",
                bottom: "18px",
                left: "8px",
                fontSize: "28px",
                color: "var(--foreground)",
                whiteSpace: "nowrap",
                lineHeight: "1",
              }}
            >
              24
            </span>
          </div>

          {/* Inner solid border to make it look like a technical target */}
          <div
            className={clsx("relative", "overflow-hidden")}
            style={{
              width: "104px",
              height: "104px",
              borderRadius: "50%",
              border: "1px solid var(--line-stroke)",
            }}
          >
            <Image
              src="/profile.jpg"
              alt="Hero artwork"
              fill
              style={{ objectFit: "cover", objectPosition: "center 30%" }}
              priority
            />

          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ──
          Placed in gridRow: 5 (below the top horizontal band).
      */}
      <div style={{ gridColumn: "2", gridRow: "5", padding: "0 20px" }}>
        {/* CAD SPECIFICATION TITLE BLOCK (Placed under the profile picture) */}
        <section style={{ paddingTop: "75px", paddingBottom: "40px" }}>
          <div
            style={{
              border: "1px solid var(--line-stroke-accent)",
              backgroundColor: "var(--line-fill)",
              position: "relative",
              fontSize: "12px",
              fontFamily: "var(--font-geist-mono)",
            }}
          >
            {/* CAD Corner Crosshairs */}
            <div style={{ position: "absolute", top: "-6px", left: "-6px", color: "var(--line-stroke-accent)", fontSize: "10px", lineHeight: "1" }}>+</div>
            <div style={{ position: "absolute", top: "-6px", right: "-6px", color: "var(--line-stroke-accent)", fontSize: "10px", lineHeight: "1" }}>+</div>
            <div style={{ position: "absolute", bottom: "-6px", left: "-6px", color: "var(--line-stroke-accent)", fontSize: "10px", lineHeight: "1" }}>+</div>
            <div style={{ position: "absolute", bottom: "-6px", right: "-6px", color: "var(--line-stroke-accent)", fontSize: "10px", lineHeight: "1" }}>+</div>

            {/* Header Bar */}
            <div
              style={{
                borderBottom: "1px solid var(--line-stroke-accent)",
                padding: "8px 14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "var(--line-fill-accent)",
                fontSize: "10px",
                letterSpacing: "0.1em",
                color: "var(--nav-link-hover)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ width: "6px", height: "6px", backgroundColor: "#22c55e", borderRadius: "50%", display: "inline-block" }} />
                <span>SPEC_DATA // PERSONAL_METADATA_CARD</span>
              </div>
              <span>REV_01 // SHEET 1 OF 1</span>
            </div>

            {/* Grid Table of Data Fields */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "0px",
              }}
            >
              {/* Item 1: Role */}
              <div
                style={{
                  borderRight: "1px solid var(--line-stroke)",
                  borderBottom: "1px solid var(--line-stroke)",
                  padding: "12px 14px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                }}
              >
                <div style={{ fontSize: "9px", color: "var(--nav-link)", letterSpacing: "0.08em" }}>
                  01 // DESIGNATION
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--foreground)", fontWeight: 500 }}>
                  <BriefcaseIcon />
                  <span>Founder @ Kosh</span>
                </div>
              </div>

              {/* Item 2: Location */}
              <div
                style={{
                  borderRight: "1px solid var(--line-stroke)",
                  borderBottom: "1px solid var(--line-stroke)",
                  padding: "12px 14px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                }}
              >
                <div style={{ fontSize: "9px", color: "var(--nav-link)", letterSpacing: "0.08em" }}>
                  02 // LOCATION
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--foreground)", fontWeight: 500 }}>
                  <MapPinIcon />
                  <span>Rajasthan, India 🇮🇳</span>
                </div>
              </div>

              {/* Item 3: Current Location Time & Comparison */}
              <div
                style={{
                  borderRight: "1px solid var(--line-stroke)",
                  borderBottom: "1px solid var(--line-stroke)",
                  padding: "12px 14px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                }}
              >
                <div style={{ fontSize: "9px", color: "var(--nav-link)", letterSpacing: "0.08em" }}>
                  03 // LOCATION TIME (LIVE SYNC)
                </div>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", color: "var(--foreground)" }}>
                  <ClockIcon style={{ marginTop: "2px" }} />
                  <CadTimeTracker />
                </div>
              </div>

              {/* Item 4: Pronouns */}
              <div
                style={{
                  borderRight: "1px solid var(--line-stroke)",
                  borderBottom: "1px solid var(--line-stroke)",
                  padding: "12px 14px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                }}
              >
                <div style={{ fontSize: "9px", color: "var(--nav-link)", letterSpacing: "0.08em" }}>
                  04 // PRONOUNS
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--foreground)", fontWeight: 500 }}>
                  <UserBadgeIcon />
                  <span>he / him</span>
                </div>
              </div>

              {/* Item 5: Phone */}
              <div
                style={{
                  borderRight: "1px solid var(--line-stroke)",
                  borderBottom: "1px solid var(--line-stroke)",
                  padding: "12px 14px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                }}
              >
                <div style={{ fontSize: "9px", color: "var(--nav-link)", letterSpacing: "0.08em" }}>
                  05 // TELEPHONE
                </div>
                <a
                  href="tel:+919461486865"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    color: "var(--foreground)",
                    fontWeight: 500,
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = "var(--nav-link-hover)"}
                  onMouseLeave={(e) => e.currentTarget.style.color = "var(--foreground)"}
                >
                  <PhoneIcon />
                  <span>+91 94614 86865</span>
                </a>
              </div>

              {/* Item 6: Email */}
              <div
                style={{
                  borderRight: "1px solid var(--line-stroke)",
                  borderBottom: "1px solid var(--line-stroke)",
                  padding: "12px 14px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                }}
              >
                <div style={{ fontSize: "9px", color: "var(--nav-link)", letterSpacing: "0.08em" }}>
                  06 // EMAIL_COMM
                </div>
                <a
                  href="mailto:360.parimnder@gmail.com"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    color: "var(--foreground)",
                    fontWeight: 500,
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = "var(--nav-link-hover)"}
                  onMouseLeave={(e) => e.currentTarget.style.color = "var(--foreground)"}
                >
                  <MailIcon />
                  <span>360.parimnder@gmail.com</span>
                </a>
              </div>

              {/* Item 7: Website */}
              <div
                style={{
                  borderRight: "1px solid var(--line-stroke)",
                  borderBottom: "1px solid var(--line-stroke)",
                  padding: "12px 14px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                }}
              >
                <div style={{ fontSize: "9px", color: "var(--nav-link)", letterSpacing: "0.08em" }}>
                  07 // WEB_DOMAIN
                </div>
                <a
                  href="https://parminder.pro"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    color: "var(--foreground)",
                    fontWeight: 500,
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = "var(--nav-link-hover)"}
                  onMouseLeave={(e) => e.currentTarget.style.color = "var(--foreground)"}
                >
                  <GlobeIcon />
                  <span>parminder.pro</span>
                </a>
              </div>
            </div>
          </div>

          {/* CAD SOCIAL LINKS BAR (Single Horizontal Line) */}
          <div
            style={{
              marginTop: "16px",
              border: "1px solid var(--line-stroke-accent)",
              backgroundColor: "var(--line-fill)",
              padding: "10px 14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "12px",
              fontSize: "11px",
              fontFamily: "var(--font-geist-mono)",
            }}
          >
            {/* Left Label */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--nav-link)", fontSize: "10px", letterSpacing: "0.08em" }}>
              <span style={{ color: "var(--line-stroke-accent)" }}>[+]</span>
              <span>SOCIAL_NODES // CONNECT</span>
            </div>

            {/* Single Line Social Buttons */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                flexWrap: "wrap",
              }}
            >
              {/* X */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "5px 10px",
                  border: "1px solid var(--line-stroke)",
                  backgroundColor: "var(--background)",
                  color: "var(--foreground)",
                  textDecoration: "none",
                  fontSize: "11px",
                  borderRadius: "4px",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--line-stroke-accent)";
                  e.currentTarget.style.backgroundColor = "var(--line-fill-accent)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--line-stroke)";
                  e.currentTarget.style.backgroundColor = "var(--background)";
                }}
              >
                <XIcon />
                <span>X</span>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "5px 10px",
                  border: "1px solid var(--line-stroke)",
                  backgroundColor: "var(--background)",
                  color: "var(--foreground)",
                  textDecoration: "none",
                  fontSize: "11px",
                  borderRadius: "4px",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--line-stroke-accent)";
                  e.currentTarget.style.backgroundColor = "var(--line-fill-accent)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--line-stroke)";
                  e.currentTarget.style.backgroundColor = "var(--background)";
                }}
              >
                <GithubSocialIcon />
                <span>GitHub</span>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "5px 10px",
                  border: "1px solid var(--line-stroke)",
                  backgroundColor: "var(--background)",
                  color: "var(--foreground)",
                  textDecoration: "none",
                  fontSize: "11px",
                  borderRadius: "4px",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--line-stroke-accent)";
                  e.currentTarget.style.backgroundColor = "var(--line-fill-accent)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--line-stroke)";
                  e.currentTarget.style.backgroundColor = "var(--background)";
                }}
              >
                <LinkedinIcon />
                <span>LinkedIn</span>
              </a>

              {/* daily.dev */}
              <a
                href="https://daily.dev"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "5px 10px",
                  border: "1px solid var(--line-stroke)",
                  backgroundColor: "var(--background)",
                  color: "var(--foreground)",
                  textDecoration: "none",
                  fontSize: "11px",
                  borderRadius: "4px",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--line-stroke-accent)";
                  e.currentTarget.style.backgroundColor = "var(--line-fill-accent)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--line-stroke)";
                  e.currentTarget.style.backgroundColor = "var(--background)";
                }}
              >
                <DailyDevIcon />
                <span>daily.dev</span>
              </a>

              {/* Discord */}
              <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "5px 10px",
                  border: "1px solid var(--line-stroke)",
                  backgroundColor: "var(--background)",
                  color: "var(--foreground)",
                  textDecoration: "none",
                  fontSize: "11px",
                  borderRadius: "4px",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--line-stroke-accent)";
                  e.currentTarget.style.backgroundColor = "var(--line-fill-accent)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--line-stroke)";
                  e.currentTarget.style.backgroundColor = "var(--background)";
                }}
              >
                <DiscordIcon />
                <span>Discord</span>
              </a>

              {/* Medium */}
              <a
                href="https://medium.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "5px 10px",
                  border: "1px solid var(--line-stroke)",
                  backgroundColor: "var(--background)",
                  color: "var(--foreground)",
                  textDecoration: "none",
                  fontSize: "11px",
                  borderRadius: "4px",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--line-stroke-accent)";
                  e.currentTarget.style.backgroundColor = "var(--line-fill-accent)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--line-stroke)";
                  e.currentTarget.style.backgroundColor = "var(--background)";
                }}
              >
                <MediumIcon />
                <span>Medium</span>
              </a>
            </div>
          </div>

          {/* CAD GITHUB CONTRIBUTION CHART */}
          <CadGithubChart />

          {/* CAD TECH STACK SPECIFICATION MATRIX */}
          <CadTechStack />
        </section>
      </div>

    </main>
  );
}