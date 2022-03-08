function makeRunScript(caseName, fileIndex, isMulti, objFile) {
    script = ["#!/bin/sh", "cd \${0%/*} || exit 1"]
    
    if (caseName === "windDrivenRainFoam" && fileIndex === "Allrun") {
        script.push("simpleFoam/Allrun")
        script.push("windDrivenRainFoam/Allrun")
        return script.join("\n")
    }

    script.push(". $WM_PROJECT_DIR/bin/tools/RunFunctions")
    
    if (caseName === "urbanMicroclimateFoam" && objFile) {
        script.push("ln -s air/polyMesh constant/polyMesh")
        script.push("ln -s air/fvSchemes system/fvSchemes")
        script.push("ln -s air/fvSolution system/fvSolution")
    }

    if (objFile && ((caseName === "windDrivenRainFoam" && fileIndex === "simpleFoam/Allrun") || caseName === "urbanMicroclimateFoam")) {
        script.push("runApplication surfaceFeatures")
    }

    if (caseName === "windDrivenRainFoam" && fileIndex === "windDrivenRainFoam/Allrun") {
        script.push("cp -r ../simpleFoam/constant/polyMesh/ constant/")
        script.push("for time in $(foamListTimes -case ../simpleFoam)")
        script.push("do")
        script.push('[ "$time" = "0" -o "$time" = constant ] || {')
        script.push("    timeDir=$time")
        script.push('    echo "Copying files U, k, epsilon, nut from directory $timeDir"')
        script.push("    cp -r ../simpleFoam/\${timeDir}/U.gz 0/U.gz")
        script.push("    cp -r ../simpleFoam/\${timeDir}/k.gz 0/k.gz")
        script.push("    cp -r ../simpleFoam/\${timeDir}/epsilon.gz 0/epsilon.gz")
        script.push("    cp -r ../simpleFoam/\${timeDir}/nut.gz 0/nut.gz")
        script.push("}")
        script.push("done")
        script.push('echo "Running changeDictionary app..."')
        script.push("changeDictionary > log.changeDictionary")
    } 

    if (caseName === "urbanMicroclimateFoam") {
        script.push("runApplication blockMesh -region air")
        script.push("runApplication createPatch -region air -overwrite")
    } else if (caseName === "hamFoam") {
        script.push("runApplication blockMesh")
        script.push("runApplication setSet -batch system/setset.batch")
    } else if (caseName === "windDrivenRainFoam" && fileIndex === "simpleFoam/Allrun") {
        script.push("runApplication blockMesh")
    }

    if (objFile && ((caseName === "windDrivenRainFoam" && fileIndex === "simpleFoam/Allrun") || caseName === "urbanMicroclimateFoam")) {
        script.push("runApplication snappyHexMesh -overwrite")
    }

    if (isMulti) {
        script.push("runApplication decomposePar")
        script.push("runParallel \`getApplication\`")
        script.push("runApplication reconstructPar")
    } else {
        script.push("runApplication \`getApplication\`")
    }
    return script.join("\n")
}



const runScripts = {
"hamFoam": {"Allrun": {
    "single":

`#!/bin/sh
cd \${0%/*} || exit 1    # run from this directory
. $WM_PROJECT_DIR/bin/tools/RunFunctions
runApplication blockMesh
runApplication setSet -batch system/setset.batch
runApplication \`getApplication\``,

    "multi":

`#!/bin/sh
cd \${0%/*} || exit 1    # run from this directory
. $WM_PROJECT_DIR/bin/tools/RunFunctions
runApplication blockMesh
runApplication setSet -batch system/setset.batch
runApplication decomposePar
runParallel \`getApplication\`
runApplication reconstructPar`

}},
"urbanMicroclimateFoam": {"Allrun": {
    "single":

`#!/bin/sh
cd \${0%/*} || exit 1    # run from this directory
. $WM_PROJECT_DIR/bin/tools/RunFunctions
runApplication blockMesh -region air
runApplication createPatch -region air -overwrite
runApplication \`getApplication\``,

    "multi":

`#!/bin/sh
cd \${0%/*} || exit 1    # run from this directory
. $WM_PROJECT_DIR/bin/tools/RunFunctions
runApplication blockMesh -region air
runApplication createPatch -region air -overwrite
runApplication decomposePar
runParallel \`getApplication\`
runApplication reconstructPar`

}},
"windDrivenRainFoam": {
    "Allrun": {
    "single":

`#!/bin/sh
cd \${0%/*} || exit 1    # run from this directory
simpleFoam/Allrun
windDrivenRainFoam/Allrun`,

    "multi":

`#!/bin/sh
cd \${0%/*} || exit 1    # run from this directory
simpleFoam/Allrun
windDrivenRainFoam/Allrun`

    },
    "simpleFoam/Allrun": {
    "single":

`#!/bin/sh
cd \${0%/*} || exit 1    # run from this directory
. $WM_PROJECT_DIR/bin/tools/RunFunctions
runApplication blockMesh
runApplication \`getApplication\``,

    "multi":

`#!/bin/sh
cd \${0%/*} || exit 1    # run from this directory
. $WM_PROJECT_DIR/bin/tools/RunFunctions
runApplication blockMesh
runApplication decomposePar
runParallel \`getApplication\`
runApplication reconstructPar`

    },
    "windDrivenRainFoam/Allrun": {
    "single":

`#!/bin/sh
cd \${0%/*} || exit 1    # run from this directory
. $WM_PROJECT_DIR/bin/tools/RunFunctions
cp -r ../simpleFoam/constant/polyMesh/ constant/
for time in $(foamListTimes -case ../simpleFoam)
do
[ "$time" = "0" -o "$time" = constant ] || {
    timeDir=$time
    echo "Copying files U, k, epsilon, nut from directory $timeDir"
    cp -r ../simpleFoam/\${timeDir}/U.gz 0/U.gz
    cp -r ../simpleFoam/\${timeDir}/k.gz 0/k.gz
    cp -r ../simpleFoam/\${timeDir}/epsilon.gz 0/epsilon.gz
    cp -r ../simpleFoam/\${timeDir}/nut.gz 0/nut.gz
}
done
echo "Running changeDictionary app..."
changeDictionary > log.changeDictionary
runApplication \`getApplication\``,

    "multi":

`#!/bin/sh
cd \${0%/*} || exit 1    # run from this directory
. $WM_PROJECT_DIR/bin/tools/RunFunctions
cp -r ../simpleFoam/constant/polyMesh/ constant/
for time in $(foamListTimes -case ../simpleFoam)
do
[ "$time" = "0" -o "$time" = constant ] || {
    timeDir=$time
    echo "Copying files U, k, epsilon, nut from directory $timeDir"
    cp -r ../simpleFoam/\${timeDir}/U.gz 0/U.gz
    cp -r ../simpleFoam/\${timeDir}/k.gz 0/k.gz
    cp -r ../simpleFoam/\${timeDir}/epsilon.gz 0/epsilon.gz
    cp -r ../simpleFoam/\${timeDir}/nut.gz 0/nut.gz
}
done
echo "Running changeDictionary app..."
changeDictionary > log.changeDictionary
runApplication decomposePar
runParallel \`getApplication\`
runApplication reconstructPar`

    }
}}

module.exports = {
    makeRunScript: makeRunScript
}