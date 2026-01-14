-- Create table for vehicle consultation leads
CREATE TABLE public.consultas_vehiculos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  vehiculo_marca TEXT NOT NULL,
  vehiculo_modelo TEXT NOT NULL,
  vehiculo_año INTEGER NOT NULL,
  nombre_cliente TEXT NOT NULL,
  whatsapp_cliente TEXT NOT NULL,
  tipo_consulta TEXT NOT NULL CHECK (tipo_consulta IN ('contado', 'financiado', 'parte_pago')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.consultas_vehiculos ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert (public form)
CREATE POLICY "Permitir insertar consultas públicas" 
ON public.consultas_vehiculos 
FOR INSERT 
WITH CHECK (true);

-- Create policy to allow reading (for admin purposes later)
CREATE POLICY "Permitir leer consultas" 
ON public.consultas_vehiculos 
FOR SELECT 
USING (true);