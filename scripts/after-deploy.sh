#!/bin/bash


# 이미 NVM이 설치되어 있는지 확인하는 조건문 command -v nvm에서 command -v는 주어진 명령어가 실행되는지 여부
# &> 리다이랙션 의미
# /dev/null; : 휴지통
# &> /dev/null 휴지통으로 현재 명령어 결과 없이 제거
if ! command -v nvm &> /dev/null; then
    # nvm 설치
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

    # nvm 사용 설정
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    
    # nvm을 통해 Node.js 설치
    nvm install 16.18.1
fi

# Node.js 16.18.1이 설치되어 있지 않은 경우에만 설치
if ! command -v node &> /dev/null || [[ $(node --version) != *"v16.18.1"* ]]; then
    nvm install 16.18.1
fi

# yarn이 설치되어 있지 않은 경우에만 설치
if ! command -v yarn &> /dev/null; then
    npm install -g yarn
fi

# pm2가 설치되어 있지 않은 경우에만 설치
if ! command -v pm2 &> /dev/null; then
    npm install -g pm2
fi

REPOSITORY=/home/ec2-user/nestjs_prisma_board_ex

cd $REPOSITORY

rm package-lock.json
rm -rf node_modules

yarn

npm list -g

timeout 400s yarn build

pm2 restart

pm2 start serverapp

