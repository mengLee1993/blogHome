**node安装(mac)**

    *1.安装node   #brew install node

    *2.创建服务器：服务器可以监听客户端的请求，类似于 Apache 、	Nginx 等 HTTP 服务器。
        _1  在项目根目录创建server.js
            var http = require('http');
                http.createServer(function (request, response) {

                    		// 发送 HTTP 头部
                    		// HTTP 状态值: 200 : OK
                    		// 内容类型: text/plain
                    		response.writeHead(200, {'Content-Type': 'text/plain'});

                    		// 发送响应数据 "Hello World"
                    		response.end('Hello World\n');
                }).listen(8888);

                // 终端打印如下信息
                console.log('Server running at http://127.0.0.1:8888/');
        _2  在根目录执行    #node server.js
            显示Server running at http://127.0.0.1:8888/说明服务起来了
        _3  接下来，打开浏览器访问 http://127.0.0.1:8888/，你会看到一个写着 "Hello World"的网页。

    *3.npm使用安装依赖
        如果版本较低升级npm命令   #sudo npm install npm -g
        _1  我们使用 npm 命令安装常用的 Node.js web框架模块express   #npm install express
            //卸载模块   #npm uninstall express
            //更新模块   #npm update express
            //搜索模块   #nom search express
            安装好之后，express 包就放在了工程目录下的 node_modules 目录中，因此在代码中只需要通过 require('express') 的方式就好，无需指定第三方包路径。（如果报错npm err! Error: connect ECONNREFUSED 127.0.0.1:8087 执行命令 npm config set proxy null解决）
            var express = require('express');
        _2  全局安装   #npm install express -g
        _3 ️查看全局安装信息    #npm list -g
            查看版本信息    #npm list grunt
        _4  查看press配置json
            目录 node_modules/express/package.json
            name - 包名。
            version - 包的版本号。
            description - 包的描述。
            homepage - 包的官网 url
            author - 包的作者姓名
            contributors - 包的其他贡献者姓名。
            dependencies - 依赖包列表。如果依赖包没有安装，npm 会自动将依赖包安装在 node_module 目录下。 			repository - 包代码存放的地方的类型，可以是 git 或 svn，git 可在 Github 上。 			main - main 字段指定了程序的主入口文件，require('moduleName') 就会加载这个文件。这个字段的默认值是模块根目录下面的 index.js。 			keywords - 关键字 
        _5 ️发布       #npm publish


