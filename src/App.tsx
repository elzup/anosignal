import { Box } from 'ink'
import * as React from 'react'
import CodeBox from './components/CodeBox'
import FullWidthMinuteTimer from './components/FullWidthMinuteTimer'
import MapBox from './components/MapBox'
import RandomBox from './components/RandomBox'
import Time from './components/Time'
import Version from './components/Version'
import Status from './components/Status'

const App = () => {
  return (
    <Box flexDirection="column">
      <FullWidthMinuteTimer />
      <Status />
      <Box>
        <Box flexGrow={1}>
          <Time />
        </Box>
        <RandomBox />
      </Box>
      <Box>
        <MapBox />
        <CodeBox />
      </Box>
      <Version />
    </Box>
  )
}

export default App
