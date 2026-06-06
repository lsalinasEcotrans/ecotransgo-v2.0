"use client";
import { useEffect, useState } from "react";
import { getProfile } from "@/lib/indexedDB";

interface Profile {
  name: string;
  email: string;
  phone: string;
  estado: number;
}

export function UserGreeting() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    getProfile().then(setProfile);
  }, []);

  if (!profile)
    return <div className="h-8 w-48 bg-muted animate-pulse rounded-md" />;

  // el name viene como "LUIS SALINAS/167402801/CC001"
  // tomamos solo la primera parte antes del /
  const firstName = profile.name.split("/")[0].split(" ")[0];

  return (
    <div className="flex flex-col">
      <p className="text-white/70 text-sm">Bienvenido</p>
      <p className="text-white text-2xl font-semibold capitalize">
        {firstName.toUpperCase()}
      </p>
    </div>
  );
}
