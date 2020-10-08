import * as convert from 'color-convert'
import { Box, Text } from 'ink'
import * as React from 'react'
import { useSeconds } from 'use-seconds'
import { rand, randseed, range } from '../util'

const { useEffect, useState } = React

type Cell = {
  state: number
  chara: string
  color: string
}
const W = 32
const H = 8
const box = range(H).map(() => range(W))

function useCell() {
  const [cells, setCells] = useState<Cell[][]>([])
  const [sec] = useSeconds()
  useEffect(() => {
    const t = box.map((l, h) =>
      l.map((_, w) => ({
        state: 0,
        chara: '._+*#'[randseed(0, 5, h + w * H + Date.now())],
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
