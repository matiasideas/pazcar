import Hero from '@/components/Hero';
import VehicleCatalog from '@/components/VehicleCatalog';
import FeaturedVehicles from '@/components/FeaturedVehicles';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <FeaturedVehicles />
      <VehicleCatalog />
      <Footer />
      <WhatsAppButton />
    </main>
  );
};

export default Index;
