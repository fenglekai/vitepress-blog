---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "前端开发笔记"
  text: "零碎的前端知识"
  tagline: 希望可以帮助到你
  image:
    src: /logo-large.webp
    alt: VitePress
  actions:
    - theme: brand
      text: 前端
      link: /frontend/bit-operator
    - theme: alt
      text: 环境相关
      link: /environment/dbeaver-configuration

features:
  - title: CI/CD
    details: Continuous Integration/Continuous Deployment，持续集成和持续交付/部署，旨在简化并加快软件开发生命周期。 持续集成（CI）是指自动且频繁地将代码更改集成到共享源代码存储库中的做法。
  - title: TDD
    details: Test-Driven Development，测试驱动开发，指的是先写好测试，然后再根据测试完成开发。使用这种开发方式，会有很高的测试覆盖率
  - title: BDD
    details: Behavior-Driven Development，行为驱动开发，指的是写出优秀测试的最佳实践的总称。BDD测试的是行为，即软件应该怎样运行
  - title: CORS
    details: Cross-origin resource sharing，跨源资源共享，通过允许服务器标示除了它自己以外的其他源（域、协议或端口），使得浏览器允许这些源访问加载自己的资源
  - title: XSS
    details: Cross Site Scripting，跨站脚本攻击，是一种安全漏洞，攻击者可以利用这种漏洞在网站上注入恶意的客户端代码
  - title: CSRF
    details: Cross-Site Request Forgery，跨站请求伪造，是一种冒充受信任用户，向服务器发送非预期请求的攻击方式
  - title: px、rem、em
    details: px像素（Pixel），是相对于显示器屏幕分辨率而言的；em是相对长度单位。相对于当前对象内文本的字体尺寸；rem为元素设定字体大小时，仍然是相对大小，但相对的只是HTML根元素
  - title: OSI
    details: Open system interconnection，开放式系统互联参考模型，包括物理层、数据链路层、网络层、传输层、会话层、表示层、应用层
---

