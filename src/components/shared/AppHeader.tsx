"use client";
import { useColorStore } from "@/store/colorStore";

interface AppHeaderProps {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode; // ← para pasar UserGreeting u otro contenido
}

export function AppHeader({ title, subtitle, children }: AppHeaderProps) {
  const { hex } = useColorStore();

  return (
    <header
      className="w-full px-6 pt-10 pb-6 relative overflow-hidden"
      style={{ backgroundColor: hex }}
    >
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg, transparent, transparent 10px,
            rgba(255,255,255,0.5) 10px, rgba(255,255,255,0.5) 11px
          )`,
        }}
      />
      <div className="relative z-10">
        {children ?? (
          <>
            <p className="text-white/70 text-sm">{subtitle}</p>
            <h1 className="text-white text-2xl font-semibold">{title}</h1>
          </>
        )}
      </div>
    </header>
  );
}
