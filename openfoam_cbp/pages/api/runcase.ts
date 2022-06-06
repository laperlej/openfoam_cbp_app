import type { NextApiRequest, NextApiResponse } from 'next'
import { withSessionRoute } from 'lib/middlewares/withSession'
import { getDataStore } from 'lib/session/dataStore'
import { withLogger } from 'lib/middlewares/withLogger'
import { spawnCaseRunner } from 'lib/case/caseRunner'
import { writeCase } from 'lib/case/caseWriter'

export default withSessionRoute(withLogger(handler))

function runCase(session) {
  session.runStatusListener.updateStatus('running')
  const child = spawnCaseRunner(session.caseDir)
  child.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`)
  })
  child.on('close', (code) => {
    session.runStatusListener.updateStatus(`${code}`)
  })
  session.childProcesses.run = child
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  //POST
  const session = getDataStore().getSession(req.session)
  if (!req.body.caseFiles || !session.caseDir || !session.solver) {
    res.status(401)
    res.end()
    return
  }
  const caseFiles: {} = req.body.caseFiles
  const multiProcessing: boolean = Boolean(req.body.multiProcessing)
  const latestTime: boolean = Boolean(req.body.latestTime)

  session.killJobs()
  writeCase(session, caseFiles, multiProcessing, latestTime)
  runCase(session)

  await req.session.save()
  res.status(204)
  res.end()
  return
}
