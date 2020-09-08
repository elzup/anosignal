import { Box, Text } from 'ink'
import * as React from 'react'

const { useState, useEffect } = React
const MIN = 60 * 1000

const useProgress = () => {
  const [width, setWidth] = useState<number>(8)
  const [rate, setRate] = useState<number>(0)
  useEffect(() => {
    setWidth(process.stdout.columns)
  }, [])
  useEffect(() => {
    const si = setInterval(() => {
      const t = +new Date() % MIN
      setRate(t / MIN)
    }, 60000 / width)
    return () => clearInterval(si)
  }, [width])
  return [rate, width]
}
const FullWidthMinuteTimer = () => {
  const [rate, width] = useProgress()
  return (
    <Box width={width}>
      <Text>{'='.repeat(Math.floor(rate * width)) + '>'}</Text>
    </Box>
  )
}

export default FullWidthMinuteTimer
