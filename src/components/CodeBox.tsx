import { Box, Text } from 'ink'
import * as React from 'react'
import { getRandomCodes } from '../service'
import { useWidth } from '../util-hooks'

const LINE_NUM = 7
const { useEffect, useState } = React

function normalizeLine(text: string, lineNum: number) {
  return (text + '\n'.repeat(lineNum)).split('\n').slice(0, lineNum).join('\n')
}
function codeFit(code: string, newLine: string) {
  return normalizeLine(newLine + '\n' + normalizeLine(code, 4), LINE_NUM)
}

function useCode() {
  const [code, setCode] = useState<string>('\n'.repeat(LINE_NUM - 1))
  const [codes, setCodes] = useState<string[]>([])
  useEffect(() => {
    if (codes.length > 0) return
    getRandomCodes().then((codes) => {
      setCode((code) => codeFit(code, codes.pop() || ''))
      setCodes(codes)
    })
  }, [codes])
  useEffect(() => {
    if (codes.length === 0) return
    const si = setTimeout(() => {
      const remCodes = [...codes]
      setCode((code) => codeFit(code, remCodes.pop() || ''))
      setCodes(remCodes)
    }, 60 * 1000)
    return () => clearInterval(si)
  }, [codes])

  return [code, codes] as const
}
const CodeBox = () => {
  const width = useWidth()
  const [code, codes] = useCode()

  return (
    <Box
      flexDirection="column"
      borderColor="gray"
      width={width / 2}
      marginLeft={1}
    >
      {code.split('\n').map((line, i) => (
        <Text key={i} wrap="truncate">
          {i} {line}
        </Text>
      ))}
    </Box>
  )
}

export default CodeBox
