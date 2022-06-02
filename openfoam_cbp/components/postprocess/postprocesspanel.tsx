import React, { useContext } from 'react'
import axios from 'axios'
import { useState, useEffect, useRef, useCallback } from 'react'
import Parser from '../edit/uipanels/utils/parser'
import { CustomAlert } from '../custom/customAlert'
import Switch from '@mui/material/Switch'
import { CustomSelect } from '../custom/customSelect'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'
import { CustomTextField } from '../custom/customTextField'
import { isValidTime } from '../edit/uipanels/utils/validator'
import CaseContext from '../casecontext'
import { CustomMultiSelect } from '../custom/customMultiSelect'
import EventSource from 'eventsource'
import Box from '@mui/material/Box'

const getFieldOptions = (solverName) => {
  switch (solverName) {
    case 'hamFoam':
      return ['pc', 'Ts', 'ws']
    case 'urbanMicroclimateFoam':
      return [
        'alphat',
        'epsilon',
        'gcr',
        'k',
        'nut',
        'p',
        'p_rgh',
        'T',
        'U',
        'w'
      ]
    case 'windDrivenRainFoam':
      return ['epsilon', 'k', 'U', 'nut', 'p']
    default:
      return []
  }
}

function getRegionOptions(caseFiles) {
  const parser = new Parser()
  const ast = parser.parse(caseFiles['constant/regionProperties']['text'])
  let meshRegions = []
  for (const token of ast['regions'].value) {
    if (token.type === 'array') {
      for (const region of token.value) {
        meshRegions.push(region.value)
      }
    }
  }
  return meshRegions
}

const RunStatusMessage = ({ open, onClose, runStatus, postStatus }) => {
  switch (runStatus) {
    case 'unknown':
      return (
        <CustomAlert open={open} onClose={onClose} severity="info">
          Fetching the current state of the job, please wait...
        </CustomAlert>
      )
    case 'not started':
      return (
        <CustomAlert open={open} onClose={onClose} severity="info">
          The solver has not started yet.
        </CustomAlert>
      )
    case 'running':
      return (
        <CustomAlert open={open} onClose={onClose} severity="warning">
          Waiting for the solver to finish.
        </CustomAlert>
      )
    case '0':
      switch (postStatus) {
        case 'not started':
          return (
            <CustomAlert open={open} onClose={onClose} severity="success">
              The solver has finished ! Ready to start postprocessing.
            </CustomAlert>
          )
        default:
          return (
            <CustomAlert open={open} onClose={onClose} severity="info">
              It is possible to run the postprocess again with different
              settings.
            </CustomAlert>
          )
      }
    default:
      return (
        <CustomAlert open={open} onClose={onClose} severity="error">
          An error occured, please review the case files and run again.
        </CustomAlert>
      )
  }
}

const PostStatusMessage = ({ postStatus }) => {
  switch (postStatus) {
    case 'unknown':
      return null
    case 'not started':
      return null
    case 'running':
      return (
        <Alert severity="warning" icon={false}>
          Please wait for the postprocessing to finish.
          <p />
          <LoadingButton variant="contained" disabled={true} loading={true}>
            Click to Download
          </LoadingButton>
        </Alert>
      )
    case '0':
      return (
        <Alert severity="success" icon={false}>
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
        <Alert severity="error">
          An error occured. Review the logs and postprocess parameters and try
          again.
        </Alert>
      )
  }
}

