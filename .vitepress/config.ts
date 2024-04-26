import { defineConfig } from "vitepress";
import AutoSidebar from "vite-plugin-vitepress-auto-sidebar";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "前端开发笔记",
  description: "A VitePress Site",
  lastUpdated: true,
  base: "/vitepress-blog/",
  head: [["link", { rel: "icon", href: "/vitepress-blog/favicon.ico" }]],
  themeConfig: {
    logo: "/logo.svg",
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      { text: "前端", link: "/frontend/bit-operator" },
      { text: "环境相关", link: "/environment/dbeaver-configuration" },
      { text: "Examples", link: "/examples/markdown-examples" },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
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
        ignoreList: [".vscode", "public", "node_modules"],
      }),
    ],
  },
});
