import crypto from "crypto";
import {
  GatewayId,
  GatewaySandboxStatus,
  LiveNetworkTrace,
} from "./gatewaySandboxConfig";

const FETCH_TIMEOUT_MS = 12000;

async function fetchWithTimeout(
  url: string,
  init: RequestInit
): Promise<{ status: number; ok: boolean; json: Record<string, unknown>; text: string; durationMs: number }> {
  const started = Date.now();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      ...init,
      signal: controller.signal,
      cache: "no-store",
    });
    const text = await res.text();
    let json: Record<string, unknown> = {};
    try {
      const parsed: unknown = JSON.parse(text);
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        json = parsed as Record<string, unknown>;
      }
    } catch {
      json = { rawText: text.slice(0, 500) };
    }
    return {
      status: res.status,
      ok: res.ok,
      json,
      text,
      durationMs: Date.now() - started,
    };
  } finally {
    clearTimeout(timer);
  }
}

export function resolveSafeOrigin(requestedOrigin: string | undefined, requestUrl: string): string {
  const reqOrigin = new URL(requestUrl).origin;
  const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (configuredSiteUrl) {
    try {
      const parsed = new URL(configuredSiteUrl);
      if (parsed.protocol === "https:" || parsed.protocol === "http:") {
        return parsed.origin;
      }
    } catch {
      // Fallback cleanly to request origin
    }
  }

  if (requestedOrigin) {
    try {
      const parsed = new URL(requestedOrigin);
      if (
        (parsed.protocol === "https:" || parsed.protocol === "http:") &&
        parsed.origin === reqOrigin
      ) {
        return parsed.origin;
      }
    } catch {
      // Ignore malformed client origin
    }
  }

  return reqOrigin;
}

export function getGatewaySandboxStatusMap(): Record<GatewayId, GatewaySandboxStatus> {
  // 1. Razorpay
  const rzpKeyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "";
  const rzpKeySecret = process.env.RAZORPAY_KEY_SECRET || "";
  const rzpIsLive = Boolean(rzpKeyId && !rzpKeyId.startsWith("rzp_test_"));
  const rzpValidKey = Boolean(rzpKeyId && rzpKeyId.startsWith("rzp_test_"));

  // 2. Stripe
  const stripePub =
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || process.env.STRIPE_PUBLISHABLE_KEY || "";
  const stripeSecret = process.env.STRIPE_SECRET_KEY || "";
  const stripeIsLive =
    Boolean(stripePub && !stripePub.startsWith("pk_test_")) ||
    Boolean(stripeSecret && !stripeSecret.startsWith("sk_test_"));
  const stripeReady =
    Boolean(stripePub && stripePub.startsWith("pk_test_")) &&
    Boolean(stripeSecret && stripeSecret.startsWith("sk_test_"));

  // 3. PayPal
  const paypalClientId = process.env.PAYPAL_CLIENT_ID || process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "";
  const paypalSecret = process.env.PAYPAL_CLIENT_SECRET || "";
  const paypalServerReady = Boolean(paypalClientId && paypalSecret);

  // 4. Cashfree
  const cashfreeId = process.env.CASHFREE_CLIENT_ID || process.env.CASHFREE_APP_ID || "";
  const cashfreeSecret = process.env.CASHFREE_CLIENT_SECRET || "";
  const cashfreeReady = Boolean(cashfreeId && cashfreeSecret);

  // 5. PhonePe
  const phonepeId = process.env.PHONEPE_CLIENT_ID || "";
  const phonepeSecret = process.env.PHONEPE_CLIENT_SECRET || "";
  const phonepeReady = Boolean(phonepeId && phonepeSecret);

  // 6. Dodo Payments
  const dodoApiKey = process.env.DODO_PAYMENTS_API_KEY || "";
  const dodoProductId = process.env.DODO_PAYMENTS_PRODUCT_ID || "";
  const dodoReady = Boolean(dodoApiKey && dodoProductId);

  // 7. Lemon Squeezy
  const lsqApiKey = process.env.LEMONSQUEEZY_API_KEY || "";
  const lsqStoreId = process.env.LEMONSQUEEZY_STORE_ID || "";
  const lsqVariantId = process.env.LEMONSQUEEZY_VARIANT_ID || "";
  const lsqDirectUrl =
    process.env.LEMONSQUEEZY_TEST_CHECKOUT_URL ||
    process.env.NEXT_PUBLIC_LEMONSQUEEZY_TEST_CHECKOUT_URL ||
    "";
  const lsqApiReady = Boolean(lsqApiKey && lsqStoreId && lsqVariantId);
  const lsqReady = lsqApiReady || Boolean(lsqDirectUrl);

  return {
    razorpay: {
      gatewayId: "razorpay",
      configured: rzpValidKey,
      mode: rzpValidKey && rzpKeySecret ? "server_sandbox" : rzpValidKey ? "client_test_only" : "unconfigured",
      modeLabel: rzpValidKey ? "SANDBOX_CHECKOUT_READY" : "SANDBOX_UNAVAILABLE",
      warning: rzpIsLive
        ? "Razorpay live keys are disabled — only test keys are permitted in sandbox mode."
        : undefined,
      publicConfig: {
        currency: "INR",
        amountDisplay: "₹999.00",
      },
    },
    stripe: {
      gatewayId: "stripe",
      configured: stripeReady,
      mode: stripeReady ? "server_sandbox" : "unconfigured",
      modeLabel: stripeReady ? "SANDBOX_CHECKOUT_READY" : "SANDBOX_UNAVAILABLE",
      warning: stripeIsLive
        ? "Stripe live keys are disabled — only test keys are permitted in sandbox mode."
        : undefined,
      publicConfig: {
        currency: "USD",
        amountDisplay: "$29.00",
      },
    },
    paypal: {
      gatewayId: "paypal",
      configured: true,
      mode: paypalServerReady ? "server_sandbox" : "public_sandbox",
      modeLabel: "SANDBOX_CHECKOUT_READY",
      publicConfig: {
        clientId: paypalServerReady ? paypalClientId : "sb",
        currency: "USD",
        amountDisplay: "$49.00",
      },
    },
    cashfree: {
      gatewayId: "cashfree",
      configured: cashfreeReady,
      mode: cashfreeReady ? "server_sandbox" : "unconfigured",
      modeLabel: cashfreeReady ? "SANDBOX_CHECKOUT_READY" : "SANDBOX_UNAVAILABLE",
      publicConfig: {
        cashfreeMode: "sandbox",
        currency: "INR",
        amountDisplay: "₹1,499.00",
      },
    },
    phonepe: {
      gatewayId: "phonepe",
      configured: phonepeReady,
      mode: phonepeReady ? "server_sandbox" : "unconfigured",
      modeLabel: phonepeReady ? "SANDBOX_CHECKOUT_READY" : "SANDBOX_UNAVAILABLE",
      publicConfig: {
        currency: "INR",
        amountDisplay: "₹499.00",
      },
    },
    "dodo-payments": {
      gatewayId: "dodo-payments",
      configured: dodoReady,
      mode: dodoReady ? "server_sandbox" : "unconfigured",
      modeLabel: dodoReady ? "SANDBOX_CHECKOUT_READY" : "SANDBOX_UNAVAILABLE",
      publicConfig: {
        currency: "USD",
        amountDisplay: "$19.00",
      },
    },
    "lemon-squeezy": {
      gatewayId: "lemon-squeezy",
      configured: lsqReady,
      mode: lsqReady ? "server_sandbox" : "unconfigured",
      modeLabel: lsqReady ? "SANDBOX_CHECKOUT_READY" : "SANDBOX_UNAVAILABLE",
      publicConfig: {
        checkoutUrl: !lsqApiReady && lsqDirectUrl ? lsqDirectUrl : undefined,
        currency: "USD",
        amountDisplay: "$49.00",
      },
    },
  };
}

