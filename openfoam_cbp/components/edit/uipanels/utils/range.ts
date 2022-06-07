export function range(start, end): Array<number> {
  return Array.from(Array(end).keys()).slice(start)
}
