"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Modelo, Repuesto } from "@/lib/supabase";
import { buildWhatsappLink, buildWhatsappSolicitudLink } from "@/lib/whatsapp";

type RepuestoConModelos = Repuesto & { modelos: string[] };

const TABS = ["todos", "vigente", "clasico"] as const;
const PAGE_SIZE = 16;

function useAnimatedNumber(value: number) {
  const [display, setDisplay] = useState(value);
  const prevRef = useRef(value);

  useEffect(() => {
    const from = prevRef.current;
    const to = value;
    if (from === to) return;
    const duration = 350;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(from + (to - from) * eased));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        prevRef.current = to;
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  return display;
}

export default function Catalogo({
  repuestos,
  modelos,
}: {
  repuestos: RepuestoConModelos[];
  modelos: Modelo[];
}) {
  const [modeloActivo, setModeloActivo] = useState<string>("todos");
  const [categoriasActivas, setCategoriasActivas] = useState<string[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [tab, setTab] = useState<(typeof TABS)[number]>("todos");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const modelosScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [tab, modeloActivo, categoriasActivas, busqueda]);

  const toggleCategoria = (c: string) => {
    setCategoriasActivas((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );
  };

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    if (categoriasActivas.length > 0 && !categoriasActivas.includes(r.categoria))
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

  const visibles = filtrados.slice(0, visibleCount);
  const hayMas = filtrados.length > visibleCount;
  const animatedCount = useAnimatedNumber(filtrados.length);

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
            <div className="relative inline-grid grid-cols-3 bg-surface-container rounded-lg p-1">
              <div
                className="absolute inset-y-1 left-1 rounded-md bg-primary transition-transform duration-300 ease-out"
                style={{
                  width: "calc((100% - 8px) / 3)",
                  transform: `translateX(${TABS.indexOf(tab) * 100}%)`,
                }}
              />
              {TABS.map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`relative z-10 px-3 py-1.5 text-[12px] font-heading font-semibold rounded-md uppercase tracking-wide transition-colors duration-200 active:scale-95 ${
                    tab === t
                      ? "text-on-primary"
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
                esTodos
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
              activo={categoriasActivas.length === 0}
              onClick={() => setCategoriasActivas([])}
            />
            {categorias.map((c) => (
              <CategoriaChip
                key={c}
                nombre={c}
                activo={categoriasActivas.includes(c)}
                onClick={() => toggleCategoria(c)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CATÁLOGO */}
      <section id="catalogo-de-piezas" className="w-full bg-surface pb-space-xl">
        <div className="max-w-[1360px] mx-auto px-margin-mobile md:px-margin">
          <div className="relative mb-space-md">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none" />
            <input
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscá por código OEM o nombre del repuesto..."
              className="w-full bg-surface-container-lowest border-2 border-outline-variant/50 rounded-xl pl-12 pr-4 py-3.5 md:py-4 text-[15px] md:text-[16px] shadow-sm transition-all duration-200 focus:outline-none focus:border-renault-yellow focus:shadow-md placeholder:text-on-surface-variant/60"
            />
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm mb-space-lg">
            <h2 className="font-heading text-[20px] md:text-[24px] font-bold text-primary">
              Catálogo ({animatedCount})
            </h2>
          </div>

          {filtrados.length === 0 ? (
            <SolicitudRepuesto
              busqueda={busqueda}
              modeloActivo={modeloActivo}
              categoriasActivas={categoriasActivas}
            />
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
                {visibles.map((r, i) => (
                  <RepuestoCard key={r.id} repuesto={r} delay={i} />
                ))}
              </div>
              {hayMas && (
                <div className="flex justify-center mt-space-lg">
                  <button
                    onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                    className="px-space-lg py-3 rounded-lg border border-outline-variant font-heading font-semibold text-[13px] uppercase tracking-wide text-on-surface transition-all duration-200 hover:border-primary hover:bg-surface-container-low hover:scale-105 active:scale-95"
                  >
                    Cargar más ({filtrados.length - visibleCount} restantes)
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <button
        type="button"
        aria-label="Volver arriba"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-primary text-on-primary shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 ${
          showScrollTop
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <ChevronIcon direction="up" />
      </button>
    </>
  );
}

function TodosIcon() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-renault-yellow"
    >
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  );
}

function ModeloChip({
  nombre,
  foto,
  esTodos = false,
  activo,
  onClick,
}: {
  nombre: string;
  foto?: string | null;
  esTodos?: boolean;
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
      <div className="w-56 h-56 rounded-lg bg-surface-container-lowest flex items-center justify-center overflow-hidden">
        {foto ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={foto} alt={nombre} className="w-full h-full object-contain" />
        ) : esTodos ? (
          <TodosIcon />
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

function SearchIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M21 21l-4.8-4.8" />
    </svg>
  );
}

function SearchOffIcon({ className = "text-on-surface-variant" }: { className?: string }) {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="10" cy="10" r="6" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  );
}

function SolicitudRepuesto({
  busqueda,
  modeloActivo,
  categoriasActivas,
}: {
  busqueda: string;
  modeloActivo: string;
  categoriasActivas: string[];
}) {
  const [detalle, setDetalle] = useState("");
  const [clicked, setClicked] = useState(false);

  const contextoPartes = [
    busqueda.trim() || null,
    modeloActivo !== "todos" ? `modelo ${modeloActivo}` : null,
    categoriasActivas.length > 0 ? `categoría ${categoriasActivas.join(", ")}` : null,
  ].filter((p): p is string => Boolean(p));
  const contexto = contextoPartes.length > 0 ? contextoPartes.join(" · ") : "un repuesto";

  const link = buildWhatsappSolicitudLink({ busqueda: contexto, detalle });

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 1200);
  };

  return (
    <div className="max-w-2xl mx-auto my-space-lg rounded-2xl bg-primary text-white p-space-lg md:p-space-xl text-center animate-fade-in-up shadow-[0_20px_60px_rgba(0,0,0,0.25)] border border-renault-yellow/30">
      <div className="w-16 h-16 rounded-full bg-renault-yellow flex items-center justify-center mx-auto mb-space-md">
        <SearchOffIcon className="text-primary" />
      </div>
      <h3 className="font-heading font-bold text-[22px] md:text-[26px] mb-2">
        ¿No encontraste tu repuesto?
      </h3>
      <p className="text-primary-fixed-dim text-[15px] mb-space-lg max-w-md mx-auto">
        Puede que lo tengamos igual. Contanos qué necesitás y lo pedimos
        directo a la <span className="text-renault-yellow font-semibold">terminal de Renault Argentina</span>.
      </p>

      <div className="bg-white/5 border border-white/10 rounded-xl p-space-md text-left space-y-space-sm backdrop-blur-sm">
        <p className="text-[12px] text-primary-fixed-dim">
          Buscaste: <span className="font-semibold text-white">{contexto}</span>
        </p>
        <textarea
          value={detalle}
          onChange={(e) => setDetalle(e.target.value)}
          placeholder="Contanos más detalles: modelo del auto, año, motor... (opcional)"
          rows={3}
          className="w-full bg-white/10 border border-white/15 rounded-lg p-space-sm text-[13px] text-white placeholder:text-primary-fixed-dim/70 focus:outline-none focus:border-renault-yellow transition-colors resize-none"
        />
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          className={`flex items-center justify-center gap-1.5 text-white font-heading font-bold text-[14px] uppercase tracking-wide rounded-lg py-3.5 transition-all duration-200 active:scale-95 w-full shadow-lg ${
            clicked
              ? "bg-stock-available scale-[1.02]"
              : "bg-whatsapp-green hover:opacity-90 hover:scale-[1.02]"
          }`}
        >
          {clicked ? (
            <>
              <CheckIcon />
              ¡Listo, enviando por WhatsApp!
            </>
          ) : (
            "Pedir este repuesto por WhatsApp"
          )}
        </a>
      </div>
    </div>
  );
}

function ChevronIcon({ direction }: { direction: "left" | "right" | "up" }) {
  const rotation =
    direction === "left" ? "rotate-180" : direction === "up" ? "-rotate-90" : "";
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
      className={rotation}
    >
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function formatPrecio(precio: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(precio);
}

function RepuestoCard({
  repuesto,
  delay = 0,
}: {
  repuesto: RepuestoConModelos;
  delay?: number;
}) {
  const [clicked, setClicked] = useState(false);
  const link = buildWhatsappLink({
    nombre: repuesto.nombre,
    codigo: repuesto.codigo,
  });
  const handleWhatsappClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 1000);
  };
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
        <div className="flex items-center gap-1.5 flex-wrap">
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-heading font-bold uppercase tracking-wide ${
              repuesto.estado === "vigente"
                ? "bg-[#E6F8EE] text-stock-available"
                : "bg-[#FEF3C7] text-discontinued-amber"
            }`}
          >
            {repuesto.estado === "vigente" ? "Línea actual" : "Clásico"}
          </span>
          {repuesto.stock !== null && (
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-heading font-bold uppercase tracking-wide ${
                repuesto.stock > 0
                  ? "bg-[#E6F8EE] text-stock-available"
                  : "bg-surface-container text-on-surface-variant"
              }`}
            >
              {repuesto.stock > 0 ? `${repuesto.stock} en stock` : "Sin stock"}
            </span>
          )}
        </div>
        <h3 className="font-heading font-semibold text-[15px] text-on-surface leading-snug">
          {repuesto.nombre}
        </h3>
        <span className="font-heading font-bold text-[19px] text-primary">
          {repuesto.precio !== null ? formatPrecio(repuesto.precio) : "Consultar precio"}
        </span>
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
          onClick={handleWhatsappClick}
          className={`mt-auto flex items-center justify-center gap-1.5 text-white font-heading font-bold text-[13px] uppercase tracking-wide rounded-lg py-2.5 transition-all duration-200 active:scale-95 ${
            clicked
              ? "bg-stock-available scale-[1.03]"
              : "bg-whatsapp-green hover:opacity-90 hover:scale-[1.03]"
          }`}
        >
          {clicked ? (
            <>
              <CheckIcon />
              ¡Abriendo WhatsApp!
            </>
          ) : (
            "Consultar por WhatsApp"
          )}
        </a>
      </div>
    </div>
  );
}
