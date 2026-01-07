import { useState, useMemo } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import TarjetaVehiculo, { Vehiculo } from './TarjetaVehiculo';
import EtiquetaComponente from './EtiquetaComponente';

const datosVehiculos: Vehiculo[] = [
  // Compactos
  { id: '1', marca: 'Toyota', modelo: 'Yaris', año: 2023, precio: 18500, imagen: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&h=400&fit=crop', categoria: 'Compactos' },
  { id: '2', marca: 'Volkswagen', modelo: 'Polo', año: 2022, precio: 17800, imagen: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=400&fit=crop', categoria: 'Compactos' },
  { id: '3', marca: 'Ford', modelo: 'Fiesta', año: 2023, precio: 16500, imagen: 'https://images.unsplash.com/photo-1619682817481-e994891cd1f5?w=600&h=400&fit=crop', categoria: 'Compactos', destacado: true },
  
  // SUV
  { id: '4', marca: 'Toyota', modelo: 'RAV4', año: 2024, precio: 45000, imagen: 'https://images.unsplash.com/photo-1568844293986-8c0b3e7f8d7c?w=600&h=400&fit=crop', categoria: 'SUV', destacado: true },
  { id: '5', marca: 'Honda', modelo: 'CR-V', año: 2023, precio: 42000, imagen: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&h=400&fit=crop', categoria: 'SUV' },
  { id: '6', marca: 'Jeep', modelo: 'Compass', año: 2023, precio: 38000, imagen: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&h=400&fit=crop', categoria: 'SUV' },
  
  // Camionetas
  { id: '7', marca: 'Toyota', modelo: 'Hilux', año: 2024, precio: 52000, imagen: 'https://images.unsplash.com/photo-1559416523-140ddc3d238c?w=600&h=400&fit=crop', categoria: 'Camionetas', destacado: true },
  { id: '8', marca: 'Ford', modelo: 'Ranger', año: 2023, precio: 48000, imagen: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop', categoria: 'Camionetas' },
  { id: '9', marca: 'Volkswagen', modelo: 'Amarok', año: 2023, precio: 55000, imagen: 'https://images.unsplash.com/photo-1612544448445-b8232cff3b4c?w=600&h=400&fit=crop', categoria: 'Camionetas' },
  
  // Sedanes
  { id: '10', marca: 'Toyota', modelo: 'Corolla', año: 2024, precio: 28000, imagen: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&h=400&fit=crop', categoria: 'Sedanes' },
  { id: '11', marca: 'Honda', modelo: 'Civic', año: 2023, precio: 32000, imagen: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=600&h=400&fit=crop', categoria: 'Sedanes', destacado: true },
  { id: '12', marca: 'Volkswagen', modelo: 'Vento', año: 2023, precio: 26000, imagen: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&h=400&fit=crop', categoria: 'Sedanes' },
  
  // Motos
  { id: '13', marca: 'Honda', modelo: 'CB500', año: 2024, precio: 8500, imagen: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop', categoria: 'Motos' },
  { id: '14', marca: 'Yamaha', modelo: 'MT-07', año: 2023, precio: 9200, imagen: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600&h=400&fit=crop', categoria: 'Motos' },
  { id: '15', marca: 'Kawasaki', modelo: 'Z650', año: 2024, precio: 9800, imagen: 'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=600&h=400&fit=crop', categoria: 'Motos', destacado: true },
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
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explorá nuestra selección de vehículos. Tenemos opciones para todos los gustos y presupuestos.
          </p>
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
