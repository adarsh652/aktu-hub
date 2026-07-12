import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabaseClient = null;

if (supabaseUrl && supabaseAnonKey) {
  try {
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
  } catch (err) {
    console.error("Supabase initialization error:", err.message);
  }
}

// Fallback Proxy to prevent blank screen crashes when keys are missing in Vercel
if (!supabaseClient) {
  console.warn(
    "Supabase environment variables are missing! " +
    "Running in offline fallback mode. " +
    "Please configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Vercel settings."
  );

  const noopPromise = () => Promise.resolve({ data: null, error: new Error("Supabase is not initialized") });

  const dummyHandler = {
    get(target, prop) {
      if (prop === "auth") {
        return {
          onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
          getSession: () => Promise.resolve({ data: { session: null } }),
          signUp: noopPromise,
          signInWithPassword: noopPromise,
          signOut: noopPromise,
          updateUser: noopPromise
        };
      }
      if (prop === "from") {
        return () => ({
          select: () => ({
            eq: () => Promise.resolve({ data: [], error: null }),
            ilike: () => ({ maybeSingle: () => Promise.resolve({ data: null, error: null }) }),
          }),
          insert: noopPromise,
          upsert: noopPromise,
          delete: () => ({
            eq: () => ({
              eq: noopPromise
            })
          })
        });
      }
      return noopPromise;
    }
  };

  supabaseClient = new Proxy({}, dummyHandler);
}

export const supabase = supabaseClient;
