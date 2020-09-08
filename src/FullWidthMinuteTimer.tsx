import { Box, Text } from 'ink'
import * as React from 'react'

const { useState, useEffect } = React
const MIN = 60 * 1000

const useProgress = () => {
  const [width, setWidth] = useState<number>(8)
  const [count, setCount] = useState<number>(0)
  const [plot, setPlot] = useState<{ big: number; small: number }>({
    big: 0,
    small: 0,
  })
  useEffect(() => {
    setWidth(process.stdout.columns)
  }, [])
  useEffect(() => {
    const si = setInterval(() => {
      setCount((c) => (c + 1) % (6 * width))
    }, 60000 / width / 6)
    return () => clearInterval(si)
  }, [width])
  useEffect(() => {
    setPlot({ big: Math.floor(count / 6), small: count % 6 })
  }, [count])

  return [count, width, plot] as const
}

const plotLib = ['⠂', '⠃', '⠇', '⠗', '⠟', '⠿']
const smallPlot = (v: number) => {
  return plotLib[v] || ' '
}

const FullWidthMinuteTimer = () => {
  const [, width, plot] = useProgress()
  return (
    <Box width={width}>
      <Text>{plotLib[5].repeat(plot.big) + smallPlot(plot.small)}</Text>
    </Box>
  )
}

export default FullWidthMinuteTimer
