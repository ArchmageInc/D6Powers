#!/bin/bash

#################
#  TIME ZONES   #
#################
if [ ! -e /etc/timezone ]; then
  echo -e "\e[0m\e[1;97;44m --== Setting Timezone to: \e[0m $TIMEZONE \e[0m\e[1;97;44m ==-- \e[0m"
  sudo echo $TIMEZONE > /etc/timezone
  sudo dpkg-reconfigure -f noninteractive tzdata
fi

##################
#   UPDATE APT   #
##################
echo -e "\e[0m\e[1;97;44m --== Updating Vagrant Container ==-- \e[0m"
sudo apt-get --quiet --yes update

##################
# NODE & DOCKER  #
##################
if [ ! -e /usr/bin/node ];then
  echo -e "\e[0m\e[1;97;44m --== Installing NodeJS & Docker ==-- \e[0m"
  sudo apt-get --quiet --yes install nodejs npm docker.io
fi

##################
#   NODE LINK    #
##################
if [ ! -h /usr/local/bin/node ]; then
  sudo ln -s /usr/bin/nodejs /usr/local/bin/node
fi

##################
#     GRUNT      #
##################
if [ ! -e /usr/local/bin/grunt ]; then
  echo -e "\e[0m\e[1;97;44m --== Installing Grunt & Bower ==-- \e[0m"
  sudo npm install --quiet --global grunt-cli bower
fi

##################
#  DEPENDENCIES  #
##################
echo -e "\e[0m\e[1;97;44m --== Installing Server-Side Dependencies ==-- \e[0m"
cd /vagrant/src && sudo npm install --quiet

##################
#   BUILD APP    #
##################
echo -e "\e[0m\e[1;97;44m --== Building Project ==-- \e[0m"
cd /vagrant/src && grunt build

###################
#    CONTAINER    #
###################
/vagrant/scripts/build-client.sh
/vagrant/scripts/run-client.sh
/vagrant/scripts/start-client.sh