import { NextRequest, NextResponse } from "next/server";

const BASE = "https://ecotrans-go-370980788525.europe-west1.run.app";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) return NextResponse.json({ success: false }, { status: 401 });

  const res = await fetch(`${BASE}/direcciones/?authorization=${token}`, {
    headers: { accept: "application/json" },
  });
  const data = await res.json();
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) return NextResponse.json({ success: false }, { status: 401 });

  const body = await req.json();
  const res = await fetch(`${BASE}/direcciones/?authorization=${token}`, {
    method: "POST",
    headers: { accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return NextResponse.json(data);
}
