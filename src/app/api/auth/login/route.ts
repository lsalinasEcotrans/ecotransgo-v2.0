import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { username, password_hash } = await req.json();

  const res = await fetch(
    "https://ecotrans-go-370980788525.europe-west1.run.app/auth-login/",
    {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password_hash }),
    },
  );

  const data = await res.json();

  if (!res.ok || !data.success) {
    return NextResponse.json(
      { success: false, message: "Credenciales incorrectas" },
      { status: 401 },
    );
  }

  // construimos la respuesta — solo enviamos al cliente lo que necesita
  const response = NextResponse.json({
    success: true,
    data: data.data, // nombre, email, teléfono, estado
  });

  // token y GhostSecret van en cookies HttpOnly — JS nunca los ve
  response.cookies.set("token", data.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 días
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
