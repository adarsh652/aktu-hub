import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ygrezvktmpohyenlthwy.supabase.co";
const supabaseAnonKey = "sb_publishable_HLX4AS5d4l613o4w4DgbDA_fUw4HOlY";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  console.log("Connecting to Supabase...");
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .limit(5);
    
    if (error) {
      console.error("Query failed with error:", error);
    } else {
      console.log("Query succeeded! Retrieved profiles:", data);
    }
  } catch (err) {
    console.error("Execution failed:", err.message);
  }
}

testConnection();
