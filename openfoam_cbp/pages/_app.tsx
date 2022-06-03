import React, { useReducer, useMemo } from 'react'
import TopNav from '../components/navbar/topnav'
import CaseContext from '../components/casecontext'
import { CssBaseline } from '@mui/material'
import '../components/global.css'
import { loader } from '@monaco-editor/react'
import Head from 'next/head'
import { emptyState } from '../components/emptyState'

loader.config({
  paths: { vs: '/monaco-editor/min/vs' }
})

const reducer = (state, action) => {
  return { ...(state || {}), ...(action || {}) }
}

function initState() {
  if (localStorage) {
    return {
      solverName: localStorage?.getItem('solverName') || emptyState.solverName,
      objFileName:
        localStorage?.getItem('objFileName') || emptyState.solverName,
      caseFiles:
        JSON.parse(localStorage?.getItem('caseFiles')) || emptyState.solverName
    }
  }
  return emptyState
}

export default function App({ Component, pageProps }) {
  const [state, dispatch] = useReducer(reducer, emptyState)
  const contextValue = useMemo(() => {
    return { state, dispatch }
  }, [state, dispatch])
  React.useEffect(() => {
    dispatch(initState())
  }, [])
  return (
    <React.Fragment>
      <Head>
        <title>OpenFOAM App</title>
      </Head>
      <CssBaseline />
      <TopNav />
      <CaseContext.Provider value={contextValue}>
        <Component {...pageProps} />
      </CaseContext.Provider>
    </React.Fragment>
  )
}
