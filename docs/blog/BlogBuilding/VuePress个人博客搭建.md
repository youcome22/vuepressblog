# VuePress 个人博客搭建

## 项目简述

​	VuePress是尤雨溪（vue.js 框架作者）4月12日发布的一个全新的基于 vue 的静态网站生成器，实际上就是一个 vue 的 spa 应用，内置 webpack，可以用来写文档。

​	Vuepress 是 Vuejs 官方提供的一个是Vue驱动的静态网站生成器，基于Markdown语法生成网页。它就是一个快速建设文档站点的工具，在简单配置好功能后，只需要将 Markdown 文档上传，并且可以将其发布到 Github。

​	VuePress 由两部分组成：一个以 Vue 驱动的主题系统的简约静态网站生成工具，和一个为编写技术文档而优化的默认主题。它是为了支持 Vue 子项目的文档需求而创建的。

​	由 VuePress 生成的每个页面，都具有相应的预渲染静态 HTML，它们能提供出色的加载性能，并且对 SEO 友好。然而，页面加载之后，Vue 就会将这些静态内容，接管为完整的单页面应用程序(SPA)。当用户在浏览站点时，可以按需加载其他页面。



## VuePress特性

- 内置 markdown 扩展，针对技术文档进行了优化
- 能够利用内嵌在 markdown 文件中的 Vue 代码
- 以 Vue 驱动的自定义主题系统
- PWA 支持
- Google Analytics 集成
- 一个默认主题：
  - 响应式布局
  - 可选的主页
  - 简单、开箱即用、基于标题的搜索功能
  - 可定制的导航栏和侧边栏
  - 自动生成的 GitHub 链接和页面编辑链接



## 环境准备

1）安装node.js

```bash
node -v
```

Yarn是facebook发布的一款取代npm的包管理工具。

yarn的特点：

- 速度超快。

- Yarn 缓存了每个下载过的包，所以再次使用时无需重复下载。 同时利用并行下载以最大化资源利用率，因此安装速度更快。
- 超级安全。
- 在执行代码之前，Yarn 会通过算法校验每个安装包的完整性。
- 超级可靠。
- 使用详细、简洁的锁文件格式和明确的安装算法，Yarn 能够保证在不同系统上无差异的工作。

yarn和npm等都是用于构建和打包 javascript 代码的工具。npm 出现之前，前端依赖项是保存到存储库中并手动下载的，如今大量依赖项存储在神奇的 `node_modules` 内的嵌套文件夹中.

yarn 是为了弥补 npm 的一些缺陷而出现的，为了防止拉取到不同的版本，Yarn 有一个锁定文件 (yarn.lock) 记录了被确切安装上的模块的版本号，后来npm也做了一些类似的改进新增了类似yarn.lock的 `package-lock.json`。

2）安装 yarn：

```bash
npm install -g yarn 
```

删除 `C:\Users\用户\下的.npmrc` 文件，查看是否是因为将隐藏的项目勾选上了，去掉勾选即可。

```bash
npm cache clean --force
->报错:npm版本过高
npm WARN using --force I sure hope you know what you are doing
->更改npm版本
npm install npm@x.x.x -g
```

```bash
yarn --version
```



## 项目搭建

1）新建 VuepressBlog 目录

```bash
mkdir VuepressBlog
```

2）安装本地依赖

```bash
yarn add -D vuepress # npm install -D vuepress
```

> 注：官方不再推荐全局安装 `npm install -g vuepress`

报错：yarn : 无法加载文件` C:\Users\Administrator\AppData\Roaming\npm\yarn.ps1`，因为在此系统上禁止运行脚本。

原因：PowerShell 执行策略，默认设置为`Restricted`不加载配置文件或运行脚本。需变更设置为`RemoteSigned`

管理员身份运行 **Windows PowerShell**，执行命令`set-ExecutionPolicy RemoteSigned`更改 PowerShell 执行策略，过程中提示询问是否要更改执行策略?，选择 A 或 Y

检验执行 `yarn config get registry` 命令，可正常加载执行脚本

