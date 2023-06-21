#!/bin/bash

# nvm 설치
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# nvm 사용 설정
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# nvm을 통해 Node.js 설치
nvm install 16.18.1

sudo npm install -g yarn
sudo npm install -g pm2

nvm --version
node -v

REPOSITORY=/home/ec2-user/nestjs_prisma_board_ex

cd $REPOSITORY

yarn

yarn build

pm2 restart

pm2 start serverapp


# REPOSITORY=/home/ec2-user/nestjs_prisma_board_ex
# YARN_PATH=~/.nvm/versions/node/v16.18.1/bin/yarn
# PM2_PATH=~/.nvm/versions/node/v16.18.1/bin/pm2

# cd $REPOSITORY

# which yarn
# which pm2

# $YARN_PATH

# $YARN_PATH build

# $PM2_PATH restart

# $PM2_PATH start serverapp

# sudo env "PATH=$PATH" $YARN_PATH

# sudo env "PATH=$PATH" $YARN_PATH build

# sudo env "PATH=$PATH" $PM2_PATH restart

# sudo env "PATH=$PATH" $PM2_PATH start serverapp

# mkdir test2


# sudo ln -s /root/.nvm/versions/node/v16.18.1/bin/yarn /usr/bin/yarn

# sudo ln -s /root/.nvm/versions/node/v16.18.1/bin/pm2 /usr/bin/pm2