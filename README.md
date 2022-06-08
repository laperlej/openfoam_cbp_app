# OpenFOAM CBP APP
![docker version badge](https://img.shields.io/docker/v/jlaperle/openfoam_cbp_app?color=blue&sort=semver&dummy=unused)
![github workflow badge](https://img.shields.io/github/workflow/status/laperlej/openfoam_cbp_app/CI/main?dummy=unused)

Web interface for the [OpenFOAM-CBP](https://gitlab.ethz.ch/openfoam-cbp) custom solvers

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
Compute Canada HPC servers can run singularity containers

First load the singularity module

`module load singularity/3.8`

Start the job, <sif> is the path to the .sif file, adjust the values for cpu, memory and time based on your needs

`sbatch --time='10:00:00' --mem 8192 -c 8 --wrap 'singularity run <sif>'`

Your job should be assigned a node, displayed under NODELIST

`squeue -u $USER`

In your local terminal, run the following command where <node> is the name of the compute node

`ssh -N -L 3000:<node>:3000 <user>@<server>`

In your browser, navigate to `http://localhost:3000`

### Development

The development is done on a vagrant VM

Run `vagrant up` from the root folder

By running both dev.sh and start.sh available withing the home folder after `vagrant ssh` the app will be available at localhost:8080

### Troubleshooting

In the event that the server crashes due to 

`WebAssembly.instantiate(): Out of memory: wasm memory` 

It is usually caused by limits to virtual memory on the host system. 

Use `ulimit -v unlimited`