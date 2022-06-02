import React from 'react'
import { useEffect, useState, useRef, useCallback } from 'react'
import useWindowHeight from '../windowheight'
import styles from './logpanel.module.css'
import { CustomRetryAlert } from '../custom/customRetryAlert'
import EventSource from 'eventsource'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'

export const LogPanel = () => {
  const [logText, setLogText] = useState('Fetching log files...')
  const logArea = useRef(null)
  const logSource: React.MutableRefObject<EventSource | null> = useRef(null)
  const [connectionError, setConnectionError] = useState(0)

  //SSE
  const listener = useCallback(
    (event) => {
      const type = event.type
      switch (event.type) {
        case 'log':
          try {
            setLogText(`${JSON.parse(event.data)}`)
          } catch {
            console.error('Server sent invalid json.')
          }
          break
        case 'end':
          if (type === 'end') {
            logSource.current.close()
          }
          break
      }
    },
    [logSource]
  )

  const setListeners = useCallback(() => {
    if (logSource.current) {
      logSource.current.addEventListener('message', listener)
      logSource.current.addEventListener('log', listener)
      logSource.current.addEventListener('end', listener)
    }
  }, [logSource, listener])

  const initEventSource = useCallback(() => {
    setConnectionError(0)
    logSource.current = new EventSource(
      new URL('/api/fetchlogs', window.location.origin).href
    ) //warn if connection lost
    logSource.current.onerror = (err) => {
      logSource.current.close()
      if (err.status === 401) {
        setConnectionError(401)
        return
      }
      setConnectionError(1)
    }
    setListeners()
  }, [setListeners, setConnectionError])

  useEffect(() => {
    //document.body.style.overflow = 'hidden'
    initEventSource()
    return () => logSource.current?.close()
  }, [initEventSource])

  const scrollToBottom = () => {
    logArea.current.scrollBy(0, logArea.current.scrollHeight + 100)
  }

  useEffect(() => {
    return () => {
      logSource.current?.close()
    }
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [logText])

  const windowHeight: () => number = useWindowHeight

  return (
    <Box
      style={{
        height: windowHeight() - 68,
        margin: '10px',
        backgroundColor: 'grey'
      }}
    >
      <Paper
        ref={logArea}
        style={{
          height: '100%'
        }}
        className={styles.logarea}
        elevation={24}
      >
        <span data-testid="log-text">{logText}</span>
      </Paper>
      <CustomRetryAlert
        open={connectionError > 0}
        onClose={initEventSource}
        severity="error"
      >
        {(() => {
          switch (connectionError) {
            case 1:
              return 'Lost connection to the server.'
            case 401:
              return 'No session found. Please start over from the solver section'
          }
        })()}
      </CustomRetryAlert>
    </Box>
  )
}
