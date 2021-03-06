import hamTemplate from './templates/hamstadbenchmarkcase5'
import urbanTemplate from './templates/urbanmicroclimatefoam_CFD'
import urbanObjTemplate from './templates/urbanmicroclimateforam_CFD_obj'
import windTemplate from './templates/winddrivenrainfoam'
import windObjTemplate from './templates/winddrivenrainfoam_obj'

const templates = {
  '': hamTemplate,
  hamFoam: hamTemplate,
  urbanMicroclimateFoam: urbanTemplate,
  urbanMicroclimateFoam_obj: urbanObjTemplate,
  windDrivenRainFoam: windTemplate,
  windDrivenRainFoam_obj: windObjTemplate
}

const snappyHexMeshDict = (root, patchName) => {
  return {
    index: `${root}system/snappyHexMeshDict`,
    data: 'snappyHexMeshDict',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n  =========                 |\n  \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox\n   \\\\    /   O peration     | Website:  https://openfoam.org\n    \\\\  /    A nd           | Version:  6\n     \\\\/     M anipulation  |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n    version     2.0;\n    format      ascii;\n    class       dictionary;\n    object      snappyHexMeshDict;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\n#includeEtc "caseDicts/mesh/generation/snappyHexMeshDict.cfg"\n\ncastellatedMesh on;\nsnap            on;\naddLayers       off;\n\ngeometry\n{\n    cube\n    {\n        type triSurfaceMesh;\n        file "buildings.obj";\n    }\n\n    refinementBox\n    {\n        type searchableBox;\n        min  (  0   0   0);\n        max  (250 180  90);\n    }\n};\n\ncastellatedMeshControls\n{\n    features\n    (\n      { file  "buildings.eMesh"; level 1; }\n    );\n\n    refinementSurfaces\n    {\n        cube\n        {\n            level (3 3);\n            patchInfo { type wall; }\n        }\n    }\n\n    refinementRegions\n    {\n        refinementBox\n        {\n            mode inside;\n            levels ((1E15 2));\n        }\n    }\n\n    locationInMesh (1 1 1);\n}\n\nsnapControls\n{\n    explicitFeatureSnap    true;\n    implicitFeatureSnap    false;\n}\n\naddLayersControls\n{\n    layers\n    {\n        "CAD.*"\n        {\n            nSurfaceLayers 2;\n        }\n    }\n\n    relativeSizes       true;\n    expansionRatio      1.2;\n    finalLayerThickness 0.5;\n    minThickness        1e-3;\n}\n\nmeshQualityControls\n{}\n\nwriteFlags\n(\n    noRefinement\n    // scalarLevels\n    // layerSets\n    // layerFields\n);\n\nmergeTolerance 1e-6;\n\n// ************************************************************************* //\n'.replaceAll(
      'cube',
      patchName
    )
  }
}

const surfaceFeaturesDict = (root) => {
  return {
    index: `${root}system/surfaceFeaturesDict`,
    data: 'surfaceFeaturesDict',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n  =========                 |\n  \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox\n   \\\\    /   O peration     | Website:  https://openfoam.org\n    \\\\  /    A nd           | Version:  6\n     \\\\/     M anipulation  |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n    version     2.0;\n    format      ascii;\n    class       dictionary;\n    object      surfaceFeaturesDict;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\nsurfaces ("buildings.obj");\n\n#includeEtc "caseDicts/surface/surfaceFeaturesDict.cfg"\n\n// ************************************************************************* //'
  }
}

const meshQualityDict = (root) => {
  return {
    index: `${root}system/meshQualityDict`,
    data: 'meshQualityDict',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n  =========                 |\n  \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox\n   \\\\    /   O peration     | Website:  https://openfoam.org\n    \\\\  /    A nd           | Version:  6\n     \\\\/     M anipulation  |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n    version     2.0;\n    format      ascii;\n    class       dictionary;\n    object      meshQualityDict;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\n#includeEtc "caseDicts/mesh/generation/meshQualityDict.cfg"\n\n//- minFaceWeight (0 -> 0.5)\n//minFaceWeight 0.02;\n\n// ************************************************************************* //\n'
  }
}

const triSurface = (root) => {
  return {
    index: `${root}constant/triSurface`,
    data: 'triSurface',
    hasChildren: true,
    children: [`${root}constant/triSurface/buildings.obj`],
    text: ''
  }
}

const objFile = (root) => {
  return {
    index: `${root}constant/triSurface/buildings.obj`,
    data: 'buildings.obj',
    hasChildren: false,
    children: [],
    text: ''
  }
}

