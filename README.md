# 基于Vue.js的音乐播放器（Webapp）

--------
### 概述
项目是基于Vue.js，成品是一个移动端的音乐播放器，来源于imooc的实战课程。自己动手实践并加以修改拓展。
项目的大致流程是Vue-cli构建开发环境，分析需求，设计构思，规划目录结构，开始编码。
#### 视图层
> 
* 推荐页
* 歌手页
	* 歌手详情
* 歌曲排行榜
	* 排行榜详情
* 搜索页
* 用户中心

#### 数据来源
所有数据都来自于QQ音乐，抓取自QQ的接口，大部分接口都是JSONP，抓取比较容易，其中一些接口限制了`host`，不能直接抓取，采用的方法是用`axios`代理，设置`header`，以此绕过`host`的限制。
PS：具体代码请看`prod.server.js`文件

#### 技术栈
> 
* [x] Vue
* [x] Vuex
* [x] Vue-Router
* [x] Vue-cli
* [x] Stylus
* [x] Axios

#### src目录结构
![](https://oc1gyfe6q.qnssl.com/17-7-27/71529472.jpg)
### 构建
#### 开发环境

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# run e2e tests
npm run e2e

# run all tests
npm test
```

#### 生产环境

``` bash
# build for production with minification
npm run build
# run
node prod.server.js
```
