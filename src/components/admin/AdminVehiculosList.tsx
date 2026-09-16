import { useState } from 'react';
import { VehiculoDB } from '@/hooks/useVehiculosAdmin';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Pencil, Trash2, Loader2, Car, Search } from 'lucide-react';
import { urlImagen } from '@/lib/imagenes';

interface Props {
  vehiculos: VehiculoDB[];
  loading: boolean;
  onEdit: (v: VehiculoDB) => void;
  onDelete: (id: string) => void;
  onToggleDestacado: (id: string, destacado: boolean) => void;
  onTogglePausado: (id: string, pausado: boolean) => void;
}

const AdminVehiculosList = ({ vehiculos, loading, onEdit, onDelete, onToggleDestacado, onTogglePausado }: Props) => {
  const [search, setSearch] = useState('');

  const filtered = vehiculos.filter((v) => {
    const q = search.toLowerCase();
    return `${v.marca} ${v.modelo} ${v.año} ${v.categoria} ${v.combustible}`.toLowerCase().includes(q);
  });
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (vehiculos.length === 0) {
    return (
      <div className="text-center py-20">
        <Car className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-xl font-semibold mb-2">Sin vehículos</h2>
        <p className="text-muted-foreground">Agregá tu primer vehículo al catálogo</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por marca, modelo, año..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <p className="text-muted-foreground text-sm">{filtered.length} vehículo(s)</p>
      </div>

      {filtered.map((v) => (
        <Card key={v.id} className="p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-card/50">
          {/* Thumbnail */}
          <div className="w-full sm:w-24 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
            {v.imagen_url ? (
              <img src={urlImagen(v.imagen_url)} alt={`${v.marca} ${v.modelo}`} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Car className="w-8 h-8 text-muted-foreground" />
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-foreground">{v.marca} {v.modelo}</h3>
              <Badge variant="secondary">{v.año}</Badge>
              <Badge variant="outline">{v.categoria}</Badge>
              {v.destacado && <Badge className="bg-gradient-neon text-primary-foreground border-0">Destacado</Badge>}
              {v.pausado && <Badge variant="destructive">Pausado</Badge>}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {v.kilometraje.toLocaleString()} km · {v.combustible} · {v.transmision} · {v.moneda === 'ARS' ? '$' : 'USD'} {Number(v.precio).toLocaleString()}
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Destacado</span>
              <Switch
                checked={v.destacado}
                onCheckedChange={(checked) => onToggleDestacado(v.id, checked)}
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Pausado</span>
              <Switch
                checked={v.pausado}
                onCheckedChange={(checked) => onTogglePausado(v.id, checked)}
              />
            </div>
            <Button variant="outline" size="icon" onClick={() => onEdit(v)}>
              <Pencil className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" className="text-destructive hover:text-destructive" onClick={() => onDelete(v.id)}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default AdminVehiculosList;
