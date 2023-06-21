#!/bin/bash
REPOSITORY=/home/ec2-user/nestjs_prisma_board_ex
YARN_PATH=~/.nvm/versions/node/v16.18.1/bin/yarn
PM2_PATH=~/.nvm/versions/node/v16.18.1/bin/pm2

cd $REPOSITORY

sudo env "PATH=$PATH" $YARN_PATH

sudo env "PATH=$PATH" $YARN_PATH build

sudo env "PATH=$PATH" $PM2_PATH restart

sudo env "PATH=$PATH" $PM2_PATH start serverapp


# mkdir test2

# which yarn

# sudo ln -s /root/.nvm/versions/node/v16.18.1/bin/yarn /usr/bin/yarn

# sudo ln -s /root/.nvm/versions/node/v16.18.1/bin/pm2 /usr/bin/pm2