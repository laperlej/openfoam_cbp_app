import React from 'react'
import Snackbar from '@mui/material/Snackbar'
import Alert, { AlertColor } from '@mui/material/Alert'
import Slide from '@mui/material/Slide'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

function TransitionUp(props) {
  return <Slide {...props} direction="up" />
}

interface Props {
  open?: boolean
  onClose?: (_: any) => void
  style?: {}
  severity?: AlertColor
  children?
}

export const CustomAlert: React.FC<Props> = ({
  open = true,
  onClose = () => null,
  style = {},
  severity = 'info',
  children = <></>
}) => {
  const closeButton = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={onClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  )
  return (
    <Snackbar
      style={{ ...style }}
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      TransitionComponent={TransitionUp}
      key={TransitionUp ? TransitionUp.name : ''}
    >
      <Alert variant={'filled'} severity={severity} action={closeButton}>
        {children}
      </Alert>
    </Snackbar>
  )
}
