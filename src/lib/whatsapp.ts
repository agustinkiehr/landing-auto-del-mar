// Número de WhatsApp del equipo de posventa, en formato internacional sin signos.
// Reemplazar por el número real antes de publicar (ver README.md).
export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5492260000000";

export function buildWhatsappLink(params: {
  nombre: string;
  codigo: string;
}) {
  const texto = `Hola! Quería consultar por el repuesto: ${params.nombre} (código ${params.codigo}). ¿Tienen stock?`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`;
}

export function buildWhatsappSolicitudLink(params: {
  busqueda: string;
  detalle?: string;
}) {
  const partes = [
    `Hola! Busqué "${params.busqueda}" en la web de Auto del Mar y no lo encontré en el catálogo.`,
    params.detalle?.trim()
      ? `Detalle: ${params.detalle.trim()}`
      : null,
    `¿Podrían conseguirlo en la terminal de Renault Argentina?`,
  ].filter(Boolean);
  const texto = partes.join(" ");
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`;
}
