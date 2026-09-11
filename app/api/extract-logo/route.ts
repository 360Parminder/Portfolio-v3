import { NextResponse } from "next/server";

function getAttr(tag: string, attr: string): string | null {
  const match = tag.match(new RegExp(`${attr}=(?:["']([^"']*)["']|([^\\s>]+))`, "i"));
  return match ? (match[1] || match[2] || null) : null;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get("url");

  if (!targetUrl) {
    return NextResponse.json({ error: "Missing 'url' query parameter" }, { status: 400 });
  }

  let parsedTarget: URL;
  try {
    parsedTarget = new URL(targetUrl);
    if (!["http:", "https:"].includes(parsedTarget.protocol)) {
      return NextResponse.json({ error: "Invalid URL protocol" }, { status: 400 });
    }
  } catch {
    return NextResponse.json({ error: "Invalid URL format" }, { status: 400 });
  }

  const hostname = parsedTarget.hostname;
  const googleFavicon = `https://www.google.com/s2/favicons?domain=${hostname}&sz=128`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const response = await fetch(parsedTarget.toString(), {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
      },
      redirect: "follow",
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return NextResponse.json(
        {
          logoUrl: googleFavicon,
          fallbackUrl: googleFavicon,
          domain: hostname,
          fromFallback: true,
        },
        {
          headers: {
            "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
          },
        }
      );
    }

    const finalBaseUrl = response.url || targetUrl;
    // Read response text (limit to first 300KB to parse head section safely)
    const reader = response.body?.getReader();
    let html = "";
    if (reader) {
      const decoder = new TextDecoder();
      let totalBytes = 0;
      while (totalBytes < 300 * 1024) {
        const { done, value } = await reader.read();
        if (done) break;
        totalBytes += value.byteLength;
        html += decoder.decode(value, { stream: true });
        if (html.includes("</head>")) break;
      }
      reader.cancel().catch(() => {});
    } else {
      html = await response.text();
    }

    // Extract link and meta tags from <head>
    const linkTags = html.match(/<link\b[^>]*>/gi) || [];
    const metaTags = html.match(/<meta\b[^>]*>/gi) || [];

    const candidates: { url: string; priority: number }[] = [];

    for (const tag of linkTags) {
      const rel = getAttr(tag, "rel")?.toLowerCase() || "";
      const href = getAttr(tag, "href");
      if (!href) continue;

      let resolvedUrl: string;
      try {
        resolvedUrl = new URL(href, finalBaseUrl).toString();
      } catch {
        continue;
      }

      if (rel.includes("apple-touch-icon")) {
        candidates.push({ url: resolvedUrl, priority: 1 });
      } else if (rel.includes("icon")) {
        const type = getAttr(tag, "type")?.toLowerCase() || "";
        if (type.includes("svg") || href.endsWith(".svg")) {
          candidates.push({ url: resolvedUrl, priority: 2 });
        } else if (type.includes("png") || href.endsWith(".png")) {
          candidates.push({ url: resolvedUrl, priority: 3 });
        } else {
          candidates.push({ url: resolvedUrl, priority: 4 });
        }
      }
    }

    for (const tag of metaTags) {
      const property = getAttr(tag, "property")?.toLowerCase() || "";
      const name = getAttr(tag, "name")?.toLowerCase() || "";
      const content = getAttr(tag, "content");
      if (!content) continue;

      let resolvedUrl: string;
      try {
        resolvedUrl = new URL(content, finalBaseUrl).toString();
      } catch {
        continue;
      }

      if (property === "og:image" || name === "twitter:image") {
        candidates.push({ url: resolvedUrl, priority: 5 });
      }
    }

    candidates.sort((a, b) => a.priority - b.priority);

    const logoUrl = candidates.length > 0 ? candidates[0].url : `${new URL(finalBaseUrl).origin}/favicon.ico`;

    return NextResponse.json(
      {
        logoUrl,
        fallbackUrl: googleFavicon,
        domain: hostname,
        extracted: candidates.length > 0,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
        },
      }
    );
  } catch {
    return NextResponse.json(
      {
        logoUrl: googleFavicon,
        fallbackUrl: googleFavicon,
        domain: hostname,
        fromFallback: true,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  }
}
