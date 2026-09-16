import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock } from 'lucide-react';
import { toast } from 'sonner';

interface AdminLoginProps {
  onLogin: (password: string) => void;
  getPassword: () => string;
}

const AdminLogin = ({ onLogin }: AdminLoginProps) => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;

    setLoading(true);
    try {
      // Prueba la contraseña haciendo una consulta al panel
      const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-vehiculos?action=list`;
      const res = await fetch(url, {
        method: 'GET',
        headers: { 'x-admin-password': password },
      });

      if (!res.ok) {
        toast.error('Contraseña incorrecta');
        return;
      }

      onLogin(password);
      toast.success('Acceso concedido');
    } catch {
      toast.error('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-display text-2xl font-bold">Panel Admin</h1>
          <p className="text-muted-foreground mt-2">Ingresá la contraseña para continuar</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-12"
            autoFocus
          />
          <Button type="submit" className="w-full h-12 bg-gradient-neon" disabled={loading}>
            {loading ? 'Verificando...' : 'Ingresar'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <Button variant="link" asChild>
            <a href="/">← Volver al sitio</a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
