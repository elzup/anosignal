import * as React from 'react'
import * as chalk from 'chalk'
import { render } from 'ink-testing-library'
import App from '../App'
import { readFileSync } from 'fs'
import { readFile } from 'fs/promises'

jest.mock('../service')
import { getRandomCodes } from '../service'

const obj = readFileSync(__dirname + '/getRandomCodes.json')

// @ts-ignore
getRandomCodes.mockImplementation(() => obj)

test('greet unknown user', (t) => {
  const { lastFrame } = render(<App />)

  expect(lastFrame()).toBe(chalk`Hello, {green Stranger}`)
})
