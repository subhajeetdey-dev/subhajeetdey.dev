export async function sendEmail(fromEmail: string): Promise<boolean> {
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: [import.meta.env.VITE_CONTACT_EMAIL],
        subject: "New Contact from Portfolio",
        html: `
                <div style="font-family: monospace; padding: 32px; background: #0a0a0a; color: #e4e4e7; border-radius: 12px;">
            <h2 style="color: #ef233c; margin-bottom: 8px;">// new message</h2>
            <p style="color: #71717a; margin-bottom: 24px;">Someone reached out via your portfolio.</p>
            <div style="background: #141414; padding: 16px; border-radius: 8px; border: 1px solid #1f1f1f;">
              <p style="margin: 0; color: #a1a1aa; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">From</p>
              <p style="margin: 4px 0 0; color: #fafafa; font-size: 16px;">${fromEmail}</p>
            </div>
            <p style="margin-top: 24px; color: #52525b; font-size: 12px;">
              Sent from subhajeetdey.dev portfolio contact form
            </p>
          </div>
                `,
        reply_to: fromEmail,
      }),
    });

    return res.ok;
  } catch {
    return false;
  }
}
