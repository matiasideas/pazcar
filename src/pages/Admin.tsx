import { useState, useEffect } from 'react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useVehiculosAdmin, VehiculoDB } from '@/hooks/useVehiculosAdmin';
import AdminLogin from '@/components/admin/AdminLogin';
import AdminVehiculosList from '@/components/admin/AdminVehiculosList';
import AdminVehiculoForm from '@/components/admin/AdminVehiculoForm';
import { Button } from '@/components/ui/button';
import { Plus, LogOut, ArrowLeft } from 'lucide-react';

const Admin = () => {
  const { isAuthenticated, getPassword, login, logout } = useAdminAuth();
  const {
    vehiculos, loading, fetchVehiculos, createVehiculo,
    updateVehiculo, deleteVehiculo, toggleDestacado, togglePausado, uploadImage,
  } = useVehiculosAdmin(getPassword);

  const [showForm, setShowForm] = useState(false);
  const [editingVehiculo, setEditingVehiculo] = useState<VehiculoDB | null>(null);

  useEffect(() => {
    if (isAuthenticated) fetchVehiculos();
  }, [isAuthenticated, fetchVehiculos]);

  if (!isAuthenticated) {
    return <AdminLogin onLogin={login} getPassword={getPassword} />;
  }

  const handleEdit = (v: VehiculoDB) => {
    setEditingVehiculo(v);
    setShowForm(true);
  };

  const handleNew = () => {
    setEditingVehiculo(null);
    setShowForm(true);
  };

  const handleSave = async (data: Partial<VehiculoDB>) => {
    if (editingVehiculo) {
      await updateVehiculo({ ...data, id: editingVehiculo.id });
    } else {
      await createVehiculo(data);
    }
    setShowForm(false);
    setEditingVehiculo(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-md sticky top-0 z-40">
        <div className="container mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <a href="/"><ArrowLeft className="w-5 h-5" /></a>
            </Button>
            <h1 className="font-display text-xl font-bold">Panel de Administración</h1>
          </div>
          <div className="flex items-center gap-3">
            {!showForm && (
              <Button onClick={handleNew} className="bg-gradient-neon">
                <Plus className="w-4 h-4 mr-2" /> Nuevo Vehículo
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={logout}>
              <LogOut className="w-4 h-4 mr-2" /> Salir
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-7xl px-4 py-8">
        {showForm ? (
          <AdminVehiculoForm
            vehiculo={editingVehiculo}
            onSave={handleSave}
            onCancel={() => { setShowForm(false); setEditingVehiculo(null); }}
            uploadImage={uploadImage}
          />
        ) : (
          <AdminVehiculosList
            vehiculos={vehiculos}
            loading={loading}
            onEdit={handleEdit}
            onDelete={deleteVehiculo}
            onToggleDestacado={toggleDestacado}
            onTogglePausado={togglePausado}
          />
        )}
      </main>
    </div>
  );
};

export default Admin;
