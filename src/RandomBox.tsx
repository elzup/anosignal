import { Box, Text, DOMElement, measureElement } from 'ink'
import * as React from 'react'

const { useEffect, useState } = React

const NUM_TABLE = '0123456789'
const ALPHA_LO_TABLE = 'abcdefghijklmnopqrstuvwxyz'
const HEX_TABLE = '0123456789abcdef'
const ALPHA_UP_TABLE = ALPHA_LO_TABLE.toUpperCase()
const SGN_TABLE = `!@#$%^&*()_+-={}|[];:"',./?~`
const RULED_TABLE = `─│┌┐┘└├┬┤┴┼`
const RULED2_TABLE = `━┃┏┓┛┗┣┳┫┻╋`
const RULED3_TABLE = `┠┯┨┷┿┝┰┥┸╂`
const sample = (arr: string): string =>
  arr[Math.floor(Math.random() * arr.length)]

const rand = (len: number, table: string) =>
  Array.from(Array(len))
    .map(() => sample(table))
    .join('')

const useRandoms = (len: number) => {
  const [keys, setKeys] = useState<string[]>([])

  useEffect(() => {
    const si = setInterval(() => {
      setKeys([
        rand(len, NUM_TABLE),
        rand(len, ALPHA_LO_TABLE),
        rand(len, ALPHA_UP_TABLE),
        rand(len, NUM_TABLE + ALPHA_LO_TABLE),
        rand(len, NUM_TABLE + ALPHA_LO_TABLE + ALPHA_UP_TABLE),
        rand(len, NUM_TABLE + ALPHA_LO_TABLE + ALPHA_UP_TABLE + SGN_TABLE),
        rand(len, HEX_TABLE),
        rand(len, '.-'),
        rand(len, '* '),
        rand(len, RULED_TABLE),
        rand(len, RULED_TABLE + RULED2_TABLE + RULED3_TABLE),
      ])
    }, 2 * 1000)
    return () => clearInterval(si)
  }, [len])

  return keys
}

const RandomBox = ({ width = 16 }) => {
  const rands = useRandoms(width)

  return (
    <Box flexDirection="column">
      {rands.map((key, i) => (
        <Text key={`ra-${i}`}>{key}</Text>
      ))}
    </Box>
  )
}

export default RandomBox
