#!/bin/bash
REPOSITORY=/home/ec2-user/nestjs_prisma_board_ex

cd $REPOSITORY

yarn

yarn build

pm2 restart

pm2 start serverapp