export const randomPick = <T>(values: T[]) =>
  values[Math.floor(Math.random() * values.length)]
