import React, { useContext } from 'react'
import axios from 'axios'
import { useState, useEffect, useRef, useCallback } from 'react'
import Parser from 'components/edit/uipanels/utils/Parser'
import Switch from '@mui/material/Switch'
import { CustomSelect } from '../custom/CustomSelect'
import LoadingButton from '@mui/lab/LoadingButton'
import { CustomTextField } from '../custom/CustomTextField'
import { isValidTime } from 'components/edit/uipanels/utils/validators'
import CaseContext from 'components/CaseContext'
import { CustomMultiSelect } from 'components/custom/CustomMultiSelect'
import EventSource from 'eventsource'
import Box from '@mui/material/Box'
import { emptyState } from 'components/emptyState'
import { RunStatusMessage } from './statusMessages/RunStatusMessage'
import { PostStatusMessage } from './statusMessages/PostStatusMessage'

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

export const PostProcessPanel = () => {
  const { state } = useContext(CaseContext)
  const solverName = state?.solverName || emptyState.solverName
  const caseFiles = state?.caseFiles || emptyState.caseFiles
  const [runStatus, setRunStatus] = useState('unknown')
  const [postStatus, setPostStatus] = useState('unknown')
  const [fields, setFields] = useState([])
  const [region, setRegion] = useState('')
  const [times, setTimes] = useState('')
  const [allPatches, setAllPatches] = useState(false)
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
    setRunStatus('unknown')
    statusSource.current = new EventSource(
      new URL('/api/status', window.location.origin).href
    )
    statusSource.current.onerror = (err) => {
      statusSource.current.close()
      if (err.status === 401) {
        setRunStatus('no session')
        return
      }
      if (err.status === 400 || err.status === 502) {
        setRunStatus('no connection')
        return
      }
      setRunStatus('1')
    }
    setListeners()
  }, [setListeners, setRunStatus])

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
          setPostStatus('no session')
          setRunStatus('no session')
          return
        }
        if (err.response.status === 400 || err.response.status === 502) {
          setPostStatus('no connection')
          setRunStatus('no connection')
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
        options={getFieldOptions(solverName)}
        onChange={(event) => setFields(event.target.value)}
      />
      <p />
      {caseFiles['constant/regionProperties'] && (
        <>
          Specify alternative mesh region (optional)
          <p />
          <CustomSelect
            style={{ width: '200px' }}
            onChange={(event) => setRegion(event.target.value)}
            label={'Region'}
            options={getRegionOptions(caseFiles)}
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
