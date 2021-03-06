const data = {
  '0': {
    index: '0',
    data: '0',
    hasChildren: true,
    children: ['0/inside', '0/outside', '0/Ts', '0/pc', '0/ws'],
    text: ''
  },
  constant: {
    index: 'constant',
    data: 'constant',
    hasChildren: true,
    children: ['constant/g', 'constant/transportProperties'],
    text: ''
  },
  system: {
    index: 'system',
    data: 'system',
    hasChildren: true,
    children: [
      'system/blockMeshDict',
      'system/controlDict',
      'system/decomposeParDict',
      'system/fvSchemes',
      'system/fvSolution',
      'system/setset.batch'
    ],
    text: ''
  },
  Allclean: {
    index: 'Allclean',
    data: 'Allclean',
    hasChildren: false,
    children: [],
    text: '#!/bin/sh\ncd ${0%/*} || exit 1    # run from this directory\n\n# Source tutorial clean functions\n. $WM_PROJECT_DIR/bin/tools/CleanFunctions\n\ncleanCase\n\n# ----------------------------------------------------------------- end-of-file\n'
  },
  Allrun: {
    index: 'Allrun',
    data: 'Allrun',
    hasChildren: false,
    children: [],
    text: '#!/bin/sh\ncd ${0%/*} || exit 1    # run from this directory\n\n# Source tutorial run functions\n. $WM_PROJECT_DIR/bin/tools/RunFunctions\n\nrunApplication blockMesh\nrunApplication setSet -batch system/setset.batch\n\n#-- Run on single processor\nrunApplication `getApplication`\n'
  },
  'hamfoam.foam': {
    index: 'hamfoam.foam',
    data: 'hamfoam.foam',
    hasChildren: false,
    children: [],
    text: ''
  },
  '0/inside': {
    index: '0/inside',
    data: 'inside',
    hasChildren: true,
    children: [
      '0/inside/Tambient',
      '0/inside/alpha',
      '0/inside/beta',
      '0/inside/gl',
      '0/inside/pv_o',
      '0/inside/rad',
      '0/inside/rainTemp'
    ],
    text: ''
  },
  '0/outside': {
    index: '0/outside',
    data: 'outside',
    hasChildren: true,
    children: [
      '0/outside/Tambient',
      '0/outside/alpha',
      '0/outside/beta',
      '0/outside/gl',
      '0/outside/pv_o',
      '0/outside/rad',
      '0/outside/rainTemp'
    ],
    text: ''
  },
  '0/Ts': {
    index: '0/Ts',
    data: 'Ts',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  2.2.0                                 |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.org                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n    version     2.0;\n    format      ascii;\n    class       volScalarField;\n    location    "0";\n    object      Ts;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\ndimensions      [0 0 0 1 0 0 0];\n\ninternalField   uniform 298.15; \n\nboundaryField\n{\n\n   \n    inside\n    {     \n        type                    HAMexternalHeatFlux;  \n        value                   uniform 298.15;  \n        Tambient                {file "0/inside/Tambient";}\n        alpha                   {file "0/inside/alpha";}        \n        rad                     {file "0/inside/rad";} \n        beta                    {file "0/inside/beta";}\n        pv_o                    {file "0/inside/pv_o";}\n        gl                      {file "0/inside/gl";}\n        rainTemp                {file "0/inside/rainTemp";}         \n    }\n    outside\n    {   \n        type                    HAMexternalHeatFlux;  \n        value                   uniform 298.15;\n        Tambient                {file "0/outside/Tambient";}\n        alpha                   {file "0/outside/alpha";}        \n        rad                     {file "0/outside/rad";} \n        beta                    {file "0/outside/beta";}\n        pv_o                    {file "0/outside/pv_o";}\n        gl                      {file "0/outside/gl";}\n        rainTemp                {file "0/outside/rainTemp";}             \n    }\n    sides\n    {\n        type            empty;\n    }\n}\n\n\n// ************************************************************************* //\n'
  },
  '0/pc': {
    index: '0/pc',
    data: 'pc',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  2.2.0                                 |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.org                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n    version     2.0;\n    format      ascii;\n    class       volScalarField;\n    location    "0";\n    object      pc;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\ndimensions      [1 -1 -2 0 0 0 0];\n\ninternalField   uniform -7.0291e+07; \n\nboundaryField\n{\n    inside\n    {\n        type                    HAMexternalMoistureFlux;\n        value                   uniform -7.0291e+07; \n        beta                    {file "0/inside/beta";}\n        pv_o                    {file "0/inside/pv_o";}\n        gl                      {file "0/inside/gl";}         \n    }\n    outside\n    {        \n        type                    HAMexternalMoistureFlux;\n        value                   uniform -7.0291e+07; \n        beta                    {file "0/outside/beta";}\n        pv_o                    {file "0/outside/pv_o";}\n        gl                      {file "0/outside/gl";}                   \n    }\n    sides\n    {\n        type            empty;\n    }\n}\n\n\n// ************************************************************************* //\n'
  },
  '0/ws': {
    index: '0/ws',
    data: 'ws',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  2.2.0                                 |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.org                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n    version     2.0;\n    format      ascii;\n    class       volScalarField;\n    location    "0";\n    object      ws;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\ndimensions      [1 -3 0 0 0 0 0];\n\ninternalField   uniform 2.0;\n\nboundaryField\n{\n    inside\n    {\n        type            zeroGradient;\n    }\n    outside\n    {\n        type            zeroGradient;\n    }\n    sides\n    {\n        type            empty;\n    }\n}\n\n\n// ************************************************************************* //\n'
  },
  '0/outside/Tambient': {
    index: '0/outside/Tambient',
    data: 'Tambient',
    hasChildren: false,
    children: [],
    text: '(\n(\t0\t273.15\t)\n(\t5814000\t273.15\t)\n)\n'
  },
  '0/outside/alpha': {
    index: '0/outside/alpha',
    data: 'alpha',
    hasChildren: false,
    children: [],
    text: '(\n(\t0\t25\t)\n(\t5184000\t25\t)\n)\n'
  },
  '0/outside/beta': {
    index: '0/outside/beta',
    data: 'beta',
    hasChildren: false,
    children: [],
    text: '(\n(\t0\t1.8382e-7\t)\n(\t5184000\t1.8382e-7\t)\n)\n'
  },
  '0/outside/gl': {
    index: '0/outside/gl',
    data: 'gl',
    hasChildren: false,
    children: [],
    text: '(\n(\t0\t0\t)\n(\t5184000\t0\t)\n)\n'
  },
  '0/outside/pv_o': {
    index: '0/outside/pv_o',
    data: 'pv_o',
    hasChildren: false,
    children: [],
    text: '(\n(\t0\t488.44\t)\n(\t5814000\t488.44\t)\n)\n'
  },
  '0/outside/rad': {
    index: '0/outside/rad',
    data: 'rad',
    hasChildren: false,
    children: [],
    text: '(\n(\t0\t0\t)\n(\t5184000\t0\t)\n)\n'
  },
  '0/outside/rainTemp': {
    index: '0/outside/rainTemp',
    data: 'rainTemp',
    hasChildren: false,
    children: [],
    text: '(\n(\t0\t283.15\t)\n(\t5184000\t283.15\t)\n)\n'
  },
  '0/inside/Tambient': {
    index: '0/inside/Tambient',
    data: 'Tambient',
    hasChildren: false,
    children: [],
    text: '(\n(\t0\t293.15\t)\n(\t5814000\t293.15\t)\n)\n'
  },
  '0/inside/alpha': {
    index: '0/inside/alpha',
    data: 'alpha',
    hasChildren: false,
    children: [],
    text: '(\n(\t0\t8\t)\n(\t5184000 8\t)\n)\n'
  },
  '0/inside/beta': {
    index: '0/inside/beta',
    data: 'beta',
    hasChildren: false,
    children: [],
    text: '(\n(\t0\t5.8823e-8\t)\n(\t5184000\t5.8823e-8\t)\n)\n'
  },
  '0/inside/gl': {
    index: '0/inside/gl',
    data: 'gl',
    hasChildren: false,
    children: [],
    text: '(\n(\t0\t0\t)\n(\t5184000\t0\t)\n)\n'
  },
  '0/inside/pv_o': {
    index: '0/inside/pv_o',
    data: 'pv_o',
    hasChildren: false,
    children: [],
    text: '(\n(\t0\t1402.7\t)\n(\t5814000\t1402.7\t)\n)\n'
  },
  '0/inside/rad': {
    index: '0/inside/rad',
    data: 'rad',
    hasChildren: false,
    children: [],
    text: '(\n(\t0\t0\t)\n(\t5184000\t0\t)\n)\n'
  },
  '0/inside/rainTemp': {
    index: '0/inside/rainTemp',
    data: 'rainTemp',
    hasChildren: false,
    children: [],
    text: '(\n(\t0\t283.15\t)\n(\t5184000\t283.15\t)\n)\n'
  },
  'system/blockMeshDict': {
    index: 'system/blockMeshDict',
    data: 'blockMeshDict',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  1.7.1                                 |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.com                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n    version     2.0;\n    format      ascii;\n    class       dictionary;\n    object      blockMeshDict;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\nconvertToMeters 1;\n\nvertices        \n(\n    (0      0       0)\n    (0.365      0       0)\n    (0.38      0       0)\n    (0.42      0       0)\n    (0.42      0.01       0)\n    (0.38      0.01       0)\n    (0.365      0.01       0)    \n    (0      0.01       0)\n\n    (0      0       0.01)\n    (0.365      0       0.01)\n    (0.38      0       0.01)\n    (0.42      0       0.01)\n    (0.42      0.01       0.01)\n    (0.38      0.01       0.01)\n    (0.365      0.01       0.01)    \n    (0      0.01       0.01)\n);\n\nblocks          \n(\n    hex (0 1 6 7 8 9 14 15)         (100 1 1) simpleGrading (((0.5 0.5 50)(0.5 0.5 0.02)) 1 1)\n    hex (1 2 5 6 9 10 13 14)         (15 1 1) simpleGrading (((0.5 0.5 20)(0.5 0.5 0.05)) 1 1)    \n    hex (2 3 4 5 10 11 12 13)         (30 1 1) simpleGrading (((0.5 0.5 20)(0.5 0.5 0.05)) 1 1)\n);\n\nedges           \n(\n);\n\npatches\n           \n(\n\n    patch inside\n    (\n        (3 4 12 11)\n    )\n\n    patch outside \n    (\n        (0 7 15 8)\n    )\n    \n    empty sides\n    (\n        (0 1 6 7)\n        (1 2 5 6)\n        (2 3 4 5) \n        (8 9 14 15)\n        (9 10 13 14)\n        (10 11 12 13)\n        (0 1 9 8)\n        (1 2 10 9)\n        (2 3 11 10)\n        (7 6 14 15)\n        (6 5 13 14)\n        (5 4 12 13)\n    )\n);\n\nmergePatchPairs\n(\n);\n\n// ************************************************************************* //\n'
  },
  'system/controlDict': {
    index: 'system/controlDict',
    data: 'controlDict',
    hasChildren: false,
    children: [],
    text: "/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  1.7.1                                 |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.com                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n    version     2.0;\n    format      ascii;\n    class       dictionary;\n    location    \"system\";\n    object      controlDict;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\napplication     hamFoam;\n\nstartFrom       latestTime;\n\nstartTime       0;\n\nstopAt          endTime;\n\nendTime         5184000;\n\ndeltaT          60;//1;\n\nwriteControl    adjustableRunTime;\n\nwriteInterval   86400;\n\npurgeWrite      0;\n\nwriteFormat     ascii;\n\nwritePrecision  10;\n\nwriteCompression on;\n\ntimeFormat      general;\n\ntimePrecision   12;\n\nrunTimeModifiable true;\n\nPicard\n{\n    minDeltaT       1E-6;\n    maxDeltaT       3600;\n\n    PicardToleranceTs\t0.1;\n    PicardTolerancews\t0.1;\n}\n\npcEqnForm    pc-based; //'pc-based' or 'mixed' - default is 'pc-based'\n\n// ************************************************************************* //\n"
  },
  'system/decomposeParDict': {
    index: 'system/decomposeParDict',
    data: 'decomposeParDict',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  2.2.2                                 |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.org                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n    version     2.0;\n    format      ascii;\n    class       dictionary;\n    location    "system";\n    object      decomposeParDict;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\nnumberOfSubdomains 2;\n\nmethod          scotch;\n\nsimpleCoeffs\n{\n    n               ( 2 2 1 );\n    delta           0.001;\n}\n\nhierarchicalCoeffs\n{\n    n               ( 1 1 1 );\n    delta           0.001;\n    order           xyz;\n}\n\nmanualCoeffs\n{\n    dataFile        "";\n}\n\ndistributed     no;\n\nroots           ( );\n\n\n// ************************************************************************* //\n'
  },
  'system/fvSchemes': {
    index: 'system/fvSchemes',
    data: 'fvSchemes',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  1.7.1                                 |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.com                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n    version     2.0;\n    format      ascii;\n    class       dictionary;\n    location    "system";\n    object      fvSchemes;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\nddtSchemes\n{\n    default         Euler;\n}\n\ngradSchemes\n{\n    default         Gauss linear;\n\n}\n\ndivSchemes\n{\n    default         none;\n}\n\nlaplacianSchemes\n{\n    default         none;\n\n    laplacian(Krel,pc) Gauss linear corrected;\n}\n\ninterpolationSchemes\n{\n    default         linear;\n}\n\nsnGradSchemes\n{\n    default         corrected;\n}\n\nfluxRequired\n{\n    default         yes;\n    U;\n}\n\n\n// ************************************************************************* //\n'
  },
  'system/fvSolution': {
    index: 'system/fvSolution',
    data: 'fvSolution',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  1.7.1                                 |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.com                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n    version     2.0;\n    format      ascii;\n    class       dictionary;\n    location    "system";\n    object      fvSolution;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\nsolvers\n{\n\n    pc\n    {\n        solver          PCG;\n        preconditioner  DIC;\n        tolerance       1e-20;\n        relTol          0;\n        minIter         1;\n    }\n\n    Ts\n    {\n        solver          PCG;\n        preconditioner  DIC;\n        tolerance       1e-20;\n        relTol          0;\n        minIter         1;\n    }    \n}\n\n// ************************************************************************* //\n'
  },
  'system/setset.batch': {
    index: 'system/setset.batch',
    data: 'setset.batch',
    hasChildren: false,
    children: [],
    text: 'cellSet brick new boxToCell (0.00 0.00 0)(0.365 1 1)\ncellZoneSet brick new setToCellZone brick\n\ncellSet mortar new boxToCell (0.365 0.00 0)(0.38 1 1)\ncellZoneSet mortar new setToCellZone mortar\n\ncellSet insulation new boxToCell (0.38 0.00 0)(0.42 1 1)\ncellZoneSet insulation new setToCellZone insulation\n'
  },
  'constant/g': {
    index: 'constant/g',
    data: 'g',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  2.2.2                                 |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.org                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n    version     2.0;\n    format      ascii;\n    class       uniformDimensionedVectorField;\n    location    "constant";\n    object      g;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\ndimensions      [0 1 -2 0 0 0 0];\nvalue           ( 0 0 0 );\n\n\n// ************************************************************************* //\n\n'
  },
  'constant/transportProperties': {
    index: 'constant/transportProperties',
    data: 'transportProperties',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  2.2.2                                 |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.org                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n    version     2.0;\n    format      ascii;\n    class       dictionary;\n    location    "constant";\n    object      transportProperties;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\nbuildingMaterials\n(\n\t{\n\t\tname\tbrick;\n\t\tbuildingMaterialModel Hamstad5Brick;\n    \trho     1600;\n    \tcap     1000;\n\t\tlambda1\t0.682;\t//lambda = lambda1 + ws*lambda2\n\t\tlambda2\t0;\n    }\n\t{\n\t\tname\tmortar;\n\t\tbuildingMaterialModel Hamstad5Mortar;\n    \trho     230;\n    \tcap     920;\n\t\tlambda1\t0.6;\t//lambda = lambda1 + ws*lambda2\n\t\tlambda2\t0.00056;\n    }\n\t{\n\t\tname\tinsulation;\n\t\tbuildingMaterialModel Hamstad5Insulation;\n    \trho     212;\n    \tcap     1000;\n\t\tlambda1\t0.06;\t//lambda = lambda1 + ws*lambda2\n\t\tlambda2\t0.00056;\n    }\n);\n\n// ************************************************************************* //\n'
  },
  root: {
    index: 'root',
    data: 'Root item',
    hasChildren: true,
    children: ['0', 'constant', 'system', 'Allclean', 'Allrun', 'hamfoam.foam'],
    text: ''
  }
}

export default data
