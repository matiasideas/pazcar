import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Eye, Calendar, Gauge, Fuel } from 'lucide-react';

export interface Vehiculo {
  id: string;
  marca: string;
  modelo: string;
  año: number;
  kilometraje: number;
  combustible: string;
  precio: number;
  imagen: string;
  categoria: string;
  destacado?: boolean;
}

interface TarjetaVehiculoProps {
  vehiculo: Vehiculo;
}

const TarjetaVehiculo = ({ vehiculo }: TarjetaVehiculoProps) => {
  const precioFormateado = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(vehiculo.precio);

  const kilometrajeFormateado = new Intl.NumberFormat('es-AR').format(vehiculo.kilometraje);

  const mensajeWhatsapp = encodeURIComponent(
    `Hola! Me interesa el ${vehiculo.marca} ${vehiculo.modelo} ${vehiculo.año}. ¿Podrían darme más información?`
  );

  return (
    <Card 
      className={`group overflow-hidden bg-gradient-card border-border/50 card-hover ${
        vehiculo.destacado ? 'featured-glow neon-border' : ''
      }`}
    >
      {/* Image container */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={vehiculo.imagen}
          alt={`${vehiculo.marca} ${vehiculo.modelo}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        
        {/* Badge */}
        {vehiculo.destacado && (
          <Badge className="absolute top-3 right-3 bg-gradient-neon text-primary-foreground border-0">
            Destacado
          </Badge>
        )}
        
        {/* Category badge */}
        <Badge 
          variant="secondary" 
          className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm"
        >
          {vehiculo.categoria}
        </Badge>
      </div>
      
      {/* Content */}
      <CardContent className="p-5 space-y-4">
        <div>
          <h3 className="font-display text-xl font-semibold text-foreground">
            {vehiculo.marca} {vehiculo.modelo}
          </h3>
          <div className="flex flex-wrap items-center gap-3 text-muted-foreground text-sm mt-2">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {vehiculo.año}
            </span>
            <span className="flex items-center gap-1">
              <Gauge className="w-4 h-4" />
              {kilometrajeFormateado} km
            </span>
            <span className="flex items-center gap-1">
              <Fuel className="w-4 h-4" />
              {vehiculo.combustible}
            </span>
          </div>
        </div>
        
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-display font-bold gradient-text">
            {precioFormateado}
          </span>
        </div>
        
        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 border-primary/30 hover:bg-primary/10 hover:border-primary"
          >
            <Eye className="w-4 h-4 mr-1" />
            Ver más
          </Button>
          <Button 
            size="sm" 
            className="flex-1 bg-gradient-neon hover:opacity-90"
            asChild
          >
            <a 
              href={`https://wa.me/5491112345678?text=${mensajeWhatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="w-4 h-4 mr-1" />
              Consultar
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TarjetaVehiculo;
