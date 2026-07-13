import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch profile details
  const fetchProfile = async (userId, userEmail, userMetadata = null) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();
      
      if (data) {
        setProfile(data);
      } else if (error) {
        // If profile doesn't exist, we can create a default one
        if (error.code === "PGRST116" || !data) {
          const oauthName = userMetadata?.full_name || userMetadata?.name || "";
          const { data: newProfile, error: createError } = await supabase
            .from("profiles")
            .insert([{ id: userId, email: userEmail || "", full_name: oauthName, branch_id: "CSE", current_semester: 1 }])
            .select()
            .single();
          if (createError) console.error("Error creating default profile:", createError.message);
          if (newProfile) setProfile(newProfile);
        } else {
          console.error("Error fetching profile:", error.message);
        }
      }
    } catch (err) {
      console.error("Profile fetch error:", err);
    }
  };

  useEffect(() => {
    // 1. Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        fetchProfile(currentUser.id, currentUser.email, currentUser.user_metadata);
      }
      setLoading(false);
    });

    // 2. Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        fetchProfile(currentUser.id, currentUser.email, currentUser.user_metadata);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Sign Up function
  const signUp = async (email, password, fullName) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName
        }
      }
    });
    
    if (error) throw error;
    
    // Upsert profile (overwriting any race-condition blank row inserted by the listener)
    if (data?.user) {
      const { data: newProfile, error: profileError } = await supabase
        .from("profiles")
        .upsert({
          id: data.user.id,
          email,
          full_name: fullName,
          branch_id: "CSE",
          current_semester: 1,
        })
        .select()
        .single();
      
      if (profileError) {
        console.error("Error upserting profile:", profileError.message);
      } else if (newProfile) {
        setProfile(newProfile);
      }
    }
    return data;
  };

  // Sign In function
  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  };

  // Sign In with Google
  const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + "/dashboard",
      },
    });
    if (error) throw error;
    return data;
  };

  // Sign Out function
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  // Update profile in database
  const updateProfile = async (updates) => {
    if (!user) return;
    const { data, error } = await supabase
      .from("profiles")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id)
      .select()
      .single();
    
    if (error) throw error;
    if (data) setProfile(data);
    return data;
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, signUp, signIn, signInWithGoogle, signOut, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
