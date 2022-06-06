import React from 'react'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'

interface Props {
  value?: string | number
  label?: string
  options: any[]
  onChange?: (_: any) => void
  style?: {}
  'data-testid'?: string | null
}

export const CustomSelect: React.FC<Props> = ({
  value = '',
  label = '',
  options,
  style = {},
  onChange = (_) => null,
  'data-testid': dataTestId = null
}) => {
  return (
    <FormControl size="small">
      <InputLabel id="select-label">{label}</InputLabel>
      <Select
        style={{ ...style }}
        onChange={onChange}
        value={value}
        labelId="select-label"
        label={label}
        inputProps={{
          'data-testid': dataTestId
        }}
      >
        {options.map((name) => (
          <MenuItem key={name} value={name}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
