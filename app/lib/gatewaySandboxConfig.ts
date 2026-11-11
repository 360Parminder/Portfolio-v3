export type GatewayId =
  | "razorpay"
  | "stripe"
  | "cashfree"
  | "phonepe"
  | "paypal"
  | "dodo-payments"
  | "lemon-squeezy";

export interface LiveNetworkTrace {
  id: string;
  timestamp: string;
  stage: "SESSION_CREATE" | "SDK_OPEN" | "CLIENT_CONFIRM" | "SERVER_VERIFY";
  method: string;
  endpoint: string;
  httpStatus?: number;
  durationMs?: number;
  summary: string;
  requestPayload?: Record<string, unknown>;
  responsePayload?: Record<string, unknown>;
}

export interface GatewaySandboxStatus {
  gatewayId: GatewayId;
  configured: boolean;
  mode: "server_sandbox" | "public_sandbox" | "client_test_only" | "unconfigured";
  modeLabel: string;
  warning?: string;
  publicConfig: {
    clientId?: string;
    checkoutUrl?: string;
    cashfreeMode?: "sandbox";
    currency: string;
    amountDisplay: string;
  };
}

export interface GatewaySandboxSpec {
  gatewayId: GatewayId;
  name: string;
  sdkLabel: string;
  scriptUrl?: string;
  dashboardUrl: string;
  supportsBuiltInPublicSandbox: boolean;
  defaultCurrency: string;
  defaultAmountDisplay: string;
  testHints: {
    label: string;
    value: string;
    outcome: string;
  }[];
}

