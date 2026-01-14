import { MessageCircle } from 'lucide-react';
import EtiquetaComponente from './EtiquetaComponente';

const BotonWhatsApp = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <EtiquetaComponente nombre="BotonWhatsApp" />
      <a
        href="https://wa.me/5491154271426?text=Hola!%20Quiero%20consultar%20sobre%20un%20vehículo"
        target="_blank"
        rel="noopener noreferrer"
        className="block group mt-10"
        aria-label="Contactar por WhatsApp"
      >
        <div className="relative">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-green-500 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
          
          {/* Button */}
          <div className="relative flex items-center justify-center w-14 h-14 bg-green-500 rounded-full shadow-lg whatsapp-float group-hover:scale-110 transition-transform">
            <MessageCircle className="w-7 h-7 text-white" />
          </div>
          
          {/* Tooltip */}
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-2 bg-card rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            <span className="text-sm font-medium">¿Tenés consultas?</span>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 border-8 border-transparent border-l-card" />
          </div>
        </div>
      </a>
    </div>
  );
};

export default BotonWhatsApp;
