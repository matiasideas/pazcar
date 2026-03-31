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
      <div className="w-full h-[300px] md:h-[400px] overflow-hidden relative">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform"
          style={{
            backgroundImage: 'url(/images/banner-pazcar.jpg)',
            backgroundAttachment: 'fixed',
          }}
        />
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
