"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Fingerprint, KeyRound, User } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { saveAuthMethod } from "@/lib/indexedDB";
import { registerBiometric } from "@/lib/biometric";
import { isBiometricSupported } from "@/lib/biometric";
import { PinSetup } from "./PinSetup";

interface AuthMethodDialogProps {
  open: boolean;
  userId: string; // email del usuario
}

export function AuthMethodDialog({ open, userId }: AuthMethodDialogProps) {
  const router = useRouter();
  const [showPinSetup, setShowPinSetup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleBiometric = async () => {
    setLoading(true);
    setError("");
    if (!isBiometricSupported()) {
      setError("Este dispositivo no soporta biometría");
      setLoading(false);
      return;
    }
    const ok = await registerBiometric(userId);
    if (ok) {
      await saveAuthMethod("biometric");
      router.push("/home");
    } else {
      setError("No se pudo registrar la biometría, elige otro método");
    }
    setLoading(false);
  };

  const handlePin = () => setShowPinSetup(true);

  const handleNormal = async () => {
    await saveAuthMethod("normal");
    router.push("/home");
  };

  const handlePinComplete = async () => {
    await saveAuthMethod("pin");
    router.push("/home");
  };

  const handlePinCancel = async () => {
    await saveAuthMethod("normal");
    router.push("/home");
  };

  if (showPinSetup) {
    return (
      <Dialog open={open}>
        <DialogContent className="w-[90vw] rounded-2xl p-0">
          <PinSetup onComplete={handlePinComplete} onCancel={handlePinCancel} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open}>
      <DialogContent className="w-[90vw] rounded-2xl">
        <DialogHeader>
          <DialogTitle>¿Cómo quieres ingresar?</DialogTitle>
          <DialogDescription>
            Elige cómo acceder la próxima vez que abras la app
          </DialogDescription>
        </DialogHeader>

        {error && (
          <p className="text-sm text-destructive text-center">{error}</p>
        )}

        <div className="flex flex-col gap-3 mt-2">
          <button
            onClick={handleBiometric}
            disabled={loading}
            className="flex items-center gap-4 p-4 rounded-xl border border-border 
              hover:border-primary hover:bg-primary/5 transition-all text-left disabled:opacity-50"
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Fingerprint size={20} className="text-primary" />
            </div>
            <div>
              <p className="font-medium text-sm">Biometría</p>
              <p className="text-xs text-muted-foreground">
                Huella o Face ID del dispositivo
              </p>
            </div>
          </button>

          <button
            onClick={handlePin}
            disabled={loading}
            className="flex items-center gap-4 p-4 rounded-xl border border-border 
              hover:border-primary hover:bg-primary/5 transition-all text-left disabled:opacity-50"
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <KeyRound size={20} className="text-primary" />
            </div>
            <div>
              <p className="font-medium text-sm">PIN</p>
              <p className="text-xs text-muted-foreground">
                Código de 6 dígitos
              </p>
            </div>
          </button>

          <button
            onClick={handleNormal}
            disabled={loading}
            className="flex items-center gap-4 p-4 rounded-xl border border-border 
              hover:border-primary hover:bg-primary/5 transition-all text-left disabled:opacity-50"
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <User size={20} className="text-primary" />
            </div>
            <div>
              <p className="font-medium text-sm">Normal</p>
              <p className="text-xs text-muted-foreground">
                Correo y contraseña cada vez
              </p>
            </div>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