const backgroundBlockMeshDict =
  '/*--------------------------------*- C++ -*----------------------------------*\\n| =========                 |                                                 |\n| \\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\    /   O peration     | Version:  1.7.1                                 |\n|   \\  /    A nd           | Web:      www.OpenFOAM.com                      |\n|    \\/     M anipulation  |                                                 |\n*---------------------------------------------------------------------------*/\nFoamFile\n{\n   version     2.0;\n   format      ascii;\n   class       dictionary;\n   object      blockMeshDict;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\nconvertToMeters 1;\n\nbackgroundMesh\n{\n    xMin   -20; // L = 350\n    xMax   330;\n    yMin   -50; // L = 280\n    yMax   230;\n    zMin     0;\n    zMax   140;\n    xCells  25;\n    yCells  20;\n    zCells  10;\n}\n\nvertices\n(\n    ($:backgroundMesh.xMin $:backgroundMesh.yMin $:backgroundMesh.zMin)\n    ($:backgroundMesh.xMax $:backgroundMesh.yMin $:backgroundMesh.zMin)\n    ($:backgroundMesh.xMax $:backgroundMesh.yMax $:backgroundMesh.zMin)\n    ($:backgroundMesh.xMin $:backgroundMesh.yMax $:backgroundMesh.zMin)\n\n    ($:backgroundMesh.xMin $:backgroundMesh.yMin $:backgroundMesh.zMax)\n    ($:backgroundMesh.xMax $:backgroundMesh.yMin $:backgroundMesh.zMax)\n    ($:backgroundMesh.xMax $:backgroundMesh.yMax $:backgroundMesh.zMax)\n    ($:backgroundMesh.xMin $:backgroundMesh.yMax $:backgroundMesh.zMax)\n);\n \nblocks\n(\n    hex (0 1 2 3 4 5 6 7)\n    (\n        $:backgroundMesh.xCells\n        $:backgroundMesh.yCells\n        $:backgroundMesh.zCells\n    )\n    simpleGrading (1 1 1)\n);\n \nedges\n(\n);\n\npatches\n(\n  patch inlet\n  (\n      (0 3 7 4)\n  )\n  patch outlet\n  (\n      (1 5 6 2)\n  )\n  slip top\n  (\n      (4 7 6 5)\n  )\n  wall ground\n  (\n      (0 1 2 3)\n  )\n  slip sides\n  (\n      (0 4 5 1)\n      (3 2 6 7)\n  )\n);\n\nmergePatchPairs\n(\n);\n\n// ************************************************************************* //\n'

function addObj(newData, newProject) {
  let root = newProject == 'windDrivenRainFoam' ? 'simpleFoam/' : ''
  newData[`${root}system`].children.push(`${root}system/meshQualityDict`)
  newData[`${root}system`].children.push(`${root}system/snappyHexMeshDict`)
  newData[`${root}system`].children.push(`${root}system/surfaceFeaturesDict`)
  newData[`${root}constant`].children.splice(0, 0, `${root}constant/triSurface`)
  newData[`${root}system/meshQualityDict`] = meshQualityDict(root)
  newData[`${root}system/snappyHexMeshDict`] = snappyHexMeshDict(
    root,
    'buildings'
  )
  newData[`${root}system/surfaceFeaturesDict`] = surfaceFeaturesDict(root)
  newData[`${root}constant/triSurface`] = triSurface(root)
  newData[`${root}constant/triSurface/buildings.obj`] = objFile(root)
  if (newProject == 'urbanMicroclimateFoam') {
    newData[`${root}constant/air/polyMesh/blockMeshDict`]['text'] =
      backgroundBlockMeshDict.replace(
        '  slip sides\n  (\n      (0 4 5 1)\n      (3 2 6 7)\n  )\n',
        '  slip side1\n  (\n      (0 4 5 1)\n  )\n  slip side2\n  (\n      (3 2 6 7)\n  )\n'
      )
  } else {
    newData[`${root}system/blockMeshDict`]['text'] = backgroundBlockMeshDict
  }
  let conditionFile =
    newData[
      `${root}${
        newProject == 'urbanMicroclimateFoam' ? '0/air/include/' : '0/include/'
      }ABLConditions`
    ]
  conditionFile['text'] = conditionFile['text'].replace(
    'zGround              uniform 0.0;',
    'zGround              uniform -50.0;'
  )
  return newData
}

export const getCaseFiles = (solver, withObj) => {
  let newData = {}
  if (withObj) {
    newData = JSON.parse(JSON.stringify(templates[solver + '_obj']))
    newData = addObj(newData, solver)
  } else {
    newData = JSON.parse(JSON.stringify(templates[solver]))
  }
  return newData
}
