import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const placeID = searchParams.get("placeID");

  if (!placeID) {
    return NextResponse.json(
      { error: "Parámetro placeID requerido" },
      { status: 400 },
    );
  }

  const cookieStore = await cookies();
  const ghostSecret = cookieStore.get("ghost_secret")?.value; // ← tu cookie directa

  if (!ghostSecret) {
    return NextResponse.json({ error: "Sin autenticación" }, { status: 401 });
  }

  const url = `https://ghost-main-static-b7ec98c880a54ad5a4782393902a32a2.ghostapi.app:29003/api/ghost/v2/autocomplete/details?placeID=${encodeURIComponent(placeID)}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authentication-Token": ghostSecret,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: "Error consultando Ghost API" },
      { status: response.status },
    );
  }

  const data = await response.json();
  return NextResponse.json(data);
}
