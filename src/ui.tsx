import { Box, Text } from 'ink'
import * as React from 'react'
import Time from './Time'

const App = ({ name = 'Stranger' }) => {
  return (
    <Box>
      <Text>
        Hello, <Text color="green">{name}</Text>
      </Text>
      <Time />
    </Box>
  )
}

export default App
