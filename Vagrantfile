BOX = "ubuntu-14.04-amd64-vbox"
URL = "https://oss-binaries.phusionpassenger.com/vagrant/boxes/latest/ubuntu-14.04-amd64-vbox.box"

Vagrant.configure(2) do |config|

  config.vm.box     = BOX
  config.vm.box_url = URL

  config.vm.network :private_network, ip: "192.168.10.10"
  
  config.vm.synced_folder "./", "/vagrant"

  config.vm.provision "shell", path: "scripts/run", args: "/vagrant/scripts/provision.sh", privileged: false
  
  config.trigger.after :up do
    run "vagrant ssh -c \"/vagrant/scripts/run /vagrant/scripts/post-up.sh\""
  end

  config.vm.post_up_message = "The application should now be available via http://192.168.10.10"

end
