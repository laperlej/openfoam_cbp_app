import React, { useContext, useState } from 'react'
import { Save } from './utils/save'
import { generateMesh } from './utils/meshgenerator'
import { isValidFloat, isValidInt } from './utils/validator'
import { CustomSelect } from '../../custom/customSelect'
import { CustomTable } from '../../custom/customTable'
import CaseContext from '../../casecontext'

const BlockMeshDictBackground = ({ ast, editABL }) => {
  const [rows, setRows] = useState([
    { id: 1, axis: 'X', min: -20, max: 330, cells: 25 },
    { id: 2, axis: 'Y', min: -50, max: 230, cells: 20 },
    { id: 3, axis: 'Z', min: 0, max: 140, cells: 10 }
  ])

  const backGroundMesh = {
    xMin: rows[0].min,
    xMax: rows[0].max,
    yMin: rows[1].min,
    yMax: rows[1].max,
    zMin: rows[2].min,
    zMax: rows[2].max,
    xCells: rows[0].cells,
    yCells: rows[1].cells,
    zCells: rows[2].cells
  }

  const columns = [
    {
      field: 'axis',
      headerName: 'Axis',
      editable: false,
      width: 50
    },
    {
      field: 'min',
      headerName: 'Min coordinate',
      editable: true,
      width: 150,
      validate: isValidFloat
    },
    {
      field: 'max',
      headerName: 'Max coordinate',
      editable: true,
      width: 150,
      validate: isValidFloat
    },
    {
      field: 'cells',
      headerName: 'Number of Cells',
      editable: true,
      width: 150,
      validate: isValidInt
    }
  ]

  //map keys to syntax tree
  const vars = Object.keys(backGroundMesh).map((varName) => {
    return {
      foamObj: ast?.['backgroundMesh']?.[varName]?.[0],
      newValue: backGroundMesh[varName]
    }
  })
  const validate = () => {
    console.log(vars)
    return (
      vars.slice(0, 6).every((x) => isValidFloat(x.newValue)) &&
      vars.slice(6).every((x) => isValidInt(x.newValue))
    )
  }
  return (
    <>
      <p />
      <h3>Background mesh generation</h3>
      <p />
      <span>
        <b>Important</b>:&nbsp;
        <i>
          Make sure the background mesh covers all the coordinates found in the
          obj file. Use negative coordinates if you have to.
        </i>
      </span>
      <p />
      <div>
        <CustomTable rows={rows} columns={columns} setRows={setRows} />
      </div>
      <p />
      <Save
        vars={vars}
        onClick={(vars) => editABL(vars[2].newValue)}
        isValid={validate()}
      />
    </>
  )
}

const BlockMeshDict1D = ({ ast, editMaterials }) => {
  const [rows, setRows] = useState([
    { id: 1, segmentLens: '0.365', segmentCells: '100', segmentRatios: '50' },
    { id: 2, segmentLens: '0.015', segmentCells: '15', segmentRatios: '20' },
    { id: 3, segmentLens: '0.04', segmentCells: '30', segmentRatios: '20' },
    { id: 4, segmentLens: '1', segmentCells: '1', segmentRatios: '1' },
    { id: 5, segmentLens: '1', segmentCells: '1', segmentRatios: '1' },
    { id: 6, segmentLens: '1', segmentCells: '1', segmentRatios: '1' },
    { id: 7, segmentLens: '1', segmentCells: '1', segmentRatios: '1' },
    { id: 8, segmentLens: '1', segmentCells: '1', segmentRatios: '1' },
    { id: 9, segmentLens: '1', segmentCells: '1', segmentRatios: '1' },
    { id: 10, segmentLens: '1', segmentCells: '1', segmentRatios: '1' }
  ])

  const [nbLayers, setNbLayers] = useState<number>(3) //has to be based on transportproperties, data has to be saved somewhere
  const segmentLens = rows.map((row) => row.segmentLens)
  const segmentCells = rows.map((row) => row.segmentCells)
  const segmentRatios = rows.map((row) => row.segmentRatios)

  const columns = [
    {
      field: 'id',
      headerName: 'Layer',
      editable: false,
      width: 50
    },
    {
      field: 'segmentLens',
      headerName: 'Thickness',
      editable: true,
      width: 150,
      validate: isValidFloat
    },
    {
      field: 'segmentCells',
      headerName: 'Cells',
      editable: true,
      width: 150,
      validate: isValidInt
    },
    {
      field: 'segmentRatios',
      headerName: 'Cell Ratio Center/Boundary',
      editable: true,
      width: 150,
      validate: isValidFloat
    }
  ]

  const meshData = generateMesh(
    segmentLens.slice(0, nbLayers),
    segmentCells.slice(0, nbLayers),
    segmentRatios
      .slice(0, nbLayers)
      .map((ratio) => `((0.5 0.5 ${ratio})(0.5 0.5 ${1 / parseFloat(ratio)}))`)
  )
  const vars = [
    { foamObj: ast?.['vertices'], newValue: meshData.vertices },
    { foamObj: ast?.['blocks'], newValue: meshData.blocks },
    {
      foamObj: ast?.['patches']?.value?.[2],
      newValue: meshData.patches.inside
    },
    {
      foamObj: ast?.['patches']?.value?.[5],
      newValue: meshData.patches.outside
    },
    { foamObj: ast?.['patches']?.value?.[8], newValue: meshData.patches.sides }
  ]
  const validate = () => {
    return (
      segmentLens.every(isValidFloat) &&
      segmentCells.every(isValidInt) &&
      segmentRatios.every(isValidFloat)
    )
  }
  function handleClick(_vars) {
    editMaterials(meshData.segmentXCoordinates)
  }

  return (
    <>
      <p />
      Choose how many layers of materal
      <p />
      <CustomSelect
        options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        onChange={(event) => setNbLayers(event.target.value as number)}
        value={nbLayers}
      />
      <p />
      <div>
        <CustomTable
          rows={rows.slice(0, nbLayers)}
          columns={columns}
          setRows={setRows}
        />
      </div>
      <p />
      <Save vars={vars} onClick={handleClick} isValid={validate()} />
    </>
  )
}

export const BlockMeshDict = ({ editMaterials, editABL, ast }) => {
  const { state } = useContext(CaseContext)
  if (state.solverName === 'hamFoam') {
    return <BlockMeshDict1D editMaterials={editMaterials} ast={ast} />
  } else {
    if (state.objFileName) {
      return <BlockMeshDictBackground editABL={editABL} ast={ast} />
    }
    return (
      <div>
        <p />
        Background mesh generation is only supported for custom .obj files.
      </div>
    )
  }
}
