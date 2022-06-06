import React from 'react'
import Snackbar from '@mui/material/Snackbar'
import Alert, { AlertColor } from '@mui/material/Alert'
import Slide from '@mui/material/Slide'
import Button from '@mui/material/Button'

function TransitionUp(props) {
  return <Slide {...props} direction="up" />
}

interface Props {
  open?: boolean
  onClose?: (_: any) => void
  style?: {}
  severity?: AlertColor
  children?
  'data-testid'?: string | null
}

export const CustomRetryAlert: React.FC<Props> = ({
  open = true,
  onClose = () => null,
  style = {},
  severity = 'info',
  children = <></>,
  'data-testid': dataTestId = null
}) => {
  const retryButton = (
    <Button size="small" aria-label="retry" color="inherit" onClick={onClose}>
      RETRY
    </Button>
  )
  return (
    <Snackbar
      style={{ ...style }}
      open={open}
      onClose={onClose}
      TransitionComponent={TransitionUp}
      key={TransitionUp ? TransitionUp.name : ''}
    >
      <Alert
        variant={'filled'}
        severity={severity}
        action={retryButton}
        data-testid={dataTestId}
      >
        {children}
      </Alert>
    </Snackbar>
  )
}
