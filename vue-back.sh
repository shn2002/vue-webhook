#!/bin/bash
WORK_PATH ='user/projects/vue-back'
cd $WORK_PATH
echo "先清楚老代码"
git reset --hard prign/master
git clean -f
echo "拉取最新代码"
git pull origin master
echo "开始执行构建"
docker build -t vue-back .
echo "先删除旧容器"
docker stop vue-back-container
docker rm vue-back-container
echo "启动新容器"
docker container run p 3000:3000 --name vue-back-container -d vue-back