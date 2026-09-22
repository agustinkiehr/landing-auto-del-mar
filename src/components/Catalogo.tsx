"use client";

import { useMemo, useRef, useState } from "react";
import { Modelo, Repuesto } from "@/lib/supabase";
import { buildWhatsappLink } from "@/lib/whatsapp";

type RepuestoConModelos = Repuesto & { modelos: string[] };

export default function Catalogo({
  repuestos,
  modelos,
}: {
  repuestos: RepuestoConModelos[];
  modelos: Modelo[];
}) {
  const [modeloActivo, setModeloActivo] = useState<string>("todos");
  const [categoriaActiva, setCategoriaActiva] = useState<string>("todas");
  const [busqueda, setBusqueda] = useState("");
  const [tab, setTab] = useState<"todos" | "vigente" | "clasico">("todos");
  const modelosScrollRef = useRef<HTMLDivElement>(null);

  const scrollModelos = (direccion: 1 | -1) => {
    modelosScrollRef.current?.scrollBy({
      left: direccion * 620,
      behavior: "smooth",
    });
  };

  const categorias = useMemo(
    () => Array.from(new Set(repuestos.map((r) => r.categoria))).sort(),
    [repuestos]
  );

  const modelosVigentes = modelos.filter((m) => m.tipo === "vigente");
  const modelosClasicos = modelos.filter((m) => m.tipo === "clasico");

  const filtrados = repuestos.filter((r) => {
    if (tab !== "todos" && r.estado !== tab) return false;
    if (modeloActivo !== "todos" && !r.modelos.includes(modeloActivo))
      return false;
    if (categoriaActiva !== "todas" && r.categoria !== categoriaActiva)
      return false;
    if (
      busqueda.trim() &&
      !`${r.nombre} ${r.codigo}`
        .toLowerCase()
        .includes(busqueda.trim().toLowerCase())
    )
      return false;
    return true;
  });

  return (
    <>
      {/* SELECTOR DE MODELO */}
      <section
        id="modelos"
        className="w-full bg-surface-container-low py-space-xl"
      >
        <div className="max-w-[1360px] mx-auto px-margin-mobile md:px-margin">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-sm mb-space-lg">
            <div>
              <div className="inline-flex items-center gap-1.5 text-secondary text-[10px] uppercase tracking-widest font-bold mb-1 font-heading">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                Compatibilidad certificada
              </div>
              <h2 className="font-heading text-[24px] md:text-[32px] font-bold text-primary leading-tight">
                SELECCIONÁ TU MODELO
              </h2>
              <p className="text-on-surface-variant text-[15px]">
                Filtrá el catálogo según la mecánica y chasis de tu vehículo.
              </p>
            </div>
            <div className="inline-flex bg-surface-container rounded-lg p-1">
              {(["todos", "vigente", "clasico"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-3 py-1.5 text-[12px] font-heading font-semibold rounded-md uppercase tracking-wide transition-all duration-200 hover:scale-105 active:scale-95 ${
                    tab === t
                      ? "bg-primary text-on-primary"
                      : "text-on-surface-variant hover:text-primary"
                  }`}
                >
                  {t === "todos"
                    ? "Todos"
                    : t === "vigente"
                    ? "Línea actual"
                    : "Clásicos"}
                </button>
              ))}
            </div>
          </div>

          <div className="relative group/carousel">
            <div
              ref={modelosScrollRef}
              className="flex gap-space-lg overflow-x-auto pb-2 scroll-smooth [scrollbar-width:none]"
            >
              <ModeloChip
                nombre="Todos los modelos"
                activo={modeloActivo === "todos"}
                onClick={() => setModeloActivo("todos")}
              />
              {(tab === "clasico" ? modelosClasicos : tab === "vigente" ? modelosVigentes : modelos).map(
                (m) => (
                  <ModeloChip
                    key={m.id}
                    nombre={m.nombre}
                    foto={m.foto_url}
                    activo={modeloActivo === m.nombre}
                    onClick={() => setModeloActivo(m.nombre)}
                  />
                )
              )}
            </div>

            <button
              type="button"
              aria-label="Ver modelos anteriores"
              onClick={() => scrollModelos(-1)}
              className="hidden sm:flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-surface-container-lowest border border-outline-variant/40 shadow-md text-on-surface hover:bg-primary hover:text-on-primary hover:scale-110 active:scale-95 transition-all duration-200 opacity-0 group-hover/carousel:opacity-100"
            >
              <ChevronIcon direction="left" />
            </button>
            <button
              type="button"
              aria-label="Ver más modelos"
              onClick={() => scrollModelos(1)}
              className="flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-10 h-10 rounded-full bg-surface-container-lowest border border-outline-variant/40 shadow-md text-on-surface hover:bg-primary hover:text-on-primary hover:scale-110 active:scale-95 transition-all duration-200"
            >
              <ChevronIcon direction="right" />
            </button>
          </div>
        </div>
      </section>

      {/* CATEGORÍAS */}
      <section id="categorias" className="w-full bg-surface py-space-xl">
        <div className="max-w-[1360px] mx-auto px-margin-mobile md:px-margin">
          <h2 className="font-heading text-[20px] md:text-[24px] font-bold text-primary mb-space-md">
            ¿Qué repuesto buscás?
          </h2>
          <div className="flex flex-wrap gap-space-sm">
            <CategoriaChip
              nombre="Todas"
              activo={categoriaActiva === "todas"}
              onClick={() => setCategoriaActiva("todas")}
            />
            {categorias.map((c) => (
              <CategoriaChip
                key={c}
                nombre={c}
                activo={categoriaActiva === c}
                onClick={() => setCategoriaActiva(c)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CATÁLOGO */}
      <section id="catalogo-de-piezas" className="w-full bg-surface pb-space-xl">
        <div className="max-w-[1360px] mx-auto px-margin-mobile md:px-margin">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm mb-space-lg">
            <h2 className="font-heading text-[20px] md:text-[24px] font-bold text-primary">
              Catálogo ({filtrados.length})
            </h2>
            <div className="flex items-center bg-surface-container-low rounded-lg px-space-sm py-2 w-full md:w-72">
              <input
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Código OEM o nombre..."
                className="bg-transparent text-[14px] w-full focus:outline-none placeholder:text-on-surface-variant/70"
              />
            </div>
          </div>

          {filtrados.length === 0 ? (
            <p className="text-on-surface-variant py-space-xl text-center animate-fade-in-up">
              No encontramos repuestos con esos filtros. Probá con otro
              modelo o categoría.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
              {filtrados.map((r, i) => (
                <RepuestoCard key={r.id} repuesto={r} delay={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function ModeloChip({
  nombre,
  foto,
  activo,
  onClick,
}: {
  nombre: string;
  foto?: string | null;
  activo: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-2 shrink-0 rounded-xl px-space-md py-space-md border transition-all duration-200 hover:scale-105 hover:shadow-md active:scale-95 ${
        activo
          ? "border-renault-yellow bg-surface-container-lowest shadow-sm"
          : "border-transparent bg-surface-container-lowest/60 hover:bg-surface-container-lowest"
      }`}
    >
      <div className="w-64 h-64 rounded-lg bg-surface-container-lowest flex items-center justify-center overflow-hidden">
        {foto ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={foto} alt={nombre} className="w-full h-full object-contain" />
        ) : (
          <span className="text-on-surface-variant text-[16px]">
            {nombre.slice(0, 3).toUpperCase()}
          </span>
        )}
      </div>
      <span className="text-[16px] font-heading font-semibold text-on-surface whitespace-nowrap">
        {nombre}
      </span>
    </button>
  );
}

function CategoriaChip({
  nombre,
  activo,
  onClick,
}: {
  nombre: string;
  activo: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-space-md py-2 rounded-full text-[13px] font-heading font-semibold uppercase tracking-wide border transition-all duration-200 hover:scale-105 active:scale-95 ${
        activo
          ? "bg-primary text-on-primary border-primary"
          : "bg-surface-container-lowest text-on-surface-variant border-outline-variant hover:border-primary"
      }`}
    >
      {nombre}
    </button>
  );
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={direction === "left" ? "rotate-180" : ""}
    >
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

function RepuestoCard({
  repuesto,
  delay = 0,
}: {
  repuesto: RepuestoConModelos;
  delay?: number;
}) {
  const link = buildWhatsappLink({
    nombre: repuesto.nombre,
    codigo: repuesto.codigo,
  });
  return (
    <div
      className="flex flex-col bg-surface-container-lowest border border-outline-variant/40 rounded-lg overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1 animate-fade-in-up"
      style={{ animationDelay: `${(delay % 8) * 40}ms` }}
    >
      <div className="aspect-square bg-[#FAFAFA] flex items-center justify-center overflow-hidden">
        {repuesto.foto_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={repuesto.foto_url}
            alt={repuesto.nombre}
            className="w-full h-full object-contain p-4 transition-transform duration-300 hover:scale-110"
          />
        ) : (
          <span className="text-on-surface-variant text-[12px]">Sin foto</span>
        )}
      </div>
      <div className="flex flex-col gap-1.5 p-space-md flex-1">
        <span
          className={`self-start px-2 py-0.5 rounded-full text-[10px] font-heading font-bold uppercase tracking-wide ${
            repuesto.estado === "vigente"
              ? "bg-[#E6F8EE] text-stock-available"
              : "bg-[#FEF3C7] text-discontinued-amber"
          }`}
        >
          {repuesto.estado === "vigente" ? "En stock" : "Clásico"}
        </span>
        <h3 className="font-heading font-semibold text-[15px] text-on-surface leading-snug">
          {repuesto.nombre}
        </h3>
        <span className="text-[12px] text-on-surface-variant font-mono uppercase tracking-wide">
          Cód. {repuesto.codigo}
        </span>
        {repuesto.modelos.length > 0 && (
          <span className="text-[11px] text-on-surface-variant">
            {repuesto.modelos.slice(0, 3).join(", ")}
            {repuesto.modelos.length > 3 ? "…" : ""}
          </span>
        )}
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto flex items-center justify-center gap-1.5 bg-whatsapp-green text-white font-heading font-bold text-[13px] uppercase tracking-wide rounded-lg py-2.5 transition-all duration-200 hover:opacity-90 hover:scale-[1.03] active:scale-95"
        >
          Consultar por WhatsApp
        </a>
      </div>
    </div>
  );
}
