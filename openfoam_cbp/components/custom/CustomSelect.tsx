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
  allowEmpty?: boolean
}

export const CustomSelect: React.FC<Props> = ({
  value = '',
  label = '',
  options,
  style = {},
  allowEmpty = false,
  onChange = (_) => null,
  'data-testid': dataTestId = null
}) => {
  let menuItems = options.map((name) => (
    <MenuItem key={name} value={name}>
      {name}
    </MenuItem>
  ))
  if (allowEmpty) {
    menuItems = [
      <MenuItem key={'none'} value={''}>
        {<em>none</em>}
      </MenuItem>,
      ...menuItems
    ]
  }
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
        {menuItems}
      </Select>
    </FormControl>
  )
}
