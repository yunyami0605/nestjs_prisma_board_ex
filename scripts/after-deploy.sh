#!/bin/bash
REPOSITORY=/home/ec2-user/nestjs_prisma_board_ex
YARN_PATH=~/.nvm/versions/node/v16.18.1/bin/yarn
PM2_PATH=~/.nvm/versions/node/v16.18.1/bin/pm2

cd $REPOSITORY

sudo $YARN_PATH

sudo $YARN_PATH build

sudo $PM2_PATH restart

sudo $PM2_PATH start serverapp