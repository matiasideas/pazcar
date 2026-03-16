import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Car, Send, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import EtiquetaComponente from './EtiquetaComponente';

const VendeTuAuto = () => {
  const { toast } = useToast();
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [form, setForm] = useState({
    nombre: '',
    whatsapp: '',
    marca: '',
    modelo: '',
    año: '',
    kilometraje: '',
    descripcion: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);

    try {
      const { error } = await supabase.from('consultas_vehiculos').insert({
        nombre_cliente: form.nombre,
        whatsapp_cliente: form.whatsapp,
        vehiculo_marca: form.marca,
        vehiculo_modelo: form.modelo,
        vehiculo_año: parseInt(form.año),
        tipo_consulta: `VENTA - ${form.kilometraje}km - ${form.descripcion}`,
      });

      if (error) throw error;

      setEnviado(true);
      toast({
        title: '¡Consulta enviada!',
        description: 'Nos comunicaremos con vos a la brevedad.',
      });
    } catch {
      toast({
        title: 'Error',
        description: 'No se pudo enviar. Intentá de nuevo.',
        variant: 'destructive',
      });
    } finally {
      setEnviando(false);
    }
  };

  if (enviado) {
    return (
      <section id="vende-tu-auto" className="py-20 px-4 relative">
        <EtiquetaComponente nombre="VendeTuAuto" posicion="izquierda" />
        <div className="container mx-auto max-w-2xl text-center">
          <div className="bg-card border border-border/50 rounded-2xl p-12 flex flex-col items-center gap-4">
            <CheckCircle className="w-16 h-16 text-green-500" />
            <h3 className="text-2xl font-bold text-foreground">¡Recibimos tu consulta!</h3>
            <p className="text-muted-foreground">Nos vamos a comunicar con vos por WhatsApp a la brevedad.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="vende-tu-auto" className="py-20 px-4 relative">
      <EtiquetaComponente nombre="VendeTuAuto" posicion="izquierda" />
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-4">
            <Car className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Vendé tu Auto</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            ¿Querés vender tu auto?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Completá el formulario con los datos de tu vehículo y nos ponemos en contacto para hacerte una oferta.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card border border-border/50 rounded-2xl p-6 md:p-10 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="nombre">Tu nombre</Label>
              <Input id="nombre" name="nombre" placeholder="Juan Pérez" value={form.nombre} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="whatsapp">Tu WhatsApp</Label>
              <Input id="whatsapp" name="whatsapp" placeholder="11 3309-5902" value={form.whatsapp} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="marca">Marca</Label>
              <Input id="marca" name="marca" placeholder="Toyota" value={form.marca} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="modelo">Modelo</Label>
              <Input id="modelo" name="modelo" placeholder="Corolla" value={form.modelo} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="año">Año</Label>
              <Input id="año" name="año" type="number" placeholder="2020" value={form.año} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="kilometraje">Kilometraje</Label>
              <Input id="kilometraje" name="kilometraje" placeholder="45.000" value={form.kilometraje} onChange={handleChange} required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="descripcion">Descripción / Comentarios</Label>
            <Textarea id="descripcion" name="descripcion" placeholder="Contanos el estado del auto, extras, etc." value={form.descripcion} onChange={handleChange} rows={4} />
          </div>
          <Button type="submit" size="lg" className="w-full" disabled={enviando}>
            <Send className="w-4 h-4 mr-2" />
            {enviando ? 'Enviando...' : 'Enviar consulta'}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default VendeTuAuto;
