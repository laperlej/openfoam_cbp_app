const data = {
  '0': {
    index: '0',
    data: '0',
    hasChildren: true,
    children: ['0/air'],
    text: ''
  },
  constant: {
    index: 'constant',
    data: 'constant',
    hasChildren: true,
    children: ['constant/air', 'constant/regionProperties'],
    text: ''
  },
  system: {
    index: 'system',
    data: 'system',
    hasChildren: true,
    children: ['system/air', 'system/controlDict', 'system/decomposeParDict'],
    text: ''
  },
  Allclean: {
    index: 'Allclean',
    data: 'Allclean',
    hasChildren: false,
    children: [],
    text: '#!/bin/sh\ncd ${0%/*} || exit 1    # run from this directory\n\n# Source tutorial clean functions\n. $WM_PROJECT_DIR/bin/tools/CleanFunctions\n\ncleanCase\n\nfoamCleanPolyMesh -region air\n\n# ----------------------------------------------------------------- end-of-file\n'
  },
  Allrun: {
    index: 'Allrun',
    data: 'Allrun',
    hasChildren: false,
    children: [],
    text: '#!/bin/sh\ncd ${0%/*} || exit 1    # run from this directory\n\n# Source tutorial run functions\n. $WM_PROJECT_DIR/bin/tools/RunFunctions\n\nrunApplication blockMesh -region air\nrunApplication createPatch -region air -overwrite\n\n#-- Run on single processor\nrunApplication `getApplication`\n\n## Run in parallel\n## Decompose\n#runApplication decomposePar\n#\n#runParallel `getApplication` 8\n#\n## Reconstruct\n#runApplication reconstructPar -latestTime\n\n# ----------------------------------------------------------------- end-of-file\n'
  },
  'UMCfoam.foam': {
    index: 'UMCfoam.foam',
    data: 'UMCfoam.foam',
    hasChildren: false,
    children: [],
    text: ''
  },
  reconstructScript: {
    index: 'reconstructScript',
    data: 'reconstructScript',
    hasChildren: false,
    children: [],
    text: '#!/bin/bash\n\nif [ "$OMPI_COMM_WORLD_RANK" == "0" ]; then #may change with batch system\n  echo "Running reconstruct script..."\n  qsub reconstructSubmit #may change with batch system\nfi\n'
  },
  '0/air': {
    index: '0/air',
    data: 'air',
    hasChildren: true,
    children: [
      '0/air/include',
      '0/air/T',
      '0/air/Tambient',
      '0/air/U',
      '0/air/alphat',
      '0/air/epsilon',
      '0/air/gcr',
      '0/air/k',
      '0/air/nut',
      '0/air/p',
      '0/air/p_rgh',
      '0/air/w',
      '0/air/wambient'
    ],
    text: ''
  },
  '0/air/include': {
    index: '0/air/include',
    data: 'include',
    hasChildren: true,
    children: ['0/air/include/ABLConditions'],
    text: ''
  },
  '0/air/T': {
    index: '0/air/T',
    data: 'T',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  2.4.0                                 |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.org                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n    version     2.0;\n    format      ascii;\n    class       volScalarField;\n    location    "0/air";\n    object      T;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\ndimensions      [0 0 0 1 0 0 0];\n\ninternalField   uniform 285.0; \n\nboundaryField\n{\n    inlet\n    {\n        type            uniformFixedValue;\n        uniformValue    tableFile;\n        uniformValueCoeffs\n        {\n            file        "$FOAM_CASE/0/air/Tambient";\n        }\n        value           uniform 285.0; \n    }\n    outlet\n    {\n        type            inletOutlet;\n        inletValue      uniform 285.0;\n        value           uniform 285.0; \n    }\n    top\n    {\n        type            slip;\n    }\n    ground\n    {\n        type            zeroGradient;\n    }\n    side1\n    {\n        type            slip;\n    }\n    side2\n    {\n        type            slip;\n    }\n    buildings\n    {\n        type            fixedValue;\n        value           uniform 300.0; \n    }\n}\n\n\n// ************************************************************************* //\n'
  },
  '0/air/Tambient': {
    index: '0/air/Tambient',
    data: 'Tambient',
    hasChildren: false,
    children: [],
    text: '(\n(\t0\t286.5572\t)\n(\t3600\t285.769035\t)\n(\t7200\t285.1564905\t)\n(\t10800\t284.7420286\t)\n(\t14400\t284.6171755\t)\n(\t18000\t284.730884\t)\n(\t21600\t285.1078768\t)\n(\t25200\t285.7077203\t)\n(\t28800\t286.5163272\t)\n(\t32400\t287.4314454\t)\n(\t36000\t288.4290347\t)\n(\t39600\t289.4457062\t)\n(\t43200\t290.3588625\t)\n(\t46800\t291.1801675\t)\n(\t50400\t291.8112707\t)\n(\t54000\t292.1874569\t)\n(\t57600\t292.3362322\t)\n(\t61200\t292.2228732\t)\n(\t64800\t291.8622437\t)\n(\t68400\t291.2418078\t)\n(\t72000\t290.4575216\t)\n(\t75600\t289.5137459\t)\n(\t79200\t288.510519\t)\n(\t82800\t287.4982296\t)\n(\t86400\t286.5572\t)\n(\t90000\t285.769035\t)\n(\t93600\t285.1564905\t)\n(\t97200\t284.7420286\t)\n(\t100800\t284.6171755\t)\n(\t104400\t284.730884\t)\n(\t108000\t285.1078768\t)\n(\t111600\t285.7077203\t)\n(\t115200\t286.5163272\t)\n(\t118800\t287.4314454\t)\n(\t122400\t288.4290347\t)\n(\t126000\t289.4457062\t)\n(\t129600\t290.3588625\t)\n(\t133200\t291.1801675\t)\n(\t136800\t291.8112707\t)\n(\t140400\t292.1874569\t)\n(\t144000\t292.3362322\t)\n(\t147600\t292.2228732\t)\n(\t151200\t291.8622437\t)\n(\t154800\t291.2418078\t)\n(\t158400\t290.4575216\t)\n(\t162000\t289.5137459\t)\n(\t165600\t288.510519\t)\n(\t169200\t287.4982296\t)\n(\t172800\t286.5572\t)\n(\t176400\t285.769035\t)\n(\t180000\t285.1564905\t)\n(\t183600\t284.7420286\t)\n(\t187200\t284.6171755\t)\n(\t190800\t284.730884\t)\n(\t194400\t285.1078768\t)\n(\t198000\t285.7077203\t)\n(\t201600\t286.5163272\t)\n(\t205200\t287.4314454\t)\n(\t208800\t288.4290347\t)\n(\t212400\t289.4457062\t)\n(\t216000\t290.3588625\t)\n(\t219600\t291.1801675\t)\n(\t223200\t291.8112707\t)\n(\t226800\t292.1874569\t)\n(\t230400\t292.3362322\t)\n(\t234000\t292.2228732\t)\n(\t237600\t291.8622437\t)\n(\t241200\t291.2418078\t)\n(\t244800\t290.4575216\t)\n(\t248400\t289.5137459\t)\n(\t252000\t288.510519\t)\n(\t255600\t287.4982296\t)\n(\t259200\t286.5572\t)\n(\t262800\t285.769035\t)\n(\t266400\t285.1564905\t)\n(\t270000\t284.7420286\t)\n(\t273600\t284.6171755\t)\n(\t277200\t284.730884\t)\n(\t280800\t285.1078768\t)\n(\t284400\t285.7077203\t)\n(\t288000\t286.5163272\t)\n(\t291600\t287.4314454\t)\n(\t295200\t288.4290347\t)\n(\t298800\t289.4457062\t)\n(\t302400\t290.3588625\t)\n(\t306000\t291.1801675\t)\n(\t309600\t291.8112707\t)\n(\t313200\t292.1874569\t)\n(\t316800\t292.3362322\t)\n(\t320400\t292.2228732\t)\n(\t324000\t291.8622437\t)\n(\t327600\t291.2418078\t)\n(\t331200\t290.4575216\t)\n(\t334800\t289.5137459\t)\n(\t338400\t288.510519\t)\n(\t342000\t287.4982296\t)\n(\t345600\t286.5572\t)\n(\t349200\t285.769035\t)\n(\t352800\t285.1564905\t)\n(\t356400\t284.7420286\t)\n(\t360000\t284.6171755\t)\n(\t363600\t284.730884\t)\n(\t367200\t285.1078768\t)\n(\t370800\t285.7077203\t)\n(\t374400\t286.5163272\t)\n(\t378000\t287.4314454\t)\n(\t381600\t288.4290347\t)\n(\t385200\t289.4457062\t)\n(\t388800\t290.3588625\t)\n(\t392400\t291.1801675\t)\n(\t396000\t291.8112707\t)\n(\t399600\t292.1874569\t)\n(\t403200\t292.3362322\t)\n(\t406800\t292.2228732\t)\n(\t410400\t291.8622437\t)\n(\t414000\t291.2418078\t)\n(\t417600\t290.4575216\t)\n(\t421200\t289.5137459\t)\n(\t424800\t288.510519\t)\n(\t428400\t287.4982296\t)\n(\t432000\t286.5572\t)\n(\t435600\t285.769035\t)\n(\t439200\t285.1564905\t)\n(\t442800\t284.7420286\t)\n(\t446400\t284.6171755\t)\n(\t450000\t284.730884\t)\n(\t453600\t285.1078768\t)\n(\t457200\t285.7077203\t)\n(\t460800\t286.5163272\t)\n(\t464400\t287.4314454\t)\n(\t468000\t288.4290347\t)\n(\t471600\t289.4457062\t)\n(\t475200\t290.3588625\t)\n(\t478800\t291.1801675\t)\n(\t482400\t291.8112707\t)\n(\t486000\t292.1874569\t)\n(\t489600\t292.3362322\t)\n(\t493200\t292.2228732\t)\n(\t496800\t291.8622437\t)\n(\t500400\t291.2418078\t)\n(\t504000\t290.4575216\t)\n(\t507600\t289.5137459\t)\n(\t511200\t288.510519\t)\n(\t514800\t287.4982296\t)\n(\t518400\t286.5572\t)\n(\t522000\t285.769035\t)\n(\t525600\t285.1564905\t)\n(\t529200\t284.7420286\t)\n(\t532800\t284.6171755\t)\n(\t536400\t284.730884\t)\n(\t540000\t285.1078768\t)\n(\t543600\t285.7077203\t)\n(\t547200\t286.5163272\t)\n(\t550800\t287.4314454\t)\n(\t554400\t288.4290347\t)\n(\t558000\t289.4457062\t)\n(\t561600\t290.3588625\t)\n(\t565200\t291.1801675\t)\n(\t568800\t291.8112707\t)\n(\t572400\t292.1874569\t)\n(\t576000\t292.3362322\t)\n(\t579600\t292.2228732\t)\n(\t583200\t291.8622437\t)\n(\t586800\t291.2418078\t)\n(\t590400\t290.4575216\t)\n(\t594000\t289.5137459\t)\n(\t597600\t288.510519\t)\n(\t601200\t287.4982296\t)\n(\t604800\t286.5572\t)\n(\t608400\t285.769035\t)\n(\t612000\t285.1564905\t)\n(\t615600\t284.7420286\t)\n(\t619200\t284.6171755\t)\n(\t622800\t284.730884\t)\n(\t626400\t285.1078768\t)\n(\t630000\t285.7077203\t)\n(\t633600\t286.5163272\t)\n(\t637200\t287.4314454\t)\n(\t640800\t288.4290347\t)\n(\t644400\t289.4457062\t)\n(\t648000\t290.3588625\t)\n(\t651600\t291.1801675\t)\n(\t655200\t291.8112707\t)\n(\t658800\t292.1874569\t)\n(\t662400\t292.3362322\t)\n(\t666000\t292.2228732\t)\n(\t669600\t291.8622437\t)\n(\t673200\t291.2418078\t)\n(\t676800\t290.4575216\t)\n(\t680400\t289.5137459\t)\n(\t684000\t288.510519\t)\n(\t687600\t287.4982296\t)\n(\t691200\t286.5572\t)\n(\t694800\t285.769035\t)\n(\t698400\t285.1564905\t)\n(\t702000\t284.7420286\t)\n(\t705600\t284.6171755\t)\n(\t709200\t284.730884\t)\n(\t712800\t285.1078768\t)\n(\t716400\t285.7077203\t)\n(\t720000\t286.5163272\t)\n(\t723600\t287.4314454\t)\n(\t727200\t288.4290347\t)\n(\t730800\t289.4457062\t)\n(\t734400\t290.3588625\t)\n(\t738000\t291.1801675\t)\n(\t741600\t291.8112707\t)\n(\t745200\t292.1874569\t)\n(\t748800\t292.3362322\t)\n(\t752400\t292.2228732\t)\n(\t756000\t291.8622437\t)\n(\t759600\t291.2418078\t)\n(\t763200\t290.4575216\t)\n(\t766800\t289.5137459\t)\n(\t770400\t288.510519\t)\n(\t774000\t287.4982296\t)\n(\t777600\t286.5572\t)\n); '
  },
  '0/air/U': {
    index: '0/air/U',
    data: 'U',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  2.4.0                                 |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.org                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n    version     2.0;\n    format      ascii;\n    class       volVectorField;\n    location    "0/air";\n    object      U;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\ndimensions      [0 1 -1 0 0 0 0];\n\ninternalField   uniform (5 0 0); \n\nboundaryField\n{\n    #include "include/ABLConditions"\n\n    inlet\n    {\n        type            atmBoundaryLayerInletVelocity;\n        #include        "include/ABLConditions"\n    }\n    outlet\n    {\n        type            inletOutlet;\n        inletValue      uniform (0 0 0);\n        value           uniform (5 0 0); \n    }\n    top\n    {\n        type            slip;\n    }\n    ground\n    {\n        type            fixedValue;\n        value           uniform (0 0 0);\n    }\n    side1\n    {\n        type            slip;\n    }\n    side2\n    {\n        type            slip;\n    }\n    buildings\n    {\n        type            fixedValue;\n        value           uniform (0 0 0);\n    }\n}\n\n\n// ************************************************************************* //\n'
  },
  '0/air/alphat': {
    index: '0/air/alphat',
    data: 'alphat',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  2.4.0                                 |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.org                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n    version     2.0;\n    format      ascii;\n    class       volScalarField;\n    location    "0/air";\n    object      alphat;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\ndimensions      [1 -1 -1 0 0 0 0];\n\ninternalField   uniform 0.1; \n\nboundaryField\n{\n    inlet\n    {\n        type            calculated;\n        value           uniform 0.1; \n    }\n    outlet\n    {\n        type            calculated;\n        value           uniform 0.1; \n    }\n    top\n    {\n        type            slip;\n    }\n    ground\n    {\n        type            compressible::alphatWallFunction;\n        Prt             0.85;\n        value           uniform 0.1; \n    }\n    side1\n    {\n        type            slip;\n    }\n    side2\n    {\n        type            slip;\n    }\n    buildings\n    {\n        type            compressible::alphatWallFunction;\n        Prt             0.85;\n        value           uniform 0.1; \n    }\n}\n\n\n// ************************************************************************* //\n'
  },
  '0/air/epsilon': {
    index: '0/air/epsilon',
    data: 'epsilon',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  2.4.0                                 |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.org                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n    version     2.0;\n    format      ascii;\n    class       volScalarField;\n    location    "0/air";\n    object      epsilon;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\ndimensions      [0 2 -3 0 0 0 0];\n\ninternalField   uniform 0.1; \n\nboundaryField\n{\n    #include "include/ABLConditions"\n\n    inlet\n    {\n        type            atmBoundaryLayerInletEpsilon;\n        #include        "include/ABLConditions"\n    }\n    outlet\n    {\n        type            zeroGradient;\n    }\n    top\n    {\n        type            slip;\n    }\n    ground\n    {\n        type            epsilonWallFunction;\n        Cmu             0.09;\n        kappa           0.41;\n        E               9.8;\n        value           uniform 0.1; \n    }\n    side1\n    {\n        type            slip;\n    }\n    side2\n    {\n        type            slip;\n    }\n    buildings\n    {\n        type            epsilonWallFunction;\n        Cmu             0.09;\n        kappa           0.41;\n        E               9.8;\n        value           uniform 0.1; \n    }\n}\n\n\n// ************************************************************************* //\n'
  },
  '0/air/gcr': {
    index: '0/air/gcr',
    data: 'gcr',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  2.4.0                                 |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.org                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n    version     2.0;\n    format      ascii;\n    class       volScalarField;\n    location    "0/air";\n    object      gcr;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\ndimensions      [0 0 0 0 0 0 0];\n\ninternalField   uniform 0;\n\nboundaryField\n{\n    inlet\n    {\n        type            fixedValue;\n        value           uniform 0;\n    }\n    outlet\n    {\n        type            fixedValue;\n        value           uniform 0;\n    }\n    top\n    {\n        type            slip;\n    }\n    ground\n    {\n        type            fixedValue;\n        value           uniform 0;\n    }\n    side1\n    {\n        type            slip;\n    }\n    side2\n    {\n        type            slip;\n    }\n    buildings\n    {\n        type            fixedValue;\n        value           uniform 0;\n    }\n}\n\n\n// ************************************************************************* //\n'
  },
  '0/air/k': {
    index: '0/air/k',
    data: 'k',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  2.4.0                                 |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.org                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n    version     2.0;\n    format      ascii;\n    class       volScalarField;\n    location    "0/air";\n    object      k;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\ndimensions      [0 2 -2 0 0 0 0];\n\ninternalField   uniform 0.1; \n\nboundaryField\n{\n    #include "include/ABLConditions"\n\n    inlet\n    {\n        type            atmBoundaryLayerInletK;\n        #include        "include/ABLConditions"\n    }\n    outlet\n    {\n        type            zeroGradient;\n    }\n    top\n    {\n        type            slip;\n    }\n    ground\n    {\n        type            kqRWallFunction;\n        value           uniform 0.1; \n    }\n    side1\n    {\n        type            slip;\n    }\n    side2\n    {\n        type            slip;\n    }\n    buildings\n    {\n        type            kqRWallFunction;\n        value           uniform 0.1; \n    }\n}\n\n\n// ************************************************************************* //\n'
  },
  '0/air/nut': {
    index: '0/air/nut',
    data: 'nut',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  2.4.0                                 |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.org                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n    version     2.0;\n    format      ascii;\n    class       volScalarField;\n    location    "0/air";\n    object      nut;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\ndimensions      [0 2 -1 0 0 0 0];\n\ninternalField   uniform 0.1; \n\nboundaryField\n{\n    #include "include/ABLConditions"\n\n    inlet\n    {\n        type            calculated;\n        value           uniform 0.1; \n    }\n    outlet\n    {\n        type            calculated;\n        value           uniform 0.1; \n    }\n    top\n    {\n        type            slip;\n    }\n    ground\n    {\n        type            nutkAtmRoughWallFunction;\n        z0              $z0;\n        value           uniform 0.0;\n    }\n    side1\n    {\n        type            slip;\n    }\n    side2\n    {\n        type            slip;\n    }\n    buildings\n    {\n        type            nutkWallFunction;\n        Cmu             0.09;\n        kappa           0.41;\n        E               9.8;\n        value           uniform 0.1; \n    }\n}\n\n\n// ************************************************************************* //\n'
  },
  '0/air/p': {
    index: '0/air/p',
    data: 'p',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  2.4.0                                 |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.org                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n    version     2.0;\n    format      ascii;\n    class       volScalarField;\n    location    "0/air";\n    object      p;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\ndimensions      [1 -1 -2 0 0 0 0];\n\ninternalField   uniform 1e5; \n\nboundaryField\n{\n    inlet\n    {\n        type            calculated;\n        value           uniform 1e5; \n    }\n    outlet\n    {\n        type            calculated;\n        value           uniform 1e5; \n    }\n    top\n    {\n        type            slip;\n    }\n    ground\n    {\n        type            calculated;\n        value           uniform 1e5; \n    }\n    side1\n    {\n        type            slip;\n    }\n    side2\n    {\n        type            slip;\n    }\n    buildings\n    {\n        type            calculated;\n        value           uniform 1e5; \n    }\n}\n\n\n// ************************************************************************* //\n'
  },
  '0/air/p_rgh': {
    index: '0/air/p_rgh',
    data: 'p_rgh',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  2.4.0                                 |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.org                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n    version     2.0;\n    format      ascii;\n    class       volScalarField;\n    location    "0/air";\n    object      p_rgh;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\ndimensions      [1 -1 -2 0 0 0 0];\n\ninternalField   uniform 1e5; \n\nboundaryField\n{\n    inlet\n    {\n        type            fixedFluxPressure;\n        gradient        uniform 0; \n        value           uniform 1e5; \n    }\n    outlet\n    {\n        type            fixedValue;\n        value           uniform 1e5;\n    }\n    top\n    {\n        type            slip;\n    }\n    ground\n    {\n        type            fixedFluxPressure;\n        gradient        uniform 0;\n        value           uniform 1e5; \n    }\n    side1\n    {\n        type            slip;\n    }\n    side2\n    {\n        type            slip;\n    }\n    buildings\n    {\n        type            fixedFluxPressure;\n        gradient        uniform 0; \n        value           uniform 1e5; \n    }\n}\n\n\n// ************************************************************************* //\n'
  },
  '0/air/w': {
    index: '0/air/w',
    data: 'w',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  2.4.0                                 |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.org                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n    version     2.0;\n    format      ascii;\n    class       volScalarField;\n    location    "0/air";\n    object      w;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\ndimensions      [0 0 0 0 0 0 0];\n\ninternalField   uniform 0.0075; \n\nboundaryField\n{\n    inlet\n    {\n        type            uniformFixedValue;\n        uniformValue    tableFile;\n        uniformValueCoeffs\n        {\n            file        "$FOAM_CASE/0/air/wambient";\n        }\n        value           uniform 0.0075; \n    }\n    outlet\n    {\n        type            inletOutlet;\n        inletValue      uniform 0.0075;\n        value           uniform 0.0075; \n    }\n    top\n    {\n        type            slip;\n    }\n    ground\n    {\n        type            zeroGradient;\n    }\n    side1\n    {\n        type            slip;\n    }\n    side2\n    {\n        type            slip;\n    }\n    buildings\n    {\n        type            fixedValue;\n        value           uniform 0.008; \n    }\n}\n\n\n// ************************************************************************* //\n'
  },
  '0/air/wambient': {
    index: '0/air/wambient',
    data: 'wambient',
    hasChildren: false,
    children: [],
    text: '(\t\t\t\n(\t0\t0.007612289\t)\n(\t3600\t0.00744764\t)\n(\t7200\t0.007317493\t)\n(\t10800\t0.007234193\t)\n(\t14400\t0.00720554\t)\n(\t18000\t0.007234193\t)\n(\t21600\t0.007317493\t)\n(\t25200\t0.00744764\t)\n(\t28800\t0.007612289\t)\n(\t32400\t0.007795764\t)\n(\t36000\t0.007980991\t)\n(\t39600\t0.008152011\t)\n(\t43200\t0.008296523\t)\n(\t46800\t0.008407589\t)\n(\t50400\t0.008483736\t)\n(\t54000\t0.008527242\t)\n(\t57600\t0.008541273\t)\n(\t61200\t0.008527242\t)\n(\t64800\t0.008483736\t)\n(\t68400\t0.008407589\t)\n(\t72000\t0.008296523\t)\n(\t75600\t0.008152011\t)\n(\t79200\t0.007980991\t)\n(\t82800\t0.007795764\t)\n(\t86400\t0.007612289\t)\n(\t90000\t0.00744764\t)\n(\t93600\t0.007317493\t)\n(\t97200\t0.007234193\t)\n(\t100800\t0.00720554\t)\n(\t104400\t0.007234193\t)\n(\t108000\t0.007317493\t)\n(\t111600\t0.00744764\t)\n(\t115200\t0.007612289\t)\n(\t118800\t0.007795764\t)\n(\t122400\t0.007980991\t)\n(\t126000\t0.008152011\t)\n(\t129600\t0.008296523\t)\n(\t133200\t0.008407589\t)\n(\t136800\t0.008483736\t)\n(\t140400\t0.008527242\t)\n(\t144000\t0.008541273\t)\n(\t147600\t0.008527242\t)\n(\t151200\t0.008483736\t)\n(\t154800\t0.008407589\t)\n(\t158400\t0.008296523\t)\n(\t162000\t0.008152011\t)\n(\t165600\t0.007980991\t)\n(\t169200\t0.007795764\t)\n(\t172800\t0.007612289\t)\n(\t176400\t0.00744764\t)\n(\t180000\t0.007317493\t)\n(\t183600\t0.007234193\t)\n(\t187200\t0.00720554\t)\n(\t190800\t0.007234193\t)\n(\t194400\t0.007317493\t)\n(\t198000\t0.00744764\t)\n(\t201600\t0.007612289\t)\n(\t205200\t0.007795764\t)\n(\t208800\t0.007980991\t)\n(\t212400\t0.008152011\t)\n(\t216000\t0.008296523\t)\n(\t219600\t0.008407589\t)\n(\t223200\t0.008483736\t)\n(\t226800\t0.008527242\t)\n(\t230400\t0.008541273\t)\n(\t234000\t0.008527242\t)\n(\t237600\t0.008483736\t)\n(\t241200\t0.008407589\t)\n(\t244800\t0.008296523\t)\n(\t248400\t0.008152011\t)\n(\t252000\t0.007980991\t)\n(\t255600\t0.007795764\t)\n(\t259200\t0.007612289\t)\n(\t262800\t0.00744764\t)\n(\t266400\t0.007317493\t)\n(\t270000\t0.007234193\t)\n(\t273600\t0.00720554\t)\n(\t277200\t0.007234193\t)\n(\t280800\t0.007317493\t)\n(\t284400\t0.00744764\t)\n(\t288000\t0.007612289\t)\n(\t291600\t0.007795764\t)\n(\t295200\t0.007980991\t)\n(\t298800\t0.008152011\t)\n(\t302400\t0.008296523\t)\n(\t306000\t0.008407589\t)\n(\t309600\t0.008483736\t)\n(\t313200\t0.008527242\t)\n(\t316800\t0.008541273\t)\n(\t320400\t0.008527242\t)\n(\t324000\t0.008483736\t)\n(\t327600\t0.008407589\t)\n(\t331200\t0.008296523\t)\n(\t334800\t0.008152011\t)\n(\t338400\t0.007980991\t)\n(\t342000\t0.007795764\t)\n(\t345600\t0.007612289\t)\n(\t349200\t0.00744764\t)\n(\t352800\t0.007317493\t)\n(\t356400\t0.007234193\t)\n(\t360000\t0.00720554\t)\n(\t363600\t0.007234193\t)\n(\t367200\t0.007317493\t)\n(\t370800\t0.00744764\t)\n(\t374400\t0.007612289\t)\n(\t378000\t0.007795764\t)\n(\t381600\t0.007980991\t)\n(\t385200\t0.008152011\t)\n(\t388800\t0.008296523\t)\n(\t392400\t0.008407589\t)\n(\t396000\t0.008483736\t)\n(\t399600\t0.008527242\t)\n(\t403200\t0.008541273\t)\n(\t406800\t0.008527242\t)\n(\t410400\t0.008483736\t)\n(\t414000\t0.008407589\t)\n(\t417600\t0.008296523\t)\n(\t421200\t0.008152011\t)\n(\t424800\t0.007980991\t)\n(\t428400\t0.007795764\t)\n(\t432000\t0.007612289\t)\n(\t435600\t0.00744764\t)\n(\t439200\t0.007317493\t)\n(\t442800\t0.007234193\t)\n(\t446400\t0.00720554\t)\n(\t450000\t0.007234193\t)\n(\t453600\t0.007317493\t)\n(\t457200\t0.00744764\t)\n(\t460800\t0.007612289\t)\n(\t464400\t0.007795764\t)\n(\t468000\t0.007980991\t)\n(\t471600\t0.008152011\t)\n(\t475200\t0.008296523\t)\n(\t478800\t0.008407589\t)\n(\t482400\t0.008483736\t)\n(\t486000\t0.008527242\t)\n(\t489600\t0.008541273\t)\n(\t493200\t0.008527242\t)\n(\t496800\t0.008483736\t)\n(\t500400\t0.008407589\t)\n(\t504000\t0.008296523\t)\n(\t507600\t0.008152011\t)\n(\t511200\t0.007980991\t)\n(\t514800\t0.007795764\t)\n(\t518400\t0.007612289\t)\n(\t522000\t0.00744764\t)\n(\t525600\t0.007317493\t)\n(\t529200\t0.007234193\t)\n(\t532800\t0.00720554\t)\n(\t536400\t0.007234193\t)\n(\t540000\t0.007317493\t)\n(\t543600\t0.00744764\t)\n(\t547200\t0.007612289\t)\n(\t550800\t0.007795764\t)\n(\t554400\t0.007980991\t)\n(\t558000\t0.008152011\t)\n(\t561600\t0.008296523\t)\n(\t565200\t0.008407589\t)\n(\t568800\t0.008483736\t)\n(\t572400\t0.008527242\t)\n(\t576000\t0.008541273\t)\n(\t579600\t0.008527242\t)\n(\t583200\t0.008483736\t)\n(\t586800\t0.008407589\t)\n(\t590400\t0.008296523\t)\n(\t594000\t0.008152011\t)\n(\t597600\t0.007980991\t)\n(\t601200\t0.007795764\t)\n(\t604800\t0.007612289\t)\n(\t608400\t0.00744764\t)\n(\t612000\t0.007317493\t)\n(\t615600\t0.007234193\t)\n(\t619200\t0.00720554\t)\n(\t622800\t0.007234193\t)\n(\t626400\t0.007317493\t)\n(\t630000\t0.00744764\t)\n(\t633600\t0.007612289\t)\n(\t637200\t0.007795764\t)\n(\t640800\t0.007980991\t)\n(\t644400\t0.008152011\t)\n(\t648000\t0.008296523\t)\n(\t651600\t0.008407589\t)\n(\t655200\t0.008483736\t)\n(\t658800\t0.008527242\t)\n(\t662400\t0.008541273\t)\n(\t666000\t0.008527242\t)\n(\t669600\t0.008483736\t)\n(\t673200\t0.008407589\t)\n(\t676800\t0.008296523\t)\n(\t680400\t0.008152011\t)\n(\t684000\t0.007980991\t)\n(\t687600\t0.007795764\t)\n(\t691200\t0.007612289\t)\n(\t694800\t0.00744764\t)\n(\t698400\t0.007317493\t)\n(\t702000\t0.007234193\t)\n(\t705600\t0.00720554\t)\n(\t709200\t0.007234193\t)\n(\t712800\t0.007317493\t)\n(\t716400\t0.00744764\t)\n(\t720000\t0.007612289\t)\n(\t723600\t0.007795764\t)\n(\t727200\t0.007980991\t)\n(\t730800\t0.008152011\t)\n(\t734400\t0.008296523\t)\n(\t738000\t0.008407589\t)\n(\t741600\t0.008483736\t)\n(\t745200\t0.008527242\t)\n(\t748800\t0.008541273\t)\n(\t752400\t0.008527242\t)\n(\t756000\t0.008483736\t)\n(\t759600\t0.008407589\t)\n(\t763200\t0.008296523\t)\n(\t766800\t0.008152011\t)\n(\t770400\t0.007980991\t)\n(\t774000\t0.007795764\t)\n(\t777600\t0.007612289\t)\n); \t\t\t'
  },
  '0/air/include/ABLConditions': {
    index: '0/air/include/ABLConditions',
    data: 'ABLConditions',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n  =========                 |\n  \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox\n   \\\\    /   O peration     | Website:  https://openfoam.org\n    \\\\  /    A nd           | Version:  6\n     \\\\/     M anipulation  |\n\\*---------------------------------------------------------------------------*/\n\nUref                 5.0;\nZref                 10.0;\nzDir                 (0 1 0);\nflowDir              (1 0 0);\nz0                   uniform 0.03;\nzGround              uniform 0.0;\nvalue                $internalField;\n\n// ************************************************************************* //\n'
  },
  'system/air': {
    index: 'system/air',
    data: 'air',
    hasChildren: true,
    children: [
      'system/air/createPatchDict',
      'system/air/decomposeParDict',
      'system/air/fvSchemes',
      'system/air/fvSolution'
    ],
    text: ''
  },
  'system/controlDict': {
    index: 'system/controlDict',
    data: 'controlDict',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  2.2.2                               |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.org                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n    version     2.0;\n    format      ascii;\n    class       dictionary;\n    location    "system";\n    object      controlDict;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\napplication     urbanMicroclimateFoam;\n\nstartFrom       latestTime;\n\nstartTime       0;\n\nstopAt          endTime;\n\nendTime         86400;\n\ndeltaT          3600;\n\nwriteControl    timeStep;\n\nwriteInterval   1;\n\npurgeWrite      0;\n\nwriteFormat     ascii;\n\nwritePrecision  6;\n\nwriteCompression on;\n\ntimeFormat      general;\n\ntimePrecision   12;\n\nrunTimeModifiable true;\n\nfunctions\n{\n    /*sysCall\n    {\t\n    \ttype systemCall;\n        functionObjectLibs ( "libutilityFunctionObjects.so" );\n\t    region street;\n        executeCalls 0();\n    \tendCalls 0();\n        writeCalls 1("./reconstructScript");\n        writeControl outputTime;\n\t    writeInterval 6;\n    }*/\n}\n\n//urbanMicroclimateFoam controls\n\ninitialSolidTimestepFactor\t0.001666667;\n\nminDeltaT       1E-6;\n\nmaxDeltaT       30;\n\nminFluidIteration\t0;\nmaxFluidIteration\t10000;\n\n// ************************************************************************* //\n'
  },
  'system/decomposeParDict': {
    index: 'system/decomposeParDict',
    data: 'decomposeParDict',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  2.2.2                                 |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.org                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n    version     2.0;\n    format      ascii;\n    class       dictionary;\n    location    "system";\n    object      decomposeParDict;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\nnumberOfSubdomains 2;\n\nmethod          scotch;\n\nsimpleCoeffs\n{\n    n               ( 2 2 1 );\n    delta           0.001;\n}\n\nhierarchicalCoeffs\n{\n    n               ( 1 1 1 );\n    delta           0.001;\n    order           xyz;\n}\n\nmanualCoeffs\n{\n    dataFile        "";\n}\n\ndistributed     no;\n\nroots           ( );\n\n\n// ************************************************************************* //\n'
  },
  'system/air/createPatchDict': {
    index: 'system/air/createPatchDict',
    data: 'createPatchDict',
    hasChildren: false,
    children: [],
    text: "/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  2.1.x                                 |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.org                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n    version     2.0;\n    format      ascii;\n    class       dictionary;\n    object      createPatchDict;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\n// This application/dictionary controls:\n// - optional: create new patches from boundary faces (either given as\n//   a set of patches or as a faceSet)\n// - always: order faces on coupled patches such that they are opposite. This\n//   is done for all coupled faces, not just for any patches created.\n// - optional: synchronise points on coupled patches.\n// - always: remove zero-sized (non-coupled) patches (that were not added)\n\n// 1. Create cyclic:\n// - specify where the faces should come from\n// - specify the type of cyclic. If a rotational specify the rotationAxis\n//   and centre to make matching easier\n// - always create both halves in one invocation with correct 'neighbourPatch'\n//   setting.\n// - optionally pointSync true to guarantee points to line up.\n\n// 2. Correct incorrect cyclic:\n// This will usually fail upon loading:\n//  \"face 0 area does not match neighbour 2 by 0.0100005%\"\n//  \" -- possible face ordering problem.\"\n// - in polyMesh/boundary file:\n//      - loosen matchTolerance of all cyclics to get case to load\n//      - or change patch type from 'cyclic' to 'patch'\n//        and regenerate cyclic as above\n\n// Do a synchronisation of coupled points after creation of any patches.\n// Note: this does not work with points that are on multiple coupled patches\n//       with transformations (i.e. cyclics).\npointSync false;\n\n// Patches to create.\npatches\n(\n    {\n        // Name of new patch\n        name buildings;\n\n        // Dictionary to construct new patch from\n        patchInfo\n        {\n            type wall;\n        }\n\n        // How to construct: either from 'patches' or 'set'\n        constructFrom patches;\n\n        // If constructFrom = patches : names of patches. Wildcards allowed.\n        patches (defaultFaces);\n\n        // If constructFrom = set : name of faceSet\n        set f0;\n    }\n);\n\n// ************************************************************************* //\n\n"
  },
  'system/air/decomposeParDict': {
    index: 'system/air/decomposeParDict',
    data: 'decomposeParDict',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  2.0.0                                 |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.com                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n    version     2.0;\n    format      ascii;\n    class       dictionary;\n    location    "system";\n    object      decomposeParDict;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\nnumberOfSubdomains 2;\n\nmethod          scotch;\n\nsimpleCoeffs\n{\n    n               ( 6 1 8 );\n    delta           0.001;\n}\n\nhierarchicalCoeffs\n{\n    n               ( 4 2 2 );\n    delta           0.001;\n    order           xyz;\n}\n\nmanualCoeffs\n{\n    dataFile        "";\n}\n\ndistributed     no;\n\nroots           ( );\n\n\n// ************************************************************************* //\n'
  },
  'system/air/fvSchemes': {
    index: 'system/air/fvSchemes',
    data: 'fvSchemes',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  2.2.2                                 |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.org                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n    version     2.0;\n    format      ascii;\n    class       dictionary;\n    location    "system";\n    object      fvSchemes;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\nddtSchemes\n{\n    default         steadyState;\n}\n\ngradSchemes\n{\n    default         Gauss linear;\n    grad(U)         cellLimited Gauss linear 0.5;\n}\n\ndivSchemes\n{\n    default         none;\n    div(phi,U)      bounded Gauss linearUpwind grad(U);\n    div(phi,h)      bounded Gauss limitedLinear 1;\n    div(phi,e)      bounded Gauss upwind;\n    div(phi,K)      bounded Gauss upwind;\n    div(phi,k)      bounded Gauss upwind;\n    div(phi,epsilon) bounded Gauss upwind;\n    div(phi,w)      bounded Gauss upwind;\n    div(((rho*nuEff)*dev2(T(grad(U))))) Gauss linear;\n}\n\nlaplacianSchemes\n{\n    default         Gauss linear limited 0.333;\n}\n\ninterpolationSchemes\n{\n    default         linear;\n}\n\nsnGradSchemes\n{\n    default         limited 0.333;\n}\n\nfluxRequired\n{\n    default         no;\n    p_rgh;\n}\n\n\n// ************************************************************************* //\n'
  },
  'system/air/fvSolution': {
    index: 'system/air/fvSolution',
    data: 'fvSolution',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  2.2.2                                 |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.org                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n    version     2.0;\n    format      ascii;\n    class       dictionary;\n    location    "system";\n    object      fvSolution;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\nsolvers\n{\n    p_rgh\n    {\n        solver           GAMG;\n        tolerance        1e-9;\n        relTol           0.01;\n\n        smoother         DICGaussSeidel;\n\n        cacheAgglomeration true;\n        nCellsInCoarsestLevel 10;\n        agglomerator     faceAreaPair;\n        mergeLevels      1;\n\n        maxIter          100;\n    }\n\n    "(U|k|epsilon|w)"\n    {\n        solver          PBiCGStab;\n        preconditioner  DILU;\n        tolerance       1e-12;\n        relTol          0.01;\n    }\n    "(h|e)"\n    {\n        solver          PBiCGStab;\n        preconditioner  DILU;\n        tolerance       1e-12;\n        relTol          0.01;\n        minIter         1;\n        maxIter         100;\n    }\n}\n\nSIMPLE\n{\n    nNonOrthogonalCorrectors 0;\n    rhoMax          rhoMax [ 1 -3 0 0 0 ] 1.5;\n    rhoMin          rhoMin [ 1 -3 0 0 0 ] 0.9;\n\t\n\tresidualControl\n    {\n        p_rgh           1e-3;\n        U               1e-4;\n        h               1e-4;\n\t\tw               1e-4;\n\n        // possibly check turbulence fields\n        "(k|epsilon|omega)" 1e-4;\n    }\n}\n\n\nrelaxationFactors\n{\n    fields\n    {\n        rho             1.0;\n        p_rgh           0.5;\n    }\n    equations\n    {\n        U               0.7;\n        "(h|e)"         0.8;\n        k               0.5;\n        epsilon         0.5;\n\t\tw\t\t\t\t0.9;\n    }\n}\n\n\n// ************************************************************************* //\n'
  },
  'constant/air': {
    index: 'constant/air',
    data: 'air',
    hasChildren: true,
    children: [
      'constant/air/polyMesh',
      'constant/air/g',
      'constant/air/thermophysicalProperties',
      'constant/air/turbulenceProperties'
    ],
    text: ''
  },
  'constant/regionProperties': {
    index: 'constant/regionProperties',
    data: 'regionProperties',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  2.2.2                                 |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.org                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n    version     2.0;\n    format      ascii;\n    class       dictionary;\n    location    "constant";\n    object      regionProperties;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\nregions\n(\n    fluid   (air)\n\tsolid   ()\n\tvegetation ()\n);\n\n// ************************************************************************* //\n'
  },
  'constant/air/polyMesh': {
    index: 'constant/air/polyMesh',
    data: 'polyMesh',
    hasChildren: true,
    children: ['constant/air/polyMesh/blockMeshDict'],
    text: ''
  },
  'constant/air/g': {
    index: 'constant/air/g',
    data: 'g',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  2.2.2                                 |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.org                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n    version     2.0;\n    format      ascii;\n    class       uniformDimensionedVectorField;\n    location    "constant";\n    object      g;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\ndimensions      [0 1 -2 0 0 0 0];\nvalue           ( 0 -9.81 0 );\n\n\n// ************************************************************************* //\n'
  },
  'constant/air/thermophysicalProperties': {
    index: 'constant/air/thermophysicalProperties',
    data: 'thermophysicalProperties',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  2.2.2                                 |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.org                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n    version     2.0;\n    format      ascii;\n    class       dictionary;\n    location    "constant";\n    object      thermophysicalProperties;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\nthermoType\n{\n    type            heRhoThermo;\n    mixture         pureMixture;\n    transport       const;\n    thermo          hConst;\n    equationOfState incompressiblePerfectGas;\n    specie          specie;\n    energy          sensibleEnthalpy;\n}\n\nmixture\n{\n    specie\n    {\n        nMoles          1;\n        molWeight       28.9;\n    }\n    thermodynamics\n    {\n        Cp              1000;\n        Hf              0;\n    }\n    transport\n    {\n        mu              1.8e-5;\n        Pr              0.7;\n    }\n\tequationOfState\n\t{\n\t\tpRef\t\t\t1e5;\n\t}\n}\n\n\n// ************************************************************************* //\n'
  },
  'constant/air/turbulenceProperties': {
    index: 'constant/air/turbulenceProperties',
    data: 'turbulenceProperties',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  5                                     |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.org                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n    version     2.0;\n    format      ascii;\n    class       dictionary;\n    object      RASProperties;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\nsimulationType RAS;\n\nRAS\n{\n    RASModel            kEpsilon;\n\n    turbulence          on;\n\n    printCoeffs         on;\n}\n\n\n// ************************************************************************* //\n'
  },
  'constant/air/polyMesh/blockMeshDict': {
    index: 'constant/air/polyMesh/blockMeshDict',
    data: 'blockMeshDict',
    hasChildren: false,
    children: [],
    text: '/*--------------------------------*- C++ -*----------------------------------*\\\n| =========                 |                                                 |\n| \\\\      /  F ield         | OpenFOAM: The Open Source CFD Toolbox           |\n|  \\\\    /   O peration     | Version:  1.7.1                                 |\n|   \\\\  /    A nd           | Web:      www.OpenFOAM.com                      |\n|    \\\\/     M anipulation  |                                                 |\n\\*---------------------------------------------------------------------------*/\nFoamFile\n{\n   version     2.0;\n   format      ascii;\n   class       dictionary;\n   object      blockMeshDict;\n}\n// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //\n\nconvertToMeters 1;\n\nvertices\n(\n  (0 0 0)\n  (50 0 0)\n  (60 0 0)\n  (70 0 0)\n  (80 0 0)\n  (230 0 0)\n  (0 10 0)\n  (50 10 0)\n  (60 10 0)\n  (70 10 0)\n  (80 10 0)\n  (230 10 0)\n  (0 60 0)\n  (50 60 0)\n  (60 60 0)\n  (70 60 0)\n  (80 60 0)\n  (230 60 0)\n  (0 0 100)\n  (50 0 100)\n  (60 0 100)\n  (70 0 100)\n  (80 0 100)\n  (230 0 100)\n  (0 10 100)\n  (50 10 100)\n  (60 10 100)\n  (70 10 100)\n  (80 10 100)\n  (230 10 100)\n  (0 60 100)\n  (50 60 100)\n  (60 60 100)\n  (70 60 100)\n  (80 60 100)\n  (230 60 100)\n  (0 0 150)\n  (50 0 150)\n  (60 0 150)\n  (70 0 150)\n  (80 0 150)\n  (230 0 150)\n  (0 10 150)\n  (50 10 150)\n  (60 10 150)\n  (70 10 150)\n  (80 10 150)\n  (230 10 150)\n  (0 60 150)\n  (50 60 150)\n  (60 60 150)\n  (70 60 150)\n  (80 60 150)\n  (230 60 150)\n  (0 0 250)\n  (50 0 250)\n  (60 0 250)\n  (70 0 250)\n  (80 0 250)\n  (230 0 250)\n  (0 10 250)\n  (50 10 250)\n  (60 10 250)\n  (70 10 250)\n  (80 10 250)\n  (230 10 250)\n  (0 60 250)\n  (50 60 250)\n  (60 60 250)\n  (70 60 250)\n  (80 60 250)\n  (230 60 250)\n);\n \nblocks\n(\n  hex (0 1 7 6 18 19 25 24) (30 34 37) simpleGrading (1.45500688749335E-02 ((0.5 0.5 6.34321679385097)(0.5 0.5 0.15764872)) 7.89135349905273E-03)\n  hex (1 2 8 7 19 20 26 25) (34 34 37) simpleGrading (((0.5 0.5 6.34321679385097)(0.5 0.5 0.15764872)) ((0.5 0.5 6.34321679385097)(0.5 0.5 0.15764872)) 7.89135349905273E-03)\n  hex (2 3 9 8 20 21 27 26) (34 34 37) simpleGrading (((0.5 0.5 6.34321679385097)(0.5 0.5 0.15764872)) ((0.5 0.5 6.34321679385097)(0.5 0.5 0.15764872)) 7.89135349905273E-03)\n  hex (3 4 10 9 21 22 28 27) (34 34 37) simpleGrading (((0.5 0.5 6.34321679385097)(0.5 0.5 0.15764872)) ((0.5 0.5 6.34321679385097)(0.5 0.5 0.15764872)) 7.89135349905273E-03)\n  hex (4 5 11 10 22 23 29 28) (29 34 37) simpleGrading (273.164007479249 ((0.5 0.5 6.34321679385097)(0.5 0.5 0.15764872)) 7.89135349905273E-03)\n  hex (6 7 13 12 24 25 31 30) (30 30 37) simpleGrading (1.45500688749335E-02 68.7281970039126 7.89135349905273E-03)\n  hex (7 8 14 13 25 26 32 31) (34 30 37) simpleGrading (((0.5 0.5 6.34321679385097)(0.5 0.5 0.15764872)) 68.7281970039126 7.89135349905273E-03)\n  hex (8 9 15 14 26 27 33 32) (34 30 37) simpleGrading (((0.5 0.5 6.34321679385097)(0.5 0.5 0.15764872)) 68.7281970039126 7.89135349905273E-03)\n  hex (9 10 16 15 27 28 34 33) (34 30 37) simpleGrading (((0.5 0.5 6.34321679385097)(0.5 0.5 0.15764872)) 68.7281970039126 7.89135349905273E-03)\n  hex (10 11 17 16 28 29 35 34) (29 30 37) simpleGrading (273.164007479249 68.7281970039126 7.89135349905273E-03)\n  hex (18 19 25 24 36 37 43 42) (30 34 52) simpleGrading (1.45500688749335E-02 ((0.5 0.5 6.34321679385097)(0.5 0.5 0.15764872)) ((0.5 0.5 33.6747785419985)(0.5 0.5 0.029695815)))\n  hex (20 21 27 26 38 39 45 44) (34 34 52) simpleGrading (((0.5 0.5 6.34321679385097)(0.5 0.5 0.15764872)) ((0.5 0.5 6.34321679385097)(0.5 0.5 0.15764872)) ((0.5 0.5 33.6747785419985)(0.5 0.5 0.029695815)))\n  hex (22 23 29 28 40 41 47 46) (29 34 52) simpleGrading (273.164007479249 ((0.5 0.5 6.34321679385097)(0.5 0.5 0.15764872)) ((0.5 0.5 33.6747785419985)(0.5 0.5 0.029695815)))\n  hex (24 25 31 30 42 43 49 48) (30 30 52) simpleGrading (1.45500688749335E-02 68.7281970039126 ((0.5 0.5 33.6747785419985)(0.5 0.5 0.029695815)))\n  hex (25 26 32 31 43 44 50 49) (34 30 52) simpleGrading (((0.5 0.5 6.34321679385097)(0.5 0.5 0.15764872)) 68.7281970039126 ((0.5 0.5 33.6747785419985)(0.5 0.5 0.029695815)))\n  hex (26 27 33 32 44 45 51 50) (34 30 52) simpleGrading (((0.5 0.5 6.34321679385097)(0.5 0.5 0.15764872)) 68.7281970039126 ((0.5 0.5 33.6747785419985)(0.5 0.5 0.029695815)))\n  hex (27 28 34 33 45 46 52 51) (34 30 52) simpleGrading (((0.5 0.5 6.34321679385097)(0.5 0.5 0.15764872)) 68.7281970039126 ((0.5 0.5 33.6747785419985)(0.5 0.5 0.029695815)))\n  hex (28 29 35 34 46 47 53 52) (29 30 52) simpleGrading (273.164007479249 68.7281970039126 ((0.5 0.5 33.6747785419985)(0.5 0.5 0.029695815)))\n  hex (36 37 43 42 54 55 61 60) (30 34 37) simpleGrading (1.45500688749335E-02 ((0.5 0.5 6.34321679385097)(0.5 0.5 0.15764872)) 126.72097375862)\n  hex (37 38 44 43 55 56 62 61) (34 34 37) simpleGrading (((0.5 0.5 6.34321679385097)(0.5 0.5 0.15764872)) ((0.5 0.5 6.34321679385097)(0.5 0.5 0.15764872)) 126.72097375862)\n  hex (38 39 45 44 56 57 63 62) (34 34 37) simpleGrading (((0.5 0.5 6.34321679385097)(0.5 0.5 0.15764872)) ((0.5 0.5 6.34321679385097)(0.5 0.5 0.15764872)) 126.72097375862)\n  hex (39 40 46 45 57 58 64 63) (34 34 37) simpleGrading (((0.5 0.5 6.34321679385097)(0.5 0.5 0.15764872)) ((0.5 0.5 6.34321679385097)(0.5 0.5 0.15764872)) 126.72097375862)\n  hex (40 41 47 46 58 59 65 64) (29 34 37) simpleGrading (273.164007479249 ((0.5 0.5 6.34321679385097)(0.5 0.5 0.15764872)) 126.72097375862)\n  hex (42 43 49 48 60 61 67 66) (30 30 37) simpleGrading (1.45500688749335E-02 68.7281970039126 126.72097375862)\n  hex (43 44 50 49 61 62 68 67) (34 30 37) simpleGrading (((0.5 0.5 6.34321679385097)(0.5 0.5 0.15764872)) 68.7281970039126 126.72097375862)\n  hex (44 45 51 50 62 63 69 68) (34 30 37) simpleGrading (((0.5 0.5 6.34321679385097)(0.5 0.5 0.15764872)) 68.7281970039126 126.72097375862)\n  hex (45 46 52 51 63 64 70 69) (34 30 37) simpleGrading (((0.5 0.5 6.34321679385097)(0.5 0.5 0.15764872)) 68.7281970039126 126.72097375862)\n  hex (46 47 53 52 64 65 71 70) (29 30 37) simpleGrading (273.164007479249 68.7281970039126 126.72097375862)\n);\n \nedges\n(\n);\n \npatches\n(\n  patch inlet\n  (\n      (0 18 24 6)\n      (6 24 30 12)\n      (18 36 42 24)\n      (24 42 48 30)\n      (36 54 60 42)\n      (42 60 66 48)\n  )\n  patch outlet\n  (\n      (5 23 29 11)\n      (11 29 35 17)\n      (23 41 47 29)\n      (29 47 53 35)\n      (41 59 65 47)\n      (47 65 71 53)\n  )\n  slip top\n  (\n      (12 13 31 30)\n      (13 14 32 31)\n      (14 15 33 32)\n      (15 16 34 33)\n      (16 17 35 34)\n      (30 31 49 48)\n      (31 32 50 49)\n      (32 33 51 50)\n      (33 34 52 51)\n      (34 35 53 52)\n      (48 49 67 66)\n      (49 50 68 67)\n      (50 51 69 68)\n      (51 52 70 69)\n      (52 53 71 70)\n  )\n  wall ground\n  (\n      (0 1 19 18)\n      (1 2 20 19)\n      (2 3 21 20)\n      (3 4 22 21)\n      (4 5 23 22)\n      (18 19 37 36)\n      (22 23 41 40)\n      (36 37 55 54)\n      (37 38 56 55)\n      (38 39 57 56)\n      (39 40 58 57)\n      (40 41 59 58)\n  )\n  slip side1\n  (\n      (0 1 7 6)\n      (1 2 8 7)\n      (2 3 9 8)\n      (3 4 10 9)\n      (4 5 11 10)\n      (6 7 13 12)\n      (7 8 14 13)\n      (8 9 15 14)\n      (9 10 16 15)\n      (10 11 17 16)\n  )  \n  slip side2\n  (\t\n      (54 55 61 60)\n      (55 56 62 61)\n      (56 57 63 62)\n      (57 58 64 63)\n      (58 59 65 64)\n      (60 61 67 66)\n      (61 62 68 67)\n      (62 63 69 68)\n      (63 64 70 69)\n      (64 65 71 70)\n  )\n);\n \nmergePatchPairs\n(\n);\n\n// ************************************************************************* //\n'
  },
  root: {
    index: 'root',
    data: 'Root item',
    hasChildren: true,
    children: [
      '0',
      'constant',
      'system',
      'Allclean',
      'Allrun',
      'UMCfoam.foam',
      'reconstructScript'
    ],
    text: ''
  }
}

export default data
