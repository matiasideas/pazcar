import { useState, useMemo } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import TarjetaVehiculo, { Vehiculo } from './TarjetaVehiculo';
import EtiquetaComponente from './EtiquetaComponente';

const datosVehiculos: Vehiculo[] = [
  // Compactos
  { id: '1', marca: 'Toyota', modelo: 'Yaris', año: 2023, kilometraje: 15000, combustible: 'Nafta', precio: 18500, imagen: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=600', categoria: 'Compactos' },
  { id: '2', marca: 'Volkswagen', modelo: 'Polo', año: 2022, kilometraje: 28000, combustible: 'Nafta', precio: 17800, imagen: 'https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg?auto=compress&cs=tinysrgb&w=600', categoria: 'Compactos' },
  { id: '3', marca: 'Ford', modelo: 'Fiesta', año: 2023, kilometraje: 8500, combustible: 'Nafta', precio: 16500, imagen: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=600', categoria: 'Compactos', destacado: true },
  
  // SUV
  { id: '4', marca: 'RAM', modelo: '1500 5.7 Laramie Atx V8', año: 2015, kilometraje: 152000, combustible: 'Nafta', precio: 35200, imagen: 'https://images.pexels.com/photos/2533092/pexels-photo-2533092.jpeg?auto=compress&cs=tinysrgb&w=600', categoria: 'Camionetas', destacado: true },
  { id: '5', marca: 'Honda', modelo: 'CR-V', año: 2023, kilometraje: 22000, combustible: 'Nafta', precio: 42000, imagen: 'https://images.pexels.com/photos/3786091/pexels-photo-3786091.jpeg?auto=compress&cs=tinysrgb&w=600', categoria: 'SUV' },
  { id: '6', marca: 'Jeep', modelo: 'Compass', año: 2023, kilometraje: 18000, combustible: 'Diesel', precio: 38000, imagen: 'https://images.pexels.com/photos/1638459/pexels-photo-1638459.jpeg?auto=compress&cs=tinysrgb&w=600', categoria: 'SUV' },
  
  // Camionetas
  { id: '7', marca: 'Toyota', modelo: 'Hilux', año: 2024, kilometraje: 3000, combustible: 'Diesel', precio: 52000, imagen: 'https://images.pexels.com/photos/2533092/pexels-photo-2533092.jpeg?auto=compress&cs=tinysrgb&w=600', categoria: 'Camionetas', destacado: true },
  { id: '8', marca: 'Ford', modelo: 'Ranger', año: 2023, kilometraje: 35000, combustible: 'Diesel', precio: 48000, imagen: 'https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg?auto=compress&cs=tinysrgb&w=600', categoria: 'Camionetas' },
  { id: '9', marca: 'Volkswagen', modelo: 'Amarok', año: 2023, kilometraje: 42000, combustible: 'Diesel', precio: 55000, imagen: 'https://images.pexels.com/photos/2676096/pexels-photo-2676096.jpeg?auto=compress&cs=tinysrgb&w=600', categoria: 'Camionetas' },
  
  // Sedanes
  { id: '10', marca: 'Toyota', modelo: 'Corolla', año: 2024, kilometraje: 8000, combustible: 'Híbrido', precio: 28000, imagen: 'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=600', categoria: 'Sedanes' },
  { id: '11', marca: 'Honda', modelo: 'Civic', año: 2023, kilometraje: 12000, combustible: 'Nafta', precio: 32000, imagen: 'https://images.pexels.com/photos/3752169/pexels-photo-3752169.jpeg?auto=compress&cs=tinysrgb&w=600', categoria: 'Sedanes', destacado: true },
  { id: '12', marca: 'Volkswagen', modelo: 'Vento', año: 2023, kilometraje: 25000, combustible: 'Nafta', precio: 26000, imagen: 'https://images.pexels.com/photos/1035108/pexels-photo-1035108.jpeg?auto=compress&cs=tinysrgb&w=600', categoria: 'Sedanes' },
  
  // Motos
  { id: '13', marca: 'Honda', modelo: 'CB500', año: 2024, kilometraje: 2000, combustible: 'Nafta', precio: 8500, imagen: 'https://images.pexels.com/photos/2519374/pexels-photo-2519374.jpeg?auto=compress&cs=tinysrgb&w=600', categoria: 'Motos' },
  { id: '14', marca: 'Yamaha', modelo: 'MT-07', año: 2023, kilometraje: 8000, combustible: 'Nafta', precio: 9200, imagen: 'https://images.pexels.com/photos/2611686/pexels-photo-2611686.jpeg?auto=compress&cs=tinysrgb&w=600', categoria: 'Motos' },
  { id: '15', marca: 'Kawasaki', modelo: 'Z650', año: 2024, kilometraje: 1500, combustible: 'Nafta', precio: 9800, imagen: 'https://images.pexels.com/photos/1413412/pexels-photo-1413412.jpeg?auto=compress&cs=tinysrgb&w=600', categoria: 'Motos', destacado: true },
];

const categorias = ['Todos', 'Compactos', 'SUV', 'Camionetas', 'Sedanes', 'Motos'];

const CatalogoVehiculos = () => {
  const [categoriaActiva, setCategoriaActiva] = useState('Todos');
  const [busqueda, setBusqueda] = useState('');

  const vehiculosFiltrados = useMemo(() => {
    return datosVehiculos.filter((vehiculo) => {
      const coincideCategoria = categoriaActiva === 'Todos' || vehiculo.categoria === categoriaActiva;
      const coincideBusqueda = 
        vehiculo.marca.toLowerCase().includes(busqueda.toLowerCase()) ||
        vehiculo.modelo.toLowerCase().includes(busqueda.toLowerCase()) ||
        vehiculo.año.toString().includes(busqueda);
      
      return coincideCategoria && coincideBusqueda;
    });
  }, [categoriaActiva, busqueda]);

  return (
    <section id="catalogo" className="relative py-20 px-4">
      <EtiquetaComponente nombre="CatalogoVehiculos" />
      <div className="container mx-auto max-w-7xl">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Nuestro <span className="gradient-text">Catálogo</span>
          </h2>
        </div>

        {/* Search */}
        <div className="relative max-w-md mx-auto mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Buscar por marca, modelo o año..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="pl-10 bg-card border-border/50 focus:border-primary h-12"
          />
        </div>

        {/* Tabs */}
        <Tabs value={categoriaActiva} onValueChange={setCategoriaActiva} className="w-full">
          <TabsList className="flex flex-wrap justify-center gap-2 h-auto p-2 bg-card/50 backdrop-blur-sm mb-10">
            {categorias.map((categoria) => (
              <TabsTrigger
                key={categoria}
                value={categoria}
                className="px-4 py-2 data-[state=active]:bg-gradient-neon data-[state=active]:text-primary-foreground transition-all"
              >
                {categoria}
              </TabsTrigger>
            ))}
          </TabsList>

          {categorias.map((categoria) => (
            <TabsContent key={categoria} value={categoria} className="mt-0">
              {vehiculosFiltrados.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {vehiculosFiltrados.map((vehiculo, index) => (
                    <div
                      key={vehiculo.id}
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <TarjetaVehiculo vehiculo={vehiculo} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-muted-foreground text-lg">
                    No se encontraron vehículos con esos criterios.
                  </p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default CatalogoVehiculos;
