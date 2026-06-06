import { NextRequest, NextResponse } from "next/server";

const BASE = "https://ecotrans-go-370980788525.europe-west1.run.app";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const token = req.cookies.get("token")?.value;
  if (!token) return NextResponse.json({ success: false }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  const res = await fetch(`${BASE}/direcciones/${id}?authorization=${token}`, {
    method: "PUT",
    headers: { accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return NextResponse.json(data);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const token = req.cookies.get("token")?.value;
  if (!token) return NextResponse.json({ success: false }, { status: 401 });

  const { id } = await params;
  const res = await fetch(`${BASE}/direcciones/${id}?authorization=${token}`, {
    method: "DELETE",
    headers: { accept: "application/json" },
  });
  const data = await res.json();
  return NextResponse.json(data);
}
