import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { vehiculo_marca, vehiculo_modelo, vehiculo_año, nombre_cliente, whatsapp_cliente, tipo_consulta } = await req.json();

    const GOOGLE_SHEETS_WEBHOOK_URL = Deno.env.get('GOOGLE_SHEETS_WEBHOOK_URL');

    if (!GOOGLE_SHEETS_WEBHOOK_URL) {
      console.log('GOOGLE_SHEETS_WEBHOOK_URL not configured, skipping sheets integration');
      return new Response(
        JSON.stringify({ success: true, message: 'Sheets not configured' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const tipoConsultaLabels: Record<string, string> = {
      contado: 'Compra de contado',
      financiado: 'Compra financiada',
      parte_pago: 'Auto como parte de pago',
    };

    // Enviar a Google Sheets via webhook (Google Apps Script o Make/Zapier)
    const response = await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fecha: new Date().toISOString(),
        vehiculo: `${vehiculo_marca} ${vehiculo_modelo} ${vehiculo_año}`,
        nombre: nombre_cliente,
        whatsapp: whatsapp_cliente,
        tipo_consulta: tipoConsultaLabels[tipo_consulta] || tipo_consulta,
      }),
    });

    if (!response.ok) {
      throw new Error(`Sheets webhook failed: ${response.status}`);
    }

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});