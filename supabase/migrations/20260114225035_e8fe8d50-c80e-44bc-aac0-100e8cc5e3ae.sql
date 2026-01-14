-- Remove the public SELECT policy that exposes customer PII
DROP POLICY IF EXISTS "Permitir leer consultas" ON public.consultas_vehiculos;