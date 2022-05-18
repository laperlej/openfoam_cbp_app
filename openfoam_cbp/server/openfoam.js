const fs = require('fs');
const path = require('path')
const os = require('os');
const { env } = require('process');
var spawn = require('child_process').spawn;
var spawnSync = require('child_process').spawnSync;

var makeRunScript = require('./runScripts.js').makeRunScript

const cpus = os.cpus().length.toString()

const logs = {"hamFoam":["log.blockMesh", "log.setSet", "log.decomposePar", "log.hamFoam", "log.reconstructPar", "log.foamtovtk"],
              "urbanMicroclimateFoam":["log.surfaceFeatureExtract", "log.blockMesh", "log.snappyHexMesh", "log.decomposePar", "log.urbanMicroclimateFoam", "log.reconstructPar", "log.foamtovtk"],
              "windDrivenRainFoam":["simpleFoam/log.surfaceFeatureExtract", "simpleFoam/log.blockMesh", "simpleFoam/log.snappyHexMesh", "simpleFoam/log.decomposePar", "simpleFoam/log.simpleFoam", "simpleFoam/log.reconstructPar", "windDrivenRainFoam/log.changeDictionary", "windDrivenRainFoam/log.decomposePar", "windDrivenRainFoam/log.windDrivenRainFoam", "windDrivenRainFoam/log.reconstructPar", "windDrivenRainFoam/log.foamtovtk"]}

function kill_spawn(childProcess, statusListener) {
  if (childProcess) {
    process.kill(-childProcess.pid)
    childProcess.kill('SIGINT');
    childProcess.kill('SIGTERM');
    childProcess = null;
    statusListener.updateStatus("not started")
  }
}

function kill_all (session) {
  kill_spawn(session.childProcesses["run"], session.runStatusListener);
  kill_spawn(session.childProcesses["vtk"], session.postStatusListener);
};

function prepAllrun(files, caseName, multiProcessing, latestTime, objFile) {
  for (const index in files) {
    let f = files[index]
    if (f["data"] == "Allrun") {
      f["text"] = makeRunScript(caseName,f["index"],multiProcessing, objFile)
      if (latestTime) {
        f["text"] = f["text"].replace("reconstructPar", "reconstructPar -latestTime")
      }
    }
  };
}

async function generateCaseDir() {
  return fs.promises.mkdtemp(path.join(os.tmpdir(), 'openfoam-'));
}

async function writeCase (caseFiles, caseName, multiProcessing, latestTime, objFile) {
  const caseDir = await generateCaseDir()
  prepAllrun(caseFiles, caseName, multiProcessing, latestTime, objFile)
  let toDo = ["root"];
  while (toDo.length) {
      const dir = caseFiles[toDo.pop()]
      for (child of dir["children"]) {
          if (caseFiles[child]["hasChildren"]) {
              await fs.promises.mkdir(path.join(caseDir, child));
              toDo.push(child)
          } else {
              if (objFile && caseFiles[child]["data"]==="buildings.obj") {
                await fs.promises.rename(path.join("/tmp/", objFile), path.join(caseDir, child)).catch((err)=>(console.error(err)))
              } else {
                await fs.promises.writeFile(path.join(caseDir, child), caseFiles[child]["text"])
              }
              if (["Allrun", "Allclean", "Allprepare"].includes(caseFiles[child]["data"])) {
                fs.chmodSync(path.join(caseDir, child), 0o775);
              }
          }
      }
  }
  return await caseDir;
}

async function runCase (tmpFolder, runStatusListener) {
  runStatusListener.updateStatus("running");
  const cmd = "source /opt/openfoam6/etc/bashrc >/dev/null 2>&1; chmod +x Allrun && ./Allrun";
  const args=[];
  const child = spawn(cmd, args, {
    stdio: 'pipe',
    encoding: 'utf-8',
    shell: '/bin/bash',
    cwd: await tmpFolder,
    detached: true
  })
  child.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });
  child.on('close', (code) => {
    runStatusListener.updateStatus(`${code}`)
  });
  return child
}

async function fetchLogs(tmpFolder, project) {
  const logFiles = logs[project].map(file => path.join(tmpFolder, file));
  logString = "";
  for (logFile of logFiles) {
    if (fs.existsSync(logFile)) {
      logString += spawnSync("tail",["-n 1000"].concat(logFile)).stdout//await fs.promises.readFile(logFile, "utf8")
    }
  }
  return (logString);
}

async function runVTK(session, fields, region, times, allPatches) {
  session.postStatusListener.updateStatus("running");
  let cmd = "source /opt/openfoam6/etc/bashrc >/dev/null 2>&1; foamToVTK ";
  let workdir = await session.caseDir;
  if (session.caseName == "windDrivenRainFoam") {
    workdir = path.join(workdir, "windDrivenRainFoam")
  };
  if (fields.length>0) {cmd += `-fields '(${fields.join(" ")})' `}
  if (region) {cmd += `-region ${region} `}
  if (times && /^[0-9:,]*$/.test(times)) {cmd += `-time '${times}' `}
  if (allPatches) {cmd += "-allPatches "}
  const basename = path.basename(await session.caseDir)
  cmd += ">>log.foamtovtk 2>&1 && tar -czvf "
  cmd += (session.caseName == "windDrivenRainFoam")?path.join("..", basename):basename
  cmd += ".tar.gz VTK >>log.tar 2>&1";
  const args=[];
  const child = spawn(cmd, args, {
    stdio: 'pipe',
    encoding: 'utf-8',
    shell: '/bin/bash',
    cwd: workdir,
    detached: true
  })
  child.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });
  child.on('close', (code) => {
    session.postStatusListener.updateStatus(`${code}`)
  });
  return child
}

module.exports = {
  writeCase: writeCase,
  kill_spawn: kill_spawn,
  kill_all: kill_all,
  runCase: runCase,
  runVTK: runVTK,
  fetchLogs: fetchLogs
};