import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const RECIPIENT_PRIMARY = "shaikhnurul8200@gmail.com";
const RECIPIENT_SECONDARY = "shakhnurul8200@gmail.com";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, projectType, budget, message } = body;

    // Basic validation
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json({ success: false, error: "Please provide your name." }, { status: 400 });
    }

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ success: false, error: "Please provide a valid email address." }, { status: 400 });
    }

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json({ success: false, error: "Please write a brief message or project details." }, { status: 400 });
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanProjectType = projectType || "Full Stack App";
    const cleanBudget = budget || "Discuss Later";
    const cleanMessage = message.trim();

    // Unique reference ticket
    const ticketId = `#NRL-${Date.now().toString().slice(-6)}`;
    const submissionTime = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "short",
    });

    let deliveredVia = "";

    // 1. Check if direct Gmail SMTP credentials exist
    const gmailUser = process.env.GMAIL_USER || RECIPIENT_PRIMARY;
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

    if (gmailAppPassword) {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: gmailUser,
            pass: gmailAppPassword,
          },
        });

        const htmlContent = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 620px; margin: 0 auto; background-color: #0d1117; color: #e6edf3; border-radius: 12px; border: 1px solid #30363d; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
          <div style="background: linear-gradient(135deg, #059669, #10b981); padding: 24px; text-align: center;">
            <h1 style="margin: 0; font-size: 22px; color: #ffffff; letter-spacing: 0.5px;">✨ New Portfolio Inquiry</h1>
            <p style="margin: 6px 0 0 0; color: #d1fae5; font-size: 14px;">Nurul Shaikh Developer Platform • Ticket <strong>${ticketId}</strong></p>
          </div>
          
          <div style="padding: 28px;">
            <div style="margin-bottom: 24px; padding: 16px; background-color: #161b22; border-radius: 8px; border: 1px solid #21262d;">
              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr>
                  <td style="padding: 6px 0; color: #8b949e; width: 120px;">Client Name:</td>
                  <td style="padding: 6px 0; color: #58a6ff; font-weight: 600;">${cleanName}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #8b949e;">Client Email:</td>
                  <td style="padding: 6px 0;"><a href="mailto:${cleanEmail}" style="color: #10b981; text-decoration: none;">${cleanEmail}</a></td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #8b949e;">Project Scope:</td>
                  <td style="padding: 6px 0; color: #f0883e; font-weight: 600;">${cleanProjectType}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #8b949e;">Estimated Budget:</td>
                  <td style="padding: 6px 0; color: #3fb950; font-weight: 600;">${cleanBudget}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #8b949e;">Received At:</td>
                  <td style="padding: 6px 0; color: #c9d1d9;">${submissionTime} (IST)</td>
                </tr>
              </table>
            </div>

            <div style="margin-bottom: 24px;">
              <h3 style="margin: 0 0 10px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #8b949e;">Client Message</h3>
              <div style="background-color: #161b22; padding: 18px; border-radius: 8px; border-left: 4px solid #10b981; color: #f0f6fc; line-height: 1.6; white-space: pre-wrap; font-size: 15px;">${cleanMessage}</div>
            </div>

            <div style="text-align: center; margin-top: 30px;">
              <a href="mailto:${cleanEmail}?subject=Re: Inquiry ${ticketId} - Nurul Shaikh" style="display: inline-block; background-color: #10b981; color: #000000; font-weight: bold; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-size: 14px;">
                Reply Directly to ${cleanName}
              </a>
            </div>
          </div>
          
          <div style="background-color: #161b22; padding: 16px; text-align: center; font-size: 12px; color: #8b949e; border-top: 1px solid #21262d;">
            Delivered directly from Nurul Shaikh's Portfolio Engine (https://nurulshaikh.dev)
          </div>
        </div>
        `;

        await transporter.sendMail({
          from: `"Nurul Portfolio" <${gmailUser}>`,
          to: [RECIPIENT_PRIMARY, RECIPIENT_SECONDARY],
          replyTo: cleanEmail,
          subject: `[New Inquiry ${ticketId}] ${cleanName} - ${cleanProjectType}`,
          text: `New Inquiry ${ticketId}\n\nFrom: ${cleanName} (${cleanEmail})\nProject: ${cleanProjectType}\nBudget: ${cleanBudget}\nTime: ${submissionTime}\n\nMessage:\n${cleanMessage}`,
          html: htmlContent,
        });

        deliveredVia = "direct-smtp";
      } catch (smtpErr) {
        console.error("Nodemailer SMTP failed, falling back to FormSubmit relay:", smtpErr);
      }
    }

    // 2. Instant Zero-Config Fallback: FormSubmit Webhook API
    // If Nodemailer was not used or failed, send directly via FormSubmit to Gmail!
    if (!deliveredVia) {
      const formSubmitUrl = `https://formsubmit.co/ajax/${encodeURIComponent(RECIPIENT_PRIMARY)}`;
      
      const relayRes = await fetch(formSubmitUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: cleanName,
          email: cleanEmail,
          _replyto: cleanEmail,
          projectType: cleanProjectType,
          budget: cleanBudget,
          message: cleanMessage,
          ticketId: ticketId,
          submittedAt: submissionTime,
          _subject: `[Portfolio Inquiry ${ticketId}] ${cleanName} - ${cleanProjectType}`,
          _template: "table",
          _captcha: "false",
          _cc: RECIPIENT_SECONDARY,
        }),
      });

      if (!relayRes.ok) {
        const errText = await relayRes.text();
        console.error("FormSubmit relay failed:", relayRes.status, errText);
        return NextResponse.json({
          success: true,
          ticketId,
          fallbackRequired: true,
          message: "Ticket registered. If urgent, feel free to also reach out directly to shaikhnurul8200@gmail.com.",
        });
      }

      deliveredVia = "formsubmit-relay";
    }

    return NextResponse.json({
      success: true,
      ticketId,
      deliveredVia,
      message: `Your inquiry has been directly dispatched to Nurul's Gmail (${RECIPIENT_PRIMARY}). Ticket ${ticketId} created.`,
    });
  } catch (error: unknown) {
    console.error("Error processing contact submission:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "An unexpected error occurred while sending your message.",
      },
      { status: 500 }
    );
  }
}
