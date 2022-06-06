import React from 'react'
import { useState, useContext } from 'react'
import { SelectChangeEvent } from '@mui/material/Select'
import { SolverSelect } from './SolverSelect'
import { Upload } from './Upload'
import axios from 'axios'
import LoadingButton from '@mui/lab/LoadingButton'
import { useRouter } from 'next/router'
import CaseContext from 'components/CaseContext'
import { useMonaco } from '@monaco-editor/react'
import { CustomAlert } from 'components/custom/CustomAlert'

export const SolverPanel = () => {
  const { dispatch } = useContext(CaseContext)
  const [solver, setSolver] = useState('hamFoam')
  const [objFile, setObjFile] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const [sendingCaseStatus, setSendingCaseStatus] = useState('notStarted')
  const router = useRouter()
  const monaco = useMonaco()
  function clearMonaco() {
    if (monaco) monaco.editor.getModels().forEach((model) => model.dispose())
  }
  const onChange = (event: SelectChangeEvent) => {
    setSolver(event.target.value as string)
    setObjFile(null)
  }
  function newCase() {
    setSendingCaseStatus('waiting')
    axios
      .get('/api/newcase', { params: { solver: solver, objFile: objFile } })
      .then((response) => {
        dispatch({
          solverName: solver,
          objFileName: objFile,
          caseFiles: response.data || {
            root: {
              index: 'root',
              data: 'Root item',
              hasChildren: true,
              children: [],
              text: ''
            }
          }
        })
        localStorage.setItem('solverName', solver)
        localStorage.setItem('objFileName', objFile)
        localStorage.setItem('caseFiles', JSON.stringify(response.data))
        clearMonaco()
        router.push('/edit')
      })
      .catch((err) => {
        console.error(err)
        setSendingCaseStatus('error')
      })
  }
  function onUploadFinish() {
    setIsUploading(false)
  }

  function handleClickNext() {
    newCase()
  }

  return (
    <div className={'centered'}>
      <style jsx>{`
        .centered {
          text-align: center;
        }
      `}</style>
      <p />
      <h2>Select a solver</h2>
      <p />
      <SolverSelect value={solver} onChange={onChange} />
      <p />
      {solver && solver != 'hamFoam' ? (
        <>
          <span>Upload an obj file (optional)</span>
          <p />
          <Upload
            accept=".obj"
            setObjFile={setObjFile}
            onUploadFinish={onUploadFinish}
            setIsUploading={setIsUploading}
          />
          <p />
        </>
      ) : null}
      <LoadingButton
        loading={sendingCaseStatus === 'waiting' ? true : false}
        variant="contained"
        data-testid={'solver-next'}
        disabled={isUploading ? true : false}
        onClick={handleClickNext}
      >
        Next
      </LoadingButton>
      <CustomAlert
        open={sendingCaseStatus === 'error'}
        onClose={() => setSendingCaseStatus('notStarted')}
        severity="error"
      >
        Failed to connect to the server. Please try again.
      </CustomAlert>
    </div>
  )
}
