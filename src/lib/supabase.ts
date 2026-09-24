import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Modelo = {
  id: string;
  nombre: string;
  tipo: "vigente" | "clasico";
  foto_url: string | null;
  orden: number;
};

export type Repuesto = {
  id: string;
  nombre: string;
  codigo: string;
  categoria: string;
  estado: "vigente" | "clasico";
  foto_url: string | null;
  descripcion: string | null;
  destacado: boolean;
  precio: number | null;
  stock: number | null;
};
