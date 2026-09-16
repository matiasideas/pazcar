// Resuelve el nombre de archivo de una foto a su URL:
// - Las fotos cargadas en el bundle (src/assets) se resuelven al asset compilado.
// - Las fotos subidas desde el panel (bucket "vehiculos") se sirven por la
//   función pública del servidor, porque el bucket es privado.

const assets = import.meta.glob('../assets/*.webp', { eager: true, import: 'default' }) as Record<string, string>;

const esRutaDeStorage = (archivo: string) => archivo.includes('/');

export function urlImagen(archivo: string | null | undefined): string {
  if (!archivo) return '';
  if (esRutaDeStorage(archivo)) {
    return `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-vehiculos?action=imagen&ruta=${encodeURIComponent(archivo)}`;
  }
  const key = `../assets/${archivo}`;
  if (assets[key]) return assets[key];
  // Fallback: quizá fue subida sin carpeta
  return `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-vehiculos?action=imagen&ruta=${encodeURIComponent(archivo)}`;
}
