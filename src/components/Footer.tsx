export default function Footer() {
  return (
    <footer className="w-full bg-primary text-primary-fixed-dim py-space-lg">
      <div className="max-w-[1360px] mx-auto px-margin-mobile md:px-margin flex flex-col md:flex-row items-center justify-between gap-space-sm text-[12px]">
        <span>© {new Date().getFullYear()} Renault Auto del Mar · Mar del Plata, Argentina</span>
        <span>Repuestos originales y clásicos — consultas por WhatsApp</span>
      </div>
    </footer>
  );
}
