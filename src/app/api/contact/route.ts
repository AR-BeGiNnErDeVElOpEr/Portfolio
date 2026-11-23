import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as
    | { name?: string; email?: string; subject?: string; message?: string }
    | null;

  if (!body?.name || !body.email?.includes("@") || !body.subject || (body.message?.length ?? 0) < 10) {
    return NextResponse.json({error:"Please complete all fields with a valid email and message."},{status:400});
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL || "ammarriaz8662@gmail.com";
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !fromEmail) {
    return NextResponse.json({error:"Email service not configured."},{status:503});
  }

  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: fromEmail,
    to: [toEmail],
    replyTo: body.email,
    subject: body.subject,
    text: `Name: ${body.name}\nEmail: ${body.email}\n\n${body.message}`,
  });

  if (error) {
    return NextResponse.json({error:"The email could not be sent."},{status:502});
  }
  return NextResponse.json({success:true});
}
