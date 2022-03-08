sudo apt-get update

#install node and packages
curl -sL https://deb.nodesource.com/setup_17.x | sudo -E bash -
cd /vagrant/openfoam_cbp
rm -rf /vagrant/openfoam_cbp/node_modules
rm -f /vagrant/openfoam_cbp/package-lock.json
sudo apt-get install -y nodejs
sudo npm install --global yarn
sudo npm install nodemon --global
sudo npm install pkg --global
yarn install
#patching semantic-ui bug
sed -i s/\;\;/\;/g /vagrant/openfoam_cbp/node_modules/semantic-ui-css/semantic.min.css

install openfoam
cd /home/vagrant
sudo sh -c "wget -O - https://dl.openfoam.org/gpg.key | apt-key add -"
sudo add-apt-repository http://dl.openfoam.org/ubuntu
sudo apt-get update
sudo apt-get -y install openfoam6 make
sudo sed -i 's@^\[ "\$BASH" -o "\$ZSH_NAME" \] \&\& \\@#\[ "\$BASH" -o "\$ZSH_NAME" \] \&\& \\@g' /opt/openfoam6/etc/bashrc

#echo "source /opt/openfoam6/etc/bashrc" >> .bashrc

#create webserver scripts
cd /home/vagrant
echo "cd /vagrant/openfoam_cbp/ && npm run build" > build.sh
echo "cd /vagrant/openfoam_cbp/ && npm run dev" > dev.sh
echo "cd /vagrant/openfoam_cbp/ && npm run start" > start.sh
chown vagrant:vagrant *

. /opt/openfoam6/etc/bashrc
mkdir solvers
cd solvers
sh /vagrant/utils/compile_solvers.sh