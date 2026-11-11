import { NextResponse } from "next/server";
import { getGatewaySandboxStatusMap } from "@/app/lib/gatewaySandboxServer";

export const dynamic = "force-dynamic";

export async function GET() {
  const gateways = getGatewaySandboxStatusMap();
  return NextResponse.json(
    {
      gateways,
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}

