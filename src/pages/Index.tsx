import Encabezado from '@/components/Encabezado';
import SeccionPrincipal from '@/components/SeccionPrincipal';
import CatalogoVehiculos from '@/components/CatalogoVehiculos';
import VehiculosDestacados from '@/components/VehiculosDestacados';
import QuienesSomos from '@/components/QuienesSomos';
import PiePagina from '@/components/PiePagina';
import BotonWhatsApp from '@/components/BotonWhatsApp';
import VendeTuAuto from '@/components/VendeTuAuto';

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Encabezado />
      <div className="w-full">
        <img src="/images/banner-pazcar.jpg" alt="Encontrá tu auto en PazCar" className="w-full h-auto block" />
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