export const GATEWAY_SANDBOX_SPECS: Record<GatewayId, GatewaySandboxSpec> = {
  razorpay: {
    gatewayId: "razorpay",
    name: "Razorpay",
    sdkLabel: "checkout.razorpay.com/v1/checkout.js",
    scriptUrl: "https://checkout.razorpay.com/v1/checkout.js",
    dashboardUrl: "https://dashboard.razorpay.com/app/website-app-settings/api-keys",
    supportsBuiltInPublicSandbox: false,
    defaultCurrency: "INR",
    defaultAmountDisplay: "₹999.00",
    testHints: [
      { label: "UPI Success VPA", value: "success@razorpay", outcome: "Captures payment & returns signature" },
      { label: "UPI Failure VPA", value: "failure@razorpay", outcome: "Triggers payment.failed event" },
      { label: "Test Visa Card", value: "4111 1111 1111 1111 (any future exp / CVV)", outcome: "OTP page: enter any 6 digits" },
    ],
  },
  stripe: {
    gatewayId: "stripe",
    name: "Stripe",
    sdkLabel: "js.stripe.com/v3 (<PaymentElement /> + Checkout)",
    scriptUrl: "https://js.stripe.com/v3/",
    dashboardUrl: "https://dashboard.stripe.com/test/apikeys",
    supportsBuiltInPublicSandbox: false,
    defaultCurrency: "USD",
    defaultAmountDisplay: "$29.00",
    testHints: [
      { label: "Frictionless Card", value: "4242 4242 4242 4242 · 12/28 · 424", outcome: "Immediate succeeded status" },
      { label: "3DS2 Challenge Card", value: "4000 0025 0000 3155", outcome: "Opens real Stripe 3DS2 challenge modal" },
      { label: "Card Declined", value: "4000 0000 0000 0341", outcome: "Returns card_declined without reload" },
    ],
  },
  paypal: {
    gatewayId: "paypal",
    name: "PayPal",
    sdkLabel: "paypal.com/sdk/js (Orders v2 Smart Buttons)",
    scriptUrl: "https://www.paypal.com/sdk/js",
    dashboardUrl: "https://developer.paypal.com/dashboard/applications/sandbox",
    supportsBuiltInPublicSandbox: true,
    defaultCurrency: "USD",
    defaultAmountDisplay: "$49.00",
    testHints: [
      { label: "PayPal Sandbox Checkout", value: "Smart Payment Buttons live inside stage", outcome: "Opens real PayPal checkout popup" },
      { label: "Sandbox Personal Login", value: "Use any PayPal Sandbox buyer account", outcome: "Popup approval -> Capture JSON" },
      { label: "Card Button Flow", value: "Debit or Credit Card button", outcome: "Tests expanded guest card fields" },
    ],
  },
  cashfree: {
    gatewayId: "cashfree",
    name: "Cashfree Payments",
    sdkLabel: "sdk.cashfree.com/js/v3/cashfree.js (_modal)",
    scriptUrl: "https://sdk.cashfree.com/js/v3/cashfree.js",
    dashboardUrl: "https://merchant.cashfree.com/merchants/pg/developers/api-keys?env=sandbox",
    supportsBuiltInPublicSandbox: false,
    defaultCurrency: "INR",
    defaultAmountDisplay: "₹1,499.00",
    testHints: [
      { label: "Sandbox UPI Simulator", value: "testsuccess@gocash", outcome: "Order transitions to PAID in modal" },
      { label: "Test Card OTP", value: "4706130000000004 · OTP 111000", outcome: "Simulates bank ACS OTP challenge" },
      { label: "Localhost Note", value: "Modal checkout runs directly inline", outcome: "Verifies order status on return" },
    ],
  },
  phonepe: {
    gatewayId: "phonepe",
    name: "PhonePe PG",
    sdkLabel: "mercury.phonepe.com/web/checkout/v2/checkout.js (IFRAME)",
    scriptUrl: "https://mercury.phonepe.com/web/checkout/v2/checkout.js",
    dashboardUrl: "https://developer.phonepe.com/v1/docs/uat-testing",
    supportsBuiltInPublicSandbox: false,
    defaultCurrency: "INR",
    defaultAmountDisplay: "₹499.00",
    testHints: [
      { label: "Preprod PayPage Iframe", value: "PhonePeCheckout.transact({ type: 'IFRAME' })", outcome: "Opens official UAT PayPage simulator" },
      { label: "UPI Simulator Action", value: "Trigger Success / Pending / Fail in UAT screen", outcome: "Server polls v2/order/{id}/status" },
    ],
  },
  "dodo-payments": {
    gatewayId: "dodo-payments",
    name: "Dodo Payments",
    sdkLabel: "test.dodopayments.com/checkouts (Hosted MoR)",
    dashboardUrl: "https://app.dodopayments.com/",
    supportsBuiltInPublicSandbox: false,
    defaultCurrency: "USD",
    defaultAmountDisplay: "$19.00",
    testHints: [
      { label: "MoR Tax Localization", value: "Pick Germany / India / UK inside Dodo checkout", outcome: "Calculates EU VAT / GST live before charge" },
      { label: "Test Visa Card", value: "4242 4242 4242 4242 · any future date", outcome: "Returns session back to /flows to verify" },
    ],
  },
  "lemon-squeezy": {
    gatewayId: "lemon-squeezy",
    name: "Lemon Squeezy",
    sdkLabel: "app.lemonsqueezy.com/js/lemon.js (Overlay + Checkout.Success)",
    scriptUrl: "https://app.lemonsqueezy.com/js/lemon.js",
    dashboardUrl: "https://app.lemonsqueezy.com/settings/api",
    supportsBuiltInPublicSandbox: false,
    defaultCurrency: "USD",
    defaultAmountDisplay: "$49.00",
    testHints: [
      { label: "Test Mode Visa", value: "4242 4242 4242 4242 · any future date · any 3 digits", outcome: "Fires Lemon.js Checkout.Success event" },
      { label: "Promo Code Field", value: "Test discount code inside Lemon.js overlay", outcome: "Live MoR VAT + license generation" },
    ],
  },
};

export function isGatewayId(value: string): value is GatewayId {
  return value in GATEWAY_SANDBOX_SPECS;
}

