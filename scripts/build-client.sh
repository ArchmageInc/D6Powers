#!/bin/bash

sudo docker images | grep $IMGNAME > /dev/null 2>&1
IMG=$?

if [ $IMG = 0 ]; then
  echo -e "\e[0m\e[1;97;44m --== Docker Image Already Exists ==-- \e[0m"
else
  ###################
  # BUILD CONTAINER #
  ###################
  echo -e "\e[0m\e[1;97;44m --== Building Docker Container ==-- \e[0m"
  sudo docker build -t $IMGNAME /vagrant/src
fi