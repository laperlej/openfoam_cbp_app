import React from 'react';
import './uipanel.css'
import { useMonaco } from "@monaco-editor/react";
import { ControlDict } from "./uipanels/controldict.jsx"
import { BlockMeshDict } from "./uipanels/blockmeshdict.jsx"
import { DecomposeParDict } from "./uipanels/decomposepardict.jsx"
import { HamTransportProperties } from "./uipanels/hamtransportproperties.jsx"
import { FvSchemes } from "./uipanels/fvschemes.jsx"
import { FvSolution } from "./uipanels/fvsolution.jsx"
import { Turbulence } from "./uipanels/Turbulence.jsx"
import { Conditions } from "./uipanels/conditions.jsx"


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

    const uiDictionary = (filename) => {
        switch (filename) {
            case "controlDict": return <ControlDict ast={ast} editor={editor}/>
            case "decomposeParDict": return <DecomposeParDict ast={ast} editor={editor}/>
            case "blockMeshDict": return <BlockMeshDict project={project} editMaterials={editMaterials} editABL={editABLConditons} ast={ast} allASTs={allASTs} editor={editor}/>
            case "transportProperties": return (project==="hamFoam")?<HamTransportProperties ast={ast} editor={editor}/>:null
            case "fvSchemes": return <FvSchemes ast={ast} editor={editor}/>
            case "fvSolution": return <FvSolution ast={ast} editor={editor}/>
            case "turbulenceProperties": return <Turbulence ast={ast} editor={editor}/>
            default: return <Conditions fileData={fileData} ast={ast} editor={editor}/>
        }
    }

    return (
        <div className={"centered"}>
            {uiDictionary(fileName) || null}
        </div>
    )
};

export default UIPanel;