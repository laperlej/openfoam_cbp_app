import React, { useState } from 'react';
import { Dropdown } from 'semantic-ui-react'
import Save from '../utils/save.jsx'

const rasModels = [
    "LRR",
    "LaunderSharmaKE",
    "RNGkEpsilon",
    "SSG",
    "SpalartAllmaras",
    "buoyantKEpsilon",
    "kEpsilon",
    "kOmega",
    "kOmegaSST",
    "kOmegaSSTLM",
    "kOmegaSSTSAS",
    "porousrealizableKE",
    "realizableKE",
    "v2f"
].map((x)=>{return {key: x, text: x, value: x}})

export const Turbulence = ({ast, editor}) => {
    const [rasModel, setRasModel] = useState(ast?.["RAS"]["RASModel"]?.[0]?.value || "kEpsilon")
    const vars = [
        {foamObj: ast?.["RAS"]["RASModel"]?.[0], newValue: rasModel}
    ]
    
    function validate() {
        return true
    }
    return(<>
        <p/><h3>RAS Model</h3><p/>
        note: this may require changes to the fvschemes file.<br/>
        <Dropdown style={{"width": "150px"}} compact selection options={rasModels} onChange={(event,data)=>setRasModel(data.value)} defaultValue={rasModel}/><p/>
        <br/>
        <Save vars={vars} isValid={validate()} editor={editor}/>
    </>)
}