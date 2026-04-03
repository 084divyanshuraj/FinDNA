import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://flnjvwbowgiotckjgzlx.supabase.co';
// WARNING: Replace this string with your actual 'anon' public key from Supabase Dashboard -> Configuration -> API Keys
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'Aapki_Lambi_Anon_Key_Yaha_Paste_Karein';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
