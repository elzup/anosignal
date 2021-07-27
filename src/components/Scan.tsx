import * as convert from 'color-convert'
import { Box, Text } from 'ink'
import * as React from 'react'
import { useSeconds } from 'use-seconds'
import { rand, randseed, range } from '../util'
import * as SimplexNoise from 'simplex-noise'

const { useEffect, useState } = React

type Cell = {
  state: number
  chara: string
  color: string
}
const W = 32
const H = 8
const box = range(H).map(() => range(W))
const simplex = new SimplexNoise()

// limit min max
const limit = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max)

// -0.5~0.5 to 0~4
const normalize = (n: number) => limit(Math.floor((n + 0.5) * 4), 0, 4)

function useCell() {
  const [cells, setCells] = useState<Cell[][]>([])
  const [sec] = useSeconds()
  useEffect(() => {
    const t = box.map((l, h) =>
      l.map((_, w) => ({
        state: 0,
        chara: '._+*#'[
          normalize(simplex.noise3D(w * 0.1, h * 0.1, Date.now() * 0.0001))
        ],
        color: convert.hsl.hex([Math.floor(rand(0, 360)), 50, 50]),
      }))
    )
    setCells(t)
  }, [+sec])

  return [cells]
}

const Scan = () => {
  const [cells] = useCell()

  return (
    <Box flexDirection="column">
      {cells.map((row, ri) => (
        <Box key={ri}>
          {row.map((cell, ai) => (
            <Text key={ai} color={cell.color}>
              {cell.chara}
            </Text>
          ))}
        </Box>
      ))}
    </Box>
  )
}

export default Scan
