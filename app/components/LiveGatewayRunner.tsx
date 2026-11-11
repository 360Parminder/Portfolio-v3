"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { ProductFlowItem } from "../data/productFlows";
import { GatewayLogoTile } from "../data/techLogos";
import {
  GATEWAY_SANDBOX_SPECS,
  GatewayId,
  GatewaySandboxStatus,
  LiveNetworkTrace,
  isGatewayId,
} from "../lib/gatewaySandboxConfig";

/* ────────────── Strict Window Types for External Gateway SDKs ────────────── */

interface RazorpaySuccessPayload {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id?: string;
  prefill?: { name?: string; email?: string; contact?: string };
  theme?: { color?: string };
  handler: (response: RazorpaySuccessPayload) => void | Promise<void>;
  modal?: { ondismiss?: () => void };
}

interface RazorpayClient {
  open: () => void;
  on?: (event: string, cb: (payload: Record<string, unknown>) => void) => void;
}

interface StripePaymentElement {
  mount: (domElement: HTMLElement) => void;
  destroy?: () => void;
  unmount?: () => void;
}

interface StripeElementsInstance {
  create: (type: "payment") => StripePaymentElement;
}

interface StripeConfirmResult {
  error?: { message?: string; code?: string; type?: string };
  paymentIntent?: { id: string; status: string };
}

interface StripeClient {
  elements: (opts: {
    clientSecret: string;
    appearance?: { theme?: "stripe" | "night" | "flat" };
  }) => StripeElementsInstance;
  confirmPayment: (opts: {
    elements: StripeElementsInstance;
    redirect?: "if_required" | "always";
    confirmParams: { return_url: string };
  }) => Promise<StripeConfirmResult>;
}

interface PayPalOrderActions {
  order: {
    create: (payload: Record<string, unknown>) => Promise<string>;
    capture: () => Promise<Record<string, unknown>>;
  };
}

interface PayPalButtonsInstance {
  render: (el: HTMLElement) => Promise<void>;
  close?: () => Promise<void>;
}

interface PayPalNamespace {
  Buttons: (config: {
    style?: { layout?: "vertical" | "horizontal"; color?: "gold" | "blue" | "silver" | "black"; label?: "paypal" | "checkout" | "pay"; height?: number };
    createOrder: (_data: unknown, actions: PayPalOrderActions) => Promise<string>;
    onApprove: (data: { orderID: string }, actions: PayPalOrderActions) => Promise<void>;
    onCancel?: () => void;
    onError?: (err: unknown) => void;
  }) => PayPalButtonsInstance;
}

interface CashfreeClient {
  checkout: (opts: {
    paymentSessionId: string;
    redirectTarget?: "_modal" | "_self" | "_blank";
  }) => Promise<{
    error?: { message?: string };
    redirect?: boolean;
    paymentDetails?: Record<string, unknown>;
  }>;
}

interface PhonePeCheckoutGlobal {
  transact: (opts: {
    tokenUrl: string;
    type?: "IFRAME" | "REDIRECT";
    callback?: (response: string) => void;
  }) => void;
}

interface LemonSqueezyEvent {
  event: string;
  data?: Record<string, unknown>;
}

interface LemonSqueezyGlobal {
  Setup: (opts: { eventHandler: (event: LemonSqueezyEvent) => void }) => void;
  Url: {
    Open: (url: string) => void;
  };
}

interface SdkWindow extends Window {
  Razorpay?: new (options: RazorpayOptions) => RazorpayClient;
  Stripe?: (publishableKey: string) => StripeClient;
  paypal?: PayPalNamespace;
  Cashfree?: (opts: { mode: "sandbox" | "production" }) => CashfreeClient;
  PhonePeCheckout?: PhonePeCheckoutGlobal;
  createLemonSqueezy?: () => void;
  LemonSqueezy?: LemonSqueezyGlobal;
}

/* ────────────── Cached External Script Loader ────────────── */

const scriptPromiseCache = new Map<string, Promise<void>>();

