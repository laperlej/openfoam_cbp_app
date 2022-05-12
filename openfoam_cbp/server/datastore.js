var StatusListener = require('./statusListener.js').StatusListener

class DataStore {
    constructor () {
        this.dataStore = {};
    };

    init_session(id) {
        this.dataStore[id] = {
            runStatusListener: new StatusListener("not started"),
            postStatusListener: new StatusListener("not started"),
            childProcesses: {run: null, vtk: null},
            caseDir: null,
            caseName: null,
            obj: null
        };
        return this.dataStore[id]
    }

    getSession(id) {
        if (id in this.dataStore) {
            return this.dataStore[id]
        }
        return this.init_session(id)
    }
}

let dataStore = new DataStore()


module.exports = {
    dataStore: dataStore
};