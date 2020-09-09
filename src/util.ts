export function rand(min: number, max: number, seed: number = 88675123) {
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
  return min + (r % (max + 1 - min))
}

export function randchr(seed: number, lib: string = 'abcdefg') {
  return lib[rand(0, lib.length - 1, seed)]
}

export const range = (v: number) => [...Array(v).keys()]
