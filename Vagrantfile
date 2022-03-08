Vagrant.configure("2") do |config|
    config.vm.box = "ubuntu/bionic64"
    config.vm.provider "vmware_desktop" do |v|
        v.vmx["sharedFolder0.followSymlinks"] = "TRUE"
    end
    config.vm.provider "virtualbox" do |v|
        v.gui = true
        v.memory = 2024
        v.cpus = 2
        v.customize ["setextradata", :id, "VBoxInternal2/SharedFoldersEnableSymlinksCreate/v-root", "1"]
    end
    config.vm.provision :shell, privileged: true, path: "setup_vagrant.sh"
    config.vm.synced_folder ".", "/vagrant"
    config.vm.network :forwarded_port, guest:3000, host:3000, auto_correct: true
    config.vm.network :forwarded_port, guest:8000, host:8000, auto_correct: true
end