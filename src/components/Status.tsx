import { Box, Text } from 'ink'
import * as React from 'react'
import { useSeconds } from 'use-seconds'

const { useState, useEffect } = React

function useStatus() {
  const [date] = useSeconds()
  const [status, setStatus] = useState<NodeJS.MemoryUsage>({
    rss: 0,
    heapTotal: 0,
    heapUsed: 0,
    external: 0,
    arrayBuffers: 0,
  })
  useEffect(() => {
    setStatus(process.memoryUsage())
  }, [+date])
  return [status] as const
}

const Time = () => {
  const [status] = useStatus()

  return (
    <Box flexDirection="column" borderStyle="single">
      <Text>rs: {status.rss}</Text>
      <Text>ex: {status.external}</Text>
      <Text>
        hp: {status.heapUsed}/{status.heapTotal}
      </Text>
    </Box>
  )
}

export default Time
