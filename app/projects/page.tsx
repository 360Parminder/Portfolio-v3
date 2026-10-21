
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { HoverTechTag } from "../components/HoverTechTag";
import { ProjectLogo } from "../components/ProjectLogo";

export default function ProjectsPage() {
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
      {/* Page Header */}
      <div style={{ marginBottom: "32px" }}>
        {/* Breadcrumb */}
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
          <span style={{ color: "var(--foreground)" }}>PROJECTS</span>
        </div>

        {/* Title */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <div style={{ fontSize: "9px", color: "var(--nav-link)", letterSpacing: "0.1em", marginBottom: "6px" }}>
              SECTION_02 // PROFESSIONAL_PORTFOLIO
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
              Projects
            </h1>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <CadProjects />
      </div>

      {/* Back to Home Link */}
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

const projectCardMeta: Record<string, { brandColor: string; bgGradient: string; stars: string }> = {
  Kosh: {
    brandColor: "#2563eb",
    bgGradient: "linear-gradient(135deg, rgba(37, 99, 235, 0.16) 0%, rgba(30, 58, 138, 0.22) 100%)",
    stars: "1.2k",
  },
  Swasthya: {
    brandColor: "#059669",
    bgGradient: "linear-gradient(135deg, rgba(5, 150, 105, 0.16) 0%, rgba(6, 78, 59, 0.22) 100%)",
    stars: "840",
  },
  Rajdoot: {
    brandColor: "#7c3aed",
    bgGradient: "linear-gradient(135deg, rgba(124, 58, 237, 0.16) 0%, rgba(76, 29, 149, 0.22) 100%)",
    stars: "660",
  },
  ZURL: {
    brandColor: "#0284c7",
    bgGradient: "linear-gradient(135deg, rgba(2, 132, 199, 0.16) 0%, rgba(12, 74, 110, 0.22) 100%)",
    stars: "490",
  },
};

/* ── Interactive View Toggle Buttons with Motion ── */
function ListToggleButton({
  isActive,
  onClick,
}: {
  isActive: boolean;
  onClick: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileTap={{ scale: 0.88 }}
      whileHover={{ scale: 1.08 }}
      title="List view"
      aria-label="List view"
      style={{
        background: "transparent",
        border: "none",
        cursor: "pointer",
        padding: "3px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: isActive ? "var(--foreground)" : "var(--nav-link)",
        opacity: isActive ? 1 : 0.45,
        transition: "color 0.2s ease, opacity 0.2s ease",
      }}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        style={{ overflow: "visible" }}
      >
        {/* Top line: slides/contracts in and out */}
        <motion.line
          x1={3}
          y1={6}
          x2={21}
          y2={6}
          animate={
            isHovered
              ? { x1: [3, 9, 3], x2: [21, 15, 21] }
              : { x1: 3, x2: 21 }
          }
          transition={{
            duration: 0.6,
            ease: "easeInOut",
            repeat: isHovered ? Infinity : 0,
            repeatDelay: 0.1,
          }}
        />
        {/* Middle line: slides in and out with stagger */}
        <motion.line
          x1={3}
          y1={12}
          x2={21}
          y2={12}
          animate={
            isHovered
              ? { x1: [3, 1, 3], x2: [21, 17, 21] }
              : { x1: 3, x2: 21 }
          }
          transition={{
            duration: 0.6,
            delay: 0.1,
            ease: "easeInOut",
            repeat: isHovered ? Infinity : 0,
            repeatDelay: 0.1,
          }}
        />
        {/* Bottom line: slides in and out with stagger */}
        <motion.line
          x1={3}
          y1={18}
          x2={21}
          y2={18}
          animate={
            isHovered
              ? { x1: [3, 8, 3], x2: [21, 13, 21] }
              : { x1: 3, x2: 21 }
          }
          transition={{
            duration: 0.6,
            delay: 0.2,
            ease: "easeInOut",
            repeat: isHovered ? Infinity : 0,
            repeatDelay: 0.1,
          }}
        />
      </svg>
    </motion.button>
  );
}

function CardToggleButton({
  isActive,
  onClick,
}: {
  isActive: boolean;
  onClick: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileTap={{ scale: 0.88 }}
      whileHover={{ scale: 1.08 }}
      title="Card view"
      aria-label="Card view"
      style={{
        background: "transparent",
        border: "none",
        cursor: "pointer",
        padding: "3px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: isActive ? "var(--foreground)" : "var(--nav-link)",
        opacity: isActive ? 1 : 0.45,
        transition: "color 0.2s ease, opacity 0.2s ease",
      }}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="currentColor"
        style={{ overflow: "visible" }}
      >
        {/* Top-left square */}
        <motion.rect
          x={3}
          y={3}
          width={7.5}
          height={7.5}
          rx={2.5}
          animate={
            isHovered
              ? { scale: [1, 0.72, 1.08, 1], x: [0, -1.2, 0], y: [0, -1.2, 0] }
              : { scale: 1, x: 0, y: 0 }
          }
          transition={{
            duration: 0.5,
            ease: "easeInOut",
            repeat: isHovered ? Infinity : 0,
            repeatDelay: 0.15,
          }}
        />
        {/* Top-right square */}
        <motion.rect
          x={13.5}
          y={3}
          width={7.5}
          height={7.5}
          rx={2.5}
          animate={
            isHovered
              ? { scale: [1, 0.72, 1.08, 1], x: [0, 1.2, 0], y: [0, -1.2, 0] }
              : { scale: 1, x: 0, y: 0 }
          }
          transition={{
            duration: 0.5,
            delay: 0.08,
            ease: "easeInOut",
            repeat: isHovered ? Infinity : 0,
            repeatDelay: 0.15,
          }}
        />
        {/* Bottom-left square */}
        <motion.rect
          x={3}
          y={13.5}
          width={7.5}
          height={7.5}
          rx={2.5}
          animate={
            isHovered
              ? { scale: [1, 0.72, 1.08, 1], x: [0, -1.2, 0], y: [0, 1.2, 0] }
              : { scale: 1, x: 0, y: 0 }
          }
          transition={{
            duration: 0.5,
            delay: 0.16,
            ease: "easeInOut",
            repeat: isHovered ? Infinity : 0,
            repeatDelay: 0.15,
          }}
        />
        {/* Bottom-right square */}
        <motion.rect
          x={13.5}
          y={13.5}
          width={7.5}
          height={7.5}
          rx={2.5}
          animate={
            isHovered
              ? { scale: [1, 0.72, 1.08, 1], x: [0, 1.2, 0], y: [0, 1.2, 0] }
              : { scale: 1, x: 0, y: 0 }
          }
          transition={{
            duration: 0.5,
            delay: 0.24,
            ease: "easeInOut",
            repeat: isHovered ? Infinity : 0,
            repeatDelay: 0.15,
          }}
        />
      </svg>
    </motion.button>
  );
}

function CadProjectCardItem({
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
  meta: { brandColor: string; bgGradient: string; stars: string };
  index?: number;
}) {
  const [hovered, setHovered] = useState(false);
  const displayDesc = Array.isArray(prj.description) ? prj.description[0] : prj.description;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={{ display: "flex", flexDirection: "column" }}
    >
      {/* Title Bar above card */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "12px",
          padding: "0 2px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <h3
            style={{
              fontSize: "17px",
              fontWeight: 600,
              margin: 0,
              color: "var(--foreground)",
              fontFamily: "var(--font-geist-sans), sans-serif",
              letterSpacing: "-0.01em",
            }}
          >
            {prj.name}
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

      {/* Card Preview Container */}
      <motion.a
        href={prj.link && prj.link !== "#" ? prj.link : undefined}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileHover={{ y: -3 }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        style={{
          position: "relative",
          height: "240px",
          borderRadius: "16px",
          overflow: "hidden",
          border: hovered ? "1px solid var(--foreground)" : "1px solid var(--line-stroke-accent)",
          backgroundColor: "var(--line-fill)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textDecoration: "none",
          boxShadow: hovered ? "0 14px 32px -10px rgba(0,0,0,0.28)" : "none",
          cursor: prj.link ? "pointer" : "default",
        }}
      >
        {/* Blurred ambient background with mockup layers */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: meta.bgGradient,
            overflow: "hidden",
            pointerEvents: "none",
          }}
        >
          {/* Simulated blurred UI canvas */}
          <motion.div
            animate={{
              scale: hovered ? 1.08 : 1,
              opacity: hovered ? 0.75 : 0.6,
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            style={{
              position: "absolute",
              inset: "-20px",
              filter: "blur(18px)",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              padding: "30px",
            }}
          >
            {/* Top faux bar */}
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <div style={{ width: "32px", height: "10px", borderRadius: "5px", background: meta.brandColor, opacity: 0.8 }} />
              <div style={{ width: "60px", height: "8px", borderRadius: "4px", background: "var(--foreground)", opacity: 0.3 }} />
              <div style={{ width: "40px", height: "8px", borderRadius: "4px", background: "var(--foreground)", opacity: 0.2 }} />
            </div>

            {/* Faux content wireframe cards */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "8px" }}>
              <div style={{ height: "65px", borderRadius: "8px", background: "var(--foreground)", opacity: 0.15, border: `1px solid ${meta.brandColor}` }} />
              <div style={{ height: "65px", borderRadius: "8px", background: "var(--foreground)", opacity: 0.12 }} />
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <div style={{ width: "70px", height: "24px", borderRadius: "6px", background: meta.brandColor, opacity: 0.7 }} />
              <div style={{ width: "100px", height: "24px", borderRadius: "6px", background: "var(--foreground)", opacity: 0.2 }} />
            </div>
          </motion.div>

          {/* Radial ambient glow */}
          <motion.div
            animate={{
              scale: hovered ? 1.15 : 1,
              opacity: hovered ? 0.5 : 0.4,
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              background: `radial-gradient(circle, ${meta.brandColor} 0%, transparent 70%)`,
              filter: "blur(25px)",
            }}
          />
        </div>

        {/* Central App Icon Squircle */}
        <motion.div
          animate={{
            scale: hovered ? 1.12 : 1,
          }}
          transition={{ type: "spring", stiffness: 320, damping: 20 }}
          style={{
            position: "relative",
            zIndex: 2,
            width: "64px",
            height: "64px",
            borderRadius: "16px",
            backgroundColor: meta.brandColor,
            boxShadow: hovered
              ? "0 18px 38px -6px rgba(0,0,0,0.5), 0 8px 18px -2px rgba(0,0,0,0.3)"
              : "0 10px 25px -4px rgba(0,0,0,0.3), 0 4px 10px -2px rgba(0,0,0,0.18)",
            border: "1px solid rgba(255, 255, 255, 0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ProjectLogo url={prj.link} name={prj.name} size={42} shape="rounded" />
        </motion.div>

        {/* Subtle Live Badge at top-right of preview */}
        <AnimatePresence>
          {hovered && prj.link && prj.link !== "#" && (
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.9 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                zIndex: 3,
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                backdropFilter: "blur(8px)",
                color: "#ffffff",
                fontSize: "10px",
                fontFamily: "var(--font-geist-mono), monospace",
                padding: "4px 8px",
                borderRadius: "6px",
                letterSpacing: "0.05em",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <span>LIVE</span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.a>

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

function CadProjects() {
  const [expandedId, setExpandedId] = useState<string>("PRJ-01");
  const [viewMode, setViewMode] = useState<"list" | "card">("list");

  const projects = [
    {
      id: "PRJ-01",
      name: "Kosh",
      status: "DEVELOPMENT",
      description: [
        "Engineered a full-stack email platform built entirely from scratch with a custom SMTP server and complete mail processing infrastructure.",
        "Designed a modern client interface featuring both a chat-like experience for next-gen users alongside a classic email layout.",
        "Built automated custom domain provisioning and DNS record verification pipelines for instant tenant onboarding.",
        "Implemented AI-powered smart email filtering, automated thread categorization, and real-time inbox synchronization via Socket.io.",
        "Integrated Razorpay subscription billing, AWS S3 storage for mail attachments, and a PostgreSQL database schema."
      ],
      tech: ["Next.js", "Node.js", "JavaScript", "TypeScript", "Tailwind", "Razorpay", "AWS", "SMTP", "Motion", "Socket.io", "PostgreSQL"],
      link: "https://kosh.uno",
    },
    {
      id: "PRJ-02",
      name: "Swasthya",
      status: "PRODUCTION",
      description: [
        "Developed a cross-platform mobile health monitoring application using React Native for real-time vital tracking and health alerts.",
        "Built family and friend medication tracking features with automated push notification reminders and daily compliance reports.",
        "Engineered hardware IoT integration to sync live biometric data from wearable sensor modules directly to user profiles.",
        "Architected scalable Node.js backend microservices and MongoDB database schemas for encrypted personal health records.",
        "Deployed secure media storage using Cloudinary and automated serverless backend workflows on AWS."
      ],
      tech: ["React Native", "Node.js", "Tailwind", "Motion", "MongoDB", "AWS", "Cloudinary", "IOT"],
      link: "https://swasthya.pro",
    },
    {
      id: "PRJ-03",
      name: "Rajdoot",
      status: "PRODUCTION",
      description: [
        "Architected a developer-first messaging API platform for building custom, high-reliability communication apps with sub-100ms latency.",
        "Designed RESTful and WebSocket API endpoints using Node.js, Express, and MongoDB for high-throughput message routing.",
        "Built an interactive developer dashboard with React, Tailwind CSS, and Framer Motion for API key provisioning and real-time usage metrics.",
        "Implemented hardware IoT integration layer supporting physical triggers via Arduino and webhook events for embedded devices.",
        "Integrated Cloudinary asset pipelines, Razorpay subscription tiers, and AWS cloud deployment for scaling infrastructure."
      ],
      tech: ["React", "Tailwind", "Node.js", "MongoDB", "Razorpay", "AWS", "Cloudinary", "Arduino", "Motion", "Socket.io"],
      link: "https://Rajdoot.wtf",
    },
    {
      id: "PRJ-04",
      name: "ZURL",
      status: "PRODUCTION",
      description: [
        "Created a high-speed URL shortening service with custom link alias creation, password protection, and instant QR code generation.",
        "Implemented comprehensive click analytics tracking geolocation, device breakdown, referrer HTTP headers, and access timestamps.",
        "Designed a sleek dark-mode responsive user interface built with React, Tailwind CSS, and smooth Motion animations.",
        "Architected lightweight Node.js redirect handlers and optimized MongoDB index lookups to achieve sub-50ms URL redirection speeds.",
        "Added custom domain branding support, bulk link management, and customizable link expiration policies."
      ],
      tech: ["React", "Node.js", "Tailwind", "MongoDB", "Motion"],
      link: "https://zurl.parminder.pro",
    },
  ];

  return (
    <div
      id="projects"
      style={{
        marginTop: "24px",
        border: "1px solid var(--line-stroke-accent)",
        backgroundColor: "var(--line-fill)",
        position: "relative",
        fontSize: "12px",
        fontFamily: "var(--font-geist-mono)",
      }}
    >


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
          <span style={{ width: "6px", height: "6px", backgroundColor: "#3b82f6", borderRadius: "50%", display: "inline-block" }} />
          <span>SPEC_DATA // PROJECTS_SCHEMA</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <span className="hidden sm:inline">TOTAL: 0{projects.length}_ACTIVE_NODES</span>

          {/* View Mode Toggle (List vs Card) with Motion animations */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <ListToggleButton
              isActive={viewMode === "list"}
              onClick={() => setViewMode("list")}
            />
            <CardToggleButton
              isActive={viewMode === "card"}
              onClick={() => setViewMode("card")}
            />
          </div>
        </div>
      </div>

      {/* Projects Display: Animated Transition Between List and Card */}
      <AnimatePresence mode="wait">
        {viewMode === "list" ? (
          <motion.div
            key="list-mode"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{ display: "flex", flexDirection: "column" }}
          >
            {projects.map((prj, index) => {
              const isExpanded = expandedId === prj.id;
              const isLast = index === projects.length - 1;

              return (
                <div
                  key={prj.id}
                  style={{
                    borderBottom: isLast ? "none" : "1px solid var(--line-stroke-accent)",
                    backgroundColor: "var(--background)",
                    transition: "background-color 0.2s ease",
                  }}
                >
                  {/* Compact Header Row */}
                  <div
                    style={{
                      padding: "16px 20px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                    onClick={() => setExpandedId(isExpanded ? "" : prj.id)}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                      {/* Project icon */}
                      <ProjectLogo url={prj.link} name={prj.name} size={36} shape="circle" />

                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <span style={{ fontSize: "15px", fontWeight: 700, color: "var(--foreground)" }}>{prj.name}</span>
                          <span
                            style={{
                              fontSize: "9px",
                              padding: "2px 6px",
                              color: prj.status === "PRODUCTION" ? "#3b82f6" : "#f59e0b",
                              letterSpacing: "0.08em",
                              borderRadius: "3px",
                              fontWeight: 600,
                              border: prj.status === "PRODUCTION" ? "1px solid #3b82f6" : "1px solid #f59e0b",
                              borderStyle: "dashed",
                            }}
                          >
                            {prj.status}
                          </span>
                        </div>
                        <span style={{ fontSize: "11px", color: "var(--nav-link)", letterSpacing: "0.05em" }}>{prj.id}</span>
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      {/* Live link */}
                      {prj.link && prj.link !== "#" && (
                        <motion.a
                          href={prj.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            padding: "5px 10px",
                            border: "1px dashed var(--line-stroke-accent)",
                            borderRadius: "4px",
                            color: "var(--foreground)",
                            fontSize: "10px",
                            textDecoration: "none",
                            fontWeight: 600,
                            letterSpacing: "0.05em",
                            transition: "all 0.2s",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = "var(--foreground)";
                            e.currentTarget.style.backgroundColor = "var(--line-fill-accent)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = "var(--line-stroke-accent)";
                            e.currentTarget.style.backgroundColor = "transparent";
                          }}
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                            <polyline points="15 3 21 3 21 9" />
                            <line x1="10" y1="14" x2="21" y2="3" />
                          </svg>
                          <span>LIVE</span>
                        </motion.a>
                      )}

                      {/* Expand/Collapse chevron with Motion rotation */}
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        style={{
                          width: "28px",
                          height: "28px",
                          border: "1px solid var(--line-stroke-accent)",
                          borderRadius: "4px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "var(--foreground)",
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

                  {/* Expandable Details with Motion Auto Height */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        style={{ overflow: "hidden" }}
                      >
                        <div style={{ padding: "0 20px 20px", display: "flex", flexDirection: "column", gap: "20px" }}>
                          {/* Dotted Divider */}
                          <div style={{ borderTop: "1px dotted var(--line-stroke-accent)", margin: "0" }} />

                          {/* Technologies & Tools */}
                          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                            <span style={{ fontSize: "15px", fontWeight: 600, color: "var(--foreground)" }}>Technologies & Tools</span>
                            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                              {prj.tech.map((t) => (
                                <HoverTechTag
                                  key={t}
                                  techName={t}
                                  baseStyle={{
                                    padding: "12px 12px",
                                    backgroundColor: "var(--line-fill-accent)",
                                    border: "1px dashed var(--line-stroke-accent)",
                                    color: "var(--foreground)",
                                    fontSize: "12px",
                                    borderRadius: "6px",
                                    fontWeight: 500,
                                  }}
                                />
                              ))}
                            </div>
                          </div>

                          {/* What I've done (5 Points) */}
                          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "4px" }}>
                            <span style={{ fontSize: "15px", fontWeight: 600, color: "var(--foreground)" }}>What I've done</span>
                            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
                              {(Array.isArray(prj.description) ? prj.description : [prj.description]).map((desc, i) => (
                                <li key={i} style={{ display: "flex", gap: "12px", color: "var(--nav-link-hover)", fontSize: "13px", lineHeight: "1.6" }}>
                                  <span style={{ color: "var(--line-stroke-accent)", marginTop: "1px", fontSize: "10px" }}>▪</span>
                                  <span>{desc}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>
        ) : (
          <motion.div
            key="card-mode"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "36px",
              padding: "24px 20px",
              backgroundColor: "var(--background)",
            }}
          >
            {projects.map((prj, i) => {
              const meta = projectCardMeta[prj.name] || {
                brandColor: "#3b82f6",
                bgGradient: "linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(37, 99, 235, 0.2) 100%)",
                stars: "660",
              };
              return <CadProjectCardItem key={prj.id} prj={prj} meta={meta} index={i} />;
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
