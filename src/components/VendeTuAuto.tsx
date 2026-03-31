import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Car, Send, CheckCircle, DollarSign, Phone, User, Calendar, Gauge } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import EtiquetaComponente from './EtiquetaComponente';

const VendeTuAuto = () => {
  const { toast } = useToast();
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [form, setForm] = useState({
    nombre: '',
    whatsapp: '',
    marca: '',
    modelo: '',
    año: '',
    kilometraje: '',
    descripcion: '',
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

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
      <section id="vende-tu-auto" className="py-20 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <div className="border border-border rounded-2xl p-14 flex flex-col items-center gap-5">
            <CheckCircle className="w-10 h-10 text-green-500" />
            <h3 className="text-2xl font-semibold text-foreground">¡Recibimos tu consulta!</h3>
            <p className="text-muted-foreground">Nos vamos a comunicar con vos por WhatsApp a la brevedad.</p>
          </div>
        </div>
      </section>
    );
  }

  const campos = [
    { id: 'nombre', label: 'Tu nombre', placeholder: 'Juan Pérez', icon: User, type: 'text' },
    { id: 'whatsapp', label: 'Tu WhatsApp', placeholder: '11 3309-5902', icon: Phone, type: 'text' },
    { id: 'marca', label: 'Marca', placeholder: 'Toyota', icon: Car, type: 'text' },
    { id: 'modelo', label: 'Modelo', placeholder: 'Corolla', icon: Car, type: 'text' },
    { id: 'año', label: 'Año', placeholder: '2020', icon: Calendar, type: 'number' },
    { id: 'kilometraje', label: 'Kilometraje', placeholder: '45.000', icon: Gauge, type: 'text' },
  ];

  return (
    <section
      ref={sectionRef}
      id="vende-tu-auto"
      className="py-20 px-4"
    >
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Vendé tu Auto
          </h2>
          <p className="text-muted-foreground">
            Completá los datos y nos ponemos en contacto.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="border border-border rounded-2xl p-8 md:p-10 space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {campos.map((campo) => {
              const Icon = campo.icon;
              return (
                <div key={campo.id} className="space-y-1.5">
                  <Label htmlFor={campo.id} className="text-sm text-muted-foreground flex items-center gap-1.5">
                    <Icon className="w-3.5 h-3.5 text-primary" />
                    {campo.label}
                  </Label>
                  <Input
                    id={campo.id}
                    name={campo.id}
                    type={campo.type}
                    placeholder={campo.placeholder}
                    value={form[campo.id as keyof typeof form]}
                    onChange={handleChange}
                    required
                    className="bg-background border-border h-11 rounded-lg"
                  />
                </div>
              );
            })}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="descripcion" className="text-sm text-muted-foreground">
              Descripción / Comentarios
            </Label>
            <Textarea
              id="descripcion"
              name="descripcion"
              placeholder="Contanos el estado del auto, extras, etc."
              value={form.descripcion}
              onChange={handleChange}
              rows={4}
              className="bg-background border-border rounded-lg resize-none"
            />
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full h-12 text-base font-semibold rounded-lg bg-primary hover:bg-primary/90"
            disabled={enviando}
          >
            <Send className="w-4 h-4 mr-2" />
            {enviando ? 'Enviando...' : 'Enviar consulta'}
          </Button>
        </form>
      </div>
    </section>
  );
};
export default VendeTuAuto;
