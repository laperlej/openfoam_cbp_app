import React, { useState } from 'react';
import { Input } from 'semantic-ui-react'
import Save from '../utils/save.jsx'
import { isValidInt } from "../utils/validator.jsx"

export const ControlDict = ({ast, editor}) => {
    const [startTime, setStartTime] = useState(ast?.["startTime"]?.[0]?.value || "0");
    const [endTime, setEndTime] = useState(ast?.["endTime"]?.[0]?.value || "0");
    const [deltaT, setdeltaT] = useState(ast?.["deltaT"]?.[0]?.value || "0");
    const [writeInterval, setWriteInterval] = useState(ast?.["writeInterval"]?.[0]?.value || "0");
    const vars = [
        {foamObj: ast?.["startTime"]?.[0] , newValue: startTime},
        {foamObj: ast?.["endTime"]?.[0], newValue: endTime},
        {foamObj: ast?.["deltaT"]?.[0], newValue: deltaT},
        {foamObj: ast?.["writeInterval"]?.[0], newValue: writeInterval}
    ];
    const validate = () => {
        return isValidInt(startTime)&&isValidInt(endTime)&&isValidInt(deltaT)&&isValidInt(writeInterval)
    }

    return (
        <>
            <p/>Choose start time.<br/>
            <Input className={isValidInt(startTime)?null:"error"} placeholder={"0"} onChange={(event,data)=>setStartTime(data.value)} defaultValue={startTime} /><p/>
            Choose end time.<br/>
            <Input className={isValidInt(endTime)?null:"error"} placeholder={"0"} onChange={(event,data)=>setEndTime(data.value)} defaultValue={endTime} /><p/>
            Time between each step (deltaT).<br/>
            <Input className={isValidInt(deltaT)?null:"error"} placeholder={"0"} onChange={(event,data)=>setdeltaT(data.value)} defaultValue={deltaT} /><p/>
            Choose write interval.<br/>
            <Input className={isValidInt(writeInterval)?null:"error"} placeholder={"0"} onChange={(event,data)=>setWriteInterval(data.value)} defaultValue={writeInterval} /><p/><br/>
            <Save vars={vars} isValid={validate()} editor={editor}/>
        </>
    );
}