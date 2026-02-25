import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      )
    }

    const html = `
      <h2>New Contact Message</h2>
      <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <h3>Message</h3>
      <p style="white-space:pre-wrap">${message.replace(/\n/g, "<br/>")}</p>
    `

    await transporter.sendMail({
      from: process.env.NODEMAILER_EMAIL,
      to: process.env.NODEMAILER_EMAIL,
      replyTo: email,
      subject: `[Contact] ${subject}`,
      html,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    // oxlint-disable-next-line no-console
    console.error("Contact form email error:", error)
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 },
    )
  }
}
