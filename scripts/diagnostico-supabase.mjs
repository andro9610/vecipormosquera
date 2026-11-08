import { readFileSync } from "node:fs";

const loadEnv = () => {
  try {
    process.loadEnvFile(".env.local");
  } catch {
    const content = readFileSync(".env.local", "utf8");

    for (const line of content.split(/\r?\n/)) {
      const match = line.match(/^\s*([^#=]+)=(.*)\s*$/);

      if (match) process.env[match[1].trim()] = match[2].trim();
    }
  }
};

loadEnv();

const url = process.env.VITE_SUPABASE_URL;
const key = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!url || !key) {
  console.error("Faltan VITE_SUPABASE_URL o VITE_SUPABASE_PUBLISHABLE_KEY en .env.local");
  process.exit(1);
}

const headers = {
  apikey: key,
  Authorization: `Bearer ${key}`,
};

const request = async (path) => {
  try {
    const response = await fetch(`${url}/rest/v1/${path}`, { headers });
    const text = await response.text();
    let body = text;

    try {
      body = JSON.parse(text);
    } catch {
      body = text;
    }

    return { status: response.status, ok: response.ok, body };
  } catch (error) {
    return { status: 0, ok: false, body: error.message };
  }
};

const print = (label, result) => {
  console.log(`\n=== ${label} ===`);
  console.log(`HTTP ${result.status}`);

  if (!result.ok) {
    console.log(JSON.stringify(result.body));
    return;
  }

  if (Array.isArray(result.body)) {
    console.log(`Filas: ${result.body.length}`);
    console.log(JSON.stringify(result.body.slice(0, 5), null, 2));
    return;
  }

  console.log(JSON.stringify(result.body, null, 2));
};

const run = async () => {
  print("forms", await request("forms?select=id,form_name&limit=10"));
  print("form_sections", await request("form_sections?select=id,id_form,section_name&limit=20"));
  print("form_suggestions", await request("form_suggestions?select=id,id_form,id_section,alias,text&limit=5"));
  print("counters", await request("counters?select=id,counter_name,quantity&limit=10"));

  const forms = await request("forms?select=id,form_name");

  if (!Array.isArray(forms.body)) return;

  for (const form of forms.body) {
    const sections = await request(`form_sections?select=id,section_name&id_form=eq.${form.id}`);
    const sectionNames = Array.isArray(sections.body) ? sections.body.map((section) => section.section_name) : [];

    console.log(`\nForm ${form.form_name} (id=${form.id}) secciones: ${JSON.stringify(sectionNames)}`);

    if (!Array.isArray(sections.body)) continue;

    for (const section of sections.body) {
      const suggestions = await request(
        `form_suggestions?select=alias,text&id_form=eq.${form.id}&id_section=eq.${section.id}&limit=3`,
      );
      const count = Array.isArray(suggestions.body) ? suggestions.body.length : 0;

      console.log(`  ${section.section_name}: ${count} sugerencias visibles`);
    }
  }

  const normalize = (value) => value.trim().toLowerCase();
  const revision = await request(`forms?select=id&form_name=eq.${normalize("SOLICITUD_REVISION")}`);

  if (Array.isArray(revision.body) && revision.body.length > 0) {
    const idForm = revision.body[0].id;
    const section = await request(
      `form_sections?select=id&id_form=eq.${idForm}&section_name=eq.${normalize("HECHOS")}`,
    );

    console.log(`\nForm revision normalizado: id=${idForm}`);

    if (Array.isArray(section.body) && section.body.length > 0) {
      print(
        "sugerencias revision/hechos normalizadas",
        await request(`form_suggestions?select=alias,text&id_form=eq.${idForm}&id_section=eq.${section.body[0].id}`),
      );
    }
  }

  print(
    "counter solicitud_revision normalizado",
    await request(`counters?select=counter_name,quantity&counter_name=eq.${normalize("SOLICITUD_REVISION")}`),
  );
};

run();
