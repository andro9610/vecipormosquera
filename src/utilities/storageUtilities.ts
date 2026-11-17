import { supabase } from "../services/supabaseClient";

export const PUBLIC_FILES_BUCKET = "public_files";

export const getPublicStorageUrl = (path: string) =>
  supabase.storage.from(PUBLIC_FILES_BUCKET).getPublicUrl(path).data.publicUrl;
