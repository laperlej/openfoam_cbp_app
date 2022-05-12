import React from 'react';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
//import { Form, TextArea } from 'semantic-ui-react';
import useWindowHeight from '../../windowheight/windowheight.jsx'
import './logpanel.css';

const LogPanel = () => {
    const [state, setState] = useState("Fetching log files...")
    const logArea = useRef(null)
    const isMounted = useRef(false)

    const scrollToBottom = () => {
      logArea.current.scrollBy(0,logArea.current.scrollHeight+100)
    }

    function fetchLogs() {
      axios.get("/api/fetchlogs")
        .then((response)=>{
          setState(response.data)
          if (isMounted.current) {setTimeout(fetchLogs, 1000)}
        })
        .catch((err)=>{
          console.error(err);
          if (isMounted.current) {setTimeout(fetchLogs, 1000)}
        });
    }

    useEffect(() => {
      isMounted.current = true;
      fetchLogs();
      return(()=>isMounted.current = false)
    }, []);

    useEffect(() => {
      scrollToBottom();
    }, [state]);

    const windowHeight = useWindowHeight;
    return (
      <div>
        <form>
          <textarea readOnly={true} ref={logArea} className={["logarea"]} style={{minHeight: windowHeight()-48, width:'100%'}} value={state}/>
        </form>
      </div>
    );
};

export default LogPanel;