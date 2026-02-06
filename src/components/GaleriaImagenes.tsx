import { useState, useEffect, useCallback } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface GaleriaImagenesProps {
  imagenes: string[];
  imagenInicial: number;
  abierto: boolean;
  onCerrar: () => void;
  titulo?: string;
}

const GaleriaImagenes = ({ 
  imagenes, 
  imagenInicial, 
  abierto, 
  onCerrar,
  titulo 
}: GaleriaImagenesProps) => {
  const [imagenActual, setImagenActual] = useState(imagenInicial);

  useEffect(() => {
    if (abierto) {
      setImagenActual(imagenInicial);
    }
  }, [abierto, imagenInicial]);

  const anteriorImagen = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setImagenActual((prev) => (prev === 0 ? imagenes.length - 1 : prev - 1));
  }, [imagenes.length]);

  const siguienteImagen = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setImagenActual((prev) => (prev === imagenes.length - 1 ? 0 : prev + 1));
  }, [imagenes.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!abierto) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        anteriorImagen();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        siguienteImagen();
      } else if (e.key === 'Escape') {
        onCerrar();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [abierto, anteriorImagen, siguienteImagen, onCerrar]);

  const tieneMultiplesImagenes = imagenes.length > 1;

  return (
    <Dialog open={abierto} onOpenChange={(open) => !open && onCerrar()}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] w-full h-full p-0 bg-black/95 border-none overflow-hidden">
        {/* Close button */}
        <button
          onClick={onCerrar}
          className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center hover:bg-background/40 transition-colors"
          aria-label="Cerrar galería"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        {/* Title */}
        {titulo && (
          <div className="absolute top-4 left-4 z-50 px-4 py-2 rounded-lg bg-background/20 backdrop-blur-sm">
            <span className="text-white font-medium">{titulo}</span>
          </div>
        )}

        {/* Main image container */}
        <div className="relative w-full h-full flex items-center justify-center p-4">
          <img
            src={imagenes[imagenActual]}
            alt={`Imagen ${imagenActual + 1}`}
            className="max-w-full max-h-[80vh] object-contain rounded-lg"
          />

          {/* Navigation arrows */}
          {tieneMultiplesImagenes && (
            <>
              <button
                onClick={anteriorImagen}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center hover:bg-background/40 transition-colors"
                aria-label="Imagen anterior"
              >
                <ChevronLeft className="w-8 h-8 text-white" />
              </button>
              <button
                onClick={siguienteImagen}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center hover:bg-background/40 transition-colors"
                aria-label="Imagen siguiente"
              >
                <ChevronRight className="w-8 h-8 text-white" />
              </button>
            </>
          )}
        </div>

        {/* Thumbnails */}
        {tieneMultiplesImagenes && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 p-2 rounded-lg bg-background/20 backdrop-blur-sm max-w-[90vw] overflow-x-auto">
            {imagenes.map((imagen, index) => (
              <button
                key={index}
                onClick={() => setImagenActual(index)}
                className={`relative flex-shrink-0 w-16 h-12 rounded-md overflow-hidden transition-all ${
                  index === imagenActual 
                    ? 'ring-2 ring-primary opacity-100' 
                    : 'opacity-50 hover:opacity-80'
                }`}
                aria-label={`Ver imagen ${index + 1}`}
              >
                <img
                  src={imagen}
                  alt={`Miniatura ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {/* Image counter */}
        <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-lg bg-background/20 backdrop-blur-sm text-white text-sm">
          {imagenActual + 1} / {imagenes.length}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GaleriaImagenes;
