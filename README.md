# OpenFOAM CBP APP
![docker version badge](https://img.shields.io/docker/v/jlaperle/openfoam_cbp_app?color=blue&sort=semver)

Web interface for the [OpenFOAM-CBP](https://gitlab.ethz.ch/openfoam-cbp) custom solvers

Supported browsers: [Chrome](https://www.google.com/chrome/), [Safari](https://www.apple.com/safari/)

## Requirements

This app is available as a docker image on docker hub [jlaperle/openfoam_cbp_app](https://hub.docker.com/repository/docker/jlaperle/openfoam_gui) or singularity .sif file available on [Github](https://github.com/laperlej/openfoam_cbp_app/releases)

It uses [OpenFOAM v6](https://openfoam.org/version/6/) to run the simulations.

## Run with Docker (recommended for local use)
[Install Docker](https://docs.docker.com/get-docker/)

Pull the image

```
sudo docker pull jlaperle/openfoam_cbp_app:latest
```

Run docker

```
sudo docker run -p 3000:3000 --rm --init jlaperle/openfoam_cbp_app:latest
```

## Run with Singularity (recommended for HPC use)
[Install Singularity](https://sylabs.io/guides/3.0/user-guide/installation.html)

Run singularrity on the .sif file

`singularity run openfoam_cbp_app.sif`

### Compute Canada
Compute Canada can run singularity containers

`module load singularity/3.8`

The following script will load the appropriate modules, start the server and setup a tunnel through a proxy accessible from Compute Canada compute nodes. Run it on a compute node.

Put this code in a .sh file

```
SIF_FILE=$1
. /cvmfs/soft.computecanada.ca/config/profile/bash.sh
module load singularity/3.8

ssh -fo ExitOnForwardFailure=yes -N -R /home/$USER/python3000.sock:localhost:3000 $ssh_opt -p 22004 proxy-east01.genap.ca
PID=$(pgrep -f 'python3000.sock:')
trap "kill $PID" EXIT
echo "OpenFOAM interface is now available at this URL"
echo "https://$USER-python3000.proxy-east01.genap.ca/"

singularity run $1
```

Then pass the .sif file as a parameter

`sh my_script.sh openfoam_cbp_app.sif`

If running remotely make sure to look at the output file once the job has started to find which URL to open in your browser. Or just go directly to

`https://$USER-python3000.proxy-east01.genap.ca/`

### Development

The development is done on a vagrant VM

Run `vagrant up` from the root folder

By running both dev.sh and start.sh available withing the home folder after `vagrant ssh` the app will be available at localhost:8080
