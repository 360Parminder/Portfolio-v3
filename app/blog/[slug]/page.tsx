"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { blogPosts, getCategoryColor } from "../data";

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;

  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <main
        style={{
          gridColumn: "2",
          gridRow: "5",
          padding: "80px 24px 60px",
          fontFamily: "var(--font-geist-mono)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <div
          style={{
            fontSize: "48px",
            fontWeight: 700,
            color: "var(--foreground)",
            fontFamily: "var(--font-geist-sans)",
          }}
        >
          404
        </div>
        <div
          style={{
            fontSize: "12px",
            color: "var(--nav-link)",
            letterSpacing: "0.08em",
          }}
        >
          POST_NOT_FOUND // INVALID_SLUG
        </div>
        <Link
          href="/blog"
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
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--nav-link)";
            e.currentTarget.style.borderColor = "var(--line-stroke-accent)";
          }}
        >
          ← BACK_TO_BLOG
        </Link>
      </main>
    );
  }

  const catColor = getCategoryColor(post.category);

  // Find prev/next posts
  const currentIndex = blogPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  return (
    <main
      style={{
        gridColumn: "2",
        gridRow: "5",
        padding: "80px 24px 60px",
        fontFamily: "var(--font-geist-mono)",
      }}
    >
      {/* Breadcrumb */}
      <div
        style={{
          fontSize: "10px",
          color: "var(--nav-link)",
          letterSpacing: "0.08em",
          marginBottom: "24px",
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
        <Link
          href="/blog"
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
          BLOG
        </Link>
        <span style={{ opacity: 0.5 }}>/</span>
        <span style={{ color: "var(--foreground)" }}>{post.id}</span>
      </div>

      {/* Article Container */}
      <article
        style={{
          border: "1px solid var(--line-stroke-accent)",
          backgroundColor: "var(--line-fill)",
          position: "relative",
          fontSize: "12px",
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
            <span
              style={{
                width: "6px",
                height: "6px",
                backgroundColor: catColor,
                borderRadius: "50%",
                display: "inline-block",
              }}
            />
            <span>{post.id} // {post.category}</span>
          </div>
          <span>{post.status}</span>
        </div>

        {/* Article Header */}
        <div
          style={{
            padding: "32px 24px 24px",
            borderBottom: "1px dashed var(--line-stroke)",
            backgroundColor: "var(--background)",
          }}
        >
          {/* Category + Date meta */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "12px",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontSize: "9px",
                padding: "3px 8px",
                border: `1px solid ${catColor}`,
                color: catColor,
                letterSpacing: "0.08em",
                borderRadius: "2px",
              }}
            >
              {post.category}
            </span>
            <span style={{ fontSize: "10px", color: "var(--nav-link)" }}>
              {post.date}
            </span>
            <span style={{ fontSize: "10px", color: "var(--nav-link)", opacity: 0.4 }}>·</span>
            <span style={{ fontSize: "10px", color: "var(--nav-link)" }}>
              {post.readTime} read
            </span>
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: "26px",
              fontWeight: 700,
              color: "var(--foreground)",
              margin: "0 0 16px",
              lineHeight: "1.3",
              fontFamily: "var(--font-geist-sans)",
              letterSpacing: "-0.02em",
            }}
          >
            {post.title}
          </h1>

          {/* Tags */}
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {post.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  padding: "3px 7px",
                  backgroundColor: "var(--line-fill)",
                  border: "1px solid var(--line-stroke)",
                  color: "var(--foreground)",
                  fontSize: "10px",
                  letterSpacing: "0.05em",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Article Content */}
        <div
          style={{
            padding: "28px 24px 32px",
            backgroundColor: "var(--background)",
          }}
        >
          <div
            style={{
              maxWidth: "720px",
              display: "flex",
              flexDirection: "column",
              gap: "0",
            }}
          >
            {post.content.map((block, i) => {
              // Heading
              if (block.startsWith("## ")) {
                return (
                  <h2
                    key={i}
                    style={{
                      fontSize: "16px",
                      fontWeight: 700,
                      color: "var(--foreground)",
                      margin: "28px 0 12px",
                      fontFamily: "var(--font-geist-sans)",
                      letterSpacing: "-0.01em",
                      paddingBottom: "8px",
                      borderBottom: "1px dashed var(--line-stroke)",
                    }}
                  >
                    {block.replace("## ", "")}
                  </h2>
                );
              }

              // Paragraph (may contain inline \n for lists)
              return (
                <div
                  key={i}
                  style={{
                    fontSize: "13px",
                    lineHeight: "1.8",
                    color: "var(--nav-link-hover)",
                    marginBottom: "16px",
                    fontFamily: "var(--font-geist-sans)",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {block.split("\n").map((line, j) => {
                    const trimmed = line.trim();

                    // Numbered list item
                    if (/^\d+\./.test(trimmed)) {
                      return (
                        <div
                          key={j}
                          style={{
                            paddingLeft: "16px",
                            marginBottom: "4px",
                            display: "flex",
                            gap: "8px",
                          }}
                        >
                          <span style={{ color: "var(--nav-link)", flexShrink: 0 }}>
                            {trimmed.match(/^\d+\./)?.[0]}
                          </span>
                          <span
                            dangerouslySetInnerHTML={{
                              __html: trimmed
                                .replace(/^\d+\.\s*/, "")
                                .replace(
                                  /\*\*(.*?)\*\*/g,
                                  '<strong style="color: var(--foreground); font-weight: 600;">$1</strong>'
                                ),
                            }}
                          />
                        </div>
                      );
                    }

                    // Bullet list item
                    if (trimmed.startsWith("- ")) {
                      return (
                        <div
                          key={j}
                          style={{
                            paddingLeft: "16px",
                            marginBottom: "4px",
                            display: "flex",
                            gap: "8px",
                          }}
                        >
                          <span style={{ color: "var(--nav-link)", flexShrink: 0 }}>—</span>
                          <span
                            dangerouslySetInnerHTML={{
                              __html: trimmed
                                .replace(/^- /, "")
                                .replace(
                                  /\*\*(.*?)\*\*/g,
                                  '<strong style="color: var(--foreground); font-weight: 600;">$1</strong>'
                                ),
                            }}
                          />
                        </div>
                      );
                    }

                    // Regular text
                    if (trimmed === "") return <br key={j} />;
                    return (
                      <span
                        key={j}
                        dangerouslySetInnerHTML={{
                          __html: trimmed.replace(
                            /\*\*(.*?)\*\*/g,
                            '<strong style="color: var(--foreground); font-weight: 600;">$1</strong>'
                          ),
                        }}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Bar */}
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
          <span>NODE: {post.id} // TYPE: ARTICLE</span>
          <span>WORDS: ~{post.content.join(" ").split(/\s+/).length}</span>
        </div>
      </article>

      {/* Prev / Next Navigation */}
      <div
        style={{
          marginTop: "24px",
          display: "grid",
          gridTemplateColumns: prevPost && nextPost ? "1fr 1fr" : "1fr",
          gap: "12px",
        }}
      >
        {prevPost && (
          <Link
            href={`/blog/${prevPost.slug}`}
            style={{
              padding: "14px 16px",
              border: "1px solid var(--line-stroke-accent)",
              textDecoration: "none",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              transition: "all 0.2s",
              backgroundColor: "var(--background)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--foreground)";
              e.currentTarget.style.backgroundColor = "var(--line-fill)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--line-stroke-accent)";
              e.currentTarget.style.backgroundColor = "var(--background)";
            }}
          >
            <span style={{ fontSize: "9px", color: "var(--nav-link)", letterSpacing: "0.08em" }}>
              ← PREV_POST
            </span>
            <span style={{ fontSize: "12px", color: "var(--foreground)", fontWeight: 600 }}>
              {prevPost.title}
            </span>
          </Link>
        )}
        {nextPost && (
          <Link
            href={`/blog/${nextPost.slug}`}
            style={{
              padding: "14px 16px",
              border: "1px solid var(--line-stroke-accent)",
              textDecoration: "none",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              alignItems: "flex-end",
              textAlign: "right",
              transition: "all 0.2s",
              backgroundColor: "var(--background)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--foreground)";
              e.currentTarget.style.backgroundColor = "var(--line-fill)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--line-stroke-accent)";
              e.currentTarget.style.backgroundColor = "var(--background)";
            }}
          >
            <span style={{ fontSize: "9px", color: "var(--nav-link)", letterSpacing: "0.08em" }}>
              NEXT_POST →
            </span>
            <span style={{ fontSize: "12px", color: "var(--foreground)", fontWeight: 600 }}>
              {nextPost.title}
            </span>
          </Link>
        )}
      </div>

      {/* Back to Blog */}
      <div
        style={{
          marginTop: "24px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Link
          href="/blog"
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
          ← ALL_POSTS
        </Link>
      </div>
    </main>
  );
}
