# GitLab 迁移

## 数据备份

```
gitlab-rake gitlab:backup:create
# 备份文件存默认到 /var/opt/gitlab/backups
```

## 安装gitlab

```
# 必须是相同版本的gitlab
# 可以通过save load迁移镜像
docker run -d --name gitlab -p 8860:8860 -p 8861:22 --net gitlab-net --restart always -v /data/gitlab/config:/etc/gitlab -v /data/gitlab/logs:/var/log/gitlab -v /data/gitlab/data:/var/opt/gitlab gitlab/gitlab-ce:12.9.7-ce.0
```

等待gitlab加载完成进入登录页面正常显示后修改配置`gitlab.rb`

```
# 浏览器输入访问gitlab的地址，不写端口默认80，示例: 'http://10.123.35.8:8080'
external_url 'GENERATED_EXTERNAL_URL'
# 在git clone复制地址时需要带上的端口
gitlab_rails['gitlab_shell_ssh_port'] = 22
```

## 恢复数据

```
# 拷贝文件
docker cp 1658339146_2022_07_20_12.9.7_gitlab_backup.tar gitlab:/var/opt/gitlab/backups
# 进入docker
docker exec -it gitlab bash 
cd /var/opt/gitlab/backups
# 修改备份文件的所有者为git
chown git:git 1658339146_2022_07_20_12.9.7_gitlab_backup.tar
# 停止gitlab数据连接服务
gitlab-ctl stop unicorn
gitlab-ctl stop sidekiq
# 恢复还原数据
gitlab-rake gitlab:backup:restore BACKUP=1658339146_2022_07_20_12.9.7
```

