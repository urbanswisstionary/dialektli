"use client"

/**
 * HoneypotField — invisible to humans, visible to bots.
 *
 * Usage:
 *   1. Render <HoneypotField /> inside your <form>
 *   2. Call isHoneypotTripped(formData) before submitting.
 *      If it returns true, silently discard the submission.
 */

export function HoneypotField(props?: {
  value?: string
  onChange?: (_v: string) => void
}) {
  return (
    <input
      type="text"
      name="website"
      autoComplete="off"
      tabIndex={-1}
      aria-hidden="true"
      value={props?.onChange !== undefined ? (props.value ?? "") : undefined}
      onChange={
        props?.onChange ? (e) => props.onChange!(e.target.value) : undefined
      }
      style={{
        position: "absolute",
        left: "-9999px",
        width: "1px",
        height: "1px",
        overflow: "hidden",
        opacity: 0,
        pointerEvents: "none",
      }}
    />
  )
}

/**
 * Returns true if the honeypot field was filled in (i.e. a bot submitted).
 * Call this at the top of your submit handler and bail out silently if true.
 */
export function isHoneypotTripped(
  data: Record<string, string | undefined>,
): boolean {
  return !!data["website"]
}
