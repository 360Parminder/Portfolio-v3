import React, { Suspense } from "react";
import type { Metadata } from "next";
import { FlowsStudio } from "../components/FlowsStudio";

export const metadata: Metadata = {
  title: "Product Flow Studio — Parminder Singh",
  description:
    "Interactive developer flow explorer to watch and compare payment gateway integrations (Razorpay, Stripe, Cashfree, PhonePe PG, PayPal, Dodo Payments, Lemon Squeezy) and upcoming product categories.",
};

function FlowsLoadingFallback() {
  return (
    <main
      style={{
        gridColumn: "2",
        gridRow: "5",
        padding: "80px 24px 60px",
        fontFamily: "var(--font-geist-mono)",
        minWidth: 0,
      }}
    >
      <div
        style={{
          backgroundColor: "var(--line-fill)",
          border: "1px solid var(--line-stroke-accent)",
          color: "var(--nav-link)",
          fontSize: "11px",
          letterSpacing: "0.08em",
          padding: "24px",
        }}
      >
        LOADING_FLOW_STUDIO // INITIALIZING_SIMULATOR...
      </div>
    </main>
  );
}

export default function FlowsPage() {
  return (
    <Suspense fallback={<FlowsLoadingFallback />}>
      <FlowsStudio />
    </Suspense>
  );
}

