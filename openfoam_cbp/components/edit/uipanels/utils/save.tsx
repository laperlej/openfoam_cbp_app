import React, { useState, useRef, useContext } from 'react'
import Button from '@mui/material/Button'
import { useMonaco } from '@monaco-editor/react'
import EditorContext from '../../../editorcontext'
import { CustomAlert } from '../../../custom/customAlert'

class Highlighter {
  monaco: any
  editor: any
  newDecorations: any[]
  minLine: number
  oldDecorations: any
  constructor(
    monaco: any,
    editor: any,
    oldDecorations: React.MutableRefObject<any[]>
  ) {
    this.monaco = monaco
    this.editor = editor
    this.newDecorations = []
    this.minLine = Number.MAX_SAFE_INTEGER
    this.oldDecorations = oldDecorations
  }
  push(
    foamObj: { value: any; range: [number, number, number, number] },
    newValue: any
  ) {
    if (foamObj.value != newValue) {
      const range = new this.monaco.Range(...foamObj.range)
      this.newDecorations.push({
        range: range,
        options: { inlineClassName: 'highlightMonaco' }
      })
      this.minLine = Math.min(this.minLine, range.startLineNumber)
    }
  }
  highlight() {
    this.oldDecorations.current = this.editor.deltaDecorations(
      this.oldDecorations.current,
      this.newDecorations
    )
    if (this.minLine < Number.MAX_SAFE_INTEGER)
      this.editor.revealLineInCenter(this.minLine)
    this.newDecorations = []
    return this.oldDecorations.current.length == 0
  }
}

class EditMaker {
  monaco: any
  editor: any
  edits: any[]
  constructor(monaco: any, editor) {
    this.monaco = monaco
    this.editor = editor
    this.edits = []
  }
  push(
    foamObj: { value: any; range: [number, number, number, number] },
    newValue: any
  ) {
    if (foamObj.value != newValue) {
      const range = new this.monaco.Range(...foamObj.range)
      this.edits.push({ range: range, text: newValue })
    }
  }
  edit() {
    this.editor.executeEdits('', this.edits)
    this.edits = []
  }
}

export const Save = ({ vars, isValid = true, onClick = (_vars) => null }) => {
  const [warn, setWarn] = useState(false)
  const oldDecorations = useRef([])
  const monaco = useMonaco()
  const editor = useContext(EditorContext)
  const highlighter = new Highlighter(monaco, editor, oldDecorations)
  const editMaker = new EditMaker(monaco, editor)
  const save = () => {
    for (const i in vars) {
      if (vars[i].foamObj) {
        editMaker.push(vars[i].foamObj, vars[i].newValue)
        highlighter.push(vars[i].foamObj, vars[i].newValue)
      }
    }
    setWarn(highlighter.highlight())
    editMaker.edit()
    onClick(vars)
  }
  return (
    <>
      <Button
        disabled={isValid ? false : true}
        onClick={save}
        variant="contained"
        data-testid="edit-save"
      >
        Save
      </Button>
      <CustomAlert open={warn} onClose={() => setWarn(false)} severity="info">
        No changes needed.
      </CustomAlert>
      <p />
    </>
  )
}