function loadExternalScript(src: string): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Browser window unavailable"));
  }
  const existingPromise = scriptPromiseCache.get(src);
  if (existingPromise) return existingPromise;

  const existingTag = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`);
  if (existingTag && existingTag.dataset.loaded === "true") {
    return Promise.resolve();
  }

  const p = new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => {
      script.dataset.loaded = "true";
      resolve();
    };
    script.onerror = () => {
      scriptPromiseCache.delete(src);
      reject(new Error(`Failed to load ${src} (blocked or offline).`));
    };
    document.head.appendChild(script);
  });

  scriptPromiseCache.set(src, p);
  return p;
}

/* ────────────── Component Props ────────────── */

export interface SandboxReturnParams {
  stripeSessionId?: string;
  cfOrderId?: string;
  phonepeOrderId?: string;
  dodoPaymentId?: string;
  dodoStatus?: string;
  cancelled?: string;
}

interface LiveGatewayRunnerProps {
  product: ProductFlowItem;
  scenarioId: string;
  totalSteps: number;
  accentInk: string;
  sandboxStatus: GatewaySandboxStatus | null;
  statusLoading: boolean;
  onJumpStep: (stepIndex: number) => void;
  onTracesChange: (traces: LiveNetworkTrace[]) => void;
  returnParams?: SandboxReturnParams;
}

type RunnerPhase =
  | "idle"
  | "creating_session"
  | "awaiting_user"
  | "verifying"
  | "verified"
  | "failed";

export function LiveGatewayRunner({
  product,
  scenarioId,
  totalSteps,
  accentInk,
  sandboxStatus,
  statusLoading,
  onJumpStep,
  onTracesChange,
  returnParams,
}: LiveGatewayRunnerProps) {
  const gatewayId: GatewayId = isGatewayId(product.id) ? product.id : "razorpay";
  const spec = GATEWAY_SANDBOX_SPECS[gatewayId];

  const [customerEmail, setCustomerEmail] = useState("developer@kosh.uno");
  const [customerName, setCustomerName] = useState("Parminder Test User");
  const [stripeMode, setStripeMode] = useState<"payment_element" | "hosted_checkout">(
    scenarioId === "stripe-billing" ? "hosted_checkout" : "payment_element"
  );

  const [phase, setPhase] = useState<RunnerPhase>("idle");
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [traces, setTraces] = useState<LiveNetworkTrace[]>([]);

  // Active session references
  const [activeOrderId, setActiveOrderId] = useState<string | undefined>(undefined);
  const [activePaymentId, setActivePaymentId] = useState<string | undefined>(undefined);
  const [activeSessionId, setActiveSessionId] = useState<string | undefined>(undefined);
  const [activeCheckoutUrl, setActiveCheckoutUrl] = useState<string | undefined>(undefined);

  // Stripe PaymentElement refs
  const stripeMountRef = useRef<HTMLDivElement | null>(null);
  const stripeClientRef = useRef<StripeClient | null>(null);
  const stripeElementsRef = useRef<StripeElementsInstance | null>(null);
  const [stripeClientSecret, setStripeClientSecret] = useState<string | null>(null);
  const [stripePublishableKey, setStripePublishableKey] = useState<string | null>(null);
  const [stripePaymentIntentId, setStripePaymentIntentId] = useState<string | null>(null);
  const [stripeElementMounted, setStripeElementMounted] = useState<boolean>(false);

  // PayPal Buttons container ref
  const paypalContainerRef = useRef<HTMLDivElement | null>(null);
  const [paypalSdkReady, setPaypalSdkReady] = useState<boolean>(false);
  const [paypalMountRequested, setPaypalMountRequested] = useState<boolean>(
    gatewayId === "paypal"
  );

  const appendTrace = useCallback(
    (trace: LiveNetworkTrace) => {
      setTraces((prev) => {
        const next = [...prev, trace];
        onTracesChange(next);
        return next;
      });
    },
    [onTracesChange]
  );

  const stepAt = useCallback(
    (zeroBasedTarget: number) => {
      const clamped = Math.max(0, Math.min(totalSteps - 1, zeroBasedTarget));
      onJumpStep(clamped);
    },
    [onJumpStep, totalSteps]
  );

  const runServerVerify = useCallback(
    async (payload: {
      gatewayId: GatewayId;
      orderId?: string;
      paymentId?: string;
      signature?: string;
      paymentIntentId?: string;
      sessionId?: string;
      clientDetails?: Record<string, unknown>;
    }) => {
      setPhase("verifying");
      setStatusMessage("Verifying payment integrity on Next.js server...");
      stepAt(Math.max(0, totalSteps - 2));

      try {
        const res = await fetch("/api/flows/sandbox/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = (await res.json()) as {
          verified?: boolean;
          status?: string;
          orderId?: string;
          paymentId?: string;
          error?: string;
          trace?: LiveNetworkTrace;
        };

        if (data.trace) {
          appendTrace(data.trace);
        }

        if (data.orderId) setActiveOrderId(data.orderId);
        if (data.paymentId) setActivePaymentId(data.paymentId);

        if (data.verified) {
          setPhase("verified");
          setStatusMessage(`Verified (${data.status ?? "PAID"})`);
          stepAt(totalSteps - 1);
        } else {
          setPhase("awaiting_user");
          setStatusMessage(`Current state: ${data.status ?? "PENDING"}`);
          if (data.error) setErrorMessage(data.error);
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Verification call failed";
        setPhase("failed");
        setErrorMessage(msg);
      }
    },
    [appendTrace, stepAt, totalSteps]
  );

  // Handle Hosted Redirect returns cleanly (?stripe_session_id=... / ?phonepe_order_id=... etc.)
  const handledReturnRef = useRef<string | null>(null);
  useEffect(() => {
    if (!returnParams) return;
    const key = JSON.stringify(returnParams);
    if (handledReturnRef.current === key) return;

    if (gatewayId === "stripe" && returnParams.stripeSessionId) {
      handledReturnRef.current = key;
      queueMicrotask(() => {
        setActiveSessionId(returnParams.stripeSessionId);
        void runServerVerify({ gatewayId: "stripe", sessionId: returnParams.stripeSessionId });
      });
    } else if (gatewayId === "phonepe" && returnParams.phonepeOrderId) {
      handledReturnRef.current = key;
      queueMicrotask(() => {
        setActiveOrderId(returnParams.phonepeOrderId);
        void runServerVerify({ gatewayId: "phonepe", orderId: returnParams.phonepeOrderId });
      });
    } else if (gatewayId === "cashfree" && returnParams.cfOrderId) {
      handledReturnRef.current = key;
      queueMicrotask(() => {
        setActiveOrderId(returnParams.cfOrderId);
        void runServerVerify({ gatewayId: "cashfree", orderId: returnParams.cfOrderId });
      });
    } else if (gatewayId === "dodo-payments" && (returnParams.dodoPaymentId || returnParams.dodoStatus)) {
      handledReturnRef.current = key;
      queueMicrotask(() => {
        if (returnParams.dodoPaymentId) {
          setActivePaymentId(returnParams.dodoPaymentId);
          void runServerVerify({
            gatewayId: "dodo-payments",
            paymentId: returnParams.dodoPaymentId,
          });
        } else {
          setStatusMessage(`Returned from Dodo Checkout (status=${returnParams.dodoStatus ?? "unknown"})`);
        }
      });
    } else if (returnParams.cancelled === "1") {
      handledReturnRef.current = key;
      queueMicrotask(() => {
        setPhase("idle");
        setErrorMessage("Hosted checkout was cancelled by user.");
      });
    }
  }, [gatewayId, returnParams, runServerVerify, stepAt, totalSteps]);

  // Mount Stripe PaymentElement when clientSecret arrives
  useEffect(() => {
    if (gatewayId !== "stripe" || !stripeClientSecret || !stripePublishableKey) return;
    let active = true;
    let paymentEl: StripePaymentElement | null = null;

    const mount = async () => {
      try {
        await loadExternalScript("https://js.stripe.com/v3/");
        const win = window as SdkWindow;
        if (!active || !win.Stripe || !stripeMountRef.current) return;

        const stripe = win.Stripe(stripePublishableKey);
        const elements = stripe.elements({
          clientSecret: stripeClientSecret,
          appearance: { theme: "stripe" },
        });
        stripeClientRef.current = stripe;
        stripeElementsRef.current = elements;

        stripeMountRef.current.innerHTML = "";
        paymentEl = elements.create("payment");
        paymentEl.mount(stripeMountRef.current);

        if (active) {
          setStripeElementMounted(true);
          setPhase("awaiting_user");
          setStatusMessage("Live Stripe <PaymentElement /> mounted. Enter test card 4242... below.");
          stepAt(2);
        }
      } catch (err) {
        if (active) {
          setPhase("failed");
          setErrorMessage(err instanceof Error ? err.message : "Failed to mount Stripe Element");
        }
      }
    };

    void mount();

    return () => {
      active = false;
      try {
        paymentEl?.unmount?.();
        paymentEl?.destroy?.();
      } catch {
        // Ignore cleanup errors on fast unmount
      }
    };
  }, [gatewayId, stripeClientSecret, stripePublishableKey, stepAt]);

  // Mount PayPal Smart Payment Buttons directly when PayPal is active (after status resolves)
  useEffect(() => {
    if (gatewayId !== "paypal" || !paypalMountRequested || statusLoading) return;
    let active = true;
    let buttonsInstance: PayPalButtonsInstance | null = null;

    const paypalClientId = sandboxStatus?.publicConfig.clientId || "sb";
    const sdkUrl = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(paypalClientId)}&currency=USD&intent=capture`;

    const initPayPal = async () => {
      try {
        await loadExternalScript(sdkUrl);
        const win = window as SdkWindow;
        if (!active || !win.paypal || !paypalContainerRef.current) return;

        paypalContainerRef.current.innerHTML = "";
        setPaypalSdkReady(true);

        buttonsInstance = win.paypal.Buttons({
          style: { layout: "vertical", color: "gold", label: "paypal", height: 40 },
          createOrder: async (_data, actions) => {
            setErrorMessage(null);
            setPhase("creating_session");
            setStatusMessage("Creating PayPal Sandbox Order...");
            stepAt(1);

            if (sandboxStatus?.mode === "server_sandbox") {
              const res = await fetch("/api/flows/sandbox/session", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  gatewayId: "paypal",
                  scenarioId,
                  customerEmail,
                  customerName,
                  origin: window.location.origin,
                }),
              });
              const data = (await res.json()) as {
                ok?: boolean;
                orderId?: string;
                error?: string;
                trace?: LiveNetworkTrace;
              };
              if (data.trace) appendTrace(data.trace);
              if (!data.ok || !data.orderId) {
                throw new Error(data.error ?? "Failed to create PayPal REST Order");
              }
              setActiveOrderId(data.orderId);
              setPhase("awaiting_user");
              setStatusMessage(`Approve Order ${data.orderId} in PayPal popup...`);
              stepAt(2);
              return data.orderId;
            }

            // Public sandbox 'sb' mode uses PayPal SDK's direct sandbox actions
            const orderId = await actions.order.create({
              purchase_units: [
                {
                  description: `Digital Bundle — ${scenarioId}`,
                  amount: { currency_code: "USD", value: "49.00" },
                },
              ],
            });
            setActiveOrderId(orderId);
            appendTrace({
              id: `tr_${Date.now()}`,
              timestamp: new Date().toISOString().split("T")[1]?.slice(0, 12) ?? "",
              stage: "SESSION_CREATE",
              method: "PAYPAL_SDK",
              endpoint: "actions.order.create() [client-id=sb]",
              httpStatus: 201,
              summary: `Created Sandbox Order ${orderId}`,
              responsePayload: { id: orderId, mode: "public_sandbox" },
            });
            setPhase("awaiting_user");
            setStatusMessage(`Approve Order ${orderId} inside PayPal popup...`);
            stepAt(2);
            return orderId;
          },
          onApprove: async (data, actions) => {
            if (sandboxStatus?.mode === "server_sandbox") {
              await runServerVerify({ gatewayId: "paypal", orderId: data.orderID });
              return;
            }

            setPhase("verifying");
            setStatusMessage("Capturing approved PayPal Sandbox order...");
            stepAt(3);
            const details = await actions.order.capture();
            await runServerVerify({
              gatewayId: "paypal",
              orderId: data.orderID,
              clientDetails: details,
            });
          },
          onCancel: () => {
            setPhase("idle");
            setStatusMessage("PayPal popup closed before approval.");
          },
          onError: (err) => {
            setPhase("failed");
            setErrorMessage(
              err instanceof Error
                ? err.message
                : "PayPal SDK encountered an error during sandbox checkout."
            );
          },
        });

        await buttonsInstance.render(paypalContainerRef.current);
      } catch (err) {
        if (active) {
          setPhase("failed");
          setErrorMessage(err instanceof Error ? err.message : "Failed to load PayPal JS SDK");
        }
      }
    };

    void initPayPal();

    return () => {
      active = false;
      try {
        void buttonsInstance?.close?.();
      } catch {
        // Ignore teardown issues
      }
    };
  }, [
    appendTrace,
    customerEmail,
    customerName,
    gatewayId,
    paypalMountRequested,
    runServerVerify,
    sandboxStatus?.mode,
    sandboxStatus?.publicConfig.clientId,
    scenarioId,
    statusLoading,
    stepAt,
  ]);

  const handleLaunchLiveCheckout = async () => {
    setErrorMessage(null);
    setPhase("creating_session");
    setStatusMessage(`Calling POST /api/flows/sandbox/session (${product.name})...`);
    stepAt(0);

    try {
      const res = await fetch("/api/flows/sandbox/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gatewayId,
          scenarioId,
          checkoutMode: gatewayId === "stripe" ? stripeMode : "payment_element",
          customerEmail,
          customerName,
          origin: typeof window !== "undefined" ? window.location.origin : "",
        }),
      });

      const session = (await res.json()) as {
        ok?: boolean;
        mode?: string;
        orderId?: string;
        sessionId?: string;
        paymentIntentId?: string;
        clientSecret?: string;
        checkoutUrl?: string;
        tokenUrl?: string;
        keyId?: string;
        publishableKey?: string;
        amountSubunits?: number;
        currency?: string;
        error?: string;
        trace?: LiveNetworkTrace;
      };

      if (session.trace) {
        appendTrace(session.trace);
      }

      if (!session.ok) {
        setPhase("failed");
        setErrorMessage(session.error ?? `Unable to start ${product.name} sandbox session.`);
        return;
      }

      if (session.orderId) setActiveOrderId(session.orderId);
      if (session.sessionId) setActiveSessionId(session.sessionId);
      if (session.checkoutUrl) setActiveCheckoutUrl(session.checkoutUrl);
      stepAt(1);

      const win = window as SdkWindow;

      if (gatewayId === "razorpay") {
        setStatusMessage("Loading checkout.razorpay.com/v1/checkout.js...");
        await loadExternalScript("https://checkout.razorpay.com/v1/checkout.js");
        if (!win.Razorpay || !session.keyId) {
          throw new Error("Razorpay checkout.js loaded without window.Razorpay or keyId.");
        }

        stepAt(2);
        setPhase("awaiting_user");
        setStatusMessage("Razorpay Checkout Modal active — enter success@razorpay or test card.");

        const rzp = new win.Razorpay({
          key: session.keyId,
          amount: session.amountSubunits ?? 99900,
          currency: session.currency ?? "INR",
          name: "Kosh Flow Studio (Test)",
          description: `${product.name} // ${scenarioId}`,
          ...(session.orderId ? { order_id: session.orderId } : {}),
          prefill: { name: customerName, email: customerEmail, contact: "9876543210" },
          theme: { color: "#3395FF" },
          handler: async (resp) => {
            appendTrace({
              id: `tr_${Date.now()}`,
              timestamp: new Date().toISOString().split("T")[1]?.slice(0, 12) ?? "",
              stage: "CLIENT_CONFIRM",
              method: "SDK_HANDLER",
              endpoint: "Razorpay Checkout handler(response)",
              summary: `Authorized payment ${resp.razorpay_payment_id}`,
              responsePayload: { ...resp },
            });
            await runServerVerify({
              gatewayId: "razorpay",
              orderId: resp.razorpay_order_id ?? session.orderId,
              paymentId: resp.razorpay_payment_id,
              signature: resp.razorpay_signature,
            });
          },
          modal: {
            ondismiss: () => {
              setPhase("idle");
              setStatusMessage("Razorpay modal dismissed.");
            },
          },
        });
        rzp.on?.("payment.failed", (failResp) => {
          const errObj = failResp.error as Record<string, unknown> | undefined;
          const desc =
            typeof errObj?.description === "string"
              ? errObj.description
              : "Razorpay test payment failed";
          setPhase("failed");
          setErrorMessage(desc);
          appendTrace({
            id: `tr_${Date.now()}`,
            timestamp: new Date().toISOString().split("T")[1]?.slice(0, 12) ?? "",
            stage: "CLIENT_CONFIRM",
            method: "SDK_EVENT",
            endpoint: "rzp.on('payment.failed')",
            httpStatus: 402,
            summary: desc,
            responsePayload: failResp,
          });
        });
        rzp.open();
        return;
      }

      if (gatewayId === "stripe") {
        if (session.mode === "hosted_checkout" && session.checkoutUrl) {
          setPhase("awaiting_user");
          setStatusMessage("Hosted Stripe Checkout URL ready. Click Open Stripe Checkout below.");
          stepAt(2);
          return;
        }
        if (session.clientSecret && session.publishableKey) {
          setStripePaymentIntentId(session.paymentIntentId ?? null);
          setStripePublishableKey(session.publishableKey);
          setStripeClientSecret(session.clientSecret);
          return;
        }
      }

      if (gatewayId === "cashfree") {
        if (!session.sessionId) throw new Error("Missing payment_session_id from Cashfree.");
        setStatusMessage("Loading sdk.cashfree.com/js/v3/cashfree.js...");
        await loadExternalScript("https://sdk.cashfree.com/js/v3/cashfree.js");
        if (!win.Cashfree) throw new Error("Cashfree SDK did not initialize.");

        stepAt(2);
        setPhase("awaiting_user");
        setStatusMessage("Opening Cashfree Sandbox _modal overlay...");

        const cf = win.Cashfree({ mode: "sandbox" });
        const result = await cf.checkout({
          paymentSessionId: session.sessionId,
          redirectTarget: "_modal",
        });

        appendTrace({
          id: `tr_${Date.now()}`,
          timestamp: new Date().toISOString().split("T")[1]?.slice(0, 12) ?? "",
          stage: "CLIENT_CONFIRM",
          method: "SDK_MODAL",
          endpoint: "cashfree.checkout({ redirectTarget: '_modal' })",
          summary: result.error
            ? `Cashfree modal returned: ${result.error.message ?? "dismissed"}`
            : "Cashfree modal resolved — verifying order status cleanly",
          responsePayload: result as unknown as Record<string, unknown>,
        });

        await runServerVerify({ gatewayId: "cashfree", orderId: session.orderId });
        return;
      }

      if (gatewayId === "phonepe") {
        const tokenUrl = session.tokenUrl || session.checkoutUrl;
        if (!tokenUrl) throw new Error("Missing PhonePe tokenUrl / redirectUrl.");

        stepAt(2);
        setPhase("awaiting_user");
        setStatusMessage("Loading PhonePe v2 Checkout SDK...");

        try {
          await loadExternalScript("https://mercury.phonepe.com/web/checkout/v2/checkout.js");
          if (win.PhonePeCheckout?.transact) {
            win.PhonePeCheckout.transact({
              tokenUrl,
              type: "IFRAME",
              callback: (cbState) => {
                appendTrace({
                  id: `tr_${Date.now()}`,
                  timestamp: new Date().toISOString().split("T")[1]?.slice(0, 12) ?? "",
                  stage: "CLIENT_CONFIRM",
                  method: "SDK_IFRAME",
                  endpoint: "PhonePeCheckout.transact callback",
                  summary: `PhonePe IFRAME callback received: ${cbState}`,
                  responsePayload: { callback: cbState, orderId: session.orderId },
                });
                void runServerVerify({ gatewayId: "phonepe", orderId: session.orderId });
              },
            });
            setStatusMessage("PhonePe UAT PayPage opened in IFRAME.");
            return;
          }
        } catch {
          // Graceful fallback to external tab if third-party UAT iframe script is unavailable
        }

        setStatusMessage("Open PhonePe PayPage URL below and then verify order status.");
        return;
      }

      if (gatewayId === "dodo-payments") {
        if (!session.checkoutUrl) throw new Error("Missing Dodo checkout_url.");
        stepAt(2);
        setPhase("awaiting_user");
        setStatusMessage("Dodo Test Checkout Session created — launch checkout below to pay.");
        window.open(session.checkoutUrl, "_blank", "noopener,noreferrer");
        return;
      }

      if (gatewayId === "lemon-squeezy") {
        if (!session.checkoutUrl) throw new Error("Missing Lemon Squeezy checkoutUrl.");
        setStatusMessage("Loading app.lemonsqueezy.com/js/lemon.js...");
        await loadExternalScript("https://app.lemonsqueezy.com/js/lemon.js");
        win.createLemonSqueezy?.();
        if (win.LemonSqueezy) {
          win.LemonSqueezy.Setup({
            eventHandler: (evt) => {
              if (evt.event === "Checkout.Success") {
                const ordId =
                  evt.data && typeof evt.data.id === "string" ? evt.data.id : undefined;
                appendTrace({
                  id: `tr_${Date.now()}`,
                  timestamp: new Date().toISOString().split("T")[1]?.slice(0, 12) ?? "",
                  stage: "CLIENT_CONFIRM",
                  method: "SDK_EVENT",
                  endpoint: "Lemon.js Checkout.Success",
                  summary: `Lemon.js Checkout.Success for order ${ordId ?? ""}`,
                  responsePayload: evt.data,
                });
                void runServerVerify({
                  gatewayId: "lemon-squeezy",
                  orderId: ordId,
                  clientDetails: evt.data,
                });
              }
            },
          });
          stepAt(2);
          setPhase("awaiting_user");
          setStatusMessage("Lemon.js Overlay Modal opened — use test card 4242...");
          win.LemonSqueezy.Url.Open(session.checkoutUrl);
          return;
        }
        stepAt(2);
        setPhase("awaiting_user");
        setStatusMessage("Open Lemon Squeezy checkout URL below.");
      }
    } catch (err) {
      setPhase("failed");
      setErrorMessage(err instanceof Error ? err.message : "Live checkout execution failed");
    }
  };

  const handleConfirmStripeElement = async () => {
    if (!stripeClientRef.current || !stripeElementsRef.current || !stripePaymentIntentId) return;
    setErrorMessage(null);
    setPhase("verifying");
    setStatusMessage("Confirming card / 3DS2 challenge with Stripe.js...");
    stepAt(3);

    const res = await stripeClientRef.current.confirmPayment({
      elements: stripeElementsRef.current,
      redirect: "if_required",
      confirmParams: {
        return_url: `${window.location.origin}/flows?gateway=stripe&scenario=${encodeURIComponent(scenarioId)}`,
      },
    });

    if (res.error) {
      setPhase("failed");
      setErrorMessage(res.error.message ?? "Stripe confirmation failed");
      appendTrace({
        id: `tr_${Date.now()}`,
        timestamp: new Date().toISOString().split("T")[1]?.slice(0, 12) ?? "",
        stage: "CLIENT_CONFIRM",
        method: "STRIPE.JS",
        endpoint: "stripe.confirmPayment()",
        httpStatus: 402,
        summary: res.error.message ?? "Stripe card error",
        responsePayload: res.error as unknown as Record<string, unknown>,
      });
      return;
    }

    appendTrace({
      id: `tr_${Date.now()}`,
      timestamp: new Date().toISOString().split("T")[1]?.slice(0, 12) ?? "",
      stage: "CLIENT_CONFIRM",
      method: "STRIPE.JS",
      endpoint: "stripe.confirmPayment()",
      httpStatus: 200,
      summary: `PaymentIntent ${res.paymentIntent?.id ?? stripePaymentIntentId} status=${res.paymentIntent?.status ?? "succeeded"}`,
      responsePayload: res.paymentIntent as unknown as Record<string, unknown>,
    });

    await runServerVerify({
      gatewayId: "stripe",
      paymentIntentId: res.paymentIntent?.id ?? stripePaymentIntentId,
    });
  };

  const handleReset = () => {
    setPhase("idle");
    setErrorMessage(null);
    setStatusMessage("");
    setActiveOrderId(undefined);
    setActivePaymentId(undefined);
    setActiveSessionId(undefined);
    setActiveCheckoutUrl(undefined);
    setStripeClientSecret(null);
    setStripeElementMounted(false);
    setTraces([]);
    onTracesChange([]);
    stepAt(0);
  };

  const isConfigured = sandboxStatus?.configured ?? false;

  return (
    <div
      style={{
        backgroundColor: "var(--background)",
        border: "1px solid var(--line-stroke-accent)",
        borderRadius: "4px",
        display: "flex",
        flex: 1,
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Simulated Browser / Sandbox Bar */}
      <div
        style={{
          alignItems: "center",
          backgroundColor: "var(--line-fill-accent)",
          borderBottom: "1px solid var(--line-stroke)",
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          justifyContent: "space-between",
          padding: "8px 12px",
        }}
      >
        <div style={{ alignItems: "center", display: "flex", gap: "6px" }}>
          <GatewayLogoTile idOrName={product.id} size={18} radius={3} />
          <span style={{ color: "var(--foreground)", fontSize: "9.5px", fontWeight: 700 }}>
            {spec.sdkLabel}
          </span>
        </div>

        <span
          style={{
            alignItems: "center",
            backgroundColor: isConfigured ? "rgba(34,197,94,0.12)" : "rgba(245,158,11,0.12)",
            border: isConfigured ? "1px solid rgba(34,197,94,0.45)" : "1px solid rgba(245,158,11,0.45)",
            borderRadius: "2px",
            color: isConfigured ? "#22c55e" : "#f59e0b",
            display: "inline-flex",
            fontSize: "8.5px",
            fontWeight: 700,
            gap: "5px",
            padding: "2px 7px",
          }}
        >
          <span
            style={{
              backgroundColor: isConfigured ? "#22c55e" : "#f59e0b",
              borderRadius: "50%",
              height: "5px",
              width: "5px",
            }}
          />
          <span>
            {statusLoading
              ? "INITIALIZING..."
              : sandboxStatus?.modeLabel ?? "SANDBOX_CHECKOUT"}
          </span>
        </span>
      </div>

      {/* Body */}
      <div style={{ display: "flex", flex: 1, flexDirection: "column", gap: "10px", padding: "14px" }}>
        {sandboxStatus?.warning && (
          <div
            style={{
              backgroundColor: "rgba(245, 158, 11, 0.1)",
              border: "1px solid rgba(245, 158, 11, 0.45)",
              borderRadius: "3px",
              color: "#f59e0b",
              fontSize: "10px",
              padding: "7px 10px",
            }}
          >
            {sandboxStatus.warning}
          </div>
        )}

        {/* Quick Customer Prefill + Price Summary */}
        <div
          style={{
            backgroundColor: "var(--line-fill)",
            border: "1px solid var(--line-stroke)",
            borderRadius: "4px",
            padding: "10px",
          }}
        >
          <div
            style={{
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "8px",
            }}
          >
            <span style={{ color: "var(--nav-link)", fontSize: "9px", letterSpacing: "0.08em" }}>
              LIVE_SANDBOX_CART // TEST_MODE_ONLY
            </span>
            <span style={{ color: "var(--foreground)", fontSize: "13px", fontWeight: 800 }}>
              {spec.defaultAmountDisplay} {spec.defaultCurrency}
            </span>
          </div>

          <div style={{ display: "grid", gap: "6px", gridTemplateColumns: "1fr 1fr" }}>
            <label style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
              <span style={{ color: "var(--nav-link)", fontSize: "8.5px" }}>CUSTOMER_NAME</span>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                style={{
                  backgroundColor: "var(--background)",
                  border: "1px solid var(--line-stroke-accent)",
                  borderRadius: "3px",
                  color: "var(--foreground)",
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "10px",
                  padding: "5px 7px",
                }}
              />
            </label>
            <label style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
              <span style={{ color: "var(--nav-link)", fontSize: "8.5px" }}>CUSTOMER_EMAIL</span>
              <input
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                style={{
                  backgroundColor: "var(--background)",
                  border: "1px solid var(--line-stroke-accent)",
                  borderRadius: "3px",
                  color: "var(--foreground)",
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "10px",
                  padding: "5px 7px",
                }}
              />
            </label>
          </div>
        </div>

        {/* Gateway Specific Live Controls */}
        {gatewayId === "paypal" ? (
          <div
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #cbd5e1",
              borderRadius: "5px",
              color: "#0f172a",
              padding: "12px",
            }}
          >
            <div
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "8px",
              }}
            >
              <span style={{ fontSize: "10.5px", fontWeight: 700 }}>
                Live PayPal Sandbox Checkout
              </span>
              {!paypalMountRequested && (
                <button
                  type="button"
                  onClick={() => setPaypalMountRequested(true)}
                  style={{
                    backgroundColor: "#0070BA",
                    border: "none",
                    borderRadius: "3px",
                    color: "#ffffff",
                    cursor: "pointer",
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: "9px",
                    fontWeight: 700,
                    padding: "4px 8px",
                  }}
                >
                  Load SDK Buttons
                </button>
              )}
            </div>

            {!paypalSdkReady && paypalMountRequested && (
              <div style={{ color: "#64748b", fontSize: "10px", padding: "10px 0", textAlign: "center" }}>
                Loading PayPal JS SDK...
              </div>
            )}
            <div ref={paypalContainerRef} />
          </div>
        ) : statusLoading ? (
          <div
            style={{
              backgroundColor: "var(--line-fill)",
              border: "1px dashed var(--line-stroke-accent)",
              borderRadius: "4px",
              color: "var(--nav-link)",
              fontSize: "10px",
              padding: "16px 12px",
              textAlign: "center",
            }}
          >
            Initializing {product.name} live test checkout...
          </div>
        ) : isConfigured ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {gatewayId === "stripe" && !stripeElementMounted && (
              <div style={{ display: "flex", gap: "6px" }}>
                {(
                  [
                    { id: "payment_element", label: "<PaymentElement /> Inline" },
                    { id: "hosted_checkout", label: "Hosted checkout.stripe.com" },
                  ] as const
                ).map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setStripeMode(m.id)}
                    style={{
                      backgroundColor:
                        stripeMode === m.id ? "var(--line-fill-accent)" : "var(--line-fill)",
                      border:
                        stripeMode === m.id
                          ? `1px solid ${product.accentColor}`
                          : "1px solid var(--line-stroke)",
                      borderRadius: "3px",
                      color: "var(--foreground)",
                      cursor: "pointer",
                      flex: 1,
                      fontFamily: "var(--font-geist-mono)",
                      fontSize: "9px",
                      fontWeight: 700,
                      padding: "6px",
                    }}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            )}

            {/* Stripe Mounted PaymentElement Box */}
            {gatewayId === "stripe" && stripeClientSecret && (
              <div
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #cbd5e1",
                  borderRadius: "5px",
                  color: "#0f172a",
                  padding: "12px",
                }}
              >
                <div style={{ fontSize: "10px", fontWeight: 700, marginBottom: "8px", color: "#533afd" }}>
                  LIVE STRIPE &lt;PaymentElement /&gt; ({stripePaymentIntentId})
                </div>
                <div ref={stripeMountRef} />
                {stripeElementMounted && (
                  <button
                    type="button"
                    onClick={handleConfirmStripeElement}
                    disabled={phase === "verifying"}
                    style={{
                      backgroundColor: "#635BFF",
                      border: "none",
                      borderRadius: "4px",
                      color: "#ffffff",
                      cursor: phase === "verifying" ? "wait" : "pointer",
                      fontFamily: "var(--font-geist-mono)",
                      fontSize: "11px",
                      fontWeight: 700,
                      marginTop: "10px",
                      padding: "9px",
                      width: "100%",
                    }}
                  >
                    {phase === "verifying" ? "Confirming..." : "Confirm & Pay $29.00 (Live Stripe.js)"}
                  </button>
                )}
              </div>
            )}

            {/* Primary Launch Button (when not mid-Stripe-element or on reset) */}
            {!(gatewayId === "stripe" && stripeClientSecret) && (
              <button
                type="button"
                onClick={handleLaunchLiveCheckout}
                disabled={phase === "creating_session" || phase === "verifying"}
                style={{
                  alignItems: "center",
                  backgroundColor: product.accentColor,
                  border: "none",
                  borderRadius: "4px",
                  color: accentInk,
                  cursor: phase === "creating_session" ? "wait" : "pointer",
                  display: "flex",
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "11px",
                  fontWeight: 700,
                  gap: "8px",
                  justifyContent: "center",
                  padding: "10px 12px",
                  width: "100%",
                }}
              >
                <GatewayLogoTile idOrName={product.id} size={18} radius={3} />
                <span>
                  {phase === "creating_session"
                    ? `Initializing ${product.name} Sandbox...`
                    : `Run Live ${product.name} Test Checkout →`}
                </span>
              </button>
            )}

            {/* Hosted Checkout / Manual Poll Helper Controls */}
            {activeCheckoutUrl && (
              <div
                style={{
                  backgroundColor: "var(--line-fill)",
                  border: "1px dashed var(--line-stroke-accent)",
                  borderRadius: "3px",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "6px",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "8px 10px",
                }}
              >
                <a
                  href={activeCheckoutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "var(--foreground)",
                    fontSize: "10px",
                    fontWeight: 700,
                    textDecoration: "underline",
                  }}
                >
                  Open {product.name} Checkout Page ↗
                </a>
                <button
                  type="button"
                  onClick={() =>
                    void runServerVerify({
                      gatewayId,
                      orderId: activeOrderId,
                      sessionId: activeSessionId,
                      paymentIntentId: stripePaymentIntentId ?? undefined,
                    })
                  }
                  style={{
                    backgroundColor: "var(--background)",
                    border: "1px solid var(--line-stroke-accent)",
                    borderRadius: "2px",
                    color: "var(--foreground)",
                    cursor: "pointer",
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: "9px",
                    fontWeight: 700,
                    padding: "4px 8px",
                  }}
                >
                  Verify Payment Status ↻
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Clean Unavailable Notice (zero env disclosure) */
          <div
            style={{
              backgroundColor: "var(--line-fill)",
              border: "1px dashed var(--line-stroke-accent)",
              borderRadius: "4px",
              padding: "12px",
            }}
          >
            <div style={{ color: "var(--foreground)", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>
              {product.name} Live Sandbox Checkout Unavailable
            </div>
            <div style={{ color: "var(--nav-link-hover)", fontSize: "10.5px", lineHeight: "1.5", marginBottom: "10px" }}>
              Live test checkout for {product.name} is currently offline. You can scrub through every API handshake, payload, and webhook verification step in the sequence bus and inspector.
            </div>
            <a
              href={product.docsUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: "var(--background)",
                border: "1px solid var(--line-stroke-accent)",
                borderRadius: "3px",
                color: "var(--foreground)",
                display: "inline-block",
                fontSize: "9.5px",
                fontWeight: 600,
                padding: "6px 10px",
                textDecoration: "none",
              }}
            >
              Official {product.name} Docs ↗
            </a>
          </div>
        )}

        {/* Status / Verified / Error Output Banner */}
        {(statusMessage || errorMessage) && (
          <div
            style={{
              backgroundColor:
                phase === "verified"
                  ? "rgba(34, 197, 94, 0.1)"
                  : errorMessage
                  ? "rgba(239, 68, 68, 0.1)"
                  : "var(--line-fill)",
              border:
                phase === "verified"
                  ? "1px solid #22c55e"
                  : errorMessage
                  ? "1px solid #ef4444"
                  : "1px solid var(--line-stroke)",
              borderRadius: "3px",
              color:
                phase === "verified"
                  ? "#22c55e"
                  : errorMessage
                  ? "#ef4444"
                  : "var(--foreground)",
              fontSize: "10px",
              lineHeight: "1.45",
              padding: "8px 10px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px" }}>
              <strong>{errorMessage ?? statusMessage}</strong>
              {(phase === "verified" || phase === "failed" || traces.length > 0) && (
                <button
                  type="button"
                  onClick={handleReset}
                  style={{
                    background: "transparent",
                    border: "1px solid currentColor",
                    borderRadius: "2px",
                    color: "inherit",
                    cursor: "pointer",
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: "8.5px",
                    padding: "2px 6px",
                    whiteSpace: "nowrap",
                  }}
                >
                  ↺ Reset
                </button>
              )}
            </div>
            {(activeOrderId || activePaymentId || activeSessionId) && (
              <div style={{ color: "var(--foreground)", fontSize: "9px", marginTop: "4px", opacity: 0.9 }}>
                {activeOrderId && <span style={{ marginRight: "10px" }}>ORDER: {activeOrderId}</span>}
                {activePaymentId && <span style={{ marginRight: "10px" }}>PAY_ID: {activePaymentId}</span>}
                {activeSessionId && <span>SESSION: {activeSessionId}</span>}
              </div>
            )}
          </div>
        )}

        {/* Test Credentials Reference */}
        <div
          style={{
            backgroundColor: "var(--line-fill)",
            border: "1px solid var(--line-stroke)",
            borderRadius: "3px",
            padding: "8px 10px",
          }}
        >
          <div
            style={{
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "6px",
            }}
          >
            <span style={{ color: "var(--nav-link)", fontSize: "8.5px", letterSpacing: "0.08em" }}>
              SANDBOX_TEST_CREDENTIALS ({product.name.toUpperCase()})
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {spec.testHints.map((hint) => (
              <div
                key={hint.label}
                style={{
                  alignItems: "center",
                  display: "flex",
                  flexWrap: "wrap",
                  fontSize: "9px",
                  gap: "6px",
                  justifyContent: "space-between",
                }}
              >
                <span style={{ color: "var(--nav-link-hover)" }}>{hint.label}:</span>
                <code style={{ color: "var(--foreground)", fontWeight: 700 }}>{hint.value}</code>
              </div>
            ))}
          </div>
        </div>

        {/* Live HTTP Execution Trace */}
        {traces.length > 0 && (
          <div
            style={{
              backgroundColor: "var(--line-fill)",
              border: "1px solid var(--line-stroke)",
              borderRadius: "3px",
              padding: "8px 10px",
            }}
          >
            <div style={{ color: "var(--nav-link)", fontSize: "8.5px", letterSpacing: "0.08em", marginBottom: "5px" }}>
              LIVE_SDK_EXECUTION_LOG ({traces.length} EVENTS)
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              {traces.map((tr) => (
                <div key={tr.id} style={{ fontSize: "9px", color: "var(--foreground)", display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  <span style={{ color: "var(--nav-link)" }}>[{tr.timestamp}]</span>
                  <span style={{ color: product.accentColor, fontWeight: 700 }}>{tr.method}</span>
                  <span>{tr.summary}</span>
                  {typeof tr.durationMs === "number" && (
                    <span style={{ color: "#22c55e" }}>({tr.durationMs}ms)</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

