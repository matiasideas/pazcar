import { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Eye, Calendar, Gauge, Fuel, ChevronLeft, ChevronRight } from 'lucide-react';

import { Vehiculo } from '@/data/vehiculos';

interface TarjetaVehiculoProps {
  vehiculo: Vehiculo;
}

const TarjetaVehiculo = ({ vehiculo }: TarjetaVehiculoProps) => {
  const [imagenActual, setImagenActual] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Use imagenes array if available, otherwise fallback to single imagen
  const todasLasImagenes = vehiculo.imagenes && vehiculo.imagenes.length > 0 
    ? vehiculo.imagenes 
    : [vehiculo.imagen];
  
  const tieneMultiplesImagenes = todasLasImagenes.length > 1;

  const precioFormateado = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(vehiculo.precio);

  const kilometrajeFormateado = new Intl.NumberFormat('es-AR').format(vehiculo.kilometraje);

  const mensajeWhatsapp = encodeURIComponent(
    `Hola! Me interesa el ${vehiculo.marca} ${vehiculo.modelo} ${vehiculo.año}. ¿Podrían darme más información?`
  );

  const anteriorImagen = useCallback((e?: React.MouseEvent | React.KeyboardEvent) => {
    e?.stopPropagation();
    setImagenActual((prev) => (prev === 0 ? todasLasImagenes.length - 1 : prev - 1));
  }, [todasLasImagenes.length]);

  const siguienteImagen = useCallback((e?: React.MouseEvent | React.KeyboardEvent) => {
    e?.stopPropagation();
    setImagenActual((prev) => (prev === todasLasImagenes.length - 1 ? 0 : prev + 1));
  }, [todasLasImagenes.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFocused || !tieneMultiplesImagenes) return;
      
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
  }, [isFocused, tieneMultiplesImagenes, anteriorImagen, siguienteImagen]);

  return (
    <Card 
      ref={cardRef}
      tabIndex={0}
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={() => setIsFocused(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      className={`group overflow-hidden bg-gradient-card border-border/50 card-hover outline-none focus:ring-2 focus:ring-primary/50 ${
        vehiculo.destacado ? 'featured-glow neon-border' : ''
      }`}
    >
      {/* Image container with carousel */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={todasLasImagenes[imagenActual]}
          alt={`${vehiculo.marca} ${vehiculo.modelo}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        
        {/* Carousel arrows */}
        {tieneMultiplesImagenes && (
          <>
            <button
              onClick={anteriorImagen}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center animate-pulse border border-border/50"
              aria-label="Imagen anterior"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <button
              onClick={siguienteImagen}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center animate-pulse border border-border/50"
              aria-label="Imagen siguiente"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
            
            {/* Dot indicators */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {todasLasImagenes.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setImagenActual(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === imagenActual 
                      ? 'bg-primary w-4' 
                      : 'bg-background/60 hover:bg-background/80'
                  }`}
                  aria-label={`Ver imagen ${index + 1}`}
                />
              ))}
            </div>
            
            {/* Image counter */}
            <div className="absolute bottom-3 right-3 px-2 py-1 rounded-md bg-background/80 backdrop-blur-sm text-xs text-foreground">
              {imagenActual + 1} / {todasLasImagenes.length}
            </div>
          </>
        )}
        
        {/* Badge */}
        {vehiculo.destacado && (
          <Badge className="absolute top-3 right-3 bg-gradient-neon text-primary-foreground border-0">
            Destacado
          </Badge>
        )}
        
        {/* Category badge */}
        <Badge 
          variant="secondary" 
          className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm"
        >
          {vehiculo.categoria}
        </Badge>
      </div>
      
      {/* Content */}
      <CardContent className="p-5 space-y-4">
        <div>
          <h3 className="font-display text-xl font-semibold text-foreground">
            {vehiculo.marca} {vehiculo.modelo}
          </h3>
          <div className="flex flex-wrap items-center gap-3 text-muted-foreground text-sm mt-2">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {vehiculo.año}
            </span>
            <span className="flex items-center gap-1">
              <Gauge className="w-4 h-4" />
              {kilometrajeFormateado} km
            </span>
            <span className="flex items-center gap-1">
              <Fuel className="w-4 h-4" />
              {vehiculo.combustible}
            </span>
          </div>
        </div>
        
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-display font-bold text-white">
            {precioFormateado}
          </span>
        </div>
        
        {/* Actions */}
        <div className="pt-2">
          <Button 
            size="lg" 
            className="w-full bg-[#25D366] hover:bg-[#1da851] text-white font-bold text-base"
            asChild
          >
            <a 
              href={`https://wa.me/5491112345678?text=${mensajeWhatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="w-5 h-5 mr-2" strokeWidth={2.5} />
              Consultar
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TarjetaVehiculo;
