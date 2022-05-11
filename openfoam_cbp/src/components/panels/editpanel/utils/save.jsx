import React, { useState, useRef } from 'react';
import { Button, Message } from 'semantic-ui-react'

class Highlighter {
    constructor(editor, oldDecorations) {
        this.editor=editor
        this.newDecorations=[];
        this.minLine = Number.MAX_SAFE_INTEGER;
        this.oldDecorations=oldDecorations;
    }
    push(foamObj, newValue) {
        if (foamObj.value != newValue) {
            const range = new monaco.Range(...foamObj.range)
            this.newDecorations.push({range: range, options: { inlineClassName: 'highlightMonaco' }})
            this.minLine = Math.min(this.minLine, range.startLineNumber)
        }
    }
    highlight() {
        this.oldDecorations.current = this.editor.deltaDecorations(this.oldDecorations.current, this.newDecorations);
        if (this.minLine < Number.MAX_SAFE_INTEGER) this.editor.revealLineInCenter(this.minLine);
        this.newDecorations = [];
        return (this.oldDecorations.current.length == 0)
    }
}

class EditMaker{
    constructor(editor) {
        this.editor=editor
        this.edits=[]
    }
    push(foamObj, newValue){
        if (foamObj.value != newValue) {
            const range = new monaco.Range(...foamObj.range)
            this.edits.push({range: range, text: newValue})
        }
    }
    edit(){
        this.editor.executeEdits("", this.edits);
        this.edits = []
    }
}

const Save = ({vars, isValid=true, editor, onClick=(vars)=>null}) => {
    const [warn, setWarn] = useState(false);
    const oldDecorations = useRef([])
    const highlighter = new Highlighter(editor, oldDecorations)
    const editMaker = new EditMaker(editor)
    const save = () => {
        for (const i in vars) {
            if (vars[i].foamObj) {
                editMaker.push(vars[i].foamObj, vars[i].newValue)
                highlighter.push(vars[i].foamObj, vars[i].newValue)
            }
        }
        setWarn(highlighter.highlight())
        editMaker.edit();
        onClick(vars);
    };
    return (
        <>
            <Button className={[isValid?'primary':'disabled', "ui", "button"].join(' ')} onClick={save}>Save</Button><p/>
            {warn?<Message compact info>No changes needed.</Message>:null}
        </>
    )
}

export default Save;