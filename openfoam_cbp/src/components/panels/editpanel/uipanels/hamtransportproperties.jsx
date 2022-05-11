import React, { useState } from 'react';
import { Dropdown, Input, Table } from 'semantic-ui-react'
import Save from '../utils/save.jsx'
import { isValidFloat, isValidInt } from "../utils/validator.jsx"

const materialChoices = [
    "AcrylicPaint",
    "BuildingPaper",
    "GlassFiberInsulation",
    "GypsumBoard",
    "Hamstad1Contrete",
    "Hamstad1Insulation",
    "Hamstad3Wall",
    "Hamstad4Brick",
    "Hamstad4Plaster",
    "Hamstad5Brick",
    "Hamstad5Insulation",
    "Hamstad5Mortar",
    "Masonry",
    "OSB",
    "SBPO",
    "Soil",
    "VanGenuchten",
    "VanGenuchtenVapDiff",
    "VWC"
].map((x)=>{return {key: x, text: x, value: x}})

export const HamTransportProperties = ({ast, editor}) => {
    const [materials, setMaterials] = useState(ast?.["buildingMaterials"]?.value.map((materialObj)=>materialObj?.["buildingMaterialModel"]?.[0]?.value))
    const [rho, setRho] = useState(ast?.["buildingMaterials"]?.value.map((materialObj)=>materialObj?.["rho"]?.[0]?.value))
    const [cap, setCap] = useState(ast?.["buildingMaterials"]?.value.map((materialObj)=>materialObj?.["cap"]?.[0]?.value))
    const [lambda1, setLambda1] = useState(ast?.["buildingMaterials"]?.value.map((materialObj)=>materialObj?.["lambda1"]?.[0]?.value))
    const [lambda2, setLambda2] = useState(ast?.["buildingMaterials"]?.value.map((materialObj)=>materialObj?.["lambda2"]?.[0]?.value))
    const nbLayers = ast?.["buildingMaterials"]?.value?.length || 0

    function handleMaterialChange(newVal, layer) {
        let newArray = [...materials]
        newArray[layer] = newVal
        setMaterials(newArray)
    }
    function handleRhoChange(event, layer) {
        let newArray = [...rho]
        newArray[layer] = event.target.value
        setRho(newArray)
    }
    function handleCapChange(event, layer) {
        let newArray = [...cap]
        newArray[layer] = event.target.value
        setCap(newArray)
    }
    function handleLambda1Change(event, layer) {
        let newArray = [...lambda1]
        newArray[layer] = event.target.value
        setLambda1(newArray)
    }
    function handleLambda2Change(event, layer) {
        let newArray = [...lambda2]
        newArray[layer] = event.target.value
        setLambda2(newArray)
    }
    
    let vars = []
    for (let i=0;i<nbLayers;i++) {
        vars.push({foamObj: ast?.["buildingMaterials"]?.value?.[i]?.["buildingMaterialModel"]?.[0], newValue: materials[i]})
        vars.push({foamObj: ast?.["buildingMaterials"]?.value?.[i]?.["rho"]?.[0], newValue: rho[i]})
        vars.push({foamObj: ast?.["buildingMaterials"]?.value?.[i]?.["cap"]?.[0], newValue: cap[i]})
        vars.push({foamObj: ast?.["buildingMaterials"]?.value?.[i]?.["lambda1"]?.[0], newValue: lambda1[i]})
        vars.push({foamObj: ast?.["buildingMaterials"]?.value?.[i]?.["lambda2"]?.[0], newValue: lambda2[i]})
    }
    
    function layerForms () {
        let layers = []
        for (let i=0; i<nbLayers; i++) {
            layers.push(<Table.Row key={i}>
                <Table.Cell>{[i+1]}</Table.Cell>
                <Table.Cell><Dropdown style={{"width": "150px"}} compact selection options={materialChoices} onChange={(event,data)=>handleMaterialChange(data.value, i)} defaultValue={materials[i]}/></Table.Cell>
                <Table.Cell><Input style={{"width": "70px"}} className={isValidInt(rho[i])?null:"error"} onChange={(event) => handleRhoChange(event, i)} defaultValue={rho[i]}/></Table.Cell>
                <Table.Cell><Input style={{"width": "70px"}} className={isValidInt(cap[i])?null:"error"} onChange={(event) => handleCapChange(event, i)} defaultValue={cap[i]}/></Table.Cell>
                <Table.Cell><Input style={{"width": "70px"}} className={isValidFloat(lambda1[i])?null:"error"} onChange={(event) => handleLambda1Change(event, i)} defaultValue={lambda1[i]}/></Table.Cell>
                <Table.Cell><Input style={{"width": "90px"}} className={isValidFloat(lambda2[i])?null:"error"} onChange={(event) => handleLambda2Change(event, i)} defaultValue={lambda2[i]}/></Table.Cell>
            </Table.Row>)
        }
        return layers
    }
    function validate() {
        return rho.every(isValidInt) && cap.every(isValidInt) && lambda1.every(isValidFloat) && lambda2.every(isValidFloat)
    }
    return(<>
        Materials configuration<p/>
        <p/>
        <Table compact>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Layer #</Table.HeaderCell>
                    <Table.HeaderCell>Material</Table.HeaderCell>
                    <Table.HeaderCell>rho</Table.HeaderCell>
                    <Table.HeaderCell>cap</Table.HeaderCell>
                    <Table.HeaderCell>lambda1</Table.HeaderCell>
                    <Table.HeaderCell>lambda2</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {layerForms()}
            </Table.Body>
        </Table>
        <Save vars={vars} isValid={validate()} editor={editor}/>
    </>)
}