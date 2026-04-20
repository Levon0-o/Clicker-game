import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase, tryRestoreSession, signInUser, registerUser, signOutUser } from '../lib/supabase';

export interface AuthState {
  user: User | null;
  username: string | null;
  loading: boolean;
}

export function useAuth() {
  const [auth, setAuth] = useState<AuthState>({ user: null, username: null, loading: true });

  useEffect(() => {
    (async () => {
      const session = await tryRestoreSession();
      if (session?.user) {
        const username = await fetchUsername(session.user.id);
        setAuth({ user: session.user, username, loading: false });
      } else {
        setAuth({ user: null, username: null, loading: false });
      }
    })();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      (async () => {
        if (session?.user) {
          const username = await fetchUsername(session.user.id);
          setAuth({ user: session.user, username, loading: false });
        } else {
          setAuth({ user: null, username: null, loading: false });
        }
      })();
    });

    return () => subscription.unsubscribe();
  }, []);

  async function fetchUsername(userId: string): Promise<string | null> {
    const { data } = await supabase
      .from('profiles')
      .select('username')
      .eq('id', userId)
      .maybeSingle();
    return data?.username ?? null;
  }

  async function login(username: string, password: string, rememberMe: boolean): Promise<{ error?: string }> {
    if (!username.trim() || !password) return { error: 'Fill in all fields.' };
    const result = await signInUser(username, password, rememberMe);
    if (result.error) return { error: result.error };
    return {};
  }

  async function register(username: string, password: string, confirmPassword: string): Promise<{ error?: string }> {
    const trimmed = username.toLowerCase().trim();
    if (trimmed.length < 2 || trimmed.length > 20) return { error: 'Username must be 2-20 characters.' };
    if (!/^[a-zA-Z0-9_]+$/.test(trimmed)) return { error: 'Only letters, numbers, and underscores.' };
    if (password.length < 6) return { error: 'Password must be at least 6 characters.' };
    if (password !== confirmPassword) return { error: 'Passwords do not match.' };
    const result = await registerUser(trimmed, password);
    if (result.error) return { error: result.error };
    const loginResult = await signInUser(trimmed, password, false);
    if (loginResult.error) return { error: loginResult.error };
    return {};
  }

  async function logout() {
    await signOutUser();
  }

  return { ...auth, login, register, logout };
}
