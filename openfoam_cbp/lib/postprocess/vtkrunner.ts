import path from 'path'
import { spawn } from 'child_process'

export function buildCmd(solver, caseDir, fields, region, times, allPatches) {
  let cmd = 'source /opt/openfoam6/etc/bashrc >/dev/null 2>&1; foamToVTK '
  if (fields.length > 0) {
    cmd += `-fields '(${fields.join(' ')})' `
  }
  if (region) {
    cmd += `-region ${region} `
  }
  if (times && /^[0-9:,]*$/.test(times)) {
    cmd += `-time '${times}' `
  }
  if (allPatches) {
    cmd += '-allPatches '
  }
  const basename = path.basename(caseDir)
  cmd += '>>log.foamtovtk 2>&1 && tar -czvf '
  cmd += solver == 'windDrivenRainFoam' ? path.join('..', basename) : basename
  cmd += '.tar.gz VTK >>log.tar 2>&1'
  return cmd
}

export function spawnVtkRunner(cmd, solver, caseDir) {
  let workdir = caseDir
  if (solver == 'windDrivenRainFoam') {
    workdir = path.join(workdir, 'windDrivenRainFoam')
  }
  const child = spawn(cmd, [], {
    stdio: 'pipe',
    shell: '/bin/bash',
    cwd: workdir,
    detached: true
  })
  return child
}
