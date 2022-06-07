import React from 'react'
import { useMonaco } from '@monaco-editor/react'
import { UIDictionary } from './UIDictionary'

const UIPanel = ({ solverName, selectedItem, data, allASTs }) => {
  const fileData = data[selectedItem]
  const ast = allASTs[fileData['index']]
  const fileName = fileData['data']
  const monaco = useMonaco()
  function editABLConditons(newValue) {
    const index =
      solverName === 'urbanMicroclimateFoam'
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
  return (
    <div className={'centered'}>
      {(
        <UIDictionary
          solverName={solverName}
          editMaterials={editMaterials}
          fileName={fileName}
          fileData={fileData}
          ast={ast}
          editABLConditons={editABLConditons}
        />
      ) || null}
    </div>
  )
}

export default UIPanel
