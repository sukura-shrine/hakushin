# hakushin
> 一个让你轻松创建基于monorepo的微前端项目的工具，用户无须做任何配置，即可对每个package单独开发、测试、打包

多数功能通过插件实现，让用户尽可能自由的定制cli功能

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
    port: 3200, 子应用端口号，cli自动分配，只要不重复可自定义，后续分配端口取最大+1
  }
}
```

### shrine.config.js
```
{
  type: 'pc', 项目类型
  port: 3100, //开发环境端口号, 存在devConsole时生效，子应用根据此端口号+100开始分配
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
```

## 插件
### @hakushin/plugin-dev-server
存在此插件时，cli 新增命令 `haku micro [name]`，可以在根目录启动子应用

### @hakushin/plugin-dev-console
必须搭配`@hakushin/plugin-dev-server`一同使用  
存在此插件时，cli 新增命令 `haku start [name]`， 可以在根目录启动子应用，并且通过`固定端口号/应用名`的方式访问子应用。因为是通过统一端口对外访问，开发环境下可以方便的成为其他项目的微应用引入

### @hakushin/plugin-build（尚未实现）
存在此插件时，cli 新增命令 `haku build [name]`，提供打包行为，默认打包文件放到项目根目录的`/dist`文件夹

## 设计理念
做此项目初衷是因为，想用monorepo管理微前端时发现monerepo的管理极其繁琐，加入微前端后更加复杂，所以需要一个工具降低开发的复杂度，但市面上没有能提供帮助的cli工具。
另一个问题是市面上大多cli的功能和模板都写在内部，我希望模板是可配置的，用户可以接入自己的模板；功能是灵活可配置的，用户可在此基础上定制而不受限于cli本身

## 后续
[开发计划](https://github.com/sukura-shrine/hakushin/issues/2)
