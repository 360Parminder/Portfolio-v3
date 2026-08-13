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
  coverImage?: string;
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
  {
    id: "LOG-006",
    slug: "vps-providers-comparison-for-students",
    title: "The Ultimate VPS Comparison for Students: Pricing, Performance, Startups & Reliability",
    date: "2025-08-10",
    category: "DEVOPS",
    status: "PUBLISHED",
    readTime: "14 min",
    coverImage: "/vps-comparison.jpg",
    excerpt:
      "A comprehensive benchmark and breakdown comparing Hetzner, DigitalOcean, Linode, Vultr, AWS Lightsail, Oracle Cloud, and low-cost startup disruptors like ExCloud across pricing, real-world performance, and student perks.",
    tags: ["VPS", "Cloud", "DevOps", "ExCloud", "Startups", "Hosting"],
    content: [
      "As a student or early-career developer, having your own Linux Virtual Private Server (VPS) is the single best investment you can make for learning systems engineering, networking, Docker, and full-stack deployment. However, navigating the cloud landscape on a student budget is fraught with hidden fees, oversold CPU cores, confusing dashboards, and surprise bandwidth bills.",
      "In this guide, I benchmark and break down established cloud giants alongside rising low-cost startup disruptors (like ExCloud) across 5 critical dimensions: **Pricing & Free Credits**, **Raw Performance & Specs**, **Network Reliability & Uptime**, **Developer Features**, and **Ease of Use**.",
      "## 1. Low-Cost Startup Disruptors: ExCloud & The Budget Modern Cloud",
      "While legacy cloud providers charge $5–$10/month for bare minimum 1GB RAM machines, a new wave of nimble cloud startups is redefining developer VPS economics. Leading this pack is **ExCloud** alongside boutique hosting innovators.",
      "- **ExCloud Overview** — ExCloud focuses on developer-first simplicity with ultra-lean pricing starting around **$1.50 to $3.00/month**. They strip away enterprise fluff and deliver high-speed NVMe-backed KVM virtual servers, dedicated IPv4/IPv6, and intuitive instant provisioning.\n- **Performance & Specs** — Excellent single-core CPU speeds and fast NVMe I/O make ExCloud an ideal home for Docker containers, Telegram/Discord bots, Node.js/Go/Python REST APIs, and lightweight databases (PostgreSQL, SQLite, Redis).\n- **Pros** — Extremely low financial barrier to entry, clean modern interface without enterprise clutter, generous bandwidth allocations, instant deployment, and zero bloat.\n- **Cons** — Fewer global datacenter locations compared to 15-year-old hyperscalers; smaller marketplace of 1-click complex enterprise add-ons.\n- **Other Notable Budget Startups** — **Crunchbits** (known for budget NVMe KVM specials), **RackNerd** (popular for low-cost persistent sandboxes under $20/yr), and **Scaleway Stardust** (European micro-instances from €1.50/mo).\n- **Best For** — Students and indie hackers on a tight budget who need reliable, fast NVMe servers to host 24/7 side projects and APIs without paying $6–$10/month per instance.",
      "## 2. Hetzner Cloud — The Undisputed Price-to-Performance King",
      "If raw compute per dollar among established European & US providers is your priority, Hetzner Cloud is virtually unbeatable. Based in Germany with datacenters in Europe (Nuremberg, Falkenstein, Helsinki), the US (Ashburn VA, Hillsboro OR), and Singapore, Hetzner offers modern AMD EPYC and Ampere Altra ARM64 servers at remarkable rates.",
      "- **Entry Pricing** — ~€3.79/month (~$4.15) for CAX11 (2 vCPU ARM64, 4 GB RAM, 40 GB NVMe SSD) or ~€4.50/month for CX22 (2 vCPU x86, 4 GB RAM, 40 GB NVMe)\n- **Bandwidth** — A massive 20 TB included outbound traffic per month with 10 Gbps host uplinks\n- **Pros** — Unmatched price-to-spec ratio, blisteringly fast NVMe I/O, clean minimal dashboard, instant snapshot provisioning, and excellent REST API / CLI (`hcloud`)\n- **Cons** — Strict initial account verification for new signups; fewer global locations outside EU/US/Singapore; no bundled student credit program\n- **Best For** — Students wanting maximum RAM and CPU cores to run Docker clusters, self-hosted databases, or multiple heavy web applications on a tiny budget.",
      "## 3. DigitalOcean — The Gold Standard for Developer Experience",
      "DigitalOcean pioneered the accessible cloud revolution and remains the friendliest entry point for beginners. With seamless onboarding, comprehensive Linux tutorials, and 1-Click Droplets, it eliminates the intimidation factor of raw server management.",
      "- **Entry Pricing** — $4.00/month (1 vCPU, 512 MB RAM, 10 GB SSD) or $6.00/month for the recommended starter tier (1 vCPU, 1 GB RAM, 25 GB NVMe SSD, 1 TB transfer)\n- **Student Perks** — **$200 in free credits for 1 year** through the GitHub Student Developer Pack — essentially giving students free hosting for their entire academic year!\n- **Pros** — Best-in-class UI, extensive community documentation, robust ecosystem (Managed DBs, Spaces S3-compatible storage, App Platform PaaS, Floating IPs, Cloud Firewalls)\n- **Cons** — Higher price per gigabyte of RAM compared to Hetzner and startups; standard droplets share CPU cycles with potential noisy neighbors\n- **Best For** — Beginners claiming their GitHub Student Pack credits to learn Linux, deploy portfolio sites, and experiment risk-free.",
      "## 4. Linode (Akamai Connected Cloud) — Rock-Solid Reliability & Support",
      "Linode is one of the oldest and most respected VPS providers in the Linux community, now backed by Akamai's global edge network. It delivers clean, predictable performance and outstanding community reputation.",
      "- **Entry Pricing** — The Nanode 1GB plan starts at $5.00/month (1 vCPU, 1 GB RAM, 25 GB SSD, 1 TB transfer)\n- **Student Perks** — Regular $100 free credit promotions for 60 days upon signup\n- **Pros** — Dedicated 24/7 human support across all tiers, excellent Linode CLI and Terraform provider, built-in NodeBalancers, DNS management, and transparent flat pricing\n- **Cons** — Slightly older web UI compared to DigitalOcean; addons like automatic backups ($2/mo) and custom block storage add up quickly\n- **Best For** — Students learning systems administration, networking fundamentals, and dependable long-term hosting.",
      "## 5. Vultr — Global Footprint & Hardware Diversity",
      "Vultr stands out with an enormous global footprint spanning 32+ datacenter locations across the Americas, Europe, Asia, Australia, and Africa. They also offer high-frequency compute instances optimized with 3.0GHz+ Intel and AMD processors.",
      "- **Entry Pricing** — Standard Cloud Compute starts at $2.50/month (IPv6-only, 1 vCPU, 512 MB RAM, 10 GB SSD) or $3.50–$6.00/month with dedicated IPv4 (1 vCPU, 1 GB RAM, 25–32 GB NVMe)\n- **Student Perks** — GitHub Student Developer Pack frequently offers $100 in trial credits for new accounts\n- **Pros** — Unmatched global datacenter availability for low-latency testing; High-Frequency NVMe instances for CPU-intensive compilation and game servers; custom ISO upload support\n- **Cons** — Customer support is strictly ticket-based and can be slow; billing interface has occasional quirkiness\n- **Best For** — Students building projects targeting specific geographic regions (e.g. Asia-Pacific, Latin America) or requiring custom OS kernels via ISO.",
      "## 6. AWS Lightsail — The Gateway to Enterprise Cloud",
      "AWS Lightsail is Amazon's answer to simplified VPS hosting. It strips away AWS's notoriously confusing VPC and IAM configurations while keeping your instance close to the broader AWS ecosystem (S3, RDS, CloudFront, DynamoDB).",
      "- **Entry Pricing** — $3.50/month (1 vCPU, 512 MB RAM, 20 GB SSD, 1 TB transfer) or $5.00/month (1 vCPU, 1 GB RAM, 40 GB SSD, 2 TB transfer)\n- **Free Tier** — First 3 months free on the $3.50, $5.00, and $10.00 plans\n- **Pros** — 3 months free trial; seamless private networking with AWS services in the same region; bundled static IPs, automated snapshots, and DNS management\n- **Cons** — CPU bursting model (burstable T-series credit system throttles CPU if sustained usage stays high); complex upgrade path to standard EC2\n- **Best For** — Students planning to work in enterprise environments and wanting familiar exposure to AWS infrastructure without unpredictable billing.",
      "## 7. Oracle Cloud Free Tier — The Zero-Dollar Powerhouse (With Caveats)",
      "Oracle Cloud Infrastructure (OCI) offers the most generous Always Free tier in cloud computing history. If you are accepted, you get enterprise-grade compute without paying a single cent.",
      "- **Always Free Specs** — Up to 4 OCPU (ARM Ampere Altra), **24 GB of RAM**, 200 GB NVMe block storage, and 10 TB/month outbound bandwidth, divisible across up to 4 virtual instances\n- **Cost** — $0.00 forever\n- **Pros** — Unbeatable free compute capacity — 24GB of RAM is enough to run dozens of Docker containers, CI/CD runners, and staging environments simultaneously\n- **Cons** — Complex enterprise dashboard UI; aggressive fraud detection that frequently rejects student credit cards during verification; idle instance reclamation policies if CPU drops below 15%\n- **Best For** — Patient students with a valid credit card who want a zero-cost server powerhouse for heavy workloads, microservices, and self-hosted tooling.",
      "## Comprehensive Comparison Matrix",
      "Here is how the top options stack up side-by-side for a typical entry-level / student workload:\n\n1. **ExCloud (Startup Tier)** — ~$1.50–$3.00/mo | 1 vCPU | 1–2 GB RAM | NVMe SSD | High Bandwidth | Score: 9.3/10 | Best Budget Startup\n2. **Hetzner Cloud CAX11** — ~$4.15/mo | 2 vCPU ARM | 4 GB RAM | 40 GB NVMe | 20 TB Bandwidth | Score: 9.8/10 | Best Value Overall\n3. **DigitalOcean Basic** — $6.00/mo ($0 w/ GitHub Pack) | 1 vCPU | 1 GB RAM | 25 GB NVMe | 1 TB Bandwidth | Score: 8.7/10 | Best UX & Documentation\n4. **Linode Nanode** — $5.00/mo | 1 vCPU | 1 GB RAM | 25 GB SSD | 1 TB Bandwidth | Score: 8.4/10 | Best Support & Stability\n5. **Vultr High Frequency** — $6.00/mo | 1 vCPU (3.0GHz+) | 1 GB RAM | 32 GB NVMe | 1 TB Bandwidth | Score: 9.0/10 | Best Global Coverage\n6. **AWS Lightsail** — $5.00/mo (3 Months Free) | 1 vCPU | 1 GB RAM | 40 GB SSD | 2 TB Bandwidth | Score: 7.8/10 | Best AWS Bridge\n7. **Oracle Always Free** — $0.00/mo | Up to 4 vCPU ARM | Up to 24 GB RAM | 200 GB Storage | 10 TB Bandwidth | Score: 9.2/10 | Best Zero-Budget",
      "## 5 Traps Students Should Watch Out For",
      "When running a VPS for the first time, watch out for these common rookie pitfalls:\n\n1. **Bandwidth Overage Bills** — Avoid hosting public file downloads or unprotected media streams without a CDN (like Cloudflare) in front. Bandwidth overages can cost $0.01–$0.05 per extra GB.\n2. **IPv4 Surcharges** — With the global exhaustion of IPv4 addresses, many providers now charge $0.50–$1.50/month for a dedicated IPv4. Make sure this is included in your plan estimate.\n3. **Unprotected SSH & Root Passwords** — Never leave password authentication enabled on port 22. Always configure SSH key-based authentication, set up `ufw` (Uncomplicated Firewall), and install `fail2ban`.\n4. **Missing Swap Space** — If you run a 1 GB or 2 GB RAM server, a sudden Node.js build or Docker pull can trigger the Linux Out-Of-Memory (OOM) killer and crash your database. Always configure 2–4 GB of swap memory on NVMe storage.\n5. **Snapshot & Backup Costs** — Automated daily snapshots usually cost an extra 20% of your instance price. For hobby projects, consider automating offsite backups using simple rsync or S3 cron jobs.",
      "## Verdict: Which One Should You Choose?",
      "To summarize the recommendation for students:\n\n- **If you want maximum savings for personal side projects & bots** → Choose a modern low-cost startup like **ExCloud** ($1.50–$3/mo). You get fast NVMe performance without recurring $6+/mo charges.\n- **If you have the GitHub Student Pack** → Start with **DigitalOcean** or **Vultr**. Claim your $100–$200 credits, follow DigitalOcean's world-class tutorials, and build your foundation for free.\n- **If you are paying out of pocket for serious compute** → Choose **Hetzner Cloud**. For ~$4.15/month, getting 2 vCPU and 4GB RAM is more than quadruple what competitors offer, with top-tier NVMe disk speeds.\n- **If you have zero budget and patience** → Register for **Oracle Cloud Always Free Tier** to get 24GB RAM and 4 ARM cores permanently.\n- **If your goal is cloud certification & career prep** → Choose **AWS Lightsail** to get hands-on experience with IAM, security groups, and AWS ecosystem architecture.",
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
