import { spawn } from 'child_process'

export function spawnCaseRunner(caseDir) {
  const cmd =
    'source /opt/openfoam6/etc/bashrc >/dev/null 2>&1; chmod +x Allrun && ./Allrun'
  const child = spawn(cmd, [], {
    stdio: 'pipe',
    shell: '/bin/bash',
    cwd: caseDir,
    detached: true
  })
  return child
}
