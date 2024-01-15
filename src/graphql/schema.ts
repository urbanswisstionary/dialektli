import { builder } from "./builder"
import { NextApiRequest, NextApiResponse } from "next"
import { Context } from "./types"
import { getUserLang } from "../utils/getUserLang"
import { getServerSession } from "next-auth"
import { authOptions } from "../pages/api/auth/[...nextauth]"
import "./modules"

export const schema = builder.toSchema()

export const createContext = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<Context> => {
  const lang = getUserLang(req.headers["accept-language"] ?? "de")
  const session = await getServerSession(req, res, await authOptions(req, res))

  return { session, lang, res }
}
