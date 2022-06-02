import { getAllRun } from './allrun'
import fs from 'fs'
import path from 'path'

function prepAllrun(files, caseName, multiProcessing, latestTime, objFile) {
  for (const index in files) {
    let f = files[index]
    if (f['data'] == 'Allrun') {
      f['text'] = getAllRun(caseName, f['index'], multiProcessing, objFile)
      if (latestTime) {
        f['text'] = f['text'].replace(
          'reconstructPar',
          'reconstructPar -latestTime'
        )
      }
    }
  }
}

export function writeCase(session, caseFiles, multiProcessing, latestTime) {
  prepAllrun(
    caseFiles,
    session.solver,
    multiProcessing,
    latestTime,
    session.objFile
  )
  let toDo = ['root']
  while (toDo.length) {
    const dir = caseFiles[toDo.pop()]
    for (const child of dir['children']) {
      if (caseFiles[child]['hasChildren']) {
        const dirPath = path.join(session.caseDir, child)
        if (!fs.existsSync(dirPath)) {
          fs.mkdirSync(dirPath)
        }
        toDo.push(child)
      } else {
        if (session.objFile && caseFiles[child]['data'] === 'buildings.obj') {
          fs.copyFileSync(
            path.join(session.objFile),
            path.join(session.caseDir, child)
          )
        } else {
          fs.writeFileSync(
            path.join(session.caseDir, child),
            caseFiles[child]['text']
          )
        }
        if (
          ['Allrun', 'Allclean', 'Allprepare'].includes(
            caseFiles[child]['data']
          )
        ) {
          fs.chmodSync(path.join(session.caseDir, child), 0o775)
        }
      }
    }
  }
  return
}
