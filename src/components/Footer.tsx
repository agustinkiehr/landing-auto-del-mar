export default function Footer() {
  return (
    <footer className="w-full bg-primary text-primary-fixed-dim">
      <div className="max-w-[1360px] mx-auto px-margin-mobile md:px-margin py-space-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-lg text-[13px]">
        <div className="space-y-1.5">
          <span className="font-heading font-bold text-[16px] text-white uppercase tracking-wide">
            Auto del Mar
          </span>
          <p className="leading-relaxed">
            Concesionaria oficial · Repuestos oficiales Renault
          </p>
        </div>

        <div>
          <h3 className="font-heading font-bold text-[11px] uppercase tracking-widest text-renault-yellow mb-2">
            Horario de atención
          </h3>
          <p className="leading-relaxed">
            Lunes a viernes
            <br />
            08 a 13 hs y 14 a 18 hs
          </p>
          <p className="leading-relaxed mt-1.5">
            Sábados
            <br />
            09 a 13 hs
          </p>
        </div>

        <div>
          <h3 className="font-heading font-bold text-[11px] uppercase tracking-widest text-renault-yellow mb-2">
            Ubicación
          </h3>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Jujuy+2461%2C+Mar+del+Plata"
            target="_blank"
            rel="noopener noreferrer"
            className="leading-relaxed hover:text-white transition-colors underline decoration-dotted underline-offset-2"
          >
            Jujuy 2461
            <br />
            Mar del Plata
          </a>
        </div>

        <div>
          <h3 className="font-heading font-bold text-[11px] uppercase tracking-widest text-renault-yellow mb-2">
            Envíos
          </h3>
          <p className="leading-relaxed">
            A todo el país, con coordinación previa.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-[1360px] mx-auto px-margin-mobile md:px-margin py-space-sm flex flex-col md:flex-row items-center justify-between gap-space-sm text-[11px]">
          <span>© {new Date().getFullYear()} Renault Auto del Mar · Mar del Plata, Argentina</span>
          <span>Repuestos originales y clásicos — consultas por WhatsApp</span>
        </div>
      </div>
    </footer>
  );
}
