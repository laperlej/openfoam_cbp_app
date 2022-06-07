import { ControlDict } from './uipanels/ControlDict'
import { BlockMeshDict } from './uipanels/BlockMeshDict'
import { DecomposeParDict } from './uipanels/DecomposeParDict'
import { HamTransportProperties } from './uipanels/HamTransportProperties'
import { FvSchemes } from './uipanels/FvSchemes'
import { FvSolution } from './uipanels/FvSolution'
import { Turbulence } from './uipanels/Turbulence'
import { Conditions } from './uipanels/Conditions'

export const UIDictionary = ({
  solverName,
  editMaterials,
  fileName,
  fileData,
  ast,
  editABLConditons
}) => {
  switch (fileName) {
    case 'Allclean':
    case 'Allrun':
    case 'Allprepare':
    case 'reconstructScript':
    case 'setset.batch':
    case 'buildings.obj':
      return (
        <>
          <br />
          This file will be adjusted automatically.
          <br />
          It cannot be edited manually.
        </>
      )
    case 'controlDict':
      return <ControlDict key={fileData['index']} ast={ast} />
    case 'decomposeParDict':
      return <DecomposeParDict key={fileData['index']} ast={ast} />
    case 'blockMeshDict':
      return (
        <BlockMeshDict
          key={fileData['index']}
          editMaterials={editMaterials}
          editABL={editABLConditons}
          ast={ast}
        />
      )
    case 'transportProperties':
      return solverName === 'hamFoam' ? (
        <HamTransportProperties key={fileData['index']} ast={ast} />
      ) : null
    case 'fvSchemes':
      return <FvSchemes key={fileData['index']} />
    case 'fvSolution':
      return <FvSolution key={fileData['index']} ast={ast} />
    case 'turbulenceProperties':
      return <Turbulence key={fileData['index']} ast={ast} />
    default:
      return (
        <Conditions key={fileData['index']} fileData={fileData} ast={ast} />
      )
  }
}
