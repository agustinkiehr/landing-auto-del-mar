# Landing Auto del Mar — Catálogo de Repuestos Renault

## Stack
- Next.js 16 (App Router) + TypeScript + Tailwind v4
- Supabase (proyecto: `landing auto del mar`, región São Paulo) como base de datos del catálogo
- Deploy pensado para Vercel

## Variables de entorno
Copiá `.env.example` a `.env.local` y completá:

```
NEXT_PUBLIC_SUPABASE_URL=https://eczybsexwjobzcpgzesy.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon key del proyecto>
NEXT_PUBLIC_WHATSAPP_NUMBER=<numero de WhatsApp de posventa, formato 549XXXXXXXXXX>
```

⚠️ **Importante:** `NEXT_PUBLIC_WHATSAPP_NUMBER` hoy tiene un número de ejemplo
(`5492260000000`). Reemplazalo por el número real del equipo de posventa antes
de publicar — si no, los botones de "Consultar por WhatsApp" van a abrir un
chat que no existe.

## Cargar datos
Las tablas `modelos` y `repuestos` (+ `repuestos_modelos` para la relación
muchos-a-muchos) ya están creadas en Supabase. Para cargar o editar productos:

1. Entrá al dashboard de Supabase → Table Editor → proyecto "landing auto del mar"
2. Ahí se edita como una planilla: agregar fila, completar nombre/código/categoría/
   estado (`vigente` o `clasico`)/foto_url, y vincular modelos en `repuestos_modelos`
3. Los cambios aparecen en la landing sin redeploy (revalidación cada 60s)

## Desarrollo local
```
npm install
npm run dev
```

## Deploy en Vercel
1. Subir este proyecto a un repo de GitHub
2. En vercel.com → "Add New Project" → importar el repo
3. Cargar las 3 variables de entorno de arriba en la configuración del proyecto
4. Deploy — Vercel detecta Next.js automáticamente, no hace falta configurar nada más

## Pendiente conocido
- Las fotos de productos en `foto_url` están usando por ahora URLs temporales
  de Google (de la exportación de Stitch). Hay que resubirlas a un storage
  propio (Supabase Storage o similar) antes de producción — no lo pude hacer
  desde este entorno por restricciones de red, pero se puede subir manualmente
  vía el dashboard de Supabase (Storage → crear bucket público → arrastrar
  las fotos → pegar la URL pública en `foto_url` de cada repuesto).
