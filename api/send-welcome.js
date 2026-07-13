export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, fullName } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    return res.status(500).json({ error: "Resend API key is not configured on the server." });
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Welcome to UniVault</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background-color: #f9fafb;
            color: #111827;
            margin: 0;
            padding: 40px 20px;
          }
          .container {
            max-width: 560px;
            background-color: #ffffff;
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            padding: 32px;
            margin: 0 auto;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          }
          .logo {
            font-weight: 800;
            font-size: 20px;
            letter-spacing: -0.025em;
            margin-bottom: 24px;
            color: #111827;
          }
          .logo span {
            background-color: #111111;
            color: #ffffff;
            padding: 4px 8px;
            border-radius: 6px;
            margin-right: 4px;
          }
          h1 {
            font-size: 22px;
            font-weight: 700;
            margin-top: 0;
            margin-bottom: 16px;
          }
          p {
            font-size: 15px;
            line-height: 1.6;
            color: #4b5563;
            margin-bottom: 24px;
          }
          .btn {
            display: inline-block;
            background-color: #111111;
            color: #ffffff !important;
            text-decoration: none;
            padding: 12px 24px;
            font-size: 14px;
            font-weight: 600;
            border-radius: 8px;
            margin-bottom: 24px;
          }
          .footer {
            border-top: 1px solid #e5e7eb;
            padding-top: 20px;
            font-size: 12px;
            color: #9ca3af;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="logo"><span>UniVault</span></div>
          <h1>Welcome to UniVault, ${fullName || "Student"}!</h1>
          <p>We are thrilled to welcome you. UniVault is your premium repository for Dr. A.P.J. Abdul Kalam Technical University (AKTU) study resources, hand-written notes, and end-semester past papers (PYQs).</p>
          <p>Here is what you can do right now:</p>
          <ul style="font-size: 15px; color: #4b5563; padding-left: 20px; margin-bottom: 24px; line-height: 1.6;">
            <li>Calculate your SGPA/CGPA with preloaded AKTU credit weights.</li>
            <li>Back up and sync your grades to the cloud to visualize your trajectory.</li>
            <li>Download lecture notes, PYQs, and syllabi for your subjects.</li>
          </ul>
          <a href="https://aktu-hub-six.vercel.app/" class="btn" style="color: white !important;">Explore Dashboard</a>
          <div class="footer">
            <p style="margin: 0; font-size: 11px; color: #9ca3af;">Made with ❤️ by Adarsh. Sent via UniVault platform.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "UniVault <onboarding@resend.dev>",
        to: [email],
        subject: "Welcome to UniVault!",
        html: htmlContent,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({ error: data.message || "Failed to send email" });
    }

    return res.status(200).json({ success: true, messageId: data.id });
  } catch (err) {
    return res.status(500).json({ error: err.message || "Internal server error" });
  }
}
