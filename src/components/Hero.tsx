export default function Hero() {
  return (
    <section className="relative w-full bg-primary text-on-primary overflow-hidden py-16 lg:py-24">
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#FFCC00 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-renault-yellow/10 blur-3xl pointer-events-none" />
      <div className="max-w-[1360px] mx-auto px-margin-mobile md:px-margin relative z-10">
        <div className="max-w-3xl space-y-space-md">
          <div className="inline-flex items-center gap-2 bg-primary-container px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-renault-yellow animate-pulse" />
            <span className="text-[10px] font-heading font-bold uppercase tracking-widest text-renault-yellow">
              Piezas 100% originales · Auto del Mar
            </span>
          </div>

          <h1 className="font-heading text-[36px] md:text-[56px] leading-[1.05] uppercase tracking-tight font-bold">
            Repuestos <span className="text-renault-yellow">Renault</span>
          </h1>

          <p className="text-[16px] md:text-[18px] text-primary-fixed-dim max-w-2xl">
            Encontrá el repuesto exacto para tu modelo, desde la línea actual
            hasta nuestros grandes clásicos. Asesoramiento técnico directo y
            cotización inmediata por WhatsApp, sin vueltas.
          </p>

          <div className="pt-space-md flex flex-wrap items-center gap-x-space-lg gap-y-space-sm text-[12px] font-heading font-semibold text-primary-fixed-dim">
            <span>✓ Garantía de fábrica Renault</span>
            <span>✓ Envíos a todo el país</span>
            <span>✓ Stock de clásicos y línea vigente</span>
            <span>✓ Mostrador en Mar del Plata</span>
          </div>
        </div>
      </div>
    </section>
  );
}
