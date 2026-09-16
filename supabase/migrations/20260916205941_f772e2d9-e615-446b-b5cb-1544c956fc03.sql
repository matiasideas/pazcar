CREATE TABLE public.vehiculos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  marca TEXT NOT NULL,
  modelo TEXT NOT NULL,
  año INTEGER NOT NULL,
  kilometraje INTEGER NOT NULL DEFAULT 0,
  combustible TEXT NOT NULL DEFAULT 'Nafta',
  transmision TEXT NOT NULL DEFAULT 'Manual',
  color TEXT,
  puertas INTEGER DEFAULT 5,
  precio NUMERIC NOT NULL,
  moneda TEXT NOT NULL DEFAULT 'USD',
  descripcion TEXT,
  categoria TEXT NOT NULL DEFAULT 'SUV',
  estado TEXT NOT NULL DEFAULT 'Usado',
  equipamiento TEXT,
  destacado BOOLEAN NOT NULL DEFAULT false,
  pausado BOOLEAN NOT NULL DEFAULT false,
  imagen_url TEXT,
  imagenes_urls TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT ON public.vehiculos TO anon, authenticated;
GRANT ALL ON public.vehiculos TO service_role;

ALTER TABLE public.vehiculos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Catalogo publico: leer autos activos"
ON public.vehiculos FOR SELECT
TO anon, authenticated
USING (pausado = false);

CREATE OR REPLACE FUNCTION public.update_vehiculos_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_vehiculos_updated_at
BEFORE UPDATE ON public.vehiculos
FOR EACH ROW
EXECUTE FUNCTION public.update_vehiculos_updated_at();