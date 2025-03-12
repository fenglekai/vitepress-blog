import Theme from "less-write-vitepress-theme/es/theme";
import Layout from "./Layout.vue";
import './custom.css'
import Twikoo from './components/Twikoo.vue';

export default {
  extends: Theme,
  // 使用注入插槽的包装组件覆盖 Layout
  Layout,
  enhanceApp({ app, router, siteData }) {
    // ...
    app.component("Twikoo", Twikoo);
  },
};
