import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, MessageCircle } from 'lucide-react';
import logo from '@/assets/logo-pazcar.png';
import EtiquetaComponente from './EtiquetaComponente';

const enlacesIzquierda = [
  { label: 'Encontrá tu Auto', href: '#catalogo' },
  { label: 'Destacados', href: '#destacados' },
];

const enlacesDerecha = [
  { label: 'Quiénes Somos', href: '#quienes-somos' },
  { label: 'Contacto', href: '#footer' },
];

const todosEnlaces = [...enlacesIzquierda, ...enlacesDerecha];

const Encabezado = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const scrollASeccion = (href: string) => {
    setMenuAbierto(false);
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <EtiquetaComponente nombre="Encabezado" posicion="derecha" />
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between h-16">
          {/* Mobile logo (left on small screens) */}
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); scrollASeccion('#'); }}
            className="flex md:hidden items-center group"
          >
            <img 
              src={logo} 
              alt="PazCar" 
              className="h-8 w-auto transition-transform group-hover:scale-105"
            />
          </a>

          {/* Left nav */}
          <nav className="hidden md:flex items-center gap-1 flex-1 justify-end">
            {enlacesIzquierda.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollASeccion(link.href); }}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/50"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Centered Logo */}
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); scrollASeccion('#'); }}
            className="hidden md:flex items-center group mx-6"
          >
            <img 
              src={logo} 
              alt="PazCar" 
              className="h-8 w-auto transition-transform group-hover:scale-105"
            />
          </a>

          {/* Right nav + CTA */}
          <div className="hidden md:flex items-center gap-1 flex-1 justify-start">
            {enlacesDerecha.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollASeccion(link.href); }}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/50"
              >
                {link.label}
              </a>
            ))}
            <div className="ml-3">
            <Button 
              size="sm" 
              className="bg-[#25D366] hover:bg-[#1da851] text-white"
              asChild
            >
              <a 
                href="https://wa.me/5491133095902?text=Hola!%20Quiero%20consultar%20sobre%20un%20vehículo"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-4 h-4 mr-1" />
                WhatsApp
              </a>
            </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuAbierto(!menuAbierto)}
            className="md:hidden p-2 rounded-lg hover:bg-muted/50 transition-colors"
            aria-label="Toggle menu"
          >
            {menuAbierto ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuAbierto && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-b border-border/50 animate-fade-in">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {todosEnlaces.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollASeccion(link.href); }}
                className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/50"
              >
                {link.label}
              </a>
            ))}
            <Button 
              size="sm" 
              className="mt-2 bg-[#25D366] hover:bg-[#1da851] text-white"
              asChild
            >
              <a 
                href="https://wa.me/5491133095902?text=Hola!%20Quiero%20consultar%20sobre%20un%20vehículo"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-4 h-4 mr-1" />
                WhatsApp
              </a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Encabezado;
