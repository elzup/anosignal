import { Box, Text } from 'ink'
import * as React from 'react'
import { useSeconds } from 'use-seconds'
import { randchr, range } from '../util'

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
    [...`┌┴──╂┐`], // base
    [...`└┼──┬│`],
    [...`┌─╂─┘├`],
    [...`┴──┼─┘`],
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

export const toStackLineStr = (v: number) => {
  return range(5)
    .map((i: number) => {
      const lib = i + 1 > v / 10 ? `.┓┳` : `┃┫╋`
      const v1 = v % 10
      if (v1 <= i * 2) return lib[0]
      if (v1 >= (i + 1) * 2) return lib[2]
      return lib[1]
    })
    .join('')
}

function makeStackClock(date: Date): string {
  const m = date.getMinutes()
  const s = date.getSeconds()
  const lines: string[] = []
  const digit2 = (v: number) => `${v}`.padStart(2, '0')
  lines.push(digit2(m) + ' ' + toStackLineStr(m))
  lines.push(digit2(s) + ' ' + toStackLineStr(s))

  return lines.join('\n')
}

function useClock() {
  const [date] = useSeconds()
  const [clock, setClock] = useState<string>('')
  const [weekClock, setWeekClock] = useState<string>('')
  const [gridClock, setGridClock] = useState<string>('')
  const [stackClock, setStackClock] = useState<string>('')

  const w = date.getDay()
  const h = date.getHours()
  const m = date.getMinutes()

  useEffect(() => {
    setGridClock(makeGridClock(date))
    setStackClock(makeStackClock(date))
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
  return [date, clock, gridClock, weekClock, stackClock] as const
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
  const [date, clock, _gridClock, weekClock, stackClock] = useClock()
  const sec = Math.floor(+date / 1000)
  const amount = 2147483647 - sec

  return (
    <Box>
      <Box flexDirection="column" borderStyle="single">
        <Text>{weekClock}</Text>
        <Text>{clock}</Text>
        <Text>{stackClock}</Text>
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
