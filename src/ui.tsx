import { Box, Text } from 'ink'
import * as React from 'react'
import Time from './Time'
import FullWidthMinuteTimer from './FullWidthMinuteTimer'
import Version from './Version'

const App = () => {
  return (
    <Box flexDirection="column">
      <FullWidthMinuteTimer />
      <Time />
      <Version />
    </Box>
  )
}

export default App
