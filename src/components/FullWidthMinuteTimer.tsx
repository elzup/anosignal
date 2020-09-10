import { Box, Text } from 'ink'
import * as React from 'react'
import { useWidth } from '../util-hooks'

const { useState, useEffect } = React

const useProgress = (width: number) => {
  const [count, setCount] = useState<number>(0)
  const [plot, setPlot] = useState<{ big: number; small: number }>({
    big: 0,
    small: 0,
  })
  useEffect(() => {
    const si = setInterval(() => {
      setCount((c) => (c + 1) % (6 * width))
    }, 60000 / width / 6)
    return () => clearInterval(si)
  }, [width])
  useEffect(() => {
    setPlot({ big: Math.floor(count / 6), small: count % 6 })
  }, [count])

  return [plot, count] as const
}

const plotLib = ['⠂', '⠃', '⠇', '⠗', '⠟', '⠿']
const smallPlot = (v: number) => {
  return plotLib[v] || ' '
}

const FullWidthMinuteTimer = () => {
  const width = useWidth()
  const [plot] = useProgress(width)
  return (
    <Box width={width}>
      <Text>{plotLib[5].repeat(plot.big) + smallPlot(plot.small)}</Text>
    </Box>
  )
}

export default FullWidthMinuteTimer
