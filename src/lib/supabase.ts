import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

const REMEMBER_KEY = 'toasttap_session';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: false },
});

export async function tryRestoreSession() {
  const stored = localStorage.getItem(REMEMBER_KEY);
  if (!stored) return null;
  try {
    const { access_token, refresh_token } = JSON.parse(stored);
    const { data, error } = await supabase.auth.setSession({ access_token, refresh_token });
    if (error) { localStorage.removeItem(REMEMBER_KEY); return null; }
    return data.session;
  } catch {
    localStorage.removeItem(REMEMBER_KEY);
    return null;
  }
}

export async function signInUser(username: string, password: string, rememberMe: boolean) {
  const email = `${username.toLowerCase().trim()}@toasttap.game`;
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    if (error.message.toLowerCase().includes('invalid')) return { error: 'Wrong username or password.' };
    return { error: error.message };
  }
  if (rememberMe && data.session) {
    localStorage.setItem(REMEMBER_KEY, JSON.stringify({
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
    }));
  }
  return { data };
}

export async function registerUser(username: string, password: string) {
  const trimmed = username.toLowerCase().trim();
  const email = `${trimmed}@toasttap.game`;
  const { data: existing } = await supabase
    .from('profiles')
    .select('id')
    .eq('username', trimmed)
    .maybeSingle();
  if (existing) return { error: 'Username already taken. Choose another.' };
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) return { error: error.message };
  if (!data.user) return { error: 'Registration failed, try again.' };
  await supabase.from('profiles').insert({ id: data.user.id, username: trimmed });
  return { data };
}

export async function signOutUser() {
  localStorage.removeItem(REMEMBER_KEY);
  await supabase.auth.signOut();
}
