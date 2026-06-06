export async function refreshSession(): Promise<boolean> {
  try {
    const res = await fetch("/api/auth/refresh", { method: "POST" });
    const data = await res.json();
    return data.success === true;
  } catch {
    return false;
  }
}