export const PostProcessPanel = () => {
  const { state } = useContext(CaseContext)
  const [runStatus, setRunStatus] = useState('unkown')
  const [postStatus, setPostStatus] = useState('unkown')
  const [fields, setFields] = useState([])
  const [region, setRegion] = useState('')
  const [times, setTimes] = useState('')
  const [allPatches, setAllPatches] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [connectionError, setConnectionError] = useState(0)
  const statusSource: React.MutableRefObject<EventSource | null> = useRef(null)
  //alerts
  const [showAlert, setShowAlert] = useState(true)
  useEffect(() => {
    setShowAlert(true)
  }, [runStatus, postStatus])

  //SSE
  const listener = useCallback(
    (event) => {
      switch (event.type) {
        case 'runStatus':
          setRunStatus(event.data)
          break
        case 'postStatus':
          setPostStatus(event.data)
          break
        case 'end':
          statusSource.current.close()
          break
      }
    },
    [statusSource]
  )

  const setListeners = useCallback(() => {
    if (statusSource.current) {
      statusSource.current.addEventListener('runStatus', listener)
      statusSource.current.addEventListener('postStatus', listener)
      statusSource.current.addEventListener('end', listener)
    }
  }, [statusSource, listener])

  const initEventSource = useCallback(() => {
    setConnectionError(0)
    statusSource.current = new EventSource(
      new URL('/api/status', window.location.origin).href
    )
    statusSource.current.onerror = (err) => {
      statusSource.current.close()
      if (err.status === 401) {
        setConnectionError(401)
        return
      }
      setConnectionError(1)
    }
    setListeners()
  }, [setListeners, setConnectionError])

  useEffect(() => {
    initEventSource()
    return () => statusSource.current?.close()
  }, [initEventSource])

  //postprocess
  const runPostprocess = () => {
    function postPostprocess() {
      try {
        axios.post('/api/postprocess', {
          fields: fields,
          region: region,
          times: times,
          allPatches: allPatches
        })
      } catch (err) {
        if (err.response.status === 401) {
          setPostStatus('401')
          return
        }
        setPostStatus('1')
      }
    }
    postPostprocess()
    setPostStatus('running')
  }

  const toggleAllPatches = () => {
    setAllPatches(!allPatches)
  }

  return (
    <div className={'centered'}>
      <p />
      <h1 style={{ marginTop: '0px' }}>Postprocessing Options</h1>
      <p />
      Select one or many fields to include (optional)
      <br />
      <span style={{ color: '#CCCCCC' }}>
        Leave empty to include all fields
      </span>
      <p />
      <CustomMultiSelect
        value={fields}
        label="Fields"
        options={getFieldOptions(state.solverName)}
        onChange={(event) => setFields(event.target.value)}
      />
      <p />
      {state.caseFiles['constant/regionProperties'] && (
        <>
          Specify alternative mesh region (optional)
          <p />
          <CustomSelect
            style={{ width: '200px' }}
            onChange={(event) => setRegion(event.target.value)}
            label={'Region'}
            options={getRegionOptions(state.caseFiles)}
          />
          <p />
        </>
      )}
      Select which times to include (optional)
      <br />
      <span style={{ color: '#CCCCCC' }}>Leave empty to include all times</span>
      <br />
      <span style={{ color: '#CCCCCC' }}>
        comma-separated time ranges - eg, &apos;0:10,20,40:70,1000:&apos;
      </span>
      <br />
      <CustomTextField
        value={times}
        style={{ width: '200px' }}
        label={'Times'}
        validationFn={isValidTime}
        onChange={(event) => setTimes(event.target.value)}
      />
      <br />
      <p />
      Combine all patches into a single file
      <br />
      <Switch onChange={toggleAllPatches} />
      <p />
      <LoadingButton
        variant="contained"
        onClick={runPostprocess}
        loading={runStatus == 'running'}
        disabled={runStatus !== '0' || !isValidTime(times)}
        data-testid="post-start"
      >
        Run Postprocess
      </LoadingButton>
      <p />
      <RunStatusMessage
        open={showAlert}
        onClose={() => setShowAlert(false)}
        runStatus={runStatus}
        postStatus={postStatus}
      />
      <Box
        sx={{ display: 'inline-block', margin: 'auto', textAlign: 'center' }}
      >
        <PostStatusMessage postStatus={postStatus} />
      </Box>
      <br />
      <br />
      <br />
      <br />
    </div>
  )
}
