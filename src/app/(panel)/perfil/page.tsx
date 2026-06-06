"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useColorStore, COLORS } from "@/store/colorStore";
import { AppHeader } from "@/components/shared/AppHeader";
import { Direcciones } from "@/components/perfil/Direcciones";
import { LogoutButton } from "@/components/perfil/LogoutButton";
import { Check } from "lucide-react";

function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);
  if (!mounted) return null;

  const options = [
    { value: "light", label: "Claro", icon: "☀️" },
    { value: "dark", label: "Oscuro", icon: "🌙" },
    { value: "system", label: "Sistema", icon: "⚙️" },
  ];

  return (
    <div className="flex gap-3">
      {options.map(({ value, label, icon }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          className={`flex-1 flex flex-col items-center gap-2 py-4 rounded-xl border transition-all
            ${
              theme === value
                ? "border-primary bg-primary/5 text-primary"
                : "border-border text-muted-foreground"
            }`}
        >
          <span className="text-2xl">{icon}</span>
          <span className="text-xs font-medium">{label}</span>
        </button>
      ))}
    </div>
  );
}

function ColorSelector() {
  const { colorId, setColor } = useColorStore();
  return (
    <div className="flex gap-3 flex-wrap">
      {COLORS.map(({ id, hex: colorHex, label }) => (
        <button
          key={id}
          onClick={() => setColor(id)}
          title={label}
          className="w-10 h-10 rounded-full relative flex items-center justify-center ring-offset-2 ring-offset-background transition-all"
          style={{
            backgroundColor: colorHex,
            boxShadow: colorId === id ? `0 0 0 3px ${colorHex}` : undefined,
          }}
        >
          {colorId === id && (
            <Check size={16} className="text-white" strokeWidth={3} />
          )}
        </button>
      ))}
    </div>
  );
}

export default function PerfilPage() {
  return (
    <div>
      <AppHeader title="Perfil" subtitle="Configuración" />
      <div className="p-6 flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <p className="text-sm font-medium">Color de la app</p>
          <ColorSelector />
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-sm font-medium">Apariencia</p>
          <ThemeSelector />
        </div>

        <Direcciones />

        {/* separador visual antes del logout */}
        <div className="border-t pt-4">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
