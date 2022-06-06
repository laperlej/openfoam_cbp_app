import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { EditPanel } from '../EditPanel'
import { warningFilter } from 'lib/warningfilter'

const originalWarn = console.warn.bind(console.warn)
beforeAll(() => {
  const patternList = [
    'Found ReflexContainer with width=0, this will cause invalid behavior',
    'vertical reflex-container'
  ]
  warningFilter(console, originalWarn, patternList)
})

afterAll(() => {
  console.warn = originalWarn
})

describe('EditPanel', () => {
  it('renders with empty context', () => {
    render(<EditPanel />)
  })
})
