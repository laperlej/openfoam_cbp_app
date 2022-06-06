import React, { useContext } from 'react'
import { useState } from 'react'
import axios from 'axios'
import LoadingButton from '@mui/lab/LoadingButton'
import Switch from '@mui/material/Switch'
import { useRouter } from 'next/router'
import CaseContext from 'components/CaseContext'
import { CustomAlert } from 'components/custom/CustomAlert'

export const RunPanel = () => {
  const { state } = useContext(CaseContext)
  const [multiProcessing, setMultiProcessing] = useState(false)
  const [latestTime, setLatestTime] = useState(true)
  const [sendingCaseStatus, setSendingCaseStatus] = useState('notStarted')
  const router = useRouter()
  const runSolver = () => {
    function postCase() {
      setSendingCaseStatus('waiting')
      axios
        .post('/api/runcase', {
          caseFiles: state.caseFiles,
          multiProcessing: multiProcessing,
          latestTime: latestTime
        })
        .then(() => {
          router.push('/log')
        })
        .catch((err) => {
          if (err.response.status === 401) {
            setSendingCaseStatus('noSession')
            return
          }
          setSendingCaseStatus('error')
        })
    }
    postCase()
  }
  const onMultiProcessingToggle = () => {
    setMultiProcessing(!multiProcessing)
  }
  const onLatestTimeToggle = () => {
    setLatestTime(!latestTime)
  }
  return (
    <div className={'centered'}>
      <p />
      Use multiple processors
      <br />
      <Switch onChange={onMultiProcessingToggle} />
      <p />
      {multiProcessing ? (
        <div>
          Reconstruct only the lastest time
          <br />
          <Switch defaultChecked onChange={onLatestTimeToggle} />
          <p />
          <b>Important</b>:{' '}
          <i>
            Be sure to adjust the decomposeParDict file(s) in the system
            folder(s).
          </i>
          <br />
          <br />
        </div>
      ) : null}
      <LoadingButton
        loading={sendingCaseStatus === 'waiting' ? true : false}
        disabled={state.solverName ? false : true}
        onClick={runSolver}
        variant="contained"
        data-testid="run-start"
      >
        Run and view logs
      </LoadingButton>
      <CustomAlert
        open={
          sendingCaseStatus === 'error' || sendingCaseStatus === 'noSession'
        }
        onClose={() => setSendingCaseStatus('notStarted')}
        severity="error"
      >
        {sendingCaseStatus === 'error'
          ? 'Failed to connect to the server. Please try again.'
          : 'No session found. Please start over from the solver section'}
      </CustomAlert>
    </div>
  )
}
