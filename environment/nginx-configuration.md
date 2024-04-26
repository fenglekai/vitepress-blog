# Nginx配置

## vue打包文件刷新页面返回nginx 404

```
# 刷新页面返回nginx 404,nginx location / 配置
try_files $uri $uri/ /index.html;

# 若打包文件不在根目录需添加配置
location ^~/A {
    alias /XX/A;//此处为A的路径
    index index.html;
    try_files $uri $uri/ /A/index.html;
}
```

## 配置数据库,ssh反向代理

```
stream {    
    
    upstream oracle {   
        server 192.168.21.213:1521 weight=1 max_fails=2 fail_timeout=30s;   #原oracle地址
    }
    
 server {
        listen       3335;# 反向代理后监听的端口,nginx启动后访问192.168.21.100:3335就可以访问到oracleA
        proxy_connect_timeout 1s;
        proxy_timeout 3s;
        proxy_pass oracle;
    }

————————————————
版权声明：本文为CSDN博主「lightingZZ」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/u014265442/article/details/114932253
```

