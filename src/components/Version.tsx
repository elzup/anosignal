import { Box, Text } from 'ink'
import * as React from 'react'

const Version = () => {
  const version = '0.000' // TODO:

  return (
    <Box>
      <Box>
        <Text>{version}</Text>
      </Box>
    </Box>
  )
}

export default Version
