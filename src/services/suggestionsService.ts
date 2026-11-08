import { toDbKey } from "./keys";
import { supabase } from "./supabaseClient";

export type Suggestion = {
  alias: string;
  text: string;
};

export const fetchSuggestions = async (form: string, section: string): Promise<Suggestion[]> => {
  const { data: formRow, error: formError } = await supabase
    .from("forms")
    .select("id")
    .eq("form_name", toDbKey(form))
    .maybeSingle();

  if (formError) throw formError;
  if (!formRow) return [];

  const { data: sectionRow, error: sectionError } = await supabase
    .from("form_sections")
    .select("id")
    .eq("id_form", formRow.id)
    .eq("section_name", toDbKey(section))
    .maybeSingle();

  if (sectionError) throw sectionError;
  if (!sectionRow) return [];

  const { data, error } = await supabase
    .from("form_suggestions")
    .select("alias, text")
    .eq("id_form", formRow.id)
    .eq("id_section", sectionRow.id);

  if (error) throw error;

  return data ?? [];
};
