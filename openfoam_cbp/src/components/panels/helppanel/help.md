#Help

#### Table of Contents  
[Solver](#solver)
[Edit](#edit) 
[Run](#run)  
[Log](#log)  
[Postprocess](#postprocess)  

##Solver

This section is used to select which solver to use. Refer to each solver's section for more information. Both urbanMicroclimateFoam and windDrivenFoam can use a custom .obj file, if none is provided the default tutorial mesh will be used.

###hamFoam
https://gitlab.ethz.ch/openfoam-cbp/solvers/hamfoam

###urbanMicroclimateFoam
https://gitlab.ethz.ch/openfoam-cbp/solvers/urbanmicroclimatefoam

###windDrivenFoam
https://gitlab.ethz.ch/openfoam-cbp/solvers/winddrivenrainfoam

##Edit
This section allows the user to modify the case files before running the solver. The starting point is based on the tutorials available at https://gitlab.ethz.ch/openfoam-cbp/tutorials.

###Sections
In this section you are presented with 3 panels.
* The panel on the left allows you to see and select the case files and folders for editing.
* The panel in the middle offers an easy to use user interface to modify the most important settings of the case
* The panel on the right is a free form text editor for users who want to further customize the case settings.

###controlDict
Used to control settings related to start/end time and the size of each step aswell as how often the solver should write down the results.

###blockMeshDict
Used to control the mesh, hamFoam provides a 1d mesh generator where the thickness of each layer is defined. The other solvers will provide a 3d mesh generator for the background. Make sure the mesh is large enough to encompass all of the coordiantes found in the .obj file.

####This list is not exaustive, more to come...

##Run

Choose whether you wish to run the solver in parallel mode. The number of processes is determined by the decomposeParDict file(s) in the case. You can modify them in the edit section. Be sure to not use more processes than your hardware can handle.

##Log

This shows the last 1000 lines of every log file, updated every second, the logs of the most recent task is at the bottom.

##Postprocess

This is the final step before the VTK files can be recovered. 

###Time options
The time selection is based on foamToVTK's format
Examples:
From time 5 to time 10: `5:10`
From the beginning to time 10: `:10`
From time 10 to the end: `10:`
Time 5 and time 6: `5,6`
From 5 to 12 and from 34 to 56: `5:12,34:56`

###Obtain VTK files

Once you have chosen your parameters, click the "Run Postprocess" button and wait until the download button appears. The VTK files are compressed as tar.gz files.

Use the following command to unzip it on linux
`tar -xzf <filename>`