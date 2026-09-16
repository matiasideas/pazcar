import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface VehiculoDB {
  id: string;
  marca: string;
  modelo: string;
  año: number;
  kilometraje: number;
  combustible: string;
  transmision: string;
  color: string | null;
  puertas: number | null;
  precio: number;
  moneda: string;
  descripcion: string | null;
  categoria: string;
  estado: string;
  equipamiento: string | null;
  destacado: boolean;
  pausado: boolean;
  imagen_url: string | null;
  imagenes_urls: string[];
  created_at: string;
  updated_at: string;
}

const callAdmin = async (
  password: string,
  action: string,
  method: string,
  body?: any,
  params?: Record<string, string>
) => {
  const queryParams = new URLSearchParams({ action, ...params });
  const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-vehiculos?${queryParams}`;

  const options: RequestInit = {
    method,
    headers: {
      'x-admin-password': password,
      'Content-Type': 'application/json',
    },
  };

  if (body) options.body = JSON.stringify(body);

  const res = await fetch(url, options);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Error del servidor');
  return data;
};

export const useVehiculosAdmin = (getPassword: () => string) => {
  const [vehiculos, setVehiculos] = useState<VehiculoDB[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchVehiculos = useCallback(async () => {
    setLoading(true);
    try {
      const data = await callAdmin(getPassword(), 'list', 'GET');
      setVehiculos(data);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }, [getPassword]);

  const createVehiculo = useCallback(async (vehiculo: Partial<VehiculoDB>) => {
    try {
      await callAdmin(getPassword(), 'create', 'POST', vehiculo);
      toast.success('Vehículo creado');
      await fetchVehiculos();
    } catch (err: any) {
      toast.error(err.message);
    }
  }, [getPassword, fetchVehiculos]);

  const updateVehiculo = useCallback(async (vehiculo: Partial<VehiculoDB> & { id: string }) => {
    try {
      await callAdmin(getPassword(), 'update', 'POST', vehiculo);
      toast.success('Vehículo actualizado');
      await fetchVehiculos();
    } catch (err: any) {
      toast.error(err.message);
    }
  }, [getPassword, fetchVehiculos]);

  const deleteVehiculo = useCallback(async (id: string) => {
    try {
      await callAdmin(getPassword(), 'delete', 'POST', undefined, { id });
      toast.success('Vehículo eliminado');
      await fetchVehiculos();
    } catch (err: any) {
      toast.error(err.message);
    }
  }, [getPassword, fetchVehiculos]);

  const toggleDestacado = useCallback(async (id: string, destacado: boolean) => {
    try {
      await callAdmin(getPassword(), 'update', 'POST', { id, destacado });
      setVehiculos(prev => prev.map(v => v.id === id ? { ...v, destacado } : v));
      toast.success(destacado ? 'Marcado como destacado' : 'Quitado de destacados');
    } catch (err: any) {
      toast.error(err.message);
    }
  }, [getPassword]);

  const togglePausado = useCallback(async (id: string, pausado: boolean) => {
    try {
      await callAdmin(getPassword(), 'update', 'POST', { id, pausado });
      setVehiculos(prev => prev.map(v => v.id === id ? { ...v, pausado } : v));
      toast.success(pausado ? 'Vehículo pausado' : 'Vehículo activado');
    } catch (err: any) {
      toast.error(err.message);
    }
  }, [getPassword]);

  // Devuelve la ruta del archivo dentro del bucket (ej: vehiculos/uuid.webp)
  const uploadImage = useCallback(async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);

    const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-vehiculos?action=upload`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'x-admin-password': getPassword() },
      body: formData,
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data.ruta;
  }, [getPassword]);

  return {
    vehiculos,
    loading,
    fetchVehiculos,
    createVehiculo,
    updateVehiculo,
    deleteVehiculo,
    toggleDestacado,
    togglePausado,
    uploadImage,
  };
};
