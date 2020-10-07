import * as convert from 'color-convert'
import { Box, Text } from 'ink'
import * as React from 'react'
import { range } from '../util'

const { useEffect, useState } = React

type Cell = {
  state: number
  color: string
}

function useCell() {
  const [cells, setCells] = useState<Cell[][]>([])
  useEffect(() => {
    const t = range(7).map(() =>
      range(7).map(() => ({
        state: Math.floor(Math.random() * 5),
        color: convert.hsl.hex([Math.floor(Math.random() * 360), 50, 50]),
      }))
    )
    setCells(t)
  }, [])

  return [cells]
}

const Scan = () => {
  const [cells] = useCell()

  return (
    <Box flexDirection="column">
      {cells.map((row, ri) => (
        <Box key={ri}>
          {row.map((area, ai) => (
            <Text key={ai} color={area.color}>
              {' *'}
            </Text>
          ))}
        </Box>
      ))}
    </Box>
  )
}

export default Scan
