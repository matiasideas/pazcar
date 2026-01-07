import Encabezado from '@/components/Encabezado';
import SeccionPrincipal from '@/components/SeccionPrincipal';
import CatalogoVehiculos from '@/components/CatalogoVehiculos';
import VehiculosDestacados from '@/components/VehiculosDestacados';
import QuienesSomos from '@/components/QuienesSomos';
import PiePagina from '@/components/PiePagina';
import BotonWhatsApp from '@/components/BotonWhatsApp';

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Encabezado />
      <SeccionPrincipal />
      <div id="destacados">
        <VehiculosDestacados />
      </div>
      <CatalogoVehiculos />
      <QuienesSomos />
      <div id="footer">
        <PiePagina />
      </div>
      <BotonWhatsApp />
    </main>
  );
};

export default Index;
