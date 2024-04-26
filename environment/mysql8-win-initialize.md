# MySQL初始化配置

D:\mysql-8.0.27-winx64根目录下配置

```ini
[client]
# 设置mysql客户端默认字符集
default-character-set=utf8
 
[mysqld]
# 设置3306端口
port = 3306
# 设置mysql的安装目录
basedir=C:\\web\\mysql-8.0.11
# 设置 mysql数据库的数据的存放目录，MySQL 8+ 不需要以下配置，系统自己生成即可，否则有可能报错
# datadir=C:\\web\\sqldata
# 允许最大连接数
max_connections=20
# 服务端使用的字符集默认为8比特编码的latin1字符集
character-set-server=utf8
# 创建新表时将使用的默认存储引擎
default-storage-engine=INNODB
```

设置环境变量（可能没效果）

在path添加**D:\mysql-8.0.27-winx64\bin**目录



管理员命令行进入mysql根目录下

初始化数据库

`.\mysqld --initialize --console`

执行完成会出现初始密码记得备份方便以后修改

`root@localhost: APWCY5ws&hjQ`

安装

`.\mysql install`

启动和关闭mysql

`net start mysql`

`net stop mysql`

登录

`.\mysql -u root -p`

键入密码后执行更新密码，不然会一直提示你更新密码

`alter user 'root'@'localhost' identified by 'new password';`

`flush privileges;`

### 更新一个问题

**mysql8之前的加密规则是mysql_native_password,而在mysql8之后，加密规则是caching_sha2_password.**

所以部分连接数据库会出现`Client does not support authentication protocol requested by server`

#### 查询方式

`select host,user,plugin,authentication_string from mysql.user;`

#### 解决办法

1. 更新你的连接服务加密方式
2. 修改mysql登录密码的加密规则

#### 修改加密规则

```sql
alter user 'root'@'%' identified with mysql_native_password by 'new password';
#更新user为root，host为%的密码为new password(自己设置)

alter user 'root'@'localhost' identified with mysql_native_password by 'new password';
#更新user为root,host为localhost 的密码为new password
```

or

```sql
alter user 'root'@'localhost' identified by 'new password' password expire never;
#修改加密规则
alter user 'root'@'localhost' identified with mysql_native_password by 'new password';
#更新一下用户的密码
```

`flush privileges; #刷新权限`
