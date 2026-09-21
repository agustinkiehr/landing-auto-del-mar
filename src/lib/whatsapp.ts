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
