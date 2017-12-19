# react-ant
这是一个以最新版 React, React Router DOM, Ant Design 等现代流行框架写的兼容 IE9 的 demo 例子.

## 技术参考 和 代码介绍
* 实用技术学习列表, 学习并参考了很多[砖家大神](https://github.com/brickspert)的[react-family](https://github.com/brickspert/react-family)项目配置, 我增加了对于 IE9 的支持并处理, react 升级到 v16
	* 增加了一些常用的关于 redux 的 dependencies, 不过小项目和新人用 redux, 感觉属于吃力不讨好的事情, 记得一句话 `如果你不知道要不要用 redux, 那么就不用`, 而且一个用 redux 写的项目想去改动, 代码耦合太高, 改动起来十分费劲, 就并未在代码中使用
	* 处理 react16 对于 IE11 以下的支持 引入`core-js/es6/map,core-js/es6/set,raf/polyfill` [官方介绍](https://doc.react-china.org/docs/javascript-environment-requirements.html)
	* 如果单纯为了组件之间通信, 一般有如下做法
		* 组件不要嵌套太深, 嵌套三层就算深了
		* 通过父组件的箭头函数进行子组件之间的通信
		* 如果想要两个不关联的组件进行通信, 推荐两个插件, 都简单易用(支持 IE8+)
			* [pubsub-js](https://www.npmjs.com/package/pubsub-js) 上面就有具体例子
			* [signals](https://www.npmjs.com/package/signals) [例子](https://github.com/millermedeiros/js-signals/wiki/Examples) 据说 facebook 就是用的这个
	* dependencies 查询和资料参考来源 [npmjs官网](https://www.npmjs.com)
	* webpack 配置增加 less 支持
	* webpack 配置增加 ant design 系列的支持
		* 引入 [antd 3.x](http://ant.design) [antd-mobile](https://mobile.ant.design/)
		* 引入 [babel-plugin-import](https://www.npmjs.com/package/babel-plugin-import), 并更改 `.babelrc`
* antd 需要`match-media`, 在[npmjs官网](https://www.npmjs.com)找到的不支持`addListener`和`removeListener`, 索性还是直接从[阿里的库里](https://as.alipayobjects.com/g/component/??media-match/2.0.2/media.match.min.js)拿
* package.json 里面更新 version 到对应小版本最新
* webpack.common.config.js 中 output 关于使用 绝对路径 和 相对路径 的看法
	* 如果当前就一个单页应用, 可以直接用相对路径配置, 那样生产模式编译后直接用浏览器打开 dist/index.html 也能看到效果
	* 后面考虑多个单页应用的处理, 就需要 output (包含html模板中的静态资源引用) 全部改成绝对路径了, 不然根据模板自动生成的 html 中的 js 引用就会出现路径问题
* webpack-dev-server 2.x 在 IE11 以下不支持 `inline:true` 也不支持 `color`
* 使用 WebpackDllPlugin 优化编译速度, 缩小编译文件
* 使用 copy-webpack-plugin 直接拷贝静态资源
* 移除了 react-hot-loader 在 IE 中支持不是很好

刚开始学 webpack, 还有很多不懂, 欢迎指点秘籍, 或者纠错改进, 共同学习,共同进步

## 开发坏境启动
1. `npm install` 若在前面运行过此命令, 可跳过
2. `npm run dll` 若在前面运行过此命令, 可跳过
3. `npm start`
4. 浏览器打开[http://localhost:8888](http://localhost:8888)

## 生产坏境部署
1. `npm install` 若在前面运行过此命令, 可跳过
2. `npm run app`
3. 拷贝dist文件夹内容至服务器即可