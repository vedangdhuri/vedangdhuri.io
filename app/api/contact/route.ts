import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error("DISCORD_WEBHOOK_URL is not configured");
    return NextResponse.json({ error: "Contact form is unavailable" }, { status: 503 });
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const webhookResponse = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!webhookResponse.ok) {
    console.error("Discord webhook request failed", webhookResponse.status);
    return NextResponse.json({ error: "Message could not be sent" }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}
