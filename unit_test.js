const scrapeIt = require('scrape-it')
const fetch = require('node-fetch')

const url =
  'https://stackoverflow.com/questions/56747307/how-to-undo-alter-table-add-partition-without-deleting-data'
async function getWeathers() {
  const { data, resonse } = await scrapeIt(url, {
    codetext: '.postcell pre code a',
  })
  return data
}

const qurl =
  'https://api.stackexchange.com/2.2/questions?order=desc&sort=activity&site=stackoverflow'
async function getRandomCode() {
  const res = await fetch(qurl)
  const body = await res.json()

  console.log(body.items.length)
  let code = ''
  for (const { link } of body.items) {
    console.log(link)
    const { data } = await scrapeIt(link, {
      codetext: '.postcell pre code',
    })
    if (data.codetext) {
      code = data.codetext
      break
    }
  }
  return code
}

getRandomCode().then(console.log)
