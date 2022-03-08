import React from 'react';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { Message, Dropdown, Input, Checkbox } from 'semantic-ui-react'
import './postprocesspanel.css';
import Parser from '../../parser/parser.jsx'

const fieldOptions = {
  "hamFoam" :[
  { key: 'Ts', text: 'Ts', value: 'Ts' },
  { key: 'pc', text: 'pc', value: 'pc' },
  { key: 'ws', text: 'ws', value: 'ws' },
],
  "urbanMicroclimateFoam" :[
  { key: 'T', text: 'T', value: 'T' },
  { key: 'U', text: 'U', value: 'U' },
  { key: 'alphat', text: 'alphat', value: 'alphat' },
  { key: 'epsilon', text: 'epsilon', value: 'epsilon' },
  { key: 'gcr', text: 'gcr', value: 'gcr' },
  { key: 'k', text: 'k', value: 'k' },
  { key: 'nut', text: 'nut', value: 'nut' },
  { key: 'p', text: 'p', value: 'p' },
  { key: 'p_rgh', text: 'p_rgh', value: 'p_rgh' },
  { key: 'w', text: 'w', value: 'w' },
],
  "windDrivenRainFoam" :[
  { key: 'U', text: 'U', value: 'U' },
  { key: 'epsilon', text: 'epsilon', value: 'epsilon' },
  { key: 'k', text: 'k', value: 'k' },
  { key: 'nut', text: 'nut', value: 'nut' },
  { key: 'p', text: 'p', value: 'p' },
]}

const RunStatusMessage = ({runStatus, postStatus}) => {
  switch (runStatus) {
    case 'unknown':
      return(<Message compact info>Fetching the current state of the job, please wait.</Message>)
    case 'not started':
      return(<Message compact info>The solver is not started yet.</Message>)
    case 'running':
      return(<Message compact warning>Waiting for the solver to finish.</Message>)
    case '0':
      switch (postStatus) {
        case 'not started':
          return(<Message compact positive>The solver has finished ! Ready to start postprocessing.</Message>)
        default:
          return(<Message compact info>It is possible to run the postprocess again with different settings.</Message>)
      }
    default:
      return(<Message compact negative>An error occured, please review the case files and run again.</Message>)
  }
}

const PostStatusMessage = ({postStatus}) => {
  switch (postStatus) {
    case 'unknown':
      return(null)
    case 'not started':
      return(null)
    case 'running':
      return(
        <Message compact warning Icon>
          Please wait for the postprocessing to finish.<p/>
          <button className={['disabled', "ui", "button", "loading"].join(' ')} >
            Click to Download
          </button>
        </Message>)
    case '0':
      return(
        <Message compact positive>
          Your file is ready !<p/>
          <button className={['primary', "ui", "button"].join(' ')} onClick={()=>{window.location.href=`/api/download`}} >
            Click to Download
          </button>
        </Message>)
    default:
      return(<Message>An error occured. Review the logs and postprocess parameters and try again.</Message>)
  }
}

const PostProcessPanel = ({project, data}) => {
    const runStatusRef = useRef("unknown")
    const postStatusRef = useRef("unknown")
    const [runStatus, setRunStatus] = useState("unknown")
    const [postStatus, setPostStatus] = useState("unknown")
    const [isValidTime, setIsValidTime] = useState(true)
    const [fields, setFields] = useState([])
    const [region, setRegion] = useState("")
    const [regionOptions, setRegionOptions] = useState([])
    const [times, setTimes] = useState("")
    const [allPatches, setAllPatches] = useState(false)
    const isMounted = useRef(false)

    function getRegions() {
      const parser = new Parser();
      const ast = parser.parse(data["constant/regionProperties"]["text"]);
      let meshRegions = []
      for (const token of ast["regions"]) {
        if (Array.isArray(token)) {
          for (const region of token) {
            meshRegions.push(region.value)
          }
        }
      }
      setRegionOptions(arrayToOptions(meshRegions))
    }

    useEffect(() => {
      setIsValidTime(/^[0-9:,]*$/.test(times))
    }, [times])

    function arrayToOptions (arr) {
        let options = []
        for (const option of arr) {
          if (option) {
            options.push({ key: option, text: option, value: option })
          }
        }
        return options
    }

    async function fetchState(url, statusRef, setStatus, callback) {
      try {
        await axios.get(url, { 
          params: { 
            lastStatus: statusRef.current
          }
        }).then((response)=>{
          statusRef.current = response.data["status"];
          setStatus(response.data["status"]);
          if (isMounted.current) {setTimeout(()=>callback(), 1000)}
        });
      } catch (err) {
        console.error(err);
      }
    }

    const fetchRunStatus = () => {
      fetchState("/api/runStatus", runStatusRef, setRunStatus, fetchRunStatus)
    }
    const fetchPostStatus = () => {
      fetchState("/api/postStatus", postStatusRef, setPostStatus, fetchPostStatus)
    }

    //on mount
    useEffect(() => {
      isMounted.current = true;
      if (data["constant/regionProperties"]){
        getRegions();
      };
      fetchRunStatus()
      fetchPostStatus()
      return(()=>isMounted.current = false)
    }, []);

    const runPostprocess = () => {
      console.log("launching postprocess")
      function postPostprocess() {
        try {
          axios.post("/api/postprocess", {fields: fields, region: region, times: times, allPatches: allPatches});
        } catch (err) {
          console.error(err);
        }
      }
      postPostprocess();
      setPostStatus("running");
    };

    return (
        <div className={"centered"}>
          <p/>
          <RunStatusMessage runStatus={runStatus} postStatus={postStatus}/>
          <h1 className={"shortmargin"}>Postprocessing Options</h1><p/>

          Select one or many fields to include<br/>
          <span style={{color:'#CCCCCC'}}>Leave empty to include all fields</span><br/>
          <Dropdown onChange={(event, data)=>setFields(data.value)} placeholder='Fields' multiple selection options={fieldOptions[project]} /><p/>

          {data["constant/regionProperties"] && 
            <>
              Specify alternative mesh region. (optional)<br/>
              <Dropdown onChange={(event, data)=>setRegion(data.value)} placeholder='Regions' selection options={regionOptions} /><p/>
            </>
          }

          Select which times to include<br/>
          <span style={{color:'#CCCCCC'}}>Leave empty to include all times</span><br/>
          <span style={{color:'#CCCCCC'}}>comma-separated time ranges - eg, '0:10,20,40:70,1000:'</span><br/>
          <Input className={isValidTime?null:"error"} onChange={(event,data)=>setTimes(data.value)} placeholder="Times" /><br/><p/>

          Combine all patches into a single file<br/>
          <Checkbox onChange={(event,data)=>setAllPatches(data.checked)} toggle /><p/>

          <br/>
          <button className={[((runStatus=="0")&&isValidTime)?'primary':'disabled', (runStatus=="running")?'loading':null, "ui", "button"].join(' ')} onClick={runPostprocess} >
            Run Postprocess
          </button><p/>

          <PostStatusMessage postStatus={postStatus}/>
        </div>
    );
};
export default PostProcessPanel;