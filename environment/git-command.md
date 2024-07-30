# Git常用命令

## 查看用户名和邮箱地址

 `git config user.name  git config user.email`

## 修改用户名和邮箱地址

  `git config --global user.name  "xxxx"   git config --global user.email  "xxxx"`

## 创建SSH密匙

`ssh-keygen -t rsa -C "（邮箱）"`

## 克隆远程仓库

`git clone` 

## 暂存更改

`git add .`

## 提交更改

`git commit -m 'xxxx'`
## 更新commit信息

`git commit --amend`

## 查看提交文件是否修改

`git status`

## 查看历史提交（目标版本）

`git log`

## 查看所有分支

`git branch -a`

## 切换分支

`git checkout (分支名)`

## 从远程分支下载最新代码并合并

`git pull (远程仓库名) (远程分支)`

## 从远程分支上传最新代码并合并

`git push (远程仓库名) (远程分支)` 

## 该选项可以合并两个独立启动仓库的历史

`git pull origin master --allow-unrelated-histories`

## 新建远程仓库地址

`git remote add <远程仓库名> <远程仓库地址>`

## reset

### 回退某次提交及之后的所有提交

`git reset --hard <目标版本>`

### 只回退某次提交，其他保留在工作区和暂存区

`git reset --sort`

### 只回退某次提交，保留在工作区

`git reset --mixed`

## 提交时不会生成新的提交

`git add .`

`git commit --amend`

`git push -f`

## 搁置当前修改

```
git stash
```

### 重新回到被隐藏的更改处

```
git stash pop
```

## 删除本地分支

```
git branch -D dev
```

## 刷新分支

```
git remote update origin --prune
```

## 打标签

### 附注标签

```
 git tag -a v1.0 -m "my version 1.0"
```

### 查看标签

```
git show
```

### 后期打标签

```console
# 查看过去提交commit
git log --pretty=oneline
# 给commit打上标签
git tag -a v1.0 commitkey
```

### 删除标签

```
git tag -d v1.0
```

### 删除远程标签

```
git push origin :v1.0
```

### 推送单个标签

```
git push origin <tagname>
```

### 推送全部标签

```
git push --tags
```

### 原创已有同名标签，删除并推送

```
git push --delete origin <tagname>
```



## 修改本地分支名

```
git branch -m <oldName> <newName>
```

## 设置本地分支与远程分支关联
```
git branch --set-upstream-to=origin/<分支> main
```

## 解决拒绝合并无关的历史
```
git pull origin <branch-name> --allow-unrelated-histories 
```

## 合并特定commit到另一个分支

```
git cherry-pick <commit-id>
```

## error: 您尚未结束您的合并（存在 MERGE_HEAD）

```
git merge --abort
git reset --merge
```

## 撤销某次提交/生成新的commit

```
git revert commit_id
# 其他分支的commit
git revert -m commit_id
# 连续撤销多次
git revert --no-commit commit1..commit2
```

