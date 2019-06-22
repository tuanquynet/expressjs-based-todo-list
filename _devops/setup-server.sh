#configure timezone
export time_zone=Asia/Ho_Chi_Minh
sudo cp -vf /usr/share/zoneinfo/$time_zone /etc/localtime
echo $time_zone | sudo tee /etc/timezone

echo "add user devops"
sudo adduser devops

sudo usermod -aG sudo devops

echo "Switch to devops user"
su - devops

echo "Define locale"
sudo localedef -i en_US -f UTF-8 en_US.UTF-8

sudo sh -c 'cat << EOF >> /etc/environment
LC_ALL=en_US.UTF-8
LANG=en_US.UTF-8
EOF'

echo "generate ssh key with name 'id_rsa'"
ssh-keygen

echo "Create a $HOME/.ssh directory and restrict its permissions with the following commands:"
#mkdir ~/.ssh
chmod -R 700 ~/.ssh

echo "Generate key on your local"

# Add remote devops public key into authorized_keys of devops user
cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys

echo "Notes: download devops private key"

# Now restrict the permissions of the authorized_keys file with this command:
chmod 600 ~/.ssh/authorized_keys

exit
