/*
Ts
    internalField   uniform 298.15; 
Pc
    internalField   uniform -7.0291e+07; 
ws



T
Tambient
U
    internalField   uniform (5 0 0);
alphaT
epsilon
gcr
k
nut
p
p_rgh (overrides p)
w
wambient



U
    internalField   uniform (3 0 0);
epsilon
k
nut
p


*/

import React, { useState } from 'react';
import { Input } from 'semantic-ui-react'
import Save from '../utils/save.jsx'
import { isValidFloat } from "../utils/validator.jsx"

const Uniform1d = ({ast, editor}) => {
    const currentFieldValue = ast?.["internalField"]?.[1]?.value
    const [fieldValue, setFieldValue] = useState(currentFieldValue || "0");
    const tokensToReplace = Object.values(ast?.["boundaryField"])
                            .map((vars)=>vars?.["value"]?.[1])
                            .filter((token)=>(token?.value==currentFieldValue))
    const vars = [
        {foamObj: ast?.["internalField"]?.[1] , newValue: fieldValue},
    ]
    for (let token of tokensToReplace) {
        vars.push({foamObj: token , newValue: fieldValue})
    }
    const validate = () => {
        return isValidFloat(fieldValue)
    }
    return (
        <>
            <p/>Adjust internal and boundary field values.<br/>
            <Input className={isValidFloat(fieldValue)?null:"error"} placeholder={"0"} onChange={(event,data)=>setFieldValue(data.value)} defaultValue={fieldValue} /><p/>
            <br/>
            <Save vars={vars} isValid={validate()} editor={editor}/>
        </>
    );
}

const Uniform3d = ({ast, editor}) => {
    const currentFieldValue = ast?.["internalField uniform"]?.value?.[0]?.value
    const [fieldValue, setFieldValue] = useState(currentFieldValue || "0")
    const tokensToReplace = Object.values(ast?.["boundaryField"])
                            .map((vars)=>vars?.["value uniform"]?.value?.[0])
                            .filter((token)=>(token?.value==currentFieldValue))
    const vars = [
        {foamObj: ast?.["internalField uniform"]?.value?.[0] , newValue: fieldValue},
    ]
    for (let token of tokensToReplace) {
        vars.push({foamObj: token , newValue: fieldValue})
    }
    const validate = () => {
        return isValidFloat(fieldValue)
    }
    return (
        <>
            <p/>Adjust internal and boundary field values.<br/>
            <Input className={isValidFloat(fieldValue)?null:"error"} placeholder={"0"} onChange={(event,data)=>setFieldValue(data.value)} defaultValue={fieldValue} /><p/>
            <br/>
            <Save vars={vars} isValid={validate()} editor={editor}/>
        </>
    );
}

const Help = () => {
    return (<>
        <br/><h4>Edit Section</h4><br/>
        Select files on the right hand panel to adjust the case's settings.<br/>
        Files in the <b>system</b> folder are a good place to start.
    </>);
}

export const Conditions = ({fileData, ast, editor}) => {
    switch (fileData["data"]) {
        case "U": return <Uniform3d key={fileData["data"]} ast={ast} editor={editor}/>
        case "Ts":
        case "T":
        case "pc":
        case "k":
        case "nut":
        case "p":
        case "p_rgh":
        case "nut":
        case "ws":
        case "gcr":
        case "k":
        case "alphat":
        case "epsilon": return <Uniform1d key={fileData["data"]} ast={ast} editor={editor}/>
        default: return <Help/>
    }
}