export interface CreateSessionInput {
  gatewayId: GatewayId;
  scenarioId?: string;
  checkoutMode?: "payment_element" | "hosted_checkout";
  customerEmail?: string;
  customerName?: string;
  safeOrigin: string;
}

export interface CreateSessionResult {
  ok: boolean;
  gatewayId: GatewayId;
  mode: string;
  orderId?: string;
  sessionId?: string;
  paymentIntentId?: string;
  clientSecret?: string;
  checkoutUrl?: string;
  tokenUrl?: string;
  keyId?: string;
  publishableKey?: string;
  clientId?: string;
  amountSubunits?: number;
  currency: string;
  error?: string;
  trace: LiveNetworkTrace;
}

function nowIso(): string {
  return new Date().toISOString().split("T")[1]?.slice(0, 12) ?? "";
}

export async function createGatewaySandboxSession(
  input: CreateSessionInput
): Promise<CreateSessionResult> {
  const {
    gatewayId,
    scenarioId = "default",
    checkoutMode = "payment_element",
    customerEmail = "developer@kosh.uno",
    customerName = "Parminder Test User",
    safeOrigin,
  } = input;

  switch (gatewayId) {
    case "razorpay": {
      const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "";
      const keySecret = process.env.RAZORPAY_KEY_SECRET || "";
      if (!keyId || !keyId.startsWith("rzp_test_")) {
        return {
          ok: false,
          gatewayId,
          mode: "unconfigured",
          currency: "INR",
          error: "Razorpay test mode is currently unavailable.",
          trace: {
            id: `tr_${Date.now()}`,
            timestamp: nowIso(),
            stage: "SESSION_CREATE",
            method: "POST",
            endpoint: "https://api.razorpay.com/v1/orders",
            summary: "Sandbox gateway unavailable for Razorpay.",
          },
        };
      }

      if (!keySecret) {
        return {
          ok: true,
          gatewayId,
          mode: "client_test_only",
          keyId,
          amountSubunits: 99900,
          currency: "INR",
          trace: {
            id: `tr_${Date.now()}`,
            timestamp: nowIso(),
            stage: "SESSION_CREATE",
            method: "CLIENT",
            endpoint: "checkout.razorpay.com/v1/checkout.js",
            summary: "Initialized Razorpay Test Checkout session.",
            requestPayload: { amount: 99900, currency: "INR" },
          },
        };
      }

      const authHeader = `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`;
      const payload = {
        amount: 99900,
        currency: "INR",
        receipt: `flow_${Date.now().toString().slice(-10)}`,
        notes: { source: "portfolio_flow_studio", scenarioId },
      };

      const res = await fetchWithTimeout("https://api.razorpay.com/v1/orders", {
        method: "POST",
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const orderId = typeof res.json.id === "string" ? res.json.id : undefined;
      return {
        ok: res.ok && Boolean(orderId),
        gatewayId,
        mode: "server_sandbox",
        orderId,
        keyId,
        amountSubunits: 99900,
        currency: "INR",
        error: res.ok ? undefined : String((res.json.error as Record<string, unknown> | undefined)?.description ?? "Razorpay /v1/orders failed"),
        trace: {
          id: `tr_${Date.now()}`,
          timestamp: nowIso(),
          stage: "SESSION_CREATE",
          method: "POST",
          endpoint: "https://api.razorpay.com/v1/orders",
          httpStatus: res.status,
          durationMs: res.durationMs,
          summary: res.ok
            ? `Created Razorpay Order ${orderId ?? ""}`
            : `Razorpay rejected order request (${res.status})`,
          requestPayload: payload,
          responsePayload: res.json,
        },
      };
    }

    case "stripe": {
      const pub =
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || process.env.STRIPE_PUBLISHABLE_KEY || "";
      const sec = process.env.STRIPE_SECRET_KEY || "";
      if (!pub.startsWith("pk_test_") || !sec.startsWith("sk_test_")) {
        return {
          ok: false,
          gatewayId,
          mode: "unconfigured",
          currency: "USD",
          error: "Stripe test mode is currently unavailable.",
          trace: {
            id: `tr_${Date.now()}`,
            timestamp: nowIso(),
            stage: "SESSION_CREATE",
            method: "POST",
            endpoint: "https://api.stripe.com/v1/payment_intents",
            summary: "Sandbox gateway unavailable for Stripe.",
          },
        };
      }

      if (checkoutMode === "hosted_checkout") {
        const params = new URLSearchParams({
          mode: "payment",
          "line_items[0][price_data][currency]": "usd",
          "line_items[0][price_data][unit_amount]": "2900",
          "line_items[0][price_data][product_data][name]": "Kosh Cloud Pro Plan (Sandbox)",
          "line_items[0][quantity]": "1",
          customer_email: customerEmail,
          success_url: `${safeOrigin}/flows?gateway=stripe&scenario=${encodeURIComponent(scenarioId)}&stripe_session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${safeOrigin}/flows?gateway=stripe&scenario=${encodeURIComponent(scenarioId)}&cancelled=1`,
        });

        const res = await fetchWithTimeout("https://api.stripe.com/v1/checkout/sessions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${sec}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: params.toString(),
        });

        const checkoutUrl = typeof res.json.url === "string" ? res.json.url : undefined;
        const sessionId = typeof res.json.id === "string" ? res.json.id : undefined;

        return {
          ok: res.ok && Boolean(checkoutUrl),
          gatewayId,
          mode: "hosted_checkout",
          sessionId,
          checkoutUrl,
          publishableKey: pub,
          currency: "USD",
          error: res.ok ? undefined : String((res.json.error as Record<string, unknown> | undefined)?.message ?? "Stripe Checkout Session failed"),
          trace: {
            id: `tr_${Date.now()}`,
            timestamp: nowIso(),
            stage: "SESSION_CREATE",
            method: "POST",
            endpoint: "https://api.stripe.com/v1/checkout/sessions",
            httpStatus: res.status,
            durationMs: res.durationMs,
            summary: res.ok ? `Created Hosted Session ${sessionId ?? ""}` : `Stripe Checkout failed (${res.status})`,
            requestPayload: { mode: "payment", amount: 2900, currency: "usd", customer_email: customerEmail },
            responsePayload: {
              id: sessionId,
              status: res.json.status,
              url: checkoutUrl,
              payment_status: res.json.payment_status,
            },
          },
        };
      }

      const params = new URLSearchParams({
        amount: "2900",
        currency: "usd",
        "automatic_payment_methods[enabled]": "true",
        receipt_email: customerEmail,
        "metadata[source]": "portfolio_flow_studio",
        "metadata[scenarioId]": scenarioId,
      });

      const res = await fetchWithTimeout("https://api.stripe.com/v1/payment_intents", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${sec}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      });

      const paymentIntentId = typeof res.json.id === "string" ? res.json.id : undefined;
      const clientSecret = typeof res.json.client_secret === "string" ? res.json.client_secret : undefined;

      return {
        ok: res.ok && Boolean(clientSecret),
        gatewayId,
        mode: "payment_element",
        paymentIntentId,
        clientSecret,
        publishableKey: pub,
        amountSubunits: 2900,
        currency: "USD",
        error: res.ok ? undefined : String((res.json.error as Record<string, unknown> | undefined)?.message ?? "Stripe PaymentIntent failed"),
        trace: {
          id: `tr_${Date.now()}`,
          timestamp: nowIso(),
          stage: "SESSION_CREATE",
          method: "POST",
          endpoint: "https://api.stripe.com/v1/payment_intents",
          httpStatus: res.status,
          durationMs: res.durationMs,
          summary: res.ok
            ? `Created PaymentIntent ${paymentIntentId ?? ""}`
            : `Stripe PaymentIntent error (${res.status})`,
          requestPayload: { amount: 2900, currency: "usd", automatic_payment_methods: { enabled: true } },
          responsePayload: {
            id: paymentIntentId,
            status: res.json.status,
            amount: res.json.amount,
            currency: res.json.currency,
            client_secret: clientSecret ? `${clientSecret.slice(0, 18)}...` : undefined,
          },
        },
      };
    }

    case "paypal": {
      const clientId = process.env.PAYPAL_CLIENT_ID || process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "";
      const clientSecret = process.env.PAYPAL_CLIENT_SECRET || "";

      if (!clientId || !clientSecret) {
        return {
          ok: true,
          gatewayId,
          mode: "public_sandbox",
          clientId: "sb",
          currency: "USD",
          trace: {
            id: `tr_${Date.now()}`,
            timestamp: nowIso(),
            stage: "SDK_OPEN",
            method: "SDK",
            endpoint: "https://www.paypal.com/sdk/js?client-id=sb&currency=USD",
            summary: "Initialized PayPal Built-in Public Sandbox (client-id=sb).",
            requestPayload: { clientId: "sb", currency: "USD", value: "49.00" },
          },
        };
      }

      const tokenRes = await fetchWithTimeout("https://api-m.sandbox.paypal.com/v1/oauth2/token", {
        method: "POST",
        headers: {
          Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "grant_type=client_credentials",
      });

      const accessToken = typeof tokenRes.json.access_token === "string" ? tokenRes.json.access_token : "";
      if (!tokenRes.ok || !accessToken) {
        return {
          ok: false,
          gatewayId,
          mode: "server_sandbox",
          currency: "USD",
          error: "PayPal Sandbox OAuth failed — please verify PayPal sandbox availability.",
          trace: {
            id: `tr_${Date.now()}`,
            timestamp: nowIso(),
            stage: "SESSION_CREATE",
            method: "POST",
            endpoint: "https://api-m.sandbox.paypal.com/v1/oauth2/token",
            httpStatus: tokenRes.status,
            durationMs: tokenRes.durationMs,
            summary: `PayPal OAuth failed (${tokenRes.status})`,
          },
        };
      }

      const orderPayload = {
        intent: "CAPTURE",
        purchase_units: [
          {
            reference_id: `flow_${scenarioId}`,
            description: "Digital Bundle — Flow Studio Sandbox",
            amount: { currency_code: "USD", value: "49.00" },
          },
        ],
      };

      const orderRes = await fetchWithTimeout("https://api-m.sandbox.paypal.com/v2/checkout/orders", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderPayload),
      });

      const orderId = typeof orderRes.json.id === "string" ? orderRes.json.id : undefined;

      return {
        ok: orderRes.ok && Boolean(orderId),
        gatewayId,
        mode: "server_sandbox",
        orderId,
        clientId,
        currency: "USD",
        error: orderRes.ok ? undefined : String(orderRes.json.message ?? "PayPal /v2/checkout/orders failed"),
        trace: {
          id: `tr_${Date.now()}`,
          timestamp: nowIso(),
          stage: "SESSION_CREATE",
          method: "POST",
          endpoint: "https://api-m.sandbox.paypal.com/v2/checkout/orders",
          httpStatus: orderRes.status,
          durationMs: orderRes.durationMs,
          summary: orderRes.ok
            ? `Created PayPal Order ${orderId ?? ""}`
            : `PayPal Order failed (${orderRes.status})`,
          requestPayload: orderPayload,
          responsePayload: { id: orderId, status: orderRes.json.status },
        },
      };
    }

    case "cashfree": {
      const clientId = process.env.CASHFREE_CLIENT_ID || process.env.CASHFREE_APP_ID || "";
      const clientSecret = process.env.CASHFREE_CLIENT_SECRET || "";
      if (!clientId || !clientSecret) {
        return {
          ok: false,
          gatewayId,
          mode: "unconfigured",
          currency: "INR",
          error: "Cashfree sandbox is currently unavailable.",
          trace: {
            id: `tr_${Date.now()}`,
            timestamp: nowIso(),
            stage: "SESSION_CREATE",
            method: "POST",
            endpoint: "https://sandbox.cashfree.com/pg/orders",
            summary: "Sandbox gateway unavailable for Cashfree.",
          },
        };
      }

      const orderId = `cf_flow_${Date.now()}`;
      const explicitReturn = process.env.CASHFREE_RETURN_URL;
      const useReturnUrl = explicitReturn
        ? explicitReturn
        : safeOrigin.startsWith("https://")
        ? `${safeOrigin}/flows?gateway=cashfree&scenario=${encodeURIComponent(scenarioId)}&cf_order_id={order_id}`
        : undefined;

      const bodyPayload: Record<string, unknown> = {
        order_id: orderId,
        order_amount: 1499.0,
        order_currency: "INR",
        customer_details: {
          customer_id: "cust_flow_sandbox",
          customer_name: customerName,
          customer_email: customerEmail,
          customer_phone: "9999999999",
        },
        ...(useReturnUrl ? { order_meta: { return_url: useReturnUrl } } : {}),
      };

      const res = await fetchWithTimeout("https://sandbox.cashfree.com/pg/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-version": "2023-08-01",
          "x-client-id": clientId,
          "x-client-secret": clientSecret,
        },
        body: JSON.stringify(bodyPayload),
      });

      const paymentSessionId =
        typeof res.json.payment_session_id === "string" ? res.json.payment_session_id : undefined;

      return {
        ok: res.ok && Boolean(paymentSessionId),
        gatewayId,
        mode: "server_sandbox",
        orderId,
        sessionId: paymentSessionId,
        currency: "INR",
        error: res.ok ? undefined : String(res.json.message ?? "Cashfree sandbox order failed"),
        trace: {
          id: `tr_${Date.now()}`,
          timestamp: nowIso(),
          stage: "SESSION_CREATE",
          method: "POST",
          endpoint: "https://sandbox.cashfree.com/pg/orders",
          httpStatus: res.status,
          durationMs: res.durationMs,
          summary: res.ok
            ? `Created Cashfree Session ${paymentSessionId?.slice(0, 22) ?? ""}...`
            : `Cashfree error (${res.status})`,
          requestPayload: bodyPayload,
          responsePayload: res.json,
        },
      };
    }

    case "phonepe": {
      const clientId = process.env.PHONEPE_CLIENT_ID || "";
      const clientSecret = process.env.PHONEPE_CLIENT_SECRET || "";
      const clientVersion = process.env.PHONEPE_CLIENT_VERSION || "1";

      if (!clientId || !clientSecret) {
        return {
          ok: false,
          gatewayId,
          mode: "unconfigured",
          currency: "INR",
          error: "PhonePe UAT sandbox is currently unavailable.",
          trace: {
            id: `tr_${Date.now()}`,
            timestamp: nowIso(),
            stage: "SESSION_CREATE",
            method: "POST",
            endpoint: "https://api-preprod.phonepe.com/apis/pg-sandbox/checkout/v2/pay",
            summary: "Sandbox gateway unavailable for PhonePe.",
          },
        };
      }

      const tokenBody = new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        client_version: clientVersion,
        grant_type: "client_credentials",
      });

      const authRes = await fetchWithTimeout(
        "https://api-preprod.phonepe.com/apis/pg-sandbox/v1/oauth/token",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: tokenBody.toString(),
        }
      );

      const accessToken = typeof authRes.json.access_token === "string" ? authRes.json.access_token : "";
      if (!authRes.ok || !accessToken) {
        return {
          ok: false,
          gatewayId,
          mode: "server_sandbox",
          currency: "INR",
          error: String(authRes.json.message ?? "PhonePe UAT OAuth token generation failed."),
          trace: {
            id: `tr_${Date.now()}`,
            timestamp: nowIso(),
            stage: "SESSION_CREATE",
            method: "POST",
            endpoint: "https://api-preprod.phonepe.com/apis/pg-sandbox/v1/oauth/token",
            httpStatus: authRes.status,
            durationMs: authRes.durationMs,
            summary: `PhonePe OAuth rejected (${authRes.status})`,
            responsePayload: authRes.json,
          },
        };
      }

      const merchantOrderId = `PP_FLOW_${Date.now()}`;
      const payPayload = {
        merchantOrderId,
        amount: 49900,
        expireAfter: 1200,
        paymentFlow: {
          type: "PG_CHECKOUT",
          merchantUrls: {
            redirectUrl: `${safeOrigin}/flows?gateway=phonepe&scenario=${encodeURIComponent(scenarioId)}&phonepe_order_id=${merchantOrderId}`,
          },
        },
      };

      const payRes = await fetchWithTimeout(
        "https://api-preprod.phonepe.com/apis/pg-sandbox/checkout/v2/pay",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `O-Bearer ${accessToken}`,
          },
          body: JSON.stringify(payPayload),
        }
      );

      const redirectUrl = typeof payRes.json.redirectUrl === "string" ? payRes.json.redirectUrl : undefined;
      return {
        ok: payRes.ok && Boolean(redirectUrl),
        gatewayId,
        mode: "server_sandbox",
        orderId: merchantOrderId,
        tokenUrl: redirectUrl,
        checkoutUrl: redirectUrl,
        currency: "INR",
        error: payRes.ok ? undefined : String(payRes.json.message ?? "PhonePe v2 /pay failed"),
        trace: {
          id: `tr_${Date.now()}`,
          timestamp: nowIso(),
          stage: "SESSION_CREATE",
          method: "POST",
          endpoint: "https://api-preprod.phonepe.com/apis/pg-sandbox/checkout/v2/pay",
          httpStatus: payRes.status,
          durationMs: payRes.durationMs,
          summary: payRes.ok
            ? `Generated PhonePe tokenUrl for ${merchantOrderId}`
            : `PhonePe /pay error (${payRes.status})`,
          requestPayload: payPayload,
          responsePayload: payRes.json,
        },
      };
    }

    case "dodo-payments": {
      const apiKey = process.env.DODO_PAYMENTS_API_KEY || "";
      const productId = process.env.DODO_PAYMENTS_PRODUCT_ID || "";

      if (!apiKey || !productId) {
        return {
          ok: false,
          gatewayId,
          mode: "unconfigured",
          currency: "USD",
          error: "Dodo Payments test mode is currently unavailable.",
          trace: {
            id: `tr_${Date.now()}`,
            timestamp: nowIso(),
            stage: "SESSION_CREATE",
            method: "POST",
            endpoint: "https://test.dodopayments.com/checkouts",
            summary: "Sandbox gateway unavailable for Dodo Payments.",
          },
        };
      }

      const payload = {
        billing_address: { country: "US" },
        customer: { email: customerEmail, name: customerName },
        product_cart: [{ product_id: productId, quantity: 1 }],
        return_url: `${safeOrigin}/flows?gateway=dodo-payments&scenario=${encodeURIComponent(scenarioId)}`,
        metadata: { source: "portfolio_flow_studio", scenarioId },
      };

      const res = await fetchWithTimeout("https://test.dodopayments.com/checkouts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const checkoutUrl = typeof res.json.checkout_url === "string" ? res.json.checkout_url : undefined;
      const sessionId = typeof res.json.session_id === "string" ? res.json.session_id : undefined;

      return {
        ok: res.ok && Boolean(checkoutUrl),
        gatewayId,
        mode: "server_sandbox",
        sessionId,
        checkoutUrl,
        currency: "USD",
        error: res.ok ? undefined : String(res.json.message ?? "Dodo /checkouts failed"),
        trace: {
          id: `tr_${Date.now()}`,
          timestamp: nowIso(),
          stage: "SESSION_CREATE",
          method: "POST",
          endpoint: "https://test.dodopayments.com/checkouts",
          httpStatus: res.status,
          durationMs: res.durationMs,
          summary: res.ok ? `Created Dodo Session ${sessionId ?? ""}` : `Dodo /checkouts error (${res.status})`,
          requestPayload: payload,
          responsePayload: res.json,
        },
      };
    }

    case "lemon-squeezy": {
      const apiKey = process.env.LEMONSQUEEZY_API_KEY || "";
      const storeId = process.env.LEMONSQUEEZY_STORE_ID || "";
      const variantId = process.env.LEMONSQUEEZY_VARIANT_ID || "";
      const directTestUrl =
        process.env.LEMONSQUEEZY_TEST_CHECKOUT_URL ||
        process.env.NEXT_PUBLIC_LEMONSQUEEZY_TEST_CHECKOUT_URL ||
        "";

      if (directTestUrl && !(apiKey && storeId && variantId)) {
        return {
          ok: true,
          gatewayId,
          mode: "direct_overlay",
          checkoutUrl: directTestUrl,
          currency: "USD",
          trace: {
            id: `tr_${Date.now()}`,
            timestamp: nowIso(),
            stage: "SDK_OPEN",
            method: "SDK",
            endpoint: "LemonSqueezy.Url.Open()",
            summary: "Initialized Lemon Squeezy test checkout overlay.",
          },
        };
      }

      if (!apiKey || !storeId || !variantId) {
        return {
          ok: false,
          gatewayId,
          mode: "unconfigured",
          currency: "USD",
          error: "Lemon Squeezy test mode is currently unavailable.",
          trace: {
            id: `tr_${Date.now()}`,
            timestamp: nowIso(),
            stage: "SESSION_CREATE",
            method: "POST",
            endpoint: "https://api.lemonsqueezy.com/v1/checkouts",
            summary: "Sandbox gateway unavailable for Lemon Squeezy.",
          },
        };
      }

      const payload = {
        data: {
          type: "checkouts",
          attributes: {
            checkout_options: {
              embed: true,
              media: true,
              desc: true,
              discount: true,
            },
            checkout_data: {
              email: customerEmail,
              name: customerName,
              custom: { source: "portfolio_flow_studio", scenarioId },
            },
            test_mode: true,
          },
          relationships: {
            store: { data: { type: "stores", id: storeId } },
            variant: { data: { type: "variants", id: variantId } },
          },
        },
      };

      const res = await fetchWithTimeout("https://api.lemonsqueezy.com/v1/checkouts", {
        method: "POST",
        headers: {
          Accept: "application/vnd.api+json",
          "Content-Type": "application/vnd.api+json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(payload),
      });

      const dataObj = res.json.data as Record<string, unknown> | undefined;
      const attrs = dataObj?.attributes as Record<string, unknown> | undefined;
      const checkoutUrl = typeof attrs?.url === "string" ? attrs.url : undefined;
      const sessionId = typeof dataObj?.id === "string" ? dataObj.id : undefined;

      return {
        ok: res.ok && Boolean(checkoutUrl),
        gatewayId,
        mode: "server_sandbox",
        sessionId,
        checkoutUrl,
        currency: "USD",
        error: res.ok ? undefined : "Lemon Squeezy /v1/checkouts failed — verify Store, Variant & Test API Key.",
        trace: {
          id: `tr_${Date.now()}`,
          timestamp: nowIso(),
          stage: "SESSION_CREATE",
          method: "POST",
          endpoint: "https://api.lemonsqueezy.com/v1/checkouts",
          httpStatus: res.status,
          durationMs: res.durationMs,
          summary: res.ok
            ? `Created test_mode Checkout ${sessionId ?? ""}`
            : `Lemon Squeezy rejected checkout (${res.status})`,
          requestPayload: payload,
          responsePayload: { id: sessionId, url: checkoutUrl, test_mode: attrs?.test_mode },
        },
      };
    }
  }
}

