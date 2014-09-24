BOX = "ubuntu-14.04-amd64-vbox"
URL = "https://oss-binaries.phusionpassenger.com/vagrant/boxes/latest/#{$BOX}.box"

Vagrant.configure(2) do |config|

  config.vm.box     = BOX
  config.vm.box_url = URL

  config.vm.network :private_network, ip: "192.168.10.10"
  
  config.vm.synced_folder "./", "/vagrant"

  config.vm.provision "shell", path: "provision.sh", privileged: false

end
