import { RunStatusListener, PostStatusListener } from './statusListener'
import fs from 'fs'
import os from 'os'
import path from 'path'

function killChildProcess(childProcess) {
  try {
    process.kill(-childProcess.pid)
    childProcess.kill('SIGINT')
    childProcess.kill('SIGTERM')
  } catch {
    // continue regardless of error
  }
}

function deleteFile(path) {
  if (fs.existsSync(path)) {
    fs.rmSync(path)
  }
}

export class Session {
  id
  runStatusListener
  postStatusListener
  childProcesses
  caseDir
  solver
  objFile
  constructor(id) {
    this.id = id
    this.init()
  }

  newCase(solver, objFile) {
    this.terminateConnections()
    this.killJobs()
    this.init()
    this.solver = solver
    if (objFile) {
      this.setObjFile(objFile)
    }
    this._newCaseDir()
  }

  _newCaseDir() {
    this.caseDir = fs.mkdtempSync(path.join(os.tmpdir(), 'openfoam-'))
  }

  init() {
    this.runStatusListener = new RunStatusListener('not started')
    this.postStatusListener = new PostStatusListener('not started')
    this.childProcesses = { run: null, vtk: null }
    this.caseDir = null
    this.solver = null
    this.objFile = null
  }

  setObjFile(newObjFile) {
    let newPath = path.join(os.tmpdir(), newObjFile)
    if (newPath !== this.objFile) {
      this.deleteObj()
      if (fs.existsSync(newPath)) {
        this.objFile = newPath
        return
      }
      console.error(`File ${newPath} doesn't exist`)
    }
  }

  deleteObj() {
    deleteFile(this.objFile)
  }

  killVtk() {
    killChildProcess(this.childProcesses.vtk)
    this.postStatusListener.updateStatus('not started')
  }

  killRun() {
    killChildProcess(this.childProcesses.run)
    this.runStatusListener.updateStatus('not started')
  }

  killJobs() {
    this.killRun()
    this.killVtk()
  }

  terminateConnections() {
    this.runStatusListener.unSubscribeAll()
    this.postStatusListener.unSubscribeAll()
  }

  releaseHeldRessources() {
    this.terminateConnections()
    this.killJobs()
    this.deleteObj()
  }
}
