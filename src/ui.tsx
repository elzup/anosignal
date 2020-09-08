import { Box, Text } from 'ink'
import * as React from 'react'
import Time from './Time'
import FullWidthMinuteTimer from './FullWidthMinuteTimer'
import Version from './Version'
import RandomBox from './RandomBox'

const App = () => {
  return (
    <Box flexDirection="column">
      <FullWidthMinuteTimer />
      <Box>
        <Box flexGrow={1}>
          <Time />
        </Box>
        <RandomBox />
      </Box>
      <Version />
    </Box>
  )
}

export default App
