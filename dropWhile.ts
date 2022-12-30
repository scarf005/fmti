export const dropWhile = <T>(arr: readonly T[], predicate: (t: T) => boolean) => {
  const index = arr.findIndex(x => !predicate(x))
  return index === -1 ? arr : arr.slice(index)
}
export const dropWhileEnd = <T>(arr: readonly T[], predicate: (t: T) => boolean) => {
  const index = arr.findLastIndex(x => !predicate(x))
  return index === -1 ? arr : arr.slice(0, index + 1)
}
export const dropWhileBoth = <T>(
  sx: readonly T[],
  predicate: (t: T) => boolean
) => dropWhileEnd(dropWhile(sx, predicate), predicate)
