class StatusListener {
    constructor (initialStatus) {
        this.currentStatus = initialStatus;
        this.subscribers = {};
    };

    trigger () {
        for (id in this.subscibers) {
            this.sendIfUpdate(id)
        };
    }

    sendIfUpdate (id) {
        if (!(this.currentStatus === this.subscribers[id]["lastKnown"])) {
            this.unSubscribe(id)
        }
    }

    updateStatus (newStatus) {
        this.currentStatus = newStatus;
        this.trigger();
    };

    subscribe(id, res, lastKnownStatus) {
        this.subscribers[id] = {"res": res, "lastKnown": lastKnownStatus}
        this.sendIfUpdate(id)
    };

    unSubscribe(id) {
        if (id in this.subscribers) {
            this.subscribers[id]["res"].send({"status": this.currentStatus})
            delete this.subscribers[id];
        }
    };
}


module.exports = {
    StatusListener: StatusListener
};