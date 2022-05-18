import React, { useState } from 'react';
import { Dropdown, Input, Table } from 'semantic-ui-react'
import Save from '../utils/save.jsx'
import { generateMesh } from '../utils/meshgenerator.jsx'
import { isValidFloat, isValidInt } from "../utils/validator.jsx"

const BlockMeshDictBackground = ({ast, editABL, editor}) => {
    const [backGroundMesh, setBackGroundMesh] = useState({xMin: -20,
        xMax: 330,
        yMin: -50,
        yMax: 230,
        zMin: 0,
        zMax: 140,
        xCells: 25,
        yCells: 20,
        zCells: 10
    })

    const vars = [
        {foamObj: ast?.["backgroundMesh"]?.["xMin"]?.[0], newValue: backGroundMesh.xMin},
        {foamObj: ast?.["backgroundMesh"]?.["xMax"]?.[0], newValue: backGroundMesh.xMax},
        {foamObj: ast?.["backgroundMesh"]?.["yMin"]?.[0], newValue: backGroundMesh.yMin},
        {foamObj: ast?.["backgroundMesh"]?.["yMax"]?.[0], newValue: backGroundMesh.yMax},
        {foamObj: ast?.["backgroundMesh"]?.["zMin"]?.[0], newValue: backGroundMesh.zMin},
        {foamObj: ast?.["backgroundMesh"]?.["zMax"]?.[0], newValue: backGroundMesh.zMax},
        {foamObj: ast?.["backgroundMesh"]?.["xCells"]?.[0], newValue: backGroundMesh.xCells},
        {foamObj: ast?.["backgroundMesh"]?.["yCells"]?.[0], newValue: backGroundMesh.yCells},
        {foamObj: ast?.["backgroundMesh"]?.["zCells"]?.[0], newValue: backGroundMesh.zCells},
    ]
    const validate = () => {
        return vars.slice(0, 6).every((x) => isValidFloat(x.newValue)) && vars.slice(6).every((x) => isValidInt(x.newValue))
    }
    return (<>
        <p/><h3>Background mesh generation</h3><p/>
        Important: Make sure the background mesh covers all the coordinates found in the obj file. Use negative coordinates if you have to. <p/>
        <Table compact>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Axis</Table.HeaderCell>
                    <Table.HeaderCell>Min coordinate</Table.HeaderCell>
                    <Table.HeaderCell>Max coordinate</Table.HeaderCell>
                    <Table.HeaderCell>Number of Cells</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                <Table.Row>
                    <Table.Cell>X</Table.Cell>
                    <Table.Cell><Input style={{"width": "70px"}} className={isValidFloat(backGroundMesh.xMin)?null:"error"} onChange={(e) => setBackGroundMesh({...backGroundMesh, xMin: e.target.value})} defaultValue={backGroundMesh.xMin} /></Table.Cell>
                    <Table.Cell><Input style={{"width": "70px"}} className={isValidFloat(backGroundMesh.xMax)?null:"error"} onChange={(e) => setBackGroundMesh({...backGroundMesh, xMax: e.target.value})} defaultValue={backGroundMesh.xMax} /></Table.Cell>
                    <Table.Cell><Input style={{"width": "70px"}} className={isValidInt(backGroundMesh.xCells)?null:"error"} onChange={(e) => setBackGroundMesh({...backGroundMesh, xCells: e.target.value})} defaultValue={backGroundMesh.xCells} /></Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>Y</Table.Cell>
                    <Table.Cell><Input style={{"width": "70px"}} className={isValidFloat(backGroundMesh.yMin)?null:"error"} onChange={(e) => setBackGroundMesh({...backGroundMesh, yMin: e.target.value})} defaultValue={backGroundMesh.yMin} /></Table.Cell>
                    <Table.Cell><Input style={{"width": "70px"}} className={isValidFloat(backGroundMesh.yMax)?null:"error"} onChange={(e) => setBackGroundMesh({...backGroundMesh, yMax: e.target.value})} defaultValue={backGroundMesh.yMax} /></Table.Cell>
                    <Table.Cell><Input style={{"width": "70px"}} className={isValidInt(backGroundMesh.yCells)?null:"error"} onChange={(e) => setBackGroundMesh({...backGroundMesh, yCells: e.target.value})} defaultValue={backGroundMesh.yCells} /></Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>Z</Table.Cell>
                    <Table.Cell><Input style={{"width": "70px"}} className={isValidFloat(backGroundMesh.zMin)?null:"error"} onChange={(e) => setBackGroundMesh({...backGroundMesh, zMin: e.target.value})} defaultValue={backGroundMesh.zMin} /></Table.Cell>
                    <Table.Cell><Input style={{"width": "70px"}} className={isValidFloat(backGroundMesh.zMax)?null:"error"} onChange={(e) => setBackGroundMesh({...backGroundMesh, zMax: e.target.value})} defaultValue={backGroundMesh.zMax} /></Table.Cell>
                    <Table.Cell><Input style={{"width": "70px"}} className={isValidInt(backGroundMesh.zCells)?null:"error"} onChange={(e) => setBackGroundMesh({...backGroundMesh, zCells: e.target.value})} defaultValue={backGroundMesh.zCells} /></Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table><p/>
        <Save vars={vars} onClick={(vars)=>editABL(vars[2].newValue)} isValid={validate()} editor={editor}/>
    </>)
}

