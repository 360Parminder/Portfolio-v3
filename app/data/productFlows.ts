export type FlowCategoryId =
  | "payment-gateways"
  | "auth-identity"
  | "email-infra"
  | "realtime-queues";

export type ProductSubType = "INDIA_PG" | "GLOBAL_PG" | "MERCHANT_OF_RECORD";

export type ActorId = "client" | "server" | "gateway" | "rail" | "webhook";

export interface FlowActor {
  id: ActorId;
  code: string;
  label: string;
  subLabel: string;
}

export interface FlowStepUiPreview {
  screenLabel: string;
  headline: string;
  subtext: string;
  statusBadge: string;
  statusTone: "info" | "warning" | "success";
  ctaText?: string;
  metaRows: { label: string; value: string }[];
}

export interface FlowStep {
  id: string;
  stepNo: string;
  title: string;
  from: ActorId;
  to: ActorId;
  protocol: string;
  latencyLabel: string;
  summary: string;
  securityNote: string;
  uiPreview: FlowStepUiPreview;
  requestPayload: string;
  responsePayload: string;
  codeSnippet: string;
  codeLang: string;
  gotchas: string[];
}

export interface FlowScenario {
  id: string;
  code: string;
  label: string;
  description: string;
  steps: FlowStep[];
}

export interface ProductFlowItem {
  id: string;
  categoryId: FlowCategoryId;
  name: string;
  shortCode: string;
  subType: ProductSubType;
  subTypeLabel: string;
  accentColor: string;
  region: string;
  architecturePattern: string;
  tagline: string;
  pricingSummary: string;
  settlementTime: string;
  taxCompliance: string;
  webhookAuth: string;
  avgIntegrationTime: string;
  bestFor: string;
  sdks: string[];
  paymentMethods: string[];
  docsUrl: string;
  compareSummary: {
    orderModel: string;
    checkoutUx: string;
    webhookHeader: string;
    morHandled: boolean;
    idealWhen: string;
  };
  scenarios: FlowScenario[];
}

export interface FlowCategoryMeta {
  id: FlowCategoryId;
  code: string;
  name: string;
  status: "LIVE" | "PLANNED";
  dotColor: string;
  description: string;
  plannedProducts?: {
    name: string;
    focus: string;
    sampleFlow: string;
  }[];
}

export const FLOW_ACTORS: FlowActor[] = [
  { id: "client", code: "01", label: "CLIENT_APP", subLabel: "Browser / Mobile" },
  { id: "server", code: "02", label: "MERCHANT_API", subLabel: "Next.js / Node" },
  { id: "gateway", code: "03", label: "GATEWAY_CORE", subLabel: "Payment Engine" },
  { id: "rail", code: "04", label: "BANK / RAIL", subLabel: "UPI / 3DS / Issuer" },
  { id: "webhook", code: "05", label: "WEBHOOK_LEDGER", subLabel: "Verify & DB Sync" },
];

export const FLOW_CATEGORIES: FlowCategoryMeta[] = [
  {
    id: "payment-gateways",
    code: "CAT-01",
    name: "Payment Gateways",
    status: "LIVE",
    dotColor: "#22c55e",
    description:
      "Compare domestic Indian aggregators, global payment APIs, and Merchant of Record platforms. Watch every API handshake, UI checkout state, and webhook verification step before choosing an SDK.",
  },
  {
    id: "auth-identity",
    code: "CAT-02",
    name: "Auth & Identity",
    status: "PLANNED",
    dotColor: "#3b82f6",
    description:
      "Upcoming blueprint series comparing OAuth2 PKCE, passkeys, JWT session rotation, and multi-tenant RBAC flows.",
    plannedProducts: [
      {
        name: "Better Auth",
        focus: "Self-hosted TypeScript auth & session plugins",
        sampleFlow: "Sign-in → Cookie Session → Org RBAC Check",
      },
      {
        name: "Clerk",
        focus: "Managed hosted UI, JWT templates & webhook sync",
        sampleFlow: "Hosted Modal → Short-lived JWT → Svix User Sync",
      },
      {
        name: "Supabase Auth",
        focus: "GoTrue OAuth + PostgreSQL Row-Level Security",
        sampleFlow: "PKCE Exchange → Access JWT → Postgres RLS Policy",
      },
    ],
  },
  {
    id: "email-infra",
    code: "CAT-03",
    name: "Email & SMTP Pipelines",
    status: "PLANNED",
    dotColor: "#f59e0b",
    description:
      "Upcoming architectural flows for custom SMTP engines, DNS verification (MX/SPF/DKIM), bounce webhooks, and transactional queues.",
    plannedProducts: [
      {
        name: "Kosh SMTP Core",
        focus: "Custom TCP SMTP pipeline & instant domain setup",
        sampleFlow: "Compose → DKIM Sign → Redis Queue → MX TLS Relay",
      },
      {
        name: "Resend",
        focus: "React Email DX + REST send & delivery webhooks",
        sampleFlow: "React Render → POST /emails → Bounce/Open Webhook",
      },
      {
        name: "AWS SES",
        focus: "High-volume SMTP/API + SNS bounce topic handling",
        sampleFlow: "SendRawEmail → SNS Topic → Suppression List Sync",
      },
    ],
  },
  {
    id: "realtime-queues",
    code: "CAT-04",
    name: "Realtime & Queues",
    status: "PLANNED",
    dotColor: "#8b5cf6",
    description:
      "Upcoming visual trace flows for WebSocket fan-out, Redis pub/sub adapters, background job retries, and presence sync.",
    plannedProducts: [
      {
        name: "Socket.io + Redis",
        focus: "Room routing & multi-instance pub/sub fan-out",
        sampleFlow: "JWT Handshake → Room Join → Redis Pub/Sub Broadcast",
      },
      {
        name: "Upstash QStash",
        focus: "HTTP serverless queues, DLQs & signature checks",
        sampleFlow: "Publish Job → Scheduled Delivery → Receiver Verify",
      },
      {
        name: "Inngest",
        focus: "Durable step functions & event-driven retries",
        sampleFlow: "Emit Event → Step Memoization → Backoff Retry",
      },
    ],
  },
];

