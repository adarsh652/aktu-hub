import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ygrezvktmpohyenlthwy.supabase.co";
const supabaseAnonKey = "sb_publishable_HLX4AS5d4l613o4w4DgbDA_fUw4HOlY";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testBranches() {
  console.log("Querying branches table...");
  try {
    const { data, error } = await supabase
      .from("branches")
      .select("*");
    
    if (error) {
      console.error("Query failed with error:", error);
    } else {
      console.log("Query succeeded! Retrieved branches:", data);
    }
  } catch (err) {
    console.error("Execution failed:", err.message);
  }
}

testBranches();
