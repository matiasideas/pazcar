import Header from '@/components/Header';
import Hero from '@/components/Hero';
import VehicleCatalog from '@/components/VehicleCatalog';
import FeaturedVehicles from '@/components/FeaturedVehicles';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <div id="destacados">
        <FeaturedVehicles />
      </div>
      <VehicleCatalog />
      <div id="footer">
        <Footer />
      </div>
      <WhatsAppButton />
    </main>
  );
};

export default Index;