export interface VerifySandboxInput {
  gatewayId: GatewayId;
  orderId?: string;
  paymentId?: string;
  signature?: string;
  paymentIntentId?: string;
  sessionId?: string;
  clientDetails?: Record<string, unknown>;
}

export interface VerifySandboxResult {
  verified: boolean;
  status: string;
  orderId?: string;
  paymentId?: string;
  signatureValid?: boolean;
  error?: string;
  trace: LiveNetworkTrace;
}

export async function verifyGatewaySandboxPayment(
  input: VerifySandboxInput
): Promise<VerifySandboxResult> {
  const {
    gatewayId,
    orderId,
    paymentId,
    signature,
    paymentIntentId,
    sessionId,
    clientDetails,
  } = input;

  switch (gatewayId) {
    case "razorpay": {
      const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "";
      const keySecret = process.env.RAZORPAY_KEY_SECRET || "";

      if (keySecret && orderId && paymentId && signature) {
        const expected = crypto
          .createHmac("sha256", keySecret)
          .update(`${orderId}|${paymentId}`)
          .digest("hex");

        const expectedBuf = Buffer.from(expected, "utf8");
        const actualBuf = Buffer.from(signature, "utf8");
        const isMatch =
          expectedBuf.length === actualBuf.length && crypto.timingSafeEqual(expectedBuf, actualBuf);

        let paymentStatus = isMatch ? "verified_hmac" : "signature_mismatch";
        let fetchedJson: Record<string, unknown> = {
          razorpay_order_id: orderId,
          razorpay_payment_id: paymentId,
          signature_valid: isMatch,
        };

        if (isMatch && keyId) {
          const payRes = await fetchWithTimeout(`https://api.razorpay.com/v1/payments/${paymentId}`, {
            method: "GET",
            headers: {
              Authorization: `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`,
            },
          });
          if (payRes.ok) {
            paymentStatus = String(payRes.json.status ?? "captured");
            fetchedJson = {
              id: payRes.json.id,
              order_id: payRes.json.order_id,
              status: payRes.json.status,
              method: payRes.json.method,
              amount: payRes.json.amount,
              signature_valid: isMatch,
            };
          }
        }

        return {
          verified: isMatch,
          status: paymentStatus,
          orderId,
          paymentId,
          signatureValid: isMatch,
          trace: {
            id: `tr_${Date.now()}`,
            timestamp: nowIso(),
            stage: "SERVER_VERIFY",
            method: "HMAC-SHA256",
            endpoint: "/api/flows/sandbox/verify -> timingSafeEqual",
            httpStatus: isMatch ? 200 : 400,
            summary: isMatch
              ? `HMAC signature verified cleanly for ${paymentId}`
              : "HMAC signature mismatch!",
            responsePayload: fetchedJson,
          },
        };
      }

      return {
        verified: Boolean(paymentId),
        status: paymentId ? "client_test_captured" : "unverified",
        paymentId,
        orderId,
        signatureValid: false,
        trace: {
          id: `tr_${Date.now()}`,
          timestamp: nowIso(),
          stage: "SERVER_VERIFY",
          method: "CLIENT_TEST",
          endpoint: "checkout.razorpay.com handler",
          summary: `Received client test payment ${paymentId ?? ""}.`,
          responsePayload: { razorpay_payment_id: paymentId },
        },
      };
    }

    case "stripe": {
      const sec = process.env.STRIPE_SECRET_KEY || "";
      if (!sec.startsWith("sk_test_")) {
        return {
          verified: false,
          status: "unconfigured",
          error: "Stripe verification is unavailable in test mode.",
          trace: {
            id: `tr_${Date.now()}`,
            timestamp: nowIso(),
            stage: "SERVER_VERIFY",
            method: "GET",
            endpoint: "https://api.stripe.com/v1/payment_intents",
            summary: "Stripe secret key unavailable.",
          },
        };
      }

      if (sessionId) {
        const res = await fetchWithTimeout(
          `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${sec}` },
          }
        );
        const paymentStatus = String(res.json.payment_status ?? res.json.status ?? "unknown");
        return {
          verified: res.ok && paymentStatus === "paid",
          status: paymentStatus,
          orderId: sessionId,
          paymentId: typeof res.json.payment_intent === "string" ? res.json.payment_intent : undefined,
          trace: {
            id: `tr_${Date.now()}`,
            timestamp: nowIso(),
            stage: "SERVER_VERIFY",
            method: "GET",
            endpoint: `https://api.stripe.com/v1/checkout/sessions/${sessionId}`,
            httpStatus: res.status,
            durationMs: res.durationMs,
            summary: `Session payment_status=${paymentStatus}`,
            responsePayload: {
              id: res.json.id,
              status: res.json.status,
              payment_status: res.json.payment_status,
              payment_intent: res.json.payment_intent,
            },
          },
        };
      }

      if (!paymentIntentId) {
        return {
          verified: false,
          status: "missing_payment_intent",
          error: "Missing paymentIntentId",
          trace: {
            id: `tr_${Date.now()}`,
            timestamp: nowIso(),
            stage: "SERVER_VERIFY",
            method: "GET",
            endpoint: "https://api.stripe.com/v1/payment_intents",
            summary: "Missing paymentIntentId.",
          },
        };
      }

      const res = await fetchWithTimeout(
        `https://api.stripe.com/v1/payment_intents/${encodeURIComponent(paymentIntentId)}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${sec}` },
        }
      );

      const piStatus = String(res.json.status ?? "unknown");
      return {
        verified: res.ok && piStatus === "succeeded",
        status: piStatus,
        paymentId: paymentIntentId,
        trace: {
          id: `tr_${Date.now()}`,
          timestamp: nowIso(),
          stage: "SERVER_VERIFY",
          method: "GET",
          endpoint: `https://api.stripe.com/v1/payment_intents/${paymentIntentId}`,
          httpStatus: res.status,
          durationMs: res.durationMs,
          summary: `Retrieved PaymentIntent status=${piStatus}`,
          responsePayload: {
            id: res.json.id,
            status: res.json.status,
            amount_received: res.json.amount_received,
            currency: res.json.currency,
          },
        },
      };
    }

    case "paypal": {
      const clientId = process.env.PAYPAL_CLIENT_ID || process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "";
      const clientSecret = process.env.PAYPAL_CLIENT_SECRET || "";

      if (clientId && clientSecret && orderId) {
        const tokenRes = await fetchWithTimeout("https://api-m.sandbox.paypal.com/v1/oauth2/token", {
          method: "POST",
          headers: {
            Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: "grant_type=client_credentials",
        });
        const accessToken = typeof tokenRes.json.access_token === "string" ? tokenRes.json.access_token : "";

        const captureRes = await fetchWithTimeout(
          `https://api-m.sandbox.paypal.com/v2/checkout/orders/${encodeURIComponent(orderId)}/capture`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        const capStatus = String(captureRes.json.status ?? "UNKNOWN");
        return {
          verified: captureRes.ok && capStatus === "COMPLETED",
          status: capStatus,
          orderId,
          trace: {
            id: `tr_${Date.now()}`,
            timestamp: nowIso(),
            stage: "SERVER_VERIFY",
            method: "POST",
            endpoint: `https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderId}/capture`,
            httpStatus: captureRes.status,
            durationMs: captureRes.durationMs,
            summary: `PayPal Capture status=${capStatus}`,
            responsePayload: captureRes.json,
          },
        };
      }

      const captureStatus = String(clientDetails?.status ?? "COMPLETED");
      return {
        verified: captureStatus === "COMPLETED",
        status: captureStatus,
        orderId,
        trace: {
          id: `tr_${Date.now()}`,
          timestamp: nowIso(),
          stage: "SERVER_VERIFY",
          method: "SDK_CAPTURE",
          endpoint: "PayPal Sandbox SDK actions.order.capture()",
          httpStatus: 200,
          summary: `PayPal Public Sandbox captured order ${orderId ?? ""}`,
          responsePayload: clientDetails ?? { id: orderId, status: captureStatus },
        },
      };
    }

    case "cashfree": {
      const clientId = process.env.CASHFREE_CLIENT_ID || process.env.CASHFREE_APP_ID || "";
      const clientSecret = process.env.CASHFREE_CLIENT_SECRET || "";
      if (!clientId || !clientSecret || !orderId) {
        return {
          verified: false,
          status: "missing_config_or_order",
          error: "Missing Cashfree credentials or orderId.",
          trace: {
            id: `tr_${Date.now()}`,
            timestamp: nowIso(),
            stage: "SERVER_VERIFY",
            method: "GET",
            endpoint: "https://sandbox.cashfree.com/pg/orders/{orderId}",
            summary: "Cannot verify order without sandbox keys & orderId.",
          },
        };
      }

      const res = await fetchWithTimeout(
        `https://sandbox.cashfree.com/pg/orders/${encodeURIComponent(orderId)}`,
        {
          method: "GET",
          headers: {
            "x-api-version": "2023-08-01",
            "x-client-id": clientId,
            "x-client-secret": clientSecret,
          },
        }
      );

      const orderStatus = String(res.json.order_status ?? "ACTIVE");
      return {
        verified: res.ok && orderStatus === "PAID",
        status: orderStatus,
        orderId,
        trace: {
          id: `tr_${Date.now()}`,
          timestamp: nowIso(),
          stage: "SERVER_VERIFY",
          method: "GET",
          endpoint: `https://sandbox.cashfree.com/pg/orders/${orderId}`,
          httpStatus: res.status,
          durationMs: res.durationMs,
          summary: `Cashfree GET order_status=${orderStatus}`,
          responsePayload: res.json,
        },
      };
    }

    case "phonepe": {
      const clientId = process.env.PHONEPE_CLIENT_ID || "";
      const clientSecret = process.env.PHONEPE_CLIENT_SECRET || "";
      const clientVersion = process.env.PHONEPE_CLIENT_VERSION || "1";
      if (!clientId || !clientSecret || !orderId) {
        return {
          verified: false,
          status: "missing_config_or_order",
          error: "Missing PhonePe credentials or orderId.",
          trace: {
            id: `tr_${Date.now()}`,
            timestamp: nowIso(),
            stage: "SERVER_VERIFY",
            method: "GET",
            endpoint: "https://api-preprod.phonepe.com/apis/pg-sandbox/checkout/v2/order/{id}/status",
            summary: "Cannot check PhonePe status.",
          },
        };
      }

      const authRes = await fetchWithTimeout(
        "https://api-preprod.phonepe.com/apis/pg-sandbox/v1/oauth/token",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            client_id: clientId,
            client_secret: clientSecret,
            client_version: clientVersion,
            grant_type: "client_credentials",
          }).toString(),
        }
      );

      const accessToken = typeof authRes.json.access_token === "string" ? authRes.json.access_token : "";
      const res = await fetchWithTimeout(
        `https://api-preprod.phonepe.com/apis/pg-sandbox/checkout/v2/order/${encodeURIComponent(orderId)}/status`,
        {
          method: "GET",
          headers: { Authorization: `O-Bearer ${accessToken}` },
        }
      );

      const state = String(res.json.state ?? "PENDING");
      return {
        verified: res.ok && state === "COMPLETED",
        status: state,
        orderId,
        trace: {
          id: `tr_${Date.now()}`,
          timestamp: nowIso(),
          stage: "SERVER_VERIFY",
          method: "GET",
          endpoint: `https://api-preprod.phonepe.com/apis/pg-sandbox/checkout/v2/order/${orderId}/status`,
          httpStatus: res.status,
          durationMs: res.durationMs,
          summary: `PhonePe order state=${state}`,
          responsePayload: res.json,
        },
      };
    }

    case "dodo-payments": {
      const apiKey = process.env.DODO_PAYMENTS_API_KEY || "";
      if (!apiKey || (!sessionId && !paymentId)) {
        return {
          verified: false,
          status: "missing_config_or_id",
          error: "Dodo Payments verification unavailable or missing session ID.",
          trace: {
            id: `tr_${Date.now()}`,
            timestamp: nowIso(),
            stage: "SERVER_VERIFY",
            method: "GET",
            endpoint: "https://test.dodopayments.com/checkouts/{sessionId}",
            summary: "Cannot check Dodo checkout session or payment.",
          },
        };
      }

      const targetUrl = sessionId
        ? `https://test.dodopayments.com/checkouts/${encodeURIComponent(sessionId)}`
        : `https://test.dodopayments.com/payments/${encodeURIComponent(paymentId ?? "")}`;

      const res = await fetchWithTimeout(targetUrl, {
        method: "GET",
        headers: { Authorization: `Bearer ${apiKey}` },
      });

      const status = String(res.json.payment_status ?? res.json.status ?? "open");
      return {
        verified: res.ok && (status === "succeeded" || status === "paid" || status === "completed"),
        status,
        orderId: sessionId,
        paymentId:
          typeof res.json.payment_id === "string"
            ? res.json.payment_id
            : paymentId,
        trace: {
          id: `tr_${Date.now()}`,
          timestamp: nowIso(),
          stage: "SERVER_VERIFY",
          method: "GET",
          endpoint: targetUrl,
          httpStatus: res.status,
          durationMs: res.durationMs,
          summary: `Dodo status=${status}`,
          responsePayload: res.json,
        },
      };
    }

    case "lemon-squeezy": {
      const apiKey = process.env.LEMONSQUEEZY_API_KEY || "";
      if (apiKey && orderId) {
        const res = await fetchWithTimeout(
          `https://api.lemonsqueezy.com/v1/orders/${encodeURIComponent(orderId)}`,
          {
            method: "GET",
            headers: {
              Accept: "application/vnd.api+json",
              Authorization: `Bearer ${apiKey}`,
            },
          }
        );

        const dataObj = res.json.data as Record<string, unknown> | undefined;
        const attrs = dataObj?.attributes as Record<string, unknown> | undefined;
        const status = String(attrs?.status ?? "pending");
        return {
          verified: res.ok && status === "paid",
          status,
          orderId,
          trace: {
            id: `tr_${Date.now()}`,
            timestamp: nowIso(),
            stage: "SERVER_VERIFY",
            method: "GET",
            endpoint: `https://api.lemonsqueezy.com/v1/orders/${orderId}`,
            httpStatus: res.status,
            durationMs: res.durationMs,
            summary: `Lemon Squeezy order status=${status}`,
            responsePayload: { id: dataObj?.id, status, test_mode: attrs?.test_mode, total_formatted: attrs?.total_formatted },
          },
        };
      }

      return {
        verified: Boolean(orderId || clientDetails),
        status: "paid_test_mode",
        orderId,
        trace: {
          id: `tr_${Date.now()}`,
          timestamp: nowIso(),
          stage: "SERVER_VERIFY",
          method: "SDK_EVENT",
          endpoint: "Lemon.js Checkout.Success eventHandler",
          httpStatus: 200,
          summary: `Lemon.js Checkout.Success received (${orderId ?? "test_order"})`,
          responsePayload: clientDetails ?? { orderId },
        },
      };
    }
  }
}

