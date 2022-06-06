import React from 'react'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'

export const PostStatusMessage = ({ postStatus }) => {
  switch (postStatus) {
    case 'unknown':
      return null
    case 'not started':
      return null
    case 'running':
      return (
        <Alert severity="warning" icon={false} data-testid="poststatus-running">
          Please wait for the postprocessing to finish.
          <p />
          <LoadingButton variant="contained" disabled={true} loading={true}>
            Click to Download
          </LoadingButton>
        </Alert>
      )
    case '0':
      return (
        <Alert severity="success" icon={false} data-testid="poststatus-success">
          Your file is ready !<p />
          <Button
            variant="contained"
            onClick={() => {
              window.location.href = `/api/download`
            }}
            data-testid="post-download"
          >
            Click to Download
          </Button>
        </Alert>
      )
    default:
      return (
        <Alert severity="error" data-testid="poststatus-error">
          An error occured. Review the logs and postprocess parameters and try
          again.
        </Alert>
      )
  }
}