export const PRODUCT_FLOWS: ProductFlowItem[] = [
  {
    id: "razorpay",
    categoryId: "payment-gateways",
    name: "Razorpay",
    shortCode: "RZP",
    subType: "INDIA_PG",
    subTypeLabel: "INDIA_PG",
    accentColor: "#3395FF",
    region: "India + International Cards",
    architecturePattern: "Order-First + Checkout.js Modal + Webhook",
    tagline:
      "India's developer-standard payment aggregator with instant UPI Intent, Cards, Subscriptions, and HMAC-SHA256 webhooks.",
    pricingSummary: "~2% Standard MDR (UPI 0% on RuPay/select tiers)",
    settlementTime: "T+2 Working Days",
    taxCompliance: "Merchant handles GST invoicing & filing",
    webhookAuth: "X-Razorpay-Signature (HMAC-SHA256 raw body)",
    avgIntegrationTime: "~45 mins",
    bestFor: "Indian SaaS, D2C stores, UPI-heavy apps & marketplaces",
    sdks: ["Node.js", "Next.js", "React Native", "Python", "Go"],
    paymentMethods: ["UPI Intent / QR", "Cards", "Netbanking", "Wallets", "EMI"],
    docsUrl: "https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/",
    compareSummary: {
      orderModel: "Mandatory server-side Order ID created before opening Checkout",
      checkoutUx: "Embedded JS Modal overlay (no full-page redirect needed)",
      webhookHeader: "x-razorpay-signature",
      morHandled: false,
      idealWhen: "Targeting Indian users with UPI Intent + cards inside a sleek modal UX",
    },
    scenarios: [
      {
        id: "razorpay-standard",
        code: "01 // HAPPY_PATH",
        label: "Order + Checkout Modal + Webhook",
        description:
          "Standard Razorpay flow: create an authoritative order on your server, launch Checkout.js in the browser, verify the client signature, and fulfill idempotently via payment.captured webhook.",
        steps: [
          {
            id: "rzp-1",
            stepNo: "01",
            title: "User Triggers Checkout",
            from: "client",
            to: "server",
            protocol: "HTTPS POST",
            latencyLabel: "~40ms",
            summary:
              "Client sends only the plan/product ID to your backend. Never pass the price or currency from the browser.",
            securityNote:
              "Always calculate final amount in paise (INR * 100) on the server from your database pricing table.",
            uiPreview: {
              screenLabel: "APP // CHECKOUT_INIT",
              headline: "Kosh Pro Plan — ₹999 / month",
              subtext: "User clicks Pay with Razorpay. Frontend requests an authoritative order token.",
              statusBadge: "REQUESTING_ORDER",
              statusTone: "info",
              ctaText: "Creating secure order...",
              metaRows: [
                { label: "PLAN_ID", value: "plan_pro_monthly" },
                { label: "AMOUNT_CALC", value: "Server-side (99900 paise)" },
              ],
            },
            requestPayload: `POST /api/payments/create-order
Content-Type: application/json

{
  "planId": "pro_monthly",
  "tenantId": "usr_8291a"
}`,
            responsePayload: `// Backend validates session & looks up price
{
  "resolvedAmountPaise": 99900,
  "currency": "INR",
  "receipt": "rcpt_8291a_17312"
}`,
            codeSnippet: `// app/api/payments/create-order/route.ts
const plan = await db.plans.findUnique({ where: { id: body.planId } });
const amountInPaise = plan.priceInInr * 100;`,
            codeLang: "ts",
            gotchas: [
              "Razorpay expects amount in smallest currency unit (paise for INR: ₹999 = 99900).",
              "Never trust client-supplied price or discount totals.",
            ],
          },
          {
            id: "rzp-2",
            stepNo: "02",
            title: "Create Razorpay Order",
            from: "server",
            to: "gateway",
            protocol: "REST BASIC AUTH",
            latencyLabel: "~180ms",
            summary:
              "Your server calls Razorpay /v1/orders using Key ID & Key Secret. Razorpay returns an immutable order_id tied to that exact amount.",
            securityNote:
              "Keep RAZORPAY_KEY_SECRET strictly on the server. Persist order_id in your DB with status PENDING before returning it.",
            uiPreview: {
              screenLabel: "SERVER // ORDER_CREATED",
              headline: "Order Lock Generated",
              subtext: "order_Pk9x2LmQ8vR41a locked at ₹999.00 INR and persisted as PENDING.",
              statusBadge: "ORDER_LOCKED",
              statusTone: "info",
              metaRows: [
                { label: "ORDER_ID", value: "order_Pk9x2LmQ8vR41a" },
                { label: "DB_STATE", value: "PENDING" },
              ],
            },
            requestPayload: `POST https://api.razorpay.com/v1/orders
Authorization: Basic base64(KEY_ID:KEY_SECRET)

{
  "amount": 99900,
  "currency": "INR",
  "receipt": "rcpt_8291a_17312",
  "notes": { "tenantId": "usr_8291a" }
}`,
            responsePayload: `{
  "id": "order_Pk9x2LmQ8vR41a",
  "entity": "order",
  "amount": 99900,
  "amount_paid": 0,
  "currency": "INR",
  "status": "created"
}`,
            codeSnippet: `const order = await razorpay.orders.create({
  amount: amountInPaise,
  currency: "INR",
  receipt: \`rcpt_\${userId}_\${Date.now()}\`,
  notes: { userId, planId: plan.id },
});
await db.payments.create({ data: { orderId: order.id, status: "PENDING" } });`,
            codeLang: "ts",
            gotchas: [
              "Always bind order_id during Checkout — payments without an order_id do not auto-capture reliably.",
              "Keep receipt <= 40 characters.",
            ],
          },
          {
            id: "rzp-3",
            stepNo: "03",
            title: "Launch Checkout.js Modal",
            from: "gateway",
            to: "client",
            protocol: "CLIENT SDK",
            latencyLabel: "Interactive",
            summary:
              "Frontend loads checkout.js and opens the Razorpay modal with the public key_id and server-generated order_id.",
            securityNote:
              "Pass only NEXT_PUBLIC_RAZORPAY_KEY_ID and order_id to the browser. Customer selects UPI, Card, or Netbanking inside Razorpay's PCI-DSS iframe.",
            uiPreview: {
              screenLabel: "RAZORPAY // MODAL_OPEN",
              headline: "Choose Payment Method",
              subtext: "UPI (GPay / PhonePe / Paytm) · Cards · Netbanking",
              statusBadge: "AWAITING_USER_INPUT",
              statusTone: "warning",
              ctaText: "Pay ₹999 via UPI Intent →",
              metaRows: [
                { label: "METHODS", value: "UPI · Card · Netbanking" },
                { label: "PCI_SCOPE", value: "Handled by Razorpay" },
              ],
            },
            requestPayload: `const options = {
  key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  amount: 99900,
  currency: "INR",
  name: "Kosh Mail",
  order_id: "order_Pk9x2LmQ8vR41a",
  handler: (response) => verifyOnServer(response)
};
new window.Razorpay(options).open();`,
            responsePayload: `// User opens UPI app or enters Card details
{
  "modalState": "OPEN",
  "selectedRail": "upi_intent",
  "vpaApp": "gpay"
}`,
            codeSnippet: `const rzp = new window.Razorpay({
  key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  order_id: data.orderId,
  name: "Kosh",
  handler: async (res) => {
    await fetch("/api/payments/verify", {
      method: "POST",
      body: JSON.stringify(res),
    });
  },
});
rzp.open();`,
            codeLang: "ts",
            gotchas: [
              "Add a modal.ondismiss handler so your UI stops spinning if the user closes the popup.",
              "Check for window.Razorpay script load errors on slow mobile networks.",
            ],
          },
          {
            id: "rzp-4",
            stepNo: "04",
            title: "UPI / 3DS Bank Authorization",
            from: "client",
            to: "rail",
            protocol: "NPCI UPI / 3DS2",
            latencyLabel: "User Auth",
            summary:
              "Customer authorizes the transaction via UPI PIN in their app or 3DS2 OTP with their issuing bank. Funds are debited and routed back through Razorpay.",
            securityNote:
              "If the user closes the browser tab immediately after UPI PIN entry, the client handler will never run — webhooks are mandatory.",
            uiPreview: {
              screenLabel: "NPCI_UPI // BANK_AUTH",
              headline: "UPI Collect / PIN Approved",
              subtext: "Issuer bank confirmed debit of ₹999.00. Returning signed token to Checkout.",
              statusBadge: "BANK_AUTHORIZED",
              statusTone: "success",
              metaRows: [
                { label: "RAIL", value: "NPCI UPI 2.0" },
                { label: "RRN", value: "431209841225" },
              ],
            },
            requestPayload: `// Redirect / Intent deep-link payload
upi://pay?pa=kosh@icici&pn=Kosh&tr=order_Pk9x2LmQ8vR41a&am=999.00&cu=INR`,
            responsePayload: `{
  "razorpay_payment_id": "pay_PkA19xYz7721nQ",
  "razorpay_order_id": "order_Pk9x2LmQ8vR41a",
  "razorpay_signature": "9f2a8c4e1b...e73d"
}`,
            codeSnippet: `// Returned to Checkout handler(response) in browser:
// { razorpay_payment_id, razorpay_order_id, razorpay_signature }`,
            codeLang: "ts",
            gotchas: [
              "Never mark an order PAID just because handler() fired — the payload could be forged without server HMAC verification.",
            ],
          },
          {
            id: "rzp-5",
            stepNo: "05",
            title: "Server HMAC Signature Verify",
            from: "client",
            to: "server",
            protocol: "HMAC-SHA256",
            latencyLabel: "~15ms",
            summary:
              "Your server hashes `order_id + '|' + payment_id` with KEY_SECRET using HMAC-SHA256 and timing-safe comparison before showing an instant success screen.",
            securityNote:
              "Use crypto.timingSafeEqual() to prevent timing attacks when comparing signatures.",
            uiPreview: {
              screenLabel: "APP // INSTANT_VERIFY",
              headline: "Signature Verified ✓",
              subtext: "Client payment signature matched server HMAC-SHA256 digest.",
              statusBadge: "SIGNATURE_VALID",
              statusTone: "success",
              metaRows: [
                { label: "PAYMENT_ID", value: "pay_PkA19xYz7721nQ" },
                { label: "CHECK", value: "HMAC-SHA256 Match" },
              ],
            },
            requestPayload: `POST /api/payments/verify
{
  "razorpay_order_id": "order_Pk9x2LmQ8vR41a",
  "razorpay_payment_id": "pay_PkA19xYz7721nQ",
  "razorpay_signature": "9f2a8c4e1b...e73d"
}`,
            responsePayload: `{
  "verified": true,
  "status": "PROVISIONING"
}`,
            codeSnippet: `import crypto from "node:crypto";

const expected = crypto
  .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
  .update(\`\${orderId}|\${paymentId}\`)
  .digest("hex");

const isValid = crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));`,
            codeLang: "ts",
            gotchas: [
              "Remember to join orderId and paymentId with a pipe '|' — NOT the newly generated webhook secret.",
              "Client verification uses KEY_SECRET, whereas webhooks use WEBHOOK_SECRET.",
            ],
          },
          {
            id: "rzp-6",
            stepNo: "06",
            title: "Webhook Capture & Fulfillment",
            from: "gateway",
            to: "webhook",
            protocol: "ASYNC WEBHOOK",
            latencyLabel: "1–3s",
            summary:
              "Razorpay sends `payment.captured` asynchronously to your webhook endpoint. Your server verifies `X-Razorpay-Signature` on the raw request body and unlocks the subscription idempotently.",
            securityNote:
              "Always read raw text (`await req.text()`) before JSON.parse(). Deduplicate using event/payment_id so retries never double-credit.",
            uiPreview: {
              screenLabel: "APP // ACCESS_UNLOCKED",
              headline: "Pro Workspace Active",
              subtext: "Webhook reconciled · Receipt emailed · Subscription active until next cycle.",
              statusBadge: "CAPTURED_&_SYNCED",
              statusTone: "success",
              metaRows: [
                { label: "EVENT", value: "payment.captured" },
                { label: "IDEMPOTENCY", value: "Unique payment_id lock" },
              ],
            },
            requestPayload: `POST /api/webhooks/razorpay
X-Razorpay-Signature: 7c1b3d...91e4
Content-Type: application/json

{
  "event": "payment.captured",
  "payload": {
    "payment": {
      "entity": {
        "id": "pay_PkA19xYz7721nQ",
        "order_id": "order_Pk9x2LmQ8vR41a",
        "amount": 99900,
        "status": "captured"
      }
    }
  }
}`,
            responsePayload: `HTTP/1.1 200 OK
{ "received": true }`,
            codeSnippet: `const rawBody = await req.text();
const sig = req.headers.get("x-razorpay-signature")!;
const digest = crypto
  .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
  .update(rawBody)
  .digest("hex");

if (digest !== sig) return new Response("Invalid signature", { status: 400 });
// Idempotent DB upsert inside transaction`,
            codeLang: "ts",
            gotchas: [
              "Return HTTP 200 within 5 seconds or Razorpay treats the webhook as timed out and retries for 24h.",
              "Always check `payment.captured` rather than `payment.authorized` if auto-capture is enabled.",
            ],
          },
        ],
      },
      {
        id: "razorpay-recovery",
        code: "02 // CHALLENGE_RETRY",
        label: "Dropped Tab & Webhook Recovery",
        description:
          "What happens when a user completes UPI PIN on their phone but closes the browser before the client verify API runs? Watch how Razorpay webhooks + Orders API recover cleanly.",
        steps: [
          {
            id: "rzp-r1",
            stepNo: "01",
            title: "Order Pending in Database",
            from: "server",
            to: "gateway",
            protocol: "REST ORDER",
            latencyLabel: "~150ms",
            summary:
              "Order is created and stored as PENDING with userId and planId metadata before checkout starts.",
            securityNote: "Storing metadata inside Razorpay `notes` helps reconcile orphaned webhooks.",
            uiPreview: {
              screenLabel: "APP // SESSION_STARTED",
              headline: "Awaiting UPI Approval",
              subtext: "User switched to PhonePe/GPay app on mobile browser.",
              statusBadge: "PENDING",
              statusTone: "warning",
              metaRows: [{ label: "ORDER_ID", value: "order_Pk9x2LmQ8vR41a" }],
            },
            requestPayload: `{ "amount": 99900, "notes": { "userId": "usr_8291a" } }`,
            responsePayload: `{ "id": "order_Pk9x2LmQ8vR41a", "status": "created" }`,
            codeSnippet: `await db.orders.create({ data: { razorpayOrderId: order.id, status: "PENDING" } });`,
            codeLang: "ts",
            gotchas: ["Never skip persisting the pending order before opening the modal."],
          },
          {
            id: "rzp-r2",
            stepNo: "02",
            title: "Bank Debits, Client Tab Closed",
            from: "client",
            to: "rail",
            protocol: "UPI INTENT",
            latencyLabel: "Dropped Tab",
            summary:
              "User enters their UPI PIN in GPay/PhonePe, money is debited, and the user swipes away the browser tab before returning.",
            securityNote:
              "Apps that rely only on frontend callbacks lose these customers and cause support tickets.",
            uiPreview: {
              screenLabel: "BROWSER // TAB_CLOSED",
              headline: "Frontend Callback Missed",
              subtext: "Client never reached /api/payments/verify — user sees debit SMS.",
              statusBadge: "CLIENT_DISCONNECTED",
              statusTone: "warning",
              metaRows: [{ label: "BANK_DEBIT", value: "Success (₹999)" }],
            },
            requestPayload: `// Client socket disconnected before handler() executed`,
            responsePayload: `// NPCI settles success directly to Razorpay gateway`,
            codeSnippet: `// No frontend code executes here — backend must rely on webhooks!`,
            codeLang: "ts",
            gotchas: ["Mobile webviews and iOS Safari frequently suspend JS tabs during UPI app switches."],
          },
          {
            id: "rzp-r3",
            stepNo: "03",
            title: "Razorpay Fires Async Webhook",
            from: "gateway",
            to: "webhook",
            protocol: "POST WEBHOOK",
            latencyLabel: "~2s",
            summary:
              "Razorpay independently receives NPCI settlement and POSTs `order.paid` / `payment.captured` to your server webhook.",
            securityNote:
              "Enable both `payment.captured` and `order.paid` with idempotent order status transitions.",
            uiPreview: {
              screenLabel: "WEBHOOK // AUTO_RECOVERY",
              headline: "Server Received order.paid",
              subtext: "Webhook automatically activates the user's plan even with zero browser session.",
              statusBadge: "RECOVERED_VIA_WEBHOOK",
              statusTone: "success",
              metaRows: [{ label: "EVENT", value: "order.paid" }],
            },
            requestPayload: `{
  "event": "order.paid",
  "payload": { "order": { "entity": { "id": "order_Pk9x2LmQ8vR41a", "status": "paid" } } }
}`,
            responsePayload: `{ "ok": true, "planActivated": true }`,
            codeSnippet: `await db.orders.updateMany({
  where: { razorpayOrderId: orderId, status: { not: "PAID" } },
  data: { status: "PAID", paymentId }
});`,
            codeLang: "ts",
            gotchas: ["Use conditional `status: { not: 'PAID' }` updates to stay idempotent."],
          },
          {
            id: "rzp-r4",
            stepNo: "04",
            title: "Manual Poll Fallback (Cron / Return)",
            from: "server",
            to: "gateway",
            protocol: "GET RECONCILE",
            latencyLabel: "~140ms",
            summary:
              "If a user returns later or a webhook is delayed, your backend calls `GET /v1/orders/:id/payments` to verify ground truth directly from Razorpay.",
            securityNote: "Never leave orders stuck in PENDING indefinitely without a reconciliation job.",
            uiPreview: {
              screenLabel: "CRON // RECONCILER",
              headline: "Ground Truth Confirmed",
              subtext: "Orders API confirms status: captured. Account upgraded seamlessly.",
              statusBadge: "RECONCILED",
              statusTone: "success",
              metaRows: [{ label: "API", value: "GET /v1/orders/:id/payments" }],
            },
            requestPayload: `GET https://api.razorpay.com/v1/orders/order_Pk9x2LmQ8vR41a/payments`,
            responsePayload: `{
  "items": [{ "id": "pay_PkA19xYz7721nQ", "status": "captured", "amount": 99900 }]
}`,
            codeSnippet: `const { items } = await razorpay.orders.fetchPayments(orderId);
const captured = items.find((p) => p.status === "captured");`,
            codeLang: "ts",
            gotchas: ["Run a 15-minute reconciliation sweep for orders still PENDING after checkout."],
          },
          {
            id: "rzp-r5",
            stepNo: "05",
            title: "User Logs Back In — Instant Access",
            from: "webhook",
            to: "client",
            protocol: "DB STATE",
            latencyLabel: "Instant",
            summary:
              "When the user re-opens your app, their dashboard reads `PAID` directly from your database with receipt already generated.",
            securityNote: "Zero manual intervention or duplicate charges.",
            uiPreview: {
              screenLabel: "APP // DASHBOARD",
              headline: "Welcome back — Pro Active",
              subtext: "Your ₹999 payment was automatically reconciled.",
              statusBadge: "ACTIVE",
              statusTone: "success",
              metaRows: [{ label: "STATUS", value: "Zero Lost Orders" }],
            },
            requestPayload: `GET /api/account/billing`,
            responsePayload: `{ "tier": "PRO", "lastPaymentStatus": "PAID" }`,
            codeSnippet: `return NextResponse.json({ activePlan: user.plan });`,
            codeLang: "ts",
            gotchas: ["Always notify the user via transactional email once webhook marks order PAID."],
          },
        ],
      },
      {
        id: "razorpay-subscription",
        code: "03 // SUBSCRIPTION_MANDATE",
        label: "UPI Autopay / Card Mandate",
        description:
          "How recurring SaaS billing works on Razorpay using Plans, Subscriptions, e-Mandates, and cycle webhooks.",
        steps: [
          {
            id: "rzp-s1",
            stepNo: "01",
            title: "Create Subscription Record",
            from: "server",
            to: "gateway",
            protocol: "POST /subscriptions",
            latencyLabel: "~190ms",
            summary:
              "Server creates a Razorpay Subscription linked to a pre-configured `plan_id` and `total_count` cycles.",
            securityNote: "Set `customer_notify: 1` or handle pre-debit notifications per RBI e-mandate rules.",
            uiPreview: {
              screenLabel: "BILLING // MANDATE_INIT",
              headline: "Subscribe — ₹999 / month",
              subtext: "Setting up recurring UPI Autopay / Card e-Mandate.",
              statusBadge: "SUB_CREATED",
              statusTone: "info",
              metaRows: [{ label: "SUB_ID", value: "sub_Q2mX8kR1pL9" }],
            },
            requestPayload: `POST /v1/subscriptions
{ "plan_id": "plan_Pro999", "total_count": 12, "customer_notify": 1 }`,
            responsePayload: `{ "id": "sub_Q2mX8kR1pL9", "status": "created" }`,
            codeSnippet: `const sub = await razorpay.subscriptions.create({
  plan_id: "plan_Pro999",
  total_count: 12,
});`,
            codeLang: "ts",
            gotchas: ["Always pass `subscription_id` (not `order_id`) when opening Checkout.js for subscriptions."],
          },
          {
            id: "rzp-s2",
            stepNo: "02",
            title: "Customer Approves e-Mandate",
            from: "client",
            to: "rail",
            protocol: "UPI AUTOPAY / SI",
            latencyLabel: "User Auth",
            summary:
              "User authorizes the recurring mandate via UPI Autopay PIN or RBI tokenized card Standing Instruction.",
            securityNote: "First debit + mandate registration occur together.",
            uiPreview: {
              screenLabel: "UPI // AUTOPAY_APPROVE",
              headline: "Authorize Recurring Mandate",
              subtext: "Max ₹999/month · Cancel anytime from UPI app or billing portal.",
              statusBadge: "MANDATE_APPROVED",
              statusTone: "success",
              metaRows: [{ label: "AUTH_TYPE", value: "UPI Autopay" }],
            },
            requestPayload: `{ "subscription_id": "sub_Q2mX8kR1pL9" }`,
            responsePayload: `{ "razorpay_subscription_id": "sub_Q2mX8kR1pL9", "razorpay_payment_id": "pay_Sub11" }`,
            codeSnippet: `new window.Razorpay({ key, subscription_id: sub.id, handler }).open();`,
            codeLang: "ts",
            gotchas: ["Signature verification for subscriptions uses `payment_id + '|' + subscription_id`!"],
          },
          {
            id: "rzp-s3",
            stepNo: "03",
            title: "subscription.authenticated",
            from: "gateway",
            to: "webhook",
            protocol: "WEBHOOK",
            latencyLabel: "~1s",
            summary:
              "Gateway confirms the mandate token is registered with the bank.",
            securityNote: "Wait for `subscription.charged` before provisioning paid quota.",
            uiPreview: {
              screenLabel: "WEBHOOK // AUTHENTICATED",
              headline: "Mandate Token Linked",
              subtext: "Waiting for Cycle #1 debit confirmation.",
              statusBadge: "AUTHENTICATED",
              statusTone: "info",
              metaRows: [{ label: "EVENT", value: "subscription.authenticated" }],
            },
            requestPayload: `{ "event": "subscription.authenticated" }`,
            responsePayload: `{ "ok": true }`,
            codeSnippet: `// Store mandate status = AUTHENTICATED`,
            codeLang: "ts",
            gotchas: ["authenticated does not always mean charged yet on all rails."],
          },
          {
            id: "rzp-s4",
            stepNo: "04",
            title: "Cycle Auto-Debit & Charged",
            from: "rail",
            to: "webhook",
            protocol: "AUTO-DEBIT",
            latencyLabel: "Monthly",
            summary:
              "Each month Razorpay automatically debits the user after RBI pre-debit notification and emits `subscription.charged`.",
            securityNote: "Extend `currentPeriodEnd` from `subscription.current_end` timestamp in the webhook.",
            uiPreview: {
              screenLabel: "BILLING // RENEWED",
              headline: "Cycle #2 Auto-Charged",
              subtext: "₹999 debited via UPI Autopay. Access extended 30 days.",
              statusBadge: "ACTIVE_RENEWED",
              statusTone: "success",
              metaRows: [{ label: "EVENT", value: "subscription.charged" }],
            },
            requestPayload: `{ "event": "subscription.charged", "payload": { "subscription": { "entity": { "current_end": 1765411200 } } } }`,
            responsePayload: `{ "renewed": true }`,
            codeSnippet: `await db.subscriptions.update({
  where: { externalId: sub.id },
  data: { status: "ACTIVE", periodEnd: new Date(sub.current_end * 1000) }
});`,
            codeLang: "ts",
            gotchas: ["Handle `subscription.halted` and `subscription.pending` to pause access on consecutive failures."],
          },
          {
            id: "rzp-s5",
            stepNo: "05",
            title: "Cancellation / Pause Handling",
            from: "server",
            to: "gateway",
            protocol: "POST /cancel",
            latencyLabel: "~160ms",
            summary:
              "User cancels at cycle end (`cancel_at_cycle_end: 1`) so they retain access until the paid period expires.",
            securityNote: "Sync cancellation state from `subscription.cancelled` webhook too (users can revoke UPI mandates directly from GPay/PhonePe).",
            uiPreview: {
              screenLabel: "BILLING // CANCEL_SCHEDULED",
              headline: "Cancels at End of Cycle",
              subtext: "Access remains active until Dec 10. No further debits.",
              statusBadge: "CANCEL_AT_PERIOD_END",
              statusTone: "warning",
              metaRows: [{ label: "TRIGGER", value: "User or UPI App Revoke" }],
            },
            requestPayload: `POST /v1/subscriptions/sub_Q2mX8kR1pL9/cancel { "cancel_at_cycle_end": 1 }`,
            responsePayload: `{ "status": "active", "ended_at": 1765411200 }`,
            codeSnippet: `await razorpay.subscriptions.cancel(subId, true);`,
            codeLang: "ts",
            gotchas: ["Users can revoke mandates inside their UPI app without touching your site — always listen to `subscription.cancelled`."],
          },
        ],
      },
    ],
  },
  {
    id: "stripe",
    categoryId: "payment-gateways",
    name: "Stripe",
    shortCode: "STR",
    subType: "GLOBAL_PG",
    subTypeLabel: "GLOBAL_PG",
    accentColor: "#635BFF",
    region: "46+ Countries · 135+ Currencies",
    architecturePattern: "PaymentIntent State Machine + Elements + Ed25519/HMAC",
    tagline:
      "Global gold-standard payment API built around PaymentIntents, idempotency keys, embedded Elements, and strict webhook signing.",
    pricingSummary: "2.9% + $0.30 (US domestic) + FX/International fees",
    settlementTime: "T+2 Days (Rolling)",
    taxCompliance: "Merchant handles tax (or add Stripe Tax @ 0.5%)",
    webhookAuth: "Stripe-Signature (t=timestamp,v1=HMAC-SHA256)",
    avgIntegrationTime: "~40 mins",
    bestFor: "Global SaaS, multi-currency apps, Stripe Connect marketplaces",
    sdks: ["TypeScript", "Node.js", "React Elements", "Python", "Go"],
    paymentMethods: ["Cards", "Apple Pay", "Google Pay", "Link", "SEPA / ACH"],
    docsUrl: "https://docs.stripe.com/payments/accept-a-payment",
    compareSummary: {
      orderModel: "PaymentIntent state machine returning a short-lived client_secret",
      checkoutUx: "Embedded <PaymentElement /> or Stripe Hosted Checkout",
      webhookHeader: "stripe-signature",
      morHandled: false,
      idealWhen: "Selling globally in USD/EUR/GBP with Apple Pay, Link & Connect splits",
    },
    scenarios: [
      {
        id: "stripe-payment-intent",
        code: "01 // HAPPY_PATH",
        label: "PaymentIntent + Elements Flow",
        description:
          "Stripe's modern PaymentIntent flow: create an intent with an Idempotency-Key on the server, render <PaymentElement />, confirm payment, and fulfill via payment_intent.succeeded.",
        steps: [
          {
            id: "str-1",
            stepNo: "01",
            title: "Request Payment Session",
            from: "client",
            to: "server",
            protocol: "HTTPS POST",
            latencyLabel: "~35ms",
            summary:
              "Client opens checkout page and asks your Next.js API route to initialize a payment for the selected SKU.",
            securityNote:
              "Never create PaymentIntents from client-supplied totals. Store price IDs server-side.",
            uiPreview: {
              screenLabel: "APP // CHECKOUT_PAGE",
              headline: "Team License — $29.00 USD",
              subtext: "Initializing Stripe Elements secure container...",
              statusBadge: "LOADING_INTENT",
              statusTone: "info",
              metaRows: [
                { label: "SKU", value: "sku_team_29" },
                { label: "CURRENCY", value: "USD (2900 cents)" },
              ],
            },
            requestPayload: `POST /api/stripe/intent
{ "priceId": "price_team_monthly", "orgId": "org_42" }`,
            responsePayload: `{ "amountCents": 2900, "currency": "usd" }`,
            codeSnippet: `const price = await getServerPrice(body.priceId); // 2900 cents`,
            codeLang: "ts",
            gotchas: ["Stripe amounts are zero-decimal integers (cents for USD, yen for JPY has no cents!)."],
          },
          {
            id: "str-2",
            stepNo: "02",
            title: "Create PaymentIntent",
            from: "server",
            to: "gateway",
            protocol: "REST + IDEMPOTENCY",
            latencyLabel: "~160ms",
            summary:
              "Server calls `stripe.paymentIntents.create()` with `automatic_payment_methods: { enabled: true }` and an `idempotencyKey`. Returns `client_secret`.",
            securityNote:
              "Pass `idempotencyKey` on network retries so a transient timeout never creates two intents.",
            uiPreview: {
              screenLabel: "STRIPE // INTENT_CREATED",
              headline: "PaymentIntent Locked",
              subtext: "pi_3QK8x... created with status: requires_payment_method.",
              statusBadge: "REQUIRES_METHOD",
              statusTone: "info",
              metaRows: [
                { label: "INTENT_ID", value: "pi_3QK8x92eZvKYlo2C" },
                { label: "SECRET", value: "pi_3QK8x..._secret_9aF" },
              ],
            },
            requestPayload: `POST https://api.stripe.com/v1/payment_intents
Idempotency-Key: chk_org42_17312291

amount=2900&currency=usd&automatic_payment_methods[enabled]=true`,
            responsePayload: `{
  "id": "pi_3QK8x92eZvKYlo2C",
  "client_secret": "pi_3QK8x92eZvKYlo2C_secret_9aF2...",
  "status": "requires_payment_method"
}`,
            codeSnippet: `const intent = await stripe.paymentIntents.create(
  {
    amount: 2900,
    currency: "usd",
    automatic_payment_methods: { enabled: true },
    metadata: { orgId: "org_42" },
  },
  { idempotencyKey: \`intent_\${orgId}_\${cartVersion}\` }
);`,
            codeLang: "ts",
            gotchas: [
              "Never log or leak the `sk_live_` secret key; only `client_secret` goes to the browser.",
            ],
          },
          {
            id: "str-3",
            stepNo: "03",
            title: "Mount <PaymentElement />",
            from: "gateway",
            to: "client",
            protocol: "ELEMENTS IFRAME",
            latencyLabel: "Interactive",
            summary:
              "React wraps the form in `<Elements stripe={promise} options={{ clientSecret }}>` and dynamically renders Apple Pay, Link, and Card fields.",
            securityNote:
              "Card PAN & CVC never touch your DOM or servers — Stripe Elements isolates them in cross-origin PCI iframes.",
            uiPreview: {
              screenLabel: "STRIPE // ELEMENTS_UI",
              headline: "Card · Apple Pay · Link",
              subtext: "PCI-isolated iframe rendered inside your native UI theme.",
              statusBadge: "READY_TO_PAY",
              statusTone: "warning",
              ctaText: "Pay $29.00 →",
              metaRows: [
                { label: "WALLETS", value: "Apple Pay · Google Pay" },
                { label: "CARD_INPUT", value: "4242 •••• •••• 4242" },
              ],
            },
            requestPayload: `<Elements stripe={stripePromise} options={{ clientSecret }}>
  <PaymentElement />
</Elements>`,
            responsePayload: `{ "elementReady": true, "availableMethods": ["card", "link", "apple_pay"] }`,
            codeSnippet: `const { error } = await stripe.confirmPayment({
  elements,
  confirmParams: { return_url: "https://app.example.com/billing/return" },
});`,
            codeLang: "tsx",
            gotchas: ["Pass `appearance` tokens matching your CSS variables so Elements matches dark/light CAD mode."],
          },
          {
            id: "str-4",
            stepNo: "04",
            title: "Confirm & Issuer 3DS2 Check",
            from: "client",
            to: "rail",
            protocol: "3DS2 / CARD NETWORK",
            latencyLabel: "~900ms",
            summary:
              "`stripe.confirmPayment()` tokenizes the card, runs Radar fraud scoring, and executes 3DS2 Strong Customer Authentication if required by the issuer bank.",
            securityNote:
              "If 3DS2 requires an iframe challenge or bank redirect, Stripe handles it automatically before returning to `return_url`.",
            uiPreview: {
              screenLabel: "ISSUER // 3DS2_VERIFIED",
              headline: "Card Authorized ($29.00)",
              subtext: "Visa network + Radar fraud check passed. Transitioning intent to succeeded.",
              statusBadge: "ISSUER_APPROVED",
              statusTone: "success",
              metaRows: [
                { label: "NETWORK", value: "Visa · Risk Score 4/100" },
                { label: "3DS2", value: "Frictionless Pass" },
              ],
            },
            requestPayload: `// Tokenized card confirmation sent directly from Elements to Stripe`,
            responsePayload: `{
  "paymentIntent": {
    "id": "pi_3QK8x92eZvKYlo2C",
    "status": "succeeded"
  }
}`,
            codeSnippet: `// On return_url page, read ?payment_intent_client_secret=
// Show "Confirming..." until webhook or retrieve() confirms succeeded.`,
            codeLang: "ts",
            gotchas: ["Always keep `return_url` for redirect-based payment methods like Klarna, iDEAL, or bank portals."],
          },
          {
            id: "str-5",
            stepNo: "05",
            title: "Stripe Fires Signed Webhook",
            from: "gateway",
            to: "webhook",
            protocol: "SIGNED WEBHOOK",
            latencyLabel: "~1.2s",
            summary:
              "Stripe sends `payment_intent.succeeded` with a timestamped `Stripe-Signature` header to prevent replay attacks.",
            securityNote:
              "Use `stripe.webhooks.constructEvent(rawBody, sig, endpointSecret)` — never parse JSON before signature verification.",
            uiPreview: {
              screenLabel: "WEBHOOK // CONSTRUCT_EVENT",
              headline: "Stripe-Signature Validated",
              subtext: "Event evt_1QK8y... verified within 300s replay window.",
              statusBadge: "SIGNATURE_VALID",
              statusTone: "success",
              metaRows: [
                { label: "EVENT", value: "payment_intent.succeeded" },
                { label: "HEADER", value: "t=1731...,v1=8a3c..." },
              ],
            },
            requestPayload: `POST /api/webhooks/stripe
Stripe-Signature: t=1731229200,v1=8a3c9e12b7...

{
  "id": "evt_1QK8yB2eZvKYlo2C",
  "type": "payment_intent.succeeded",
  "data": { "object": { "id": "pi_3QK8x92eZvKYlo2C", "amount": 2900 } }
}`,
            responsePayload: `HTTP/1.1 200 OK
{ "received": true }`,
            codeSnippet: `const rawBody = await req.text();
const sig = req.headers.get("stripe-signature")!;
const event = stripe.webhooks.constructEvent(
  rawBody,
  sig,
  process.env.STRIPE_WEBHOOK_SECRET!
);
if (event.type === "payment_intent.succeeded") {
  await fulfillOrder(event.data.object);
}`,
            codeLang: "ts",
            gotchas: [
              "In Next.js App Router Route Handlers, use `await req.text()` (not `req.json()`) so whitespace/bytes remain untouched.",
            ],
          },
          {
            id: "str-6",
            stepNo: "06",
            title: "Idempotent DB Fulfillment",
            from: "webhook",
            to: "server",
            protocol: "DB TRANSACTION",
            latencyLabel: "~18ms",
            summary:
              "Server records `event.id` in an `idempotency_events` table inside a DB transaction, unlocks team seats, and emails the Stripe receipt.",
            securityNote: "Stripe retries non-2xx responses for up to 3 days in live mode.",
            uiPreview: {
              screenLabel: "APP // SEAT_PROVISIONED",
              headline: "Team Plan Active ($29/mo)",
              subtext: "Receipt dispatched · 5 seats unlocked · Event evt_1QK8y... logged.",
              statusBadge: "FULFILLED",
              statusTone: "success",
              metaRows: [
                { label: "PROVISIONED", value: "org_42 · Pro Tier" },
                { label: "DEDUPED", value: "Yes (event.id PK)" },
              ],
            },
            requestPayload: `BEGIN;
INSERT INTO processed_events (id) VALUES ('evt_1QK8yB2eZvKYlo2C');
UPDATE organizations SET plan = 'PRO' WHERE id = 'org_42';
COMMIT;`,
            responsePayload: `{ "status": "PRO", "seats": 5 }`,
            codeSnippet: `await db.$transaction(async (tx) => {
  await tx.webhookEvent.create({ data: { id: event.id } }); // fails cleanly on duplicate
  await tx.org.update({ where: { id: orgId }, data: { plan: "PRO" } });
});`,
            codeLang: "ts",
            gotchas: ["Never rely on the success redirect page alone to grant access — fulfill exclusively via webhooks."],
          },
        ],
      },
      {
        id: "stripe-sca",
        code: "02 // CHALLENGE_RETRY",
        label: "3DS2 SCA & Requires Action",
        description:
          "How Stripe PaymentIntents handle European PSD2/Indian RBI Strong Customer Authentication (`requires_action`) and failed card retries cleanly.",
        steps: [
          {
            id: "str-sca-1",
            stepNo: "01",
            title: "Intent Created (Unconfirmed)",
            from: "server",
            to: "gateway",
            protocol: "POST /payment_intents",
            latencyLabel: "~140ms",
            summary: "Intent begins in `requires_payment_method`.",
            securityNote: "Attach `customer` ID to allow saved cards and retry tracking.",
            uiPreview: {
              screenLabel: "APP // CHECKOUT",
              headline: "Confirming Card...",
              subtext: "Submitting card to Stripe risk & SCA engine.",
              statusBadge: "CONFIRMING",
              statusTone: "info",
              metaRows: [{ label: "STATE", value: "processing" }],
            },
            requestPayload: `{ "amount": 4900, "currency": "eur" }`,
            responsePayload: `{ "status": "requires_payment_method" }`,
            codeSnippet: `const intent = await stripe.paymentIntents.create({ amount: 4900, currency: "eur" });`,
            codeLang: "ts",
            gotchas: ["European cards almost always trigger 3DS2 SCA above €30."],
          },
          {
            id: "str-sca-2",
            stepNo: "02",
            title: "Bank Demands 3DS2 Challenge",
            from: "rail",
            to: "gateway",
            protocol: "3DS2 CHALLENGE",
            latencyLabel: "~400ms",
            summary:
              "Issuer bank rejects frictionless auth and returns `next_action.use_stripe_sdk` (`status: requires_action`).",
            securityNote: "PaymentIntent stays alive for reuse if user fails OTP and retries.",
            uiPreview: {
              screenLabel: "BANK // 3DS2_MODAL",
              headline: "Bank Verification Required",
              subtext: "Approve €49.00 notification in your banking app or enter OTP.",
              statusBadge: "REQUIRES_ACTION",
              statusTone: "warning",
              ctaText: "Approve in Banking App",
              metaRows: [{ label: "NEXT_ACTION", value: "3DS2 Challenge" }],
            },
            requestPayload: `// Issuer ACS challenge URL generated`,
            responsePayload: `{ "status": "requires_action", "next_action": { "type": "use_stripe_sdk" } }`,
            codeSnippet: `// stripe.confirmPayment() renders the 3DS2 modal automatically!`,
            codeLang: "ts",
            gotchas: ["If building custom mobile flows, check `intent.status === 'requires_action'` and call `handleNextAction()`."],
          },
          {
            id: "str-sca-3",
            stepNo: "03",
            title: "User Abandons or OTP Fails",
            from: "client",
            to: "gateway",
            protocol: "CONFIRM ERROR",
            latencyLabel: "User Error",
            summary:
              "If the user fails 3DS2, PaymentIntent resets to `requires_payment_method` with `last_payment_error` populated.",
            securityNote: "Show `error.message` safely to the user and allow selecting another card on the same PaymentIntent.",
            uiPreview: {
              screenLabel: "APP // RETRY_PROMPT",
              headline: "Authentication Declined",
              subtext: "Please try another card or Apple Pay — your cart is preserved.",
              statusBadge: "RETRY_ALLOWED",
              statusTone: "warning",
              metaRows: [{ label: "WEBHOOK", value: "payment_intent.payment_failed" }],
            },
            requestPayload: `// 3DS2 challenge failed`,
            responsePayload: `{ "error": { "code": "authentication_required", "message": "Your card was declined." } }`,
            codeSnippet: `if (error) setErrorMessage(error.message ?? "Payment failed. Try another method.");`,
            codeLang: "ts",
            gotchas: ["Reuse the SAME PaymentIntent for retries instead of creating orphaned intents on every button click."],
          },
          {
            id: "str-sca-4",
            stepNo: "04",
            title: "Retry Succeeds on Backup Card",
            from: "client",
            to: "rail",
            protocol: "3DS2 PASS",
            latencyLabel: "~1.1s",
            summary:
              "Customer picks a backup card or Apple Pay; Elements confirms the exact same PaymentIntent ID cleanly.",
            securityNote: "Apple Pay / Google Pay include biometric cryptograms, bypassing manual OTP.",
            uiPreview: {
              screenLabel: "WALLET // BIOMETRIC_PASS",
              headline: "Apple Pay Biometric Verified",
              subtext: "Payment authorized in 1 tap.",
              statusBadge: "SUCCEEDED",
              statusTone: "success",
              metaRows: [{ label: "METHOD", value: "Apple Pay" }],
            },
            requestPayload: `stripe.confirmPayment({ elements })`,
            responsePayload: `{ "status": "succeeded" }`,
            codeSnippet: `// Same client_secret succeeds without duplicating orders`,
            codeLang: "ts",
            gotchas: ["Offering Apple Pay / Link cuts 3DS abandonment dramatically."],
          },
          {
            id: "str-sca-5",
            stepNo: "05",
            title: "Webhook Confirms Final State",
            from: "gateway",
            to: "webhook",
            protocol: "WEBHOOK",
            latencyLabel: "~1s",
            summary:
              "`payment_intent.succeeded` triggers fulfillment only after the retry succeeds.",
            securityNote: "Listen to `payment_intent.payment_failed` to email dunning/retry reminders.",
            uiPreview: {
              screenLabel: "APP // COMPLETE",
              headline: "Order Fulfilled (€49.00)",
              subtext: "Webhook synced after successful retry.",
              statusBadge: "FULFILLED",
              statusTone: "success",
              metaRows: [{ label: "EVENT", value: "payment_intent.succeeded" }],
            },
            requestPayload: `{ "type": "payment_intent.succeeded" }`,
            responsePayload: `{ "received": true }`,
            codeSnippet: `case "payment_intent.payment_failed": await notifyUserRetry(intent); break;`,
            codeLang: "ts",
            gotchas: ["Never grant partial access on `requires_action` or `processing`."],
          },
        ],
      },
      {
        id: "stripe-billing",
        code: "03 // SUBSCRIPTION_BILLING",
        label: "Hosted Checkout + Billing Sync",
        description:
          "Recommended SaaS subscription flow using Stripe Checkout Sessions, Customer Portal, and invoice webhooks.",
        steps: [
          {
            id: "str-b1",
            stepNo: "01",
            title: "Create Checkout Session",
            from: "server",
            to: "gateway",
            protocol: "POST /checkout/sessions",
            latencyLabel: "~180ms",
            summary: "Server creates a subscription Checkout Session with `mode: 'subscription'` and `client_reference_id`.",
            securityNote: "Link your internal `userId` in `client_reference_id` and `subscription_data.metadata`.",
            uiPreview: {
              screenLabel: "APP // PRICING_MODAL",
              headline: "Redirecting to Stripe Checkout",
              subtext: "Pre-filling customer email and promo code support.",
              statusBadge: "SESSION_CREATED",
              statusTone: "info",
              metaRows: [{ label: "MODE", value: "subscription" }],
            },
            requestPayload: `POST /v1/checkout/sessions { "mode": "subscription", "line_items": [...] }`,
            responsePayload: `{ "id": "cs_live_a1B2...", "url": "https://checkout.stripe.com/c/pay/..." }`,
            codeSnippet: `const session = await stripe.checkout.sessions.create({
  mode: "subscription",
  line_items: [{ price: "price_pro", quantity: 1 }],
  success_url: \`\${ORIGIN}/billing?success=1\`,
  cancel_url: \`\${ORIGIN}/pricing\`,
  client_reference_id: user.id,
});`,
            codeLang: "ts",
            gotchas: ["Use `allow_promotion_codes: true` for instant coupon support without custom UI."],
          },
          {
            id: "str-b2",
            stepNo: "02",
            title: "Hosted Checkout Payment",
            from: "client",
            to: "gateway",
            protocol: "HOSTED PAGE",
            latencyLabel: "User Flow",
            summary: "Stripe hosts tax/address capture, 1-click Link, Apple Pay, and card validation.",
            securityNote: "Zero PCI UI maintenance needed.",
            uiPreview: {
              screenLabel: "STRIPE // HOSTED_CHECKOUT",
              headline: "Subscribe to Acme Pro ($29/mo)",
              subtext: "Supports Apple Pay, Link, Cards, and Invoice PDFs.",
              statusBadge: "PAYING",
              statusTone: "warning",
              metaRows: [{ label: "TAX", value: "Auto-collected" }],
            },
            requestPayload: `// Redirect user to session.url`,
            responsePayload: `// Redirects back to success_url`,
            codeSnippet: `redirect(session.url!);`,
            codeLang: "ts",
            gotchas: ["Never inspect `?success=1` query params to grant access — wait for `checkout.session.completed`."],
          },
          {
            id: "str-b3",
            stepNo: "03",
            title: "checkout.session.completed",
            from: "gateway",
            to: "webhook",
            protocol: "WEBHOOK",
            latencyLabel: "~1s",
            summary: "Maps `stripeCustomerId` and `stripeSubscriptionId` to your user in PostgreSQL.",
            securityNote: "Store `stripeCustomerId` so users can open the self-serve Billing Portal later.",
            uiPreview: {
              screenLabel: "WEBHOOK // PROVISIONED",
              headline: "Customer + Sub Linked",
              subtext: "cus_R91k... saved to user profile.",
              statusBadge: "LINKED",
              statusTone: "success",
              metaRows: [{ label: "EVENT", value: "checkout.session.completed" }],
            },
            requestPayload: `{ "type": "checkout.session.completed" }`,
            responsePayload: `{ "ok": true }`,
            codeSnippet: `await db.user.update({ where: { id: session.client_reference_id! }, data: { stripeCustomerId: session.customer as string } });`,
            codeLang: "ts",
            gotchas: ["Always store both `stripeCustomerId` and `subscriptionId`."],
          },
          {
            id: "str-b4",
            stepNo: "04",
            title: "Monthly invoice.paid Renewal",
            from: "rail",
            to: "webhook",
            protocol: "RECURRING CHARGE",
            latencyLabel: "Monthly",
            summary: "Every billing cycle Stripe charges the saved method and sends `invoice.paid`.",
            securityNote: "Update `current_period_end` on every `invoice.paid` webhook.",
            uiPreview: {
              screenLabel: "BILLING // INVOICE_PAID",
              headline: "Renewal Invoice Paid",
              subtext: "PDF invoice emailed automatically. Plan extended.",
              statusBadge: "RENEWED",
              statusTone: "success",
              metaRows: [{ label: "EVENT", value: "invoice.paid" }],
            },
            requestPayload: `{ "type": "invoice.paid" }`,
            responsePayload: `{ "received": true }`,
            codeSnippet: `// Extend subscription expiry & reset monthly API quota`,
            codeLang: "ts",
            gotchas: ["Listen to `invoice.payment_failed` to show an in-app banner before Stripe's Smart Retries exhaust."],
          },
          {
            id: "str-b5",
            stepNo: "05",
            title: "Billing Portal Cancel / Upgrade",
            from: "server",
            to: "gateway",
            protocol: "PORTAL SESSION",
            latencyLabel: "~130ms",
            summary: "Open Stripe's hosted Customer Portal for plan upgrades, card updates, and cancellations.",
            securityNote: "Sync all changes via `customer.subscription.updated` & `deleted` webhooks.",
            uiPreview: {
              screenLabel: "PORTAL // SELF_SERVE",
              headline: "Manage Plan & Invoices",
              subtext: "Switch monthly → annual with automatic proration.",
              statusBadge: "PORTAL_READY",
              statusTone: "info",
              metaRows: [{ label: "PORTAL", value: "billing.stripe.com" }],
            },
            requestPayload: `POST /v1/billing_portal/sessions { "customer": "cus_R91k..." }`,
            responsePayload: `{ "url": "https://billing.stripe.com/p/session/..." }`,
            codeSnippet: `const portal = await stripe.billingPortal.sessions.create({ customer: user.stripeCustomerId });`,
            codeLang: "ts",
            gotchas: ["Handling `customer.subscription.updated` keeps plan upgrades/downgrades synced in real time."],
          },
        ],
      },
    ],
  },
  {
    id: "cashfree",
    categoryId: "payment-gateways",
    name: "Cashfree Payments",
    shortCode: "CFP",
    subType: "INDIA_PG",
    subTypeLabel: "INDIA_PG",
    accentColor: "#0D9488",
    region: "India · PG + Marketplace Payouts",
    architecturePattern: "Payment Session ID + Drop-in JS SDK + Timestamp HMAC",
    tagline:
      "Fast Indian Payment Aggregator built around `payment_session_id`, native UPI QR/Intent, and split marketplace settlements.",
    pricingSummary: "~1.90%–1.95% MDR · Free/Low UPI tiers",
    settlementTime: "T+1 / Instant Settlement option",
    taxCompliance: "Merchant handles GST invoicing",
    webhookAuth: "x-webhook-signature + x-webhook-timestamp (HMAC-SHA256 Base64)",
    avgIntegrationTime: "~40 mins",
    bestFor: "High-speed UPI conversion, marketplaces needing split payouts, lending",
    sdks: ["Node.js", "Cashfree JS v3", "React Native", "Python", "Java"],
    paymentMethods: ["UPI Intent / QR", "Cards", "PayLater", "Netbanking"],
    docsUrl: "https://www.cashfree.com/docs/payments/online/web/redirect",
    compareSummary: {
      orderModel: "Server order returns a single `payment_session_id` token",
      checkoutUx: "Drop-in Modal, Redirect, or Custom Seamless Elements",
      webhookHeader: "x-webhook-signature (Base64 HMAC of timestamp + rawBody)",
      morHandled: false,
      idealWhen: "Building Indian marketplaces needing Easy Split vendor payouts + fast T+1",
    },
    scenarios: [
      {
        id: "cashfree-session",
        code: "01 // HAPPY_PATH",
        label: "Order + Payment Session Flow",
        description:
          "Cashfree v2023-08-01 API flow: generate an order & payment_session_id on your server, launch Cashfree JS SDK, verify order status, and reconcile signed timestamped webhooks.",
        steps: [
          {
            id: "cf-1",
            stepNo: "01",
            title: "User Submits Cart",
            from: "client",
            to: "server",
            protocol: "HTTPS POST",
            latencyLabel: "~30ms",
            summary:
              "Client initiates checkout with cart ID and customer phone number (required by Cashfree for UPI/risk checks).",
            securityNote: "Cashfree requires `customer_details.customer_phone` in every PG order.",
            uiPreview: {
              screenLabel: "APP // CHECKOUT",
              headline: "Order Total — ₹1,499.00",
              subtext: "Preparing Cashfree payment session...",
              statusBadge: "PREPARING",
              statusTone: "info",
              metaRows: [
                { label: "CUSTOMER", value: "+91 98••••210" },
                { label: "AMOUNT", value: "1499.00 INR (Decimal)" },
              ],
            },
            requestPayload: `POST /api/cashfree/order
{ "cartId": "crt_771", "phone": "9876543210" }`,
            responsePayload: `{ "amount": 1499.00, "currency": "INR" }`,
            codeSnippet: `// Note: Cashfree uses decimal rupees (1499.00), NOT paise!`,
            codeLang: "ts",
            gotchas: ["Unlike Razorpay/Stripe, Cashfree `order_amount` is in major units (1499.00 = ₹1499)."],
          },
          {
            id: "cf-2",
            stepNo: "02",
            title: "Create Cashfree Order Session",
            from: "server",
            to: "gateway",
            protocol: "REST + API VERSION",
            latencyLabel: "~165ms",
            summary:
              "Server calls `POST /pg/orders` with `x-client-id`, `x-client-secret`, and `x-api-version: 2023-08-01`. Cashfree returns `payment_session_id`.",
            securityNote: "Always pin `x-api-version` header so API schema changes never break production.",
            uiPreview: {
              screenLabel: "CASHFREE // SESSION_ISSUED",
              headline: "payment_session_id Issued",
              subtext: "session_mK92... ready for Cashfree JS v3 SDK.",
              statusBadge: "ACTIVE_SESSION",
              statusTone: "info",
              metaRows: [
                { label: "ORDER_ID", value: "cf_ord_771_9921" },
                { label: "API_VER", value: "2023-08-01" },
              ],
            },
            requestPayload: `POST https://api.cashfree.com/pg/orders
x-client-id: CF_APP_ID
x-client-secret: CF_SECRET
x-api-version: 2023-08-01

{
  "order_id": "cf_ord_771_9921",
  "order_amount": 1499.00,
  "order_currency": "INR",
  "customer_details": {
    "customer_id": "usr_44",
    "customer_phone": "9876543210"
  }
}`,
            responsePayload: `{
  "cf_order_id": "21889912",
  "order_id": "cf_ord_771_9921",
  "order_status": "ACTIVE",
  "payment_session_id": "session_mK92xPqR71_live"
}`,
            codeSnippet: `const res = await fetch("https://api.cashfree.com/pg/orders", {
  method: "POST",
  headers: {
    "x-client-id": process.env.CF_CLIENT_ID!,
    "x-client-secret": process.env.CF_CLIENT_SECRET!,
    "x-api-version": "2023-08-01",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ order_id, order_amount: 1499, order_currency: "INR", customer_details }),
});`,
            codeLang: "ts",
            gotchas: ["`order_id` must be unique and alphanumeric/underscore/hyphen only."],
          },
          {
            id: "cf-3",
            stepNo: "03",
            title: "Launch Cashfree JS Checkout",
            from: "gateway",
            to: "client",
            protocol: "JS SDK v3",
            latencyLabel: "Interactive",
            summary:
              "Frontend initializes `Cashfree({ mode: 'production' })` and invokes `cashfree.checkout({ paymentSessionId, redirectTarget: '_modal' })`.",
            securityNote: "Supports modal overlay (`_modal`) or full redirect (`_self`).",
            uiPreview: {
              screenLabel: "CASHFREE // DROPIN_MODAL",
              headline: "Scan Dynamic UPI QR or Tap App",
              subtext: "Instant QR + UPI Intent + Saved Cards inside Cashfree Drop-in.",
              statusBadge: "AWAITING_PAYMENT",
              statusTone: "warning",
              ctaText: "Scan QR / Open UPI App",
              metaRows: [{ label: "TARGET", value: "_modal overlay" }],
            },
            requestPayload: `const cashfree = await load({ mode: "production" });
cashfree.checkout({
  paymentSessionId: "session_mK92xPqR71_live",
  redirectTarget: "_modal",
});`,
            responsePayload: `{ "modalOpened": true, "qrGenerated": true }`,
            codeSnippet: `const result = await cashfree.checkout({
  paymentSessionId: data.payment_session_id,
  redirectTarget: "_modal",
});
if (result.paymentDetails) {
  await verifyOrderOnServer(orderId);
}`,
            codeLang: "ts",
            gotchas: ["Modal mode works great on desktop QR; mobile deep-links often perform best with `_self` fallback."],
          },
          {
            id: "cf-4",
            stepNo: "04",
            title: "UPI / Card Switch Settlement",
            from: "client",
            to: "rail",
            protocol: "NPCI / 3DS2",
            latencyLabel: "User Auth",
            summary:
              "User scans the live QR or completes 3DS2 OTP; Cashfree receives real-time settlement notification from NPCI/acquirer.",
            securityNote: "Dynamic QR expires automatically with session TTL.",
            uiPreview: {
              screenLabel: "NPCI // DEBIT_CONFIRMED",
              headline: "₹1,499 Paid via UPI QR",
              subtext: "Bank Reference #4312990182 verified.",
              statusBadge: "SUCCESS",
              statusTone: "success",
              metaRows: [{ label: "METHOD", value: "UPI QR" }],
            },
            requestPayload: `// UPI QR scanned & PIN authenticated`,
            responsePayload: `{ "payment_status": "SUCCESS", "cf_payment_id": "38819201" }`,
            codeSnippet: `// Cashfree resolves modal promise & triggers webhook simultaneously`,
            codeLang: "ts",
            gotchas: ["Always double-check order status server-side even when modal promise resolves."],
          },
          {
            id: "cf-5",
            stepNo: "05",
            title: "Server Order Status Check",
            from: "server",
            to: "gateway",
            protocol: "GET /pg/orders/:id",
            latencyLabel: "~110ms",
            summary:
              "When client returns to `return_url` or modal closes, server fetches `GET /pg/orders/{order_id}` to confirm `order_status === 'PAID'`.",
            securityNote: "Never rely on query string parameters on `return_url`.",
            uiPreview: {
              screenLabel: "SERVER // STATUS_VERIFIED",
              headline: "Order Status: PAID",
              subtext: "Authoritative GET check confirmed ₹1,499.00 settled.",
              statusBadge: "PAID",
              statusTone: "success",
              metaRows: [{ label: "ORDER_STATUS", value: "PAID" }],
            },
            requestPayload: `GET https://api.cashfree.com/pg/orders/cf_ord_771_9921`,
            responsePayload: `{ "order_id": "cf_ord_771_9921", "order_status": "PAID" }`,
            codeSnippet: `const order = await fetchCashfreeOrder(orderId);
if (order.order_status === "PAID") { /* show confirmed UI */ }`,
            codeLang: "ts",
            gotchas: ["A single order can have multiple failed payment attempts before a successful one."],
          },
          {
            id: "cf-6",
            stepNo: "06",
            title: "Verify Timestamped Webhook",
            from: "gateway",
            to: "webhook",
            protocol: "BASE64 HMAC",
            latencyLabel: "~1.5s",
            summary:
              "Cashfree sends `PAYMENT_SUCCESS_WEBHOOK`. Server concatenates `timestamp + rawBody`, computes HMAC-SHA256 in Base64, and compares against `x-webhook-signature`.",
            securityNote:
              "Cashfree encodes signatures in Base64 (unlike Razorpay/Stripe which use hex) and prepends `x-webhook-timestamp`!",
            uiPreview: {
              screenLabel: "WEBHOOK // BASE64_VERIFIED",
              headline: "Webhook Verified & Logged",
              subtext: "Signature = Base64(HMAC_SHA256(timestamp + rawBody)).",
              statusBadge: "WEBHOOK_SYNCED",
              statusTone: "success",
              metaRows: [
                { label: "ENCODING", value: "Base64 (timestamp + rawBody)" },
                { label: "EVENT", value: "PAYMENT_SUCCESS_WEBHOOK" },
              ],
            },
            requestPayload: `POST /api/webhooks/cashfree
x-webhook-timestamp: 1731229201412
x-webhook-signature: +k9mX2L8pQ...==

{ "type": "PAYMENT_SUCCESS_WEBHOOK", "data": { "order": { "order_id": "cf_ord_771_9921" } } }`,
            responsePayload: `HTTP/1.1 200 OK`,
            codeSnippet: `const ts = req.headers.get("x-webhook-timestamp")!;
const sig = req.headers.get("x-webhook-signature")!;
const rawBody = await req.text();
const expected = crypto
  .createHmac("sha256", process.env.CF_CLIENT_SECRET!)
  .update(ts + rawBody)
  .digest("base64");
if (expected !== sig) return new Response("Invalid", { status: 401 });`,
            codeLang: "ts",
            gotchas: [
              "Do NOT forget `.digest('base64')` and prepending `x-webhook-timestamp` before `rawBody`!",
            ],
          },
        ],
      },
      {
        id: "cashfree-reconcile",
        code: "02 // PENDING_RECONCILE",
        label: "Pending UPI & Deduplication",
        description: "Handling delayed UPI bank switches and duplicate webhook retries cleanly.",
        steps: [
          {
            id: "cf-r1",
            stepNo: "01",
            title: "UPI Attempt Pending",
            from: "client",
            to: "rail",
            protocol: "UPI COLLECT",
            latencyLabel: "Waiting",
            summary: "Customer submitted VPA collect request and hasn't approved within 30s.",
            securityNote: "Show live countdown timer in UI while polling gently.",
            uiPreview: {
              screenLabel: "APP // COLLECT_WAIT",
              headline: "Waiting for UPI Approval",
              subtext: "Check your GPay/PhonePe notification.",
              statusBadge: "PENDING",
              statusTone: "warning",
              metaRows: [{ label: "TTL", value: "04:12 remaining" }],
            },
            requestPayload: `{ "channel": "upi_collect", "vpa": "user@okaxis" }`,
            responsePayload: `{ "payment_status": "PENDING" }`,
            codeSnippet: `// Poll status every 4s on client until terminal status or timeout`,
            codeLang: "ts",
            gotchas: ["Avoid aggressive 500ms polling; 3–5s interval prevents rate-limiting."],
          },
          {
            id: "cf-r2",
            stepNo: "02",
            title: "Payment Drops or Times Out",
            from: "rail",
            to: "gateway",
            protocol: "NPCI U30",
            latencyLabel: "Timeout",
            summary: "NPCI returns delayed debit or failure webhook.",
            securityNote: "Check `PAYMENT_FAILED_WEBHOOK` vs `PAYMENT_USER_DROPPED_WEBHOOK`.",
            uiPreview: {
              screenLabel: "GATEWAY // USER_DROPPED",
              headline: "User Closed Modal",
              subtext: "Order remains ACTIVE so user can retry on same session ID.",
              statusBadge: "USER_DROPPED",
              statusTone: "warning",
              metaRows: [{ label: "RETRYABLE", value: "Yes" }],
            },
            requestPayload: `{ "type": "PAYMENT_USER_DROPPED_WEBHOOK" }`,
            responsePayload: `{ "order_status": "ACTIVE" }`,
            codeSnippet: `// Keep order ACTIVE so user can retry without creating a new order`,
            codeLang: "ts",
            gotchas: ["User dropped ≠ failed forever — the order session stays valid until `order_expiry_time`."],
          },
          {
            id: "cf-r3",
            stepNo: "03",
            title: "Delayed Success Webhook Arrives",
            from: "gateway",
            to: "webhook",
            protocol: "WEBHOOK RETRY",
            latencyLabel: "+45s",
            summary: "Bank clears delayed UPI packet and fires `PAYMENT_SUCCESS_WEBHOOK`.",
            securityNote: "Verify signature and enforce unique `cf_payment_id` constraint.",
            uiPreview: {
              screenLabel: "WEBHOOK // RECONCILED",
              headline: "Delayed Payment Settled",
              subtext: "Order transitioned ACTIVE → PAID.",
              statusBadge: "PAID",
              statusTone: "success",
              metaRows: [{ label: "CF_PAYMENT_ID", value: "38819991" }],
            },
            requestPayload: `{ "type": "PAYMENT_SUCCESS_WEBHOOK", "data": { "payment": { "cf_payment_id": "38819991" } } }`,
            responsePayload: `{ "ok": true }`,
            codeSnippet: `await db.payment.upsert({ where: { cfPaymentId }, create: {...}, update: { status: "PAID" } });`,
            codeLang: "ts",
            gotchas: ["Always key idempotency on `cf_payment_id` + `order_id`."],
          },
          {
            id: "cf-r4",
            stepNo: "04",
            title: "Status Endpoint Cross-Check",
            from: "server",
            to: "gateway",
            protocol: "GET /payments",
            latencyLabel: "~120ms",
            summary: "Confirm exact payment list via `GET /pg/orders/{order_id}/payments`.",
            securityNote: "Ensures zero mismatch between webhook and ledger.",
            uiPreview: {
              screenLabel: "SERVER // AUDIT_MATCH",
              headline: "100% Ledger Match",
              subtext: "API confirms single SUCCESS payment.",
              statusBadge: "AUDITED",
              statusTone: "success",
              metaRows: [{ label: "COUNT", value: "1 SUCCESS" }],
            },
            requestPayload: `GET /pg/orders/cf_ord_771_9921/payments`,
            responsePayload: `[{ "payment_status": "SUCCESS", "payment_amount": 1499.00 }]`,
            codeSnippet: `const payments = await fetch(\`https://api.cashfree.com/pg/orders/\${id}/payments\`);`,
            codeLang: "ts",
            gotchas: ["Useful for building an admin 'Force Sync Order' button."],
          },
          {
            id: "cf-r5",
            stepNo: "05",
            title: "Customer Receipt Dispatched",
            from: "webhook",
            to: "client",
            protocol: "EMAIL / SOCKET",
            latencyLabel: "Instant",
            summary: "Trigger real-time UI update and invoice email.",
            securityNote: "Idempotent flag prevents sending 2 emails on webhook retry.",
            uiPreview: {
              screenLabel: "APP // CONFIRMED",
              headline: "Order Confirmed!",
              subtext: "Invoice sent to customer email.",
              statusBadge: "COMPLETE",
              statusTone: "success",
              metaRows: [{ label: "RECEIPT", value: "Sent Once" }],
            },
            requestPayload: `{ "orderId": "cf_ord_771_9921", "emailed": true }`,
            responsePayload: `{ "done": true }`,
            codeSnippet: `if (!order.receiptSent) await sendReceiptEmail(order);`,
            codeLang: "ts",
            gotchas: ["Guard email sending with a boolean `receiptSent` column in the same DB transaction."],
          },
        ],
      },
      {
        id: "cashfree-splits",
        code: "03 // EASY_SPLIT",
        label: "Marketplace Vendor Split",
        description: "Multi-vendor split settlement where Cashfree automatically routes platform commission and vendor shares.",
        steps: [
          {
            id: "cf-s1",
            stepNo: "01",
            title: "Attach Split Rules to Order",
            from: "server",
            to: "gateway",
            protocol: "POST /pg/orders",
            latencyLabel: "~170ms",
            summary: "Include `order_splits` array specifying `vendor_id` and `percentage` / `amount`.",
            securityNote: "Compute vendor commissions strictly server-side.",
            uiPreview: {
              screenLabel: "MARKETPLACE // SPLIT_CART",
              headline: "Total ₹2,000 (90% Vendor / 10% Platform)",
              subtext: "Vendor KYC verified via Cashfree Easy Split.",
              statusBadge: "SPLIT_CONFIGURED",
              statusTone: "info",
              metaRows: [{ label: "VENDOR_SHARE", value: "₹1,800.00" }],
            },
            requestPayload: `{
  "order_amount": 2000,
  "order_splits": [{ "vendor_id": "vnd_901", "percentage": 90 }]
}`,
            responsePayload: `{ "order_id": "cf_mkt_901", "payment_session_id": "session_..." }`,
            codeSnippet: `order_splits: [{ vendor_id: seller.cfVendorId, amount: 1800 }]`,
            codeLang: "ts",
            gotchas: ["Vendor must be onboarded & KYC approved via Cashfree Vendors API first."],
          },
          {
            id: "cf-s2",
            stepNo: "02",
            title: "Buyer Completes Checkout",
            from: "client",
            to: "rail",
            protocol: "UPI / CARD",
            latencyLabel: "User Auth",
            summary: "Buyer pays single combined total ₹2,000 seamlessly.",
            securityNote: "Buyer sees one clean checkout, unaware of backend splits.",
            uiPreview: {
              screenLabel: "BUYER // PAID",
              headline: "Paid ₹2,000.00",
              subtext: "Single unified checkout completed.",
              statusBadge: "CAPTURED",
              statusTone: "success",
              metaRows: [{ label: "GROSS", value: "₹2,000" }],
            },
            requestPayload: `cashfree.checkout({ paymentSessionId })`,
            responsePayload: `{ "payment_status": "SUCCESS" }`,
            codeSnippet: `// Standard Cashfree JS SDK checkout`,
            codeLang: "ts",
            gotchas: ["Supports post-payment delayed splits too if fulfillment takes days."],
          },
          {
            id: "cf-s3",
            stepNo: "03",
            title: "Escrow / Commission Split",
            from: "gateway",
            to: "webhook",
            protocol: "SPLIT LEDGER",
            latencyLabel: "Auto",
            summary: "Cashfree deducts MDR and allocates ₹1,800 to vendor ledger and ₹200 to platform.",
            securityNote: "Verify webhook before releasing digital goods.",
            uiPreview: {
              screenLabel: "LEDGER // SPLIT_APPLIED",
              headline: "Split Ledger Credited",
              subtext: "Vendor: ₹1,800 · Platform Fee: ₹200.",
              statusBadge: "SPLIT_SETTLED",
              statusTone: "info",
              metaRows: [{ label: "PLATFORM_FEE", value: "₹200.00" }],
            },
            requestPayload: `{ "type": "PAYMENT_SUCCESS_WEBHOOK" }`,
            responsePayload: `{ "splitApplied": true }`,
            codeSnippet: `// Record platform fee + vendor net payout in marketplace ledger`,
            codeLang: "ts",
            gotchas: ["Check `split_after_payment` if you need escrow hold until delivery confirmation."],
          },
          {
            id: "cf-s4",
            stepNo: "04",
            title: "Hold / Release Escrow Trigger",
            from: "server",
            to: "gateway",
            protocol: "POST /split",
            latencyLabel: "~140ms",
            summary: "Optionally release vendor funds upon order delivery confirmation.",
            securityNote: "Prevents premature payout before return window closes.",
            uiPreview: {
              screenLabel: "VENDOR // PAYOUT_QUEUED",
              headline: "Delivery Confirmed → Payout Released",
              subtext: "Vendor bank transfer initiated for next settlement batch.",
              statusBadge: "PAYOUT_QUEUED",
              statusTone: "success",
              metaRows: [{ label: "SETTLEMENT", value: "T+1 Bank Credit" }],
            },
            requestPayload: `POST /pg/orders/cf_mkt_901/split { "split": [...] }`,
            responsePayload: `{ "status": "SUCCESS" }`,
            codeSnippet: `// Trigger split release only when shipment status === DELIVERED`,
            codeLang: "ts",
            gotchas: ["Ensure refund deduction logic handles post-split refunds."],
          },
          {
            id: "cf-s5",
            stepNo: "05",
            title: "Vendor Bank Settlement",
            from: "rail",
            to: "webhook",
            protocol: "IMPS / NEFT",
            latencyLabel: "T+1",
            summary: "Cashfree settles directly to vendor's verified bank account and emits settlement UTR webhook.",
            securityNote: "Store UTR number for vendor tax & payout dashboards.",
            uiPreview: {
              screenLabel: "VENDOR // SETTLED",
              headline: "₹1,800 Settled (UTR #4312...)",
              subtext: "Direct bank settlement completed without manual payouts.",
              statusBadge: "SETTLED",
              statusTone: "success",
              metaRows: [{ label: "UTR", value: "AXISCN09128412" }],
            },
            requestPayload: `{ "type": "SETTLEMENT_SUCCESS" }`,
            responsePayload: `{ "utr": "AXISCN09128412" }`,
            codeSnippet: `// Display settlement UTR in vendor payout table`,
            codeLang: "ts",
            gotchas: ["Reconcile UTRs daily against your platform commission report."],
          },
        ],
      },
    ],
  },
  {
    id: "phonepe",
    categoryId: "payment-gateways",
    name: "PhonePe PG",
    shortCode: "PPE",
    subType: "INDIA_PG",
    subTypeLabel: "INDIA_PG",
    accentColor: "#6739B7",
    region: "India · UPI Switch & Standard Checkout v2",
    architecturePattern: "OAuth2 Token + Pay Page / UPI Intent + Status Poll",
    tagline:
      "UPI-first powerhouse built on OAuth v2 tokens, ultra-high UPI app intent conversion, S2S callbacks, and strict Status API checks.",
    pricingSummary: "Competitive UPI + Card MDR (custom/slab pricing)",
    settlementTime: "T+1 Working Day",
    taxCompliance: "Merchant handles GST invoicing",
    webhookAuth: "Authorization Basic/SHA256(user:pass) Callback Verification",
    avgIntegrationTime: "~1 hour",
    bestFor: "Mobile-first Indian apps prioritizing maximum UPI success rates",
    sdks: ["REST v2", "Node.js", "Android Intent SDK", "iOS", "React Native"],
    paymentMethods: ["UPI Intent", "UPI Collect", "PhonePe Wallet", "Cards"],
    docsUrl: "https://developer.phonepe.com/v1/docs/payment-gateway",
    compareSummary: {
      orderModel: "OAuth O-Bearer token + POST /checkout/v2/pay returning redirectUrl",
      checkoutUx: "Hosted PayPage / Iframe or Native Mobile UPI App Intent",
      webhookHeader: "Authorization (SHA256 username:password) + S2S payload",
      morHandled: false,
      idealWhen: "Optimizing India UPI Intent conversion on mobile apps & web",
    },
    scenarios: [
      {
        id: "phonepe-v2",
        code: "01 // HAPPY_PATH",
        label: "OAuth v2 + PayPage / UPI Intent",
        description:
          "PhonePe Standard Checkout v2 flow: obtain & cache OAuth token, call /checkout/v2/pay, redirect or open PayPage iframe, and confirm via S2S callback + Status API.",
        steps: [
          {
            id: "pp-1",
            stepNo: "01",
            title: "Fetch & Cache OAuth Token",
            from: "server",
            to: "gateway",
            protocol: "OAUTH2 FORM",
            latencyLabel: "~95ms",
            summary:
              "In PhonePe v2, your backend authenticates with `client_id` + `client_secret` at `/v1/oauth/token` and caches the `O-Bearer` access token in Redis until `expires_at`.",
            securityNote:
              "Do NOT call `/v1/oauth/token` on every checkout — cache it safely and refresh before expiry.",
            uiPreview: {
              screenLabel: "SERVER // TOKEN_CACHE",
              headline: "O-Bearer Token Ready",
              subtext: "Cached in Redis (TTL 55m). Proceeding to initiate payment.",
              statusBadge: "AUTH_CACHED",
              statusTone: "info",
              metaRows: [{ label: "GRANT", value: "client_credentials" }],
            },
            requestPayload: `POST https://api.phonepe.com/apis/identity-manager/v1/oauth/token
Content-Type: application/x-www-form-urlencoded

client_id=M_CLIENT_ID&client_version=1&client_secret=SECRET&grant_type=client_credentials`,
            responsePayload: `{
  "access_token": "eyJhbGciOiJSUzI1NiIs...",
  "expires_at": 1731232800,
  "token_type": "O-Bearer"
}`,
            codeSnippet: `const token = await redis.get("phonepe:token") ?? await fetchAndCachePhonePeToken();`,
            codeLang: "ts",
            gotchas: ["Calling the token endpoint unnecessarily adds ~100ms latency and risks rate limits."],
          },
          {
            id: "pp-2",
            stepNo: "02",
            title: "Initiate /checkout/v2/pay",
            from: "server",
            to: "gateway",
            protocol: "HTTPS POST",
            latencyLabel: "~160ms",
            summary:
              "Server POSTs `merchantOrderId` and `amount` (in paise) with `Authorization: O-Bearer <token>`. PhonePe responds with `redirectUrl`.",
            securityNote: "`merchantOrderId` must be globally unique per attempt (max 63 chars).",
            uiPreview: {
              screenLabel: "PHONEPE // PAYPAGE_URL",
              headline: "Checkout URL Generated",
              subtext: "orderId: PPE_ORD_9912 · Amount: ₹499.00 (49900 paise).",
              statusBadge: "URL_ISSUED",
              statusTone: "info",
              metaRows: [
                { label: "ORDER_ID", value: "PPE_ORD_9912" },
                { label: "EXPIRE_AFTER", value: "1200s" },
              ],
            },
            requestPayload: `POST https://api.phonepe.com/apis/pg/checkout/v2/pay
Authorization: O-Bearer eyJhbGci...

{
  "merchantOrderId": "PPE_ORD_9912",
  "amount": 49900,
  "expireAfter": 1200,
  "paymentFlow": {
    "type": "PG_CHECKOUT",
    "merchantUrls": { "redirectUrl": "https://app.example.com/pay/status?id=PPE_ORD_9912" }
  }
}`,
            responsePayload: `{
  "orderId": "OMO2411101542...",
  "state": "PENDING",
  "redirectUrl": "https://mercury-t2.phonepe.com/transact/pg?token=..."
}`,
            codeSnippet: `const res = await fetch("https://api.phonepe.com/apis/pg/checkout/v2/pay", {
  method: "POST",
  headers: { Authorization: \`O-Bearer \${token}\`, "Content-Type": "application/json" },
  body: JSON.stringify({ merchantOrderId, amount: 49900, paymentFlow }),
});`,
            codeLang: "ts",
            gotchas: ["PhonePe v2 uses paise (`49900` = ₹499), and minimum amount is 100 paise (₹1)."],
          },
          {
            id: "pp-3",
            stepNo: "03",
            title: "Open PayPage / UPI Switch",
            from: "gateway",
            to: "client",
            protocol: "IFRAME / REDIRECT",
            latencyLabel: "Interactive",
            summary:
              "Client opens `redirectUrl` inside PhonePe Checkout iframe (`window.PhonePeCheckout.transact`) or redirects cleanly.",
            securityNote: "Iframe mode keeps users on your domain; redirect mode works seamlessly in mobile webviews.",
            uiPreview: {
              screenLabel: "PHONEPE // CHECKOUT_PAGE",
              headline: "Pay ₹499 with PhonePe / UPI",
              subtext: "1-tap PhonePe · GPay · Paytm · RuPay Credit on UPI.",
              statusBadge: "USER_SELECTING",
              statusTone: "warning",
              ctaText: "Open PhonePe App →",
              metaRows: [{ label: "MODE", value: "PayPage Iframe / App Switch" }],
            },
            requestPayload: `window.PhonePeCheckout.transact({
  tokenUrl: data.redirectUrl,
  type: "IFRAME",
  callback: (res) => checkServerStatus()
});`,
            responsePayload: `{ "state": "USER_LAUNCHED_UPI" }`,
            codeSnippet: `window.PhonePeCheckout.transact({ tokenUrl: redirectUrl, type: "IFRAME", callback: onComplete });`,
            codeLang: "ts",
            gotchas: ["Never treat the JS `callback` alone as proof of payment — always hit your backend Status API check."],
          },
          {
            id: "pp-4",
            stepNo: "04",
            title: "UPI Switch Pin Verification",
            from: "client",
            to: "rail",
            protocol: "NPCI UPI",
            latencyLabel: "User Auth",
            summary:
              "User approves payment in PhonePe / any UPI app. PhonePe's switch clears the transaction directly with NPCI.",
            securityNote: "Zero card/PIN data ever enters your site.",
            uiPreview: {
              screenLabel: "UPI // PIN_VERIFIED",
              headline: "₹499 Debited Successfully",
              subtext: "NPCI settlement confirmed to PhonePe PG.",
              statusBadge: "NPCI_SUCCESS",
              statusTone: "success",
              metaRows: [{ label: "RAIL", value: "PhonePe UPI Switch" }],
            },
            requestPayload: `// Customer completes UPI PIN`,
            responsePayload: `{ "state": "COMPLETED", "utr": "431277192011" }`,
            codeSnippet: `// PhonePe now sends S2S webhook AND redirects user back to redirectUrl`,
            codeLang: "ts",
            gotchas: ["Redirecting back to `redirectUrl` does NOT pass payment status in URL params in v2 — you must check Status API."],
          },
          {
            id: "pp-5",
            stepNo: "05",
            title: "Verify S2S Callback Auth",
            from: "gateway",
            to: "webhook",
            protocol: "S2S WEBHOOK",
            latencyLabel: "~1s",
            summary:
              "PhonePe POSTs event (`checkout.order.completed`) to your callback URL. Verify the `Authorization` header equals `SHA256(username:password)`.",
            securityNote:
              "Configure webhook username + password in PhonePe Business Dashboard and verify the SHA-256 hash strictly.",
            uiPreview: {
              screenLabel: "WEBHOOK // S2S_VERIFIED",
              headline: "S2S Callback Authenticated",
              subtext: "checkout.order.completed matched dashboard credentials.",
              statusBadge: "CALLBACK_VALID",
              statusTone: "success",
              metaRows: [{ label: "EVENT", value: "checkout.order.completed" }],
            },
            requestPayload: `POST /api/webhooks/phonepe
Authorization: <SHA256(webhookUser:webhookPass)>

{
  "event": "checkout.order.completed",
  "payload": { "merchantOrderId": "PPE_ORD_9912", "state": "COMPLETED", "amount": 49900 }
}`,
            responsePayload: `HTTP/1.1 200 OK`,
            codeSnippet: `const expectedAuth = crypto
  .createHash("sha256")
  .update(\`\${process.env.PPE_WEBHOOK_USER}:\${process.env.PPE_WEBHOOK_PASS}\`)
  .digest("hex");
if (req.headers.get("authorization") !== expectedAuth) return new Response("401", { status: 401 });`,
            codeLang: "ts",
            gotchas: ["Notice PhonePe v2 verifies callback using `SHA256(username:password)` in `Authorization`, not HMAC of body!"],
          },
          {
            id: "pp-6",
            stepNo: "06",
            title: "Order Status API Cross-Check",
            from: "server",
            to: "gateway",
            protocol: "GET /status",
            latencyLabel: "~110ms",
            summary:
              "On `redirectUrl` load, your backend calls `GET /checkout/v2/order/{merchantOrderId}/status` to display confirmed order status immediately.",
            securityNote: "Confirm both `state === 'COMPLETED'` AND `amount === expectedAmount`.",
            uiPreview: {
              screenLabel: "APP // THANK_YOU",
              headline: "Order #PPE_ORD_9912 Confirmed",
              subtext: "Verified via Order Status API & S2S Webhook.",
              statusBadge: "COMPLETED",
              statusTone: "success",
              metaRows: [{ label: "STATE", value: "COMPLETED" }],
            },
            requestPayload: `GET https://api.phonepe.com/apis/pg/checkout/v2/order/PPE_ORD_9912/status
Authorization: O-Bearer <token>`,
            responsePayload: `{ "orderId": "OMO...", "state": "COMPLETED", "amount": 49900 }`,
            codeSnippet: `const status = await checkPhonePeOrderStatus(merchantOrderId);
if (status.state === "COMPLETED" && status.amount === expectedPaise) { /* unlock */ }`,
            codeLang: "ts",
            gotchas: ["Never skip checking `status.amount` matches your DB record."],
          },
        ],
      },
      {
        id: "phonepe-polling",
        code: "02 // PENDING_POLLING",
        label: "Pending State & Backoff Poller",
        description:
          "PhonePe explicitly documents a mandatory Status Reconciliation polling schedule when an order stays `PENDING`.",
        steps: [
          {
            id: "pp-p1",
            stepNo: "01",
            title: "Redirect Returns PENDING",
            from: "client",
            to: "server",
            protocol: "GET /status",
            latencyLabel: "~110ms",
            summary: "User returns to your site while NPCI is still settling bank status (`state: PENDING`).",
            securityNote: "Do not treat `PENDING` as `FAILED`! Show a waiting screen.",
            uiPreview: {
              screenLabel: "APP // VERIFYING_BANK",
              headline: "Confirming with Bank...",
              subtext: "Do not close or refresh. Checking payment status automatically.",
              statusBadge: "PENDING",
              statusTone: "warning",
              metaRows: [{ label: "STATE", value: "PENDING" }],
            },
            requestPayload: `GET /checkout/v2/order/PPE_ORD_9912/status`,
            responsePayload: `{ "state": "PENDING" }`,
            codeSnippet: `// Show processing spinner; start backoff poll`,
            codeLang: "ts",
            gotchas: ["Prematurely marking PENDING as FAILED causes angry double-payments."],
          },
          {
            id: "pp-p2",
            stepNo: "02",
            title: "Backoff Poll Schedule",
            from: "server",
            to: "gateway",
            protocol: "SCHEDULED POLL",
            latencyLabel: "3s → 6s → 10s",
            summary: "Poll Status API on PhonePe's recommended schedule (e.g., every 3s for 30s, then 6s, then 1m) until terminal state.",
            securityNote: "Stop immediately once state becomes `COMPLETED` or `FAILED`.",
            uiPreview: {
              screenLabel: "WORKER // POLLING",
              headline: "Status Check #3 (t+12s)",
              subtext: "Awaiting NPCI final confirmation...",
              statusBadge: "POLLING",
              statusTone: "info",
              metaRows: [{ label: "NEXT_POLL", value: "6s" }],
            },
            requestPayload: `GET /checkout/v2/order/PPE_ORD_9912/status`,
            responsePayload: `{ "state": "PENDING" }`,
            codeSnippet: `// Background job / queue retry with exponential backoff`,
            codeLang: "ts",
            gotchas: ["Never hammer the status API every 200ms."],
          },
          {
            id: "pp-p3",
            stepNo: "03",
            title: "Terminal COMPLETED Received",
            from: "gateway",
            to: "webhook",
            protocol: "STATUS + S2S",
            latencyLabel: "Resolved",
            summary: "NPCI finalizes transaction; both Status API and S2S callback report `COMPLETED`.",
            securityNote: "Lock order row in DB so poll + webhook race condition cannot double-fulfill.",
            uiPreview: {
              screenLabel: "APP // RESOLVED",
              headline: "Payment Confirmed!",
              subtext: "NPCI cleared delayed transaction cleanly.",
              statusBadge: "COMPLETED",
              statusTone: "success",
              metaRows: [{ label: "TERMINAL", value: "COMPLETED" }],
            },
            requestPayload: `{ "state": "COMPLETED" }`,
            responsePayload: `{ "fulfilled": true }`,
            codeSnippet: `await db.orders.updateMany({ where: { id, state: "PENDING" }, data: { state: "COMPLETED" } });`,
            codeLang: "ts",
            gotchas: ["Always use atomic conditional updates when both poller & webhook run."],
          },
          {
            id: "pp-p4",
            stepNo: "04",
            title: "Or Terminal FAILED → Release Cart",
            from: "rail",
            to: "server",
            protocol: "STATE FAILED",
            latencyLabel: "Resolved",
            summary: "If NPCI declines after timeout, order moves to `FAILED` and inventory reservation is released.",
            securityNote: "Give user a 1-click button generating a brand-new `merchantOrderId`.",
            uiPreview: {
              screenLabel: "APP // FAILED_RETRY",
              headline: "Bank Timed Out",
              subtext: "No money deducted (or auto-reversed). Retry with a fresh link.",
              statusBadge: "FAILED",
              statusTone: "warning",
              ctaText: "Retry Payment →",
              metaRows: [{ label: "ERROR", value: "PAYMENT_TIMED_OUT" }],
            },
            requestPayload: `{ "state": "FAILED", "errorCode": "ZM_TIMEOUT" }`,
            responsePayload: `{ "canRetry": true }`,
            codeSnippet: `// Generate new merchantOrderId on retry`,
            codeLang: "ts",
            gotchas: ["Never reuse a FAILED `merchantOrderId` for a new attempt."],
          },
          {
            id: "pp-p5",
            stepNo: "05",
            title: "Audit Log & Receipt",
            from: "webhook",
            to: "client",
            protocol: "LEDGER",
            latencyLabel: "Instant",
            summary: "User receives confirmation or clean retry option with zero orphan charges.",
            securityNote: "Maintain transactionId + merchantOrderId audit trail.",
            uiPreview: {
              screenLabel: "LEDGER // RECONCILED",
              headline: "Zero Orphan Transactions",
              subtext: "Terminal state strictly enforced.",
              statusBadge: "AUDITED",
              statusTone: "success",
              metaRows: [{ label: "RECONCILED", value: "100%" }],
            },
            requestPayload: `{ "audited": true }`,
            responsePayload: `{ "ok": true }`,
            codeSnippet: `// Log terminal state transition`,
            codeLang: "ts",
            gotchas: ["Keep raw callback JSON in an audit column for financial debugging."],
          },
        ],
      },
      {
        id: "phonepe-refund",
        code: "03 // REFUND_FLOW",
        label: "Instant Refund & Status Track",
        description: "Triggering full or partial refunds via PhonePe v2 Refund API and tracking NPCI reversal.",
        steps: [
          {
            id: "pp-rf1",
            stepNo: "01",
            title: "Merchant Triggers Refund API",
            from: "server",
            to: "gateway",
            protocol: "POST /refund",
            latencyLabel: "~150ms",
            summary: "Admin triggers refund with unique `merchantRefundId` and `originalMerchantOrderId`.",
            securityNote: "Verify cumulative refunds never exceed original captured amount.",
            uiPreview: {
              screenLabel: "ADMIN // REFUND_INIT",
              headline: "Refunding ₹499.00",
              subtext: "Submitting refund request to PhonePe PG.",
              statusBadge: "REFUND_INIT",
              statusTone: "info",
              metaRows: [{ label: "REFUND_ID", value: "RF_PPE_9912_1" }],
            },
            requestPayload: `POST /apis/pg/payments/v2/refund
{ "merchantRefundId": "RF_PPE_9912_1", "originalMerchantOrderId": "PPE_ORD_9912", "amount": 49900 }`,
            responsePayload: `{ "refundId": "OMR...", "state": "PENDING" }`,
            codeSnippet: `await phonepeRefund({ merchantRefundId, originalMerchantOrderId, amount: 49900 });`,
            codeLang: "ts",
            gotchas: ["Partial refunds are supported as long as total <= original paid amount."],
          },
          {
            id: "pp-rf2",
            stepNo: "02",
            title: "PhonePe Queues NPCI Reversal",
            from: "gateway",
            to: "rail",
            protocol: "NPCI REVERSAL",
            latencyLabel: "Async",
            summary: "PhonePe routes reversal instruction to the customer's issuing bank.",
            securityNote: "UPI refunds usually reflect within minutes to 24h; Cards 3–5 days.",
            uiPreview: {
              screenLabel: "NPCI // REVERSAL_SENT",
              headline: "Reversal Sent to Bank",
              subtext: "Bank processing refund to original UPI VPA.",
              statusBadge: "PROCESSING",
              statusTone: "warning",
              metaRows: [{ label: "RAIL", value: "UPI Reversal" }],
            },
            requestPayload: `// NPCI refund batch initiated`,
            responsePayload: `{ "state": "CONFIRMED" }`,
            codeSnippet: `// Mark local refund record = PROCESSING`,
            codeLang: "ts",
            gotchas: ["Show 'Refund Initiated — ETA 1-3 days' in customer UI immediately."],
          },
          {
            id: "pp-rf3",
            stepNo: "03",
            title: "pg.refund.completed Webhook",
            from: "gateway",
            to: "webhook",
            protocol: "S2S WEBHOOK",
            latencyLabel: "Async",
            summary: "Webhook notifies your backend when reversal succeeds (`pg.refund.completed`) or fails.",
            securityNote: "Revoke order entitlements or license keys on refund completion.",
            uiPreview: {
              screenLabel: "WEBHOOK // REFUND_DONE",
              headline: "Refund Completed (₹499)",
              subtext: "pg.refund.completed verified & order marked REFUNDED.",
              statusBadge: "REFUNDED",
              statusTone: "success",
              metaRows: [{ label: "EVENT", value: "pg.refund.completed" }],
            },
            requestPayload: `{ "event": "pg.refund.completed", "payload": { "merchantRefundId": "RF_PPE_9912_1", "state": "COMPLETED" } }`,
            responsePayload: `{ "ok": true }`,
            codeSnippet: `if (event === "pg.refund.completed") await revokeOrderAccess(originalOrderId);`,
            codeLang: "ts",
            gotchas: ["Track refund status via `GET /payments/v2/refund/{merchantRefundId}/status` if webhook is delayed."],
          },
          {
            id: "pp-rf4",
            stepNo: "04",
            title: "Ledger Deduction Synced",
            from: "webhook",
            to: "server",
            protocol: "DB SYNC",
            latencyLabel: "~15ms",
            summary: "Store refunded amount and credit note invoice in accounting tables.",
            securityNote: "Prevent duplicate refund button clicks using `merchantRefundId` lock.",
            uiPreview: {
              screenLabel: "ACCOUNTING // CREDIT_NOTE",
              headline: "Credit Note Issued",
              subtext: "GST credit note synced for ₹499.00.",
              statusBadge: "SYNCED",
              statusTone: "success",
              metaRows: [{ label: "BALANCE", value: "₹0.00 Net" }],
            },
            requestPayload: `{ "refundedAmount": 49900 }`,
            responsePayload: `{ "creditNote": "CN-2026-88" }`,
            codeSnippet: `// Generate GST credit note PDF`,
            codeLang: "ts",
            gotchas: ["Ensure refund button is disabled while a PENDING refund exists."],
          },
          {
            id: "pp-rf5",
            stepNo: "05",
            title: "Customer Confirmation Email",
            from: "server",
            to: "client",
            protocol: "NOTIFICATION",
            latencyLabel: "Instant",
            summary: "Customer receives refund ARN/UTR reference for bank tracking.",
            securityNote: "Providing UTR eliminates 90% of refund support queries.",
            uiPreview: {
              screenLabel: "APP // REFUND_RECEIPT",
              headline: "₹499 Refunded to UPI",
              subtext: "Ref UTR included in email confirmation.",
              statusBadge: "NOTIFIED",
              statusTone: "success",
              metaRows: [{ label: "CUSTOMER", value: "Email Dispatched" }],
            },
            requestPayload: `{ "notify": true }`,
            responsePayload: `{ "sent": true }`,
            codeSnippet: `await sendRefundReceiptEmail(user.email, refund);`,
            codeLang: "ts",
            gotchas: ["Always include the PhonePe refund reference ID in the email."],
          },
        ],
      },
    ],
  },
  {
    id: "paypal",
    categoryId: "payment-gateways",
    name: "PayPal (Orders v2)",
    shortCode: "PPL",
    subType: "GLOBAL_PG",
    subTypeLabel: "GLOBAL_PG",
    accentColor: "#0070BA",
    region: "200+ Markets · Global Wallet & Cards",
    architecturePattern: "OAuth2 + 2-Step Create Order → Client Approve → Server Capture",
    tagline:
      "Trusted worldwide consumer wallet with explicit two-phase Create → Buyer Approve → Server Capture Orders v2 lifecycle.",
    pricingSummary: "2.99%–3.49% + fixed fee (+ currency conversion spread)",
    settlementTime: "Instant to PayPal Balance → 1–3d Bank Transfer",
    taxCompliance: "Merchant handles global tax",
    webhookAuth: "PAYPAL-TRANSMISSION-SIG (Cert URL + CRC32 + RSA Verify API)",
    avgIntegrationTime: "~50 mins",
    bestFor: "Cross-border consumer products, freelance platforms, PayPal-trust buyers",
    sdks: ["@paypal/react-paypal-js", "Node Server SDK", "REST Orders v2"],
    paymentMethods: ["PayPal Wallet", "Pay Later", "Venmo (US)", "Guest Cards"],
    docsUrl: "https://developer.paypal.com/docs/checkout/standard/integrate/",
    compareSummary: {
      orderModel: "2-Phase: Server creates order (no charge yet) → Client approves → Server captures",
      checkoutUx: "Smart Payment Buttons opening PayPal Popup / Card Fields",
      webhookHeader: "paypal-transmission-sig + verify-webhook-signature API",
      morHandled: false,
      idealWhen: "Capturing global consumer buyers who prefer paying with PayPal balance/Venmo",
    },
    scenarios: [
      {
        id: "paypal-orders-v2",
        code: "01 // HAPPY_PATH",
        label: "Orders v2 Create → Approve → Capture",
        description:
          "Unlike Stripe/Razorpay, PayPal Orders v2 separates buyer approval from funds capture: your server MUST call `/capture` inside `onApprove` before money moves.",
        steps: [
          {
            id: "pp2-1",
            stepNo: "01",
            title: "Render <PayPalButtons />",
            from: "client",
            to: "server",
            protocol: "CREATE_ORDER CB",
            latencyLabel: "On Click",
            summary:
              "User clicks the PayPal button. `createOrder` callback hits your backend to create an authoritative Order v2.",
            securityNote: "Never call `actions.order.create()` on the frontend with hardcoded prices — always create orders on your server!",
            uiPreview: {
              screenLabel: "APP // SMART_BUTTONS",
              headline: "Digital Bundle — $49.00 USD",
              subtext: "User clicked PayPal Smart Button. Fetching order ID from server.",
              statusBadge: "CREATING_ORDER",
              statusTone: "info",
              ctaText: "Pay with PayPal",
              metaRows: [{ label: "INTENT", value: "CAPTURE" }],
            },
            requestPayload: `POST /api/paypal/orders
{ "productId": "bundle_pro" }`,
            responsePayload: `{ "id": "5O190127TN364715T" }`,
            codeSnippet: `<PayPalButtons
  createOrder={async () => {
    const res = await fetch("/api/paypal/orders", { method: "POST" });
    const data = await res.json();
    return data.id;
  }}
/>`,
            codeLang: "tsx",
            gotchas: ["Client-side `actions.order.create` lets malicious users tamper with amounts in DevTools."],
          },
          {
            id: "pp2-2",
            stepNo: "02",
            title: "Server POST /v2/checkout/orders",
            from: "server",
            to: "gateway",
            protocol: "OAUTH2 + REST",
            latencyLabel: "~210ms",
            summary:
              "Backend obtains OAuth access token and calls `/v2/checkout/orders` with `intent: CAPTURE` and authoritative `purchase_units`.",
            securityNote: "Funds are NOT charged yet — the order is simply in `CREATED` state.",
            uiPreview: {
              screenLabel: "PAYPAL // ORDER_CREATED",
              headline: "Order ID: 5O190127TN364715T",
              subtext: "Locked at $49.00 USD. Opening PayPal authentication window.",
              statusBadge: "CREATED",
              statusTone: "info",
              metaRows: [{ label: "STATE", value: "CREATED" }],
            },
            requestPayload: `POST https://api-m.paypal.com/v2/checkout/orders
Authorization: Bearer A21AA...

{
  "intent": "CAPTURE",
  "purchase_units": [{ "amount": { "currency_code": "USD", "value": "49.00" } }]
}`,
            responsePayload: `{
  "id": "5O190127TN364715T",
  "status": "CREATED"
}`,
            codeSnippet: `const order = await paypalFetch("/v2/checkout/orders", {
  method: "POST",
  body: JSON.stringify({
    intent: "CAPTURE",
    purchase_units: [{ amount: { currency_code: "USD", value: "49.00" } }],
  }),
});`,
            codeLang: "ts",
            gotchas: ["PayPal expects string decimals with 2 decimal places (`\"49.00\"`), NOT integer cents!"],
          },
          {
            id: "pp2-3",
            stepNo: "03",
            title: "Buyer Approves in Popup",
            from: "client",
            to: "rail",
            protocol: "PAYPAL LOGIN / 2FA",
            latencyLabel: "User Auth",
            summary:
              "Buyer logs into PayPal, picks wallet balance/linked card/Venmo, and clicks Agree & Pay. Order becomes `APPROVED` (still uncaptured!).",
            securityNote: "Crucial mistake: `onApprove` only means the buyer consented — you haven't been paid yet until Step 4!",
            uiPreview: {
              screenLabel: "PAYPAL // POPUP_APPROVED",
              headline: "Buyer Approved Payment",
              subtext: "Triggering server-side capture API now...",
              statusBadge: "APPROVED_UNCAPTURED",
              statusTone: "warning",
              metaRows: [{ label: "FUNDING", value: "PayPal Balance / Visa" }],
            },
            requestPayload: `// PayPal popup resolves onApprove({ orderID: "5O190127TN364715T" })`,
            responsePayload: `{ "orderID": "5O190127TN364715T", "payerID": "Q5X92..." }`,
            codeSnippet: `onApprove={async (data) => {
  const res = await fetch(\`/api/paypal/orders/\${data.orderID}/capture\`, { method: "POST" });
  return res.json();
}}`,
            codeLang: "tsx",
            gotchas: ["Never grant access inside `onApprove` before calling `/capture` on your server!"],
          },
          {
            id: "pp2-4",
            stepNo: "04",
            title: "Server Captures Funds",
            from: "server",
            to: "gateway",
            protocol: "POST /capture",
            latencyLabel: "~240ms",
            summary:
              "Your server calls `POST /v2/checkout/orders/{id}/capture` with `PayPal-Request-Id` idempotency header. Money settles now.",
            securityNote: "Check `capture.status === 'COMPLETED'` (not just order status!).",
            uiPreview: {
              screenLabel: "PAYPAL // CAPTURED",
              headline: "$49.00 Captured Immediately",
              subtext: "Capture ID 3C679366... settled to PayPal merchant balance.",
              statusBadge: "COMPLETED",
              statusTone: "success",
              metaRows: [{ label: "CAPTURE_ID", value: "3C679366HH908993F" }],
            },
            requestPayload: `POST https://api-m.paypal.com/v2/checkout/orders/5O190127TN364715T/capture
PayPal-Request-Id: cap_5O190127TN364715T`,
            responsePayload: `{
  "id": "5O190127TN364715T",
  "status": "COMPLETED",
  "purchase_units": [{ "payments": { "captures": [{ "id": "3C679366HH908993F", "status": "COMPLETED" }] } }]
}`,
            codeSnippet: `const captureData = await paypalFetch(\`/v2/checkout/orders/\${orderId}/capture\`, {
  method: "POST",
  headers: { "PayPal-Request-Id": \`cap_\${orderId}\` },
});
const capture = captureData.purchase_units[0].payments.captures[0];`,
            codeLang: "ts",
            gotchas: [
              "Always check `capture.status === 'COMPLETED'` — eCheck/bank-funded payments can return `PENDING`.",
            ],
          },
          {
            id: "pp2-5",
            stepNo: "05",
            title: "Verify PayPal Webhook",
            from: "gateway",
            to: "webhook",
            protocol: "CERT + VERIFY API",
            latencyLabel: "~1.4s",
            summary:
              "PayPal sends `PAYMENT.CAPTURE.COMPLETED`. Verify authenticity using PayPal's `/v1/notifications/verify-webhook-signature` endpoint with all 5 transmission headers.",
            securityNote: "Pass `transmission_id`, `transmission_time`, `cert_url`, `auth_algo`, `transmission_sig`, and `webhook_id`.",
            uiPreview: {
              screenLabel: "WEBHOOK // VERIFIED",
              headline: "Webhook RSA Check Passed",
              subtext: "verification_status: SUCCESS. Order permanently reconciled.",
              statusBadge: "VERIFIED",
              statusTone: "success",
              metaRows: [{ label: "EVENT", value: "PAYMENT.CAPTURE.COMPLETED" }],
            },
            requestPayload: `POST /v1/notifications/verify-webhook-signature
{
  "transmission_id": "...",
  "transmission_sig": "...",
  "webhook_id": "WH-991...",
  "webhook_event": { ... }
}`,
            responsePayload: `{ "verification_status": "SUCCESS" }`,
            codeSnippet: `const verify = await paypalFetch("/v1/notifications/verify-webhook-signature", {
  method: "POST",
  body: JSON.stringify({ transmission_id, transmission_time, cert_url, auth_algo, transmission_sig, webhook_id, webhook_event: rawJson }),
});`,
            codeLang: "ts",
            gotchas: ["Never parse & modify `webhook_event` keys before sending to PayPal's verify endpoint."],
          },
          {
            id: "pp2-6",
            stepNo: "06",
            title: "Unlock Download & Invoice",
            from: "webhook",
            to: "client",
            protocol: "FULFILLMENT",
            latencyLabel: "Instant",
            summary: "License/download unlocked and PayPal buyer email receipt linked to order.",
            securityNote: "Store `capture.id` for one-click future refunds via `/v2/payments/captures/{id}/refund`.",
            uiPreview: {
              screenLabel: "APP // DOWNLOAD_READY",
              headline: "Digital Bundle Unlocked",
              subtext: "Capture ID saved for accounting & instant refunds.",
              statusBadge: "UNLOCKED",
              statusTone: "success",
              metaRows: [{ label: "ORDER", value: "Fulfilled" }],
            },
            requestPayload: `{ "captureId": "3C679366HH908993F", "status": "COMPLETED" }`,
            responsePayload: `{ "downloadUrl": "/downloads/bundle" }`,
            codeSnippet: `await db.orders.update({ where: { paypalOrderId }, data: { status: "PAID", captureId: capture.id } });`,
            codeLang: "ts",
            gotchas: ["Refunds in PayPal target the `capture_id`, NOT the `order_id`!"],
          },
        ],
      },
      {
        id: "paypal-restart",
        code: "02 // INSTRUMENT_DECLINED",
        label: "Funding Decline & actions.restart()",
        description:
          "How PayPal cleanly handles `INSTRUMENT_DECLINED` during capture by restarting the funding selector.",
        steps: [
          {
            id: "pp2-d1",
            stepNo: "01",
            title: "Server Attempts Capture",
            from: "server",
            to: "gateway",
            protocol: "POST /capture",
            latencyLabel: "~210ms",
            summary: "Server calls `/capture` after buyer clicked Pay.",
            securityNote: "Handle 422 Unprocessable Entity gracefully.",
            uiPreview: {
              screenLabel: "SERVER // CAPTURING",
              headline: "Attempting Capture...",
              subtext: "Contacting buyer's linked card bank.",
              statusBadge: "CAPTURING",
              statusTone: "info",
              metaRows: [{ label: "ORDER_ID", value: "5O190127..." }],
            },
            requestPayload: `POST /v2/checkout/orders/5O190127/capture`,
            responsePayload: `HTTP 422 { "details": [{ "issue": "INSTRUMENT_DECLINED" }] }`,
            codeSnippet: `// Inspect errorDetail?.issue === "INSTRUMENT_DECLINED"`,
            codeLang: "ts",
            gotchas: ["Do not throw a generic 500 error on 422 INSTRUMENT_DECLINED."],
          },
          {
            id: "pp2-d2",
            stepNo: "02",
            title: "Return Decline Flag to Client",
            from: "server",
            to: "client",
            protocol: "JSON RESPONSE",
            latencyLabel: "~20ms",
            summary: "Backend forwards `{ issue: 'INSTRUMENT_DECLINED' }` to `onApprove`.",
            securityNote: "Preserves the exact same PayPal order ID.",
            uiPreview: {
              screenLabel: "APP // RECOVERABLE_DECLINE",
              headline: "Card Declined — Try Another Method",
              subtext: "Re-opening PayPal funding picker automatically.",
              statusBadge: "RESTARTING",
              statusTone: "warning",
              metaRows: [{ label: "ISSUE", value: "INSTRUMENT_DECLINED" }],
            },
            requestPayload: `{ "issue": "INSTRUMENT_DECLINED" }`,
            responsePayload: `{ "restart": true }`,
            codeSnippet: `if (err?.issue === "INSTRUMENT_DECLINED") return actions.restart();`,
            codeLang: "tsx",
            gotchas: ["`actions.restart()` is built into PayPal JS SDK for this exact case."],
          },
          {
            id: "pp2-d3",
            stepNo: "03",
            title: "Buyer Picks Backup Funding",
            from: "client",
            to: "rail",
            protocol: "PAYPAL PICKER",
            latencyLabel: "User Auth",
            summary: "Popup re-opens directly to the payment method selector without losing checkout context.",
            securityNote: "Higher recovery conversion than failing out to an error page.",
            uiPreview: {
              screenLabel: "PAYPAL // PICK_BACKUP",
              headline: "Choose Backup Card or Balance",
              subtext: "Selected PayPal Balance instead of declined debit card.",
              statusBadge: "BACKUP_APPROVED",
              statusTone: "info",
              metaRows: [{ label: "BACKUP", value: "PayPal Balance" }],
            },
            requestPayload: `actions.restart()`,
            responsePayload: `{ "approved": true }`,
            codeSnippet: `// Triggers onApprove() a second time with same orderID`,
            codeLang: "ts",
            gotchas: ["Ensure your server capture endpoint allows re-trying an APPROVED order."],
          },
          {
            id: "pp2-d4",
            stepNo: "04",
            title: "Capture Succeeds on Retry",
            from: "server",
            to: "gateway",
            protocol: "POST /capture",
            latencyLabel: "~200ms",
            summary: "Second capture succeeds and returns `COMPLETED`.",
            securityNote: "Use a new `PayPal-Request-Id` on retry attempt (not the failed one!).",
            uiPreview: {
              screenLabel: "PAYPAL // COMPLETED",
              headline: "Captured on Backup Method",
              subtext: "Funds settled cleanly.",
              statusBadge: "COMPLETED",
              statusTone: "success",
              metaRows: [{ label: "STATUS", value: "COMPLETED" }],
            },
            requestPayload: `POST /v2/checkout/orders/5O190127/capture`,
            responsePayload: `{ "status": "COMPLETED" }`,
            codeSnippet: `// Capture succeeds and returns captureId`,
            codeLang: "ts",
            gotchas: ["Reusing an idempotency key from a 422 response can return the cached 422!"],
          },
          {
            id: "pp2-d5",
            stepNo: "05",
            title: "Webhook Confirms Fulfillment",
            from: "gateway",
            to: "webhook",
            protocol: "WEBHOOK",
            latencyLabel: "~1s",
            summary: "Fulfill order cleanly via `PAYMENT.CAPTURE.COMPLETED`.",
            securityNote: "Idempotent unlock.",
            uiPreview: {
              screenLabel: "APP // COMPLETE",
              headline: "Thank You — Order Active",
              subtext: "Recovered decline without abandoning cart.",
              statusBadge: "FULFILLED",
              statusTone: "success",
              metaRows: [{ label: "RECOVERED", value: "Yes" }],
            },
            requestPayload: `{ "event_type": "PAYMENT.CAPTURE.COMPLETED" }`,
            responsePayload: `{ "ok": true }`,
            codeSnippet: `// Mark order PAID`,
            codeLang: "ts",
            gotchas: ["Track recovery rate in analytics — `actions.restart()` saves significant checkout drop-offs."],
          },
        ],
      },
      {
        id: "paypal-vault",
        code: "03 // VAULT_TOKENIZATION",
        label: "Vaulting & Off-Session Charges",
        description: "Save a buyer's PayPal wallet or card via Setup Tokens for 1-click reorders or subscriptions.",
        steps: [
          {
            id: "pp2-v1",
            stepNo: "01",
            title: "Create Setup Token",
            from: "server",
            to: "gateway",
            protocol: "POST /vault/setup-tokens",
            latencyLabel: "~180ms",
            summary: "Server creates a temporary Vault setup token for saving PayPal or Card.",
            securityNote: "Requires PayPal Vaulting enabled on merchant account.",
            uiPreview: {
              screenLabel: "APP // SAVE_METHOD",
              headline: "Link PayPal for 1-Click Billing",
              subtext: "Creating secure Vault setup token.",
              statusBadge: "SETUP_TOKEN",
              statusTone: "info",
              metaRows: [{ label: "SCOPE", value: "VAULT" }],
            },
            requestPayload: `POST /v3/vault/setup-tokens { "payment_source": { "paypal": { "usage_type": "MERCHANT" } } }`,
            responsePayload: `{ "id": "st_8912", "status": "CREATED" }`,
            codeSnippet: `// POST /v3/vault/setup-tokens`,
            codeLang: "ts",
            gotchas: ["Use Vault v3 APIs rather than legacy v1 Billing Agreements."],
          },
          {
            id: "pp2-v2",
            stepNo: "02",
            title: "Buyer Consents to Save",
            from: "client",
            to: "rail",
            protocol: "CONSENT UI",
            latencyLabel: "User Auth",
            summary: "Buyer approves recurring/off-session billing consent inside PayPal popup.",
            securityNote: "Must explicitly display consent terms.",
            uiPreview: {
              screenLabel: "PAYPAL // CONSENT",
              headline: "Save PayPal for Future Purchases",
              subtext: "Buyer approved merchant vaulting consent.",
              statusBadge: "APPROVED",
              statusTone: "success",
              metaRows: [{ label: "CONSENT", value: "Granted" }],
            },
            requestPayload: `createVaultSetupToken()`,
            responsePayload: `{ "vaultSetupToken": "st_8912" }`,
            codeSnippet: `<PayPalButtons createVaultSetupToken={...} onApprove={...} />`,
            codeLang: "tsx",
            gotchas: ["Buyer can revoke merchant permission anytime in PayPal Account Settings."],
          },
          {
            id: "pp2-v3",
            stepNo: "03",
            title: "Exchange for Payment Token",
            from: "server",
            to: "gateway",
            protocol: "POST /payment-tokens",
            latencyLabel: "~160ms",
            summary: "Server exchanges the approved setup token for a durable `payment_token` (`vault_id`).",
            securityNote: "Store `vault_id` encrypted/scoped to the user ID in your DB.",
            uiPreview: {
              screenLabel: "SERVER // VAULTED",
              headline: "Payment Token Stored",
              subtext: "vault_id: vt_991a... linked to customer.",
              statusBadge: "VAULTED",
              statusTone: "success",
              metaRows: [{ label: "TOKEN", value: "vt_991a02x" }],
            },
            requestPayload: `POST /v3/vault/payment-tokens { "payment_source": { "token": { "id": "st_8912", "type": "SETUP_TOKEN" } } }`,
            responsePayload: `{ "id": "vt_991a02x", "customer": { "id": "cust_44" } }`,
            codeSnippet: `await db.user.update({ where: { id }, data: { paypalVaultId: token.id } });`,
            codeLang: "ts",
            gotchas: ["Never lose the `customer.id` returned by PayPal Vault — you'll need it for listing saved methods."],
          },
          {
            id: "pp2-v4",
            stepNo: "04",
            title: "Off-Session Order Charge",
            from: "server",
            to: "gateway",
            protocol: "POST /orders (VAULT)",
            latencyLabel: "~220ms",
            summary: "Charge the saved `vault_id` later for usage overages or 1-click checkouts without popups.",
            securityNote: "Pass `stored_credential` metadata accurately.",
            uiPreview: {
              screenLabel: "CRON // USAGE_BILLING",
              headline: "1-Click / Usage Charge ($19)",
              subtext: "Charged vaulted PayPal token off-session.",
              statusBadge: "CHARGED",
              statusTone: "success",
              metaRows: [{ label: "VAULT_ID", value: "vt_991a02x" }],
            },
            requestPayload: `POST /v2/checkout/orders { "payment_source": { "paypal": { "vault_id": "vt_991a02x" } } }`,
            responsePayload: `{ "status": "COMPLETED" }`,
            codeSnippet: `// Create order with payment_source.paypal.vault_id`,
            codeLang: "ts",
            gotchas: ["Handle `VAULT.PAYMENT-TOKEN.DELETED` webhook in case user unlinks from PayPal."],
          },
          {
            id: "pp2-v5",
            stepNo: "05",
            title: "Webhook Confirms Renewal",
            from: "gateway",
            to: "webhook",
            protocol: "WEBHOOK",
            latencyLabel: "~1s",
            summary: "PayPal confirms capture and updates ledger.",
            securityNote: "Verify webhook signature as usual.",
            uiPreview: {
              screenLabel: "APP // RENEWED",
              headline: "Balance Charged & Synced",
              subtext: "Invoice #992 emailed automatically.",
              statusBadge: "SYNCED",
              statusTone: "success",
              metaRows: [{ label: "EVENT", value: "PAYMENT.CAPTURE.COMPLETED" }],
            },
            requestPayload: `{ "event_type": "PAYMENT.CAPTURE.COMPLETED" }`,
            responsePayload: `{ "ok": true }`,
            codeSnippet: `// Mark invoice PAID`,
            codeLang: "ts",
            gotchas: ["Notify users before off-session usage charges."],
          },
        ],
      },
    ],
  },
  {
    id: "dodo-payments",
    categoryId: "payment-gateways",
    name: "Dodo Payments",
    shortCode: "DDO",
    subType: "MERCHANT_OF_RECORD",
    subTypeLabel: "MERCHANT_OF_RECORD",
    accentColor: "#EA580C",
    region: "150+ Countries · MoR (India & Global Founders)",
    architecturePattern: "Merchant of Record + Checkout Session + Standard Webhooks",
    tagline:
      "Developer-friendly Merchant of Record built for AI & SaaS founders (especially India → Global): handles global VAT/GST, invoicing, and local payouts automatically.",
    pricingSummary: "~4% + $0.40 MoR all-inclusive (includes global tax filing)",
    settlementTime: "Scheduled global/INR bank payouts",
    taxCompliance: "MoR handles US Sales Tax, EU VAT, UK VAT & GST compliance",
    webhookAuth: "Standard Webhooks (webhook-id, webhook-timestamp, webhook-signature)",
    avgIntegrationTime: "~25 mins",
    bestFor: "Indie SaaS, AI apps & Indian founders selling globally without foreign entities",
    sdks: ["dodopayments (TS)", "Next.js Adapter", "Python", "Standard Webhooks"],
    paymentMethods: ["Cards", "Apple Pay", "Google Pay", "UPI (India)", "Local Rails"],
    docsUrl: "https://docs.dodopayments.com/",
    compareSummary: {
      orderModel: "Checkout Session with product_cart + automatic MoR tax calculation",
      checkoutUx: "Hosted Checkout or Embedded Overlay with PPP & local currencies",
      webhookHeader: "webhook-signature (Standard Webhooks spec)",
      morHandled: true,
      idealWhen: "Selling SaaS/AI globally from India or solo without managing VAT/GST filings",
    },
    scenarios: [
      {
        id: "dodo-mor-checkout",
        code: "01 // HAPPY_PATH",
        label: "MoR Checkout + Global Tax + Webhook",
        description:
          "How a Merchant of Record (MoR) simplifies global SaaS: you send a product ID, Dodo acts as the legal reseller handling local VAT/GST, invoices, and cards/UPI, then sends a Standard Webhook.",
        steps: [
          {
            id: "ddo-1",
            stepNo: "01",
            title: "User Clicks Upgrade",
            from: "client",
            to: "server",
            protocol: "HTTPS POST",
            latencyLabel: "~30ms",
            summary:
              "Logged-in SaaS user clicks Upgrade to Pro. Client passes `productId` and `userId` request to your backend.",
            securityNote: "Never create dynamic custom prices client-side; map plans to Dodo `product_id`s.",
            uiPreview: {
              screenLabel: "APP // PRICING",
              headline: "Pro AI Plan — $19 / month",
              subtext: "Starting Merchant-of-Record global checkout session...",
              statusBadge: "INIT_CHECKOUT",
              statusTone: "info",
              metaRows: [{ label: "PRODUCT_ID", value: "pdt_pro_ai_19" }],
            },
            requestPayload: `POST /api/billing/checkout
{ "productId": "pdt_pro_ai_19" }`,
            responsePayload: `{ "sessionId": "cks_9xL2..." }`,
            codeSnippet: `// Server reads authenticated user.id and user.email from session`,
            codeLang: "ts",
            gotchas: ["Attach `metadata: { userId }` at checkout creation so webhooks map cleanly back to your user."],
          },
          {
            id: "ddo-2",
            stepNo: "02",
            title: "Create Checkout Session",
            from: "server",
            to: "gateway",
            protocol: "REST BEARER",
            latencyLabel: "~150ms",
            summary:
              "Server calls `client.checkoutSessions.create()` with `product_cart`, `customer`, `metadata`, and `return_url`. Returns `checkout_url`.",
            securityNote: "Dodo takes over tax calculation, currency conversion, and legal invoice generation.",
            uiPreview: {
              screenLabel: "DODO // SESSION_READY",
              headline: "Checkout URL Generated",
              subtext: "Routing user to MoR checkout with tax + currency localization.",
              statusBadge: "URL_READY",
              statusTone: "info",
              metaRows: [{ label: "MODE", value: "Merchant of Record" }],
            },
            requestPayload: `POST https://live.dodopayments.com/checkouts
Authorization: Bearer DODO_API_KEY

{
  "product_cart": [{ "product_id": "pdt_pro_ai_19", "quantity": 1 }],
  "customer": { "email": "dev@acme.io", "name": "Alex" },
  "metadata": { "userId": "usr_104" },
  "return_url": "https://app.example.com/billing/success"
}`,
            responsePayload: `{
  "session_id": "cks_9xL2mP4q",
  "checkout_url": "https://checkout.dodopayments.com/session/cks_9xL2mP4q"
}`,
            codeSnippet: `const session = await dodo.checkoutSessions.create({
  product_cart: [{ product_id: "pdt_pro_ai_19", quantity: 1 }],
  customer: { email: user.email, name: user.name },
  metadata: { userId: user.id },
  return_url: \`\${APP_URL}/billing?status=success\`,
});`,
            codeLang: "ts",
            gotchas: ["Remember to configure separate API keys & webhook secrets for `test_mode` vs `live_mode`."],
          },
          {
            id: "ddo-3",
            stepNo: "03",
            title: "MoR Tax & Currency Localization",
            from: "gateway",
            to: "client",
            protocol: "MOR CHECKOUT",
            latencyLabel: "Interactive",
            summary:
              "Dodo detects buyer location (e.g., Germany 19% VAT or India 18% GST), shows B2B VAT ID field, and presents local cards/Apple Pay/UPI.",
            securityNote:
              "As Merchant of Record, Dodo is the legal seller on the invoice and remits VAT/GST globally on your behalf.",
            uiPreview: {
              screenLabel: "DODO // MOR_CHECKOUT",
              headline: "$19.00 + $3.61 EU VAT (DE 19%)",
              subtext: "B2B Reverse-Charge VAT ID input + Apple Pay / Card / UPI.",
              statusBadge: "TAX_CALCULATED",
              statusTone: "warning",
              ctaText: "Pay $22.61 →",
              metaRows: [
                { label: "TAX_FILING", value: "Handled by Dodo MoR" },
                { label: "INVOICE", value: "Auto-Issued" },
              ],
            },
            requestPayload: `// Customer redirected to session.checkout_url`,
            responsePayload: `{ "detectedCountry": "DE", "vatRate": "19%", "total": "$22.61" }`,
            codeSnippet: `return NextResponse.json({ checkoutUrl: session.checkout_url });`,
            codeLang: "ts",
            gotchas: ["Your app receives the net payout without needing foreign tax registrations."],
          },
          {
            id: "ddo-4",
            stepNo: "04",
            title: "Card / UPI Authorization",
            from: "client",
            to: "rail",
            protocol: "3DS2 / CARD / UPI",
            latencyLabel: "User Auth",
            summary:
              "Buyer completes card 3DS2, Apple Pay, or UPI payment; Dodo acquires the funds and issues a compliant MoR tax receipt.",
            securityNote: "Chargebacks and compliance checks are filtered by Dodo's MoR risk stack.",
            uiPreview: {
              screenLabel: "RAIL // ACQUIRED",
              headline: "Payment Captured + Receipt Issued",
              subtext: "Compliant tax invoice generated automatically for buyer.",
              statusBadge: "CAPTURED",
              statusTone: "success",
              metaRows: [{ label: "INVOICE", value: "DDO-INV-2026-901" }],
            },
            requestPayload: `// Buyer submits payment`,
            responsePayload: `{ "payment_id": "pay_dodo_881a", "status": "succeeded" }`,
            codeSnippet: `// Buyer redirected back to return_url`,
            codeLang: "ts",
            gotchas: ["Redirecting back to `return_url` should show a confirmation state verified by webhook/DB."],
          },
          {
            id: "ddo-5",
            stepNo: "05",
            title: "Standard Webhooks Verification",
            from: "gateway",
            to: "webhook",
            protocol: "STANDARD WEBHOOKS",
            latencyLabel: "~1s",
            summary:
              "Dodo follows the open Standard Webhooks spec (`webhook-id`, `webhook-timestamp`, `webhook-signature`). Server validates `id + '.' + timestamp + '.' + rawBody`.",
            securityNote:
              "Check timestamp freshness (< 5 minutes) to prevent replay attacks using the `standardwebhooks` library.",
            uiPreview: {
              screenLabel: "WEBHOOK // STANDARD_SPEC",
              headline: "Standard Webhook Verified",
              subtext: "payment.succeeded + subscription.active validated via HMAC-SHA256.",
              statusBadge: "VERIFIED",
              statusTone: "success",
              metaRows: [
                { label: "SPEC", value: "standardwebhooks.com" },
                { label: "HEADERS", value: "webhook-id/ts/sig" },
              ],
            },
            requestPayload: `POST /api/webhooks/dodo
webhook-id: msg_2pQ9x...
webhook-timestamp: 1731229205
webhook-signature: v1,K9x2m...

{ "type": "payment.succeeded", "data": { "payment_id": "pay_dodo_881a", "metadata": { "userId": "usr_104" } } }`,
            responsePayload: `HTTP/1.1 200 OK`,
            codeSnippet: `import { Webhook } from "standardwebhooks";

const wh = new Webhook(process.env.DODO_WEBHOOK_KEY!);
const payload = wh.verify(rawBody, {
  "webhook-id": req.headers.get("webhook-id")!,
  "webhook-timestamp": req.headers.get("webhook-timestamp")!,
  "webhook-signature": req.headers.get("webhook-signature")!,
});`,
            codeLang: "ts",
            gotchas: ["Never strip whitespace from `rawBody` before passing it into `wh.verify()`."],
          },
          {
            id: "ddo-6",
            stepNo: "06",
            title: "Provision Plan & Payout Ready",
            from: "webhook",
            to: "server",
            protocol: "DB FULFILL",
            latencyLabel: "~15ms",
            summary:
              "User's AI credits/Pro plan unlocks immediately. Dodo batches net global earnings into direct INR/USD bank payouts.",
            securityNote: "Deduplicate via `webhook-id` header.",
            uiPreview: {
              screenLabel: "APP // PRO_UNLOCKED",
              headline: "Pro Plan & Credits Active",
              subtext: "MoR tax handled · Global invoice sent · INR/USD payout scheduled.",
              statusBadge: "UNLOCKED",
              statusTone: "success",
              metaRows: [{ label: "CREDITS", value: "+10,000 AI Tokens" }],
            },
            requestPayload: `UPDATE users SET plan='PRO', credits=10000 WHERE id='usr_104';`,
            responsePayload: `{ "active": true }`,
            codeSnippet: `await grantCredits(payload.data.metadata.userId, 10000);`,
            codeLang: "ts",
            gotchas: ["For subscriptions, listen to both `subscription.active` and `subscription.renewed`."],
          },
        ],
      },
      {
        id: "dodo-webhook-guard",
        code: "02 // REPLAY_&_RETRY",
        label: "Replay Defense & Retry Queue",
        description: "How Standard Webhooks protect your server against stale replays and handle automatic exponential retries.",
        steps: [
          {
            id: "ddo-g1",
            stepNo: "01",
            title: "Incoming Webhook Headers",
            from: "gateway",
            to: "webhook",
            protocol: "STANDARD WEBHOOKS",
            latencyLabel: "~1s",
            summary: "Every Dodo delivery carries `webhook-id`, `webhook-timestamp`, and `webhook-signature`.",
            securityNote: "Header `webhook-id` remains identical across retries of the same event.",
            uiPreview: {
              screenLabel: "SECURITY // HEADER_CHECK",
              headline: "Inspecting Standard Headers",
              subtext: "Checking timestamp drift & signature digest.",
              statusBadge: "VERIFYING",
              statusTone: "info",
              metaRows: [{ label: "WEBHOOK_ID", value: "msg_2pQ9x" }],
            },
            requestPayload: `webhook-id: msg_2pQ9x\nwebhook-timestamp: 1731229205`,
            responsePayload: `{ "timestampValid": true }`,
            codeSnippet: `wh.verify(rawBody, headers); // automatically checks 5-min timestamp tolerance`,
            codeLang: "ts",
            gotchas: ["Server clock drift > 5 mins causes valid webhooks to fail — ensure NTP sync."],
          },
          {
            id: "ddo-g2",
            stepNo: "02",
            title: "Reject Tampered / Replayed Payloads",
            from: "webhook",
            to: "server",
            protocol: "400 REJECT",
            latencyLabel: "<2ms",
            summary: "Any modified JSON or stale timestamp (>300s) is rejected immediately before touching DB.",
            securityNote: "Returning 400 drops forged requests without leaking internal errors.",
            uiPreview: {
              screenLabel: "SECURITY // REPLAY_BLOCKED",
              headline: "Stale / Invalid Signature Rejected",
              subtext: "HTTP 400 returned before database mutation.",
              statusBadge: "BLOCKED",
              statusTone: "warning",
              metaRows: [{ label: "STATUS", value: "400 Invalid" }],
            },
            requestPayload: `// Forged payload with modified userId`,
            responsePayload: `HTTP/1.1 400 Bad Signature`,
            codeSnippet: `catch (err) { return NextResponse.json({ error: "Invalid" }, { status: 400 }); }`,
            codeLang: "ts",
            gotchas: ["Never log your webhook signing secret in error messages."],
          },
          {
            id: "ddo-g3",
            stepNo: "03",
            title: "Transient 500 Triggers Retry",
            from: "server",
            to: "gateway",
            protocol: "BACKOFF RETRY",
            latencyLabel: "5s → 5m → 2h",
            summary: "If your database is briefly restarting and returns 500, Dodo retries with exponential backoff.",
            securityNote: "Check `webhook-id` uniqueness before applying credits.",
            uiPreview: {
              screenLabel: "QUEUE // AUTO_RETRY",
              headline: "Retry Delivery Attempt #2",
              subtext: "Database recovered; same webhook-id delivered safely.",
              statusBadge: "RETRY_DELIVERED",
              statusTone: "info",
              metaRows: [{ label: "IDEMPOTENT", value: "msg_2pQ9x" }],
            },
            requestPayload: `// Attempt #2 with identical webhook-id: msg_2pQ9x`,
            responsePayload: `HTTP/1.1 200 OK`,
            codeSnippet: `if (await db.webhookLog.findUnique({ where: { id: webhookId } })) return Response.json({ ok: true });`,
            codeLang: "ts",
            gotchas: ["Always return 200 immediately if `webhook-id` was already processed."],
          },
          {
            id: "ddo-g4",
            stepNo: "04",
            title: "Idempotent Fulfillment Applied",
            from: "webhook",
            to: "server",
            protocol: "TRANSACTION",
            latencyLabel: "~12ms",
            summary: "Event executes exactly once inside a transaction.",
            securityNote: "Prevents double credits even if 2 deliveries arrive concurrently.",
            uiPreview: {
              screenLabel: "DB // EXACTLY_ONCE",
              headline: "Processed Exactly Once",
              subtext: "Unique constraint guaranteed zero duplicate grants.",
              statusBadge: "SYNCED",
              statusTone: "success",
              metaRows: [{ label: "GRANTS", value: "1x" }],
            },
            requestPayload: `INSERT INTO webhook_logs (id) VALUES ('msg_2pQ9x')`,
            responsePayload: `{ "committed": true }`,
            codeSnippet: `// Transaction commits log + user plan upgrade together`,
            codeLang: "ts",
            gotchas: ["Enforce a PRIMARY KEY or UNIQUE index on `webhook_id` at the SQL level."],
          },
          {
            id: "ddo-g5",
            stepNo: "05",
            title: "License / Seat Ready",
            from: "server",
            to: "client",
            protocol: "REALTIME SYNC",
            latencyLabel: "Instant",
            summary: "Frontend polling or WebSocket updates the customer UI to Pro.",
            securityNote: "Zero manual support intervention needed.",
            uiPreview: {
              screenLabel: "APP // READY",
              headline: "Account Upgraded",
              subtext: "Ready to use immediately.",
              statusBadge: "ACTIVE",
              statusTone: "success",
              metaRows: [{ label: "PLAN", value: "PRO" }],
            },
            requestPayload: `{ "tier": "PRO" }`,
            responsePayload: `{ "ready": true }`,
            codeSnippet: `return NextResponse.json({ tier: "PRO" });`,
            codeLang: "ts",
            gotchas: ["Revalidate Next.js cache tags after webhook DB update if caching user tier."],
          },
        ],
      },
      {
        id: "dodo-subscription",
        code: "03 // MOR_SUBSCRIPTION",
        label: "SaaS Subscription & Remittance",
        description: "Recurring subscription management + automatic MoR VAT remittance + local bank payouts.",
        steps: [
          {
            id: "ddo-s1",
            stepNo: "01",
            title: "Create Recurring Product Cart",
            from: "server",
            to: "gateway",
            protocol: "POST /checkouts",
            latencyLabel: "~140ms",
            summary: "Create checkout session referencing a subscription product.",
            securityNote: "Supports trial days and quantity-based seats.",
            uiPreview: {
              screenLabel: "APP // SUBSCRIBE",
              headline: "Monthly SaaS ($19/mo)",
              subtext: "Auto-tax + recurring billing session initialized.",
              statusBadge: "CREATED",
              statusTone: "info",
              metaRows: [{ label: "INTERVAL", value: "Monthly" }],
            },
            requestPayload: `{ "product_cart": [{ "product_id": "pdt_sub_19", "quantity": 1 }] }`,
            responsePayload: `{ "checkout_url": "https://checkout.dodopayments.com/..." }`,
            codeSnippet: `const session = await dodo.checkoutSessions.create({ product_cart: [...] });`,
            codeLang: "ts",
            gotchas: ["Pass `quantity` dynamically for per-seat team pricing."],
          },
          {
            id: "ddo-s2",
            stepNo: "02",
            title: "Buyer Completes Initial Charge",
            from: "client",
            to: "rail",
            protocol: "CARD / WALLET",
            latencyLabel: "User Auth",
            summary: "Customer pays Cycle #1 + regional tax.",
            securityNote: "MoR stores payment token compliantly.",
            uiPreview: {
              screenLabel: "DODO // SUB_PAID",
              headline: "Cycle #1 Paid",
              subtext: "Recurring mandate established globally.",
              statusBadge: "ACTIVE",
              statusTone: "success",
              metaRows: [{ label: "CUSTOMER", value: "cus_ddo_91" }],
            },
            requestPayload: `// Customer authorizes recurring payment`,
            responsePayload: `{ "subscription_id": "sub_ddo_51" }`,
            codeSnippet: `// Checkout redirects to return_url`,
            codeLang: "ts",
            gotchas: ["Store `subscription_id` & `customer_id` from webhook for portal links."],
          },
          {
            id: "ddo-s3",
            stepNo: "03",
            title: "subscription.active Webhook",
            from: "gateway",
            to: "webhook",
            protocol: "WEBHOOK",
            latencyLabel: "~1s",
            summary: "Activates subscriber tier in your DB.",
            securityNote: "Handle `subscription.on_hold` for failed renewals.",
            uiPreview: {
              screenLabel: "WEBHOOK // SUB_ACTIVE",
              headline: "Subscription Active",
              subtext: "Next billing date synced.",
              statusBadge: "SUB_ACTIVE",
              statusTone: "success",
              metaRows: [{ label: "EVENT", value: "subscription.active" }],
            },
            requestPayload: `{ "type": "subscription.active", "data": { "subscription_id": "sub_ddo_51" } }`,
            responsePayload: `{ "ok": true }`,
            codeSnippet: `case "subscription.active": await activatePlan(data); break;`,
            codeLang: "ts",
            gotchas: ["Do not revoke access immediately on `subscription.cancelled` if paid period remains."],
          },
          {
            id: "ddo-s4",
            stepNo: "04",
            title: "Auto-Renewal + Tax Remittance",
            from: "rail",
            to: "webhook",
            protocol: "RENEWAL",
            latencyLabel: "Monthly",
            summary: "Dodo re-charges buyer, collects VAT/GST, files regional taxes, and emits `subscription.renewed`.",
            securityNote: "Zero tax spreadsheets required from your engineering team.",
            uiPreview: {
              screenLabel: "MOR // TAX_REMITTED",
              headline: "Renewed + VAT Remitted",
              subtext: "subscription.renewed webhook extended access.",
              statusBadge: "RENEWED",
              statusTone: "success",
              metaRows: [{ label: "COMPLIANCE", value: "100% Filed by MoR" }],
            },
            requestPayload: `{ "type": "subscription.renewed" }`,
            responsePayload: `{ "ok": true }`,
            codeSnippet: `case "subscription.renewed": await resetMonthlyQuota(data); break;`,
            codeLang: "ts",
            gotchas: ["Reset metered monthly quotas on `subscription.renewed`."],
          },
          {
            id: "ddo-s5",
            stepNo: "05",
            title: "Net Payout to Local Bank",
            from: "gateway",
            to: "server",
            protocol: "SWIFT / LOCAL",
            latencyLabel: "Payout Cycle",
            summary: "Receive clean consolidated net payouts directly into your bank account (INR/USD).",
            securityNote: "One clean payout statement instead of 40 country tax returns.",
            uiPreview: {
              screenLabel: "PAYOUT // SETTLED",
              headline: "Net Global Earnings Settled",
              subtext: "Direct bank transfer with consolidated MoR invoice.",
              statusBadge: "PAYOUT_SENT",
              statusTone: "success",
              metaRows: [{ label: "BANK", value: "Local INR / USD Account" }],
            },
            requestPayload: `// Consolidated MoR payout batch`,
            responsePayload: `{ "payoutStatus": "SETTLED" }`,
            codeSnippet: `// Track payouts in Dodo Merchant Dashboard`,
            codeLang: "ts",
            gotchas: ["Keep a clean reconciliation record of gross vs MoR fees + remitted tax."],
          },
        ],
      },
    ],
  },
  {
    id: "lemon-squeezy",
    categoryId: "payment-gateways",
    name: "Lemon Squeezy",
    shortCode: "LSQ",
    subType: "MERCHANT_OF_RECORD",
    subTypeLabel: "MERCHANT_OF_RECORD",
    accentColor: "#CA8A04",
    region: "130+ Countries · MoR for SaaS & Digital Products",
    architecturePattern: "MoR Checkouts API + Lemon.js Overlay + License Keys",
    tagline:
      "Merchant of Record designed for SaaS, software licenses, and digital products — includes built-in Lemon.js overlay, license keys, and VAT compliance.",
    pricingSummary: "5% + $0.50 MoR (+ international/PayPal surcharges)",
    settlementTime: "Twice-monthly payouts (Bank / PayPal)",
    taxCompliance: "MoR handles global Sales Tax, EU/UK VAT & GST",
    webhookAuth: "X-Signature (HMAC-SHA256 hex raw body)",
    avgIntegrationTime: "~30 mins",
    bestFor: "SaaS apps, Figma/VSCode plugins, CLI tools needing built-in license keys",
    sdks: ["@lemonsqueezy/lemonsqueezy.js", "Lemon.js Overlay", "REST JSON:API"],
    paymentMethods: ["Cards", "Apple Pay", "PayPal", "Google Pay"],
    docsUrl: "https://docs.lemonsqueezy.com/api",
    compareSummary: {
      orderModel: "JSON:API /v1/checkouts with custom_data + optional variant overrides",
      checkoutUx: "Lemon.js smooth in-page overlay or hosted checkout URL",
      webhookHeader: "x-signature (HMAC-SHA256 hex)",
      morHandled: true,
      idealWhen: "Selling SaaS subscriptions, plugins, or software with built-in license keys",
    },
    scenarios: [
      {
        id: "lsq-checkout",
        code: "01 // HAPPY_PATH",
        label: "Checkout API + Overlay + License",
        description:
          "Create a checkout with custom user metadata, open Lemon.js right over your app, and fulfill + issue license keys via `order_created` webhook.",
        steps: [
          {
            id: "lsq-1",
            stepNo: "01",
            title: "User Selects Plan / License",
            from: "client",
            to: "server",
            protocol: "HTTPS POST",
            latencyLabel: "~30ms",
            summary:
              "User clicks Buy License. Frontend asks your Next.js API to create a Lemon Squeezy checkout URL tied to `user.id`.",
            securityNote: "Embed `custom: { user_id }` in `checkout_data` so webhooks know which account paid.",
            uiPreview: {
              screenLabel: "APP // LICENSE_STORE",
              headline: "DevKit CLI Pro — $49 One-Time",
              subtext: "Generating pre-filled Lemon Squeezy checkout URL...",
              statusBadge: "PREPARING",
              statusTone: "info",
              metaRows: [{ label: "VARIANT", value: "var_492811" }],
            },
            requestPayload: `POST /api/lsq/checkout { "variantId": "492811" }`,
            responsePayload: `{ "url": "https://store.lemonsqueezy.com/checkout/custom/..." }`,
            codeSnippet: `// Server resolves authenticated user email & ID`,
            codeLang: "ts",
            gotchas: ["Avoid passing `?checkout[custom][user_id]=` in public static links if you don't want tampering — use the Checkouts API!"],
          },
          {
            id: "lsq-2",
            stepNo: "02",
            title: "Server POST /v1/checkouts",
            from: "server",
            to: "gateway",
            protocol: "JSON:API REST",
            latencyLabel: "~180ms",
            summary:
              "Server calls `/v1/checkouts` with `store` + `variant` relationships and `checkout_data.custom`. Returns a signed checkout URL.",
            securityNote: "Supports `checkout_options.embed: true` for seamless overlay.",
            uiPreview: {
              screenLabel: "LEMON // CHECKOUT_CREATED",
              headline: "Signed Checkout Link Ready",
              subtext: "Pre-filled email + embedded dark mode enabled.",
              statusBadge: "URL_READY",
              statusTone: "info",
              metaRows: [{ label: "FORMAT", value: "JSON:API" }],
            },
            requestPayload: `POST https://api.lemonsqueezy.com/v1/checkouts
Authorization: Bearer LSQ_API_KEY

{
  "data": {
    "type": "checkouts",
    "attributes": {
      "checkout_options": { "embed": true, "dark": true },
      "checkout_data": { "email": "dev@site.io", "custom": { "user_id": "usr_71" } }
    },
    "relationships": { "store": {...}, "variant": {...} }
  }
}`,
            responsePayload: `{ "data": { "id": "chk_912...", "attributes": { "url": "https://..." } } }`,
            codeSnippet: `const { data } = await createCheckout(STORE_ID, VARIANT_ID, {
  checkoutOptions: { embed: true },
  checkoutData: { email: user.email, custom: { user_id: user.id } },
});`,
            codeLang: "ts",
            gotchas: ["All `custom` values are stringified inside webhooks — always pass strings."],
          },
          {
            id: "lsq-3",
            stepNo: "03",
            title: "Open Lemon.js Overlay",
            from: "gateway",
            to: "client",
            protocol: "LEMON.JS OVERLAY",
            latencyLabel: "Interactive",
            summary:
              "Frontend calls `window.LemonSqueezy.Url.Open(url)` — opens a fast modal overlay right inside your site with tax auto-calculated.",
            securityNote: "Supports Card, Apple Pay, and PayPal out of the box.",
            uiPreview: {
              screenLabel: "LEMON // OVERLAY_MODAL",
              headline: "DevKit CLI Pro — $49 + Local Tax",
              subtext: "Overlay open on current page · No harsh redirect.",
              statusBadge: "OVERLAY_OPEN",
              statusTone: "warning",
              ctaText: "Pay $49.00 →",
              metaRows: [{ label: "METHODS", value: "Card · Apple Pay · PayPal" }],
            },
            requestPayload: `window.createLemonSqueezy();
window.LemonSqueezy.Url.Open(checkoutUrl);`,
            responsePayload: `{ "event": "Checkout.Success" }`,
            codeSnippet: `window.LemonSqueezy.Setup({
  eventHandler: (e) => {
    if (e.event === "Checkout.Success") refreshBillingStatus();
  }
});`,
            codeLang: "ts",
            gotchas: ["`Checkout.Success` in Lemon.js is a UI signal only — wait for the server webhook to unlock access."],
          },
          {
            id: "lsq-4",
            stepNo: "04",
            title: "MoR Acquires Payment + License",
            from: "client",
            to: "rail",
            protocol: "MOR + LICENSE",
            latencyLabel: "~1.2s",
            summary:
              "Lemon Squeezy processes the card/PayPal payment as Merchant of Record, calculates VAT, and auto-generates a License Key if enabled.",
            securityNote: "Buyers get a compliant PDF tax receipt & license key email automatically.",
            uiPreview: {
              screenLabel: "MOR // LICENSE_ISSUED",
              headline: "Payment Captured + Key Generated",
              subtext: "License key `LSQ-9A2F-881B-4C01` issued automatically.",
              statusBadge: "ISSUED",
              statusTone: "success",
              metaRows: [{ label: "KEY", value: "LSQ-9A2F-881B-4C01" }],
            },
            requestPayload: `// Payment authorized by buyer`,
            responsePayload: `{ "order_id": 441201, "license_key": "LSQ-9A2F-881B-4C01" }`,
            codeSnippet: `// Developers can validate license keys via POST /v1/licenses/validate`,
            codeLang: "ts",
            gotchas: ["Built-in License Key APIs support activation limits per machine!"],
          },
          {
            id: "lsq-5",
            stepNo: "05",
            title: "Verify X-Signature Webhook",
            from: "gateway",
            to: "webhook",
            protocol: "HMAC-SHA256",
            latencyLabel: "~1.3s",
            summary:
              "Lemon Squeezy POSTs `order_created` (or `subscription_created`) with `X-Signature` hex HMAC-SHA256 of the raw body.",
            securityNote: "Use `crypto.timingSafeEqual` on the hex digest against `X-Signature`.",
            uiPreview: {
              screenLabel: "WEBHOOK // HMAC_VALID",
              headline: "order_created Verified",
              subtext: "Custom meta.custom_data.user_id extracted safely.",
              statusBadge: "VERIFIED",
              statusTone: "success",
              metaRows: [{ label: "EVENT", value: "order_created" }],
            },
            requestPayload: `POST /api/webhooks/lemonsqueezy
X-Event-Name: order_created
X-Signature: 4b2c8a91...

{ "meta": { "event_name": "order_created", "custom_data": { "user_id": "usr_71" } }, "data": {...} }`,
            responsePayload: `HTTP/1.1 200 OK`,
            codeSnippet: `const raw = await req.text();
const hmac = crypto.createHmac("sha256", process.env.LSQ_WEBHOOK_SECRET!).update(raw).digest("hex");
const sig = req.headers.get("x-signature")!;
if (!crypto.timingSafeEqual(Buffer.from(hmac), Buffer.from(sig))) return new Response("401", { status: 401 });`,
            codeLang: "ts",
            gotchas: ["Notice Lemon Squeezy nests `custom_data` inside `payload.meta.custom_data`, not `payload.data.attributes`!"],
          },
          {
            id: "lsq-6",
            stepNo: "06",
            title: "Unlock Account & Sync DB",
            from: "webhook",
            to: "server",
            protocol: "DB UPSERT",
            latencyLabel: "~15ms",
            summary:
              "Server links `order_id`, `customer_id`, and license key to `usr_71` and refreshes the UI.",
            securityNote: "Check `attributes.status === 'paid'` before granting access.",
            uiPreview: {
              screenLabel: "APP // UNLOCKED",
              headline: "DevKit CLI Pro Active",
              subtext: "License key synced in user dashboard.",
              statusBadge: "ACTIVE",
              statusTone: "success",
              metaRows: [{ label: "LICENSE", value: "Active (3 Seats)" }],
            },
            requestPayload: `UPDATE users SET tier='PRO', lsqOrderId='441201' WHERE id='usr_71';`,
            responsePayload: `{ "ok": true }`,
            codeSnippet: `await db.user.update({ where: { id: meta.custom_data.user_id }, data: { plan: "PRO" } });`,
            codeLang: "ts",
            gotchas: ["Always check `data.attributes.status === 'paid'` on `order_created`."],
          },
        ],
      },
      {
        id: "lsq-subs",
        code: "02 // SUBSCRIPTION_SYNC",
        label: "Subscription Lifecycle Webhooks",
        description: "Handling trials, renewals, dunning failures, and grace-period cancellations.",
        steps: [
          {
            id: "lsq-s1",
            stepNo: "01",
            title: "subscription_created",
            from: "gateway",
            to: "webhook",
            protocol: "WEBHOOK",
            latencyLabel: "~1s",
            summary: "Fired on initial signup; stores `subscription_id`, `status`, and `renews_at`.",
            securityNote: "Support `on_trial` as valid active access during trial period.",
            uiPreview: {
              screenLabel: "WEBHOOK // SUB_CREATED",
              headline: "Subscription Started",
              subtext: "Status: active · Trial or Cycle #1 unlocked.",
              statusBadge: "ACTIVE",
              statusTone: "success",
              metaRows: [{ label: "EVENT", value: "subscription_created" }],
            },
            requestPayload: `{ "meta": { "event_name": "subscription_created" }, "data": { "id": "sub_882", "attributes": { "status": "active" } } }`,
            responsePayload: `{ "ok": true }`,
            codeSnippet: `// Upsert subscription row keyed by data.id`,
            codeLang: "ts",
            gotchas: ["Use `subscription_updated` for most status changes instead of writing 6 duplicate handlers."],
          },
          {
            id: "lsq-s2",
            stepNo: "02",
            title: "subscription_payment_success",
            from: "rail",
            to: "webhook",
            protocol: "RENEWAL",
            latencyLabel: "Monthly",
            summary: "Fired each time a recurring charge succeeds; resets usage credits.",
            securityNote: "Verify `billing_reason` (`initial` vs `renewal`).",
            uiPreview: {
              screenLabel: "BILLING // RENEWED",
              headline: "Monthly Charge Succeeded",
              subtext: "Cycle renewed & invoice emailed by MoR.",
              statusBadge: "RENEWED",
              statusTone: "success",
              metaRows: [{ label: "EVENT", value: "subscription_payment_success" }],
            },
            requestPayload: `{ "meta": { "event_name": "subscription_payment_success" } }`,
            responsePayload: `{ "ok": true }`,
            codeSnippet: `// Reset monthly usage counters when billing_reason === "renewal"`,
            codeLang: "ts",
            gotchas: ["Avoid double-granting initial credits on both `subscription_created` AND `subscription_payment_success`."],
          },
          {
            id: "lsq-s3",
            stepNo: "03",
            title: "subscription_payment_failed",
            from: "rail",
            to: "webhook",
            protocol: "DUNNING",
            latencyLabel: "Retry",
            summary: "Status shifts to `past_due`; Lemon Squeezy automatically sends dunning emails with a card update link.",
            securityNote: "Keep access during grace period or show a soft warning banner.",
            uiPreview: {
              screenLabel: "APP // PAST_DUE_BANNER",
              headline: "Action Needed: Update Card",
              subtext: "MoR dunning retry scheduled in 3 days.",
              statusBadge: "PAST_DUE",
              statusTone: "warning",
              metaRows: [{ label: "STATUS", value: "past_due" }],
            },
            requestPayload: `{ "attributes": { "status": "past_due", "urls": { "update_payment_method": "https://..." } } }`,
            responsePayload: `{ "bannerShown": true }`,
            codeSnippet: `// Store attributes.urls.update_payment_method for 1-click fix banner`,
            codeLang: "ts",
            gotchas: ["Lemon Squeezy includes a pre-signed `update_payment_method` URL right inside the webhook!"],
          },
          {
            id: "lsq-s4",
            stepNo: "04",
            title: "subscription_cancelled (Grace)",
            from: "client",
            to: "webhook",
            protocol: "GRACE PERIOD",
            latencyLabel: "Instant",
            summary: "User cancels; status becomes `cancelled`, but `ends_at` stays in the future until billing cycle ends.",
            securityNote: "Do NOT cut off access until `subscription_expired` or `now > ends_at`.",
            uiPreview: {
              screenLabel: "APP // GRACE_ACCESS",
              headline: "Plan Cancels on Dec 10",
              subtext: "Full access remains active until paid period expires.",
              statusBadge: "CANCELLED_GRACE",
              statusTone: "warning",
              metaRows: [{ label: "ENDS_AT", value: "2026-12-10" }],
            },
            requestPayload: `{ "meta": { "event_name": "subscription_cancelled" } }`,
            responsePayload: `{ "accessActive": true }`,
            codeSnippet: `const hasAccess = ["active", "on_trial"].includes(sub.status) || (sub.status === "cancelled" && sub.endsAt > new Date());`,
            codeLang: "ts",
            gotchas: ["This grace-period check is the #1 most common bug in Lemon Squeezy integrations."],
          },
          {
            id: "lsq-s5",
            stepNo: "05",
            title: "subscription_expired",
            from: "gateway",
            to: "webhook",
            protocol: "WEBHOOK",
            latencyLabel: "End of Cycle",
            summary: "Fired when paid period ends; safely downgrade user to Free tier.",
            securityNote: "Downgrade cleanly without deleting user projects.",
            uiPreview: {
              screenLabel: "APP // FREE_TIER",
              headline: "Downgraded to Free Tier",
              subtext: "Data preserved · Upgrade anytime with 1 click.",
              statusBadge: "EXPIRED",
              statusTone: "info",
              metaRows: [{ label: "EVENT", value: "subscription_expired" }],
            },
            requestPayload: `{ "meta": { "event_name": "subscription_expired" } }`,
            responsePayload: `{ "downgraded": true }`,
            codeSnippet: `await db.user.update({ where: { id }, data: { plan: "FREE" } });`,
            codeLang: "ts",
            gotchas: ["Always keep a webhook handler for `subscription_resumed` in case they undo cancel."],
          },
        ],
      },
      {
        id: "lsq-refund",
        code: "03 // REFUND_REVOKE",
        label: "Refund & License Revocation",
        description: "Automatic MoR tax reversal and license key disabling when an order is refunded.",
        steps: [
          {
            id: "lsq-r1",
            stepNo: "01",
            title: "Refund Initiated",
            from: "server",
            to: "gateway",
            protocol: "POST /refund",
            latencyLabel: "~180ms",
            summary: "Refund issued from dashboard or API (`POST /v1/orders/{id}/refund`).",
            securityNote: "Lemon Squeezy reverses proportional VAT/GST automatically.",
            uiPreview: {
              screenLabel: "ADMIN // REFUND",
              headline: "Refunding Order #441201",
              subtext: "Reversing $49.00 + VAT to buyer.",
              statusBadge: "REFUNDING",
              statusTone: "info",
              metaRows: [{ label: "AMOUNT", value: "$49.00" }],
            },
            requestPayload: `POST /v1/orders/441201/refund { "amount": 4900 }`,
            responsePayload: `{ "status": "refunded" }`,
            codeSnippet: `await issueOrderRefund("441201", 4900);`,
            codeLang: "ts",
            gotchas: ["MoR transaction fees are generally not returned on refunds."],
          },
          {
            id: "lsq-r2",
            stepNo: "02",
            title: "Buyer Card / PayPal Credited",
            from: "gateway",
            to: "rail",
            protocol: "REVERSAL",
            latencyLabel: "3–5 Days",
            summary: "MoR credits buyer's card or PayPal and emits updated tax credit invoice.",
            securityNote: "Buyer receives credit memo automatically.",
            uiPreview: {
              screenLabel: "RAIL // CREDITED",
              headline: "Credit Note Issued",
              subtext: "Buyer refunded; tax credit note archived.",
              statusBadge: "CREDITED",
              statusTone: "success",
              metaRows: [{ label: "CREDIT_MEMO", value: "Generated" }],
            },
            requestPayload: `// Acquirer reversal`,
            responsePayload: `{ "refunded": true }`,
            codeSnippet: `// Waiting for order_refunded webhook`,
            codeLang: "ts",
            gotchas: ["Partial refunds emit `order_refunded` with `status: 'partial_refund'`."],
          },
          {
            id: "lsq-r3",
            stepNo: "03",
            title: "order_refunded Webhook Fires",
            from: "gateway",
            to: "webhook",
            protocol: "WEBHOOK",
            latencyLabel: "~1s",
            summary: "Server verifies `X-Signature` and checks `data.attributes.refunded`.",
            securityNote: "Disable associated license key automatically.",
            uiPreview: {
              screenLabel: "WEBHOOK // ORDER_REFUNDED",
              headline: "License Key Disabled",
              subtext: "order_refunded triggered instant entitlement revocation.",
              statusBadge: "REVOKED",
              statusTone: "warning",
              metaRows: [{ label: "EVENT", value: "order_refunded" }],
            },
            requestPayload: `{ "meta": { "event_name": "order_refunded" }, "data": { "attributes": { "refunded": true } } }`,
            responsePayload: `{ "revoked": true }`,
            codeSnippet: `if (event === "order_refunded" && attrs.refunded) await revokeLicense(orderId);`,
            codeLang: "ts",
            gotchas: ["Check `refunded: true` vs partial refund amount before revoking full access."],
          },
          {
            id: "lsq-r4",
            stepNo: "04",
            title: "License Validate API Fails",
            from: "client",
            to: "server",
            protocol: "CLI CHECK",
            latencyLabel: "~80ms",
            summary: "Next time user runs the CLI/Plugin, license validation reports disabled/refunded.",
            securityNote: "Stops unauthorized post-refund usage.",
            uiPreview: {
              screenLabel: "CLI // LICENSE_CHECK",
              headline: "License Inactive (Refunded)",
              subtext: "CLI exits cleanly prompting re-purchase.",
              statusBadge: "DISABLED",
              statusTone: "warning",
              metaRows: [{ label: "VALID", value: "false" }],
            },
            requestPayload: `POST /v1/licenses/validate { "license_key": "LSQ-9A2F..." }`,
            responsePayload: `{ "valid": false, "error": "license_disabled" }`,
            codeSnippet: `if (!validation.valid) throw new Error("License inactive");`,
            codeLang: "ts",
            gotchas: ["Cache license checks briefly (e.g. 24h offline grace) for CLI developer UX."],
          },
          {
            id: "lsq-r5",
            stepNo: "05",
            title: "Clean Ledger Archive",
            from: "webhook",
            to: "server",
            protocol: "AUDIT LOG",
            latencyLabel: "Instant",
            summary: "Billing table reflects refund + credit memo cleanly.",
            securityNote: "Maintains full financial traceability.",
            uiPreview: {
              screenLabel: "LEDGER // ARCHIVED",
              headline: "Order Archived as Refunded",
              subtext: "Zero stale entitlements left active.",
              statusBadge: "ARCHIVED",
              statusTone: "info",
              metaRows: [{ label: "NET", value: "$0.00" }],
            },
            requestPayload: `{ "status": "REFUNDED" }`,
            responsePayload: `{ "ok": true }`,
            codeSnippet: `// Done`,
            codeLang: "ts",
            gotchas: ["Keep audit log rows immutable rather than deleting refunded order records."],
          },
        ],
      },
    ],
  },
];

