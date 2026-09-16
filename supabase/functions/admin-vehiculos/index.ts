import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-admin-password",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const url = new URL(req.url);
  const action = url.searchParams.get("action");

  // Public endpoint: sirve una foto del bucket privado (catálogo sin login)
  if (req.method === "GET" && action === "imagen") {
    const ruta = url.searchParams.get("ruta");
    if (!ruta || ruta.includes("..") || !/^[A-Za-z0-9][A-Za-z0-9._/-]*$/.test(ruta)) {
      return new Response(JSON.stringify({ error: "Ruta inválida" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const supabasePublic = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );
    const { data, error } = await supabasePublic
      .storage
      .from("vehiculos")
      .download(ruta);
    if (error || !data) {
      return new Response(JSON.stringify({ error: "Imagen no encontrada" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    return new Response(data, {
      headers: {
        ...corsHeaders,
        "Content-Type": data.type || "image/webp",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  }

  // Validate admin password
  const password = req.headers.get("x-admin-password");
  const adminPassword = Deno.env.get("ADMIN_PASSWORD");

  if (!password || !adminPassword || password !== adminPassword) {
    return new Response(JSON.stringify({ error: "Contraseña incorrecta" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  try {
    // LIST VEHICULOS
    if (req.method === "GET" && action === "list") {
      const { data, error } = await supabase
        .from("vehiculos")
        .select("*")
        .order("destacado", { ascending: false })
        .order("created_at", { ascending: false });
      if (error) throw error;
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // CREATE VEHICULO
    if (req.method === "POST" && action === "create") {
      const body = await req.json();
      const { data, error } = await supabase
        .from("vehiculos")
        .insert(body)
        .select()
        .single();
      if (error) throw error;
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // UPDATE VEHICULO
    if (req.method === "POST" && action === "update") {
      const body = await req.json();
      const { id, ...rest } = body;
      const { data, error } = await supabase
        .from("vehiculos")
        .update(rest)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // DELETE VEHICULO
    if (req.method === "POST" && action === "delete") {
      const id = url.searchParams.get("id");
      if (!id) throw new Error("Falta el id");
      const { error } = await supabase.from("vehiculos").delete().eq("id", id);
      if (error) throw error;
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // UPLOAD IMAGEN (bucket privado, devuelve la ruta)
    if (req.method === "POST" && action === "upload") {
      const formData = await req.formData();
      const file = formData.get("file") as File;
      if (!file) throw new Error("No se recibió ningún archivo");

      const ext = file.name.split(".").pop()?.toLowerCase() || "webp";
      const fileName = `${crypto.randomUUID()}.${ext}`;
      const filePath = `vehiculos/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("vehiculos")
        .upload(filePath, file, { contentType: file.type, upsert: false });

      if (uploadError) throw uploadError;

      return new Response(JSON.stringify({ ruta: filePath }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Acción inválida" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
