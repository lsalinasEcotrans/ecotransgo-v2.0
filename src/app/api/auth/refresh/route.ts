import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // lee el token desde la cookie HttpOnly — JS del cliente nunca lo ve
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json(
      { success: false, message: "No hay sesión activa" },
      { status: 401 },
    );
  }

  const res = await fetch(
    `https://ecotrans-go-370980788525.europe-west1.run.app/auth-login/refresh?authorization=${token}`,
    {
      method: "POST",
      headers: { accept: "application/json" },
      body: "",
    },
  );

  const data = await res.json();

  if (!res.ok || !data.success) {
    // token expirado o inválido — limpiar cookies
    const response = NextResponse.json(
      { success: false, message: "Sesión expirada" },
      { status: 401 },
    );
    response.cookies.delete("token");
    response.cookies.delete("ghost_secret");
    return response;
  }

  // actualizar cookies con los nuevos valores
  const response = NextResponse.json({ success: true });

  response.cookies.set("token", data.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  response.cookies.set("ghost_secret", data.GhostSecret, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
