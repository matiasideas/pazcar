import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
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
    estilos: { filter: 'blur(8px)' },
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

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Alternativas de <span className="gradient-text">Fondo</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Seleccioná el estilo que más te guste para la sección principal
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {alternativas.map((alt) => (
            <div
              key={alt.id}
              className={`group relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${
                seleccionada === alt.id 
                  ? 'ring-4 ring-primary scale-[1.02]' 
                  : 'hover:scale-[1.02]'
              }`}
              onClick={() => setSeleccionada(alt.id)}
            >
              {/* Preview */}
              <div className="relative aspect-video">
                {/* Background image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ 
                    backgroundImage: `url(${fondoShowroom})`,
                    ...alt.estilos
                  }}
                />
                
                {/* Overlays */}
                {alt.overlays}
                
                {/* Sample content */}
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <div className="text-center">
                    <h3 className="font-display text-xl md:text-2xl font-bold text-white drop-shadow-lg">
                      Encontrá tu próximo
                    </h3>
                    <p className="text-lg md:text-xl font-bold text-white drop-shadow-lg">
                      auto en <span className="text-cyan-400">PazCar</span>
                    </p>
                  </div>
                </div>

                {/* Selection indicator */}
                {seleccionada === alt.id && (
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <Check className="w-5 h-5 text-primary-foreground" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-4 bg-card border-t border-border">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-bold text-primary">#{alt.id}</span>
                  <h4 className="font-semibold text-foreground">{alt.nombre}</h4>
                </div>
                <p className="text-sm text-muted-foreground">{alt.descripcion}</p>
              </div>
            </div>
          ))}
        </div>

        {seleccionada && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
            <div className="bg-card border border-border rounded-full px-6 py-3 shadow-xl flex items-center gap-4">
              <span className="text-foreground">
                Seleccionaste: <strong>{alternativas.find(a => a.id === seleccionada)?.nombre}</strong>
              </span>
              <Button className="bg-gradient-neon">
                Aplicar este estilo
              </Button>
            </div>
          </div>
        )}

        <div className="mt-12 text-center">
          <Button variant="outline" asChild>
            <a href="/">← Volver al inicio</a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Fondo;
