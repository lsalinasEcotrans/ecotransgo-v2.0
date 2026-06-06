"use client";
import { useState } from "react";
import { hashPin } from "@/lib/pin";
import { savePinHash } from "@/lib/indexedDB";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

interface PinSetupProps {
  onComplete: () => void;
  onCancel: () => void;
}

export function PinSetup({ onComplete, onCancel }: PinSetupProps) {
  const [step, setStep] = useState<"create" | "confirm">("create");
  const [firstPin, setFirstPin] = useState("");
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const handleChange = async (val: string) => {
    setValue(val);
    if (val.length < 6) return;

    if (step === "create") {
      setFirstPin(val);
      setValue("");
      setStep("confirm");
      return;
    }

    if (val !== firstPin) {
      setError("Los PINs no coinciden, intenta de nuevo");
      setValue("");
      setStep("create");
      setFirstPin("");
      return;
    }

    const hash = await hashPin(val);
    await savePinHash(hash);
    onComplete();
  };

  return (
    <div className="flex flex-col items-center gap-8 p-8">
      <div className="flex flex-col items-center gap-2 text-center">
        <h2 className="text-xl font-semibold">
          {step === "create" ? "Crea tu PIN" : "Confirma tu PIN"}
        </h2>
        <p className="text-sm text-muted-foreground">
          {step === "create"
            ? "Elige 6 dígitos para acceder rápido"
            : "Ingresa el mismo PIN de nuevo"}
        </p>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

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
        onClick={onCancel}
        className="text-sm text-muted-foreground underline-offset-4 hover:underline"
      >
        Cancelar, usar acceso normal
      </button>
    </div>
  );
}
