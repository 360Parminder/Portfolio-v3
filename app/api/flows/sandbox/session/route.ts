import { NextResponse } from "next/server";
import { isGatewayId } from "@/app/lib/gatewaySandboxConfig";
import {
  createGatewaySandboxSession,
  resolveSafeOrigin,
} from "@/app/lib/gatewaySandboxServer";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: Record<string, unknown> = {};
  try {
    const parsed: unknown = await request.json();
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      body = parsed as Record<string, unknown>;
    }
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const gatewayId = typeof body.gatewayId === "string" ? body.gatewayId : "";
  if (!isGatewayId(gatewayId)) {
    return NextResponse.json(
      { ok: false, error: `Unsupported gatewayId '${gatewayId}'` },
      { status: 400 }
    );
  }

  const scenarioId = typeof body.scenarioId === "string" ? body.scenarioId : undefined;
  const checkoutMode =
    body.checkoutMode === "hosted_checkout" ? "hosted_checkout" : "payment_element";
  const customerEmail =
    typeof body.customerEmail === "string" && body.customerEmail.includes("@")
      ? body.customerEmail.slice(0, 120)
      : "developer@kosh.uno";
  const customerName =
    typeof body.customerName === "string" && body.customerName.trim().length > 0
      ? body.customerName.trim().slice(0, 80)
      : "Parminder Test User";

  const requestedOrigin = typeof body.origin === "string" ? body.origin : undefined;
  const safeOrigin = resolveSafeOrigin(requestedOrigin, request.url);

  try {
    const result = await createGatewaySandboxSession({
      gatewayId,
      scenarioId,
      checkoutMode,
      customerEmail,
      customerName,
      safeOrigin,
    });

    return NextResponse.json(result, {
      status: result.ok ? 200 : 400,
      headers: { "Cache-Control": "no-store" },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Failed to initialize sandbox session";
    return NextResponse.json({ ok: false, gatewayId, error: msg }, { status: 500 });
  }
}

