#!/bin/bash

###################
#  RUN CONTAINER  #
###################
sudo docker images | grep $IMGNAME > /dev/null 2>&1
IMG=$?

if [ $IMG = 0 ]; then
  echo -e "\e[0m\e[1;97;44m --== Running Container ==-- \e[0m"
  sudo docker run -d -h $IMGNAME --name $IMGNAME-run -v /vagrant/src/build:/d6 -p 80:80 $IMGNAME
else
  echo -e "\e[0m\e[1;97;41m --== No Docker Image!!! ==-- \e[0m"
  /vagrant/scripts/build-client.sh
fi