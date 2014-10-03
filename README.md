# D6 Powers

D6 Powers is an angular web application to generate characters using the D6 Powers Rule Set.

## Requirements

- [Vagrant](https://www.vagrantup.com/)
- [Vagrant-Triggers](https://github.com/emyl/vagrant-triggers)

## Install

### Mac OS
```
brew install vagrant
vagrant plugin install vagrant-triggers
```

### Linux (Deb)
```
apt-get install vagrant
vagrant plugin install vagrant-triggers
```

### Windows
[Download Vagrant](https://www.vagrantup.com/downloads.html)
```
vagrant plugin install vagrant-triggers
```

## Setup

Since D6 Powers uses a [Firebase](http://firebase.com) back-end, it will be important to edit the value of the FirebaseURL value in the D6App.js configuration. This value should be changed to your own firebase instance.

## Run

```
vagrant up
```

The first time the command is run, it may take some time for the initial setup to pull the machine images. Once it is completed, the application should be available via http://192.168.10.10. 