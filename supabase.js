import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const SUPABASE_URL = "https://hcybymfyppvifqtfxbpp.supabase.co";

const SUPABASE_ANON_KEY = "sb_publishable_rXohPTg3ShBgr5lykvfGBA_wC6kOnwo";

export const supabase = createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);