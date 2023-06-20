#!/bin/bash
REPOSITORY=/home/ec2-user/nestjs_prisma_board_ex
YARN_PATH=/usr/bin/yarn
PM2_PATH=/usr/bin/pm2

cd $REPOSITORY

sudo $YARN_PATH

sudo $YARN_PATH build

sudo $PM2_PATH restart

sudo $PM2_PATH start serverapp