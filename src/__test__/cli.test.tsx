import { readFileSync } from 'fs'
import { render } from 'ink-testing-library'
import { advanceTo, clear } from 'jest-date-mock'
import * as React from 'react'
import App from '../App'
import { getRandomCodes } from '../service'

jest.mock('../service')

// @ts-ignore
getRandomCodes.mockImplementation(() => new Promise(obj))

const obj = readFileSync(__dirname + '/getRandomCodes.json')

test('render', (t) => {
  advanceTo(new Date(2020, 10, 10, 0, 0, 0))
  const { lastFrame } = render(<App />)

  expect(lastFrame()).toMatchSnapshot('first')
  clear()
})
