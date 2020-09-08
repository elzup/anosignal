import { Box, Text, DOMElement, measureElement } from 'ink'
import * as React from 'react'

const { useEffect, useState } = React

const NUM_TABLE = '0123456789'
const ALPHA_LO_TABLE = 'abcdefghijklmnopqrstuvwxyz'
const ALPHA_UP_TABLE = ALPHA_LO_TABLE.toUpperCase()
const ALPHA_TABLE = ALPHA_LO_TABLE + ALPHA_UP_TABLE
const SGN_TABLE = `!@#$%^&*()_+-={}|[];:"',./?~`
const GENERAL_TABLE = NUM_TABLE + ALPHA_TABLE + SGN_TABLE
const HEX_TABLE = '0123456789abcdef'
const RULED1_TABLE = `─│┌┐┘└├┬┤┴┼`
const RULED2_TABLE = `━┃┏┓┛┗┣┳┫┻╋`
const RULED3_TABLE = `┠┯┨┷┿┝┰┥┸╂`
const RULED_TABLE = RULED1_TABLE + RULED2_TABLE + RULED3_TABLE
const sample = (arr: string): string =>
  arr[Math.floor(Math.random() * arr.length)]

const rand = (len: number, table: string) =>
  Array.from(Array(len))
    .map(() => sample(table))
    .join('')

type Table = {
  chars: string
  id: string
  raw: string
  life: number
}
const initTables: Table[] = [
  { id: '09', chars: NUM_TABLE, raw: '', life: 0 },
  { id: 'az', chars: ALPHA_LO_TABLE, raw: '', life: 0 },
  { id: 'AB', chars: ALPHA_UP_TABLE, raw: '', life: 0 },
  { id: '0z', chars: NUM_TABLE + ALPHA_LO_TABLE, raw: '', life: 0 },
  { id: '0Z', chars: NUM_TABLE + ALPHA_TABLE, raw: '', life: 0 },
  { id: 'a.', chars: GENERAL_TABLE, raw: '', life: 0 },
  { id: '0x', chars: HEX_TABLE, raw: '', life: 0 },
  { id: '01', chars: '.-', raw: '', life: 0 },
  { id: 's*', chars: '* ', raw: '', life: 0 },
  { id: '-+', chars: RULED2_TABLE, raw: '', life: 0 },
  { id: '++', chars: RULED_TABLE, raw: '', life: 0 },
]

const useRandoms = (len: number) => {
  const [tables, setTables] = useState<Table[]>(initTables)

  useEffect(() => {
    const t = [...tables]
    setTables((tables) =>
      tables.map((t, i) => {
        const raw = rand(len, t.chars)
        return { ...t, raw, life: i }
      })
    )

    const si = setInterval(() => {
      setTables((tables) =>
        tables.map((t, i) => {
          if (t.life > 0) return { ...t, life: t.life - 1 }

          const raw = rand(len, t.chars)
          return { ...t, raw, life: tables.length - 1 }
        })
      )
    }, 1 * 1000)
    return () => clearInterval(si)
  }, [len])

  return tables
}
const LIFECHAR = '▏▎▍▌▋▊▉█'

const RandomBox = ({ width = 16 }) => {
  const tables = useRandoms(width)

  return (
    <Box flexDirection="column">
      {tables.map((t, i) => (
        <Text key={t.id}>
          <Text color="gray">{t.id}</Text>
          <Text> {t.raw} </Text>
          <Text color="gray">
            {LIFECHAR[t.life] || LIFECHAR[LIFECHAR.length - 1]}
          </Text>
        </Text>
      ))}
    </Box>
  )
}

export default RandomBox
