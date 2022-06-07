import type { NextApiRequest, NextApiResponse } from 'next'
import { withSessionRoute } from 'lib/middlewares/withSession'
import { getDataStore } from 'lib/session/dataStore'
import { withLogger } from 'lib/middlewares/withLogger'

export default withSessionRoute(withLogger(handler))

async function handler(req: NextApiRequest, res: NextApiResponse) {
  //GET
  const session = getDataStore().getSession(req.session)
  if (!session.caseDir) {
    res.status(401)
    res.end()
    return
  }
  res.writeHead(200, {
    Connection: 'keep-alive',
    'Content-Type': 'text/event-stream',
    'Content-Encoding': 'none',
    'Cache-Control': 'no-cache',
    'Accept-Encoding': 'none'
    //'Access-Control-Allow-Origin': '*'
  })

  let intervalID = null

  session.runStatusListener.subscribe(session.id, res)
  session.postStatusListener.subscribe(session.id, res)
  const end = () => {
    if (intervalID) {
      clearTimeout(intervalID)
    }
    session.runStatusListener.unSubscribe(session.id)
    session.postStatusListener.unSubscribe(session.id)
  }
  req.on('aborted', end)
  req.on('close', end)

  const sendData = () => {
    session.runStatusListener.updateAll()
    session.postStatusListener.updateAll()
  }

  intervalID = setInterval(sendData, 1000)
}

export const config = {
  api: {
    bodyParser: false
  }
}
