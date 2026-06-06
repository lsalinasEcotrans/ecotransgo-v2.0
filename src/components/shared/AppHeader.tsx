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
      className="w-full px-6 pt-12 pb-10 relative overflow-hidden rounded-b-[2rem] shadow-lg"
      style={{ backgroundColor: hex }}
    >
      {/* glow decorativo */}
      <div
        className="absolute -top-16 -right-10 w-48 h-48 rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.9) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute -bottom-20 -left-12 w-56 h-56 rounded-full opacity-10"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.9) 0%, transparent 70%)",
        }}
      />
      <div className="relative z-10">
        {children ?? (
          <>
            <p className="text-white/70 text-sm">{subtitle}</p>
            <h1 className="text-white text-2xl font-semibold tracking-tight text-balance">
              {title}
            </h1>
          </>
        )}
      </div>
    </header>
  );
}
