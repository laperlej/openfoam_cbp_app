import React from 'react'
import FormControl from '@mui/material/FormControl'
import { CustomSelect } from '../custom/customSelect'

const options = ['hamFoam', 'urbanMicroclimateFoam', 'windDrivenRainFoam']

export const SolverSelect = ({ value, onChange }) => {
  return (
    <FormControl sx={{ m: 1, minWidth: 240 }} size="small">
      <CustomSelect
        options={options}
        onChange={onChange}
        value={value}
        data-testid="solver-select"
      />
    </FormControl>
  )
}
