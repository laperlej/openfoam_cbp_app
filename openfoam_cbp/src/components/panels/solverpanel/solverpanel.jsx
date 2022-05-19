import React from 'react';
import { useState, useRef } from 'react';
import { Button, Dropdown } from 'semantic-ui-react'
import { useNavigate } from 'react-router';
import axios from 'axios';
import './solverpanel.css';
import Upload from './upload.jsx'

const options = [{key: "hamFoam", value: "hamFoam", text: "hamFoam"},
                 {key: "urbanMicroclimateFoam", value: "urbanMicroclimateFoam", text: "urbanMicroclimateFoam"},
                 {key: "windDrivenRainFoam", value: "windDrivenRainFoam", text: "windDrivenRainFoam"}]

const SolverPanel = ({setProject, setTmpFolder}) => {
    const [selected, setSelected] =  useState(false)
    const [objFile, setObjFile] =  useState(null)
    const [isUploading, setIsUploading] =  useState(false)
    let navigate = useNavigate();
    const onChange = (e, data) => {
      setSelected(data.value);
      setObjFile(null)
    }
    function newCase() {
      axios.get("/api/newCase", {params: {objFile: objFile}})
        .catch((err)=>console.error(err));
    }
    function onUploadFinish(obj) {
      setObjFile(obj)
      setIsUploading(false)
    }

    return (
        <div className={"centered"}>
          <p />
          <span>Select a solver</span>
          <p />
          <Dropdown 
            placeholder='Solver'
            search selection options={options}
            onChange={onChange}
          />
          <p />
          {(selected && selected!="hamFoam")?
            <>
              <span>Upload an obj file (optional)</span><p/>
              <Upload accept=".obj" onUploadFinish={onUploadFinish} setIsUploading={setIsUploading}/><p/>
            </>:null}
          <Button 
            content="Next"
            className={[(selected && !isUploading)?'primary':'disabled', "ui", "button"].join(' ')}
            onClick={() => {setProject(selected, objFile);setTmpFolder('');newCase();navigate('/edit')} }
          />
        </div>
    );
};

export default SolverPanel;