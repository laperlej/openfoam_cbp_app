const data = {
  simpleFoam: {
    index: 'simpleFoam',
    data: 'simpleFoam',
    hasChildren: true,
    children: [
      'simpleFoam/0',
      'simpleFoam/constant',
      'simpleFoam/system',
      'simpleFoam/Allclean',
      'simpleFoam/Allrun',
      'simpleFoam/cubicBuilding.foam'
    ],
    text: ''
  },
  windDrivenRainFoam: {
    index: 'windDrivenRainFoam',
    data: 'windDrivenRainFoam',
    hasChildren: true,
    children: [
      'windDrivenRainFoam/0',
      'windDrivenRainFoam/constant',
      'windDrivenRainFoam/system',
      'windDrivenRainFoam/Allclean',
      'windDrivenRainFoam/Allrun',
      'windDrivenRainFoam/cubicBuilding.foam'
    ],
    text: ''
  },
  Allclean: {
    index: 'Allclean',
    data: 'Allclean',
    hasChildren: false,
    children: [],
    text: '#!/bin/sh\ncd ${0%/*} || exit 1    # run from this directory\n\nsimpleFoam/Allclean\nwindDrivenRainFoam/Allclean\n'
  },
  Allrun: {
    index: 'Allrun',
    data: 'Allrun',
    hasChildren: false,
    children: [],
    text: '#!/bin/sh\ncd ${0%/*} || exit 1    # run from this directory\n\nsimpleFoam/Allrun\nwindDrivenRainFoam/Allrun\n'
  },
  'simpleFoam/0': {
    index: 'simpleFoam/0',
    data: '0',
    hasChildren: true,
    children: [
      'simpleFoam/0/include',
      'simpleFoam/0/U',
      'simpleFoam/0/epsilon',
      'simpleFoam/0/k',
      'simpleFoam/0/nut',
      'simpleFoam/0/p'
    ],
    text: ''
  },
  'simpleFoam/constant': {
    index: 'simpleFoam/constant',
    data: 'constant',
    hasChildren: true,
    children: [
      'simpleFoam/constant/transportProperties',
      'simpleFoam/constant/turbulenceProperties'
    ],
    text: ''
  },
  'simpleFoam/system': {
    index: 'simpleFoam/system',
    data: 'system',
    hasChildren: true,
    children: [
      'simpleFoam/system/blockMeshDict',
      'simpleFoam/system/controlDict',
      'simpleFoam/system/decomposeParDict',
      'simpleFoam/system/fvSchemes',
      'simpleFoam/system/fvSolution'
    ],
    text: ''
  },
  'simpleFoam/Allclean': {
    index: 'simpleFoam/Allclean',
    data: 'Allclean',
    hasChildren: false,
    children: [],
    text: '#!/bin/sh\ncd ${0%/*} || exit 1    # run from this directory\n\n# Source tutorial clean functions\n. $WM_PROJECT_DIR/bin/tools/CleanFunctions\n\ncleanCase\n\n# ----------------------------------------------------------------- end-of-file\n'
  },
  'simpleFoam/Allrun': {
    index: 'simpleFoam/Allrun',
    data: 'Allrun',
    hasChildren: false,
    children: [],
    text: '#!/bin/sh\ncd ${0%/*} || exit 1    # run from this directory\n\n# Source tutorial run functions\n. $WM_PROJECT_DIR/bin/tools/RunFunctions\n\nrunApplication blockMesh\n\n#-- Run on single processor\nrunApplication `getApplication`\n\n## Run in parallel\n## Decompose\n#runApplication decomposePar\n#\n#runParallel `getApplication` 8\n#\n## Reconstruct\n#runApplication reconstructPar -latestTime\n\n# ----------------------------------------------------------------- end-of-file\n'
  },
  'simpleFoam/cubicBuilding.foam': {
    index: 'simpleFoam/cubicBuilding.foam',
    data: 'cubicBuilding.foam',
    hasChildren: false,
    children: [],
    text: ''
  },
  'simpleFoam/0/include': {
    index: 'simpleFoam/0/include',
    data: 'include',
    hasChildren: true,
    children: ['simpleFoam/0/include/ABLConditions'],
    text: ''
  },
  'simpleFoam/0/U': {
    index: 'simpleFoam/0/U',
    data: 'U',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  2.0.0                                 |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.com                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n    version     2.0;\n    format      ascii;\n    class       volVectorField;\n    object      U;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\ndimensions      [0 1 -1 0 0 0 0];\n\ninternalField   uniform (3 0 0);\n\nboundaryField\n{\n\t\n    top\n    {\n        type            slip;\n    }\n\n    inlet\n    {\n        type            atmBoundaryLayerInletVelocity;\n        #include        "include/ABLConditions"\n    }\n\n    outlet \n    {\n\t\ttype\t\t\tzeroGradient;\n    }\n    ground      \n    {\n        type            fixedValue;\n        value           uniform (0 0 0);\n    }\n    buildings      \n    {\n        type            fixedValue;\n        value           uniform (0 0 0);\n    }\n    sides\n    {\n\t\ttype\t\t\tslip;\n    }\n}\n\n// ************************************************************************* //\n'
  },
  'simpleFoam/0/epsilon': {
    index: 'simpleFoam/0/epsilon',
    data: 'epsilon',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  2.0.0                                 |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.com                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n    version     2.0;\n    format      ascii;\n    class       volScalarField;\n    location    "0";\n    object      epsilon;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\ndimensions      [0 2 -3 0 0 0 0];\n\ninternalField   uniform 1.125;\n\nboundaryField\n{\n\n    top\n    {\n        type            slip;\n    }\n    inlet\n    {\n        type            atmBoundaryLayerInletEpsilon;\n        #include        "include/ABLConditions"\n    }\n    outlet\n    {\n        type            zeroGradient;\n    }\n    ground\n    {\n        type            epsilonWallFunction;\n        value           uniform 1.125;\n    }\n    buildings\n    {\n        type            epsilonWallFunction;\n        value           uniform 1.125;\n    }\n    sides\n    {\n\t\ttype\t\t\tslip;\n    }\n}\n\n\n// ************************************************************************* //\n'
  },
  'simpleFoam/0/k': {
    index: 'simpleFoam/0/k',
    data: 'k',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  2.0.0                                 |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.com                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n    version     2.0;\n    format      ascii;\n    class       volScalarField;\n    location    "0";\n    object      k;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\ndimensions      [0 2 -2 0 0 0 0];\n\ninternalField   uniform 0.357075;\n\nboundaryField\n{\n    top\n    {\n        type            slip;\n    }\n    inlet\n    {\n        type            atmBoundaryLayerInletK;\n        #include        "include/ABLConditions"\n    }\n    outlet\n    {\n        type            zeroGradient;\n    }\n    ground\n    {\n        type            kqRWallFunction;\n        value           uniform 0.357075;\n    }\n    buildings\n    {\n        type            kqRWallFunction;\n        value           uniform 0.357075;\n    }\n    sides\n    {\n\t\ttype\t\t\tslip;\n    }\n}\n\n\n// ************************************************************************* //\n'
  },
  'simpleFoam/0/nut': {
    index: 'simpleFoam/0/nut',
    data: 'nut',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  2.0.0                                 |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.com                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n    version     2.0;\n    format      ascii;\n    class       volScalarField;\n    location    "0";\n    object      nut;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\ndimensions      [0 2 -1 0 0 0 0];\n\ninternalField   uniform 0;\n\nboundaryField\n{\n    #include "include/ABLConditions"\n\n    top\n    {\n        type            slip;\n    }\n    inlet\n    {\n        type            calculated;\n        value           uniform 0;\n    }\n\n    outlet\n    {\n        type            calculated;\n        value           uniform 0;\n    }\n    ground\n    {\n        type            nutkAtmRoughWallFunction;\n        z0              $z0;\n        value           uniform 0.0;\n    }\n    buildings\n    {\n        type            nutkWallFunction;\n        Cmu             0.09;\n        kappa           0.42;\n        E               9.793;\n        value           uniform 0;\n    }\n    sides\n    {\n\t\ttype\t\t\tslip;\n    }\n}\n// ************************************************************************* //\n'
  },
  'simpleFoam/0/p': {
    index: 'simpleFoam/0/p',
    data: 'p',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  2.0.0                                 |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.com                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n    version     2.0;\n    format      ascii;\n    class       volScalarField;\n    object      p;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\ndimensions      [0 2 -2 0 0 0 0];\n\ninternalField   uniform 0;\n\nboundaryField\n{\n    top\n    {\n        type            slip;\n    }\n    inlet\n    {\n\t\ttype\t\t\tzeroGradient;\n    }\n    outlet\n    {\n        type            fixedValue;\n        value      \t\t$internalField;\n    }\n\n    ground      \n    {\n        type            zeroGradient;\n    }\n    buildings      \n    {\n        type            zeroGradient;\n    }\n    sides\n    {\n\t\ttype\t\t\tslip;\n    }\n}\n\n// ************************************************************************* //\n'
  },
  'simpleFoam/0/include/ABLConditions': {
    index: 'simpleFoam/0/include/ABLConditions',
    data: 'ABLConditions',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  2.2.2                                 |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.org                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\n\nUref                 10.0;\nZref                 10.0;\nzDir                 (0 1 0);\nflowDir              (1 0 0);\nz0                   uniform 0.03;\nzGround              uniform 0.0;\nvalue                $internalField;\n\n// ************************************************************************* //\n'
  },
  'simpleFoam/system/blockMeshDict': {
    index: 'simpleFoam/system/blockMeshDict',
    data: 'blockMeshDict',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  1.7.1                                 |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.com                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n   version     2.0;\n   format      ascii;\n   class       dictionary;\n   object      blockMeshDict;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\nconvertToMeters 1;\n\nvertices\n(\n  (0 0 0)\n  (50 0 0)\n  (55 0 0)\n  (60 0 0)\n  (210 0 0)\n  (0 5 0)\n  (50 5 0)\n  (55 5 0)\n  (60 5 0)\n  (210 5 0)\n  (0 10 0)\n  (50 10 0)\n  (55 10 0)\n  (60 10 0)\n  (210 10 0)\n  (0 60 0)\n  (50 60 0)\n  (55 60 0)\n  (60 60 0)\n  (210 60 0)\n  (0 0 50)\n  (50 0 50)\n  (55 0 50)\n  (60 0 50)\n  (210 0 50)\n  (0 5 50)\n  (50 5 50)\n  (55 5 50)\n  (60 5 50)\n  (210 5 50)\n  (0 10 50)\n  (50 10 50)\n  (55 10 50)\n  (60 10 50)\n  (210 10 50)\n  (0 60 50)\n  (50 60 50)\n  (55 60 50)\n  (60 60 50)\n  (210 60 50)\n  (0 0 55)\n  (50 0 55)\n  (55 0 55)\n  (60 0 55)\n  (210 0 55)\n  (0 5 55)\n  (50 5 55)\n  (55 5 55)\n  (60 5 55)\n  (210 5 55)\n  (0 10 55)\n  (50 10 55)\n  (55 10 55)\n  (60 10 55)\n  (210 10 55)\n  (0 60 55)\n  (50 60 55)\n  (55 60 55)\n  (60 60 55)\n  (210 60 55)\n  (0 0 60)\n  (50 0 60)\n  (55 0 60)\n  (60 0 60)\n  (210 0 60)\n  (0 5 60)\n  (50 5 60)\n  (55 5 60)\n  (60 5 60)\n  (210 5 60)\n  (0 10 60)\n  (50 10 60)\n  (55 10 60)\n  (60 10 60)\n  (210 10 60)\n  (0 60 60)\n  (50 60 60)\n  (55 60 60)\n  (60 60 60)\n  (210 60 60)\n  (0 0 110)\n  (50 0 110)\n  (55 0 110)\n  (60 0 110)\n  (210 0 110)\n  (0 5 110)\n  (50 5 110)\n  (55 5 110)\n  (60 5 110)\n  (210 5 110)\n  (0 10 110)\n  (50 10 110)\n  (55 10 110)\n  (60 10 110)\n  (210 10 110)\n  (0 60 110)\n  (50 60 110)\n  (55 60 110)\n  (60 60 110)\n  (210 60 110)\n);\n \nblocks\n(\n  hex (0 1 6 5 20 21 26 25) (30 15 30) simpleGrading (0.014550068805071 7.6137909574172 0.014550068805071)\n  hex (1 2 7 6 21 22 27 26) (15 15 30) simpleGrading (7.6137909574172 7.6137909574172 0.014550068805071)\n  hex (2 3 8 7 22 23 28 27) (15 15 30) simpleGrading (0.131340616737134 7.6137909574172 0.014550068805071)\n  hex (3 4 9 8 23 24 29 28) (40 15 30) simpleGrading (189.630666663524 7.6137909574172 0.014550068805071)\n  hex (5 6 11 10 25 26 31 30) (30 15 30) simpleGrading (0.014550068805071 0.131340616737134 0.014550068805071)\n  hex (6 7 12 11 26 27 32 31) (15 15 30) simpleGrading (7.6137909574172 0.131340616737134 0.014550068805071)\n  hex (7 8 13 12 27 28 33 32) (15 15 30) simpleGrading (0.131340616737134 0.131340616737134 0.014550068805071)\n  hex (8 9 14 13 28 29 34 33) (40 15 30) simpleGrading (189.630666663524 0.131340616737134 0.014550068805071)\n  hex (10 11 16 15 30 31 36 35) (30 30 30) simpleGrading (0.014550068805071 68.7281973287726 0.014550068805071)\n  hex (11 12 17 16 31 32 37 36) (15 30 30) simpleGrading (7.6137909574172 68.7281973287726 0.014550068805071)\n  hex (12 13 18 17 32 33 38 37) (15 30 30) simpleGrading (0.131340616737134 68.7281973287726 0.014550068805071)\n  hex (13 14 19 18 33 34 39 38) (40 30 30) simpleGrading (189.630666663524 68.7281973287726 0.014550068805071)\n  hex (20 21 26 25 40 41 46 45) (30 15 15) simpleGrading (0.014550068805071 7.6137909574172 7.6137909574172)\n  hex (23 24 29 28 43 44 49 48) (40 15 15) simpleGrading (189.630666663524 7.6137909574172 7.6137909574172)\n  hex (25 26 31 30 45 46 51 50) (30 15 15) simpleGrading (0.014550068805071 0.131340616737134 7.6137909574172)\n  hex (28 29 34 33 48 49 54 53) (40 15 15) simpleGrading (189.630666663524 0.131340616737134 7.6137909574172)\n  hex (30 31 36 35 50 51 56 55) (30 30 15) simpleGrading (0.014550068805071 68.7281973287726 7.6137909574172)\n  hex (31 32 37 36 51 52 57 56) (15 30 15) simpleGrading (7.6137909574172 68.7281973287726 7.6137909574172)\n  hex (32 33 38 37 52 53 58 57) (15 30 15) simpleGrading (0.131340616737134 68.7281973287726 7.6137909574172)\n  hex (33 34 39 38 53 54 59 58) (40 30 15) simpleGrading (189.630666663524 68.7281973287726 7.6137909574172)\n  hex (40 41 46 45 60 61 66 65) (30 15 15) simpleGrading (0.014550068805071 7.6137909574172 0.131340616737134)\n  hex (43 44 49 48 63 64 69 68) (40 15 15) simpleGrading (189.630666663524 7.6137909574172 0.131340616737134)\n  hex (45 46 51 50 65 66 71 70) (30 15 15) simpleGrading (0.014550068805071 0.131340616737134 0.131340616737134)\n  hex (48 49 54 53 68 69 74 73) (40 15 15) simpleGrading (189.630666663524 0.131340616737134 0.131340616737134)\n  hex (50 51 56 55 70 71 76 75) (30 30 15) simpleGrading (0.014550068805071 68.7281973287726 0.131340616737134)\n  hex (51 52 57 56 71 72 77 76) (15 30 15) simpleGrading (7.6137909574172 68.7281973287726 0.131340616737134)\n  hex (52 53 58 57 72 73 78 77) (15 30 15) simpleGrading (0.131340616737134 68.7281973287726 0.131340616737134)\n  hex (53 54 59 58 73 74 79 78) (40 30 15) simpleGrading (189.630666663524 68.7281973287726 0.131340616737134)\n  hex (60 61 66 65 80 81 86 85) (30 15 30) simpleGrading (0.014550068805071 7.6137909574172 68.7281973287726)\n  hex (61 62 67 66 81 82 87 86) (15 15 30) simpleGrading (7.6137909574172 7.6137909574172 68.7281973287726)\n  hex (62 63 68 67 82 83 88 87) (15 15 30) simpleGrading (0.131340616737134 7.6137909574172 68.7281973287726)\n  hex (63 64 69 68 83 84 89 88) (40 15 30) simpleGrading (189.630666663524 7.6137909574172 68.7281973287726)\n  hex (65 66 71 70 85 86 91 90) (30 15 30) simpleGrading (0.014550068805071 0.131340616737134 68.7281973287726)\n  hex (66 67 72 71 86 87 92 91) (15 15 30) simpleGrading (7.6137909574172 0.131340616737134 68.7281973287726)\n  hex (67 68 73 72 87 88 93 92) (15 15 30) simpleGrading (0.131340616737134 0.131340616737134 68.7281973287726)\n  hex (68 69 74 73 88 89 94 93) (40 15 30) simpleGrading (189.630666663524 0.131340616737134 68.7281973287726)\n  hex (70 71 76 75 90 91 96 95) (30 30 30) simpleGrading (0.014550068805071 68.7281973287726 68.7281973287726)\n  hex (71 72 77 76 91 92 97 96) (15 30 30) simpleGrading (7.6137909574172 68.7281973287726 68.7281973287726)\n  hex (72 73 78 77 92 93 98 97) (15 30 30) simpleGrading (0.131340616737134 68.7281973287726 68.7281973287726)\n  hex (73 74 79 78 93 94 99 98) (40 30 30) simpleGrading (189.630666663524 68.7281973287726 68.7281973287726)\n);\n \nedges\n(\n);\n \npatches\n(\n  patch inlet\n  (\n      (0 20 25 5)\n      (5 25 30 10)\n      (10 30 35 15)\n      (20 40 45 25)\n      (25 45 50 30)\n      (30 50 55 35)\n      (40 60 65 45)\n      (45 65 70 50)\n      (50 70 75 55)\n      (60 80 85 65)\n      (65 85 90 70)\n      (70 90 95 75)\n  )\n  patch outlet\n  (\n      (4 24 29 9)\n      (9 29 34 14)\n      (14 34 39 19)\n      (24 44 49 29)\n      (29 49 54 34)\n      (34 54 59 39)\n      (44 64 69 49)\n      (49 69 74 54)\n      (54 74 79 59)\n      (64 84 89 69)\n      (69 89 94 74)\n      (74 94 99 79)\n  )\n  slip top\n  (\n      (15 16 36 35)\n      (16 17 37 36)\n      (17 18 38 37)\n      (18 19 39 38)\n      (35 36 56 55)\n      (36 37 57 56)\n      (37 38 58 57)\n      (38 39 59 58)\n      (55 56 76 75)\n      (56 57 77 76)\n      (57 58 78 77)\n      (58 59 79 78)\n      (75 76 96 95)\n      (76 77 97 96)\n      (77 78 98 97)\n      (78 79 99 98)\n  )\n  wall ground\n  (\n      (0 1 21 20)\n      (1 2 22 21)\n      (2 3 23 22)\n      (3 4 24 23)\n      (20 21 41 40)\n      (23 24 44 43)\n      (40 41 61 60)\n      (43 44 64 63)\n      (60 61 81 80)\n      (61 62 82 81)\n      (62 63 83 82)\n      (63 64 84 83)\n  )\n  slip sides\n  (\n      (0 1 6 5)\n      (1 2 7 6)\n      (2 3 8 7)\n      (3 4 9 8)\n      (5 6 11 10)\n      (6 7 12 11)\n      (7 8 13 12)\n      (8 9 14 13)\n      (10 11 16 15)\n      (11 12 17 16)\n      (12 13 18 17)\n      (13 14 19 18)\n      (80 81 86 85)\n      (81 82 87 86)\n      (82 83 88 87)\n      (83 84 89 88)\n      (85 86 91 90)\n      (86 87 92 91)\n      (87 88 93 92)\n      (88 89 94 93)\n      (90 91 96 95)\n      (91 92 97 96)\n      (92 93 98 97)\n      (93 94 99 98)\n  )\n  wall buildings\n  (\n      (21 22 27 26)\t\n\t  (22 23 28 27)\n\t  (26 27 32 31)\n\t  (27 28 33 32)\n      (61 62 67 66)\t\n\t  (62 63 68 67)\n\t  (66 67 72 71)\n\t  (67 68 73 72)\t  \n\t  (21 41 46 26)\n\t  (41 61 66 46)\n\t  (26 46 51 31)\n\t  (46 66 71 51)\n\t  (23 43 48 28)\n\t  (43 63 68 48)\n\t  (28 48 53 33)\n\t  (48 68 73 53)\n\t  (31 32 52 51)\n\t  (32 33 53 52)\n\t  (51 52 72 71)\n\t  (52 53 73 72)\n  )   \n);\n \nmergePatchPairs\n(\n);\n\n// ************************************************************************* //\n'
  },
  'simpleFoam/system/controlDict': {
    index: 'simpleFoam/system/controlDict',
    data: 'controlDict',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  2.0.0                                 |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.com                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n    version     2.0;\n    format      ascii;\n    class       dictionary;\n    location    "system";\n    object      controlDict;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\napplication     simpleFoam;\n\nstartFrom       latestTime;\n\nstartTime       0;\n\nstopAt          endTime;\n\nendTime         10000;\n\ndeltaT          1;\n\nwriteControl    timeStep;\n\nwriteInterval   1000;\n\npurgeWrite      0;\n\nwriteFormat     ascii;\n\nwritePrecision  6;\n\nwriteCompression compressed;\n\ntimeFormat      general;\n\ntimePrecision   6;\n\nrunTimeModifiable true;\n\nlibs ("libatmosphericModels.so");\n\n// ************************************************************************* //\n'
  },
  'simpleFoam/system/decomposeParDict': {
    index: 'simpleFoam/system/decomposeParDict',
    data: 'decomposeParDict',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  2.0.0                                 |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.com                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n    version     2.0;\n    format      ascii;\n    class       dictionary;\n    object      decomposeParDict;\n}\n\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\nnumberOfSubdomains 8;\n\nmethod          simple;\n// method          ptscotch;\n\nsimpleCoeffs\n{\n    n               (4 1 2);\n    delta           0.001;\n}\n\nhierarchicalCoeffs\n{\n    n               (2 3 1);\n    delta           0.001;\n    order           xyz;\n}\n\nmanualCoeffs\n{\n    dataFile        "cellDecomposition";\n}\n\n\n// ************************************************************************* //\n'
  },
  'simpleFoam/system/fvSchemes': {
    index: 'simpleFoam/system/fvSchemes',
    data: 'fvSchemes',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  2.0.0                                 |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.com                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n    version     2.0;\n    format      ascii;\n    class       dictionary;\n    location    "system";\n    object      fvSchemes;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\nddtSchemes\n{\n    default         steadyState;\n}\n\ngradSchemes\n{\n    default         cellLimited Gauss linear 0.5;\n}\n\ndivSchemes\n{\n    default         none;\n    div(phi,U)      bounded Gauss linearUpwindV grad(U);\n    div(phi,k)      bounded Gauss upwind; \n    div(phi,epsilon) bounded Gauss upwind;\n    div((nuEff*dev2(T(grad(U))))) Gauss linear;\n}\n\nlaplacianSchemes\n{\n    default         Gauss linear limited 0.5;\n}\n\ninterpolationSchemes\n{\n    default         linear;\n    interpolate(U)  linear;\n}\n\nsnGradSchemes\n{\n    default         limited 0.5;\n}\n\nfluxRequired\n{\n    default         no;\n    p               ;\n}\n\n\n// ************************************************************************* //\n'
  },
  'simpleFoam/system/fvSolution': {
    index: 'simpleFoam/system/fvSolution',
    data: 'fvSolution',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  2.0.0                                 |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.com                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n    version     2.0;\n    format      ascii;\n    class       dictionary;\n    location    "system";\n    object      fvSolution;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\nsolvers\n{\n    p                                  // linear equation system solver for p\n    {\n        solver          GAMG;           // very efficient multigrid solver\n        tolerance       1e-09;          // solver finishes if either absolute\n        relTol          0.001;          // tolerance is reached or the relative\n                                        // tolerance here\n        minIter         3;              // a minimum number of iterations\n        maxIter         100;            // limitation of iterions number\n        smoother        DIC;            // setting for GAMG\n        nPreSweeps      1;              // 1 for p, set to 0 for all other!\n        nPostSweeps     2;              // 2 is fine\n        nFinestSweeps   2;              // 2 is fine\n        scaleCorrection true;           // true is fine\n        directSolveCoarsestLevel false; // false is fine\n        cacheAgglomeration on;          // on is fine; set to off, if dynamic\n                                        // mesh refinement is used!\n        nCellsInCoarsestLevel 500;      // 500 is fine,\n                                        // otherwise sqrt(number of cells)\n        agglomerator    faceAreaPair;   // faceAreaPair is fine\n        mergeLevels     1;              // 1 is fine\n    }\n\n    U                                   // linear equation system solver for U\n    {\n        solver          smoothSolver;   // solver type\n        smoother        GaussSeidel;    // smoother type\n        tolerance       1e-09;          // solver finishes if either absolute\n        relTol          0.001;           // tolerance is reached or the relative\n                                        // tolerance here\n        nSweeps         1;              // setting for smoothSolver\n        maxIter         100;            // limitation of iterations number\n    }\n\n    k\n    {\n        solver          smoothSolver;   // solver type\n        smoother        GaussSeidel;    // smoother type\n        tolerance       1e-09;          // solver finishes if either absolute\n        relTol          0.001;           // tolerance is reached or the relative\n                                        // tolerance here\n        nSweeps         1;              // setting for smoothSolver\n        maxIter         100;            // limitation of iterations number\n    }\n\n    epsilon\n    {\n        solver          smoothSolver;   // solver type\n        smoother        GaussSeidel;    // smoother type\n        tolerance       1e-09;          // solver finishes if either absolute\n        relTol          0.001;           // tolerance is reached or the relative\n                                        // tolerance here\n        nSweeps         1;              // setting for smoothSolver\n        maxIter         100;            // limitation of iterations number\n    }\n\n    R\n    {\n        solver          PBiCG;\n        preconditioner  DILU;\n        tolerance       1e-06;\n//        relTol          0.1;\n\trelTol          0.001;\n    }\n\n    nuTilda\n    {\n        solver          PBiCG;\n        preconditioner  DILU;\n        tolerance       1e-06;\n//        relTol          0.1;\n\trelTol          0.001;\n    }\n}\n\nSIMPLE\n{\n    nNonOrthogonalCorrectors 0;\n\n    residualControl\n    {\n        p               1e-5;\n        U               1e-5;\n        "(k|epsilon|omega)" 1e-5;\n    }\n}\n\npotentialFlow\n{\n\tnNonOrthogonalCorrectors 3;\n}\n\nrelaxationFactors\n{\n    p               0.3;\n    U               0.7;\n    k               0.7;\n    epsilon         0.7;\n    R               0.7;\n    nuTilda         0.7;\n}\n\n\n// ************************************************************************* //\n'
  },
  'simpleFoam/constant/transportProperties': {
    index: 'simpleFoam/constant/transportProperties',
    data: 'transportProperties',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  2.0.0                                 |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.com                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n    version     2.0;\n    format      ascii;\n    class       dictionary;\n    location    "constant";\n    object      transportProperties;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\ntransportModel  Newtonian;\n\nnu              nu [ 0 2 -1 0 0 0 0 ] 1.46e-05;\n\n// ************************************************************************* //\n'
  },
  'simpleFoam/constant/turbulenceProperties': {
    index: 'simpleFoam/constant/turbulenceProperties',
    data: 'turbulenceProperties',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n  =========                 |\n  \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox\n   \\\\    /   O peration     | Website:  https://openfoam.org\n    \\\\  /    A nd           | Version:  6\n     \\\\/     M anipulation  |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n    version     2.0;\n    format      ascii;\n    class       dictionary;\n    object      turbulenceProperties;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\nsimulationType RAS;\n\nRAS\n{\n    RASModel            kEpsilon;\n\n    turbulence          on;\n\n    printCoeffs         on;\n\n    kEpsilonCoeffs\n    {\n        Cmu         0.09;\n        C1          1.44;\n        C2          1.92;\n        sigmaEps    1.11; // Original value:1.44\n        // See:\n        // D.M. Hargreaves and N.G. Wright\n        // "On the use of the k-Epsilon model in commercial CFD software\n        // to model the neutral atmospheric boundary layer",\n        // J. of wind engineering and industrial aerodymanics,\n        // 95(2007) 355-269\n    }\n}\n\n// ************************************************************************* //\n'
  },
  'windDrivenRainFoam/0': {
    index: 'windDrivenRainFoam/0',
    data: '0',
    hasChildren: true,
    children: [
      'windDrivenRainFoam/0/U1',
      'windDrivenRainFoam/0/U10',
      'windDrivenRainFoam/0/U11',
      'windDrivenRainFoam/0/U12',
      'windDrivenRainFoam/0/U13',
      'windDrivenRainFoam/0/U14',
      'windDrivenRainFoam/0/U15',
      'windDrivenRainFoam/0/U16',
      'windDrivenRainFoam/0/U17',
      'windDrivenRainFoam/0/U2',
      'windDrivenRainFoam/0/U3',
      'windDrivenRainFoam/0/U4',
      'windDrivenRainFoam/0/U5',
      'windDrivenRainFoam/0/U6',
      'windDrivenRainFoam/0/U7',
      'windDrivenRainFoam/0/U8',
      'windDrivenRainFoam/0/U9',
      'windDrivenRainFoam/0/alpha1',
      'windDrivenRainFoam/0/alpha10',
      'windDrivenRainFoam/0/alpha11',
      'windDrivenRainFoam/0/alpha12',
      'windDrivenRainFoam/0/alpha13',
      'windDrivenRainFoam/0/alpha14',
      'windDrivenRainFoam/0/alpha15',
      'windDrivenRainFoam/0/alpha16',
      'windDrivenRainFoam/0/alpha17',
      'windDrivenRainFoam/0/alpha2',
      'windDrivenRainFoam/0/alpha3',
      'windDrivenRainFoam/0/alpha4',
      'windDrivenRainFoam/0/alpha5',
      'windDrivenRainFoam/0/alpha6',
      'windDrivenRainFoam/0/alpha7',
      'windDrivenRainFoam/0/alpha8',
      'windDrivenRainFoam/0/alpha9'
    ],
    text: ''
  },
  'windDrivenRainFoam/constant': {
    index: 'windDrivenRainFoam/constant',
    data: 'constant',
    hasChildren: true,
    children: [
      'windDrivenRainFoam/constant/g',
      'windDrivenRainFoam/constant/transportProperties'
    ],
    text: ''
  },
  'windDrivenRainFoam/system': {
    index: 'windDrivenRainFoam/system',
    data: 'system',
    hasChildren: true,
    children: [
      'windDrivenRainFoam/system/changeDictionaryDict',
      'windDrivenRainFoam/system/controlDict',
      'windDrivenRainFoam/system/decomposeParDict',
      'windDrivenRainFoam/system/fvSchemes',
      'windDrivenRainFoam/system/fvSolution'
    ],
    text: ''
  },
  'windDrivenRainFoam/Allclean': {
    index: 'windDrivenRainFoam/Allclean',
    data: 'Allclean',
    hasChildren: false,
    children: [],
    text: '#!/bin/sh\ncd ${0%/*} || exit 1    # run from this directory\n\n# Source tutorial clean functions\n. $WM_PROJECT_DIR/bin/tools/CleanFunctions\n\ncleanCase\n\nrm -rf ./0/epsilon* ./0/k* ./0/nut* ./0/U ./0/U.*\n\n# ----------------------------------------------------------------- end-of-file\n'
  },
  'windDrivenRainFoam/Allrun': {
    index: 'windDrivenRainFoam/Allrun',
    data: 'Allrun',
    hasChildren: false,
    children: [],
    text: '#!/bin/sh\ncd ${0%/*} || exit 1    # run from this directory\n\n# Source tutorial run functions\n. $WM_PROJECT_DIR/bin/tools/RunFunctions\n\n#copy mesh from simpleFoam case\ncp -r ../cubicBuilding.simpleFoam/constant/polyMesh/ constant/\n\nfor time in $(foamListTimes -case ../cubicBuilding.simpleFoam)\ndo\n\t[ "$time" = "0" -o "$time" = constant ] || {\n\t\ttimeDir=$time\n\t\techo "Copying files U, k, epsilon, nut from directory $timeDir"\n\t\tcp -r ../cubicBuilding.simpleFoam/${timeDir}/U.gz 0/U.gz\n\t\tcp -r ../cubicBuilding.simpleFoam/${timeDir}/k.gz 0/k.gz\n\t\tcp -r ../cubicBuilding.simpleFoam/${timeDir}/epsilon.gz 0/epsilon.gz\n\t\tcp -r ../cubicBuilding.simpleFoam/${timeDir}/nut.gz 0/nut.gz\n\t}\ndone\n\necho "Running changeDictionary app..."\nchangeDictionary > log.changeDictionary\n\n#-- Run on single processor\nrunApplication `getApplication`\n\n## Run in parallel\n## Decompose\n#runApplication decomposePar\n#\n#runParallel `getApplication` 8\n#\n## Reconstruct\n#runApplication reconstructPar -latestTime\n\n# ----------------------------------------------------------------- end-of-file\n'
  },
  'windDrivenRainFoam/cubicBuilding.foam': {
    index: 'windDrivenRainFoam/cubicBuilding.foam',
    data: 'cubicBuilding.foam',
    hasChildren: false,
    children: [],
    text: ''
  },
  'windDrivenRainFoam/0/U1': {
    index: 'windDrivenRainFoam/0/U1',
    data: 'U1',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  1.7.1                                 |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.com                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n   version     2.0;\n   format      ascii;\n   class       volVectorField;\n   object      U;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\ndimensions    [0 1 -1 0 0 0 0];\n\ninternalField uniform (1 0 0);\n\nboundaryField\n{\n   inlet\n   {\n       type            mapped;\n       interpolationScheme cell;\n       setAverage      false;\n       average         ( 1 0 0 );\n       value   $internalField;\n   }\n   top\n   {\n       type            mapped;\n       interpolationScheme cell;\n       setAverage      false;\n       average         ( 1 0 0 );\n       value   $internalField;\n   }\n   outlet\n   {\n       type    zeroGradient;\n   }\n   ground\n   {\n       type    zeroGradient;\n   }\n   buildings\n   {\n       type    zeroGradient;\n   }\n   sides\n   {\n       type    slip;\n   }\n}\n\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n'
  },
  'windDrivenRainFoam/0/U10': {
    index: 'windDrivenRainFoam/0/U10',
    data: 'U10',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  1.7.1                                 |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.com                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n   version     2.0;\n   format      ascii;\n   class       volVectorField;\n   object      U;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\ndimensions    [0 1 -1 0 0 0 0];\n\ninternalField uniform (1 0 0);\n\nboundaryField\n{\n   inlet\n   {\n       type            mapped;\n       interpolationScheme cell;\n       setAverage      false;\n       average         ( 1 0 0 );\n       value   $internalField;\n   }\n   top\n   {\n       type            mapped;\n       interpolationScheme cell;\n       setAverage      false;\n       average         ( 1 0 0 );\n       value   $internalField;\n   }\n   outlet\n   {\n       type    zeroGradient;\n   }\n   ground\n   {\n       type    zeroGradient;\n   }\n   buildings\n   {\n       type    zeroGradient;\n   }\n   sides\n   {\n       type    slip;\n   }\n}\n\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n'
  },
  'windDrivenRainFoam/0/U11': {
    index: 'windDrivenRainFoam/0/U11',
    data: 'U11',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  1.7.1                                 |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.com                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n   version     2.0;\n   format      ascii;\n   class       volVectorField;\n   object      U;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\ndimensions    [0 1 -1 0 0 0 0];\n\ninternalField uniform (1 0 0);\n\nboundaryField\n{\n   inlet\n   {\n       type            mapped;\n       interpolationScheme cell;\n       setAverage      false;\n       average         ( 1 0 0 );\n       value   $internalField;\n   }\n   top\n   {\n       type            mapped;\n       interpolationScheme cell;\n       setAverage      false;\n       average         ( 1 0 0 );\n       value   $internalField;\n   }\n   outlet\n   {\n       type    zeroGradient;\n   }\n   ground\n   {\n       type    zeroGradient;\n   }\n   buildings\n   {\n       type    zeroGradient;\n   }\n   sides\n   {\n       type    slip;\n   }\n}\n\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n'
  },
  'windDrivenRainFoam/0/U12': {
    index: 'windDrivenRainFoam/0/U12',
    data: 'U12',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  1.7.1                                 |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.com                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n   version     2.0;\n   format      ascii;\n   class       volVectorField;\n   object      U;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\ndimensions    [0 1 -1 0 0 0 0];\n\ninternalField uniform (1 0 0);\n\nboundaryField\n{\n   inlet\n   {\n       type            mapped;\n       interpolationScheme cell;\n       setAverage      false;\n       average         ( 1 0 0 );\n       value   $internalField;\n   }\n   top\n   {\n       type            mapped;\n       interpolationScheme cell;\n       setAverage      false;\n       average         ( 1 0 0 );\n       value   $internalField;\n   }\n   outlet\n   {\n       type    zeroGradient;\n   }\n   ground\n   {\n       type    zeroGradient;\n   }\n   buildings\n   {\n       type    zeroGradient;\n   }\n   sides\n   {\n       type    slip;\n   }\n}\n\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n'
  },
  'windDrivenRainFoam/0/U13': {
    index: 'windDrivenRainFoam/0/U13',
    data: 'U13',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  1.7.1                                 |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.com                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n   version     2.0;\n   format      ascii;\n   class       volVectorField;\n   object      U;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\ndimensions    [0 1 -1 0 0 0 0];\n\ninternalField uniform (1 0 0);\n\nboundaryField\n{\n   inlet\n   {\n       type            mapped;\n       interpolationScheme cell;\n       setAverage      false;\n       average         ( 1 0 0 );\n       value   $internalField;\n   }\n   top\n   {\n       type            mapped;\n       interpolationScheme cell;\n       setAverage      false;\n       average         ( 1 0 0 );\n       value   $internalField;\n   }\n   outlet\n   {\n       type    zeroGradient;\n   }\n   ground\n   {\n       type    zeroGradient;\n   }\n   buildings\n   {\n       type    zeroGradient;\n   }\n   sides\n   {\n       type    slip;\n   }\n}\n\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n'
  },
  'windDrivenRainFoam/0/U14': {
    index: 'windDrivenRainFoam/0/U14',
    data: 'U14',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  1.7.1                                 |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.com                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n   version     2.0;\n   format      ascii;\n   class       volVectorField;\n   object      U;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\ndimensions    [0 1 -1 0 0 0 0];\n\ninternalField uniform (1 0 0);\n\nboundaryField\n{\n   inlet\n   {\n       type            mapped;\n       interpolationScheme cell;\n       setAverage      false;\n       average         ( 1 0 0 );\n       value   $internalField;\n   }\n   top\n   {\n       type            mapped;\n       interpolationScheme cell;\n       setAverage      false;\n       average         ( 1 0 0 );\n       value   $internalField;\n   }\n   outlet\n   {\n       type    zeroGradient;\n   }\n   ground\n   {\n       type    zeroGradient;\n   }\n   buildings\n   {\n       type    zeroGradient;\n   }\n   sides\n   {\n       type    slip;\n   }\n}\n\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n'
  },
  'windDrivenRainFoam/0/U15': {
    index: 'windDrivenRainFoam/0/U15',
    data: 'U15',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  1.7.1                                 |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.com                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n   version     2.0;\n   format      ascii;\n   class       volVectorField;\n   object      U;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\ndimensions    [0 1 -1 0 0 0 0];\n\ninternalField uniform (1 0 0);\n\nboundaryField\n{\n   inlet\n   {\n       type            mapped;\n       interpolationScheme cell;\n       setAverage      false;\n       average         ( 1 0 0 );\n       value   $internalField;\n   }\n   top\n   {\n       type            mapped;\n       interpolationScheme cell;\n       setAverage      false;\n       average         ( 1 0 0 );\n       value   $internalField;\n   }\n   outlet\n   {\n       type    zeroGradient;\n   }\n   ground\n   {\n       type    zeroGradient;\n   }\n   buildings\n   {\n       type    zeroGradient;\n   }\n   sides\n   {\n       type    slip;\n   }\n}\n\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n'
  },
  'windDrivenRainFoam/0/U16': {
    index: 'windDrivenRainFoam/0/U16',
    data: 'U16',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  1.7.1                                 |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.com                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n   version     2.0;\n   format      ascii;\n   class       volVectorField;\n   object      U;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\ndimensions    [0 1 -1 0 0 0 0];\n\ninternalField uniform (1 0 0);\n\nboundaryField\n{\n   inlet\n   {\n       type            mapped;\n       interpolationScheme cell;\n       setAverage      false;\n       average         ( 1 0 0 );\n       value   $internalField;\n   }\n   top\n   {\n       type            mapped;\n       interpolationScheme cell;\n       setAverage      false;\n       average         ( 1 0 0 );\n       value   $internalField;\n   }\n   outlet\n   {\n       type    zeroGradient;\n   }\n   ground\n   {\n       type    zeroGradient;\n   }\n   buildings\n   {\n       type    zeroGradient;\n   }\n   sides\n   {\n       type    slip;\n   }\n}\n\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n'
  },
  'windDrivenRainFoam/0/U17': {
    index: 'windDrivenRainFoam/0/U17',
    data: 'U17',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  1.7.1                                 |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.com                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n   version     2.0;\n   format      ascii;\n   class       volVectorField;\n   object      U;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\ndimensions    [0 1 -1 0 0 0 0];\n\ninternalField uniform (1 0 0);\n\nboundaryField\n{\n   inlet\n   {\n       type            mapped;\n       interpolationScheme cell;\n       setAverage      false;\n       average         ( 1 0 0 );\n       value   $internalField;\n   }\n   top\n   {\n       type            mapped;\n       interpolationScheme cell;\n       setAverage      false;\n       average         ( 1 0 0 );\n       value   $internalField;\n   }\n   outlet\n   {\n       type    zeroGradient;\n   }\n   ground\n   {\n       type    zeroGradient;\n   }\n   buildings\n   {\n       type    zeroGradient;\n   }\n   sides\n   {\n       type    slip;\n   }\n}\n\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n'
  },
  'windDrivenRainFoam/0/U2': {
    index: 'windDrivenRainFoam/0/U2',
    data: 'U2',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  1.7.1                                 |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.com                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n   version     2.0;\n   format      ascii;\n   class       volVectorField;\n   object      U;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\ndimensions    [0 1 -1 0 0 0 0];\n\ninternalField uniform (1 0 0);\n\nboundaryField\n{\n   inlet\n   {\n       type            mapped;\n       interpolationScheme cell;\n       setAverage      false;\n       average         ( 1 0 0 );\n       value   $internalField;\n   }\n   top\n   {\n       type            mapped;\n       interpolationScheme cell;\n       setAverage      false;\n       average         ( 1 0 0 );\n       value   $internalField;\n   }\n   outlet\n   {\n       type    zeroGradient;\n   }\n   ground\n   {\n       type    zeroGradient;\n   }\n   buildings\n   {\n       type    zeroGradient;\n   }\n   sides\n   {\n       type    slip;\n   }\n}\n\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n'
  },
  'windDrivenRainFoam/0/U3': {
    index: 'windDrivenRainFoam/0/U3',
    data: 'U3',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  1.7.1                                 |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.com                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n   version     2.0;\n   format      ascii;\n   class       volVectorField;\n   object      U;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\ndimensions    [0 1 -1 0 0 0 0];\n\ninternalField uniform (1 0 0);\n\nboundaryField\n{\n   inlet\n   {\n       type            mapped;\n       interpolationScheme cell;\n       setAverage      false;\n       average         ( 1 0 0 );\n       value   $internalField;\n   }\n   top\n   {\n       type            mapped;\n       interpolationScheme cell;\n       setAverage      false;\n       average         ( 1 0 0 );\n       value   $internalField;\n   }\n   outlet\n   {\n       type    zeroGradient;\n   }\n   ground\n   {\n       type    zeroGradient;\n   }\n   buildings\n   {\n       type    zeroGradient;\n   }\n   sides\n   {\n       type    slip;\n   }\n}\n\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n'
  },
  'windDrivenRainFoam/0/U4': {
    index: 'windDrivenRainFoam/0/U4',
    data: 'U4',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  1.7.1                                 |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.com                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n   version     2.0;\n   format      ascii;\n   class       volVectorField;\n   object      U;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\ndimensions    [0 1 -1 0 0 0 0];\n\ninternalField uniform (1 0 0);\n\nboundaryField\n{\n   inlet\n   {\n       type            mapped;\n       interpolationScheme cell;\n       setAverage      false;\n       average         ( 1 0 0 );\n       value   $internalField;\n   }\n   top\n   {\n       type            mapped;\n       interpolationScheme cell;\n       setAverage      false;\n       average         ( 1 0 0 );\n       value   $internalField;\n   }\n   outlet\n   {\n       type    zeroGradient;\n   }\n   ground\n   {\n       type    zeroGradient;\n   }\n   buildings\n   {\n       type    zeroGradient;\n   }\n   sides\n   {\n       type    slip;\n   }\n}\n\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n'
  },
  'windDrivenRainFoam/0/U5': {
    index: 'windDrivenRainFoam/0/U5',
    data: 'U5',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  1.7.1                                 |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.com                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n   version     2.0;\n   format      ascii;\n   class       volVectorField;\n   object      U;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\ndimensions    [0 1 -1 0 0 0 0];\n\ninternalField uniform (1 0 0);\n\nboundaryField\n{\n   inlet\n   {\n       type            mapped;\n       interpolationScheme cell;\n       setAverage      false;\n       average         ( 1 0 0 );\n       value   $internalField;\n   }\n   top\n   {\n       type            mapped;\n       interpolationScheme cell;\n       setAverage      false;\n       average         ( 1 0 0 );\n       value   $internalField;\n   }\n   outlet\n   {\n       type    zeroGradient;\n   }\n   ground\n   {\n       type    zeroGradient;\n   }\n   buildings\n   {\n       type    zeroGradient;\n   }\n   sides\n   {\n       type    slip;\n   }\n}\n\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n'
  },
  'windDrivenRainFoam/0/U6': {
    index: 'windDrivenRainFoam/0/U6',
    data: 'U6',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  1.7.1                                 |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.com                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n   version     2.0;\n   format      ascii;\n   class       volVectorField;\n   object      U;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\ndimensions    [0 1 -1 0 0 0 0];\n\ninternalField uniform (1 0 0);\n\nboundaryField\n{\n   inlet\n   {\n       type            mapped;\n       interpolationScheme cell;\n       setAverage      false;\n       average         ( 1 0 0 );\n       value   $internalField;\n   }\n   top\n   {\n       type            mapped;\n       interpolationScheme cell;\n       setAverage      false;\n       average         ( 1 0 0 );\n       value   $internalField;\n   }\n   outlet\n   {\n       type    zeroGradient;\n   }\n   ground\n   {\n       type    zeroGradient;\n   }\n   buildings\n   {\n       type    zeroGradient;\n   }\n   sides\n   {\n       type    slip;\n   }\n}\n\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n'
  },
  'windDrivenRainFoam/0/U7': {
    index: 'windDrivenRainFoam/0/U7',
    data: 'U7',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  1.7.1                                 |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.com                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n   version     2.0;\n   format      ascii;\n   class       volVectorField;\n   object      U;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\ndimensions    [0 1 -1 0 0 0 0];\n\ninternalField uniform (1 0 0);\n\nboundaryField\n{\n   inlet\n   {\n       type            mapped;\n       interpolationScheme cell;\n       setAverage      false;\n       average         ( 1 0 0 );\n       value   $internalField;\n   }\n   top\n   {\n       type            mapped;\n       interpolationScheme cell;\n       setAverage      false;\n       average         ( 1 0 0 );\n       value   $internalField;\n   }\n   outlet\n   {\n       type    zeroGradient;\n   }\n   ground\n   {\n       type    zeroGradient;\n   }\n   buildings\n   {\n       type    zeroGradient;\n   }\n   sides\n   {\n       type    slip;\n   }\n}\n\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n'
  },
  'windDrivenRainFoam/0/U8': {
    index: 'windDrivenRainFoam/0/U8',
    data: 'U8',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  1.7.1                                 |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.com                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n   version     2.0;\n   format      ascii;\n   class       volVectorField;\n   object      U;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\ndimensions    [0 1 -1 0 0 0 0];\n\ninternalField uniform (1 0 0);\n\nboundaryField\n{\n   inlet\n   {\n       type            mapped;\n       interpolationScheme cell;\n       setAverage      false;\n       average         ( 1 0 0 );\n       value   $internalField;\n   }\n   top\n   {\n       type            mapped;\n       interpolationScheme cell;\n       setAverage      false;\n       average         ( 1 0 0 );\n       value   $internalField;\n   }\n   outlet\n   {\n       type    zeroGradient;\n   }\n   ground\n   {\n       type    zeroGradient;\n   }\n   buildings\n   {\n       type    zeroGradient;\n   }\n   sides\n   {\n       type    slip;\n   }\n}\n\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n'
  },
  'windDrivenRainFoam/0/U9': {
    index: 'windDrivenRainFoam/0/U9',
    data: 'U9',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  1.7.1                                 |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.com                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n   version     2.0;\n   format      ascii;\n   class       volVectorField;\n   object      U;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\ndimensions    [0 1 -1 0 0 0 0];\n\ninternalField uniform (1 0 0);\n\nboundaryField\n{\n   inlet\n   {\n       type            mapped;\n       interpolationScheme cell;\n       setAverage      false;\n       average         ( 1 0 0 );\n       value   $internalField;\n   }\n   top\n   {\n       type            mapped;\n       interpolationScheme cell;\n       setAverage      false;\n       average         ( 1 0 0 );\n       value   $internalField;\n   }\n   outlet\n   {\n       type    zeroGradient;\n   }\n   ground\n   {\n       type    zeroGradient;\n   }\n   buildings\n   {\n       type    zeroGradient;\n   }\n   sides\n   {\n       type    slip;\n   }\n}\n\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n'
  },
  'windDrivenRainFoam/0/alpha1': {
    index: 'windDrivenRainFoam/0/alpha1',
    data: 'alpha1',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  1.7.1                                 |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.com                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n   version     2.0;\n   format      ascii;\n   class       volScalarField;\n   object      alpha;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\ndimensions    [0 0 0 0 0 0 0];\n\ninternalField uniform 0;\n\nboundaryField\n{\n   inlet\n   {\n       type    fixedValue;\n       value   uniform 1.0;\n   }\n   top\n   {\n       type    fixedValue;\n       value   uniform 1.0;\n   }\n   outlet\n   {\n       type    inletOutlet;\n       phi    phi1;\n       inletValue    uniform 0;\n       value    uniform 0;\n   }\n   ground\n   {\n       type    inletOutlet;\n       phi    phi1;\n       inletValue    uniform 0;\n       value    uniform 0;\n   }\n   buildings\n   {\n       type    inletOutlet;\n       phi    phi1;\n       inletValue    uniform 0;\n       value    uniform 0;\n   }\n   sides\n   {\n       type    slip;\n   }\n}\n\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n'
  },
  'windDrivenRainFoam/0/alpha10': {
    index: 'windDrivenRainFoam/0/alpha10',
    data: 'alpha10',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  1.7.1                                 |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.com                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n   version     2.0;\n   format      ascii;\n   class       volScalarField;\n   object      alpha;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\ndimensions    [0 0 0 0 0 0 0];\n\ninternalField uniform 0;\n\nboundaryField\n{\n   inlet\n   {\n       type    fixedValue;\n       value   uniform 1.0;\n   }\n   top\n   {\n       type    fixedValue;\n       value   uniform 1.0;\n   }\n   outlet\n   {\n       type    inletOutlet;\n       phi    phi10;\n       inletValue    uniform 0;\n       value    uniform 0;\n   }\n   ground\n   {\n       type    inletOutlet;\n       phi    phi10;\n       inletValue    uniform 0;\n       value    uniform 0;\n   }\n   buildings\n   {\n       type    inletOutlet;\n       phi    phi10;\n       inletValue    uniform 0;\n       value    uniform 0;\n   }\n   sides\n   {\n       type    slip;\n   }\n}\n\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n'
  },
  'windDrivenRainFoam/0/alpha11': {
    index: 'windDrivenRainFoam/0/alpha11',
    data: 'alpha11',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  1.7.1                                 |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.com                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n   version     2.0;\n   format      ascii;\n   class       volScalarField;\n   object      alpha;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\ndimensions    [0 0 0 0 0 0 0];\n\ninternalField uniform 0;\n\nboundaryField\n{\n   inlet\n   {\n       type    fixedValue;\n       value   uniform 1.0;\n   }\n   top\n   {\n       type    fixedValue;\n       value   uniform 1.0;\n   }\n   outlet\n   {\n       type    inletOutlet;\n       phi    phi11;\n       inletValue    uniform 0;\n       value    uniform 0;\n   }\n   ground\n   {\n       type    inletOutlet;\n       phi    phi11;\n       inletValue    uniform 0;\n       value    uniform 0;\n   }\n   buildings\n   {\n       type    inletOutlet;\n       phi    phi11;\n       inletValue    uniform 0;\n       value    uniform 0;\n   }\n   sides\n   {\n       type    slip;\n   }\n}\n\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n'
  },
  'windDrivenRainFoam/0/alpha12': {
    index: 'windDrivenRainFoam/0/alpha12',
    data: 'alpha12',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  1.7.1                                 |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.com                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n   version     2.0;\n   format      ascii;\n   class       volScalarField;\n   object      alpha;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\ndimensions    [0 0 0 0 0 0 0];\n\ninternalField uniform 0;\n\nboundaryField\n{\n   inlet\n   {\n       type    fixedValue;\n       value   uniform 1.0;\n   }\n   top\n   {\n       type    fixedValue;\n       value   uniform 1.0;\n   }\n   outlet\n   {\n       type    inletOutlet;\n       phi    phi12;\n       inletValue    uniform 0;\n       value    uniform 0;\n   }\n   ground\n   {\n       type    inletOutlet;\n       phi    phi12;\n       inletValue    uniform 0;\n       value    uniform 0;\n   }\n   buildings\n   {\n       type    inletOutlet;\n       phi    phi12;\n       inletValue    uniform 0;\n       value    uniform 0;\n   }\n   sides\n   {\n       type    slip;\n   }\n}\n\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n'
  },
  'windDrivenRainFoam/0/alpha13': {
    index: 'windDrivenRainFoam/0/alpha13',
    data: 'alpha13',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  1.7.1                                 |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.com                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n   version     2.0;\n   format      ascii;\n   class       volScalarField;\n   object      alpha;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\ndimensions    [0 0 0 0 0 0 0];\n\ninternalField uniform 0;\n\nboundaryField\n{\n   inlet\n   {\n       type    fixedValue;\n       value   uniform 1.0;\n   }\n   top\n   {\n       type    fixedValue;\n       value   uniform 1.0;\n   }\n   outlet\n   {\n       type    inletOutlet;\n       phi    phi13;\n       inletValue    uniform 0;\n       value    uniform 0;\n   }\n   ground\n   {\n       type    inletOutlet;\n       phi    phi13;\n       inletValue    uniform 0;\n       value    uniform 0;\n   }\n   buildings\n   {\n       type    inletOutlet;\n       phi    phi13;\n       inletValue    uniform 0;\n       value    uniform 0;\n   }\n   sides\n   {\n       type    slip;\n   }\n}\n\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n'
  },
  'windDrivenRainFoam/0/alpha14': {
    index: 'windDrivenRainFoam/0/alpha14',
    data: 'alpha14',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  1.7.1                                 |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.com                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n   version     2.0;\n   format      ascii;\n   class       volScalarField;\n   object      alpha;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\ndimensions    [0 0 0 0 0 0 0];\n\ninternalField uniform 0;\n\nboundaryField\n{\n   inlet\n   {\n       type    fixedValue;\n       value   uniform 1.0;\n   }\n   top\n   {\n       type    fixedValue;\n       value   uniform 1.0;\n   }\n   outlet\n   {\n       type    inletOutlet;\n       phi    phi14;\n       inletValue    uniform 0;\n       value    uniform 0;\n   }\n   ground\n   {\n       type    inletOutlet;\n       phi    phi14;\n       inletValue    uniform 0;\n       value    uniform 0;\n   }\n   buildings\n   {\n       type    inletOutlet;\n       phi    phi14;\n       inletValue    uniform 0;\n       value    uniform 0;\n   }\n   sides\n   {\n       type    slip;\n   }\n}\n\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n'
  },
  'windDrivenRainFoam/0/alpha15': {
    index: 'windDrivenRainFoam/0/alpha15',
    data: 'alpha15',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  1.7.1                                 |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.com                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n   version     2.0;\n   format      ascii;\n   class       volScalarField;\n   object      alpha;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\ndimensions    [0 0 0 0 0 0 0];\n\ninternalField uniform 0;\n\nboundaryField\n{\n   inlet\n   {\n       type    fixedValue;\n       value   uniform 1.0;\n   }\n   top\n   {\n       type    fixedValue;\n       value   uniform 1.0;\n   }\n   outlet\n   {\n       type    inletOutlet;\n       phi    phi15;\n       inletValue    uniform 0;\n       value    uniform 0;\n   }\n   ground\n   {\n       type    inletOutlet;\n       phi    phi15;\n       inletValue    uniform 0;\n       value    uniform 0;\n   }\n   buildings\n   {\n       type    inletOutlet;\n       phi    phi15;\n       inletValue    uniform 0;\n       value    uniform 0;\n   }\n   sides\n   {\n       type    slip;\n   }\n}\n\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n'
  },
  'windDrivenRainFoam/0/alpha16': {
    index: 'windDrivenRainFoam/0/alpha16',
    data: 'alpha16',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  1.7.1                                 |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.com                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n   version     2.0;\n   format      ascii;\n   class       volScalarField;\n   object      alpha;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\ndimensions    [0 0 0 0 0 0 0];\n\ninternalField uniform 0;\n\nboundaryField\n{\n   inlet\n   {\n       type    fixedValue;\n       value   uniform 1.0;\n   }\n   top\n   {\n       type    fixedValue;\n       value   uniform 1.0;\n   }\n   outlet\n   {\n       type    inletOutlet;\n       phi    phi16;\n       inletValue    uniform 0;\n       value    uniform 0;\n   }\n   ground\n   {\n       type    inletOutlet;\n       phi    phi16;\n       inletValue    uniform 0;\n       value    uniform 0;\n   }\n   buildings\n   {\n       type    inletOutlet;\n       phi    phi16;\n       inletValue    uniform 0;\n       value    uniform 0;\n   }\n   sides\n   {\n       type    slip;\n   }\n}\n\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n'
  },
  'windDrivenRainFoam/0/alpha17': {
    index: 'windDrivenRainFoam/0/alpha17',
    data: 'alpha17',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  1.7.1                                 |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.com                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n   version     2.0;\n   format      ascii;\n   class       volScalarField;\n   object      alpha;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\ndimensions    [0 0 0 0 0 0 0];\n\ninternalField uniform 0;\n\nboundaryField\n{\n   inlet\n   {\n       type    fixedValue;\n       value   uniform 1.0;\n   }\n   top\n   {\n       type    fixedValue;\n       value   uniform 1.0;\n   }\n   outlet\n   {\n       type    inletOutlet;\n       phi    phi17;\n       inletValue    uniform 0;\n       value    uniform 0;\n   }\n   ground\n   {\n       type    inletOutlet;\n       phi    phi17;\n       inletValue    uniform 0;\n       value    uniform 0;\n   }\n   buildings\n   {\n       type    inletOutlet;\n       phi    phi17;\n       inletValue    uniform 0;\n       value    uniform 0;\n   }\n   sides\n   {\n       type    slip;\n   }\n}\n\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n'
  },
  'windDrivenRainFoam/0/alpha2': {
    index: 'windDrivenRainFoam/0/alpha2',
    data: 'alpha2',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  1.7.1                                 |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.com                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n   version     2.0;\n   format      ascii;\n   class       volScalarField;\n   object      alpha;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\ndimensions    [0 0 0 0 0 0 0];\n\ninternalField uniform 0;\n\nboundaryField\n{\n   inlet\n   {\n       type    fixedValue;\n       value   uniform 1.0;\n   }\n   top\n   {\n       type    fixedValue;\n       value   uniform 1.0;\n   }\n   outlet\n   {\n       type    inletOutlet;\n       phi    phi2;\n       inletValue    uniform 0;\n       value    uniform 0;\n   }\n   ground\n   {\n       type    inletOutlet;\n       phi    phi2;\n       inletValue    uniform 0;\n       value    uniform 0;\n   }\n   buildings\n   {\n       type    inletOutlet;\n       phi    phi2;\n       inletValue    uniform 0;\n       value    uniform 0;\n   }\n   sides\n   {\n       type    slip;\n   }\n}\n\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n'
  },
  'windDrivenRainFoam/0/alpha3': {
    index: 'windDrivenRainFoam/0/alpha3',
    data: 'alpha3',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  1.7.1                                 |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.com                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n   version     2.0;\n   format      ascii;\n   class       volScalarField;\n   object      alpha;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\ndimensions    [0 0 0 0 0 0 0];\n\ninternalField uniform 0;\n\nboundaryField\n{\n   inlet\n   {\n       type    fixedValue;\n       value   uniform 1.0;\n   }\n   top\n   {\n       type    fixedValue;\n       value   uniform 1.0;\n   }\n   outlet\n   {\n       type    inletOutlet;\n       phi    phi3;\n       inletValue    uniform 0;\n       value    uniform 0;\n   }\n   ground\n   {\n       type    inletOutlet;\n       phi    phi3;\n       inletValue    uniform 0;\n       value    uniform 0;\n   }\n   buildings\n   {\n       type    inletOutlet;\n       phi    phi3;\n       inletValue    uniform 0;\n       value    uniform 0;\n   }\n   sides\n   {\n       type    slip;\n   }\n}\n\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n'
  },
  'windDrivenRainFoam/0/alpha4': {
    index: 'windDrivenRainFoam/0/alpha4',
    data: 'alpha4',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  1.7.1                                 |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.com                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n   version     2.0;\n   format      ascii;\n   class       volScalarField;\n   object      alpha;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\ndimensions    [0 0 0 0 0 0 0];\n\ninternalField uniform 0;\n\nboundaryField\n{\n   inlet\n   {\n       type    fixedValue;\n       value   uniform 1.0;\n   }\n   top\n   {\n       type    fixedValue;\n       value   uniform 1.0;\n   }\n   outlet\n   {\n       type    inletOutlet;\n       phi    phi4;\n       inletValue    uniform 0;\n       value    uniform 0;\n   }\n   ground\n   {\n       type    inletOutlet;\n       phi    phi4;\n       inletValue    uniform 0;\n       value    uniform 0;\n   }\n   buildings\n   {\n       type    inletOutlet;\n       phi    phi4;\n       inletValue    uniform 0;\n       value    uniform 0;\n   }\n   sides\n   {\n       type    slip;\n   }\n}\n\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n'
  },
  'windDrivenRainFoam/0/alpha5': {
    index: 'windDrivenRainFoam/0/alpha5',
    data: 'alpha5',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  1.7.1                                 |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.com                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n   version     2.0;\n   format      ascii;\n   class       volScalarField;\n   object      alpha;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\ndimensions    [0 0 0 0 0 0 0];\n\ninternalField uniform 0;\n\nboundaryField\n{\n   inlet\n   {\n       type    fixedValue;\n       value   uniform 1.0;\n   }\n   top\n   {\n       type    fixedValue;\n       value   uniform 1.0;\n   }\n   outlet\n   {\n       type    inletOutlet;\n       phi    phi5;\n       inletValue    uniform 0;\n       value    uniform 0;\n   }\n   ground\n   {\n       type    inletOutlet;\n       phi    phi5;\n       inletValue    uniform 0;\n       value    uniform 0;\n   }\n   buildings\n   {\n       type    inletOutlet;\n       phi    phi5;\n       inletValue    uniform 0;\n       value    uniform 0;\n   }\n   sides\n   {\n       type    slip;\n   }\n}\n\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n'
  },
  'windDrivenRainFoam/0/alpha6': {
    index: 'windDrivenRainFoam/0/alpha6',
    data: 'alpha6',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  1.7.1                                 |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.com                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n   version     2.0;\n   format      ascii;\n   class       volScalarField;\n   object      alpha;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\ndimensions    [0 0 0 0 0 0 0];\n\ninternalField uniform 0;\n\nboundaryField\n{\n   inlet\n   {\n       type    fixedValue;\n       value   uniform 1.0;\n   }\n   top\n   {\n       type    fixedValue;\n       value   uniform 1.0;\n   }\n   outlet\n   {\n       type    inletOutlet;\n       phi    phi6;\n       inletValue    uniform 0;\n       value    uniform 0;\n   }\n   ground\n   {\n       type    inletOutlet;\n       phi    phi6;\n       inletValue    uniform 0;\n       value    uniform 0;\n   }\n   buildings\n   {\n       type    inletOutlet;\n       phi    phi6;\n       inletValue    uniform 0;\n       value    uniform 0;\n   }\n   sides\n   {\n       type    slip;\n   }\n}\n\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n'
  },
  'windDrivenRainFoam/0/alpha7': {
    index: 'windDrivenRainFoam/0/alpha7',
    data: 'alpha7',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  1.7.1                                 |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.com                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n   version     2.0;\n   format      ascii;\n   class       volScalarField;\n   object      alpha;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\ndimensions    [0 0 0 0 0 0 0];\n\ninternalField uniform 0;\n\nboundaryField\n{\n   inlet\n   {\n       type    fixedValue;\n       value   uniform 1.0;\n   }\n   top\n   {\n       type    fixedValue;\n       value   uniform 1.0;\n   }\n   outlet\n   {\n       type    inletOutlet;\n       phi    phi7;\n       inletValue    uniform 0;\n       value    uniform 0;\n   }\n   ground\n   {\n       type    inletOutlet;\n       phi    phi7;\n       inletValue    uniform 0;\n       value    uniform 0;\n   }\n   buildings\n   {\n       type    inletOutlet;\n       phi    phi7;\n       inletValue    uniform 0;\n       value    uniform 0;\n   }\n   sides\n   {\n       type    slip;\n   }\n}\n\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n'
  },
  'windDrivenRainFoam/0/alpha8': {
    index: 'windDrivenRainFoam/0/alpha8',
    data: 'alpha8',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  1.7.1                                 |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.com                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n   version     2.0;\n   format      ascii;\n   class       volScalarField;\n   object      alpha;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\ndimensions    [0 0 0 0 0 0 0];\n\ninternalField uniform 0;\n\nboundaryField\n{\n   inlet\n   {\n       type    fixedValue;\n       value   uniform 1.0;\n   }\n   top\n   {\n       type    fixedValue;\n       value   uniform 1.0;\n   }\n   outlet\n   {\n       type    inletOutlet;\n       phi    phi8;\n       inletValue    uniform 0;\n       value    uniform 0;\n   }\n   ground\n   {\n       type    inletOutlet;\n       phi    phi8;\n       inletValue    uniform 0;\n       value    uniform 0;\n   }\n   buildings\n   {\n       type    inletOutlet;\n       phi    phi8;\n       inletValue    uniform 0;\n       value    uniform 0;\n   }\n   sides\n   {\n       type    slip;\n   }\n}\n\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n'
  },
  'windDrivenRainFoam/0/alpha9': {
    index: 'windDrivenRainFoam/0/alpha9',
    data: 'alpha9',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  1.7.1                                 |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.com                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n   version     2.0;\n   format      ascii;\n   class       volScalarField;\n   object      alpha;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\ndimensions    [0 0 0 0 0 0 0];\n\ninternalField uniform 0;\n\nboundaryField\n{\n   inlet\n   {\n       type    fixedValue;\n       value   uniform 1.0;\n   }\n   top\n   {\n       type    fixedValue;\n       value   uniform 1.0;\n   }\n   outlet\n   {\n       type    inletOutlet;\n       phi    phi9;\n       inletValue    uniform 0;\n       value    uniform 0;\n   }\n   ground\n   {\n       type    inletOutlet;\n       phi    phi9;\n       inletValue    uniform 0;\n       value    uniform 0;\n   }\n   buildings\n   {\n       type    inletOutlet;\n       phi    phi9;\n       inletValue    uniform 0;\n       value    uniform 0;\n   }\n   sides\n   {\n       type    slip;\n   }\n}\n\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n'
  },
  'windDrivenRainFoam/system/changeDictionaryDict': {
    index: 'windDrivenRainFoam/system/changeDictionaryDict',
    data: 'changeDictionaryDict',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  2.2.2                                 |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.org                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n    version     2.0;\n    format      ascii;\n    class       dictionary;\n    object      changeDictionaryDict;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\nboundary\n{\n    inlet\n    {\n        type            mappedPatch;\n\t\tsampleMode      nearestCell;\n\t\tsampleRegion    region0;\n\t\tsamplePatch     none;\n\t\toffsetMode      uniform;\n\t\toffset          (1 0 0);\n    }\n    top\n    {\n        type            mappedPatch;\n\t\tsampleMode      nearestCell;\n\t\tsampleRegion    region0;\n\t\tsamplePatch     none;\n\t\toffsetMode      uniform;\n\t\toffset          (0 -1 0);\t\n    }\n}\n\n\nU\n{\n    boundaryField\n    {\n        ".*"\n        {\n            type            zeroGradient;\n        }\n    }\n}\nk\n{\n    boundaryField\n    {\n        ".*"\n        {\n            type            zeroGradient;\n        }\n    }\n}\nepsilon\n{\n    boundaryField\n    {\n        ".*"\n        {\n            type            zeroGradient;\n        }\n    }\n}\nnut\n{\n    boundaryField\n    {\n        ".*"\n        {\n            type            zeroGradient;\n        }\n    }\n}\n\n// ************************************************************************* //\n'
  },
  'windDrivenRainFoam/system/controlDict': {
    index: 'windDrivenRainFoam/system/controlDict',
    data: 'controlDict',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  2.0.0                                 |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.com                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n    version     2.0;\n    format      ascii;\n    class       dictionary;\n    location    "system";\n    object      controlDict;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\napplication     windDrivenRainFoam;\n\nstartFrom       latestTime;\n\nstartTime       0;\n\nstopAt          endTime;\n\nendTime         1000;\n\ndeltaT          1;\n\nwriteControl    timeStep;\n\nwriteInterval   100;\n\npurgeWrite      0;\n\nwriteFormat     ascii;\n\nwritePrecision  10;\n\nwriteCompression on;\n\ntimeFormat      general;\n\ntimePrecision   6;\n\nrunTimeModifiable true;\n\nlibs ("libatmosphericModels.so");\n\n// ************************************************************************* //\n'
  },
  'windDrivenRainFoam/system/decomposeParDict': {
    index: 'windDrivenRainFoam/system/decomposeParDict',
    data: 'decomposeParDict',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  2.0.0                                 |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.com                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n    version     2.0;\n    format      ascii;\n    class       dictionary;\n    object      decomposeParDict;\n}\n\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\nnumberOfSubdomains 8;\n\nmethod          simple;\n// method          ptscotch;\n\nsimpleCoeffs\n{\n    n               (4 1 2);\n    delta           0.001;\n}\n\nhierarchicalCoeffs\n{\n    n               (2 3 1);\n    delta           0.001;\n    order           xyz;\n}\n\nmanualCoeffs\n{\n    dataFile        "cellDecomposition";\n}\n\n\n// ************************************************************************* //\n'
  },
  'windDrivenRainFoam/system/fvSchemes': {
    index: 'windDrivenRainFoam/system/fvSchemes',
    data: 'fvSchemes',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  2.0.0                                 |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.com                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n    version     2.0;\n    format      ascii;\n    class       dictionary;\n    location    "system";\n    object      fvSchemes;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\nddtSchemes\n{\n    default         steadyState;\n}\n\ngradSchemes\n{\n    default         Gauss linear;\n}\n\ndivSchemes\n{\n    default         Gauss linear;\n    "div\\(phi.*,alpha.*\\)"    bounded Gauss upwind;          \n    "div\\(phi.*,U.*\\)"      bounded Gauss upwind;\n    "div\\(\\(-nutrain*T\\(grad\\(U.*\\)\\)\\)\\)" Gauss linear;\n}\n\nlaplacianSchemes\n{\n    default         none;\n    "laplacian\\(nutrain,U.*\\)" Gauss linear corrected;\n}\n\ninterpolationSchemes\n{\n    default         linear;\n}\n\nsnGradSchemes\n{\n    default         corrected;\n}\n\nfluxRequired\n{\n    default         no;\n}\n\n\n// ************************************************************************* //\n'
  },
  'windDrivenRainFoam/system/fvSolution': {
    index: 'windDrivenRainFoam/system/fvSolution',
    data: 'fvSolution',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  2.0.0                                 |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.com                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n    version     2.0;\n    format      ascii;\n    class       dictionary;\n    location    "system";\n    object      fvSolution;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\nsolvers\n{\n    "U.*"\n    {\n        solver          PBiCG;\n        preconditioner  DILU;\n        tolerance       1e-9;\n        relTol          0.1;\n    }\n    "alpha.*"\n    {\n        solver          PBiCG;\n        preconditioner  DILU;\n        tolerance       1e-9;\n        relTol          0.1;\n    }\n}\n\nSIMPLE\n{   \n    residualControl\n    {\n        "alpha.*"           1e-5;\n        "U.*"               1e-5;\n    }\n}\n\nrelaxationFactors\n{\n    "alpha.*"               0.7;\n    "U.*"               0.7;\n}\n\n// ************************************************************************* //\n'
  },
  'windDrivenRainFoam/constant/g': {
    index: 'windDrivenRainFoam/constant/g',
    data: 'g',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  2.0.0                                 |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.com                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n    version     2.0;\n    format      ascii;\n    class       uniformDimensionedVectorField;\n    location    "constant";\n    object      g;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\ndimensions      [0 1 -2 0 0 0 0];\nvalue           ( 0 -9.81 0 );\n\n\n// ************************************************************************* //\n'
  },
  'windDrivenRainFoam/constant/transportProperties': {
    index: 'windDrivenRainFoam/constant/transportProperties',
    data: 'transportProperties',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  1.7.1                                 |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.com                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n   version     2.0;\n   format      ascii;\n   class       dictionary;\n   location    "constant";\n   object      transportProperties;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\nsolveTD\t\tno;\n\nscalingFactor 0.5;\n\ntemp   temp [0 0 0 1 0 0 0] 285.85;\n\nRh // list of rainfall intensities [mm/h], for which gcr will be written\n(\n    0.1\n    1.0\n    2.5\n    5.0\n    10.0\n    30.0\n);\n\nphases // raindrop diameters [m]\n(\n    0.0003\n    0.0004\n    0.0005\n    0.0006\n    0.0007\n    0.0008\n    0.0009\n    0.001 \n    0.0012\n    0.0014\n    0.0016\n    0.0018\n    0.002 \n    0.003 \n    0.004 \n    0.005 \n    0.006 \n);\n\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n'
  },
  root: {
    index: 'root',
    data: 'Root item',
    hasChildren: true,
    children: ['simpleFoam', 'windDrivenRainFoam', 'Allclean', 'Allrun'],
    text: ''
  }
}

export default data
