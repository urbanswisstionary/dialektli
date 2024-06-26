import type { NextApiRequest, NextApiResponse } from "next"
import { sendMail } from "@/services/mailService"
import { z } from "zod"
import { stringToJSONSchema } from "@/utils/stringToJSONSchema"
import { Attachment } from "nodemailer/lib/mailer"

const AttachmentSchema: z.ZodSchema<Attachment> = z.object({
  path: z.string(),
  filename: z.string(),
})
const bodySchema = z.object({
  to: z.string().optional(),
  subject: z.string(),
  text: z.string().optional(),
  replyTo: z.string().optional(),
  html: z.string().optional(),
  attachments: z.array(AttachmentSchema).optional(),
})

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  try {
    const mailOptions = stringToJSONSchema(req.body, bodySchema)
    await sendMail(mailOptions)
    res.status(200).send("Success")
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.error("[send email] could not parse params", {
      error: err?.message,
    })
    res.status(400).end(err?.message || "[send email] could not parse params")
  }
}

export default handler

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb", // Set desired value here
    },
  },
}
