import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Vehiculo } from '@/data/vehiculos';
import { urlImagen } from '@/lib/imagenes';

interface VehiculoRow {
  id: string;
  marca: string;
  modelo: string;
  año: number;
  kilometraje: number;
  combustible: string;
  precio: number;
  moneda: string;
  categoria: string;
  destacado: boolean;
  pausado: boolean;
  imagen_url: string | null;
  imagenes_urls: string[] | null;
}

// Normaliza las categorías de la base a las categorías de la web
const normalizarCategoria = (categoria: string): string => {
  if (categoria === 'SUVs') return 'SUV';
  if (categoria === 'Pickups') return 'Camionetas';
  return categoria;
};

export const useCatalogo = () => {
  const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let vigente = true;

    const cargar = async () => {
      const { data, error } = await supabase
        .from('vehiculos')
        .select('id, marca, modelo, año, kilometraje, combustible, precio, moneda, categoria, destacado, pausado, imagen_url, imagenes_urls')
        .eq('pausado', false)
        .order('destacado', { ascending: false })
        .order('created_at', { ascending: false });

      if (!vigente) return;

      if (error) {
        console.error('Error cargando el catálogo:', error.message);
      } else {
        const filas = (data || []) as unknown as VehiculoRow[];
        setVehiculos(
          filas.map((f) => ({
            id: f.id,
            marca: f.marca,
            modelo: f.modelo,
            año: f.año,
            kilometraje: f.kilometraje,
            combustible: f.combustible,
            precio: Number(f.precio),
            imagen: urlImagen(f.imagen_url),
            imagenes: (f.imagenes_urls || []).map((a) => urlImagen(a)),
            categoria: normalizarCategoria(f.categoria),
            destacado: f.destacado,
            moneda: f.moneda === 'ARS' ? 'ARS' : 'USD',
          }))
        );
      }
      setLoading(false);
    };

    cargar();
    return () => { vigente = false; };
  }, []);

  return { vehiculos, loading };
};
