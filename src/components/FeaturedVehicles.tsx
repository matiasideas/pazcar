import VehicleCard, { Vehicle } from './VehicleCard';
import { Sparkles } from 'lucide-react';

const featuredVehicles: Vehicle[] = [
  { id: 'f1', marca: 'Toyota', modelo: 'RAV4', año: 2024, precio: 45000, imagen: 'https://images.unsplash.com/photo-1568844293986-8c0b3e7f8d7c?w=600&h=400&fit=crop', categoria: 'SUV', destacado: true },
  { id: 'f2', marca: 'Toyota', modelo: 'Hilux', año: 2024, precio: 52000, imagen: 'https://images.unsplash.com/photo-1559416523-140ddc3d238c?w=600&h=400&fit=crop', categoria: 'Camionetas', destacado: true },
  { id: 'f3', marca: 'Honda', modelo: 'Civic', año: 2023, precio: 32000, imagen: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=600&h=400&fit=crop', categoria: 'Sedanes', destacado: true },
];

const FeaturedVehicles = () => {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-7xl relative">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Selección Especial</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Destacados del <span className="gradient-text">Mes</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Nuestras mejores ofertas y vehículos más buscados. No te los pierdas.
          </p>
        </div>

        {/* Featured grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredVehicles.map((vehicle, index) => (
            <div
              key={vehicle.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <VehicleCard vehicle={vehicle} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedVehicles;
