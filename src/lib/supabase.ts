import { createClient } from '@supabase/supabase-js';

const rawUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseUrl = (rawUrl && (rawUrl.startsWith('http://') || rawUrl.startsWith('https://')))
  ? rawUrl
  : 'https://placeholder.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'placeholder-anon-key';

export const isSupabaseConfigured = Boolean(
  rawUrl &&
  (rawUrl.startsWith('http://') || rawUrl.startsWith('https://')) &&
  !rawUrl.includes('placeholder') &&
  (import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY) &&
  import.meta.env.VITE_SUPABASE_ANON_KEY !== 'YOUR_SUPABASE_ANON_KEY'
);

if (!isSupabaseConfigured) {
  console.warn(
    '[NotesHub] Supabase environment variables are missing or unconfigured. Configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);

