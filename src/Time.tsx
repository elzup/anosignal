import { Box, Spacer, Text } from 'ink'
import * as React from 'react'
import { useSeconds } from 'use-seconds'
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

function toHash(sec: number) {
  return [...Array(16).keys()]
    .map((i) => randchr(sec - i, 'acemnorsuvwxz'))
    .join('')
}

function toHash2(sec: number) {
  return [...Array(16).keys()]
    .map((i) => randchr(sec - i, 'ABCDOPQR46890'))
    .join('')
}

const Time = () => {
  const [clock, date] = useClock()
  const sec = Math.floor(+date / 1000)
  const amount = 2147483647 - sec

  return (
    <Box>
      <Box>
        <Text>{clock}</Text>
      </Box>
      <Box flexDirection="column">
        <Text>{sec}</Text>
        <Spacer />
        <Text>{toHexTime(date)}</Text>
        <Spacer />
        <Text>{toHash(sec)}</Text>
        <Text>{toHash2(sec)}</Text>
        <Text>0b{sec.toString(2)}</Text>
        <Text>{sec.toString(4)}</Text>
        <Text>0{sec.toString(8)}</Text>
        <Text>0x{sec.toString(16)}</Text>
        <Text>{sec.toString(36)}</Text>
        <Text>2038_-{amount}</Text>
      </Box>
    </Box>
  )
}

export default Time
