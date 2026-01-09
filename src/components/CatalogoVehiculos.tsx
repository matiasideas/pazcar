import { useState, useMemo } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import TarjetaVehiculo from './TarjetaVehiculo';
import EtiquetaComponente from './EtiquetaComponente';
import { todosLosVehiculos, categorias } from '@/data/vehiculos';

const CatalogoVehiculos = () => {
  const [categoriaActiva, setCategoriaActiva] = useState('Todos');
  const [busqueda, setBusqueda] = useState('');

  const vehiculosFiltrados = useMemo(() => {
    return todosLosVehiculos.filter((vehiculo) => {
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
