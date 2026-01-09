import TarjetaVehiculo, { Vehiculo } from './TarjetaVehiculo';
import { Sparkles } from 'lucide-react';
import EtiquetaComponente from './EtiquetaComponente';
import ram1500Image1 from '@/assets/ram-1500.webp';
import ram1500Image2 from '@/assets/ram-1500-2.webp';
import ram1500Image3 from '@/assets/ram-1500-3.webp';
import ram1500Image4 from '@/assets/ram-1500-4.webp';
import ram1500Image5 from '@/assets/ram-1500-5.webp';
import ram1500Image6 from '@/assets/ram-1500-6.webp';
import ram1500Image7 from '@/assets/ram-1500-7.webp';
import ram1500Image8 from '@/assets/ram-1500-8.webp';
import ram1500Image9 from '@/assets/ram-1500-9.webp';
import ram1500Image10 from '@/assets/ram-1500-10.webp';
import ram1500Image11 from '@/assets/ram-1500-11.webp';
import nissanKicks1 from '@/assets/nissan-kicks-1.webp';
import nissanKicks2 from '@/assets/nissan-kicks-2.webp';
import nissanKicks3 from '@/assets/nissan-kicks-3.webp';
import nissanKicks4 from '@/assets/nissan-kicks-4.webp';
import nissanKicks5 from '@/assets/nissan-kicks-5.webp';
import nissanKicks6 from '@/assets/nissan-kicks-6.webp';
import nissanKicks7 from '@/assets/nissan-kicks-7.webp';
import nissanKicks8 from '@/assets/nissan-kicks-8.webp';
import nissanKicks9 from '@/assets/nissan-kicks-9.webp';
import nissanKicks10 from '@/assets/nissan-kicks-10.webp';
import nissanKicks11 from '@/assets/nissan-kicks-11.webp';
import nissanKicks12 from '@/assets/nissan-kicks-12.webp';
import nissanKicks13 from '@/assets/nissan-kicks-13.webp';
import nissanKicks14 from '@/assets/nissan-kicks-14.webp';
import nissanKicks15 from '@/assets/nissan-kicks-15.webp';
import nissanKicks16 from '@/assets/nissan-kicks-16.webp';
import nissanKicks17 from '@/assets/nissan-kicks-17.webp';
import nissanKicks18 from '@/assets/nissan-kicks-18.webp';
import nissanKicks19 from '@/assets/nissan-kicks-19.webp';

const ramImagenes = [
  ram1500Image1,
  ram1500Image2,
  ram1500Image3,
  ram1500Image4,
  ram1500Image5,
  ram1500Image6,
  ram1500Image7,
  ram1500Image8,
  ram1500Image9,
  ram1500Image10,
  ram1500Image11,
];

const nissanImagenes = [
  nissanKicks1,
  nissanKicks2,
  nissanKicks3,
  nissanKicks4,
  nissanKicks5,
  nissanKicks6,
  nissanKicks7,
  nissanKicks8,
  nissanKicks9,
  nissanKicks10,
  nissanKicks11,
  nissanKicks12,
  nissanKicks13,
  nissanKicks14,
  nissanKicks15,
  nissanKicks16,
  nissanKicks17,
  nissanKicks18,
  nissanKicks19,
];

const vehiculosDestacados: Vehiculo[] = [
  { id: 'f1', marca: 'RAM', modelo: '1500 5.7 Laramie Atx V8', año: 2015, kilometraje: 152000, combustible: 'Nafta', precio: 35200, imagen: ram1500Image1, imagenes: ramImagenes, categoria: 'Camionetas', destacado: true },
  { id: 'f2', marca: 'Nissan', modelo: 'Kicks 1.6 Advance Cvt', año: 2021, kilometraje: 67000, combustible: 'Nafta', precio: 19990, imagen: nissanKicks1, imagenes: nissanImagenes, categoria: 'SUV', destacado: true },
  { id: 'f3', marca: 'Honda', modelo: 'Civic', año: 2023, kilometraje: 12000, combustible: 'Nafta', precio: 32000, imagen: 'https://images.pexels.com/photos/3752169/pexels-photo-3752169.jpeg?auto=compress&cs=tinysrgb&w=600', categoria: 'Sedanes', destacado: true },
];

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
