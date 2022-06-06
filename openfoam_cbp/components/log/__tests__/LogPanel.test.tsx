import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { LogPanel } from '../LogPanel'

describe('LogPanel', () => {
  it('renders with empty context', () => {
    render(<LogPanel />)
  })
})
