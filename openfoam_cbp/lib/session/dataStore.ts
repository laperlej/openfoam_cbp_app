import { Session } from './session'
import { randomUUID } from 'crypto'

class DataStore {
  //singleton section
  private static _instance: DataStore
  static getInstance() {
    if (!this._instance) {
      this._instance = new DataStore()
    }
    return this._instance
  }
  private constructor() {
    this.dataStore = {}
  }

  //DataStore section
  dataStore: {}

  init_session(id) {
    this.dataStore[id] = new Session(id)
    return this.dataStore[id]
  }

  getSession(sessionToken) {
    if (!sessionToken?.id) {
      const id = randomUUID()
      sessionToken.id = id
    }
    if (!(sessionToken?.id in this.dataStore)) {
      this.init_session(sessionToken.id)
    }
    return this.dataStore[sessionToken.id]
  }

  deleteSession(id) {
    this.dataStore[id].releaseHeldRessources(id)
    delete this.dataStore[id]
  }

  deleteAllSessions() {
    for (let sessionId in this.dataStore) {
      this.deleteSession(sessionId)
    }
  }
}

export function getDataStore() {
  return DataStore.getInstance()
}

process.on('uncaughtException', (err) => {
  console.log(err)
  getDataStore().deleteAllSessions()
  process.exit()
})
process.on('SIGINT', () => {
  getDataStore().deleteAllSessions()
  process.exit()
})
process.on('SIGTERM', () => {
  getDataStore().deleteAllSessions()
  process.exit()
})
