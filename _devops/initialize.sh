#!/bin/bash
# =========
# OS: Ubuntu 18.04
# Softwares: NodeJS@6.10.3, python@2.7, git@latest, mongodb@3.4.x
# Setup OS-Level Dependencies
# =========

# Initialize first Ubuntu server

# Add NodeJS PPA
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -

# install dirmngr
sudo apt-get install dirmngr --install-recommends

# Add MongoDB PPA
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4
echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb.list

# Update all repo
sudo apt-get update

# Install NodeJS, git, mongodb, python 2.7.x (to compile bcrypt)
sudo apt-get install -y nodejs git mongodb build-essential python

# Write the auto start script for mongodb
echo "Writing MongoDB startup service script:"

cat << EOL | sudo tee /etc/systemd/system/mongodb.service
[Unit]
Description=High-performance, schema-free document-oriented database
After=network.target
Documentation=https://docs.mongodb.org/manual

[Service]
User=mongodb
Group=mongodb
ExecStart=/usr/bin/mongod --quiet --config /etc/mongod.conf

[Install]
WantedBy=multi-user.target
EOL

# Add public key to gitlab
cat ~/.ssh/id_rsa.pub
echo "Manually add pub key to ssh keys on gitlab"

# =========
# Setup App-Level Dependencies
# =========

# Config git
mkdir apps
mkdir apps/todo-list


# go to goalify-webapp directory
APP_DIR=~/apps/todo-list/
cd $APP_DIR

# repo: https://github.com/tuanquynet/expressjs-based-todo-list.git
git clone <repo>
# Checkout master branch of repo
git checkout master

cd $APP_DIR/expressjs-based-todo-list/api
npm install

cd $APP_DIR/expressjs-based-todo-list/webapp
npm install

# Add .env file for production
cd cd $APP_DIR/
nano .env
echo "Refer to .env-production file in project folder"
