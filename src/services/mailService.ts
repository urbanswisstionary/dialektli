import nodemailer, { SendMailOptions } from "nodemailer"

const { NODEMAILER_PASSWORD = "", NODEMAILER_EMAIL = "" } = process.env

export async function sendMail({
  to = NODEMAILER_EMAIL,
  ...mailOptions
}: {
  to?: SendMailOptions["to"]
  subject: NonNullable<SendMailOptions["subject"]>
  text?: SendMailOptions["text"]
  replyTo?: string
  html?: string
  attachments?: SendMailOptions["attachments"]
}) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: NODEMAILER_EMAIL,
      pass: NODEMAILER_PASSWORD,
    },
  })

  // transporter.sendMail({ from: NODEMAILER_EMAIL, ...mailOptions }, (error, info) => {
  //   if (error) throw new Error(error.message)

  //   console.log("Email Sent", info)
  //   return true
  // })
  await new Promise((resolve, reject) => {
    // send mail
    transporter.sendMail(
      { from: NODEMAILER_EMAIL, to, ...mailOptions },
      (err, response) => (err ? reject(err) : resolve(response)),
    )
  })
}
