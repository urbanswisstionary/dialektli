// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"

const { RECAPTCHA_SECRETE_KEY = "" } = process.env

const verifyRecaptcha = async (token: string) => {
  const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRETE_KEY}&response=${token}`
  return fetch(verificationUrl, { method: "POST" })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const token = req.body

    const verifyRecaptchaRes = await verifyRecaptcha(token)
    const data = await verifyRecaptchaRes.json()

    res
      .status(data.success && data.score >= 0.5 ? 200 : 400)
      .end((data["error-codes" as keyof typeof verifyRecaptchaRes] ?? [])[0])
  } catch (error) {
    res.status(500).end("failed parsing body")
  }
}
