import React, { useState } from 'react'
import { Save } from './utils/Save'
import { isValidFloat } from './utils/validators'
import { CustomTable } from 'components/custom/CustomTable'
import { range } from './utils/range'

function init_rows(ast) {
  const variable = Object.keys(ast?.['solvers']) || []
  const nbLayers = variable.length || 0

  const tolerance = Object.values(ast?.['solvers']).map(
    (varInfo) => varInfo?.['tolerance']?.[0]?.value
  )
  const relTol = Object.values(ast?.['solvers']).map(
    (varInfo) => varInfo?.['relTol']?.[0]?.value
  )

  let rows = range(1, nbLayers + 1).map((i) => {
    return {
      id: i,
      var: variable[i - 1],
      tol: tolerance[i - 1],
      relTol: relTol[i - 1]
    }
  })
  return rows
}

export const FvSolution = ({ ast }) => {
  const [rows, setRows] = useState(init_rows(ast))
  const columns = [
    {
      field: 'var',
      headerName: 'Variable',
      editable: false,
      width: 100
    },
    {
      field: 'tol',
      headerName: 'Tolerance',
      editable: true,
      width: 150,
      validate: isValidFloat
    },
    {
      field: 'relTol',
      headerName: 'Relative',
      editable: true,
      width: 150,
      validate: isValidFloat
    }
  ]

  let vars = []
  for (let i = 0; i < rows.length; i++) {
    vars.push({
      foamObj: Object.values(ast?.['solvers'])?.[i]?.['tolerance']?.[0],
      newValue: rows[i].tol
    })
    vars.push({
      foamObj: Object.values(ast?.['solvers'])?.[i]?.['relTol']?.[0],
      newValue: rows[i].relTol
    })
  }
  function validate() {
    return (
      rows.map((row) => row.tol).every(isValidFloat) &&
      rows.map((row) => row.relTol).every(isValidFloat)
    )
  }
  return (
    <>
      <p />
      <h3>Convergence Criteria</h3>
      <p />
      <CustomTable
        width={350}
        rows={rows}
        columns={columns}
        setRows={setRows}
      />
      <p />
      <Save vars={vars} isValid={validate()} />
    </>
  )
}
