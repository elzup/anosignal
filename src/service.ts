import fetch from 'node-fetch'
import * as scrapeIt from 'scrape-it'

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
export async function getRandomCodes() {
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
