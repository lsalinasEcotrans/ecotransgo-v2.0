"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { getAuthMethod, clearAuth } from "@/lib/indexedDB";
import { verifyBiometric, isBiometricSupported } from "@/lib/biometric";
import { refreshSession } from "@/lib/auth";
import { LoginForm } from "@/components/auth/login/login-form";
import { PinVerify } from "@/components/auth/PinVerify";

type Screen = "loading" | "login" | "pin" | "biometric_checking";

export default function LoginPage() {
  const router = useRouter();
  const [screen, setScreen] = useState<Screen>("loading");

  const handleRefresh = useCallback(async () => {
    const ok = await refreshSession();
    if (ok) {
      router.push("/home");
    } else {
      await clearAuth();
      setScreen("login");
    }
  }, [router]);

  const checkAuthMethod = useCallback(async () => {
    const method = await getAuthMethod();

    if (!method || method === "normal") {
      setScreen("login");
      return;
    }

    if (method === "pin") {
      setScreen("pin");
      return;
    }

    if (method === "biometric") {
      setScreen("biometric_checking");
      if (!isBiometricSupported()) {
        setScreen("login");
        return;
      }
      const ok = await verifyBiometric();
      if (ok) {
        await handleRefresh();
      } else {
        setScreen("login");
      }
    }
  }, [handleRefresh]);

  useEffect(() => {
    checkAuthMethod();
  }, [checkAuthMethod]);

  if (screen === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (screen === "biometric_checking") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-muted-foreground">
          Verificando identidad...
        </p>
      </div>
    );
  }

  if (screen === "pin") {
    return (
      <PinVerify onSuccess={handleRefresh} onFail={() => setScreen("login")} />
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <LoginForm />
    </div>
  );
}
