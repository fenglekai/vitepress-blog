# Drone 部署相关

> Drone 是一个现代化的持续集成平台，它使忙碌的团队能够使用强大的云原生流水线引擎自动化他们的构建、测试和发布工作流。
>
> [中文文档](https://drone.cool/)
>
> [官方文档](https://docs.drone.io/)

Drone是一个开源的持续集成和持续交付（CI/CD）工具，旨在简化和自动化软件开发和部署过程。它支持多种编程语言，包括Go、Python、Ruby等，可以轻松集成到现有的开发流程中。Drone提供了丰富的插件系统，使用户可以根据需求定制自动化流程，从代码质量检查到部署到生产环境，都可以通过Drone实现。

Drone的主要特点包括：

- **易于使用**：友好的界面和简单的配置使用户能够快速上手。
- **高效**：通过并行执行任务，提高了CI/CD流程的效率。
- **灵活**：支持多种编程语言和工具，可以与其他CI/CD工具无缝集成。
- **开源**：开源代码和社区支持，使用户可以自由地修改和扩展功能。

总的来说，Drone是一个强大的CI/CD工具，能够帮助开发团队提高生产力，减少人为错误，提高软件质量。

![image-20241115104913462](https://raw.githubusercontent.com/fenglekai/image-bed/master/image-20241115104913462.png)

## 安装Server服务

这里我选择的是[与GitHub集成](https://drone.cool/server/provider/github/)，按照步骤走到第四步：启动Drone Server。

```
docker run \
  --volume=/var/lib/drone:/data \
  --env=DRONE_GITHUB_CLIENT_ID=your-id \
  --env=DRONE_GITHUB_CLIENT_SECRET=super-duper-secret \
  --env=DRONE_RPC_SECRET=super-duper-secret \
  --env=DRONE_SERVER_HOST=drone.company.com \
  --env=DRONE_SERVER_PROTO=https \
  --env=DRONE_USER_CREATE=username:fenglekai,admin:true \
  --publish=80:80 \
  --publish=443:443 \
  --restart=always \
  --detach=true \
  --name=drone \
  drone/drone:2
```

**注意：在后面运行CI/CD流程需要开启`Enables privileged container settings`所以必须先设置管理员权限的账号`--env=DRONE_USER_CREATE=username:fenglekai,admin:true`将`fenglekai`替换为你在GitHub上的账号**

### 如何确定自己的用户名？

![image-20241115103536715](https://raw.githubusercontent.com/fenglekai/image-bed/master/image-20241115103536715.png)



## 安装Drone Runner

> `Drone Runner` 会主动轮询服务器以获取要执行的流水线任务。针对不同的用例和运行时环境，`Drone` 提供了不同类型的 `Runner`。你可以选择其中一种或多种不同类型的 `Runner` 进行组合，安装一个或多个 `Runner` 来运行你的流水线。

可以理解为Jenkins上的节点，Runner负责执行流水线任务，多个Runner可以并行执行你不同项目流水线。如果只有一个Runner你的任务只能排队执行。这里选择[Docker Runner -> 在Linux上安装Docker Runner](https://drone.cool/runner/docker/installation/linux/)

**注意：DRONE_RPC_SECRET与Server的值一致**



## 流水线配置

进入Server的UI界面，因为是与GitHub集成，所以在登录界面会跳转到GitHub去绑定账号

![image-20241115105947081](/home/bobby/.config/Typora/typora-user-images/image-20241115105947081.png)



### 激活项目

在与GitHub关联完成后会列出你拥有的仓库，选择一个去Setting页面激活。如果没有激活按钮说明这个项目你没有管理权。

![image-20241115105741482](https://raw.githubusercontent.com/fenglekai/image-bed/master/image-20241115105741482.png)



### 配置权限

需要在Setting -> General -> Project Setting -> 开启Trusted（启用特权容器设置）。如果没有开启该选项在运行任务是会出现没有权限的错误。

![image-20241115110406065](https://raw.githubusercontent.com/fenglekai/image-bed/master/image-20241115110406065.png)



### 编写.drone.yml

> 流水线可帮助你自动化软件交付过程中的步骤，例如启动代码构建、运行自动化测试以及部署到预生产或生产环境。
>
> 流水线的执行由源代码存储库触发。代码更改会触发到 Drone 的 Webhook，后者运行相应的流水线。其他常见的触发器包括自动执行的任务计划或用户启动的工作流。
>
> 通过在 git 存储库的根目录中放置一个 `.drone.yml` 文件来配置流水线。yaml 语法旨在易于阅读和表达，以便查看存储库的任何人都可以理解工作流程。
>
> [不同语言框架的例子](https://drone.cool/pipeline/docker/examples/)

下面例子以Node为镜像构建Vue项目。其中使用到drillster/drone-volume-cache做依赖缓存，并设置Node限制内存`--max-old-space-size=1024`

```
kind: pipeline
type: docker
name: Node use pnpm build
steps:
- name: restore-cache
  image: drillster/drone-volume-cache
  settings:
    restore: true
    mount:
      - ./.npm-cache
      - ./pnpm-lock.yaml
      - ./node_modules
  volumes: 
    - name: cache
      path: /cache

- name: build
  image: node:20
  environment:
    NODE_OPTIONS: --max-old-space-size=1024
  volumes:
    - name: docker-volumes
      path: /docker-volumes/site-index
  commands:
    - npm config set cache ./.npm-cache --global
    - npm config set registry https://registry.npmjs.com
    - npm install -g pnpm
    - pnpm install --frozen-lockfile
    - pnpm build:ali
    - rm -rf /docker-volumes/site-index/*
    - cp -r ./dist/* /docker-volumes/site-index

- name: rebuild-cache
  image: drillster/drone-volume-cache
  settings:
    rebuild: true
    mount:
      - ./.npm-cache
      - ./pnpm-lock.yaml
      - ./node_modules
  volumes:
    - name: cache
      path: /cache


volumes:
- name: docker-volumes
  host:
    path: /www/wwwroot/site-index
- name: cache
  host:
    path: /root/cache/site-index
```



## 总结

比Jenkins轻量，简洁的界面UI，与GitHub集成无需加载过多插件。