import { MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react';
import logo from '@/assets/logo-pazcar.png';
import EtiquetaComponente from './EtiquetaComponente';

const PiePagina = () => {
  return (
    <footer className="relative bg-card/50 border-t border-border/50 py-12 px-4">
      <EtiquetaComponente nombre="PiePagina" />
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <img src={logo} alt="PazCar" className="h-8 w-auto" />
            <p className="text-muted-foreground">
              Tu concesionaria de confianza. Vehículos de calidad con la mejor atención.
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-display text-lg font-semibold">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary" />
                <span>José Maria Paz 1373, Castelar</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Phone className="w-5 h-5 text-primary" />
                <a href="tel:+5491112345678" className="hover:text-primary transition-colors">
                  +54 9 11 1234-5678
                </a>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Mail className="w-5 h-5 text-primary" />
                <a href="mailto:info@pazcar.com" className="hover:text-primary transition-colors">
                  info@pazcar.com
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h4 className="font-display text-lg font-semibold">Seguinos</h4>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-muted hover:bg-primary/20 hover:text-primary transition-all"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-muted hover:bg-primary/20 hover:text-primary transition-all"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.mercadolibre.com.ar/pagina/pazcar"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-muted hover:bg-primary/20 hover:text-primary transition-all"
              >
                <svg 
                  className="w-5 h-5" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                >
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.4c5.302 0 9.6 4.298 9.6 9.6s-4.298 9.6-9.6 9.6S2.4 17.302 2.4 12 6.698 2.4 12 2.4zm-.06 3.12c-1.982 0-3.59.482-4.824 1.446-.18.14-.192.402-.024.558l1.08 1.008c.144.132.37.144.528.024.914-.69 2.012-1.034 3.294-1.034 1.26 0 2.268.33 3.024.99.756.66 1.134 1.53 1.134 2.61 0 .96-.282 1.74-.846 2.34-.564.6-1.374 1.08-2.43 1.44-.156.054-.264.198-.264.36v1.38c0 .216.174.39.39.39h1.62c.216 0 .39-.174.39-.39v-.69c1.2-.42 2.16-1.05 2.88-1.89.84-.984 1.26-2.19 1.26-3.618 0-1.668-.558-3-1.674-3.996-1.116-.996-2.646-1.494-4.59-1.494l.052-.034zm-.39 10.8c-.414 0-.75.336-.75.75s.336.75.75.75.75-.336.75-.75-.336-.75-.75-.75z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-border/50 text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} PazCar. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default PiePagina;
