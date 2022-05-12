import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { Checkbox } from 'semantic-ui-react'
import './runpanel.css';

const RunPanel = ({project, data, tmpFolder, setFolder}) => {
    const [multiProcessing, setMultiProcessing]=useState(false)
    const [latestTime, setLatestTime]=useState(false)
    let navigate = useNavigate();
    const runSolver = () => {
      function postCase() {
        axios.post("/api/sendcase", {caseFiles: data, caseName: project, multiProcessing: multiProcessing, latestTime: latestTime})
          .then((response)=>{setFolder(response.data)})
          .catch((err)=>console.error(err))
      }
      postCase();
      navigate('/log');
    };
    const onMultiProcessingToggle = (event) => {
      setMultiProcessing(!multiProcessing);
    };
    const onLatestTimeToggle = (event) => {
      setLatestTime(!latestTime);
    };
    return (
        <div className={"centered"}>
          <p/>
          Use multiple processors<br/>
          <Checkbox toggle onChange={onMultiProcessingToggle}/><p/>
          {multiProcessing?
            <div>
              Reconstruct only the lastest time ?<br/>
              <Checkbox toggle onChange={onLatestTimeToggle}/><p/>
              Important: Be sure to adjust the decomposeParDict file(s) in the system folder(s).<br/><br/>
            </div>:null}
          <button className={[tmpFolder?'disabled':'primary',"ui","button"].join(' ')} onClick={runSolver} >
            Run and view logs
          </button>
        </div>
    );
};

export default RunPanel;