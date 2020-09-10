import { Box, Text } from 'ink'
import * as React from 'react'
import * as scrapeIt from 'scrape-it'
import fetch from 'node-fetch'

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
  const body: QuestionsResponse = await res.json()

  const codesPromise = body.items
    .map(async ({ link }) => {
      const { data } = await scrapeIt<{ codetext: string }>(link, {
        codetext: '.postcell pre code',
      })
      return data.codetext
    })
    .filter(Boolean)
  return await Promise.all(codesPromise)
}

function codeFit(code: string) {
  return (code + '\n\n').split('\n').slice(0, 2).join('\n')
}

function useCode() {
  const [code, setCode] = useState<string>('')
  const [codes, setCodes] = useState<string[]>([])
  useEffect(() => {
    const si = setInterval(() => {
      const remCodes = [...codes]
      const newCode = remCodes.pop()
      if (!newCode) {
        getRandomCodes().then((codes) => {
          setCode(codeFit(codes.pop() || ''))
          setCodes(codes)
        })
      } else {
        setCode(codeFit(newCode))
        setCodes(remCodes)
      }
    }, 5000)
    return () => clearInterval(si)
  }, [])

  return [code]
}
const CodeBox = () => {
  const [code] = useCode()

  return (
    <Box flexDirection="column" height="3" borderColor="gray">
      <Text color="magenta">{code}</Text>
    </Box>
  )
}

export default CodeBox
