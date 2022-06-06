import React, { useState } from 'react'
import { Save } from './utils/Save'
import { CustomSelect } from 'components/custom/CustomSelect'
import { FormControl } from '@mui/material'

const rasModels = [
  'LRR',
  'LaunderSharmaKE',
  'RNGkEpsilon',
  'SSG',
  'SpalartAllmaras',
  'buoyantKEpsilon',
  'kEpsilon',
  'kOmega',
  'kOmegaSST',
  'kOmegaSSTLM',
  'kOmegaSSTSAS',
  'porousrealizableKE',
  'realizableKE',
  'v2f'
]

export const Turbulence = ({ ast }) => {
  const [rasModel, setRasModel] = useState(
    ast?.['RAS']['RASModel']?.[0]?.value || 'kEpsilon'
  )
  const vars = [{ foamObj: ast?.['RAS']['RASModel']?.[0], newValue: rasModel }]

  function validate() {
    return true
  }
  return (
    <>
      <p />
      <h3>RAS Model</h3>
      <p />
      note: this may require changes to the fvschemes file.
      <br />
      <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
        <CustomSelect
          style={{ width: '150px' }}
          options={rasModels}
          onChange={(event) => setRasModel(event.target.value)}
          value={rasModel}
        />
      </FormControl>
      <p />
      <br />
      <Save vars={vars} isValid={validate()} />
    </>
  )
}
