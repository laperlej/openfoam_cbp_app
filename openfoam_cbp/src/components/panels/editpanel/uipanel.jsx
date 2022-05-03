import React, { useState, useEffect, useRef } from 'react';
import { Dropdown, Input, Table } from 'semantic-ui-react'
import './uipanel.css'
import Save from './save.jsx'
import {generateMesh} from './meshgenerator.jsx'
import { useMonaco } from "@monaco-editor/react";


function isValidFloat (value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}

function isValidInt (value) {
    return /^\d+$/.test(value);
}

function isValidSignedInt (value) {
    return /^-?\d+$/.test(value);
}

function isValidNonZero2Digit (value) {
    return /^[1-9]?[1-9]$/.test(value);
}

const ControlDict = ({ast, editor}) => {
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

const DecomposeParDict = ({ast, editor}) => {
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
        Important: Make sure the background mesh covers all the coordinates found in the .obj file, Use negative coordinates if you have to. <p/>
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
                    <Table.Cell><Input style={{"width": "70px"}} className={isValidFloa(backGroundMesh.xMin)?null:"error"} onChange={(e) => setBackGroundMesh({...backGroundMesh, xMin: e.target.value})} defaultValue={backGroundMesh.xMin} /></Table.Cell>
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
    const [nbLayers, setNbLayers] = useState(3)
    const [segmentLens, setSegmentLens] = useState(["0.365", "0.015", "0.04","1","1","1","1","1","1","1"])
    const [segmentCells, setSegmentCells]  = useState(["100","15","30","1","1","1","1","1","1","1"])
    const [segmentRatios, setSegmentRatios] = useState(["50", "20", "20","1","1","1","1","1","1","1"])
    const meshData = generateMesh(segmentLens.slice(nbLayers), segmentCells.slice(nbLayers), segmentRatios.slice(nbLayers).map((ratio)=>`((0.5 0.5 ${ratio})(0.5 0.5 ${1/parseFloat(ratio)}))`))
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
const FvSchemes = ({ast, editor}) => {return null}
const FvSolution = ({ast, editor}) => {return null}

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

const HamTransportProperties = ({ast, editor}) => {
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

const UIPanel = ({project, selectedItem, data, allASTs, editor}) => {
    const fileData = data[selectedItem]
    const ast = allASTs[fileData["index"]]
    const fileName = fileData["data"]
    const monaco = useMonaco();

    function editABLConditons(newValue) {
        const index = (project == "urbanMicroclimateFoam") ? "0/air/include/ABLConditions": "simpleFoam/0/include/ABLConditions"
        for (const model of monaco.editor.getModels()) {
            if (`/${index}` == model._associatedResource.path) {
                model.dispose()
            }
        }
        const r = /([.|\n]*zGround\s+uniform\s+)[0-9\.\-]+(;(.|\n)*)/
        data[index]["text"] = data[index]["text"].replace(r, "$1"+newValue+"$2")
    }

    function editMaterials(segmentXCoordinates) {
        const indexSetSet = "system/setset.batch"
        const indexTransportProperties = "constant/transportProperties"
        for (const model of monaco.editor.getModels()) {
            if (`/${indexSetSet}` == model._associatedResource.path || `/${indexTransportProperties}` == model._associatedResource.path) {
                model.dispose()
            }
        }
        let newSetSet = []
        for (let i=0; i<segmentXCoordinates.length-1; ++i) {
            newSetSet.push(`cellSet layer${i+1} new boxToCell (${segmentXCoordinates[i]} 0.00 0)(${segmentXCoordinates[i+1]} 1 1)`)
            newSetSet.push(`cellZoneSet layer${i+1} new setToCellZone layer${i+1}`)
        }

        let newTransportProperties = ['/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  2.2.2                                 |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.org                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n    version     2.0;\n    format      ascii;\n    class       dictionary;\n    location    "constant";\n    object      transportProperties;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\nbuildingMaterials\n(']
        for (let i=0; i<segmentXCoordinates.length-1; ++i) {
            newTransportProperties.push(`    {\n        name	layer${i+1};\n        buildingMaterialModel Hamstad5Brick;\n        rho     1600;\n        cap     1000;\n        lambda1	0.682;	//lambda = lambda1 + ws*lambda2\n        lambda2	0;\n    }`)
        }
        newTransportProperties.push(");\n\n// ************************************************************************* //")
        data[indexSetSet]["text"] = newSetSet.join("\n")
        data[indexTransportProperties]["text"] = newTransportProperties.join("\n")
    }

    const UIdictionary = {
        "controlDict": <ControlDict ast={ast} editor={editor}/>,
        "decomposeParDict": <DecomposeParDict ast={ast} editor={editor}/>,
        "blockMeshDict": (project==="hamFoam")?<BlockMeshDict1D editMaterials={editMaterials} ast={ast} allASTs={allASTs} editor={editor}/>:<BlockMeshDictBackground editABL={editABLConditons} ast={ast} allASTs={allASTs} editor={editor}/>,
        "transportProperties": (project==="hamFoam")?<HamTransportProperties ast={ast} editor={editor}/>:null,
        "fvSchemes": <FvSchemes ast={ast} editor={editor}/>,
        "fvSolution": <FvSolution ast={ast} editor={editor}/>,
    }
    return (
        <div className={"centered"}>
            {UIdictionary[fileName] || null}
        </div>
    )
};

export default UIPanel;