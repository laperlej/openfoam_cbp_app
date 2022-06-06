import type { NextApiRequest, NextApiResponse } from 'next'
import { withSessionRoute } from 'lib/middlewares/withSession'
import { getDataStore } from 'lib/session/dataStore'
import { withLogger } from 'lib/middlewares/withLogger'
import path from 'path'
import fs from 'fs'

export default withSessionRoute(withLogger(handler))

async function handler(req: NextApiRequest, res: NextApiResponse) {
  //GET
  const session = getDataStore().getSession(req.session)
  if (!session.caseDir) {
    res.status(401)
    res.end()
    return
  }

  const basename = path.basename(session.caseDir)
  const fullpath = path.join(session.caseDir, `${basename}.tar.gz`)
  const stat = fs.statSync(fullpath)

  res.writeHead(200, {
    'Content-Type': 'application/x-compressed',
    'Content-Disposition': `attachment; filename="${basename}.tar.gz"`,
    'Content-Length': stat.size
  })

  let readStream = fs.createReadStream(fullpath)
  await new Promise(function (resolve) {
    readStream.pipe(res)
    readStream.on('end', resolve)
  })
}
