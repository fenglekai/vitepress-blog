# Linux命令

## System limit for number of file watchers reached

解决：

```
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```



## 修改目录权限

```
1.更改目录所有者命令:
chown -R 用户名称 目录名称
2.更改目录权限命令:
chmod -R 755 目录名称
```

## apt-get代理设置

```
# /etc/apt/apt.conf
Acquire::http::proxy "http://username:password@ip:port/";
```

## 设置bash代理

```
# ~/.bashrc
export HTTP_PROXY=http://username:password@ip:port
```

## 更新系统

```
yum update -y
# /var没有空间可以更改/etc/yum.conf文件下的缓存目录
```

## 防火墙开启/关闭端口

```
# 关闭端口号
iptables -A OUTPUT -p tcp --dport 端口号-j DROP
# 开启端口号
iptables -A INPUT -ptcp --dport  端口号-j ACCEPT
# 保存
service iptables save
# 查看端口状态
netstat -tunlp
```

## tree命令

```
# 以树形结果输出目录
# -d 只显示目录
# -L Level 限制深度层级
# -I file 需要忽略的文件
# > file 输出到文件
tree -d -L 3 -I "node_modules|.git|dist|" > ./tree.txt
```

## 删除匹配文件

```
sudo rm $(find ./ -name '10.124.131*')
```

## 查看占用端口

```
netstat -anp | grep 8000
```

## 设定有线无线网络共用

```
route -n
sudo route add default gw 192.168.43.1
sudo route add -net 10.0.0.0 netmask 255.0.0.0 gw 10.161.8.1 dev enp2s0
```

## 更新蓝牙驱动

```
sudo apt install bluetooth blueman
```

## 禁止/启用中键粘贴

```
# 禁止
xmodmap -e "pointer = 1 25 3 4 5 6 7 8"
# 启用
xmodmap -e "pointer = 1 2 3 4 5 6 7 8"
```

## 重启网络服务

```
sudo service network-manager restart
```

## 修改本地时区

```
sudo timedatectl set-timezone Asia/Shanghai
sudo timedatectl set-local-rtc 1
```

