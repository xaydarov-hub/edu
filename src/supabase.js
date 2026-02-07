// src/supabase.js
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://zktikivlkyhbflcoxlmv.supabase.co"; // sening project URL
const SUPABASE_ANON_KEY = "sb_publishable_5Mfoe2g6SGbX9GSj4LWZnA_EDRzWIW_"; // sening public anon key

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
