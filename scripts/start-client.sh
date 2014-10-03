#!/bin/bash

###################
#   CHECK IMAGE   #
###################

sudo docker images | grep $IMGNAME > /dev/null 2>&1
IMG=$?

if [ $IMG -ne 0 ]; then
  echo -e "\e[0m\e[1;97;41m --== No Docker Image!!! ==-- \e[0m"
  /vagrant/scripts/build-client.sh
fi

###################
# CHECK CONTAINER #
###################

sudo docker ps -a | grep $IMGNAME-run > /dev/null 2>&1
CTR=$?

if [ $CTR -ne 0 ]; then
  echo -e "\e[0m\e[1;97;41m --== No Docker Run Container!!! ==-- \e[0m"
  /vagrant/scripts/run-client.sh
fi

###################
# START CONTAINER #
###################

echo -e "\e[0m\e[1;97;44m --== Starting Container ==-- \e[0m"

sudo docker start $IMGNAME-run