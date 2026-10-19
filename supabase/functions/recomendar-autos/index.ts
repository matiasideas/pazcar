import { createOpenAI } from "npm:@ai-sdk/openai";
import { streamText } from "npm:ai";
import { createClient } from "npm:@supabase/supabase-js@2";
import { createLovableAiGatewayRunIdFetch, getLovableAiGatewayRunId } from "../_shared/run-id.ts";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-lovable-aig-run-id",
  "Access-Control-Expose-Headers": "X-Lovable-AIG-Run-ID",
};
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });
  try {
    const { consulta } = await req.json().catch(() => ({}));
    if (typeof consulta !== "string" || consulta.trim().length < 3 || consulta.length > 1000) {
      return json({ error: "Contanos con algunas palabras qué auto buscás." }, 400);
    }
    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) return json({ error: "El recomendador no está configurado." }, 500);

    const sb = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const { data: autos, error } = await sb
      .from("vehiculos")
      .select("id, marca, modelo, año, kilometraje, combustible, precio, moneda, categoria, descripcion")
      .eq("pausado", false);
    if (error) throw error;

    const catalogo = (autos || [])
      .map((a) =>
        `${a.id} | ${a.marca} ${a.modelo} | ${a.año} | ${a.kilometraje} km | ${a.combustible} | ${a.categoria} | ${a.moneda} ${a.precio}${a.descripcion ? ` | ${String(a.descripcion).slice(0, 200)}` : ""}`
      )
      .join("\n");

    const runIdFetch = createLovableAiGatewayRunIdFetch(getLovableAiGatewayRunId(req));
    const provider = createOpenAI({
      baseURL: "https://ai.gateway.lovable.dev/v1",
      apiKey,
      headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
      fetch: runIdFetch.fetch,
    });

    let errorStream: unknown = null;
    const result = streamText({
      onError: ({ error }) => { errorStream = error; },
      model: provider.responses("openai/gpt-6-astra"),
      system:
        "Sos un asesor de una concesionaria de autos usados en Argentina (PazCar). Recomendá hasta 4 autos SOLO del catálogo dado que mejor se ajusten a lo que pide el comprador (presupuesto, uso, tamaño, combustible, año, km). Respondé ÚNICAMENTE con un JSON válido con esta forma: {\"resumen\": string, \"recomendaciones\": [{\"id\": string, \"motivo\": string}]}. Escribí en español rioplatense, breve y claro. 'motivo' en 1-2 oraciones. Si nada encaja, devolvé recomendaciones vacías y explicá en resumen.",
      messages: [{ role: "user", content: `Catálogo (id | auto | año | km | combustible | categoría | precio | descripción):\n${catalogo}\n\nLo que busca el comprador:\n${consulta.trim()}` }],
      abortSignal: req.signal,
      providerOptions: {
        openai: {
          store: false,
          forceReasoning: true,
          reasoningEffort: "low",
          reasoningSummary: "auto",
          include: ["reasoning.encrypted_content"],
        },
      },
    });

    let texto = "";
    try {
      texto = await result.text;
    } catch (e) {
      const status = ((errorStream ?? e) as { statusCode?: number })?.statusCode;
      if (status === 429) return json({ error: "Hay muchas consultas en este momento. Probá de nuevo en un rato." }, 429);
      if (status === 402) return json({ error: "El recomendador no está disponible por ahora." }, 402);
      if (status === 403) return json({ error: "El recomendador no está disponible por ahora." }, 403);
      throw e;
    }

    const match = texto.match(/\{[\s\S]*\}/);
    const parsed = match ? JSON.parse(match[0]) : { resumen: "", recomendaciones: [] };
    const ids = new Set((autos || []).map((a) => String(a.id)));
    const recomendaciones = (Array.isArray(parsed.recomendaciones) ? parsed.recomendaciones : [])
      .filter((r: { id?: unknown }) => ids.has(String(r?.id)))
      .slice(0, 4)
      .map((r: { id: unknown; motivo?: unknown }) => ({ id: String(r.id), motivo: String(r.motivo ?? "") }));

    const headers: Record<string, string> = {};
    const runId = runIdFetch.getRunId();
    if (runId) headers["X-Lovable-AIG-Run-ID"] = runId;
    return new Response(JSON.stringify({ resumen: String(parsed.resumen ?? ""), recomendaciones }), {
      headers: { ...cors, ...headers, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("recomendar-autos", e);
    return json({ error: "No pudimos generar recomendaciones. Probá de nuevo." }, 500);
  }
});
