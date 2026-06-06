import { getDB } from "@/lib/db";

const DB_NAME = "ecotransgo";
const DB_VERSION = 1;

export async function registerBiometric(userId: string): Promise<boolean> {
  try {
    const challenge = crypto.getRandomValues(new Uint8Array(32));

    const credential = (await navigator.credentials.create({
      publicKey: {
        challenge,
        rp: { name: "Ecotransgo", id: window.location.hostname },
        user: {
          id: new TextEncoder().encode(userId),
          name: userId,
          displayName: userId,
        },
        pubKeyCredParams: [{ alg: -7, type: "public-key" }],
        authenticatorSelection: {
          authenticatorAttachment: "platform",
          userVerification: "required",
        },
        timeout: 60000,
      },
    })) as PublicKeyCredential | null; // ← cast correcto

    if (!credential) return false;

    const db = await getDB();
    const rawId = btoa(
      String.fromCharCode(...new Uint8Array(credential.rawId)), // ← ahora typea bien
    );
    await db.put("auth", rawId, "biometric_id");
    return true;
  } catch {
    return false;
  }
}

export async function verifyBiometric(): Promise<boolean> {
  try {
    const challenge = crypto.getRandomValues(new Uint8Array(32));
    const credential = await navigator.credentials.get({
      publicKey: {
        challenge,
        userVerification: "required",
        timeout: 60000,
      },
    });
    return !!credential;
  } catch {
    return false;
  }
}

export function isBiometricSupported(): boolean {
  return (
    typeof window !== "undefined" && window.PublicKeyCredential !== undefined
  );
}
