import React from 'react'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'

interface Props {
  value?: any[]
  label?: string
  options: any[]
  onChange?: (_: any) => void
  style?: {}
}

export const CustomMultiSelect: React.FC<Props> = ({
  value = [],
  label = '',
  options,
  style = { width: '200px' },
  onChange = (_) => null
}) => {
  return (
    <FormControl size="small">
      <InputLabel id="select-label">{label}</InputLabel>
      <Select
        value={value}
        labelId="select-label"
        multiple
        style={{ ...style }}
        onChange={onChange}
        label={label}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
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
