import { Box, Text } from 'ink'
import * as React from 'react'

const App = ({ name = 'Stranger' }) => (
  <Box>
    <Text>
      Hello, <Text color="green">{name}</Text>
    </Text>
  </Box>
)

export default App
