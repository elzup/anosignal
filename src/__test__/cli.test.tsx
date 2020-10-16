import * as React from 'react'
import * as chalk from 'chalk'
import { render } from 'ink-testing-library'
import { advanceBy, advanceTo, clear } from 'jest-date-mock'
import App from '../App'
import { readFileSync } from 'fs'

jest.mock('../service')
import { getRandomCodes } from '../service'

// @ts-ignore
getRandomCodes.mockImplementation(() => new Promise(obj))

const obj = readFileSync(__dirname + '/getRandomCodes.json')

test('render', (t) => {
  advanceTo(new Date(2020, 10, 10, 0, 0, 0))
  const { lastFrame } = render(<App />)

  expect(lastFrame()).toMatchSnapshot('first')
  clear()
})
