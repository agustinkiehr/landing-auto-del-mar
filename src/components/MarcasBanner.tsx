export default function MarcasBanner() {
  return (
    <section className="relative w-full h-[420px] sm:h-[480px] lg:h-[580px] overflow-hidden bg-black">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/banner-renault-motrio-bg.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-black/30" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-margin-mobile md:px-margin">
        <span className="text-[10px] md:text-[12px] font-heading font-bold uppercase tracking-[0.2em] text-renault-yellow mb-2 md:mb-3">
          Disponibilidad garantizada
        </span>

        <h2 className="font-heading font-bold uppercase leading-[1.08] text-[26px] sm:text-[38px] md:text-[52px] max-w-4xl">
          <span className="text-white">Dos líneas de repuestos</span>
          <br />
          <span className="text-renault-yellow">originales para tu Renault</span>
        </h2>

        <p className="mt-3 md:mt-4 text-[13px] sm:text-[15px] md:text-[17px] text-white/80 max-w-xl">
          Piezas 100% Renault y la calidad accesible de Motrio, todo en un
          mismo lugar.
        </p>

        <div className="mt-6 md:mt-9 flex items-center gap-4 sm:gap-6 md:gap-8">
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/renault-logo-white.png"
              alt="Renault"
              className="h-8 sm:h-10 md:h-12 w-auto object-contain"
            />
            <div className="text-left">
              <div className="font-heading font-bold text-[14px] sm:text-[18px] md:text-[22px] text-white leading-none">
                RENAULT
              </div>
              <div className="text-[9px] sm:text-[11px] md:text-[12px] text-white/70 leading-tight mt-0.5 hidden sm:block">
                Repuestos originales de fábrica
              </div>
            </div>
          </div>

          <span className="font-heading font-bold text-[20px] sm:text-[28px] md:text-[32px] text-renault-yellow">
            +
          </span>

          <div className="text-left">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/motrio-badge.png"
              alt="Motrio"
              className="h-7 sm:h-9 md:h-11 w-auto object-contain rounded"
            />
            <div className="text-[9px] sm:text-[11px] md:text-[12px] text-white/70 leading-tight mt-1 hidden sm:block">
              Calidad multimarca, precio accesible
            </div>
          </div>
        </div>

        <span className="mt-7 md:mt-10 text-[10px] sm:text-[11px] md:text-[12px] font-heading font-bold uppercase tracking-[0.15em] text-renault-yellow">
          Consultá stock y precios por WhatsApp
        </span>
      </div>
    </section>
  );
}
