import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { Button, Progress } from 'semantic-ui-react'

const Upload = ({accept, setObjName, setIsUploading}) => {
    const fileInputRef = useRef("")
    const [file, setFile] = useState({name: ""})
    const [progress, setProgress] = useState(null)
    function onFileChange(event) {
      setFile(event.target.files[0])
    }
    useEffect(()=>{if (progress==100){setIsUploading(false)}}, [progress])
    function upload() {
      setIsUploading(true)
      let formData = new FormData();
      formData.append("file", file)
      axios.post("/api/uploadobj", formData, {
          headers: {"Content-Type": "multipart/form-data"},
          onUploadProgress: data => {
            setProgress(Math.round((100 * data.loaded) / data.total))
          }
      }).then((response)=>setObjName(response.data))
    }
    return (
        (progress)?<Progress
          percent={progress}
          indicating
          size='tiny'
          style={{width: "200px", display: "block", marginLeft: "auto", marginRight: "auto"}}
        >{(progress)==100?"Upload Completed":"Uploading..."}</Progress>:
        <>
          <Button
            content="Choose File" 
            labelPosition="left"
            icon="file"
            onClick={() => fileInputRef.current.click()}
          />
          <input ref={fileInputRef} type="file" accept={accept} hidden onChange={onFileChange}/>
          <br/><span>{file.name}</span><p/>
          {(file.name && !progress)?<Button
            positive
            content="Upload"
            onClick={upload}
          />:null}
        </>
    );
};

export default Upload;