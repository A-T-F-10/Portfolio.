/* ============================================
   RESEND EMAIL API — Vercel Serverless Function
   Handles contact form submissions
   ============================================ */

export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: ["a.addam710@gmail.com"],
        subject: `Portfolio: ${subject}`,
        html: `
          <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; border-radius: 16px; overflow: hidden; border: 1px solid rgba(175,54,137,0.3);">
            <div style="background: linear-gradient(135deg, #af3689, #516987); padding: 30px; text-align: center;">
              <h1 style="color: #eef5f2; margin: 0; font-size: 24px;">📬 New Contact Message</h1>
            </div>
            <div style="padding: 30px; color: #eef5f2;">
              <div style="background: rgba(255,255,255,0.06); border-radius: 12px; padding: 20px; margin-bottom: 20px; border: 1px solid rgba(255,255,255,0.1);">
                <p style="margin: 8px 0;"><strong style="color: #af3689;">Name:</strong> ${name}</p>
                <p style="margin: 8px 0;"><strong style="color: #af3689;">Email:</strong> <a href="mailto:${email}" style="color: #516987;">${email}</a></p>
                <p style="margin: 8px 0;"><strong style="color: #af3689;">Subject:</strong> ${subject}</p>
              </div>
              <div style="background: rgba(255,255,255,0.06); border-radius: 12px; padding: 20px; border: 1px solid rgba(255,255,255,0.1);">
                <h3 style="color: #af3689; margin-top: 0;">Message:</h3>
                <p style="line-height: 1.6; white-space: pre-wrap;">${message}</p>
              </div>
              <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 25px 0;">
              <p style="font-size: 12px; color: rgba(238,245,242,0.5); text-align: center;">
                Sent from your portfolio contact form — atif.dev
              </p>
            </div>
          </div>
        `,
        reply_to: email,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Resend error:", data);
      return res.status(500).json({ error: "Failed to send email" });
    }

    return res.status(200).json({ success: true, id: data.id });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
