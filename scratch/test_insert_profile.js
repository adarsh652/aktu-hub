import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ygrezvktmpohyenlthwy.supabase.co";
const supabaseAnonKey = "sb_publishable_HLX4AS5d4l613o4w4DgbDA_fUw4HOlY";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testInsert() {
  const testId = "00000000-0000-0000-0000-000000000001"; // Mock UUID
  console.log("Attempting to insert test profile...");
  try {
    const { data, error } = await supabase
      .from("profiles")
      .insert([{
        id: testId,
        email: "test_oauth@domain.com",
        full_name: "Test OAuth User",
        branch_id: "CSE",
        current_semester: 1
      }])
      .select()
      .single();
    
    if (error) {
      console.error("Insert failed with error:", error);
    } else {
      console.log("Insert succeeded! Created profile:", data);
      
      // Clean up
      console.log("Cleaning up test profile...");
      const { error: deleteError } = await supabase
        .from("profiles")
        .delete()
        .eq("id", testId);
      
      if (deleteError) {
        console.error("Cleanup failed:", deleteError);
      } else {
        console.log("Cleanup succeeded.");
      }
    }
  } catch (err) {
    console.error("Execution failed:", err.message);
  }
}

testInsert();
