function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.5 21v-7.6h2.55l.38-2.96h-2.93V8.56c0-.86.24-1.44 1.47-1.44h1.57V4.47C16.2 4.4 15.32 4.33 14.28 4.33c-2.17 0-3.66 1.32-3.66 3.75v2.36H8.06v2.96h2.56V21h2.88Z" />
    </svg>
  );
}

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
          <div className="flex items-center gap-2 pt-1.5">
            <a
              href="https://www.instagram.com/autodelmarrenault/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white transition-all duration-200 hover:bg-renault-yellow hover:text-primary hover:scale-110 active:scale-95"
            >
              <InstagramIcon />
            </a>
            <a
              href="https://www.facebook.com/renaultautodelmarsa"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white transition-all duration-200 hover:bg-renault-yellow hover:text-primary hover:scale-110 active:scale-95"
            >
              <FacebookIcon />
            </a>
          </div>
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
            href="https://maps.app.goo.gl/uJ7UggaQcq9e9nub8"
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
