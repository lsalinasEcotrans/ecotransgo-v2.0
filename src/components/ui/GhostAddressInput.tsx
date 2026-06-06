"use client";

import { useRef, useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { MapPin, Check } from "lucide-react";
import { toast } from "sonner";

interface Suggestion {
  description: string;
  place_id: string | null;
  fullAddress?: any;
  customAddressID?: number | null;
}

interface Props {
  label: string;
  placeholder?: string;
  value: string;
  lat: number | null;
  lng: number | null;
  color?: "emerald" | "blue";

  onChange: (data: {
    address: string;
    lat: number | null;
    lng: number | null;
  }) => void;
}

export function GhostAddressInput({
  label,
  placeholder,
  value,
  lat,
  lng,
  color = "emerald",
  onChange,
}: Props) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const currentRequest = useRef(0);

  async function handleAutocomplete(text: string) {
    if (text.length < 3) {
      setSuggestions([]);
      return;
    }

    const requestId = ++currentRequest.current;

    try {
      const res = await fetch(
        `/api/ghost/autocomplete?text=${encodeURIComponent(text)}`,
      );

      if (!res.ok) {
        throw new Error("Error autocomplete");
      }

      const data = await res.json();

      if (requestId !== currentRequest.current) return;

      const results = data?.searchResults ?? [];

      setSuggestions(
        results.map((item: any) => ({
          description: item.address,
          place_id: item.placeID,
          fullAddress: item.fullAddress,
          customAddressID: item.customAddressID,
        })),
      );
    } catch (error) {
      console.error(error);
      toast.error("Error buscando dirección");
    }
  }

  async function handleSelect(suggestion: Suggestion) {
    try {
      let latitude: number | null = null;
      let longitude: number | null = null;

      if (suggestion.fullAddress?.coordinate) {
        latitude = suggestion.fullAddress.coordinate.latitude;
        longitude = suggestion.fullAddress.coordinate.longitude;
      } else if (suggestion.place_id) {
        const res = await fetch(
          `/api/ghost/details?placeID=${encodeURIComponent(suggestion.place_id)}`,
        );

        if (!res.ok) {
          throw new Error("Error details");
        }

        const data = await res.json();

        latitude = data?.coordinate?.latitude;
        longitude = data?.coordinate?.longitude;
      }

      if (latitude == null || longitude == null) {
        toast.error("No se pudieron obtener coordenadas");
        return;
      }

      onChange({
        address: suggestion.description,
        lat: latitude,
        lng: longitude,
      });

      setSuggestions([]);
    } catch (error) {
      console.error(error);
      toast.error("Error obteniendo detalles");
    }
  }

  return (
    <div className="space-y-1.5 relative">
      <div className="flex items-center justify-between">
        <Label>{label}</Label>

        {lat !== null && (
          <span className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
            <Check className="h-3 w-3" />
            Ubicación confirmada
          </span>
        )}
      </div>

      <div className="relative">
        <MapPin
          className={`absolute left-3 top-1/2 -translate-y-1/2 size-4 ${
            color === "emerald" ? "text-emerald-500" : "text-blue-500"
          }`}
        />

        <Input
          value={value}
          onChange={(e) => {
            onChange({
              address: e.target.value,
              lat: null,
              lng: null,
            });

            handleAutocomplete(e.target.value);
          }}
          placeholder={placeholder}
          className={`pl-9 pr-10 ${
            lat !== null
              ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20"
              : ""
          }`}
        />

        {lat !== null && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Check className="h-5 w-5 text-emerald-500" />
          </div>
        )}
      </div>

      {suggestions.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1 rounded-lg border bg-popover shadow-lg overflow-hidden max-h-75 overflow-y-auto">
          {suggestions.map((s, i) => (
            <button
              key={`${s.description}-${i}`}
              type="button"
              className="flex w-full items-start gap-2 px-3 py-2.5 text-sm hover:bg-accent text-left"
              onClick={() => handleSelect(s)}
            >
              <MapPin className="size-3.5 text-muted-foreground shrink-0 mt-0.5" />
              <span className="wrap-break-word whitespace-normal flex-1">
                {s.description}
              </span>
            </button>
          ))}
        </div>
      )}

      {lat === null && value && (
        <p className="text-[11px] text-amber-500">
          Selecciona una dirección válida
        </p>
      )}
    </div>
  );
}
