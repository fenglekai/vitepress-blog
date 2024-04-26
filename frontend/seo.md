# 前端SEO优化

SEO（Search Engine Optimization）搜寻引擎最佳化，常见的技术优化手段通常是针对于搜索引擎爬虫的，通过建立一系列约定的规则或手段来使得搜索引擎更好地抓取到网站的信息。

## title标签

```html
 <title>这里填写标题</title> 
```

- 一个页面使用一个不重复的标题
- 简单精准，避免通用模糊
- 突出搜索意图

## meta标签

### description

```html
<meta name="description" content="这里填写描述"> 
```

- 一个页面使用一个独立的描述
- 控制内容长度，少于160个字符

### robots

```html
<head> 
  <meta name=”robots” content="${content}"> 
</head>  
<!-- 
content可选：index | noindex | follow | nofollow
index: 告诉搜索引擎收录我 
noindex：告诉搜索引擎不要收录我 
follow：告诉搜索引擎爬取页面的links 
nofollow：告诉搜索引擎不要爬取页面的links
如果不设置此标签，等同于content="index, follow"  
--> 
```

## body内容

- 标题：分级恰当，层级关系明确（标签：h1、h2、h3），标题含义明确

- 文件名称语义化：img文件名称最好是有语义的，能标识该图片内容的

- 图片说明 alt-tag：img标签的alt属性值不能空，要填写该图片的描述

  ```html
  <img src="huyou.jpg" alt="xxxx"> 
  ```

## 语义化链接

- bad case：www.example.com/?p=123456
- good case：www.example.com/topic-name

## 提升网站速度

 测速工具：

https://developers.google.com/speed/pagespeed/insights/

## 信息提供

### sitemaps网站地图

提供给搜索引擎网站地图信息的协议，通过它可以告知搜索引擎关键path信息，类似网站的目录，可以手动配置，也可以使用生成器自动生成：https://www.xml-sitemaps.com/

> 配置生成后放到网站根目录