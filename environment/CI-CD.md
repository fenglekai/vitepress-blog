# 构建Jenkins+Github自动化部署流程

## 需要环境

- java 17 (jdk-17_linux-x64_bin.rpm我使用的安装包，可根据自己本机下载对应ORACAL JAVA版本)
- Docker（非必须，为了适应不同项目需要的编程语言node、python、go等）

## 下载WAR包

> 虽然Docker Hub有对应的Jenkins镜像，但是本人踩过坑并不是很好用。会出现很多权限、路径、安全性的一些问题

在[官网下载](https://www.jenkins.io/download/)LTS长久支持版，此文档使用的是2.387.3LTS版本

## 部署Jenkins

### 使用nohup后台运行Jenkins

```
nohup java -jar jenkins.war --httpPort=8080 &
```

### 使用tail查看后台日志

```
tail -f nohup.out
```

### 使用ip+端口访问Jenkins页面

等待 **解锁 Jenkins** 页面出现，在`/var/jenkins_home/secrets/initialAdminPassword`查看密匙并解锁进入下一步。

### 插件配置

使用默认提供的**安装建议的插件** - 安装推荐的一组插件，这些插件基于最常见的用例，后面再根据需求自己安装其他插件。

### 创建管理员账号

设置自己熟悉的账号和密码就行。之后进入主界面

## 检查问题以及配置其他插件

### 查看右上角导航栏的黄色与红色问题

黄色一般是插件相关问题，红色则是系统配置相关。

像我刚进入主页面就看见关于commons-text API Plugin插件找不到的问题。然后我重启了Jenkins就没事了，在插件管理-Download progress最下方勾选**安装完成后重启Jenkins(空闲时)**选项开始重启。

还有一个是叫你去配置从节点或者集群，~~这个可以先去插件管理-Available plugins中找到Docker plugin下载安装。在节点列表-Configure Clouds中Add a new cloud选择Docker后出现一栏默认Docker配置点下方保存。之后还会提示master节点设置从节点为0的告警提示，直接点击Manage去配置第一个栏位设置为0~~。因为不太会配置这些会出现卡住流水线**等待下一个可用的执行器**的问题。所以这个问题我没有解决。

### 添加BlueOcean插件

去插件市场把Blue Ocean插件下载，这是可视化Jenkinsfile配置及运行相关的Web界面。

## 配置与Github项目关联

### Github生成Token

在Github-Setting-Developer settings-Personal access tokens，选择Token (classic)生成读写repo相关权限的token

### Jenkins创建流水线配置

1. 先进入Blue Ocean创建流水线选择Github代码仓库之后会要你输入token确认连接
2. 选择账号和项目创建流水线
3. 然后我们回到Jenkins的主菜单看到生成了一条项目名称的记录，点名称进入到详情-配置中。在分支源选择添加凭据，添加一条Jenkins的全局凭据，类型是用户名和密码，用户名是你的github用户名或者账号，密码是刚刚生成的token，其他的根据自己需求填写，id和描述我都是github-token。
4. 添加完在下发HTTPS地址的右边有个验证按钮，Credentials ok. Connected to XXX说明连接成功了。（之前出现过连接失败，是因为这个用户名和密码不能用github的登录账号和密码）
5. 之后配置继续往下找到**扫描仓库触发器**，勾选**Periodically if not otherwise run**选择间隔5 minutes。
6. 之后回到项目流水线界面点击**立刻扫描仓库**，扫描完成会进行初始构建，先结束它，因为我们还没有配置其他token连不上gihub。（我一直觉得为什么不能统一配置很麻烦）
7. 回到主菜单进入系统配置-Github，选择添加Github服务器，名称githubserver，URL默认，添加凭据。注意添加的凭据类型选择**Secret text**，ID和描述设置为api-server。添加后同样选择凭据后连接测试一般不出现红色报错就是连接成功了。
8. 配置完三个token后就可以开始尝试构建流水线了。（因为我的流水线环境使用的是docker镜像，所以我之前说用docker创建jenkins是有问题的。首先我的项目是在本机nginx部署的，并不是在docker打包，所以会出现在jenkins使用docker的权限问题，以及它流水线再次使用其他镜像层层嵌套，以至于目录复杂的问题，**最严重**的还是运行流水线时先要去fetch仓库，然后超时的问题，很多都是说git的代理配置，但是我判断是docker容器桥接网络出现的问题，所以我放弃了，在本机部署比较方便）

### 出现ERROR: Error fetching remote repo 'origin'错误（**Checkout SCM**报错）可以尝试下面的操作

#### 方法1：

在分支源-Add选项添加General配置：

- **Clean before checkout**
- **Clean after checkout**
- **Check out to matching local branch**

前两项有个Delete untracked nested repositories的选项记得打钩，修改完保存，重新构建。

#### 方法2：

在Blue Ocean项目流水线构建最后一步加上`Clean workspace`的步骤，在步骤里找到`Delete workspace when build is done`内置步骤。之后勾选配置，保存重构。

- CleanWhenAborted
- CleanWhenFailure
- CleanWhenNotBuilt
- CleanWhenSuccess
- CleanWhenUnstable
- CleanupMatrixParent
- DeleteDirs

网上搜到的思路是因为本地存在相同的配置所以要先清空本地目录（按理来说Jenkins会想到这步，不懂为什么会卡在**Checkout SCM**）。

### Github项目配置

设定上传触发流水线，在github项目下选择项目的Setting-Webhooks-Add webhook，配置Payload URL为你的jenkins地址，例如`http://ip:port/github-webhook/`，注意后面拼接github-webhook后缀，其他默认就好。