# SSH配置

## Linux本地配置

```
# 进入ssh bash
ssh-agent bash

# 查看添加的密匙
ssh-add -l
# 删除所有密匙
ssh-add -D
# 添加密匙
ssh-add id_rsa
```



```
# 生成指定目录的密匙文件
ssh-keygen -t rsa -b 4096 -C 'fenglekai@gmail.com' -f ~/.ssh/gitlab-rsa
```

