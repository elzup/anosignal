import * as convert from 'color-convert'
import { Box, Text } from 'ink'
import * as React from 'react'
import { range } from '../util'

const { useEffect, useState } = React

type Area = {
  state: number
  color: string
}

const initMap2 = `
________F31_D17_D16_B02_A01
F35_F32_F33_D18_D15_B05_B03
H42_H40_F34_E25_D20_B06_B04
H41_H44_E28_E26_D19_C10_B07
H43_H45_E27_E29_D21_C11_C09
H46_G38_G37_E30_D22_C13_C08
H47_G39_G36_E24_D23_C14_C12
`.trim()

function useJapan() {
  const [areas, setAreas] = useState<Area[][]>([])
  useEffect(() => {
    const t = range(7).map(() =>
      range(7).map(() => ({
        state: Math.floor(Math.random() * 5),
        color: convert.hsl.hex([Math.floor(Math.random() * 360), 50, 50]),
      }))
    )
    setAreas(t)
  }, [])

  return [areas]
}
const MapBox = () => {
  const [areas] = useJapan()

  return (
    <Box flexDirection="column">
      {areas.map((row, ri) => (
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

export default MapBox
