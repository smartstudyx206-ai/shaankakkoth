// Lovable Cloud function: Chat + optional code artifacts (Arduino/web)
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

type ReqBody = {
  message?: string;
  conversationId?: string;
  activeFile?: { path?: string; language?: string; content?: string };
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body = (await req.json().catch(() => ({}))) as ReqBody;
    const userMessage = (body.message ?? "").toString();
    const activePath = body.activeFile?.path ?? "";
    const activeLang = body.activeFile?.language ?? "";

    if (!userMessage.trim()) {
      return new Response(JSON.stringify({ message: "Please enter a message." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ message: "AI is not configured." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const system = `You are Faraday, an AI that generates web app code and Arduino sketches.

Return ONLY valid JSON (no markdown) with this schema:
{
  "message": string,
  "files": [
    {"path": string, "language": "tsx"|"typescript"|"json"|"markdown"|"arduino"|"text", "content": string}
  ]
}

Rules:
- If the user asks for Arduino code, create or update an .ino file under arduino/ (e.g. arduino/main.ino) with complete compilable sketch.
- If not Arduino, do not invent lots of files; only include files when explicitly requested.
- Keep paths simple and deterministic.
`;

    const prompt = `User message: ${userMessage}

Current active file: ${activePath} (${activeLang})
`;

    const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: system },
          { role: "user", content: prompt },
        ],
      }),
    });

    if (!resp.ok) {
      const t = await resp.text();
      const status = resp.status;
      const msg = status === 429
        ? "Rate limit exceeded. Please try again in a moment."
        : status === 402
          ? "AI usage limit reached. Please add credits to continue."
          : "AI request failed.";
      console.error("ai gateway error", status, t);
      return new Response(JSON.stringify({ message: msg }), {
        status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await resp.json();
    const raw = data?.choices?.[0]?.message?.content;

    // Model is instructed to return JSON only.
    try {
      const parsed = JSON.parse(raw);
      return new Response(JSON.stringify(parsed), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    } catch (e) {
      console.error("failed to parse model json", e, raw);
      return new Response(JSON.stringify({ message: typeof raw === "string" ? raw : "(no response)" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  } catch (e) {
    console.error("chat function error", e);
    return new Response(JSON.stringify({ message: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
