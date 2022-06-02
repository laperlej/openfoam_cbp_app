import React, { useState } from 'react'
import { Save } from './utils/save'
import { isValidFloat } from './utils/validator'
import { CustomTextField } from '../../custom/customTextField'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material'

export const FvSolution = ({ ast }) => {
  const variable = Object.keys(ast?.['solvers']) || []
  const [tolerance, setTolerance] = useState(
    Object.values(ast?.['solvers']).map(
      (varInfo) => varInfo?.['tolerance']?.[0]?.value
    )
  )
  const [relTol, setRelTol] = useState(
    Object.values(ast?.['solvers']).map(
      (varInfo) => varInfo?.['relTol']?.[0]?.value
    )
  )
  const nbLayers = variable.length || 0

  function handleTolChange(event, layer) {
    let newArray = [...tolerance]
    newArray[layer] = event.target.value
    setTolerance(newArray)
  }
  function handleRelTolChange(event, layer) {
    let newArray = [...relTol]
    newArray[layer] = event.target.value
    setRelTol(newArray)
  }

  let vars = []
  for (let i = 0; i < nbLayers; i++) {
    vars.push({
      foamObj: Object.values(ast?.['solvers'])?.[i]?.['tolerance']?.[0],
      newValue: tolerance[i]
    })
    vars.push({
      foamObj: Object.values(ast?.['solvers'])?.[i]?.['relTol']?.[0],
      newValue: relTol[i]
    })
  }

  function layerForms() {
    let layers = []
    for (let i = 0; i < nbLayers; i++) {
      layers.push(
        <TableRow key={i}>
          <TableCell style={{ textAlign: 'center' }}>{variable[i]}</TableCell>
          <TableCell>
            <CustomTextField
              style={{ width: '90px' }}
              value={tolerance[i]}
              validationFn={isValidFloat}
              onChange={(event) => handleTolChange(event, i)}
            />
          </TableCell>
          <TableCell>
            <CustomTextField
              style={{ width: '90px' }}
              value={relTol[i]}
              validationFn={isValidFloat}
              onChange={(event) => handleRelTolChange(event, i)}
            />
          </TableCell>
        </TableRow>
      )
    }
    return layers
  }
  function validate() {
    return tolerance.every(isValidFloat) && relTol.every(isValidFloat)
  }
  return (
    <>
      <p />
      <h3>Convergence Criteria</h3>
      <p />
      <p />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Variable</TableCell>
              <TableCell>Tolerance</TableCell>
              <TableCell>Relative</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{layerForms()}</TableBody>
        </Table>
      </TableContainer>
      <Save vars={vars} isValid={validate()} />
    </>
  )
}
