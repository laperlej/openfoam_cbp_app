#clone solvers
git clone https://gitlab.ethz.ch/openfoam-cbp/solvers/hamfoam.git
git clone https://gitlab.ethz.ch/openfoam-cbp/solvers/urbanmicroclimatefoam.git
git clone https://gitlab.ethz.ch/openfoam-cbp/solvers/winddrivenrainfoam.git
git -c advice.detachedHead=false -C hamfoam checkout tags/of-org_v6.0
git -c advice.detachedHead=false -C winddrivenrainfoam checkout tags/of-org_v6.0


. /opt/openfoam6/etc/bashrc
#compile hamfoam
cd hamfoam/_LIB
./Allwmake $*
cd ..
wmake
cd ..

#compile urbanmicroclimatefoam
cd urbanmicroclimatefoam/_LIB
./Allwmake $*
cd ..
wmake
cd ..


#compile winddrivenrainfoam
cd winddrivenrainfoam
wmake
cd ..
