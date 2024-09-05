# 关于为什么使用rebase与遇到的问题

- 为什么使用`git rebase`而不是`merge`？

每次去`merge`代码时会产生多余提交记录，在历史图表里显示会出现多个分叉历史。讲道理我不怎么在乎，不就是多一条commit吗，而且可以更好的辨别不同人的commit与merge历史。

![image-20240905140829552](https://raw.githubusercontent.com/fenglekai/image-bed/master/image-20240905140829552.png)



但是处于好奇心理还是去尝试了一下。

1. 首先先使用`git fetch`获取远程仓库的代码

2. 然后`git rebase origin/main`，这里如果你的工作区还有变更他会提示请先提交或贮藏。

   正常情况：

   ![image-20240905142446091](https://raw.githubusercontent.com/fenglekai/image-bed/master/image-20240905142446091.png)

   异常情况：![image-20240905142049514](https://raw.githubusercontent.com/fenglekai/image-bed/master/image-20240905142049514.png)

3. 再次查看图表会发现并没有多余的commit，确实很爽哈。

   ![image-20240905142642200](https://raw.githubusercontent.com/fenglekai/image-bed/master/image-20240905142642200.png)



还没有试过`git pull --rebase`，大概会好用吧。