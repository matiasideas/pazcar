import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, ChevronDown } from 'lucide-react';
import fondoShowroom from '@/assets/fondo-showroom.jpeg';

interface AlternativaFondo {
  id: number;
  nombre: string;
  descripcion: string;
  estilos: React.CSSProperties;
  overlays: React.ReactNode;
}

const alternativas: AlternativaFondo[] = [
  {
    id: 1,
    nombre: "Clásico Oscuro",
    descripcion: "Overlay negro al 70% para máxima legibilidad",
    estilos: { filter: 'none' },
    overlays: <div className="absolute inset-0 bg-black/70" />
  },
  {
    id: 2,
    nombre: "Blur Elegante",
    descripcion: "Desenfoque suave con overlay oscuro",
    estilos: { filter: 'blur(8px)', transform: 'scale(1.1)' },
    overlays: <div className="absolute inset-0 bg-black/50" />
  },
  {
    id: 3,
    nombre: "Gradiente Cyan",
    descripcion: "Degradado con el color principal de la marca",
    estilos: { filter: 'none' },
    overlays: (
      <>
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/80 via-black/60 to-black/80" />
      </>
    )
  },
  {
    id: 4,
    nombre: "Gradiente Púrpura",
    descripcion: "Degradado con el color secundario de la marca",
    estilos: { filter: 'none' },
    overlays: (
      <>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-black/60 to-black/80" />
      </>
    )
  },
  {
    id: 5,
    nombre: "Duotono Neon",
    descripcion: "Efecto bicolor cyan y púrpura",
    estilos: { filter: 'grayscale(100%) contrast(1.1)' },
    overlays: (
      <>
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/40 to-purple-500/40 mix-blend-overlay" />
        <div className="absolute inset-0 bg-black/40" />
      </>
    )
  },
  {
    id: 6,
    nombre: "Viñeta Dramática",
    descripcion: "Bordes muy oscuros, centro visible",
    estilos: { filter: 'none' },
    overlays: (
      <>
        <div className="absolute inset-0 bg-black/30" />
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 20%, black 100%)'
          }}
        />
      </>
    )
  },
  {
    id: 7,
    nombre: "Vintage",
    descripcion: "Sepia con tono cálido",
    estilos: { filter: 'sepia(60%) brightness(0.8)' },
    overlays: <div className="absolute inset-0 bg-black/40" />
  },
  {
    id: 8,
    nombre: "Alto Contraste",
    descripcion: "Blanco y negro con contraste fuerte",
    estilos: { filter: 'grayscale(100%) contrast(1.3) brightness(0.9)' },
    overlays: <div className="absolute inset-0 bg-black/50" />
  },
  {
    id: 9,
    nombre: "Gradiente Vertical",
    descripcion: "Degradado de arriba hacia abajo",
    estilos: { filter: 'none' },
    overlays: (
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />
    )
  },
  {
    id: 10,
    nombre: "Neon Glow",
    descripcion: "Efecto resplandor con colores de marca",
    estilos: { filter: 'brightness(0.6) saturate(1.3)' },
    overlays: (
      <>
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-transparent to-purple-500/20" />
        <div className="absolute inset-0 bg-gradient-to-bl from-purple-500/20 via-transparent to-cyan-500/20" />
        <div className="absolute inset-0 bg-black/30" />
      </>
    )
  },
];

const Fondo = () => {
  const [seleccionada, setSeleccionada] = useState<number | null>(null);

  const scrollToNext = (currentId: number) => {
    const nextSection = document.getElementById(`fondo-${currentId + 1}`);
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-background">
      {/* Navigation */}
      <div className="fixed top-4 left-4 z-50">
        <Button variant="outline" className="backdrop-blur-md bg-background/80" asChild>
          <a href="/">← Volver al inicio</a>
        </Button>
      </div>

      {/* Fixed selection indicator */}
      {seleccionada && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
          <div className="bg-card/95 backdrop-blur-md border border-border rounded-full px-6 py-3 shadow-xl flex items-center gap-4">
            <span className="text-foreground">
              Seleccionaste: <strong className="text-primary">{alternativas.find(a => a.id === seleccionada)?.nombre}</strong>
            </span>
            <Button className="bg-gradient-neon">
              Aplicar este estilo
            </Button>
          </div>
        </div>
      )}

      {/* Thumbnails navigation */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-2">
        {alternativas.map((alt) => (
          <button
            key={alt.id}
            onClick={() => document.getElementById(`fondo-${alt.id}`)?.scrollIntoView({ behavior: 'smooth' })}
            className={`w-3 h-3 rounded-full transition-all ${
              seleccionada === alt.id 
                ? 'bg-primary scale-125' 
                : 'bg-white/30 hover:bg-white/60'
            }`}
            title={alt.nombre}
          />
        ))}
      </div>

      {/* Full screen sections */}
      {alternativas.map((alt, index) => (
        <section
          key={alt.id}
          id={`fondo-${alt.id}`}
          className="relative min-h-screen flex items-center justify-center overflow-hidden cursor-pointer"
          onClick={() => setSeleccionada(alt.id)}
        >
          {/* Background image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ 
              backgroundImage: `url(${fondoShowroom})`,
              ...alt.estilos
            }}
          />
          
          {/* Overlays */}
          {alt.overlays}
          
          {/* Content - similar to SeccionPrincipal */}
          <div className="relative z-10 container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Badge */}
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
                seleccionada === alt.id 
                  ? 'border-primary bg-primary/20' 
                  : 'border-white/30 bg-white/10'
              }`}>
                <span className="text-sm font-bold text-white">#{alt.id}</span>
                <span className="text-sm font-medium text-white">{alt.nombre}</span>
                {seleccionada === alt.id && <Check className="w-4 h-4 text-primary" />}
              </div>

              {/* Main heading */}
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white drop-shadow-2xl">
                Encontrá tu próximo
                <br />
                auto en <span className="gradient-text">PazCar</span>
              </h1>
              
              {/* Subtitle */}
              <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto drop-shadow-lg">
                Catálogo interactivo, autos seleccionados y atención personalizada.
                <br />
                Tu vehículo ideal te está esperando!
              </p>
              
              {/* Description */}
              <p className="text-white/60 text-sm">
                {alt.descripcion}
              </p>

              {/* Sample buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Button 
                  size="lg" 
                  className="text-lg px-8 py-6 bg-gradient-neon hover:opacity-90 transition-opacity shadow-lg"
                >
                  Ver Autos
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="text-lg px-8 py-6 border-white/50 text-white hover:bg-white/10 backdrop-blur-sm"
                >
                  Quiénes Somos
                </Button>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          {index < alternativas.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                scrollToNext(alt.id);
              }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-colors animate-bounce"
            >
              <ChevronDown className="w-8 h-8" />
            </button>
          )}
        </section>
      ))}
    </div>
  );
};

export default Fondo;
