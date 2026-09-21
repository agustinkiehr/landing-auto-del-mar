import { buildWhatsappLink } from "@/lib/whatsapp";

export default function Header() {
  const link = buildWhatsappLink({
    nombre: "consulta general",
    codigo: "-",
  });
  return (
    <header className="fixed top-0 w-full z-50 bg-surface-container-lowest/95 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-20 max-w-[1360px] mx-auto px-margin-mobile md:px-margin flex items-center justify-between gap-space-md">
        <a href="#" className="flex items-center gap-space-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-auto-del-mar.png"
            alt="Auto del Mar"
            className="h-11 w-11 object-contain"
          />
          <div className="hidden sm:flex flex-col border-l border-outline-variant/40 pl-space-sm">
            <span className="font-heading text-[15px] tracking-wider font-bold text-primary leading-none">
              RENAULT
            </span>
            <span className="text-[9px] tracking-widest text-on-surface-variant uppercase font-semibold mt-0.5">
              Repuestos Originales · Mar del Plata
            </span>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-space-lg h-full">
          {[
            ["Modelos", "#modelos"],
            ["Categorías", "#categorias"],
            ["Catálogo", "#catalogo-de-piezas"],
          ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="text-[13px] font-heading font-semibold text-on-surface-variant hover:text-primary transition-colors py-2"
            >
              {label}
            </a>
          ))}
        </nav>

        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-whatsapp-green text-white px-3.5 py-2 rounded-lg font-heading font-bold text-[12px] uppercase tracking-wide hover:opacity-95 transition-opacity shadow-[0_4px_12px_rgba(37,211,102,0.25)]"
        >
          WhatsApp
        </a>
      </div>
    </header>
  );
}
