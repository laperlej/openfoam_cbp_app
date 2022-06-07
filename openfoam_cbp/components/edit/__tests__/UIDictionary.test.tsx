import { UIDictionary } from '../UIDictionary'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('UIDictionary', () => {
  it('renders hamfoam transportproperties', () => {
    const { getByTestId } = render(
      <UIDictionary
        solverName="hamFoam"
        editMaterials={() => {}}
        fileName="transportProperties"
        fileData={{}}
        ast={{}}
        editABLConditons={() => {}}
      />
    )
    expect(getByTestId('ham-transport-properties'))
  })
})
