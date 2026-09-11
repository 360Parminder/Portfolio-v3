"use client";

import React, { useState, useEffect } from "react";

interface ProjectLogoProps {
  url?: string;
  name: string;
  size?: number;
  shape?: "circle" | "rounded";
  className?: string;
  style?: React.CSSProperties;
}

// Global in-memory cache to avoid duplicate fetches during session
const logoCache = new Map<string, { logoUrl: string; fallbackUrl: string }>();

export function ProjectLogo({
  url,
  name,
  size = 32,
  shape = "rounded",
  className,
  style,
}: ProjectLogoProps) {
  const [logoState, setLogoState] = useState<{
    src: string | null;
    isFallback: boolean;
    hasFailed: boolean;
    loading: boolean;
  }>(() => {
    if (!url) {
      return { src: null, isFallback: false, hasFailed: true, loading: false };
    }
    const cached = logoCache.get(url);
    if (cached) {
      return { src: cached.logoUrl, isFallback: false, hasFailed: false, loading: false };
    }
    return { src: null, isFallback: false, hasFailed: false, loading: true };
  });

  useEffect(() => {
    if (!url) {
      setLogoState({ src: null, isFallback: false, hasFailed: true, loading: false });
      return;
    }

    const cached = logoCache.get(url);
    if (cached) {
      setLogoState({ src: cached.logoUrl, isFallback: false, hasFailed: false, loading: false });
      return;
    }

    let isMounted = true;
    setLogoState((prev) => ({ ...prev, loading: true }));

    fetch(`/api/extract-logo?url=${encodeURIComponent(url)}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        if (!isMounted) return;
        if (data.logoUrl) {
          logoCache.set(url, {
            logoUrl: data.logoUrl,
            fallbackUrl: data.fallbackUrl,
          });
          setLogoState({
            src: data.logoUrl,
            isFallback: false,
            hasFailed: false,
            loading: false,
          });
        } else {
          setLogoState({ src: null, isFallback: false, hasFailed: true, loading: false });
        }
      })
      .catch(() => {
        if (!isMounted) return;
        // Try direct fallback using domain
        try {
          const domain = new URL(url).hostname;
          const fallback = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
          setLogoState({ src: fallback, isFallback: true, hasFailed: false, loading: false });
        } catch {
          setLogoState({ src: null, isFallback: false, hasFailed: true, loading: false });
        }
      });

    return () => {
      isMounted = false;
    };
  }, [url]);

  const handleImageError = () => {
    if (!logoState.isFallback && url) {
      // Try Google favicon as fallback before giving up
      try {
        const domain = new URL(url).hostname;
        const fallback = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
        setLogoState({ src: fallback, isFallback: true, hasFailed: false, loading: false });
        return;
      } catch {
        // Fall through
      }
    }
    setLogoState({ src: null, isFallback: false, hasFailed: true, loading: false });
  };

  const borderRadius = shape === "circle" ? "50%" : "8px";
  const initial = name ? name.charAt(0).toUpperCase() : "?";

  return (
    <div
      className={className}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius,
        border: "1px solid var(--line-stroke-accent)",
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        position: "relative",
        overflow: "hidden",
        fontSize: `${Math.round(size * 0.42)}px`,
        fontWeight: 700,
        fontFamily: "var(--font-geist-mono)",
        userSelect: "none",
        padding: "4px",
        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
        transition: "border-color 0.2s ease, transform 0.2s ease",
        ...style,
      }}
    >
      {logoState.src && !logoState.hasFailed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={logoState.src}
          alt={`${name} logo`}
          onError={handleImageError}
          style={{
            width: "100%",
            height: "100%",
            maxWidth: shape === "circle" ? "78%" : "84%",
            maxHeight: shape === "circle" ? "78%" : "84%",
            objectFit: "contain",
            transition: "opacity 0.2s ease, transform 0.2s ease",
            opacity: logoState.loading ? 0.4 : 1,
            display: "block",
          }}
          loading="lazy"
        />
      ) : (
        <span>{initial}</span>
      )}
    </div>
  );
}
