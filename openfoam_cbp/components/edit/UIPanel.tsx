import React from 'react'
import { useMonaco } from '@monaco-editor/react'
import { ControlDict } from './uipanels/ControlDict'
import { BlockMeshDict } from './uipanels/BlockMeshDict'
import { DecomposeParDict } from './uipanels/DecomposeParDict'
import { HamTransportProperties } from './uipanels/HamTransportProperties'
import { FvSchemes } from './uipanels/FvSchemes'
import { FvSolution } from './uipanels/FvSolution'
import { Turbulence } from './uipanels/Turbulence'
import { Conditions } from './uipanels/Conditions'

const UIPanel = ({ project, selectedItem, data, allASTs }) => {
  const fileData = data[selectedItem]
  const ast = allASTs[fileData['index']]
  const fileName = fileData['data']
  const monaco = useMonaco()
  function editABLConditons(newValue) {
    const index =
      project == 'urbanMicroclimateFoam'
        ? '0/air/include/ABLConditions'
        : 'simpleFoam/0/include/ABLConditions'
    for (const model of monaco.editor.getModels()) {
      if (`/${index}` == model.uri.path) {
        model.dispose()
      }
    }
    const r = /([.|\n]*zGround\s+uniform\s+)[0-9.-]+(;(.|\n)*)/
    data[index]['text'] = data[index]['text'].replace(r, '$1' + newValue + '$2')
  }

  function editMaterials(segmentXCoordinates) {
    const indexSetSet = 'system/setset.batch'
    const indexTransportProperties = 'constant/transportProperties'
    for (const model of monaco.editor.getModels()) {
      if (
        `/${indexSetSet}` == model.uri.path ||
        `/${indexTransportProperties}` == model.uri.path
      ) {
        model.dispose()
      }
    }
    let newSetSet = []
    for (let i = 0; i < segmentXCoordinates.length - 1; ++i) {
      newSetSet.push(
        `cellSet layer${i + 1} new boxToCell (${
          segmentXCoordinates[i]
        } 0.00 0)(${segmentXCoordinates[i + 1]} 1 1)`
      )
      newSetSet.push(
        `cellZoneSet layer${i + 1} new setToCellZone layer${i + 1}`
      )
    }

    let newTransportProperties = [
      '/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  2.2.2                                 |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.org                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n    version     2.0;\n    format      ascii;\n    class       dictionary;\n    location    "constant";\n    object      transportProperties;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\nbuildingMaterials\n('
    ]
    for (let i = 0; i < segmentXCoordinates.length - 1; ++i) {
      newTransportProperties.push(
        `    {\n        name	layer${
          i + 1
        };\n        buildingMaterialModel Hamstad5Brick;\n        rho     1600;\n        cap     1000;\n        lambda1	0.682;	//lambda = lambda1 + ws*lambda2\n        lambda2	0;\n    }`
      )
    }
    newTransportProperties.push(
      ');\n\n// ************************************************************************* //'
    )
    data[indexSetSet]['text'] = newSetSet.join('\n')
    data[indexTransportProperties]['text'] = newTransportProperties.join('\n')
  }

  const uiDictionary = (filename) => {
    switch (filename) {
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
        return project === 'hamFoam' ? (
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
  return <div className={'centered'}>{uiDictionary(fileName) || null}</div>
}

export default UIPanel
