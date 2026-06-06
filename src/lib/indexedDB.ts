import { getDB } from "@/lib/db";

const DB_NAME = "ecotransgo";
const DB_VERSION = 1;

// perfil del usuario
export async function saveProfile(data: {
  name: string;
  phone: string;
  email: string;
  estado: number;
}) {
  const db = await getDB();
  await db.put("profile", data, "user");
}

export async function getProfile() {
  const db = await getDB();
  return db.get("profile", "user");
}

// método de autenticación elegido
export async function saveAuthMethod(method: "biometric" | "pin" | "normal") {
  const db = await getDB();
  await db.put("auth", method, "method");
}

export async function getAuthMethod() {
  const db = await getDB();
  return db.get("auth", "method") as Promise<
    "biometric" | "pin" | "normal" | undefined
  >;
}

// PIN hasheado
export async function savePinHash(hash: string) {
  const db = await getDB();
  await db.put("auth", hash, "pin_hash");
}

export async function getPinHash() {
  const db = await getDB();
  return db.get("auth", "pin_hash") as Promise<string | undefined>;
}

export async function clearAuth() {
  const db = await getDB();
  await db.delete("auth", "method");
  await db.delete("auth", "pin_hash");
  await db.delete("profile", "user");
}
