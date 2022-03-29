# 仿网易云音乐程序(Vue全家桶)

# 注意：此项目仅限学习用途，非盈利用途！

## 技术栈：

### 前端：

基于Vue-cli搭建：Vue(2.6.11) + Vue-router(3.2.0) + Vuex(3.4)

element-ui(2.15.5)

axios（0.21.1）

file-saver(2.0.5)

APlayer(2.0.0)

### 后端：

nodeJS(优秀的网易云Api开源项目：NeteaseCloudMusicApi)

API文档：https://binaryify.github.io/NeteaseCloudMusicApi

具体请移步到：https://github.com/Binaryify/NeteaseCloudMusicApi

## 项目介绍：

参考于网易云音乐PC版app，简易的实现部分功能：登录、二维码登录、推荐歌单、推荐mv、排行榜（飙升榜、新歌榜、原创榜、热歌榜）、搜索歌曲（试听、下载、播放MV）等功能，其需要登录状态的功能有：最近播放、我喜欢的音乐）、个人信息、歌单评论等。

## 项目运行：

1. 运行后端

   git clone 后端仓库地址

   npm install

   node app

2. 运行前端

   git clone 本仓库地址

   npm install

   npm run serve

后端：http://localhost:3000/
前端：http://localhost:8080/

## 部分效果展示：

主页

![主页](https://gitee.com/skygray/Vue-NeteaseCloud/raw/master/ReadingImg/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202021-09-07%20174152.png)

排行榜

![排行榜](https://gitee.com/skygray/Vue-NeteaseCloud/raw/master/ReadingImg/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202021-09-07%20174218.png)

搜索

![搜索](https://gitee.com/skygray/Vue-NeteaseCloud/raw/master/ReadingImg/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202021-09-07%20174309.png)

mv播放

![mv播放](https://gitee.com/skygray/Vue-NeteaseCloud/raw/master/ReadingImg/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202021-09-07%20174340.png)

歌单详细

![歌单详细](https://gitee.com/skygray/Vue-NeteaseCloud/raw/master/ReadingImg/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202021-09-07%20174409.png)

