import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

interface EtiquetaComponenteProps {
  nombre: string;
  posicion?: 'izquierda' | 'derecha';
}

const EtiquetaComponente = ({ nombre, posicion = 'izquierda' }: EtiquetaComponenteProps) => {
  const [copiado, setCopiado] = useState(false);

  const copiarNombre = async () => {
    try {
      await navigator.clipboard.writeText(nombre);
      setCopiado(true);
      toast({
        title: "¡Copiado!",
        description: `"${nombre}" copiado al portapapeles`,
      });
      setTimeout(() => setCopiado(false), 2000);
    } catch (err) {
      toast({
        title: "Error",
        description: "No se pudo copiar el nombre",
        variant: "destructive",
      });
    }
  };

  return (
    <button
      onClick={copiarNombre}
      className={`absolute top-2 z-50 px-3 py-1.5 text-xs font-mono font-medium rounded-md 
        bg-neon-purple/90 text-foreground backdrop-blur-sm border border-neon-purple/50
        hover:bg-neon-purple hover:scale-105 transition-all cursor-pointer
        shadow-lg shadow-neon-purple/20
        ${posicion === 'derecha' ? 'right-2' : 'left-2'}
        ${copiado ? 'bg-green-500/90 border-green-500/50' : ''}`}
      title="Clic para copiar el nombre"
    >
      {copiado ? '✓ Copiado' : nombre}
    </button>
  );
};

export default EtiquetaComponente;
