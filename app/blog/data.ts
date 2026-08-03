export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  date: string;
  category: string;
  status: string;
  readTime: string;
  excerpt: string;
  tags: string[];
  content: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: "LOG-001",
    slug: "building-custom-smtp-server",
    title: "Building a Custom SMTP Server from Scratch",
    date: "2025-07-28",
    category: "ENGINEERING",
    status: "PUBLISHED",
    readTime: "8 min",
    excerpt:
      "A deep dive into how I architected and built a fully custom SMTP server for Kosh — handling mail routing, DNS records, DKIM signing, SPF validation, and scaling to thousands of concurrent connections.",
    tags: ["SMTP", "Node.js", "DNS", "Networking"],
    content: [
      "When I started building Kosh, I knew from day one that I didn't want to rely on third-party email delivery services. I wanted full control over the mail pipeline — from the moment an email is composed to the second it lands in the recipient's inbox.",
      "## Why Build Your Own SMTP Server?",
      "Most developers reach for services like SendGrid, Mailgun, or AWS SES. These are great for transactional emails, but Kosh isn't just sending emails — it IS the email platform. We needed to handle inbound mail, outbound delivery, custom domains, DKIM signing, SPF records, and DMARC policies all under one roof.",
      "## The Architecture",
      "The SMTP server is built on Node.js using the net module for raw TCP socket handling. Here's the high-level flow:\n\n1. **Connection Handling** — Accept incoming SMTP connections on port 25/587\n2. **EHLO/HELO Handshake** — Negotiate capabilities including STARTTLS\n3. **Authentication** — Validate credentials against our user database\n4. **Mail Transaction** — Process MAIL FROM, RCPT TO, and DATA commands\n5. **Queue & Deliver** — Push to a Redis-backed queue for async delivery",
      "## DNS Configuration",
      "For each custom domain on Kosh, we automatically provision:\n- **MX Records** — Point incoming mail to our servers\n- **SPF Records** — Authorize our IPs to send on behalf of the domain\n- **DKIM Keys** — Generate 2048-bit RSA key pairs for message signing\n- **DMARC Policies** — Set up reporting and enforcement policies",
      "## Scaling Challenges",
      "The biggest challenge was handling concurrent connections efficiently. Node.js's event loop is great for I/O-bound work, but we had to be careful about:\n- Connection pooling for outbound SMTP relay\n- Rate limiting per domain to avoid being flagged as spam\n- Graceful handling of temporary failures with exponential backoff\n- Memory management for large attachments streaming through the pipeline",
      "## Lessons Learned",
      "Building an SMTP server taught me more about networking, DNS, and email standards (RFC 5321, RFC 6376) than any course ever could. The email ecosystem is surprisingly complex — but that complexity is what makes Kosh's from-scratch approach so powerful.",
    ],
  },
  {
    id: "LOG-002",
    slug: "cad-inspired-design-system",
    title: "Why I Chose a CAD-Inspired Design System",
    date: "2025-07-15",
    category: "DESIGN",
    status: "PUBLISHED",
    readTime: "5 min",
    excerpt:
      "The thought process behind choosing a brutalist, blueprint-inspired aesthetic for my portfolio — drawing from technical drawings, engineering schematics, and modernist typography.",
    tags: ["Design", "CSS", "UI/UX", "Portfolio"],
    content: [
      "Every developer portfolio looks the same. Gradient blobs, glass cards, smooth rounded corners. I wanted mine to feel different — like opening a technical blueprint or an engineering specification document.",
      "## The Inspiration",
      "I've always been fascinated by the precision and clarity of CAD drawings. There's something beautiful about dimension lines, crosshair markers, hatching patterns, and monospaced annotations. They communicate information with zero ambiguity.",
      "## Design Tokens",
      "The entire design system is built on a minimal set of CSS custom properties:\n- `--line-stroke` — Primary construction lines\n- `--line-stroke-accent` — Emphasized borders and dimensions\n- `--line-fill` — Subtle background tints\n- `--line-hatch` — Diagonal hatching patterns\n- `--nav-link` / `--nav-link-hover` — Interactive element states",
      "## Typography",
      "I use Geist Mono as the primary typeface — its monospaced grid aligns perfectly with the technical drawing aesthetic. Font sizes are deliberately small (9-12px) to mimic annotation text on blueprints.",
      "## Interactive Elements",
      "Every interactive element follows the CAD metaphor:\n- **Crosshair markers** (+) at component corners\n- **Dimension annotations** showing container sizes\n- **Section indices** (01 // ABOUT) mimicking drawing sheet references\n- **Status badges** inspired by revision control markers\n- **Hatching patterns** using CSS repeating-linear-gradient",
      "## The Result",
      "The final design stands out precisely because it doesn't try to look \"modern.\" It looks technical, precise, and intentional — which is exactly what I want my work to communicate.",
    ],
  },
  {
    id: "LOG-003",
    slug: "realtime-chat-architecture",
    title: "Real-Time Chat Architecture with Socket.io",
    date: "2025-06-20",
    category: "ENGINEERING",
    status: "PUBLISHED",
    readTime: "10 min",
    excerpt:
      "How I designed the real-time messaging layer for Kosh's chat-like email interface — connection pooling, room management, presence indicators, and handling reconnections gracefully.",
    tags: ["Socket.io", "WebSocket", "Architecture", "Node.js"],
    content: [
      "Kosh's signature feature is its chat-like email interface. Emails don't feel like emails — they feel like conversations. To make this work, I needed a robust real-time layer that could handle presence, typing indicators, read receipts, and instant message delivery.",
      "## Why Socket.io?",
      "I evaluated several options — raw WebSockets, Server-Sent Events, and Socket.io. I chose Socket.io for its:\n- Automatic reconnection with exponential backoff\n- Room-based message routing (perfect for email threads)\n- Namespace support for separating concerns\n- Fallback to long-polling for environments that block WebSockets",
      "## Room Architecture",
      "Each email conversation maps to a Socket.io room. When a user opens a thread:\n1. They join the room identified by the conversation ID\n2. Presence is broadcast to other participants\n3. New messages are emitted to all room members instantly\n4. Read receipts are tracked per-user, per-message",
      "## Scaling with Redis Adapter",
      "For horizontal scaling across multiple Node.js processes, I use the Redis adapter. This ensures that a message emitted from one server instance reaches clients connected to any other instance.",
      "## Connection Management",
      "Managing thousands of concurrent WebSocket connections requires careful resource management:\n- **Heartbeat intervals** to detect stale connections\n- **Connection limits** per user to prevent resource exhaustion\n- **Graceful degradation** when the server is under load\n- **Authentication middleware** to validate JWT tokens on connection",
      "## The Impact",
      "The real-time layer transforms email from a slow, asynchronous medium into something that feels alive. Users see messages appear instantly, know when someone is typing, and can have conversations as naturally as they would on WhatsApp or iMessage.",
    ],
  },
  {
    id: "LOG-004",
    slug: "figma-to-code-workflow",
    title: "From Figma to Code: My Design Workflow",
    date: "2025-05-12",
    category: "DESIGN",
    status: "PUBLISHED",
    readTime: "6 min",
    excerpt:
      "My end-to-end workflow for translating Figma designs into pixel-perfect, responsive React components — component-driven architecture, design tokens, and motion choreography.",
    tags: ["Figma", "React", "Workflow", "Motion"],
    content: [
      "Bridging the gap between design and code is one of the hardest problems in frontend development. Over the past two years, I've refined a workflow that minimizes translation loss and keeps designs pixel-perfect.",
      "## Step 1: Design Tokens First",
      "Before touching Figma, I define the design tokens — colors, spacing scales, typography, border radii, shadows. These become CSS custom properties that both the design file and the codebase reference. This single source of truth eliminates the \"that's not quite the right blue\" problem.",
      "## Step 2: Component Architecture in Figma",
      "I structure Figma files exactly like I structure React components:\n- **Atoms** — buttons, inputs, badges\n- **Molecules** — form fields, cards, nav items\n- **Organisms** — headers, sections, modals\n\nEach Figma component has variants that map 1:1 to React props.",
      "## Step 3: Motion Choreography",
      "Animations are designed in Figma using Smart Animate, then translated to Framer Motion. I document:\n- Trigger events (hover, mount, scroll)\n- Duration and easing curves\n- Stagger sequences for list items\n- Exit animations for unmounting components",
      "## Step 4: Responsive Strategy",
      "I design for three breakpoints in Figma (mobile, tablet, desktop) and use CSS Grid / Flexbox with container queries to handle everything in between. The goal is fluid layouts rather than breakpoint-snapping.",
      "## Key Principles",
      "1. **Never guess** — every spacing value, color, and font size comes from the token system\n2. **Build in isolation** — use Storybook to develop components outside the app context\n3. **Animate with purpose** — motion should guide attention, not distract\n4. **Test on real devices** — browser DevTools aren't enough for touch interactions and performance",
    ],
  },
  {
    id: "LOG-005",
    slug: "deploying-on-aws",
    title: "Deploying on AWS: Lessons Learned",
    date: "2025-04-08",
    category: "DEVOPS",
    status: "PUBLISHED",
    readTime: "7 min",
    excerpt:
      "Key takeaways from deploying production applications on AWS — EC2 instance sizing, S3 + CloudFront CDN setup, RDS vs self-managed databases, and cost optimization strategies.",
    tags: ["AWS", "DevOps", "Cloud", "Infrastructure"],
    content: [
      "I've deployed several production applications on AWS over the past year. Here are the lessons that cost me the most time (and money) to learn.",
      "## Right-Sizing EC2 Instances",
      "My first instinct was to start with a large instance \"just in case.\" Wrong. Start with the smallest viable instance (t3.micro or t3.small) and scale up based on actual metrics. CloudWatch CPU and memory alarms will tell you when it's time.",
      "## S3 + CloudFront for Static Assets",
      "Serving static files from your application server is a rookie mistake. Set up:\n1. An S3 bucket for static assets (images, fonts, JS bundles)\n2. A CloudFront distribution in front of it\n3. Cache-Control headers with appropriate TTLs\n4. Origin Access Identity to keep the S3 bucket private\n\nThis alone reduced our p95 load times by 60%.",
      "## Database Decisions",
      "For Kosh, I chose self-managed PostgreSQL on EC2 over RDS. Why?\n- **Cost** — RDS is 2-3x more expensive for equivalent specs\n- **Control** — Custom pg_hba.conf, extensions, and backup strategies\n- **Learning** — Understanding database operations deeply\n\nThe tradeoff is operational burden. You're responsible for backups, failover, and upgrades. For a solo developer, this is manageable. For a team, RDS might be worth the premium.",
      "## Cost Optimization",
      "AWS bills can spiral out of control. My rules:\n- **Reserved Instances** for predictable workloads (40% savings)\n- **Spot Instances** for batch processing and CI/CD runners\n- **S3 Lifecycle Policies** to move old logs to Glacier\n- **NAT Gateway audit** — these are silently expensive\n- **Monthly budget alerts** at 50%, 80%, and 100% thresholds",
      "## Security Baseline",
      "Every deployment gets:\n- VPC with public/private subnets\n- Security groups following least-privilege\n- IAM roles (never access keys in code)\n- SSL certificates via ACM\n- Secrets Manager for environment variables",
      "## Final Thought",
      "AWS is incredibly powerful but also incredibly complex. Start simple, measure everything, and only add complexity when you have a clear reason to.",
    ],
  },
];

export function getCategoryColor(category: string) {
  switch (category) {
    case "ENGINEERING":
      return "#3b82f6";
    case "DESIGN":
      return "#8b5cf6";
    case "DEVOPS":
      return "#f59e0b";
    default:
      return "var(--nav-link)";
  }
}
