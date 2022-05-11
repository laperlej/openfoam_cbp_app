import React, { useState } from 'react';
import { Input, Table } from 'semantic-ui-react'
import Save from '../utils/save.jsx'
import { isValidInt, isValidFloat } from "../utils/validator.jsx"

export const FvSolution = ({ast, editor}) => {
    const [variable, setVariable] = useState(Object.keys(ast?.["solvers"]) || [])
    const [tolerance, setTolerance] = useState(Object.values(ast?.["solvers"]).map((varInfo)=>varInfo?.["tolerance"]?.[0]?.value))
    const [relTol, setRelTol] = useState(Object.values(ast?.["solvers"]).map((varInfo)=>varInfo?.["relTol"]?.[0]?.value))
    const nbLayers = variable.length || 0

    function handleTolChange(event, layer) {
        let newArray = [...tolerance]
        newArray[layer] = event.target.value
        setTolerance(newArray)
    }
    function handleRelTolChange(event, layer) {
        let newArray = [...relTol]
        newArray[layer] = event.target.value
        setRelTol(newArray)
    }
    
    let vars = []
    for (let i=0;i<nbLayers;i++) {
        vars.push({foamObj: Object.values(ast?.["solvers"])?.[i]?.["tolerance"]?.[0], newValue: tolerance[i]})
        vars.push({foamObj: Object.values(ast?.["solvers"])?.[i]?.["relTol"]?.[0], newValue: relTol[i]})
    }
    
    function layerForms () {
        let layers = []
        for (let i=0; i<nbLayers; i++) {
            layers.push(<Table.Row key={i}>
                <Table.Cell>{variable[i]}</Table.Cell>
                <Table.Cell><Input style={{"width": "70px"}} className={isValidFloat(tolerance[i])?null:"error"} onChange={(event) => handleTolChange(event, i)} defaultValue={tolerance[i]}/></Table.Cell>
                <Table.Cell><Input style={{"width": "70px"}} className={isValidFloat(relTol[i])?null:"error"} onChange={(event) => handleRelTolChange(event, i)} defaultValue={relTol[i]}/></Table.Cell>
            </Table.Row>)
        }
        return layers
    }
    function validate() {
        return tolerance.every(isValidFloat) && relTol.every(isValidFloat)
    }
    return(<>
        <p/><h3>Convergence Criteria</h3><p/>
        <p/>
        <Table compact>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Variable</Table.HeaderCell>
                    <Table.HeaderCell>Tolerance</Table.HeaderCell>
                    <Table.HeaderCell>Relative</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {layerForms()}
            </Table.Body>
        </Table>
        <Save vars={vars} isValid={validate()} editor={editor}/>
    </>)
}