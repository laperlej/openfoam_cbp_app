class StatusListener {
  currentStatus: string
  subscribers: {}

  constructor(initialStatus) {
    this.currentStatus = initialStatus
    this.subscribers = {}
  }

  trigger() {
    for (const id in this.subscribers) {
      this.sendIfUpdate(id)
    }
  }

  updateAll() {
    for (const id in this.subscribers) {
      this.send(id)
    }
  }

  updateMessage() {
    return `event: status\ndata: ${this.currentStatus}\n\n`
  }

  send(id) {
    this.subscribers[id].lastKnown = this.currentStatus
    this.subscribers[id].res.write(this.updateMessage())
  }

  sendIfUpdate(id) {
    if (!(this.currentStatus === this.subscribers[id].lastKnown)) {
      this.subscribers[id].lastKnown = this.currentStatus
      this.subscribers[id].res.write(this.updateMessage())
    }
  }

  updateStatus(newStatus) {
    this.currentStatus = newStatus
    this.trigger()
  }

  subscribe(id, res) {
    this.subscribers[id] = { res: res, lastKnown: 'unknown' }
    this.sendIfUpdate(id)
  }

  unSubscribe(id) {
    if (id in this.subscribers) {
      try {
        this.subscribers[id].res.end()
        delete this.subscribers[id]
      } catch {
        // continue regardless of error
      }
    }
  }

  unSubscribeAll() {
    for (let id in this.subscribers) {
      this.unSubscribe(this.subscribers[id])
    }
  }
}

export class RunStatusListener extends StatusListener {
  constructor(initialStatus) {
    super(initialStatus)
  }
  updateMessage() {
    return `event: runStatus\ndata: ${this.currentStatus}\n\n`
  }
}

export class PostStatusListener extends StatusListener {
  constructor(initialStatus) {
    super(initialStatus)
  }
  updateMessage() {
    return `event: postStatus\ndata: ${this.currentStatus}\n\n`
  }
}
