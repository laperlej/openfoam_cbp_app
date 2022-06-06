import React from 'react'
import { CustomAlert } from 'components/custom/CustomAlert'
import { CustomRetryAlert } from 'components/custom/CustomRetryAlert'

export const RunStatusMessage = ({ open, onClose, runStatus, postStatus }) => {
  switch (runStatus) {
    case 'unknown':
      return (
        <CustomAlert
          open={open}
          onClose={onClose}
          severity="info"
          data-testid="runstatus-unknown"
        >
          Fetching the current state of the job, please wait...
        </CustomAlert>
      )
    case 'not started':
      return (
        <CustomAlert
          open={open}
          onClose={onClose}
          severity="info"
          data-testid="runstatus-notstarted"
        >
          The solver has not started yet.
        </CustomAlert>
      )
    case 'running':
      return (
        <CustomAlert
          open={open}
          onClose={onClose}
          severity="warning"
          data-testid="runstatus-running"
        >
          Waiting for the solver to finish.
        </CustomAlert>
      )
    case '0':
      switch (postStatus) {
        case 'not started':
          return (
            <CustomAlert
              open={open}
              onClose={onClose}
              severity="success"
              data-testid="runstatus-finished"
            >
              The solver has finished ! Ready to start postprocessing.
            </CustomAlert>
          )
        default:
          return (
            <CustomAlert
              open={open}
              onClose={onClose}
              severity="info"
              data-testid="runstatus-again"
            >
              It is possible to run the postprocess again with different
              settings.
            </CustomAlert>
          )
      }
    case 'no session':
      return (
        <CustomAlert
          open={open}
          onClose={onClose}
          severity="error"
          data-testid="runstatus-nosession"
        >
          No session found. Please start over from the solver section
        </CustomAlert>
      )

    case 'no connection':
      return (
        <CustomRetryAlert
          open={open}
          onClose={onClose}
          severity="error"
          data-testid="runstatus-noconnection"
        >
          Failed to connect to the server. Please try again.
        </CustomRetryAlert>
      )
    default:
      return (
        <CustomAlert
          open={open}
          onClose={onClose}
          severity="error"
          data-testid="runstatus-error"
        >
          An error occured, please review the case files and run again.
        </CustomAlert>
      )
  }
}
