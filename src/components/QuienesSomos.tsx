import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import galeria1 from '@/assets/galeria-1.jpeg';
import galeria2 from '@/assets/galeria-2.jpeg';
import galeria3 from '@/assets/galeria-3.jpeg';
import galeria4 from '@/assets/galeria-4.jpeg';
import galeria5 from '@/assets/galeria-5.jpeg';
import galeria6 from '@/assets/galeria-6.jpeg';

const imagenes = [
  { src: galeria1, alt: 'Showroom PAZCAR - Vista interior' },
  { src: galeria2, alt: 'Showroom PAZCAR - Vehículos de lujo' },
  { src: galeria3, alt: 'Showroom PAZCAR - Área de exhibición' },
  { src: galeria4, alt: 'Showroom PAZCAR - Entrada principal' },
  { src: galeria5, alt: 'PAZCAR - Fachada exterior' },
  { src: galeria6, alt: 'PAZCAR - Vista frontal' },
];

const QuienesSomos = () => {
  const [imagenSeleccionada, setImagenSeleccionada] = useState<number | null>(null);

  const abrirImagen = (index: number) => {
    setImagenSeleccionada(index);
  };

  const cerrarImagen = () => {
    setImagenSeleccionada(null);
  };

  const siguienteImagen = () => {
    if (imagenSeleccionada !== null) {
      setImagenSeleccionada((imagenSeleccionada + 1) % imagenes.length);
    }
  };

  const anteriorImagen = () => {
    if (imagenSeleccionada !== null) {
      setImagenSeleccionada((imagenSeleccionada - 1 + imagenes.length) % imagenes.length);
    }
  };

  return (
    <section id="quienes-somos" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Título y descripción */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Quiénes Somos
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Tu aliado en la búsqueda del vehículo perfecto. Calidad, experiencia y atención personalizada.
          </p>
        </div>

        {/* Galería de fotos */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-semibold text-foreground">Nuestro Showroom</h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {imagenes.map((imagen, index) => (
            <div 
              key={index} 
              className="relative group cursor-pointer overflow-hidden rounded-xl aspect-[4/3]"
              onClick={() => abrirImagen(index)}
            >
              <img 
                src={imagen.src} 
                alt={imagen.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-lg font-medium">Ver imagen</span>
              </div>
            </div>
          ))}
        </div>

        {/* Modal de imagen ampliada */}
        <Dialog open={imagenSeleccionada !== null} onOpenChange={cerrarImagen}>
          <DialogContent className="max-w-5xl p-0 bg-black/95 border-none">
            <button 
              onClick={cerrarImagen}
              className="absolute top-4 right-4 z-50 text-white/70 hover:text-white transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            
            {imagenSeleccionada !== null && (
              <div className="relative flex items-center justify-center min-h-[60vh]">
                <button 
                  onClick={anteriorImagen}
                  className="absolute left-4 z-50 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                >
                  <ChevronLeft className="w-8 h-8 text-white" />
                </button>
                
                <img 
                  src={imagenes[imagenSeleccionada].src} 
                  alt={imagenes[imagenSeleccionada].alt}
                  className="max-h-[80vh] max-w-full object-contain"
                />
                
                <button 
                  onClick={siguienteImagen}
                  className="absolute right-4 z-50 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                >
                  <ChevronRight className="w-8 h-8 text-white" />
                </button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default QuienesSomos;
