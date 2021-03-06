export function randseed(min: number, max: number, seed: number = 88675123) {
  let x = 123456789
  let y = 362436069
  let z = 521288629
  let w = seed

  let t

  t = x ^ (x << 11)
  x = y
  y = z
  z = w
  const res = (w = w ^ (w >>> 19) ^ (t ^ (t >>> 8)))

  const r = Math.abs(res)
  return min + (r % (max - min))
}

export function randchr(seed: number, lib: string = 'abcdefg') {
  return lib[randseed(0, lib.length, seed)]
}
export function rand(min: number, max: number) {
  return randseed(min, max, +Date.now())
}

export const range = (a: number, b?: number) => {
  if (!b) return [...Array(a).keys()]
  return [...Array(b).keys()].map((v) => v + a)
}
