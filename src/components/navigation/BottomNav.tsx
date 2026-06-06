"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Plus, Clock, User, Bell } from "lucide-react";

const items = [
  { href: "/home", icon: Home, label: "Inicio" },
  { href: "/historial", icon: Clock, label: "Historial" },
  { href: "/reservas", icon: Plus, label: "Reservas" },
  { href: "/notificaciones", icon: Bell, label: "Notificaciones" },
  { href: "/perfil", icon: User, label: "Perfil" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-background border-t flex items-center justify-around z-50">
      {items.map(({ href, icon: Icon, label }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center gap-1 text-xs w-16
              ${active ? "text-primary" : "text-muted-foreground"}`}
          >
            <Icon size={22} strokeWidth={active ? 2.5 : 1.5} />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
