import { useState, useEffect, useCallback } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { cn } from '@/lib/utils';

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
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [abierto, anteriorImagen, siguienteImagen]);

  const tieneMultiplesImagenes = imagenes.length > 1;

  return (
    <DialogPrimitive.Root open={abierto} onOpenChange={(open) => !open && onCerrar()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay 
          className="fixed inset-0 z-50 bg-black/90 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        />
        <DialogPrimitive.Content 
          className={cn(
            "fixed inset-0 z-50 flex flex-col items-center justify-center",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
          )}
          onPointerDownOutside={(e) => e.preventDefault()}
        >
          {/* Close button */}
          <DialogPrimitive.Close asChild>
            <button
              className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
              aria-label="Cerrar galería"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </DialogPrimitive.Close>

          {/* Title */}
          {titulo && (
            <div className="absolute top-4 left-4 z-50 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm">
              <DialogPrimitive.Title className="text-white font-medium">
                {titulo}
              </DialogPrimitive.Title>
            </div>
          )}

          {/* Main image container */}
          <div 
            className="relative w-full h-full flex items-center justify-center p-4 pb-24"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={imagenes[imagenActual]}
              alt={`Imagen ${imagenActual + 1}`}
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Navigation arrows */}
            {tieneMultiplesImagenes && (
              <>
                <button
                  onClick={anteriorImagen}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label="Imagen anterior"
                >
                  <ChevronLeft className="w-8 h-8 text-white" />
                </button>
                <button
                  onClick={siguienteImagen}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label="Imagen siguiente"
                >
                  <ChevronRight className="w-8 h-8 text-white" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails */}
          {tieneMultiplesImagenes && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 p-2 rounded-lg bg-white/10 backdrop-blur-sm max-w-[90vw] overflow-x-auto">
              {imagenes.map((imagen, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setImagenActual(index);
                  }}
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
          <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-sm text-white text-sm">
            {imagenActual + 1} / {imagenes.length}
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default GaleriaImagenes;
