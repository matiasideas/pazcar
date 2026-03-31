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
      <section id="vende-tu-auto" className="py-24 px-4 relative overflow-hidden">
        <EtiquetaComponente nombre="VendeTuAuto" posicion="izquierda" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />
        <div className="container mx-auto max-w-2xl text-center relative z-10">
          <div className="bg-card/80 backdrop-blur-md border border-primary/20 rounded-3xl p-16 flex flex-col items-center gap-6 animate-scale-in shadow-[0_0_60px_hsl(var(--primary)/0.15)]">
            <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
            <h3 className="text-3xl font-bold text-foreground">¡Recibimos tu consulta!</h3>
            <p className="text-muted-foreground text-lg">Nos vamos a comunicar con vos por WhatsApp a la brevedad.</p>
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
      className="py-24 px-4 relative overflow-hidden"
    >
      <EtiquetaComponente nombre="VendeTuAuto" posicion="izquierda" />

      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-5xl relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-14 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary/10 border border-primary/20 rounded-full mb-6 backdrop-blur-sm">
            <DollarSign className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary tracking-wide uppercase">Vendé tu Auto</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            ¿Querés <span className="text-primary">vender</span> tu auto?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Completá el formulario con los datos de tu vehículo y nos ponemos en contacto para hacerte una oferta.
          </p>
        </div>

        {/* Form card */}
        <div
          className={`transition-all duration-700 delay-200 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <form
            onSubmit={handleSubmit}
            className="relative bg-card/60 backdrop-blur-md border border-border/50 rounded-3xl p-8 md:p-12 space-y-8 shadow-[0_8px_40px_hsl(var(--primary)/0.08)] hover:shadow-[0_8px_60px_hsl(var(--primary)/0.12)] transition-shadow duration-500"
          >
            {/* Decorative corner accents */}
            <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-primary/30 rounded-tl-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-primary/30 rounded-br-3xl pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {campos.map((campo, i) => {
                const Icon = campo.icon;
                return (
                  <div
                    key={campo.id}
                    className={`space-y-2 transition-all duration-500 ${
                      visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                    style={{ transitionDelay: visible ? `${300 + i * 80}ms` : '0ms' }}
                  >
                    <Label htmlFor={campo.id} className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <Icon className="w-3.5 h-3.5 text-primary/60" />
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
                      className="bg-background/50 border-border/60 h-12 rounded-xl focus:border-primary/50 focus:ring-primary/20 transition-all duration-300 placeholder:text-muted-foreground/40"
                    />
                  </div>
                );
              })}
            </div>

            <div
              className={`space-y-2 transition-all duration-500 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: visible ? '780ms' : '0ms' }}
            >
              <Label htmlFor="descripcion" className="text-sm font-medium text-muted-foreground">
                Descripción / Comentarios
              </Label>
              <Textarea
                id="descripcion"
                name="descripcion"
                placeholder="Contanos el estado del auto, extras, etc."
                value={form.descripcion}
                onChange={handleChange}
                rows={4}
                className="bg-background/50 border-border/60 rounded-xl focus:border-primary/50 focus:ring-primary/20 transition-all duration-300 placeholder:text-muted-foreground/40 resize-none"
              />
            </div>

            <div
              className={`transition-all duration-500 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: visible ? '860ms' : '0ms' }}
            >
              <Button
                type="submit"
                size="lg"
                className="w-full h-14 text-base font-semibold rounded-xl bg-primary hover:bg-primary/90 shadow-[0_4px_20px_hsl(var(--primary)/0.3)] hover:shadow-[0_4px_30px_hsl(var(--primary)/0.5)] transition-all duration-300 group"
                disabled={enviando}
              >
                <Send className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:translate-x-1" />
                {enviando ? 'Enviando...' : 'Enviar consulta'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default VendeTuAuto;
