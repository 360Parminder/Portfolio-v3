import { NextResponse } from "next/server";
import { isGatewayId } from "@/app/lib/gatewaySandboxConfig";
import { verifyGatewaySandboxPayment } from "@/app/lib/gatewaySandboxServer";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: Record<string, unknown> = {};
  try {
    const parsed: unknown = await request.json();
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      body = parsed as Record<string, unknown>;
    }
  } catch {
    return NextResponse.json({ verified: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const gatewayId = typeof body.gatewayId === "string" ? body.gatewayId : "";
  if (!isGatewayId(gatewayId)) {
    return NextResponse.json(
      { verified: false, error: `Unsupported gatewayId '${gatewayId}'` },
      { status: 400 }
    );
  }

  const clientDetails =
    body.clientDetails &&
    typeof body.clientDetails === "object" &&
    !Array.isArray(body.clientDetails)
      ? (body.clientDetails as Record<string, unknown>)
      : undefined;

  try {
    const result = await verifyGatewaySandboxPayment({
      gatewayId,
      orderId: typeof body.orderId === "string" ? body.orderId : undefined,
      paymentId: typeof body.paymentId === "string" ? body.paymentId : undefined,
      signature: typeof body.signature === "string" ? body.signature : undefined,
      paymentIntentId: typeof body.paymentIntentId === "string" ? body.paymentIntentId : undefined,
      sessionId: typeof body.sessionId === "string" ? body.sessionId : undefined,
      clientDetails,
    });

    return NextResponse.json(result, {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Verification check failed";
    return NextResponse.json({ verified: false, status: "error", error: msg }, { status: 500 });
  }
}

