import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

import { env } from "@/env"

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: env.NODEMAILER_EMAIL,
    pass: env.NODEMAILER_PASSWORD,
  },
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      email,
      bugDescription,
      reproductionSteps,
      expectedBehavior,
      desktopDescription,
      mobileDescription,
      browserDetails,
      additionalContext,
    } = body

    if (!email || !bugDescription || !reproductionSteps || !expectedBehavior) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      )
    }

    const html = `
      <h2>New Bug Report</h2>
      <p><strong>Submitted by:</strong> ${email}</p>

      <h3>Bug Description</h3>
      <p>${bugDescription.replace(/\n/g, "<br/>")}</p>

      <h3>Reproduction Steps</h3>
      <pre style="background:#f4f4f4;padding:12px;border-radius:4px;white-space:pre-wrap">${reproductionSteps}</pre>

      <h3>Expected Behavior</h3>
      <p>${expectedBehavior.replace(/\n/g, "<br/>")}</p>

      ${desktopDescription ? `<h3>Desktop</h3><p>${desktopDescription}</p>` : ""}
      ${mobileDescription ? `<h3>Smartphone</h3><p>${mobileDescription}</p>` : ""}
      ${browserDetails ? `<h3>Browser Details</h3><p>${browserDetails}</p>` : ""}
      ${additionalContext ? `<h3>Additional Context</h3><p>${additionalContext.replace(/\n/g, "<br/>")}</p>` : ""}
    `

    await transporter.sendMail({
      from: env.NODEMAILER_EMAIL,
      to: env.NODEMAILER_EMAIL,
      replyTo: email,
      subject: `[Bug Report] from ${email}`,
      html,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    // oxlint-disable-next-line no-console
    console.error("Bug report email error:", error)
    return NextResponse.json(
      { error: "Failed to send bug report" },
      { status: 500 },
    )
  }
}
