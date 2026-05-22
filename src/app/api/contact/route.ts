import { Resend } from "resend";
import { contactSchema } from "@/lib/validations";

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate with Zod — same schema as the frontend
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json(
        { error: "Invalid request", issues: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = parsed.data;

    const { error } = await resend.emails.send({
      from:    "Portfolio Contact <onboarding@resend.dev>",
      to:      "owoyeminiyi2@gmail.com",
      replyTo: email,
      subject: `[Portfolio] ${escapeHtml(subject)}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;">
          <h2 style="color:#7C3AED;margin-bottom:16px;">New Message from Portfolio</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:8px 0;color:#6B7280;font-size:14px;width:100px;">Name</td>
              <td style="padding:8px 0;font-weight:600;">${escapeHtml(name)}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#6B7280;font-size:14px;">Email</td>
              <td style="padding:8px 0;font-weight:600;">${escapeHtml(email)}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#6B7280;font-size:14px;">Subject</td>
              <td style="padding:8px 0;font-weight:600;">${escapeHtml(subject)}</td>
            </tr>
          </table>
          <hr style="margin:20px 0;border-color:#E5E7EB;" />
          <p style="color:#374151;line-height:1.7;white-space:pre-wrap;">${escapeHtml(message)}</p>
          <hr style="margin:20px 0;border-color:#E5E7EB;" />
          <p style="font-size:12px;color:#9CA3AF;">Sent from niyi-owoyemi.vercel.app</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json({ error: "Failed to send email" }, { status: 500 });
    }

    return Response.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Contact API error:", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
