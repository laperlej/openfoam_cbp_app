import React, { useState } from 'react'
import { Save } from './utils/save'
import { isValidFloat, isValidInt } from './utils/validator'
import { CustomTable } from '../../custom/customTable'

const materialChoices = [
  'AcrylicPaint',
  'BuildingPaper',
  'GlassFiberInsulation',
  'GypsumBoard',
  'Hamstad1Concrete',
  'Hamstad1Insulation',
  'Hamstad3Wall',
  'Hamstad4Brick',
  'Hamstad4Plaster',
  'Hamstad5Brick',
  'Hamstad5Insulation',
  'Hamstad5Mortar',
  'Masonry',
  'OSB',
  'SBPO',
  'Soil',
  'VanGenuchten',
  'VanGenuchtenVapDiff',
  'VWC'
]

function range(start, end): Array<number> {
  return Array.from(Array(end).keys()).slice(start)
}

function init_rows(ast) {
  const nbLayers = ast?.['buildingMaterials']?.value?.length || 0

  const materials = ast?.['buildingMaterials']?.value.map(
    (materialObj) => materialObj?.['buildingMaterialModel']?.[0]?.value
  )

  const rho = ast?.['buildingMaterials']?.value.map(
    (materialObj) => materialObj?.['rho']?.[0]?.value
  )

  const cap = ast?.['buildingMaterials']?.value.map(
    (materialObj) => materialObj?.['cap']?.[0]?.value
  )

  const l1 = ast?.['buildingMaterials']?.value.map(
    (materialObj) => materialObj?.['lambda1']?.[0]?.value
  )

  const l2 = ast?.['buildingMaterials']?.value.map(
    (materialObj) => materialObj?.['lambda2']?.[0]?.value
  )

  let rows = range(1, nbLayers + 1).map((i) => {
    return {
      id: i,
      material: materials[i - 1],
      rho: rho[i - 1],
      cap: cap[i - 1],
      l1: l1[i - 1],
      l2: l2[i - 1]
    }
  })
  return rows
}

export const HamTransportProperties = ({ ast }) => {
  const [rows, setRows] = useState(init_rows(ast))
  const columns = [
    {
      field: 'id',
      headerName: 'Layer',
      editable: false,
      width: 50
    },
    {
      field: 'material',
      headerName: 'Material',
      editable: true,
      width: 170,
      options: materialChoices
    },
    {
      field: 'rho',
      headerName: 'Rho',
      editable: true,
      width: 70,
      validate: isValidInt
    },
    {
      field: 'cap',
      headerName: 'Cap',
      editable: true,
      width: 70,
      validate: isValidInt
    },
    {
      field: 'l1',
      headerName: 'Lambda1',
      editable: true,
      width: 80,
      validate: isValidFloat
    },
    {
      field: 'l2',
      headerName: 'Lambda2',
      editable: true,
      width: 80,
      validate: isValidFloat
    }
  ]

  let vars = []
  for (let i = 0; i < rows.length; i++) {
    vars.push({
      foamObj:
        ast?.['buildingMaterials']?.value?.[i]?.['buildingMaterialModel']?.[0],
      newValue: rows[i].material
    })
    vars.push({
      foamObj: ast?.['buildingMaterials']?.value?.[i]?.['rho']?.[0],
      newValue: rows[i].rho
    })
    vars.push({
      foamObj: ast?.['buildingMaterials']?.value?.[i]?.['cap']?.[0],
      newValue: rows[i].cap
    })
    vars.push({
      foamObj: ast?.['buildingMaterials']?.value?.[i]?.['lambda1']?.[0],
      newValue: rows[i].l1
    })
    vars.push({
      foamObj: ast?.['buildingMaterials']?.value?.[i]?.['lambda2']?.[0],
      newValue: rows[i].l2
    })
  }

  function validate() {
    return (
      rows.map((row) => row.rho).every(isValidInt) &&
      rows.map((row) => row.cap).every(isValidInt) &&
      rows.map((row) => row.l1).every(isValidFloat) &&
      rows.map((row) => row.l2).every(isValidFloat)
    )
  }
  return (
    <>
      <p />
      <h3>Materials configuration</h3>
      <p />
      <CustomTable rows={rows} columns={columns} setRows={setRows} />
      <p />
      <Save vars={vars} isValid={validate()} />
    </>
  )
}
