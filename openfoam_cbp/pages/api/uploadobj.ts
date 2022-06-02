import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
import fs from 'fs'
import os from 'os'
import { withLogger } from '../../lib/middlewares/withLogger'
import busboy from 'busboy'
import { getDataStore } from '../../lib/session/dataStore'
import { withSessionRoute } from '../../lib/middlewares/withSession'

export default withSessionRoute(withLogger(handler))

function handler(req: NextApiRequest, res: NextApiResponse) {
  //POST
  return new Promise<void>((resolve) => {
    const session = getDataStore().getSession(req.session)
    const bb = busboy({
      headers: req.headers,
      highWaterMark: 2 * 1024 * 1024
    })
    bb.on('file', (_name, file, info) => {
      const fstream = fs.createWriteStream(
        path.join(os.tmpdir(), info.filename)
      )
      file.pipe(fstream)
      fstream.on('close', () => {
        session.setObjFile(info.filename)

        req.session.save().then(() => {
          res.status(200).send({ filename: info.filename })
          res.end()
          resolve()
        })
      })
    })
    req.pipe(bb)
  })
}

export const config = {
  api: {
    bodyParser: false
  }
}
