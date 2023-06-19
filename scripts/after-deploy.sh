#!/bin/bash
REPOSITORY=/home/ec2-user/nestjs_prisma_board_ex

cd $REPOSITORY

sudo yarn

sudo yarn build

pm2 restart

sudo pm2 start serverapp