function getVertices(nX, nY, nZ, vertexCoordinates){
    let vertices = []
    for (let z=0; z < nZ; z++) {
        for (let y=0; y < nY; y++) {
            for (let x=0; x < nX; x++) {
                vertices.push([vertexCoordinates.x[x], vertexCoordinates.y[y], vertexCoordinates.z[z]])
            }
        }
    }
    return vertices
}

function getBlocks(nX, nY, nZ, nbCells, ratios){
    let blocks = []
    let n = 0;
    for (let z=0; z < nZ-1; z++) {
        for (let y=0; y < nY-1; y++) {
            for (let x=0; x < nX-1; x++) {
                blocks.push({
                    vertices: [
                                      n    ,
                                      n + 1,
                                 nX + n + 1,
                                 nX + n    ,
                         nY    * nX + n    ,
                         nY    * nX + n + 1,
                        (nY+1) * nX + n + 1,
                        (nY+1) * nX + n
                    ],
                    nbCells: [nbCells.x[x], nbCells.y[y], nbCells.z[z]],
                    ratios:  [ ratios.x[x],  ratios.y[y],  ratios.z[z]]
                })
                n+=1
            }
            n+=1
        }
        n+=nX
    }
    return blocks
}

function getPatches(nX, nY, nZ){
    return {
        inlet: getPatchesInlet(nX, nY, nZ),
        outlet: getPatchesOutlet(nX, nY, nZ),
        top: getPatchesTop(nX, nY, nZ),
        ground: getPatchesGround(nX, nY, nZ),
        sides: getPatchesSides(nX, nY, nZ),
    }
}

function getPatchesInlet(nX, nY, nZ){
    let patches = [];
    let n=0;
    for (let z=0; z < nZ-1; z++) {
        for (let y=0; y < nY-1; y++) {
            patches.push([
                              n,
                 nY    * nX + n,
                (nY+1) * nX + n,
                         nX + n
            ])
            n+=nX;
        }
        n+=nX;
    }
    return patches;
}

function getPatchesOutlet(nX, nY, nZ){
    let patches = [];
    let n=nX-1;
    for (let z=0; z < nZ-1; z++) {
        for (let y=0; y < nY-1; y++) {
            patches.push([
                              n,
                 nY    * nX + n,
                (nY+1) * nX + n,
                         nX + n
            ])
            n+=nX;
        }
        n+=nX;
    }
    return patches;
}

function getPatchesTop(nX, nY, nZ){
    let patches = [];
    let n=nX*(nY-1);
    for (let z=0; z < nZ-1; z++) {
        for (let x=0; x < nX-1; x++) {
            patches.push([
                          n    ,
                          n + 1,
                nY * nX + n + 1,
                nY * nX + n
            ])
            n+=1;
        }
        n+=1+nX*(nY-1);
    }
    return patches;
}

function getPatchesGround(nX, nY, nZ){
    let patches = [];
    let n=0;
    for (let z=0; z < nZ-1; z++) {
        for (let x=0; x < nX-1; x++) {
            patches.push([
                          n    ,
                          n + 1,
                nY * nX + n + 1,
                nY * nX + n
            ])
            n+=1;
        }
        n+=1+nX*(nY-1);
    }
    return patches;
}

function getPatchesSides(nX, nY, nZ){
    let patches = [];
    let n=0;
    for (let z=0; z < 2; z++) {
        for (let y=0; y < nY-1; y++) {
            for (let x=0; x < nX-1; x++) {
                patches.push([
                         n    ,
                         n + 1,
                    nX + n + 1,
                    nX + n
                ])
                n+=1;
            }
            n+=1;
        }
        n=(nX*nY)*(nZ-1);
    }
    return patches;
}

function arrayToFoam(xs){
    return `(${xs.map((x)=>String(x)).join(" ")})`
}
function lineToFoam(xs){
    return `${xs.map((x)=>String(x)).join(" ")}`
}
function patchToString(xs){
    return `(\n        ${xs.map((xs)=>arrayToFoam(xs)).join("\n        ")}\n    )`
}
function verticesToString(vertices) {
    return `(\n    ${vertices.map((vertice)=>arrayToFoam(vertice)).join("\n    ")}\n)`
}
function blocksToString(blocks){
    const blockArrays = blocks.map((block)=>["hex", arrayToFoam(block.vertices), arrayToFoam(block.nbCells),"simpleGrading" ,arrayToFoam(block.ratios)])
    return `(\n    ${blockArrays.map((blockArray)=>lineToFoam(blockArray)).join("\n    ")}\n)`
}
function patchesToString1D(patches){
    return {
        inside: patchToString(patches.outlet),
        outside: patchToString(patches.inlet),
        sides: patchToString([...patches.top,...patches.ground,...patches.sides])
    }
}

function calculateSegmentCoordinates(segmentLens) {
    const precisions = segmentLens.map((segmentLen)=>segmentLen.split(".")?.[1]?.length || 0)
    const maxPrecision = Math.max(...precisions)
    let tmp = segmentLens.map(parseFloat)
    tmp = tmp.reduce((prev, cur)=>{prev.push(prev[prev.length-1]+cur);return prev}, [0])//cummulative, [1,2,3] => [0,1,3,6]
    tmp = tmp.map((x)=>x.toFixed(maxPrecision))
    return tmp
}

export function generateMesh(segmentLens, segmentCells, segmentRatios) {
    const segmentXCoordinates = calculateSegmentCoordinates(segmentLens)
    const vertexCoordinates = {x: segmentXCoordinates, y: [0, 0.01], z: [0, 0.01]}
    const nbCells = {x: segmentCells, y: [1], z: [1]}
    const ratios = {x: segmentRatios, y: ["1"], z: ["1"]}
    const meshData = {
        segmentXCoordinates: segmentXCoordinates,
        vertices: verticesToString(getVertices(segmentLens.length+1, 2, 2, vertexCoordinates)),
        blocks: blocksToString(getBlocks(segmentLens.length+1, 2, 2, nbCells, ratios)),
        patches: patchesToString1D(getPatches(segmentLens.length+1, 2, 2))
    }
    return meshData;
}