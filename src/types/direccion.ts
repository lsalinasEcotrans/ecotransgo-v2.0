export type Icono =
  | "Home"
  | "Briefcase"
  | "Heart"
  | "Star"
  | "Plane"
  | "MapPin";

export interface Direccion {
  id: number;
  direccion: string;
  latitud: number;
  longitud: number;
  identificador: string;
  icono: Icono;
  favorita: number;
  fecha_creacion: string;
}

export interface DireccionForm {
  direccion: string;
  latitud: number;
  longitud: number;
  identificador: string;
  icono: Icono;
  favorita: number;
}
