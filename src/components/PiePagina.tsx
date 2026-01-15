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
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-4h2v-2h-2v2zm1-10c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 .88-.36 1.29-1.15 2.03-.63.59-1.35 1.27-1.35 2.47h2c0-.55.22-.85.79-1.36C15.19 12.36 16 11.45 16 10c0-2.21-1.79-4-4-4z"/>
                  <path d="M12 2.5c5.25 0 9.5 4.25 9.5 9.5s-4.25 9.5-9.5 9.5S2.5 17.25 2.5 12 6.75 2.5 12 2.5m0-1C6.2 1.5 1.5 6.2 1.5 12S6.2 22.5 12 22.5 22.5 17.8 22.5 12 17.8 1.5 12 1.5z" fill="none"/>
                  <path d="M7.5 10c.28 0 .5-.22.5-.5V8c0-2.21 1.79-4 4-4s4 1.79 4 4v1.5c0 .28.22.5.5.5s.5-.22.5-.5V8c0-2.76-2.24-5-5-5S6 5.24 6 8v1.5c0 .28.22.5.5.5z"/>
                  <path d="M16.5 10h-9c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5h9c.83 0 1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5z" fill="none" stroke="currentColor" strokeWidth="1"/>
                  <circle cx="12" cy="15" r="1.5"/>
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
