"use client";
import { useEffect, useState, useCallback } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Home,
  Briefcase,
  Heart,
  Star,
  Plane,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { Direccion, DireccionForm, Icono } from "@/types/direccion";
import { GhostAddressInput } from "@/components/ui/GhostAddressInput";

const ICONOS: { id: Icono; icon: React.ElementType; label: string }[] = [
  { id: "Home", icon: Home, label: "Casa" },
  { id: "Briefcase", icon: Briefcase, label: "Trabajo" },
  { id: "Heart", icon: Heart, label: "Favorito" },
  { id: "Star", icon: Star, label: "Destacado" },
  { id: "Plane", icon: Plane, label: "Viaje" },
  { id: "MapPin", icon: MapPin, label: "Otro" },
];

const EMPTY_FORM: DireccionForm = {
  direccion: "",
  latitud: 0,
  longitud: 0,
  identificador: "",
  icono: "Home",
  favorita: 0,
};

function IconComponent({ name }: { name: string }) {
  const found = ICONOS.find((i) => i.id === name);
  if (!found) return <MapPin size={18} />;
  const Icon = found.icon;
  return <Icon size={18} />;
}

export function Direcciones() {
  const [direcciones, setDirecciones] = useState<Direccion[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [editando, setEditando] = useState<Direccion | null>(null);
  const [form, setForm] = useState<DireccionForm>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const fetchDirecciones = useCallback(async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/direcciones");
      const data = await res.json();

      if (data.success) {
        setDirecciones(data.data);
      }
    } catch (error) {
      console.error("Error cargando direcciones:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    async function loadDirecciones() {
      try {
        const res = await fetch("/api/direcciones");
        const data = await res.json();

        if (mounted && data.success) {
          setDirecciones(data.data);
        }
      } catch (error) {
        console.error("Error cargando direcciones:", error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadDirecciones();

    return () => {
      mounted = false;
    };
  }, []);
  const openCreate = () => {
    setEditando(null);
    setForm(EMPTY_FORM);
    setDialogOpen(true);
  };

  const openEdit = (d: Direccion) => {
    setEditando(d);
    setForm({
      direccion: d.direccion,
      latitud: d.latitud,
      longitud: d.longitud,
      identificador: d.identificador,
      icono: d.icono as Icono,
      favorita: d.favorita,
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    if (editando) {
      await fetch(`/api/direcciones/${editando.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } else {
      await fetch("/api/direcciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }
    await fetchDirecciones();
    setDialogOpen(false);
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await fetch(`/api/direcciones/${deleteId}`, { method: "DELETE" });
    await fetchDirecciones();
    setDeleteId(null);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">Mis direcciones</p>
        <Button size="sm" variant="outline" onClick={openCreate}>
          <Plus size={16} className="mr-1" /> Agregar
        </Button>
      </div>

      {loading ? (
        <div className="flex flex-col gap-2">
          {[1, 2].map((i) => (
            <div key={i} className="h-16 rounded-xl bg-muted animate-pulse" />
          ))}
        </div>
      ) : direcciones.length === 0 ? (
        <div className="text-center py-8 text-sm text-muted-foreground border rounded-xl">
          No tienes direcciones guardadas
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {direcciones.map((d) => (
            <div
              key={d.id}
              className="flex items-center gap-3 p-3 rounded-xl border bg-card"
            >
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <IconComponent name={d.icono} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{d.identificador}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {d.direccion}
                </p>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => openEdit(d)}
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <Pencil size={15} className="text-muted-foreground" />
                </button>
                <button
                  onClick={() => setDeleteId(d.id)}
                  className="p-2 rounded-lg hover:bg-destructive/10 transition-colors"
                >
                  <Trash2 size={15} className="text-destructive" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Dialog crear/editar */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="w-[90vw] rounded-2xl">
          <DialogHeader>
            <DialogTitle>
              {editando ? "Editar dirección" : "Nueva dirección"}
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label>Identificador</Label>
              <Input
                placeholder="Ej: Casa, Trabajo..."
                value={form.identificador}
                onChange={(e) =>
                  setForm((f) => ({ ...f, identificador: e.target.value }))
                }
              />
            </div>
            {/* // ✅ PONER esto en el mismo lugar */}
            <GhostAddressInput
              label="Dirección"
              placeholder="Buscar dirección..."
              value={form.direccion}
              lat={form.latitud || null}
              lng={form.longitud || null}
              onChange={({ address, lat, lng }) =>
                setForm((f) => ({
                  ...f,
                  direccion: address,
                  latitud: lat ?? 0,
                  longitud: lng ?? 0,
                }))
              }
            />
            <div className="flex flex-col gap-2">
              <Label>Ícono</Label>
              <div className="flex gap-2 flex-wrap">
                {ICONOS.map(({ id, icon: Icon, label }) => (
                  <button
                    key={id}
                    onClick={() => setForm((f) => ({ ...f, icono: id }))}
                    title={label}
                    className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all
                      ${
                        form.icono === id
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border text-muted-foreground"
                      }`}
                  >
                    <Icon size={18} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter className="mt-2">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? "Guardando..." : "Guardar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* AlertDialog confirmar borrar */}
      <AlertDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
      >
        <AlertDialogContent className="w-[90vw] rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar dirección?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive hover:bg-destructive/90"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
