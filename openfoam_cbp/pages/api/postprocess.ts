import type { NextApiRequest, NextApiResponse } from 'next'
import { withSessionRoute } from 'lib/middlewares/withSession'
import { getDataStore } from 'lib/session/dataStore'
import { withLogger } from 'lib/middlewares/withLogger'
import { buildCmd, spawnVtkRunner } from 'lib/postprocess/vtkrunner'

export default withSessionRoute(withLogger(handler))

function runVtk(cmd, session) {
  session.postStatusListener.updateStatus('running')
  const child = spawnVtkRunner(cmd, session.solver, session.caseDir)
  child.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`)
  })
  child.on('close', (code) => {
    session.postStatusListener.updateStatus(`${code}`)
  })
  session.childProcesses.run = child
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  //POST
  //fields, region, times, allPatches
  const session = getDataStore().getSession(req.session)
  if (!session.caseDir || !session.solver) {
    res.status(401)
    res.end()
    return
  }
  const fields: string[] = req.body.fields
  const region: string = req.body.region
  const times: string = req.body.times
  const allPatches: boolean = Boolean(req.body.allPatches)

  session.killVtk()
  const cmd = buildCmd(
    session.solver,
    session.caseDir,
    fields,
    region,
    times,
    allPatches
  )
  runVtk(cmd, session)

  await req.session.save()
  res.status(204)
  res.end()
  return
}
