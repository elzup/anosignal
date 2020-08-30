import { Box, Text } from 'ink'
import * as React from 'react'
import { useSeconds } from 'use-seconds'

function useTime() {
  const s = useSeconds()
  return s
}

const App = ({ name = 'Stranger' }) => {
  const time = useTime()
  console.log(time)
  return (
    <Box>
      <Text>{time}</Text>
    </Box>
  )
}

export default App
