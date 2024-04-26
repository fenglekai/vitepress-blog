# 前端文件上传与下载

### HTML文件上传

```html
          <input
            ref="select"
            type="file"
            class="form"
            hidden
            accept="application/dxf"
            multiple="multiple"
          />
```

- type控制input类型
- hidden控制元素显示隐藏
- accept控制上传类型
- multiple是否可以多选

### 文件上传进度条

```js
// 在axios下配置request Header
onUploadProgress: (progressEvent) => {
    if(progressEvent.lengthComputable){
        let complete = 
            (((progressEvent.loaded / progressEvent.total) * 100) | 0);
        this.percentage = complete;
        if (complete === 100) {
            this.percentage = 0 // 重置进度
        }
    }
}
```

### 文件下载

```js
      // 文件链接直接下载
      const a = document.createElement("a");
      const url = "url";
      const fileName = "filename.xlsx";
      a.herf = url;
      a.download = fileName;
      a.click();
      
      // 后端blob流文件下载
      fetch(url).then((response) =>
        response.blob().then((blob) => {
          const a = document.createElement("a");
          const url = window.URL.createObjectURL(blob);
          const fileName = "filename.xlsx";
          a.herf = url;
          a.download = fileName;
          a.click();
          window.URL.revokeObjectURL(url);
        })
      );
```

