import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { PostProcessPanel } from '../components/postprocess/postprocesspanel'

describe('PostprocessPanel', () => {
  it('renders with empty context', () => {
    render(<PostProcessPanel />)
  })
})
