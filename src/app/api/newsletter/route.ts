import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email } = (await request.json()) as { email?: string };
  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const apiKey = process.env.MAILCHIMP_API_KEY;
  const listId = process.env.MAILCHIMP_LIST_ID;
  if (!apiKey || !listId) {
    return NextResponse.json(
      { error: "Newsletter service not configured" },
      { status: 503 }
    );
  }

  const [, dc] = apiKey.split("-");
  if (!dc) {
    return NextResponse.json({ error: "Invalid Mailchimp key" }, { status: 500 });
  }

  const url = `https://${dc}.api.mailchimp.com/3.0/lists/${listId}/members`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `apikey ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email_address: email,
      status: "pending"
    })
  });

  if (!res.ok && res.status !== 400) {
    const payload = await res.json().catch(() => ({}));
    return NextResponse.json({ error: payload?.detail || "Unable to subscribe" }, { status: 502 });
  }

  return NextResponse.json({ message: "Check your inbox to confirm subscription." });
}
