# Shrine CLI

## 安装

## 支持的参数和命令

### 使用

```
npx shrine [command] [options]
```
快速开始
```
mkdir my-project
cd my-project
npx shrine init
npx shrine create my-package
```

init
```
  -name [name] 初始化项目，项目名默认使用文件夹名称
```

create
```
[pkg-name] package名
  -m --micro 是否为微前端子应用
```
如果不加-m，应用不会被当作子应用处理，应用名会被添加到shrine.ignore中

dev
```
  -p --port [port] 开发环境端口号，不是子应用的
```
子应用端口号在子应用`package.json`的shrine参数中指定  
启动后根据`//:localhost:[port]/[pkg_name]` 访问对应子应用
也可以直接根据子应用端口号访问 `//:localhost:[pkg_port]`

build
```
  -o --output <dir> 输出地址
```

### shrine.config.json
根目录下的配置文件  
等效 package.json `{ shrine: { ... } }`  
package.json的配置优先级高于config文件
```
{
  port: number 开发环境端口号，子应用端口号默认根据此端口号自增分配
  output: string 子应用打包文件输出地址，默认/dist
  ignore: string[] 添加pkg_name，不会被当作子应用处理
}
```
### 子应用 shrine.config.json
子应用配置内容较少，默认会在package.json生成
```
{
  port: number 开发环境端口号，子应用端口号默认根据此端口号自增分配
}
```
