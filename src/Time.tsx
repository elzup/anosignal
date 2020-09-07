import { Box, Text } from 'ink'
import * as React from 'react'
import { useSeconds } from 'use-seconds'

function useTime() {
  const s = useSeconds()
  return s
}

const Time = ({ name = 'Stranger' }) => {
  const time = useTime()
  return (
    <Box>
      <Text>{time[0].toString()}</Text>
    </Box>
  )
}

export default Time
