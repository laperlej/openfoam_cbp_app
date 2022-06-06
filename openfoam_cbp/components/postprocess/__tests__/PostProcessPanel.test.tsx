import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { PostProcessPanel } from '../PostProcessPanel'

describe('PostprocessPanel', () => {
  it('renders with empty context', () => {
    render(<PostProcessPanel />)
  })
  it('alerts me about unkown status', () => {
    const { getByTestId, queryByTestId } = render(<PostProcessPanel />)
    expect(getByTestId('runstatus-unknown')).toBeTruthy()
    expect(queryByTestId('poststatus-error')).toBeNull()
  })
})
