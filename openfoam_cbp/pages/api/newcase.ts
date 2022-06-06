import type { NextApiRequest, NextApiResponse } from 'next'
import { withSessionRoute } from 'lib/middlewares/withSession'
import { getDataStore } from 'lib/session/dataStore'
import { withLogger } from 'lib/middlewares/withLogger'
import { getCaseFiles } from 'lib/case/caseFiles'

export default withSessionRoute(withLogger(handler))

async function handler(req: NextApiRequest, res: NextApiResponse) {
  //GET
  if (req.method != 'GET') {
    res.status(405)
    res.end()
    return
  }
  if (!req.query.solver) {
    res.status(401)
    res.end()
    return
  }

  const session = getDataStore().getSession(req.session)
  const solver = req.query.solver
  const objFile = req.query.objFile
  session.newCase(solver, objFile)
  const caseFiles = getCaseFiles(solver, Boolean(objFile))

  await req.session.save()
  res.status(200).send(caseFiles)
  res.end()
  return
}
