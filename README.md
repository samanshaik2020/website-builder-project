Concept & data format (how templates use placeholders).
UX flow.
A safe, minimal server implementation (/api/generate-template) that calls an LLM (example using OpenAI-compatible API).
Frontend components: AiButton.tsx (button + modal) and small glue to apply generated JSON into the editor state.
Example prompt template for generating the JSON from the LLM (copy/paste into the server).
TypeScript types and small validation/safety tips.
You can paste the files into your Next.js project (pages router). Replace the OpenAI call with whichever provider you use; keep the API key in .env.

1) Concept & placeholders
Template JSON (blocks) uses standard blocks (hero, features, pricing, footer). Each block has props fields such as heading, sub, items, etc.
To make templates AI-replacable, define a placeholder-aware template (developer template) — e.g. src/templates/saas-landing/template.json uses placeholders or default values:
{
  "meta": { "slug": "saas-landing", "name": "SaaS Landing" },
  "blocks": [
    { "id": "hero-1", "type": "hero", "props": { "heading": "{{product_name}} — Build fast", "sub": "{{product_tagline}}", "primaryCta": { "text": "{{cta_primary_text}}", "href": "#" } } },
    { "id": "features-1", "type": "features", "props": { "items": [ { "title": "{{feature_1_title}}", "desc": "{{feature_1_desc}}" }, { "title": "{{feature_2_title}}", "desc": "{{feature_2_desc}}" } ] } },
    { "id": "pricing-1", "type": "pricing", "props": { "plans": [ { "name": "Starter", "price": "$9/mo" }, { "name": "Pro", "price": "$49/mo" } ] } },
    { "id": "footer-1", "type": "footer", "props": { "copyright": "© {{company}} {{year}}" } }
  ]
}

The AI generator returns a fully resolved JSON where placeholders are replaced with generated text and images (image URLs optionally returned). Example prompt input "iphone" should produce product-specific texts like "heading": "iPhone — Capture Tomorrow", etc.

2) UX Flow
User opens editor (editing a template).
They click AI button in the template toolbar. A modal opens with an input prompt: Describe what you want (e.g., 'iPhone product landing — clean, premium, highlight camera features').
User types iphone (or detailed text) and presses Generate.
Frontend POST /api/generate-template with body { templateSlug, seedText }.
Server builds an LLM prompt (structured) and calls LLM to generate JSON (strictly only JSON).
Server validates/parses the JSON, returns it.
Frontend replaces current editor JSON state with the returned JSON and displays a success toast; user can tweak & then Save.

3) Server: src/pages/api/generate-template.ts
Add this file. It calls an OpenAI-compatible API. Put your key in process.env.OPENAI_API_KEY.
// src/pages/api/generate-template.ts
import type { NextApiRequest, NextApiResponse } from "next";

type ReqBody = { templateSlug: string; seedText: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { templateSlug, seedText } = req.body as ReqBody;
  if (!templateSlug || !seedText) return res.status(400).json({ error: "templateSlug and seedText required" });

  try {
    // Build the LLM prompt using a template (see below)
    const prompt = buildPromptForTemplate(templateSlug, seedText);

    // Call the LLM — example with OpenAI REST Chat Completions
    const openAiKey = process.env.OPENAI_API_KEY;
    if (!openAiKey) return res.status(500).json({ error: "OpenAI API key not configured" });

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: Bearer ${openAiKey},
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",     // pick a model you have access to (or gpt-4o, gpt-4o-mini)
        messages: [
          { role: "system", content: "You are a JSON generator. Only output valid JSON and nothing else." },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 1200,
      }),
    });

    if (!response.ok) {
      const txt = await response.text();
      console.error("LLM error:", txt);
      return res.status(502).json({ error: "LLM provider error", detail: txt });
    }

    const data = await response.json();
    const raw = data?.choices?.[0]?.message?.content;
    if (!raw) return res.status(502).json({ error: "No content from LLM" });

    // Parse JSON robustly (LLMs sometimes add extra text)
    let generatedJson;
    try {
      // Attempt direct parse first
      generatedJson = JSON.parse(raw);
    } catch {
      // Try to extract the first JSON block from the response
      const jsonMatch = raw.match(/\{[\s\S]*\}$/m);
      if (jsonMatch) {
        generatedJson = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Could not parse JSON from LLM response");
      }
    }

    // Basic validation: must have blocks array
    if (!generatedJson?.blocks || !Array.isArray(generatedJson.blocks)) {
      return res.status(400).json({ error: "Generated JSON missing blocks array", sample: generatedJson });
    }

    // Optionally post-process: enforce IDs, sanitize text, limit length
    generatedJson.blocks = generatedJson.blocks.map((b: any, idx: number) => ({ id: b.id || ${b.type}-${idx}-${Date.now().toString(36)}, ...b }));

    return res.status(200).json({ json: generatedJson });
  } catch (err: any) {
    console.error("generate-template error:", err);
    return res.status(500).json({ error: err.message || String(err) });
  }
}

