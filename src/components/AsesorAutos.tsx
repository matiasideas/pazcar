import { useState } from 'react';
import { Loader2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useCatalogo } from '@/hooks/useCatalogo';
import TarjetaVehiculo from './TarjetaVehiculo';

interface Recomendacion { id: string; motivo: string }

const ejemplos = [
  'Busco un auto chico para la ciudad, que gaste poco, hasta US$12.000',
  'Necesito una camioneta para trabajar, diésel, con poco kilometraje',
  'SUV familiar 2020 en adelante, automática',
];

const AsesorAutos = () => {
  const { vehiculos } = useCatalogo();
  const [consulta, setConsulta] = useState('');
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');
  const [resumen, setResumen] = useState('');
  const [recs, setRecs] = useState<Recomendacion[] | null>(null);

  const buscar = async () => {
    if (consulta.trim().length < 3 || cargando) return;
    setCargando(true);
    setError('');
    const { data, error: err } = await supabase.functions.invoke('recomendar-autos', {
      body: { consulta },
    });
    setCargando(false);
    if (err || data?.error) {
      let msg = data?.error;
      try { msg = msg || (await (err as any)?.context?.json())?.error; } catch { /* nada */ }
      setError(msg || 'No pudimos generar recomendaciones. Probá de nuevo.');
      setRecs(null);
      return;
    }
    setResumen(data.resumen || '');
    setRecs(data.recomendaciones || []);
  };

  return (
    <section id="asesor" className="py-20 px-4 border-t border-border">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-8">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-3">
            ¿No sabés <span className="gradient-text">cuál elegir?</span>
          </h2>
          <p className="text-muted-foreground">
            Contanos qué auto buscás y te recomendamos los que mejor te quedan del catálogo.
          </p>
        </div>

        <div className="max-w-2xl mx-auto space-y-3">
          <Textarea
            value={consulta}
            onChange={(e) => setConsulta(e.target.value)}
            maxLength={1000}
            rows={4}
            placeholder="Ej: busco un auto para la familia, que sea cómodo para viajar, hasta US$20.000"
          />
          <div className="flex flex-wrap gap-2">
            {ejemplos.map((e) => (
              <button
                key={e}
                type="button"
                onClick={() => setConsulta(e)}
                className="text-xs px-3 py-1 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
              >
                {e}
              </button>
            ))}
          </div>
          <div className="flex justify-center pt-2">
            <Button onClick={buscar} disabled={cargando || consulta.trim().length < 3} className="px-8">
              {cargando ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Sparkles className="w-4 h-4 mr-2" />}
              {cargando ? 'Buscando…' : 'Recomendame autos'}
            </Button>
          </div>
          {error && <p className="text-center text-destructive text-sm">{error}</p>}
        </div>

        {recs && (
          <div className="mt-10">
            {resumen && <p className="text-center mb-6 text-foreground">{resumen}</p>}
            <div className="grid sm:grid-cols-2 gap-6">
              {recs.map((r) => {
                const v = vehiculos.find((x) => String(x.id) === r.id);
                if (!v) return null;
                return (
                  <div key={r.id} className="space-y-2">
                    <TarjetaVehiculo vehiculo={v} />
                    <p className="text-sm text-muted-foreground px-1">{r.motivo}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AsesorAutos;
