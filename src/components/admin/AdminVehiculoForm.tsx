import { useState } from 'react';
import { VehiculoDB } from '@/hooks/useVehiculosAdmin';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Card } from '@/components/ui/card';
import { Upload, X, Loader2, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { urlImagen } from '@/lib/imagenes';

interface Props {
  vehiculo: VehiculoDB | null;
  onSave: (data: Partial<VehiculoDB>) => Promise<void>;
  onCancel: () => void;
  uploadImage: (file: File) => Promise<string>;
}

const categorias = ['Compactos', 'Sedanes', 'SUV', 'SUVs', 'Camionetas', 'Pickups', 'Eléctricos', '4x4'];
const combustibles = ['Nafta', 'Diesel', 'Híbrido', 'Eléctrico'];
const transmisiones = ['Manual', 'Automática', 'CVT'];
const estados = ['Nuevo', 'Usado'];

const AdminVehiculoForm = ({ vehiculo, onSave, onCancel, uploadImage }: Props) => {
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    marca: vehiculo?.marca || '',
    modelo: vehiculo?.modelo || '',
    año: vehiculo?.año || new Date().getFullYear(),
    kilometraje: vehiculo?.kilometraje || 0,
    combustible: vehiculo?.combustible || 'Nafta',
    transmision: vehiculo?.transmision || 'Manual',
    color: vehiculo?.color || '',
    puertas: vehiculo?.puertas || 4,
    precio: vehiculo?.precio || 0,
    moneda: vehiculo?.moneda || 'USD',
    descripcion: vehiculo?.descripcion || '',
    categoria: vehiculo?.categoria || 'SUV',
    estado: vehiculo?.estado || 'Usado',
    equipamiento: vehiculo?.equipamiento || '',
    destacado: vehiculo?.destacado || false,
    imagen_url: vehiculo?.imagen_url || '',
    imagenes_urls: vehiculo?.imagenes_urls || [],
  });

  const handleChange = (field: string, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, isMain: boolean) => {
    const files = e.target.files;
    if (!files?.length) return;

    setUploading(true);
    try {
      if (isMain) {
        const ruta = await uploadImage(files[0]);
        handleChange('imagen_url', ruta);
      } else {
        const rutas: string[] = [];
        for (const file of Array.from(files)) {
          const ruta = await uploadImage(file);
          rutas.push(ruta);
        }
        handleChange('imagenes_urls', [...form.imagenes_urls, ...rutas]);
      }
      toast.success('Imagen(es) subida(s)');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    handleChange('imagenes_urls', form.imagenes_urls.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.marca || !form.modelo || !form.precio) {
      toast.error('Completá marca, modelo y precio');
      return;
    }
    setSaving(true);
    await onSave(form);
    setSaving(false);
  };

  return (
    <Card className="p-6 bg-card/50 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="icon" onClick={onCancel}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="font-display text-xl font-bold">
          {vehiculo ? 'Editar Vehículo' : 'Nuevo Vehículo'}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Datos básicos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Marca *</Label>
            <Input value={form.marca} onChange={e => handleChange('marca', e.target.value)} placeholder="Toyota" />
          </div>
          <div className="space-y-2">
            <Label>Modelo *</Label>
            <Input value={form.modelo} onChange={e => handleChange('modelo', e.target.value)} placeholder="Corolla" />
          </div>
          <div className="space-y-2">
            <Label>Año</Label>
            <Input type="number" value={form.año} onChange={e => handleChange('año', parseInt(e.target.value))} />
          </div>
          <div className="space-y-2">
            <Label>Kilometraje</Label>
            <Input type="number" value={form.kilometraje} onChange={e => handleChange('kilometraje', parseInt(e.target.value))} />
          </div>
          <div className="space-y-2">
            <Label>Precio *</Label>
            <Input type="number" value={form.precio} onChange={e => handleChange('precio', parseFloat(e.target.value))} />
          </div>
          <div className="space-y-2">
            <Label>Moneda</Label>
            <Select value={form.moneda} onValueChange={v => handleChange('moneda', v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD</SelectItem>
                <SelectItem value="ARS">ARS</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Detalles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Categoría</Label>
            <Select value={form.categoria} onValueChange={v => handleChange('categoria', v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {categorias.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Combustible</Label>
            <Select value={form.combustible} onValueChange={v => handleChange('combustible', v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {combustibles.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Transmisión</Label>
            <Select value={form.transmision} onValueChange={v => handleChange('transmision', v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {transmisiones.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Estado</Label>
            <Select value={form.estado} onValueChange={v => handleChange('estado', v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {estados.map(e => <SelectItem key={e} value={e}>{e}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Color</Label>
            <Input value={form.color} onChange={e => handleChange('color', e.target.value)} placeholder="Blanco" />
          </div>
          <div className="space-y-2">
            <Label>Puertas</Label>
            <Input type="number" value={form.puertas || 0} onChange={e => handleChange('puertas', parseInt(e.target.value))} />
          </div>
        </div>

        {/* Descripción y equipamiento */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Descripción</Label>
            <Textarea value={form.descripcion} onChange={e => handleChange('descripcion', e.target.value)} placeholder="Descripción del vehículo..." rows={3} />
          </div>
          <div className="space-y-2">
            <Label>Equipamiento</Label>
            <Textarea value={form.equipamiento} onChange={e => handleChange('equipamiento', e.target.value)} placeholder="Aire acondicionado, dirección asistida..." rows={3} />
          </div>
        </div>

        {/* Destacado */}
        <div className="flex items-center gap-3">
          <Switch checked={form.destacado} onCheckedChange={v => handleChange('destacado', v)} />
          <Label>Destacado del mes</Label>
        </div>

        {/* Imagen principal */}
        <div className="space-y-3">
          <Label>Imagen principal</Label>
          {form.imagen_url && (
            <div className="relative w-48 h-32 rounded-lg overflow-hidden">
              <img src={urlImagen(form.imagen_url)} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => handleChange('imagen_url', '')}
                className="absolute top-1 right-1 p-1 rounded-full bg-background/80"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
          <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-dashed border-border hover:border-primary cursor-pointer transition-colors">
            <Upload className="w-4 h-4" />
            <span className="text-sm">{uploading ? 'Subiendo...' : 'Subir imagen principal'}</span>
            <input type="file" accept="image/*" className="hidden" onChange={e => handleImageUpload(e, true)} disabled={uploading} />
          </label>
        </div>

        {/* Galería */}
        <div className="space-y-3">
          <Label>Galería de imágenes</Label>
          {form.imagenes_urls.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {form.imagenes_urls.map((ruta, i) => (
                <div key={i} className="relative w-24 h-20 rounded-lg overflow-hidden">
                  <img src={urlImagen(ruta)} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute top-1 right-1 p-0.5 rounded-full bg-background/80"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
          <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-dashed border-border hover:border-primary cursor-pointer transition-colors">
            <Upload className="w-4 h-4" />
            <span className="text-sm">{uploading ? 'Subiendo...' : 'Agregar imágenes a la galería'}</span>
            <input type="file" accept="image/*" multiple className="hidden" onChange={e => handleImageUpload(e, false)} disabled={uploading} />
          </label>
        </div>

        {/* Guardar */}
        <div className="flex gap-3 pt-4">
          <Button type="submit" className="bg-gradient-neon" disabled={saving || uploading}>
            {saving ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Guardando...</> : vehiculo ? 'Guardar cambios' : 'Crear vehículo'}
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default AdminVehiculoForm;
