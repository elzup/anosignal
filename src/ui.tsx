import { Box, Text } from 'ink'
import * as React from 'react'
import Time from './Time'
import FullWidthMinuteTimer from './FullWidthMinuteTimer'

const App = () => {
  return (
    <Box flexDirection="column">
      <FullWidthMinuteTimer />
      <Time />
    </Box>
  )
}

export default App
