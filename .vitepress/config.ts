import { defineConfig } from "vitepress";
import AutoSidebar from "vite-plugin-vitepress-auto-sidebar";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "KAI笔记",
  description: "技术笔记,技术圈,程序员,前端,后端,小程序,安全,运维,软件开发,编程,javascript",
  lastUpdated: true,
  base: "/vitepress-blog/",
  head: [
    ["link", { rel: "icon", href: "/vitepress-blog/favicon.ico" }],
    [
      "meta",
      {
        name: "google-site-verification",
        content: "0BHp5sFcMV4O-g2J4WQquAc2NoQ9i-x1k0svy35BvWY",
      },
    ],
  ],
  themeConfig: {
    logo: "/logo.svg",
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      { text: "前端", link: "/frontend/index" },
      { text: "命令配置", link: "/environment/index" },
      { text: "闲言碎语", link: "/gossip/index" },
      // { text: "Examples", link: "/examples/markdown-examples" },
      {
        text: "开源项目",
        items: [
          {
            text: "Awesome Excel",
            link: "https://github.com/fenglekai/awesome-excel",
            target: "_black",
          },
          {
            text: "Less Write",
            link: "https://github.com/fenglekai/less-write",
            target: "_black",
          },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/fenglekai/vitepress-blog" },
    ],
    lastUpdated: {
      text: "最后更新时间",
      formatOptions: {
        dateStyle: "full",
        timeStyle: "medium",
      },
    },
    search: {
      provider: "local",
    },
    outline: {
      label: "页面导航",
    },
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
    footer: {
      message: "基于 MIT 许可发布",
      copyright: "© 2024 冯乐铠",
    },
  },
  vite: {
    plugins: [
      // 自动生成侧边栏
      AutoSidebar({
        path: "/",
        titleFromFile: true,
        ignoreIndexItem: true,
        ignoreList: [".vscode", "public", "node_modules"],
      }),
    ],
  },
  sitemap: {
    hostname: 'https://blog.devkai.site/vitepress-blog/'
  }
});
