"use client";

import { useState } from "react";
import Link from "next/link";
import { blogPosts, getCategoryColor } from "./data";

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [...new Set(blogPosts.map((p) => p.category))];

  const filteredPosts = selectedCategory
    ? blogPosts.filter((p) => p.category === selectedCategory)
    : blogPosts;

  return (
    <main
      style={{
        gridColumn: "2",
        gridRow: "5",
        padding: "80px 24px 60px",
        fontFamily: "var(--font-geist-mono)",
      }}
    >
      {/* Page Header */}
      <div
        style={{
          marginBottom: "32px",
        }}
      >
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
            style={{
              color: "var(--nav-link)",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--nav-link-hover)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--nav-link)")
            }
          >
            HOME
          </Link>
          <span style={{ opacity: 0.5 }}>/</span>
          <span style={{ color: "var(--foreground)" }}>BLOG</span>
        </div>

        {/* Title */}
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
              SECTION_03 // ENGINEERING_LOG
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
              Blog
            </h1>
          </div>
          <span
            style={{
              fontSize: "10px",
              color: "var(--nav-link)",
              letterSpacing: "0.05em",
              padding: "4px 8px",
              border: "1px dashed var(--line-stroke)",
            }}
          >
            TOTAL: {filteredPosts.length}_ENTRIES
          </span>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          marginBottom: "24px",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() => setSelectedCategory(null)}
          style={{
            padding: "5px 12px",
            fontSize: "10px",
            letterSpacing: "0.08em",
            border: `1px solid ${!selectedCategory ? "var(--foreground)" : "var(--line-stroke-accent)"}`,
            borderRadius: "3px",
            backgroundColor: !selectedCategory
              ? "var(--line-fill-accent)"
              : "var(--background)",
            color: !selectedCategory
              ? "var(--foreground)"
              : "var(--nav-link)",
            cursor: "pointer",
            fontFamily: "var(--font-geist-mono)",
            transition: "all 0.2s",
          }}
        >
          ALL
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: "5px 12px",
              fontSize: "10px",
              letterSpacing: "0.08em",
              border: `1px solid ${selectedCategory === cat ? getCategoryColor(cat) : "var(--line-stroke-accent)"}`,
              borderRadius: "3px",
              backgroundColor:
                selectedCategory === cat
                  ? "var(--line-fill-accent)"
                  : "var(--background)",
              color:
                selectedCategory === cat
                  ? getCategoryColor(cat)
                  : "var(--nav-link)",
              cursor: "pointer",
              fontFamily: "var(--font-geist-mono)",
              transition: "all 0.2s",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Blog Posts Container */}
      <div
        style={{
          border: "1px solid var(--line-stroke-accent)",
          backgroundColor: "var(--line-fill)",
          position: "relative",
          fontSize: "12px",
        }}
      >
        {/* CAD Corner Crosshairs */}
        <div
          style={{
            position: "absolute",
            top: "-6px",
            left: "-6px",
            color: "var(--line-stroke-accent)",
            fontSize: "10px",
            lineHeight: "1",
          }}
        >
          +
        </div>
        <div
          style={{
            position: "absolute",
            top: "-6px",
            right: "-6px",
            color: "var(--line-stroke-accent)",
            fontSize: "10px",
            lineHeight: "1",
          }}
        >
          +
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "-6px",
            left: "-6px",
            color: "var(--line-stroke-accent)",
            fontSize: "10px",
            lineHeight: "1",
          }}
        >
          +
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "-6px",
            right: "-6px",
            color: "var(--line-stroke-accent)",
            fontSize: "10px",
            lineHeight: "1",
          }}
        >
          +
        </div>

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
          <div
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                backgroundColor: "#10b981",
                borderRadius: "50%",
                display: "inline-block",
              }}
            />
            <span>SPEC_DATA // BLOG_ENTRIES</span>
          </div>
          <span>
            {selectedCategory
              ? `FILTER: ${selectedCategory}`
              : "SHOWING: ALL"}
          </span>
        </div>

        {/* Blog Post Entries */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "0",
          }}
        >
          {filteredPosts.length === 0 && (
            <div
              style={{
                padding: "40px",
                textAlign: "center",
                color: "var(--nav-link)",
                fontSize: "11px",
                letterSpacing: "0.05em",
              }}
            >
              NO ENTRIES FOUND FOR FILTER: {selectedCategory}
            </div>
          )}

          {filteredPosts.map((post, index) => {
            const catColor = getCategoryColor(post.category);

            return (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                style={{
                  padding: "16px",
                  borderBottom:
                    index === filteredPosts.length - 1
                      ? "none"
                      : "1px solid var(--line-stroke)",
                  backgroundColor: "var(--background)",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                  textDecoration: "none",
                  transition: "background-color 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--line-fill)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--background)";
                }}
              >
                {/* Category icon */}
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    border: `1px solid ${catColor}`,
                    borderRadius: "6px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    backgroundColor: "var(--line-fill-accent)",
                    marginTop: "2px",
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={catColor}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                  </svg>
                </div>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: "4px" }}>
                  {/* Title row */}
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                    <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--foreground)" }}>
                      {post.title}
                    </span>
                    <span
                      style={{
                        fontSize: "8px",
                        padding: "2px 6px",
                        border: `1px solid ${catColor}`,
                        color: catColor,
                        letterSpacing: "0.08em",
                        borderRadius: "2px",
                      }}
                    >
                      {post.category}
                    </span>
                  </div>

                  {/* Date + read time */}
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "10px", color: "var(--nav-link)" }}>
                    <span>{post.date}</span>
                    <span style={{ opacity: 0.4 }}>·</span>
                    <span>{post.readTime} read</span>
                  </div>

                  {/* Single-line excerpt */}
                  <div
                    style={{
                      fontSize: "10px",
                      color: "var(--nav-link)",
                      lineHeight: "1.4",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      maxWidth: "500px",
                      marginTop: "2px",
                    }}
                  >
                    {post.excerpt}
                  </div>
                </div>

                {/* Arrow */}
                <div
                  style={{
                    flexShrink: 0,
                    color: "var(--nav-link)",
                    marginTop: "8px",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Footer */}
        <div
          style={{
            borderTop: "1px dashed var(--line-stroke)",
            padding: "8px 14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "9px",
            color: "var(--nav-link)",
            letterSpacing: "0.05em",
          }}
        >
          <span>NODE: BLOG // TYPE: ENGINEERING_LOG</span>
          <span>FORMAT: MDX_READY</span>
        </div>
      </div>

      {/* Back to Home Link */}
      <div
        style={{
          marginTop: "32px",
          display: "flex",
          justifyContent: "center",
        }}
      >
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
