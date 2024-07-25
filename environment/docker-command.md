# Docker 常用命令

## 换源

```
sudo vim /etc/docker/daemon.json
```



## 代理设置

### 创建目录

```
mkdir /etc/systemd/system/docker.service.d
```

### 新建文件

```
vim /etc/systemd/system/docker.service.d/http-proxy.conf

# 写入代理配置
[Service]
Environment="HTTP_PROXY=http://username:password@192.168.1.1:8080/"
Environment="HTTPS_PROXY=https://username:password@192.168.1.1:8080/"
Environment="NO_PROXY= hostname.example.com,172.16.0.12"
```

### 重启服务

```
systemctl daemon-reload
systemctl restart docker
# 验证
systemctl show docker --property Environment
```



## 常用

```
# 查看docker image id
docker images
# 查看正在运行的docker容器
docker ps
# 进入某个docker容器
docker exec -it [容器id] bash
# 以root登录容器
docker exec -u root -it [容器id] bash
```



```
# 容器中nginx配置文件路径
/etc/nginx/conf.d/default.conf
# 复制docker容器下文件
docker cp [需要复制的文件] [粘贴的位置]
# 重载单个容器的nginx配置
docker exec [容器id] nginx -s reload
```



```
# 查看某个容器的映射
docker inspect container_name | grep Mounts -A 20
# container_name是容器名也可以输入容器ID
# 20是从Mounts找到第20行输出
```



```
# 镜像迁移
# 导出
docker save image-name:tag > images-name.gz
# 导入
docker load < images-name.gz
```



```
# 容器迁移
# 导出
docker export container-name | gzip > container-name.gz
# 导入
cat container-name.gz | docker import - image-name:v1.0

```



```
# 利用commit重构镜像
docker stop container01

docker commit container01 new_image:tag

docker run --name container02 -p 80:80 new_image:tag

```



```
# 查看容器日志
docker logs --tail 10 [container id]
```



```
sudo docker run -itd --restart always -p 8765:8765 --name mcs_middle_server -v ~/mcs-koa-server:/code/mcs-koa-server node:15.9.0

-i: 以交互模式运行容器，通常与 -t 同时使用；
-t: 为容器重新分配一个伪输入终端，通常与 -i 同时使用；
-d 运行后返回容器ID
-p 端口映射
--name 容器名
--net 容器使用网络
-v 目录映射
```



## dockerfile指令

```
FROM 指定基础镜像
ENV 配置环境变量
WORKDIR 指定工作目录
COPY 拷贝 package.json 等配置文件到工作目录
RUN 执行命令安装依赖
COPY 拷贝项目文件 app.js 等到指定工作目录
EXPOSE 对外暴露 8888 端口
CMD 执行命令启动项目
ENTRYPOINT 入口点

```



## Docker compose常用指令

```
# 以后台模式建立compose
docker-compose up -d
# 停止compose并删除对应本地构建的镜像
docker-compose down --rmi local
```



## gitlab 迁移

### 数据备份

```
gitlab-rake gitlab:backup:create
备份文件存默认到 /var/opt/gitlab/backups
可以编辑 /etc/gitlab/gitlab.rb 修改默认目录
```

### 安装gitlab

```
必须是相同版本的gitlab
可以通过save load迁移镜像
docker run -d --name gitlab -p 8860:8860 -p 8861:22 --net gitlab-net --restart always -v /data/gitlab/config:/etc/gitlab -v /data/gitlab/logs:/var/log/gitlab -v /data/gitlab/data:/var/opt/gitlab gitlab/gitlab-ce:12.9.7-ce.0
```

### 恢复数据

```
#拷贝文件
docker cp 1658339146_2022_07_20_12.9.7_gitlab_backup.tar {container id}:/var/opt/gitlab/backups
# 进入docker
docker exec -it gitlab bash 
cd /var/opt/gitlab/backups
#修改备份文件的所有者为git
chown git:git 1658339146_2022_07_20_12.9.7_gitlab_backup.tar
#恢复还原数据
gitlab-rake gitlab:backup:restore BACKUP=1658339146_2022_07_20_12.9.7
```

> 最后记得手动配置gitlab.rb
