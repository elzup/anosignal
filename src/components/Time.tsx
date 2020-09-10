import { Box, Text } from 'ink'
import * as React from 'react'
import { useSeconds } from 'use-seconds'
import { randchr, range } from './util'

const { useState, useEffect } = React

function makeAnologWeekClock(w: number): string {
  const lines = [
    [...`┏□━━━━━━━□┓`], // base
    [...`┗□━□━□━□━□┛`],
  ]
  const linesPos = [
    `.0.......6.`, // 0 ~ 24
    `.1.2.3.4.5.`,
  ]

  const clockLines = linesPos.map((linep, i) => {
    const hi = linep.indexOf(w.toString())
    if (hi < 0) return lines[i].join('')
    lines[i][hi] = '▣'
    return lines[i].join('')
  })

  console.log(w)
  return clockLines.join('\n')
}

function makeAnologHourClock(h: number): string {
  const lines = [
    [...`┏━━━┻┓`], // base
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
    lines[i][hi] = '⊚'
    return lines[i].join('')
  })
  return clockLines.join('\n')
}

const SIZE_X = 10
const SIZE_Y = 6
function makeGridClock(date: Date): string {
  const xa = range(SIZE_X)
  const ya = range(SIZE_Y)
  const m = date.getMinutes()
  const s = date.getSeconds()
  const x1 = Math.floor(m % SIZE_X)
  const y1 = Math.floor(m / SIZE_X)
  const x2 = Math.floor(s % SIZE_X)
  const y2 = Math.floor(s / SIZE_X)
  const bo = ya.map(() => xa.map(() => '.'))

  ya.forEach((y) => (bo[y][x2] = '|'))
  xa.forEach((x) => (bo[y2][x] = '-'))

  ya.forEach((y) => (bo[y][x1] = '┃'))
  xa.forEach((x) => (bo[y1][x] = '━'))

  return bo.map((bl) => bl.join('')).join('\n')
}

function useClock() {
  const [date] = useSeconds()
  const [clock, setClock] = useState<string>('')
  const [weekClock, setWeekClock] = useState<string>('')
  const [gridClock, setGridClock] = useState<string>('')

  const w = date.getDay()
  const h = date.getHours()
  const m = date.getMinutes()

  useEffect(() => {
    setGridClock(makeGridClock(date))
  }, [+date])
  useEffect(() => {
    setClock(makeAnologHourClock(h))
  }, [h, m])
  useEffect(() => {
    setWeekClock(makeAnologWeekClock(w))
  }, [w])
  useEffect(() => {
    setGridClock(makeGridClock(date))
  }, [+date])
  return [date, clock, gridClock, weekClock] as const
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
  const [date, clock, gridClock, weekClock] = useClock()
  const sec = Math.floor(+date / 1000)
  const amount = 2147483647 - sec

  return (
    <Box>
      <Box flexDirection="column">
        <Box borderStyle="single">
          <Text>{clock}</Text>
        </Box>
        <Box borderStyle="single">
          <Text>{gridClock}</Text>
        </Box>
        <Box borderStyle="single">
          <Text>{weekClock}</Text>
        </Box>
      </Box>
      <Box flexDirection="column" marginLeft={1}>
        <Text>{sec}</Text>
        <Text>{toHexTime(date)}</Text>
        <Text>{toHash(sec)}</Text>
        <Text>{toHash2(sec)}</Text>
        <Text>{sec.toString(2)}</Text>
        <Text>{sec.toString(4)}</Text>
        <Text>{sec.toString(8)}</Text>
        <Text>{sec.toString(16)}</Text>
        <Text>{sec.toString(36)}</Text>
        <Text>2038_-{amount}</Text>
      </Box>
    </Box>
  )
}

export default Time
