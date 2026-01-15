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
                <a href="https://wa.me/5491133095902?text=Hola!%20Quiero%20consultar%20sobre%20un%20vehículo" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  +54 9 11-3309-5902
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
