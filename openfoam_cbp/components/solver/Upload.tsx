import axios from 'axios'
import React, { useState, useRef, useEffect } from 'react'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import { Box, Button, LinearProgress } from '@mui/material'

export const Upload = ({
  accept,
  onUploadFinish,
  setIsUploading,
  setObjFile
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [file, setFile] = useState(new File([], ''))
  const [progress, setProgress] = useState(null)
  function onFileChange(event) {
    setFile(event.target.files[0])
  }
  useEffect(() => {
    if (progress === 100) {
      onUploadFinish()
    }
  }, [progress, onUploadFinish])
  function upload() {
    setIsUploading(true)
    let formData = new FormData()
    formData.append('file', file)
    axios
      .post('/api/uploadobj', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (data) => {
          setProgress(Math.round((100 * data.loaded) / data.total))
        }
      })
      .then((response) => setObjFile(response.data.filename))
  }
  return progress ? (
    <Box
      sx={{
        width: '200px',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto'
      }}
    >
      <LinearProgress variant="determinate" value={progress} />
      {progress == 100 ? 'Upload Completed' : 'Uploading...'}
    </Box>
  ) : (
    <>
      <Button
        variant="outlined"
        startIcon={<FileUploadIcon />}
        onClick={() => fileInputRef.current.click()}
      >
        Choose File
      </Button>
      <input
        data-testid="solver-input"
        ref={fileInputRef}
        type="file"
        accept={accept}
        hidden
        onChange={onFileChange}
      />
      <br />
      <span>{file.name}</span>
      <p />
      {file.name && !progress ? (
        <Button
          variant="contained"
          color="success"
          data-testid="solver-upload"
          onClick={upload}
        >
          Upload
        </Button>
      ) : null}
    </>
  )
}
