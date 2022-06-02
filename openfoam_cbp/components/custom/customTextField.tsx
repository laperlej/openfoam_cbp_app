import React from 'react'
import TextField from '@mui/material/TextField'

interface Props {
  value?: any
  validationFn?: (_: any) => boolean
  onChange?: (_: any) => void
  style?: {}
  label?: string
  'data-testid'?: string | null
}

export const CustomTextField: React.FC<Props> = ({
  value = '',
  validationFn = (_) => true,
  onChange = () => null,
  style = { width: '70px' },
  label = '',
  'data-testid': dataTestId = null
}) => {
  return (
    <TextField
      style={{ ...style }}
      label={validationFn(value) ? label : 'error'}
      error={validationFn(value) ? false : true}
      onChange={onChange}
      defaultValue={value}
      inputProps={{
        'data-testid': dataTestId
      }}
      size="small"
    />
  )
}