使用 `get-ExecutionPolicy` 命令，可查看当前 PowerShell 执行策略类型

3）初始化项目

```bash
yarn init -y # npm init -y
```

查看 yarn 初始信息 `package.json`

```js
{
  "name": "vuepressblog",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  
  "devDependencies": {
    "vuepress": "^1.9.9"
  }
}
```

创建测试文档

```bash
mkdir docs

echo '# Hello VuePress' > docs/README.md
```

在 `package.json` 中添加一些 scripts

```js
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```

> 注：启动脚本 `docs:dev` 键值可以自定义修改，此处是为了和一些项目中默认脚本中自带的 dev 区分开，都是等效于执行vuepress  dev doc，根据你目录中的.vuepress配置项和docs下的所有.md/.html文件做一个项目的编译和打包。

4）本地启动服务器

```bash
yarn docs:dev # npm run docs:dev
```

报错：`error:0308010C:digital envelope routines::unsupported`

原因：Node.js 的版本太高，在 Node.js V17 版本中发布的 OpenSSl3.0 对允许算法和密钥大小增加了严格的限制，可能会对生态系统造成影响。

解决方法：

①命令行输入：`$env:NODE_OPTIONS="--openssl-legacy-provider"`

②主动降低 Node.js 的版本，即卸载新版本，重装旧版本。在实际开发中，要求每一个开发人员都因为一个项目而降低版本不合理，有的开发人员有多个项目，会连锁反应。

> node.js 修改为不高于 16 的版本

③使用环境变量临时解决 (不要在开发工具的终端输入)

windows 环境管理员运行命令窗口

```bash
set NODE_OPTIONS=--openssl-legacy-provider 
```

 Linux 或者 WSL 环境

```bash
export NODE_OPTIONS=--openssl-legacy-provider
```



# vuepress目录结构说明

  VuePress 遵循 **“约定优于配置”** 的原则，推荐的目录结构如下：

```
.
├── docs
│   ├── .vuepress (可选的)
│   │   ├── components (可选的)
│   │   ├── theme (可选的)
│   │   │   └── Layout.vue
│   │   ├── public (可选的)
│   │   ├── styles (可选的)
│   │   │   ├── index.styl
│   │   │   └── palette.styl
│   │   ├── templates (可选的, 谨慎配置)
│   │   │   ├── dev.html
│   │   │   └── ssr.html
│   │   ├── config.js (可选的)
│   │   └── enhanceApp.js (可选的)
│   │ 
│   ├── README.md
│   ├── guide (一般用户都在这个目录下创建网站指南,当然可以不用)
│   │   └── README.md （指南里面的具体内容）
│   └── config.md
│ 
└── package.json 项目初始化时，根目录下自动生成的配置文件,定义了项目的基本配置信息及需要依赖的各个模块、指定运行脚本命令的npm命令行缩写等。
```

- docs/.vuepress: 用于存放全局的配置、组件、静态资源等。
- docs/.vuepress/components: 该目录中的 Vue 组件将会被自动注册为全局组件。
- docs/.vuepress/theme: 用于存放本地主题。
- docs/.vuepress/styles: 用于存放样式相关的文件。
- docs/.vuepress/styles/index.styl: 会被自动应用的全局样式文件，会生成在最终的 CSS 文件结尾，具有比默认样式更高的优先级。
- docs/.vuepress/styles/palette.styl: 用于重写默认颜色常量，或者设置新的 stylus 颜色常量。
- docs/.vuepress/public: 静态资源目录。
- docs/.vuepress/templates: 存储 HTML 模板文件。
- docs/.vuepress/templates/dev.html: 用于开发环境的 HTML 模板文件。
- docs/.vuepress/templates/ssr.html: 构建时基于 Vue SSR 的 HTML 模板文件。
- docs/.vuepress/config.js: 配置文件的入口文件，也可以是 YML 或 toml。
- docs/.vuepress/enhanceApp.js: 客户端应用的增强。



# 默认主题设置

## 1. 首页

