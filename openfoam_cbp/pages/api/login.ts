import type { NextApiRequest, NextApiResponse } from 'next'
import { withSessionRoute } from 'lib/middlewares/withSession'
import { getDataStore } from 'lib/session/dataStore'
import { withLogger } from 'lib/middlewares/withLogger'

export default withSessionRoute(withLogger(handler))

async function handler(req: NextApiRequest, res: NextApiResponse) {
  //POST
  if (req.method != 'POST') {
    res.status(405)
    res.end()
    return
  }

  getDataStore().getSession(req.session)

  await req.session.save()
  res.status(204)
  res.end()
  return
}
