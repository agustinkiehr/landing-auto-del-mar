import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MarcasBanner from "@/components/MarcasBanner";
import Footer from "@/components/Footer";
import Catalogo from "@/components/Catalogo";
import { supabase, Modelo, Repuesto } from "@/lib/supabase";

export const revalidate = 60; // re-lee Supabase cada 60s (ajustable)

async function getData() {
  const { data: modelos } = await supabase
    .from("modelos")
    .select("*")
    .order("orden", { ascending: true });

  const { data: repuestos } = await supabase
    .from("repuestos")
    .select("*, repuestos_modelos(modelos(nombre))")
    .eq("activo", true);

  const repuestosConModelos = (repuestos || []).map((r) => ({
    ...(r as Repuesto),
    modelos: (r.repuestos_modelos || []).map(
      (rm: { modelos: { nombre: string } | null }) => rm.modelos?.nombre
    ).filter(Boolean) as string[],
  }));

  return {
    modelos: (modelos || []) as Modelo[],
    repuestos: repuestosConModelos,
  };
}

export default async function Home() {
  const { modelos, repuestos } = await getData();

  return (
    <>
      <Header />
      <main className="pt-20">
        <Hero />
        <MarcasBanner />
        <Catalogo repuestos={repuestos} modelos={modelos} />
      </main>
      <Footer />
    </>
  );
}
