import React, {
  useEffect,
  useContext,
  useState,
  useRef,
  useCallback
} from 'react'
import { ReflexContainer, ReflexSplitter, ReflexElement } from 'react-reflex'
import Editor, { useMonaco } from '@monaco-editor/react'
import { ProjectFileTree } from './ProjectFileTree'
import useWindowHeight from 'components/useWindowHeight'
import styles from './EditPanel.module.css'
import UIPanel from './UIPanel'
import Parser from './uipanels/utils/Parser'
import CaseContext from '../CaseContext'
import 'react-reflex/styles.css'
import 'react-complex-tree/lib/style.css'
import EditorContext from 'components/EditorContext'
import { emptyState } from 'components/emptyState'

export const EditPanel = () => {
  const { state } = useContext(CaseContext)
  const solverName = state?.solverName || emptyState.solverName
  const caseFiles = state?.caseFiles || emptyState.caseFiles
  const monaco = useMonaco()
  const [editor, setEditor] = useState(null)
  const parser = new Parser()
  const selectedItem = useRef('root')
  const [allASTs, setAllASTs] = useState(initASTs())
  const saveFilesTimeout = useRef(null)

  function safeParse(key) {
    return fileIsBash(key) ? {} : parser.parse(caseFiles[key]['text'])
  }
  function initASTs() {
    let astObj = {}
    for (const key in caseFiles) {
      astObj[key] = safeParse(key)
    }
    return astObj
  }

  function updateASTs(key) {
    const newASTs = { ...allASTs }
    newASTs[key] = safeParse(key)
    setAllASTs(newASTs)
  }

  const saveCaseFiles = useCallback(() => {
    try {
      localStorage.setItem('caseFiles', JSON.stringify(caseFiles))
    } finally {
      clearTimeout(saveFilesTimeout.current)
      saveFilesTimeout.current = null
    }
  }, [caseFiles])

  useEffect(() => {
    return saveCaseFiles
  }, [saveCaseFiles])

  const handleEditorChange = (editorValue, _event) => {
    if (!saveFilesTimeout.current) {
      saveFilesTimeout.current = setTimeout(saveCaseFiles, 300)
    }
    caseFiles[selectedItem.current]['text'] = editorValue
    updateASTs(selectedItem.current)
  }

  const handleSelectedChange = (newSelectedItem) => {
    selectedItem.current = newSelectedItem
    updateASTs(selectedItem.current)
  }

  function handleEditorDidMount(editor, _monaco) {
    setEditor(editor)
  }

  useEffect(() => {
    if (monaco) {
      monaco.editor.defineTheme('gray', {
        base: 'vs',
        inherit: true,
        rules: [],
        colors: {
          'editor.background': '#f6f8fa'
        }
      })
    }
  }, [monaco])
  function fileIsBash(key) {
    return [
      'Allclean',
      'Allrun',
      'Allprepare',
      'reconstructScript',
      'setset.batch',
      'buildings.obj'
    ].includes(caseFiles[key]['data'])
  }
  const windowHeight: () => number = useWindowHeight
  return (
    <ReflexContainer
      orientation="vertical"
      style={{ height: windowHeight() - 48 }}
    >
      <ReflexElement size={250} className="left-pane">
        <div className={`pane-content ${styles.graybg}`}>
          <ProjectFileTree
            data={caseFiles}
            setSelectedItem={handleSelectedChange}
          />
        </div>
      </ReflexElement>
      <ReflexSplitter />
      <ReflexElement className="middle-pane">
        <div className={'pane-content'}>
          <EditorContext.Provider value={editor}>
            <UIPanel
              solverName={solverName}
              selectedItem={selectedItem.current}
              data={caseFiles}
              allASTs={allASTs}
            />
          </EditorContext.Provider>
        </div>
      </ReflexElement>
      <ReflexSplitter />
      <ReflexElement className="right-pane" style={{ overflow: 'hidden' }}>
        <div className={`pane-content ${styles.graybg}`}>
          <Editor
            options={{
              readOnly:
                fileIsBash(selectedItem.current) ||
                caseFiles[selectedItem.current]['hasChildren'],
              minimap: { enabled: false }
            }}
            path={caseFiles[selectedItem.current]['index']}
            defaultValue={caseFiles[selectedItem.current]['text']}
            defaultLanguage={
              fileIsBash(selectedItem.current) ? 'shell' : 'csharp'
            }
            height={windowHeight() - 48}
            onChange={handleEditorChange}
            theme="gray"
            onMount={handleEditorDidMount}
          />
        </div>
      </ReflexElement>
    </ReflexContainer>
  )
}