// Simple prompt builder — tailor these prompts to your templates
function buildPromptForTemplate(templateSlug: string, seedText: string) {
  // You can add more template-specific instructions
  const instructions = `
We have a block-based web template schema. You must return ONLY valid JSON (no markdown, no comments).
The JSON output must follow this shape:
{
  "meta": { "title": string, "slug": string },
  "blocks": [
    { "id": string, "type": "hero" | "features" | "pricing" | "footer" | "columns" | "image", "props": { ... }, "styles": { ... } },
    ...
  ]
}

For a ${templateSlug} template, produce a polished landing page JSON themed around: "${seedText}".
- Provide a strong hero with props.heading, props.sub, props.primaryCta (text, href).
- Provide a features block with 3 items (title, desc).
- Provide a pricing block with 2 plans (name, price, features[]).
- Provide a footer block with copyright.
- Use concise copy (6-12 words for hero heading, 10-25 words for hero sub).
- For image props, you may use placeholder image URLs like "https://images.example.com/iphone-hero.jpg". (Your UI can replace these with uploaded images later.)
- Ensure all text is safe and non-harmful.

Return only the JSON.
`;

  return instructions;
}

Notes:
Change model to whatever your account has.
Keep OPENAI_API_KEY in .env. Do not commit it.
Validate the returned JSON before using it in the editor.

4) Frontend: AiButton.tsx (Button + Modal + call to API)
Drop this in src/components/Editor/AiButton.tsx. It can be used in your editor toolbar or inside each template component.
// src/components/Editor/AiButton.tsx
import React, { useState } from "react";

type Props = {
  templateSlug: string;
  onGenerated: (generatedJson: any) => void; // callback to apply generated JSON
};

