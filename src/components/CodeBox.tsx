import { Box, Text } from 'ink'
import * as React from 'react'
import * as scrapeIt from 'scrape-it'
import fetch from 'node-fetch'
import { useWidth } from '../util-hooks'

const LINE_NUM = 7
const { useEffect, useState } = React

type QuestionsResponse = {
  items: {
    tags: string[]
    owner: {}
    is_answered: boolean
    view_count: number
    accepted_answer_id: number
    answer_count: number
    question_id: number
    link: string
    title: string
  }[]
}

const qurl =
  'https://api.stackexchange.com/2.2/questions?order=desc&sort=activity&site=stackoverflow'
async function getRandomCodes() {
  const res = await fetch(qurl)
  if (!res.ok) return []
  const body: QuestionsResponse = await res.json()

  const codesPromise = body.items.map(async ({ link }) => {
    const { data } = await scrapeIt<{ codetext: string }>(link, {
      codetext: '.postcell pre code',
    })
    return data.codetext.trim()
  })

  return (await Promise.all(codesPromise)).filter(Boolean)
}

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
      {/* <Text color="blue">{codes.length}</Text> */}
      <Text color="blue" wrap="truncate">
        aaaaaxxxxxxxxxxx11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
      </Text>
      {code.split('\n').map((line, i) => (
        <Text key={i} color="blue" wrap="truncate">
          {i} {line}
        </Text>
      ))}
    </Box>
  )
}

export default CodeBox
