#!/bin/bash
REPOSITORY=/home/ec2-user/nestjs_prisma_board_ex
YARN_PATH=/usr/bin/yarn
PM2_PATH=/usr/bin/pm2

cd $REPOSITORY

mkdir test2

# sudo ln -s /root/.nvm/versions/node/v16.18.1/bin/yarn /usr/bin/yarn

# sudo ln -s /root/.nvm/versions/node/v16.18.1/bin/pm2 /usr/bin/pm2

sudo yarn

sudo yarn build

sudo pm2 restart

sudo pm2 start serverapp