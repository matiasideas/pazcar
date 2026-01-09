import { Button } from '@/components/ui/button';
import { Car, MessageCircle, Users } from 'lucide-react';
import EtiquetaComponente from './EtiquetaComponente';
import fondoShowroom from '@/assets/fondo-showroom.jpeg';

const SeccionPrincipal = () => {
  const scrollACatalogo = () => {
    document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollAQuienesSomos = () => {
    document.getElementById('quienes-somos')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <EtiquetaComponente nombre="SeccionPrincipal" />
      
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${fondoShowroom})` }}
      />
      
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-background/70" />
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/5 via-transparent to-neon-purple/5 pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Main heading */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
            Encontrá tu próximo
            <br />
            auto en <span className="gradient-text">PazCar</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Catálogo interactivo, autos seleccionados y atención personalizada.
            <br />
            Tu vehículo ideal te está esperando!
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button 
              size="lg" 
              onClick={scrollACatalogo}
              className="w-full sm:w-auto text-lg px-8 py-6 bg-gradient-neon hover:opacity-90 transition-opacity"
            >
              <Car className="w-5 h-5 mr-2" />
              Ver Autos
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={scrollAQuienesSomos}
              className="w-full sm:w-auto text-lg px-8 py-6 border-primary/50 hover:bg-primary/10 hover:border-primary"
            >
              <Users className="w-5 h-5 mr-2" />
              Quiénes Somos
            </Button>
            <Button
              size="lg" 
              variant="outline"
              className="w-full sm:w-auto text-lg px-8 py-6 border-primary/50 hover:bg-primary/10 hover:border-primary"
              asChild
            >
              <a 
                href="https://wa.me/5491112345678?text=Hola!%20Quiero%20consultar%20sobre%20un%20vehículo" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Consultar por WhatsApp
              </a>
            </Button>
          </div>

          {/* Características */}
          <div className="flex flex-wrap justify-center gap-4 pt-6">
            <div className="flex items-center gap-3 px-4 py-2 bg-card/80 backdrop-blur-sm rounded-lg border border-border/50">
              <span className="text-xl">🏆</span>
              <div className="text-left">
                <h3 className="font-semibold text-foreground text-sm">Experiencia</h3>
                <p className="text-muted-foreground text-xs">Años en el mercado</p>
              </div>
            </div>
            <div className="flex items-center gap-3 px-4 py-2 bg-card/80 backdrop-blur-sm rounded-lg border border-border/50">
              <span className="text-xl">✨</span>
              <div className="text-left">
                <h3 className="font-semibold text-foreground text-sm">Calidad</h3>
                <p className="text-muted-foreground text-xs">Vehículos revisados</p>
              </div>
            </div>
            <div className="flex items-center gap-3 px-4 py-2 bg-card/80 backdrop-blur-sm rounded-lg border border-border/50">
              <span className="text-xl">🤝</span>
              <div className="text-left">
                <h3 className="font-semibold text-foreground text-sm">Confianza</h3>
                <p className="text-muted-foreground text-xs">Atención transparente</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeccionPrincipal;
