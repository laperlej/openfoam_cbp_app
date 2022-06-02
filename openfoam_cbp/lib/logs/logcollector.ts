import { spawnSync } from 'child_process'
import fs from 'fs'
import path from 'path'

const logs = {
  hamFoam: [
    'log.blockMesh',
    'log.setSet',
    'log.decomposePar',
    'log.hamFoam',
    'log.reconstructPar',
    'log.foamtovtk'
  ],
  urbanMicroclimateFoam: [
    'log.surfaceFeatureExtract',
    'log.blockMesh',
    'log.snappyHexMesh',
    'log.decomposePar',
    'log.urbanMicroclimateFoam',
    'log.reconstructPar',
    'log.foamtovtk'
  ],
  windDrivenRainFoam: [
    'simpleFoam/log.surfaceFeatureExtract',
    'simpleFoam/log.blockMesh',
    'simpleFoam/log.snappyHexMesh',
    'simpleFoam/log.decomposePar',
    'simpleFoam/log.simpleFoam',
    'simpleFoam/log.reconstructPar',
    'windDrivenRainFoam/log.changeDictionary',
    'windDrivenRainFoam/log.decomposePar',
    'windDrivenRainFoam/log.windDrivenRainFoam',
    'windDrivenRainFoam/log.reconstructPar',
    'windDrivenRainFoam/log.foamtovtk'
  ]
}

export function collectLogs(tmpFolder, project) {
  const logFiles = logs[project].map((file) => path.join(tmpFolder, file))
  let logString = ''
  for (let logFile of logFiles) {
    if (fs.existsSync(logFile)) {
      logString += spawnSync('tail', ['-n 1000'].concat(logFile)).stdout //await fs.promises.readFile(logFile, "utf8")
    }
  }
  return logString
}
