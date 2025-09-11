// === File: src/app/api/contact/route.ts ===
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { name, email, message } = await request.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // In a real app you might send an email or persist the message here.
  return NextResponse.json({ message: "Success" });
}

