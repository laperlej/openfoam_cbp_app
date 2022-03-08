import React, { useEffect, useState, useRef } from 'react';
import {ReflexContainer, ReflexSplitter, ReflexElement} from 'react-reflex'
import 'react-reflex/styles.css'
import { useMonaco } from "@monaco-editor/react";
import Editor from "@monaco-editor/react";
import ProjectFileTree from "./projectfiletree.jsx"
import useWindowHeight from '../../windowheight/windowheight.jsx'
import './editpanel.css';
import UIPanel from './uipanel.jsx'
import Parser from '../../parser/parser.jsx'


const EditPanel = ({project, data}) => {
  //setAst +  data[selectedItem]["text"] + selectedItem need to be in sync
  //selectedItem change -> ast and text need to sync
  //text change -> ast need to sync
  const monaco = useMonaco();
  const parser = new Parser();

  const [editor, setEditor] = useState(null)
  //const [selectedItem, setSelectedItem] = useState("root");
  const selectedItem = useRef("root")
  const [allASTs, setAllASTs] = useState(initASTs())


  function safeParse (key) {
    return fileIsBash(key)?{}:parser.parse(data[key]["text"])
  }
  function initASTs () {
    let astObj = {}
    for (const key in data) {
        astObj[key] = safeParse(key)
    }
    return astObj
  }

  function updateASTs (key) {
      const newASTs = {...allASTs}
      newASTs[key]=safeParse(key)
      setAllASTs(newASTs)
  }

  const handleEditorChange = (editorValue, event) => {
      data[selectedItem.current]["text"]=editorValue;
      updateASTs(selectedItem.current)
  };
  const handleSelectedChange = (newSelectedItem) => {
      selectedItem.current = newSelectedItem
      updateASTs(selectedItem.current)
  }
  function handleEditorDidMount(editor, monaco) {
      setEditor(editor);
  }

  useEffect(() => {
      if (monaco) {
          monaco.editor.defineTheme('gray', {
              base: 'vs',
              inherit: true,
              rules: [],
              colors: {
                  'editor.background': '#f6f8fa',
              },
          });
      }
  }, [monaco]);
  function fileIsBash(key) {
      return ["Allclean", "Allrun", "Allprepare", "reconstructScript", "setset.batch", "buildings.obj"].includes(data[key]["data"]);
  };
  const windowHeight = useWindowHeight;
  
  return (
    <ReflexContainer orientation="vertical" style={{height:windowHeight()-48}}>
        <ReflexElement size="250" className="left-pane">
            <div className={"pane-content gray-bg"}>
              <ProjectFileTree data={data} setSelectedItem={handleSelectedChange} />
            </div>
        </ReflexElement>
        <ReflexSplitter/>
        <ReflexElement className="middle-pane">
            <div className={"pane-content"}>
              <UIPanel project={project} selectedItem={selectedItem.current} data={data} allASTs={allASTs} editor={editor}/>
            </div>
        </ReflexElement>
        <ReflexSplitter/>
        <ReflexElement className="right-pane" style={{overflow:"hidden"}}>
            <div className="pane-content gray-bg">
                <Editor options={{readOnly: fileIsBash(selectedItem.current) || data[selectedItem.current]["hasChildren"], minimap:{enabled:false}}} 
                      path={data[selectedItem.current]["index"]} 
                      defaultValue={data[selectedItem.current]["text"]}
                      defaultLanguage={fileIsBash(selectedItem.current)?"shell":"csharp"} 
                      height={windowHeight()-48}
                      onChange={handleEditorChange}
                      theme="gray"
                      onMount={handleEditorDidMount}
                />
            </div>
        </ReflexElement>
    </ReflexContainer>
  )
};

export default EditPanel;