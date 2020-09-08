import { Box, Text, Spacer } from 'ink'
import * as React from 'react'
import { useSeconds } from 'use-seconds'
import crypto from 'crypto'
import { randchr } from './util'

const { useState, useEffect } = React
type Writeable<T> = { -readonly [P in keyof T]: T[P] }

function anologClock(h: number, m: number): string {
  const lines = [
    [...`┏━━┻━┓`], // base
    [...`┗━━━┓┃`],
    [...`┏━┻━┛┃`],
    [...`┗━━━━┛`],
  ]
  const linesPos = [
    `89abcd`, // 0 ~ 24
    `76543e`,
    `mn012f`,
    `lkjihg`,
  ]

  const hs = h.toString(24)

  const clockLines = linesPos.map((linep, i) => {
    const hi = linep.indexOf(hs)
    if (hi < 0) return lines[i].join('')
    lines[i][hi] = '#'
    return lines[i].join('')
  })
  return clockLines.map((s) => `|${s}|`).join('\n')
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

function toHash(d: Date) {
  return [...Array(16).keys()]
    .map((i) => randchr(+d / 1000 - i, 'acemnorsuvwxz'))
    .join('')
}

function toHash2(d: Date) {
  return [...Array(16).keys()]
    .map((i) => randchr(+d / 1000 - i, 'ABCDOPQR46890'))
    .join('')
}

const Time = () => {
  const [clock, date] = useClock()
  return (
    <Box>
      <Box>
        <Text>{clock}</Text>
      </Box>
      <Box flexDirection="column">
        <Text>{+date / 1000}</Text>
        <Spacer />
        <Text>{toHexTime(date)}</Text>
        <Spacer />
        <Text>{toHash(date)}</Text>
        <Text>{toHash2(date)}</Text>
      </Box>
    </Box>
  )
}

export default Time