通过配置根路径下的README.md文件实现的、而一些，导航栏、侧边栏，则是通过配置 `docs/config.js` 实现。

 在 `.vuepress` 中创建 public 文件夹和 `config.js` 文件，这也是最简单的目录格式：

```
VuePressBlog
├─── docs
│   ├── README.md
│   └── .vuepress
│       ├── public
│       └── config.js
└── package.json
```

官网给默认的主题提供了一个首页（Homepage）的布局。

> 注：根路径默认的README.md，会被编译成index.html文件

```
---
home: true
heroImage: /logo.jpg
actionText: 快速上手 →
actionLink: /zh/guide/
features:
- title: 简洁至上
  details: 以 Markdown 为中心的项目结构，以最少的配置帮助你专注于写作。
- title: Vue驱动
  details: 享受 Vue + webpack 的开发体验，在 Markdown 中使用 Vue 组件，同时可以使用 Vue 来开发自定义主题。
- title: 高性能
  details: VuePress 为每个页面预渲染生成静态的 HTML，同时在页面被加载的时候，将作为 SPA 运行。
footer: MIT Licensed | Copyright © 2018-present Evan You
---
```

再添加一些基本配置：修改 `docs/config.js` 文件

```js
module.exports = {
    title: '网站的标题',  
    description: '网站描述', // 它将会以 <meta> 标签渲染到当前页面的 HTML 中。
    head: [
      ['link', { rel: 'icon', href: '/logo.png' }] // 需要被注入到当前页面的 HTML <head> 中的标签
    ],
}
```



## 2. 导航栏

关于导航栏可以设置：页面标题、搜索框、 导航栏Logo/链接、多语言切换、仓库链接等。

### 2.1 导航栏 Logo

可以通过 `themeConfig.logo` 增加导航栏 Logo

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    logo: '/new_logo.jpg',
  }
}
```

### 2.2 导航栏链接

可以通过 `themeConfig.nav` 增加一些导航栏链接

```js
// 配置导航栏logo(themeConfig.logo)
module.exports = {
  themeConfig: {
    logo: '/dh_logo.jpg',
    nav: [
      { text: 'Home', link: '/' },
      // 可指定链接跳转模式：默认target: '_blank'新窗口打开，_self当前窗口打开
      { text: '百度', link: 'https://www.baidu.com' },
      { text: 'CSDN', link: 'https://blog.csdn.net', target: '_blank' },
      { text: '豆瓣', link: 'https://movie.douban.com', target: '_self', rel: '' },
      // 支持嵌套,形成下拉式的导航菜单
      {
        text: '语言',
        ariaLabel: 'Language Menu',
        items: [
          { text: '中文', link: '/language/chinese/' },
          { text: '英文', link: '/language/english/' }
        ]
      }
    ],
    // 禁用导航栏
    navbar: false
  }
}
```

### 2.3 侧边栏

配置 `themeConfig.sidebar`，`sidebar`可以分为全局设置以及局部设置

如果配置单页的侧边栏，只需要使用 **sidebar: 'auto'** 属性即可帮我们完成自动补充侧边栏

#### 全局属性设置(.vuepress/config.js) 中配置：**sidebar: 'auto'**

1）单页侧边栏设置

方式一

vuepress的文件寻址，不同类型的文件都已经预设好不同的默认路径

- 图标/图片等**静态资源**相关的，第一个 '/' 默认指向的是 docs/.vuepress/public/
- 侧边栏/导航栏链接的markdown文件，**第一个 '/' 默认指向的是 docs/**，这里是都放置在docs/xxx里，所以通常把目录建在docs下
- 嵌入在markdown中使用的Vue组件，放置在docs/.vuepress/components目录中

> 注：为此我们的路径最好是按规范来放置文件。找不到对应的文件，则会跳出404

```js
themeConfig: {
    logo: '/dh_logo.jpg',
    nav: [
      // 直接跳转，'/'为不添加路由，跳转至首页，以/结尾的最终对应的都是/index.html,也就是README.md文件编译后的页面
      { text: 'Home', link: '/' },
      // 对应blog/fontend/README.md
      { text: '前端', link: '/blog/fontend/' },
      { text: '后端', link: '/blog/backend/' },
      // 对应/guide/guide.md
      { text: '导航', link: '/guide/guide' },
      // 不指定深度，默认深度1-提取h2 最大深度-2，同一标题下最多提取到h3，想要改变深度可以指定sidebarDepth
    ],
    // 禁用导航栏
    // navbar: false,
    // 设置自动生成侧边栏
    sidebar: 'auto',
  }
