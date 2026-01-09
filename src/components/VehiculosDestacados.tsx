import TarjetaVehiculo from './TarjetaVehiculo';
import { Sparkles } from 'lucide-react';
import EtiquetaComponente from './EtiquetaComponente';
import { vehiculosDestacados } from '@/data/vehiculos';

const VehiculosDestacados = () => {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      <EtiquetaComponente nombre="VehiculosDestacados" />
      
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
          {vehiculosDestacados.map((vehiculo, index) => (
            <div
              key={vehiculo.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <TarjetaVehiculo vehiculo={vehiculo} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VehiculosDestacados;