export default function AiButton({ templateSlug, onGenerated }: Props) {
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function generate() {
    setError(null);
    if (!prompt.trim()) { setError("Please describe what you want"); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/generate-template", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ templateSlug, seedText: prompt }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Generation failed");
      onGenerated(data.json);
      setOpen(false);
    } catch (err: any) {
      setError(err.message || String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="inline-block">
      <button
        onClick={() => setOpen(true)}
        className="bg-indigo-600 text-white px-3 py-1 rounded-md"
      >
        AI
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <h3 className="text-lg font-semibold">Generate with AI</h3>
            <p className="text-sm text-gray-600 mt-1">Describe what you want (e.g., "iPhone product page, premium, highlight camera").</p>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
              className="w-full mt-3 border rounded-md p-2"
              placeholder="Describe the product, tone, and highlights..."
            />
            {error && <div className="text-red-600 mt-2">{error}</div>}
            <div className="flex gap-2 mt-4 justify-end">
              <button onClick={() => setOpen(false)} className="px-3 py-1 border rounded">Cancel</button>
              <button onClick={generate} disabled={loading} className="px-3 py-1 rounded bg-indigo-600 text-white">
                {loading ? "Generating…" : "Generate"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

Usage inside your editor page (where you have json and setJson):
import AiButton from "components/Editor/AiButton";

// inside editor component render:
<AiButton templateSlug="saas-landing" onGenerated={(generatedJson) => {
  // Replace the entire project json or merge gently:
  setJson((prev) => ({ ...(generatedJson.meta ? { meta: generatedJson.meta } : {}), blocks: generatedJson.blocks }));
}} />


5) Example LLM prompt (what the server sends to LLM)
Use the prompt included in buildPromptForTemplate above. Example raw user instruction you might test:
Generate a saas-landing JSON page themed around "iPhone — premium product page focusing on camera, battery, and design". Output only valid JSON with meta and blocks (hero, features, pricing, footer). Use short copy for headings and 3 features.
The LLM should return JSON like:
{
  "meta": { "title": "iPhone — Capture Tomorrow", "slug": "iphone-landing" },
  "blocks": [
    {
      "id": "hero-1",
      "type": "hero",
      "props": {
        "heading": "iPhone — Capture Tomorrow",
        "sub": "The ultimate camera and battery experience packed in a sleek design.",
        "primaryCta": { "text": "Pre-order", "href": "/preorder" },
        "secondaryCta": { "text": "Watch demo", "href": "#demo" },
        "image": "https://images.example.com/iphone-hero.jpg"
      }
    },
    {
      "id": "features-1",
      "type": "features",
      "props": {
        "items": [
          { "title": "Pro Camera System", "desc": "Capture stunning photos with Night mode and ProRAW." },
          { "title": "All-day Battery", "desc": "Power through your day with optimized battery life." },
          { "title": "Sleek Design", "desc": "Precision-milled aluminum and ceramic shield." }
        ]
      }
    },
    {
      "id": "pricing-1",
      "type": "pricing",
      "props": {
        "plans": [
          { "name": "128GB", "price": "$799", "features": ["Base model", "Free shipping"] },
          { "name": "256GB", "price": "$999", "features": ["More storage", "Priority support"] }
        ]
      }
    },
    {
      "id": "footer-1",
      "type": "footer",
      "props": { "copyright": "© iPhone 2025" }
    }
  ]
}


6) Frontend: applying generated JSON safely
After receiving generatedJson, you can:
Replace entire editor state: setJson(generatedJson)
Or merge into the existing template to preserve layout: map through prev.blocks and replace matching block types with generated ones (preferred if you want to keep custom layout). Example merge:
function mergeGenerated(prevJson, generatedJson) {
  const outBlocks = prevJson.blocks.map((b) => {
    const replacement = generatedJson.blocks.find((gb) => gb.type === b.type);
    return replacement ? { ...b, props: { ...b.props, ...replacement.props } } : b;
  });

  // Add any generated blocks that didn't match types
  const missing = generatedJson.blocks.filter(gb => !outBlocks.some(ob => ob.type === gb.type));
  return { ...prevJson, blocks: [...outBlocks, ...missing] };
}

Use this when calling onGenerated so you don't lose user customizations like custom images or custom layout settings.

7) Types (small)
// src/types/index.ts
export type Block = {
  id: string;
  type: string;
  props?: Record<string, any>;
  styles?: Record<string, any>;
};

export type ProjectJson = {
  meta?: { title?: string; slug?: string };
  blocks: Block[];
};


8) Safety & best-practices
Validate LLM output server-side before returning it (check blocks present, text length limits).
Sanitize any HTML that might be injected (we only use plain text in props).
Rate-limit generation requests (prevent abuse).
Cost control: use a smaller model for quick drafts (gpt-4o-mini) and a better model for premium generation.
Revisions: let user revert — keep a backup of previous json so Generate is reversible (undo).
Image URLs: LLM may produce fake placeholder URLs; consider replacing them with permissive placeholder services (placehold.co) or supply your own assets.

9) Quick integration checklist (what to add to your editor)
Add AiButton on the editor toolbar and pass templateSlug and onGenerated.
Add /pages/api/generate-template.ts to the server (store API key in .env).
Ensure onGenerated merges or replaces the JSON in state and triggers autosave or shows a "Save" CTA.
Optionally add a "Revert" action to restore previous JSON before generation.

10) Example usage snippet (Editor page)
// inside editor component
const [json, setJson] = useState<ProjectJson>(initialJson);
const [backupJson, setBackupJson] = useState<ProjectJson | null>(null);

function handleGenerated(generated: ProjectJson) {
  setBackupJson(json); // allow revert
  const merged = mergeGenerated(json, generated); // or setJson(generated)
  setJson(merged);
  // optionally auto-save after generation
  // save();
}
...
<AiButton templateSlug="saas-landing" onGenerated={handleGenerated} />
<button onClick={() => backupJson && setJson(backupJson)}>Revert</button>


Done — summary
Add an AI button + modal to the editor.
Add POST /api/generate-template server route that constructs a safe JSON-only prompt and calls an LLM.
Merge or replace the editor JSON with the returned JSON.
Provide undo/backup and validation.
If you want, I can:
generate the full src/pages/api/generate-template.ts and src/components/Editor/AiButton.tsx files for you to paste, or
produce a worked example where I show the template JSON before and after the AI replace for the saas-landing template with the seed "iphone"