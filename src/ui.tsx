import { Box, Text } from 'ink'
import * as React from 'react'
import Time from './Time'
import FullWidthMinuteTimer from './FullWidthMinuteTimer'
import Version from './Version'
import RandomBox from './RandomBox'
import MapBox from './components/MapBox'

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
      <MapBox />
      <Version />
    </Box>
  )
}

export default App
