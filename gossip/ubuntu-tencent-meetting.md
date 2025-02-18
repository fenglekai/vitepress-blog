# Ubuntu下腾讯会议不支持Wayland

> [Ubuntu安装腾讯会议提示不支持wayland_检测到窗口系统采用wayland协议,腾讯会议暂不兼容-CSDN博客](https://blog.csdn.net/qq_63844528/article/details/127082660)

需要修改GDM3的配置

```
sudo nano /etc/gdm3/custom.conf
# 把这行配置注释取消
# WaylandEnable=false
sudo service gdm3 restart
```

关闭WaylandEnable后可正常使用腾讯会议，但是无法开启Ubuntu自带的应用商店。需要使用应用商店再把注释开启就好了