```

方式二

在markdown文件的顶部写上下面代码：

```
# 自动补充侧边栏
---
sidebar: auto
---
 
# 禁用侧边栏
---
sidebar: false
---
```

2）设置侧边栏标题显示的层数

官网上提到了这样一个属性：sidebarDepth，可以通过在配置文件中配置`themeConfig.sidebarDepth`来设置嵌套层级。

默认情况下，侧边栏会自动显示当前页面的标题(h2~h3)组成的链接，所以上面的案例中我们看到都是 h2和 h3 可以被点击。

sidebarDepth可设置的值：

| 值   | 说明                                             |
| ---- | ------------------------------------------------ |
| 0    | 禁用标题（headers）链接                          |
| 1    | 默认值,只显示`h2`的标题                          |
| 2    | 可设置的最大值，再大无效, 同时提取`h2`和`h3`标题 |

> 注：如果设置 ` sidebar: 'auto' `，侧边栏会显示 `h2` 和 `h3 `标题，此时sidebarDepth的值只有0是生效的(仅显示`h2`的标题)

```
...
sidebar: 'auto',
// 设置深度，使用了sidebar: 'auto'的话只有设置0才会生效，否则默认2
sidebarDepth: 0,
...
```

3）数组-侧边栏分组

分组：侧边栏的每个子组默认是可折叠的，可以设置 `collapsable: false` 来设置分组为展开状态。

```js
...
sidebar: [
      {
        title: '分组1 前端',
        collapsable: false,
        children: [
          '/blog/fontend/myhtml',
          ['/blog/fontend/myJavascript', '自定义的标题']
        ],
      },
      {
        title: '分组2 后端',
        collapsable: true,
        children: [
          '/blog/backend/myjava',
        ]
      }
    ],
sidebarDepth: 2,
...
```

4）对象：一个/多个侧栏

```js
sidebar: {
      //对象的默认路径
      '/blog/fontend/'[
        '', 
          //侧边栏第一个页面是：/blog/fontend/README.md,、链接文字自动获取(页面的第一个header)，即h1(前端技术)
        'myhtml',  
          //侧边栏第二个页面是：/blog/fontend/myhtml.md,链接文字自动获取(页面的第一个header)，即h2(html 二级标题)
        ['myJavascript', '自定义的标题'] 
          //侧边栏第三个页面是：/blog/fontend/myJavascript.md ,指定链接的文字，使用一个格式为 [link, text] 的数组
      ]
    },
    sidebarDepth: 2,
```

> sidebar: { '/blog/fontend/': [数组中只定义字符串（文件路径），则侧边栏页面的链接文字是当前页面中的第一个header)]}

> sidebar: { '/blog/fontend/': [数组中嵌套数组，数组的第一个参数为文件路径，而第二个参数为侧边栏页面的链接文字]}

也可以在markdown文件中指定名字，作为自定义标题

```
---
title: 自定义标题
---
```



#### 局部属性设置(.md)

1）单页侧边栏设置

```
---
sidebar: 'auto'
---
```

2）单页侧边栏禁用

```
---
sidebar: false
---
```



## 其他配置

### 1）搜索框

内置搜索

只会为页面的标题、h2 、 h3 以及 tags 构建搜索索引。 如需全文搜索，可以使用 Algolia 搜索。官网提供给我们的内置搜索配置项

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    search: false, // 设置是否使用导航栏上的搜索框
    searchMaxSuggestions: 10  // 搜索框显示的搜索结果数量
  }
}
```

 Algolia 搜索

 第三方免费搜索服务 algolia需要注册

