module.exports = {
    title: 'youcome',  
    description: '个人技术博客', // 它将会以 <meta> 标签渲染到当前页面的 HTML 中。
    head: [
      ['link', { rel: 'icon', href: '/logo.jpg' }] // 需要被注入到当前页面的 HTML <head> 中的标签
    ],

    plugins: ['@vuepress/back-to-top'],

    themeConfig: {
      // 导航栏logo
      logo: '/logo.jpg',

      // 禁用导航栏
      // navbar: false,
      nav: [
        { text: 'Home', link: '/' },
        // 对应docs/xxxx/xxxx

        // 对应/guide/README.md 导航文件
        { text: '导航', link: '/guide/README.md' },
        // 不指定深度，默认深度1-提取h2 最大深度-2，同一标题下最多提取到h3
        // 改变深度可以指定sidebarDepth

        {
          text: 'CS基础',
          ariaLabel: 'Language Menu',
          items: [
            { text: '计算机网络体系', link: '/blog/NetWork/' },
          ]
        },

        { text: '前端', link: '/blog/Fontend/' },
        { text: '后端', link: '/blog/Backend/' },

        {
          text: '计算机网络',
          ariaLabel: 'Language Menu',
          items: [
            { text: '计算机网络体系', link: '/blog/NetWork/' },
          ]
        },

        {
          text: '操作系统',
          ariaLabel: 'Language Menu',
          items: [
            { text: '系统原理', link: '/blog/OperatingSystem/' },
            { text: 'Linux', link: '/blog/OperatingSystem/' },
          ]
        },

        {
          text: '博客',
          ariaLabel: 'Language Menu',
          items: [
            { text: '介绍', link: '/blog/BlogBuilding/' },
            { text: 'GitHub', link: 'xxxx', target: '_blank'},
          ]
        },
        
        // 可指定链接跳转模式：默认target: '_blank'新窗口打开，_self当前窗口打开
        { text: 'GitHub', link: 'https://github.com/youcome22', target: '_blank'},
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
      
      // 设置自动生成侧边栏
      //sidebar: 'auto',
      // 使用了sidebar: 'auto'的话只有设置0才会生效，否则默认2
      //sidebarDepth: 0,
      sidebarDepth: 2,
      sidebar: {
        //对象的默认路径
        '/blog/NetWork/':
        [
          ['', '前言'],
          //侧边栏第一个页面是：/blog/NetWork/README.md
          ['计算机网络学习笔记', '计网笔记'], 
          //侧边栏第二个页面是：/blog/NetWork/xxx.md,链接文字自动获取(页面的第一个header)
          ['图解计算机网络', '图解网络'],
          //侧边栏第三个页面是：/blog/NetWork/xxx.md
          //指定链接的文字，使用一个格式为 [link, text] 的数组。
        ],

        '/blog/OperatingSystem/':
        [
          ['', '前言'],
          ['操作系统学习笔记', '操作系统笔记'],
          //侧边栏第一个页面是：/blog/OperatingSystem/xxx.md,链接文字自动获取(页面的第一个header)
          ['编程环境和软件工具安装手册', '环境'], 
          //侧边栏第二个页面是：/blog/OperatingSystem/xxx.md,链接文字自动获取(页面的第一个header)
          //['myJavascript', 'js自定义的标题'] 
          //侧边栏第三个页面是：/blog/OperatingSystem/xxx.md
          //指定链接的文字，使用一个格式为 [link, text] 的数组。
        ],

        '/blog/BlogBuilding/':
        [
          ['', '前言'],
          ['VuePress个人博客搭建', '搭建'],
        ]

      },

      //search: false, // 设置是否使用导航栏上的搜索框
      searchMaxSuggestions: 10,  // 搜索框显示的搜索结果数量
      lastUpdated: 'Last Updated', // string | boolean 更新时间

      // 默认值是 true 设置为 false 来禁用所有页面的 下一篇 链接
      nextLinks: true,
      // 默认值是 true 设置为 false 来禁用所有页面的 上一篇 链接
      prevLinks: true
      
    }

}