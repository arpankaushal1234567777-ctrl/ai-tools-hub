import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL ?? 'https://clogfmkcggaxuqiuavys.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY ?? 'sb_publishable_gGMDVMcQbjBpECldJbUvXQ_qPPAbDg6';

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.error(
    '[Supabase] Missing env vars: VITE_SUPABASE_URL and/or VITE_SUPABASE_ANON_KEY. ' +
      'Using fallback values for local development, but set these variables in your .env or Vercel settings.'
  );
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
