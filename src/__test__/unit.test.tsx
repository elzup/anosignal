const { toStackLineStr } = require('../components/Time')

test('toStackLineStr', () => {
  expect(toStackLineStr(0)).toBe('.....')
  expect(toStackLineStr(1)).toBe('┓....')
  expect(toStackLineStr(2)).toBe('┳....')
  expect(toStackLineStr(9)).toBe('┳┳┳┳┓')
  expect(toStackLineStr(10)).toBe('┃....')
  expect(toStackLineStr(12)).toBe('╋....')
  expect(toStackLineStr(59)).toBe('╋╋╋╋┫')
})
