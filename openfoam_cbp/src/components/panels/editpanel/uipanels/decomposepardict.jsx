import React, { useState, useEffect } from 'react';
import { Dropdown, Input } from 'semantic-ui-react'
import Save from '../utils/save.jsx'
import { isValidNonZero2Digit } from "../utils/validator.jsx"

export const DecomposeParDict = ({ast, editor}) => {
    const [method, setMethod] = useState(ast?.["method"]?.[0]?.value || "scotch")
    const [nbSubdomains, setNbSubdomains] = useState(ast?.["numberOfSubdomains"]?.[0]?.value || "2")
    const [simpleX, setSimpleX] = useState(ast?.["simpleCoeffs"]?.["n"]?.value?.[0]?.value || "1")
    const [simpleY, setSimpleY] = useState(ast?.["simpleCoeffs"]?.["n"]?.value?.[1]?.value || "1")
    const [simpleZ, setSimpleZ] = useState(ast?.["simpleCoeffs"]?.["n"]?.value?.[2]?.value || "1")
    const methodChoices = [
        {key: "scotch", text:"scotch", value:"scotch"},
        {key: "simple", text:"simple", value:"simple"},
    ]
    const vars = [
        {foamObj: ast?.["method"]?.[0], newValue: method},
        {foamObj: ast?.["numberOfSubdomains"]?.[0], newValue: nbSubdomains},
        {foamObj: ast?.["simpleCoeffs"]?.["n"]?.value?.[0], newValue: simpleX},
        {foamObj: ast?.["simpleCoeffs"]?.["n"]?.value?.[1], newValue: simpleY},
        {foamObj: ast?.["simpleCoeffs"]?.["n"]?.value?.[2], newValue: simpleZ},
    ];
    useEffect(() => {
        setNbSubdomains(String(Number(simpleX)*Number(simpleY)*Number(simpleZ)))
    }, [simpleX, simpleY, simpleZ])
    const validate = () => {
        return isValidNonZero2Digit(nbSubdomains)&&isValidNonZero2Digit(simpleX)&&isValidNonZero2Digit(simpleY)&&isValidNonZero2Digit(simpleZ)
    }
    return (
        <div>
            <p/>Choose a decomposition method<br/>
            <Dropdown compact selection options={methodChoices} onChange={(event,data)=>setMethod(data.value)} defaultValue={method} /><p/>
            {(method==="scotch")?<>
            Choose the number of subdomains.<br/>
            <Input style={{width:"50px"}} className={isValidNonZero2Digit(nbSubdomains)?null:"error"} placeholder={"0"} onChange={(event,data)=>setNbSubdomains(data.value)} defaultValue={nbSubdomains} /><p/>
            </>:null}
            {(method==="simple")?<>
            <span>X: </span>
            <Input style={{width:"50px"}} className={isValidNonZero2Digit(simpleX)?null:"error"} placeholder={"0"} onChange={(event,data)=>setSimpleX(data.value)} defaultValue={simpleX} /><p/>
            <span>Y: </span>
            <Input style={{width:"50px"}} className={isValidNonZero2Digit(simpleY)?null:"error"} placeholder={"0"} onChange={(event,data)=>setSimpleY(data.value)} defaultValue={simpleY} /><p/>
            <span>Z: </span>
            <Input style={{width:"50px"}} className={isValidNonZero2Digit(simpleZ)?null:"error"} placeholder={"0"} onChange={(event,data)=>setSimpleZ(data.value)} defaultValue={simpleZ} /><p/>
            </>:null}
            <Save vars={vars} isValid={validate()} editor={editor}/>
        </div>
    )
}