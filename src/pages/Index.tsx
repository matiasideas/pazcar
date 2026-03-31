import { useState, useEffect } from 'react';
import Encabezado from '@/components/Encabezado';
import SeccionPrincipal from '@/components/SeccionPrincipal';
import CatalogoVehiculos from '@/components/CatalogoVehiculos';
import VehiculosDestacados from '@/components/VehiculosDestacados';
import QuienesSomos from '@/components/QuienesSomos';
import PiePagina from '@/components/PiePagina';
import BotonWhatsApp from '@/components/BotonWhatsApp';
import VendeTuAuto from '@/components/VendeTuAuto';

const banners = [
  '/images/banner-pazcar.jpg',
  '/images/banner-vende.png',
];

const Index = () => {
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-background pt-16">
      <Encabezado />
      <div className="w-full h-[200px] md:h-[500px] lg:h-[600px] overflow-hidden relative">
        {banners.map((src, i) => (
          <div
            key={src}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
              i === currentBanner ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${src})`,
              backgroundAttachment: 'fixed',
            }}
          />
        ))}
        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentBanner(i)}
              className={`w-3 h-3 rounded-full transition-all ${
                i === currentBanner ? 'bg-white scale-110' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
      <SeccionPrincipal />
      <div id="destacados">
        <VehiculosDestacados />
      </div>
      <CatalogoVehiculos />
      <VendeTuAuto />
      <QuienesSomos />
      <div id="footer">
        <PiePagina />
      </div>
      <BotonWhatsApp />
    </main>
  );
};

export default Index;
