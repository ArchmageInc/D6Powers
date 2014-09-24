#!/bin/bash

TIMEZONE="America/Indiana/Indianapolis"
IMGNAME="d6-client"


if [ ! -e /etc/timezone ]; then
  echo -e "\e[0m\e[1;97;44m --== Setting Timezone to: \e[0m $TIMEZONE \e[0m\e[1;97;44m ==-- \e[0m"
  sudo echo $TIMEZONE > /etc/timezone
  sudo dpkg-reconfigure -f noninteractive tzdata
fi

echo -e "\e[0m\e[1;97;44m --== Updating ==-- \e[0m"
sudo apt-get --quiet --yes update

if [ ! -e /usr/bin/node ];then
  echo -e "\e[0m\e[1;97;44m --== Installing NodeJS & Docker ==-- \e[0m"
  sudo apt-get --quiet --yes install nodejs npm docker.io
fi

if [ ! -h /usr/local/bin/node ]; then
  sudo ln -s /usr/bin/nodejs /usr/local/bin/node
fi

if [ ! -e /usr/local/bin/grunt ]; then
  echo -e "\e[0m\e[1;97;44m --== Installing Grunt & Bower ==-- \e[0m"
  sudo npm install --quiet --global grunt-cli bower
fi

echo -e "\e[0m\e[1;97;44m --== Installing Server-Side Dependencies ==-- \e[0m"
cd /vagrant/src && npm install --quiet

echo -e "\e[0m\e[1;97;44m --== Building Project ==-- \e[0m"
cd /vagrant/src && grunt build

echo -e "\e[0m\e[1;97;44m --== Building D6-Client Docker Container ==-- \e[0m"
sudo docker build -t $IMGNAME /vagrant/src

sudo docker images | grep $IMGNAME > /dev/null 2>&1
IMG=$?

if [ $IMG = 0 ]; then
  echo -e "\e[0m\e[1;97;44m --== Launching D6-Client ==-- \e[0m"
  sudo docker run -d -h d6-client --name $IMGNAME-run -v /vagrant/src/build:/d6 -p 80:80 $IMGNAME
else
  echo -e "\e[0m\e[1;1;44m --== Failed To Build Docker Image!!! ==-- \e[0m"
fi