const express = require("express")
const path = require('path');
const fs = require('fs');
const os = require('os');
const busboy = require('connect-busboy');

var session = require('express-session')
var openFoam = require('./openfoam.js')
var dataStore = require('./datastore.js').dataStore

const app = express();
const port = process.env.PORT || 3000;
const hostname = '0.0.0.0'
const localhost = 'localhost'
const DIST_DIR = path.join(__dirname, '../dist');
const HTML_FILE = path.join(__dirname, '../dist/index.html');
app.use(express.static(DIST_DIR));
app.use(express.urlencoded({extended: true}));
app.use(express.json({ limit: '50mb' }));
app.use(session({
  secret: require('crypto').randomBytes(48).toString('hex'),
  resave: false,
  saveUninitialized: true
}))
app.use(busboy({
  highWaterMark: 2 * 1024 * 1024, // Set 2MiB buffer
}));


app.post("/api/sendcase", (req, res) => {
  //caseFiles, caseName, multiProcessing
  const session = dataStore.getSession(req.session.id)

  openFoam.kill_all(session)
  const caseDir = openFoam.writeCase(req.body.caseFiles, req.body.caseName, req.body.multiProcessing, req.body.latestTime, session.objFile);
  openFoam.runCase(caseDir, session.runStatusListener).then((child) => session.childProcesses.run = child);

  session.caseName = req.body.caseName;
  caseDir.then((caseDir)=>{session.caseDir = caseDir; res.send.bind(res)});
})

app.get("/api/fetchlogs", (req, res) => {
  //
  const session = dataStore.getSession(req.session.id)
  if (session.caseDir && session.caseName) {
    const logs = openFoam.fetchLogs(session.caseDir, session.caseName);
    logs.then(res.send.bind(res));
  } else {
    res.send("");
  }
})

app.post("/api/postprocess", (req, res) => {
  //fields, region, times, allPatches
  const session = dataStore.getSession(req.session.id)
  if (session.caseDir) {
    openFoam.kill_spawn(session.childProcesses.vtk, session.postStatusListener);
    openFoam.runVTK(session, req.body.fields, req.body.region, req.body.times, req.body.allPatches).then((child) => {session.childProcesses.vtk = child});
    res.send("success")
  } else {
    res.send("A problem occured");
  }
})

app.get("/api/download", (req, res) => {
  //
  const session = dataStore.getSession(req.session.id)
  if (session.caseDir) {
    const basename = path.basename(session.caseDir);
    res.download(path.join(session.caseDir, `${basename}.tar.gz`));
  } else {
    res.send("error")
  }
})

var nextId = 0

app.get("/api/runstatus", (req, res) => {
  //lastStatus
  const session = dataStore.getSession(req.session.id)
  if (session.caseDir) {
    const thisId = nextId++;
    session.runStatusListener.subscribe(thisId, res, req.query.lastStatus);
    setTimeout(() =>  {session.runStatusListener.unSubscribe(thisId)} ,20000);
  } else {
    res.send({"status": 'not started'})
  }
})

app.get("/api/poststatus", (req, res) => {
  //lastStatus
  const session = dataStore.getSession(req.session.id)
  if (session.caseDir) {
    const thisId = nextId++;
    session.postStatusListener.subscribe(thisId, res, req.query.lastStatus);
    setTimeout(() =>  {session.postStatusListener.unSubscribe(thisId)} ,20000);
  } else {
    res.send({"status": 'not started'})
  }
})

app.get("/api/cpucount", (req, res) => {
  res.send(os.cpus().length.toString());
})

app.get("/api/newcase", (req, res) => {
  //
  const session = dataStore.getSession(req.session.id)
  session.caseDir = null
  session.caseName = null
  if (req.query.objFile) {
    session.objFile=req.query.objFile
  } else {
    session.objFile=null
  }
  res.send(openFoam.kill_all(session));
})

app.post("/api/uploadobj", (req, res) => {
  //
  //session.objFile = null
  try{
    req.pipe(req.busboy); // Pipe it trough busboy
    req.busboy.on('file', (fieldname, file, filename) => {
        console.log(`Upload of '${filename.filename}' started`);

        // Create a write stream of the new file
        const fstream = fs.createWriteStream(path.join("/tmp/", filename.filename));
        // Pipe it trough
        file.pipe(fstream);

        // On finish of the upload
        fstream.on('close', () => {
            console.log(`Upload of '${filename.filename}' finished`);
            res.send(filename.filename)
        });
    });
  } catch (error) {
    console.error(error);
  }
})

app.get("/*", (req, res) => {
  res.sendFile(HTML_FILE);
})

app.listen(port, hostname, console.log(`Server start at http://localhost:3000`))