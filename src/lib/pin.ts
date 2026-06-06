import { openDB } from "idb";

export async function hashPin(pin: string): Promise<string> {
  const buffer = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(pin),
  );
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function verifyPin(inputPin: string): Promise<boolean> {
  const db = await openDB("ecotransgo", 1);
  const stored = (await db.get("auth", "pin_hash")) as string | undefined;
  if (!stored) return false;
  const inputHash = await hashPin(inputPin);
  return inputHash === stored;
}
