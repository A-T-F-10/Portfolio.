/* ============================================
   RESEND EMAIL API — Vercel Serverless Function
   ============================================ */

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": "Bearer re_f6C4Wz3S_33MYgkKLvZVNsydgyNpmyKz8",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Portfolio <onboarding@resend.dev>",
        to: ["rrooro710@gmail.com"],
        subject: `[Portfolio] ${subject}`,
        html: `
          <div style="font-family:Inter,Arial,sans-serif;max-width:600px;margin:0 auto;padding:32px;background:#09090b;border-radius:12px;border:1px solid #27272a;">
            <h2 style="color:#fafafa;margin:0 0 24px;">New message from your portfolio</h2>
            <table style="width:100%;border-collapse:collapse;color:#a1a1aa;font-size:14px;">
              <tr><td style="padding:8px 0;color:#71717a;">Name</td><td style="padding:8px 0;color:#fafafa;">${name}</td></tr>
              <tr><td style="padding:8px 0;color:#71717a;">Email</td><td style="padding:8px 0;"><a href="mailto:${email}" style="color:#a855f7;">${email}</a></td></tr>
              <tr><td style="padding:8px 0;color:#71717a;">Subject</td><td style="padding:8px 0;color:#fafafa;">${subject}</td></tr>
            </table>
            <div style="margin-top:24px;padding:20px;background:#18181b;border-radius:8px;border:1px solid #27272a;">
              <p style="color:#a1a1aa;margin:0 0 8px;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Message</p>
              <p style="color:#fafafa;line-height:1.6;white-space:pre-wrap;margin:0;">${message}</p>
            </div>
          </div>
        `,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return res.status(200).json({ success: true, id: data.id });
    } else {
      return res.status(500).json({ error: data.message || "Failed to send" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
}
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
