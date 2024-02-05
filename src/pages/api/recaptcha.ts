// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"

const { RECAPTCHA_SECRETE_KEY = "" } = process.env

type Data = {
  name: string
}

const verifyRecaptcha = async (token: string) => {
  const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRETE_KEY}&response=${token}`
  return fetch(verificationUrl, { method: "POST" })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  try {
    const token = req.body
    verifyRecaptcha(token)
      .then((res) => res.json())
      .then((data) =>
        res.status(data.success && data.score >= 0.5 ? 200 : 500).end(),
      )
  } catch (error) {
    res.status(500).json({ name: "failed parsing body" })
  }
}
