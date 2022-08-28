# hakushin
> 一个让你轻松创建基于monorepo的微前端项目的工具，用户无须做任何配置，即可对每个package单独开发、测试、打包

## 快速开始

```
pnpm create @hakushin/app my_project
cd my_project
pnpm cp app1
```
推荐添加插件
```
pnpm add -Dw @hakushin/plugin-dev-server @hakushin/plugin-dev-console
```
修改shrine.config.js，导入插件
```
import devServer from '@hakushin/plugin-dev-server'
import devConsole from '@hakushin/plugin-dev-console'

export default {
  type: 'pc',
  port: 3200,
  plugins: [
    devServer(),
    devConsole(),
  ],
}

```
执行命令
```
pnpm start
```

## 配置

### package_name/package.json
```
{
  hakushin: {
    port: 3201, 子应用端口号，cli自动分配，只要不重复可自定义，后续分配端口取最大+1
  }
}
```

### shrine.config.js
```
{
  type: 'pc', //项目类型，cli会指向模板的同名branch，默认main
  template: 'sukura-shrine/app-template', //项目模板地址
  port: 3200, //开发环境端口号, plugin-dev-console启动时的端口号，子应用根据此端口号+1开始分配默认端口
  plugins: []
}
```

## API
```
Usage:
  $ haku <command> [options]
Commands:
  <name>    初始化项目
  create <name>  创建子应用
    -r, --ref <name>  模板的branch名称
  build <name>  打包子应用, 打包文件放在项目根目录的`/dist`文件夹
```

## 插件
### @hakushin/plugin-dev-server
存在此插件时，cli 新增命令 `haku micro [name]`，可以在根目录启动子应用

### @hakushin/plugin-dev-console
必须搭配`@hakushin/plugin-dev-server`一同使用
存在此插件时，cli 新增命令 `haku start [name]`， 可以在根目录启动子应用，并且通过`固定端口号/应用名`的方式访问子应用，你不用去记忆端口也能使用微应用，在微应用被其他项目引用时比较方便  
  
插件支持中间件，在`packages/app_name/`下添加.middleware.js
```
// .middleware.js
module.exports = async () => {
  // 在此做初始化操作
}
```

## 设计理念
研究微前端架构时发现，如果每个微应用单独创建git仓库，那么对应用的批处理将变得极其麻烦，实践后认为monorepo是一个更好的方案  
可是，monorepo的配置本身就很复杂，当微应用数量级达到一定程度后，复杂度会高到难以处理  
比如，一个巨石项目被拆分成很多个微应用，每个微应用单独开发的时候，需要登录该如何做？对不同微应用启动时做不同行为的初始化时该如何做？微应用被其他正常应用引用的时候，开发时如何调试...等等无穷多的问题等着解决  
此项目就是为了解决这些工程问题，并对用户提供一些简单的API来屏蔽复杂度。cli部分会保持简洁，只添加必须的功能，尽可能保证所有功能可配置，复杂功能会以插件形式提供。

## 后续
[开发计划](https://github.com/sukura-shrine/hakushin/issues/2)
