import { z } from "zod"

export const stringToJSONSchema = <Z extends z.ZodTypeAny = z.ZodNever>(
  arg: any,
  zObject: Z,
) =>
  z
    .string()
    .transform((s, ctx): z.infer<ReturnType<typeof arg>> => {
      try {
        return JSON.parse(s)
      } catch (e) {
        ctx.addIssue({ code: "custom", message: "Invalid JSON" })
        return z.NEVER
      }
    })
    .pipe(zObject)
    .parse(arg)
