async function testOAuthRedirect() {
  const url = "https://ygrezvktmpohyenlthwy.supabase.co/auth/v1/authorize?provider=google&redirect_to=https://aktu-hub-six.vercel.app/dashboard";
  
  console.log("Fetching authorization redirect from Supabase...");
  try {
    const response = await fetch(url, {
      redirect: "manual" // Prevent following the redirect to Google
    });
    
    const redirectUrl = response.headers.get("location");
    console.log("Redirect URL:", redirectUrl);
    
    if (redirectUrl) {
      const parsedUrl = new URL(redirectUrl);
      const clientId = parsedUrl.searchParams.get("client_id");
      console.log("\n--- CONFIGURATION CHECK ---");
      console.log("Client ID Supabase is sending to Google:");
      console.log(clientId);
      console.log("---------------------------\n");
    } else {
      console.log("No redirect Location header found. Status:", response.status);
    }
  } catch (err) {
    console.error("Failed to query auth redirect:", err.message);
  }
}

testOAuthRedirect();
