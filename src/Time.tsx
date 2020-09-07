import { Box, Text, Spacer } from 'ink'
import * as React from 'react'
import { useSeconds } from 'use-seconds'

const { useState, useEffect } = React
type Writeable<T> = { -readonly [P in keyof T]: T[P] }

function anologClock(h: number, m: number): string {
  const line1 = [...` .  .  .  . `]
  const line2 = [...` .  .  .  . `]
  const line1pos = `6789abcdefgh`
  const line2pos = `543210nmlkji`
  const hs = h.toString(24)
  const hi1 = line1pos.indexOf(hs)
  const hi2 = line2pos.indexOf(hs)
  if (hi1 >= 0) {
    line1[hi1] = '#'
  } else {
    line2[hi2] = '#'
  }

  return `|${line1.join('')}|\n|${line2.join('')}|`
}

function useClock() {
  const [date] = useSeconds()
  const [clock, setClock] = useState<string>('')

  const h = date.getHours()
  const m = date.getMinutes()

  useEffect(() => {
    setClock(anologClock(h, m))
  }, [h, m])
  return [clock, date] as const
}

const padHex = (n: number) => (n + 12).toString(36)
function toHexTime(date: Date) {
  const h = padHex(date.getHours())
  const m = padHex(date.getMinutes()).padStart(2, '0')
  const s = padHex(date.getSeconds()).padStart(2, '0')
  return `${h}${m}${s}`
}

const Time = () => {
  const [clock, date] = useClock()
  return (
    <Box>
      <Box>
        <Text>{clock}</Text>
      </Box>
      <Box>
        <Text>{toHexTime(date)}</Text>
        <Spacer />
      </Box>
    </Box>
  )
}

export default Time
