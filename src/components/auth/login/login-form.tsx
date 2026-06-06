"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { hashPassword } from "@/lib/crypto";
import { saveProfile } from "@/lib/indexedDB";
import { useAuthStore } from "@/store/authStore";
import { AuthMethodDialog } from "../AuthMethodDialog";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showDialog, setShowDialog] = useState(false);

  const setToken = useAuthStore((s) => s.setToken);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const password_hash = await hashPassword(password);

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password_hash }),
      });

      const data = await res.json();

      if (!data.success) {
        setError("Correo o contraseña incorrectos");
        return;
      }

      // guardar perfil en IndexedDB
      await saveProfile(data.data);

      // token en memoria (llegó en cookie httpOnly, pero necesitamos
      // saber que estamos autenticados en el cliente)
      setToken("authenticated"); // no guardamos el token real, solo el estado

      // mostrar dialog de método
      setShowDialog(true);
    } catch {
      setError("Error de conexión, intenta nuevamente");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Bienvenido</CardTitle>
            <CardDescription>Inicia sesión con tu cuenta</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Correo</Label>
                <Input
                  className="h-14"
                  id="email"
                  type="email"
                  placeholder="correo@correo.cl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Contraseña</Label>
                  <Link
                    href="/forgot-password"
                    className="ml-auto text-xs underline-offset-4 hover:underline"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
                <Input
                  className="h-14"
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {error && (
                <p className="text-sm text-destructive text-center">{error}</p>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Ingresando..." : "Ingresar"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="px-6 text-center text-xs text-muted-foreground">
          Al hacer clic en continuar, acepta nuestros{" "}
          <Link
            href="/legaldocuments/termspage"
            className="underline underline-offset-4 hover:text-primary"
          >
            Términos de servicio
          </Link>{" "}
          y nuestra{" "}
          <Link
            href="/legaldocuments/privacypage"
            className="underline underline-offset-4 hover:text-primary"
          >
            Política de privacidad
          </Link>
          .
        </p>
      </div>

      <AuthMethodDialog open={showDialog} userId={email} />
    </>
  );
}