### 2）更新时间

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    lastUpdated: 'Last Updated', // string | boolean
  }
}
```

由于 `lastUpdated` 是基于 `git` 的, 所以只能在一个基于 `git` 的项目中启用它。在本地将文件提交到本地仓库也可以看到`lastUpdated`。



### 3）上一篇/下一篇

```
themeConfig: {
    // 默认值是 true 。设置为 false 来禁用所有页面的 下一篇 链接
    nextLinks: false,
    // 默认值是 true 。设置为 false 来禁用所有页面的 上一篇 链接
    prevLinks: false
  }
```

```
---

prev: ./some-other-page

next: false

---
```







报错：yarn 安装依赖报错 error An unexpected error occurred: 

原因：镜像源下载出错

解决方法

```
yarn config set registry https://registry.npm.taobao.org
```

```
npm config set registry https://registry.npm.taobao.org
```

报错：unable to verify the first certificate

原因：证书有关。由于 `yarn install` 或 `npm install` 走的是 HTTPS 协议，它的安全通过数字证书来保障。数字证书由专门机构颁发，通常是付费的。自签证书，就是自己扮演数字证书机构给自己颁发的证书。

其中 npm 与证书相关的配置有两项

- ca - 用于指定信任的证书颁发机构（Certificate Authority）。默认为 `null`，表示仅允许「已知且可信的」证书颁发机构所颁发的证书。
- strict-ssl- 通过 https 向注册表发出请求时是否进行 SSL 密钥验证，若校验失败，npm 将无法连接到服务器并报错。默认为 `true`。

解决方法：

在确定「安全」的情况下，可以临时关闭 `strict-ssl` 选项：

```
$ yarn config set strict-ssl false
$ npm config set strict-ssl false
```

禁止执行远程脚本的错误：可以执行：`Set-ExecutionPolicy -Scope CurrentUse`，输入 `RemoteSigned`



# GitHub 部署

构建目标文件

```
yarn docs:build
```

查看远程仓库

```
git remote -v
```

添加远程仓库

```
git remote add gitee git@gitee.com:meizhaohui/vueblog.git
```

上传远程仓库

```
git add .
git commit -m "<commit描述>"
git pull origin master
```

报错：`fatal: Could not read from remote repository`

原因

- 客户端与服务端未生成 ssh key
- 客户端与服务端的ssh key不匹配

解决方案

1）生成新的SSH key

```
ssh-keygen -t rsa -C "youremail@example.com
```

如果是客户端与服务端未生成ssh key，那么直接使用 生成新的rsa密钥即可。

如果是客户端与服务端的ssh key 不匹配，此时需要先将本地生成的 id_rsa以及id_rsa.pub这两个文件【一般在用户名下的.ssh文件夹下】删除掉，然后再使用上述指令生成新的rsa密钥。

2）将SSH key 添加到 ssh-agent

使用 `ssh-add ~/.ssh/id_rsa` 将产生的新ssh key添加到ssh-agent中：

补充： 如果出现“Could not open a connection to your authentication agent.”的错误可以使用以下两种方式解决：

```
eval "$(ssh-agent -s)"
```

或者：

```
eval `ssh-agent`
```

然后再次执行 `ssh-add ~/.ssh/id_rsa` 指令。

将SSH key 添加到你的GitHub账户

  在账户选项中选择 “*Settings*”–>“*SSH and GPG keys*”–>“*New SSH key*”，然后打开之前新生成的id_rsa.pub文件，将密钥复制后填写到账户中【注意填写时的格式要求】：

验证key

```
ssh -T git@github.com
```

配置成功可以再次执行`git push` 操作将本地仓库推送到远程。

注： 以上操作命令均在 Git Bash 中完成。



报错：`The RSA host key for github.com has changed,and the key for the corresponding IP address xxx.xx.x.x`

原因：本地计算机 known_hosts 中记录的 git 服务器的公钥和实际返回的公钥不匹配。

解决方法：更新一下 `C:\Users\xxx\.ssh\known_hosts` 中的记录 (或者直接删除重新生成)