const BlockMeshDict1D = ({ast, editMaterials, allASTs, editor}) => {
    //TODO: make sure to update correctly on nbLayers update
    const [nbLayers, setNbLayers] = useState(3)//has to be based on transportproperties, data has to be saved somewhere
    const [segmentLens, setSegmentLens] = useState(["0.365", "0.015", "0.04","1","1","1","1","1","1","1"])
    const [segmentCells, setSegmentCells]  = useState(["100","15","30","1","1","1","1","1","1","1"])
    const [segmentRatios, setSegmentRatios] = useState(["50", "20", "20","1","1","1","1","1","1","1"])
    const meshData = generateMesh(segmentLens.slice(0, nbLayers), segmentCells.slice(0, nbLayers), segmentRatios.slice(0, nbLayers).map((ratio)=>`((0.5 0.5 ${ratio})(0.5 0.5 ${1/parseFloat(ratio)}))`))
    const vars = [
        {foamObj: ast?.["vertices"], newValue: meshData.vertices},
        {foamObj: ast?.["blocks"], newValue: meshData.blocks},
        {foamObj: ast?.["patches"]?.value?.[2], newValue: meshData.patches.inside},
        {foamObj: ast?.["patches"]?.value?.[5], newValue: meshData.patches.outside},
        {foamObj: ast?.["patches"]?.value?.[8], newValue: meshData.patches.sides},
    ]
    const validate = () => {
        return segmentLens.every(isValidFloat) && segmentCells.every(isValidInt) && segmentRatios.every(isValidFloat)
    }
    function handleClick(vars){
        editMaterials(meshData.segmentXCoordinates)
    }

    function handleLensChange(event, layer) {
        let newArray = [...segmentLens]
        newArray[layer] = event.target.value
        setSegmentLens(newArray)
    }
    function handleCellsChange(event, layer) {
        let newArray = [...segmentCells]
        newArray[layer] = event.target.value
        setSegmentCells(newArray)
    }
    function handleRatiosChange(event, layer) {
        let newArray = [...segmentRatios]
        newArray[layer] = event.target.value
        setSegmentRatios(newArray)
    }

    function layerForms () {
        let layers = []
        for (let i=0; i<nbLayers; i++) {
            layers.push(<Table.Row key={i}>
                <Table.Cell>{[i+1]}</Table.Cell>
                <Table.Cell><Input style={{"width": "70px"}} className={isValidFloat(segmentLens[i])?null:"error"} onChange={(event) => handleLensChange(event, i)} defaultValue={segmentLens[i]} /></Table.Cell>
                <Table.Cell><Input style={{"width": "70px"}} className={isValidInt(segmentCells[i])?null:"error"} onChange={(event) => handleCellsChange(event, i)} defaultValue={segmentCells[i]}/></Table.Cell>
                <Table.Cell><Input style={{"width": "70px"}} className={isValidFloat(segmentCells[i])?null:"error"} onChange={(event) => handleRatiosChange(event, i)} defaultValue={segmentRatios[i]}/></Table.Cell>
            </Table.Row>)
        }
        return layers
    }
    return(<>
        <p/>Choose how many layers of materal<p/>
        <Dropdown compact selection 
            options={[1,2,3,4,5,6,7,8,9,10].map((i)=>{return {key: i, text: i, value: i}})} 
            onChange={(event,data)=>setNbLayers(data.value)} 
            defaultValue={nbLayers}
        /><p/>
        <Table compact>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Layer #</Table.HeaderCell>
                    <Table.HeaderCell>Thickness</Table.HeaderCell>
                    <Table.HeaderCell>Cells</Table.HeaderCell>
                    <Table.HeaderCell>Cell Ratio Middle/Boundary</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {layerForms()}
            </Table.Body>
        </Table><p/>
        <Save vars={vars} onClick={handleClick} isValid={validate()} editor={editor}/>
    </>)
}

export const BlockMeshDict = ({project, editMaterials, editABL, ast, allASTs, editor}) => {
    if (project === "hamFoam") {
        return (<>
            <BlockMeshDict1D editMaterials={editMaterials} ast={ast} allASTs={allASTs} editor={editor}/>
        </>)
    } else {
        return (<>
            <BlockMeshDictBackground editABL={editABL} ast={ast} allASTs={allASTs} editor={editor}/>
        </>)
    }
}