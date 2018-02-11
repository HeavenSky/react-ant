# react-antd-ie9
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
* antd 需要`window.matchMedia`, 在[npmjs官网](https://www.npmjs.com)找到两个 ployfill 库(两者名字不一样!!!): `match-media` 和 `media-match`
	* 两者均不能使用 `import matchMedia from "<package_name>";` 只能用 `import "<package_name>";`
	* `match-media` 只是 `import "match-media";` 并未兼容 `addListener` 和 `removeListener`, 需要再引入 `import "match-media/matchMedia.addListener";`
	* `media-match` 直接引入即可 `import "media-match";`
	* 也可以直接从[阿里的库里](https://as.alipayobjects.com/g/component/??media-match/2.0.2/media.match.min.js)拿
的不支持`addListener`和`removeListener`, 索性还是直接从[阿里的库里](https://as.alipayobjects.com/g/component/??media-match/2.0.2/media.match.min.js)拿
* package.json 里面更新 version 到对应小版本最新
* webpack.common.config.js 中 output 关于使用 绝对路径 和 相对路径 的看法
	* 如果当前就一个单页应用, 可以直接用相对路径配置, 那样生产模式编译后直接用浏览器打开 dist/index.html 也能看到效果
	* 后面考虑多个单页应用的处理, 就需要 output (包含html模板中的静态资源引用) 全部改成绝对路径了, 不然根据模板自动生成的 html 中的 js 引用就会出现路径问题
* webpack-dev-server 2.x 在 IE11 以下不支持 `inline:true` 也不支持 `color`
* 使用 WebpackDllPlugin 优化编译速度, 缩小编译文件
* 使用 copy-webpack-plugin 直接拷贝静态资源
* 移除了 react-hot-loader 在 IE 中支持不是很好

刚开始学 webpack, 还有很多不懂, 欢迎指点秘籍, 或者纠错改进, 共同学习,共同进步

## 代码规范参考
* [js规范es5,es6,react](https://github.com/airbnb/javascript)
* [js规范中文版](https://github.com/yuche/javascript)
* [React规范中文版](https://github.com/JasonBoy/javascript/tree/master/react)
* [es5规范中文版](https://github.com/sivan/javascript-style-guide/tree/master/es5)
* [eslint规则](http://eslint.cn/docs/rules)
* [js标准化介绍](https://standardjs.com/readme-zhcn.html)
* [js标准化规则](https://standardjs.com/rules-zhcn.html)

## 个人代码习惯(因人而异,觉得不好的我会改,所以仅供参考)
### 关于文件末尾留一空行
* 我是不留的,能少一行为什么不少
### 关于代码缩进
* 我是tab,不想争,1个字符比2个4个空格少
### 关于引号
* js统一双引号,字符串内的单引号统一`\"`,单引号`\x27`,双引号`\x22`,那样就找不到单引号了
* css统一双引号,content内容必须转义,防止偶尔的乱码
### 是否加逗号
* 原则上,行结尾的逗号,加不加逗号都不会有语法错误的情况,加逗号,方便整行移动时无视是否需要加逗号
* 习惯上,非行结尾的逗号,加不加逗号都不会有语法错误的情况,不加逗号
* 数组 如果内部换行,换行前必加逗号
* 对象 如果内部换行,换行前必加逗号
### 是否加分号
* 所有情况尽可能完整追加分号
### 关于定义变量
* 如果赋值,一个变量一条const或者let,不用var
* 如果可以,尽可能用对象或数组的解构形式进行赋值
### 关于import顺序
* 引入node_modules中的全局组件
* 引入node_modules中的非全局组件
* 凭借loader媒介加载的, 如:bundle-loader
* 自定义的一些组件
* 自定义的一些函数
* 引入图片文件
* 引入样式文件
### 兼容 MAC shell 的 `sed` 命令
```shell
if [ `uname` = 'Darwin' ];
then
	alias sed='sed -i '\'\'
else
	alias sed='sed -i'
fi
```

## 开发坏境启动
1. `npm install` 若在前面运行过此命令, 可跳过
2. `npm run dll` 若在前面运行过此命令, 可跳过
3. `npm start`
4. 浏览器打开[http://localhost:8888](http://localhost:8888)

## 生产坏境部署
1. `npm install` 若在前面运行过此命令, 可跳过
2. `npm run app`
3. 拷贝dist文件夹内容至服务器即可