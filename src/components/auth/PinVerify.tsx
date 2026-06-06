"use client";
import { useState } from "react";
import { verifyPin } from "@/lib/pin";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

interface PinVerifyProps {
  onSuccess: () => void;
  onFail: () => void;
}

export function PinVerify({ onSuccess, onFail }: PinVerifyProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);

  const handleChange = async (val: string) => {
    setValue(val);
    if (val.length < 6) return;

    const ok = await verifyPin(val);
    if (ok) {
      onSuccess();
    } else {
      const next = attempts + 1;
      setAttempts(next);
      setValue("");
      if (next >= 3) {
        onFail();
      } else {
        setError(
          `PIN incorrecto. ${3 - next} intento${3 - next === 1 ? "" : "s"} restante${3 - next === 1 ? "" : "s"}`,
        );
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 p-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h2 className="text-xl font-semibold">Ingresa tu PIN</h2>
        <p className="text-sm text-muted-foreground">
          6 dígitos para continuar
        </p>
      </div>

      {error && <p className="text-sm text-destructive text-center">{error}</p>}

      <InputOTP maxLength={6} value={value} onChange={handleChange}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>

      <button
        onClick={onFail}
        className="text-sm text-muted-foreground underline-offset-4 hover:underline"
      >
        Usar otro método
      </button>
    </div>
  );
}
