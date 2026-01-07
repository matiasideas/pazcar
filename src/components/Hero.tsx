import { Button } from '@/components/ui/button';
import { Car, MessageCircle } from 'lucide-react';
import StarField from './StarField';
import logo from '@/assets/logo-pazcar.png';

const Hero = () => {
  const scrollToCatalog = () => {
    document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Starfield background */}
      <StarField />
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/5 via-transparent to-neon-purple/5 pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Logo/Brand */}
          <div className="inline-block mb-4">
            <img src={logo} alt="PazCar" className="h-12 sm:h-16 w-auto mx-auto" />
          </div>
          
          {/* Main heading */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
            Encontrá tu próximo auto en{' '}
            <span className="gradient-text">PazCar</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Catálogo completo, precios justos y atención personalizada. 
            Tu vehículo ideal te está esperando.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button 
              size="lg" 
              onClick={scrollToCatalog}
              className="w-full sm:w-auto text-lg px-8 py-6 bg-gradient-neon hover:opacity-90 transition-opacity"
            >
              <Car className="w-5 h-5 mr-2" />
              Ver Autos
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
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
            <div className="w-1 h-2 rounded-full bg-primary animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
