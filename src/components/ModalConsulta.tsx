import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { MessageCircle, Loader2, CheckCircle, Copy } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface ModalConsultaProps {
  abierto: boolean;
  onCerrar: () => void;
  vehiculo: {
    marca: string;
    modelo: string;
    año: number;
    imagen: string;
  };
}

const ModalConsulta = ({ abierto, onCerrar, vehiculo }: ModalConsultaProps) => {
  const [nombre, setNombre] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [tipoConsulta, setTipoConsulta] = useState<string>('');
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [whatsappLink, setWhatsappLink] = useState('');

  const handleEnviar = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nombre || !whatsapp || !tipoConsulta) {
      toast({
        title: "Campos incompletos",
        description: "Por favor completá todos los campos",
        variant: "destructive",
      });
      return;
    }

    setEnviando(true);

    try {
      // Guardar en base de datos
      const { error: dbError } = await supabase
        .from('consultas_vehiculos')
        .insert({
          vehiculo_marca: vehiculo.marca,
          vehiculo_modelo: vehiculo.modelo,
          vehiculo_año: vehiculo.año,
          nombre_cliente: nombre,
          whatsapp_cliente: whatsapp,
          tipo_consulta: tipoConsulta,
        });

      if (dbError) throw dbError;

      // Enviar a Google Sheets via edge function
      const { error: sheetError } = await supabase.functions.invoke('guardar-en-sheets', {
        body: {
          vehiculo_marca: vehiculo.marca,
          vehiculo_modelo: vehiculo.modelo,
          vehiculo_año: vehiculo.año,
          nombre_cliente: nombre,
          whatsapp_cliente: whatsapp,
          tipo_consulta: tipoConsulta,
        },
      });

      if (sheetError) {
        console.warn('Error al guardar en sheets:', sheetError);
        // No bloqueamos el flujo si falla sheets
      }

      // Preparar mensaje de WhatsApp
      const tipoTexto = tipoConsultaLabels[tipoConsulta] || tipoConsulta;
      const vehiculoTexto = `${vehiculo.marca} ${vehiculo.modelo} ${vehiculo.año}`;
      const mensajeWhatsapp = encodeURIComponent(
        `Hola! Soy ${nombre}. Estoy interesado en ${vehiculoTexto} y ${tipoTexto.toLowerCase()}. Mi WhatsApp es ${whatsapp}.`
      );
      
      const whatsappUrl = `https://wa.me/5491154271427?text=${mensajeWhatsapp}`;

      // Cerrar modal y limpiar formulario
      onCerrar();
      setNombre('');
      setWhatsapp('');
      setTipoConsulta('');

      toast({
        title: "¡Consulta enviada!",
        description: "Redirigiendo a WhatsApp...",
      });

      // Redirigir inmediatamente a WhatsApp (fuera del modal)
      window.location.href = whatsappUrl;

    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "No se pudo enviar la consulta. Intentá nuevamente.",
        variant: "destructive",
      });
    } finally {
      setEnviando(false);
    }
  };

  const tipoConsultaLabels: Record<string, string> = {
    contado: 'Quiero una compra de contado',
    financiado: 'Quiero una compra financiada',
    parte_pago: 'Quiero dejar mi auto como parte de pago',
  };

  return (
    <Dialog open={abierto} onOpenChange={onCerrar}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        {/* Imagen miniatura del vehículo */}
        <div className="w-full h-32 rounded-lg overflow-hidden mb-2">
          <img 
            src={vehiculo.imagen} 
            alt={`${vehiculo.marca} ${vehiculo.modelo}`}
            className="w-full h-full object-cover"
          />
        </div>
        
        <DialogHeader>
          <DialogTitle className="font-display text-xl">Consultar por este vehículo</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            <span className="font-semibold text-foreground">
              {vehiculo.marca} {vehiculo.modelo} {vehiculo.año}
            </span>
          </DialogDescription>
        </DialogHeader>

        {enviado ? (
          <div className="flex flex-col items-center justify-center py-6 gap-4">
            <CheckCircle className="w-14 h-14 text-[#25D366]" />
            <p className="text-lg font-semibold text-center">¡Consulta enviada!</p>
            
            <div className="w-full space-y-3">
              <Button 
                className="w-full bg-[#25D366] hover:bg-[#1da851] text-white font-bold text-base"
                size="lg"
                onClick={() => {
                  window.location.href = whatsappLink;
                }}
              >
                <MessageCircle className="w-5 h-5 mr-2" strokeWidth={2.5} />
                Abrir WhatsApp
              </Button>
              
              <div className="text-center text-sm text-muted-foreground">
                ¿No funciona? Copiá los datos:
              </div>
              
              <Button 
                variant="outline"
                className="w-full"
                size="lg"
                onClick={() => {
                  const tipoTexto = tipoConsultaLabels[tipoConsulta] || tipoConsulta;
                  const vehiculoTexto = `${vehiculo.marca} ${vehiculo.modelo} ${vehiculo.año}`;
                  const mensaje = `Hola! Soy ${nombre}. Estoy interesado en ${vehiculoTexto} y ${tipoTexto.toLowerCase()}. Mi WhatsApp es ${whatsapp}.`;
                  navigator.clipboard.writeText(`Número: 5491154271427\n\nMensaje:\n${mensaje}`);
                  toast({
                    title: "¡Copiado!",
                    description: "Número y mensaje copiados al portapapeles",
                  });
                }}
              >
                <Copy className="w-5 h-5 mr-2" />
                Copiar número y mensaje
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleEnviar} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="nombre">Tu nombre</Label>
              <Input
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ingresá tu nombre"
                className="bg-background border-border/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="whatsapp">Tu número de WhatsApp</Label>
              <Input
                id="whatsapp"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="Ej: 11 1234-5678"
                className="bg-background border-border/50"
              />
            </div>

            <div className="space-y-3">
              <Label>¿Qué tipo de transacción desea realizar?</Label>
              <RadioGroup value={tipoConsulta} onValueChange={setTipoConsulta} className="space-y-2">
                {Object.entries(tipoConsultaLabels).map(([value, label]) => (
                  <div key={value} className="flex items-center space-x-3 p-3 rounded-lg border border-border/50 hover:border-primary/50 transition-colors">
                    <RadioGroupItem value={value} id={value} />
                    <Label htmlFor={value} className="cursor-pointer flex-1 font-normal">
                      {label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <Button 
              type="submit" 
              disabled={enviando}
              className="w-full bg-[#25D366] hover:bg-[#1da851] text-white font-bold text-base"
              size="lg"
            >
              {enviando ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <MessageCircle className="w-5 h-5 mr-2" strokeWidth={2.5} />
                  Enviar consulta
                </>
              )}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ModalConsulta;