# Canvas拖拽和缩放

## Vue实现版本

::: details
```
<template>
  <div
    ref="mapWrapper"
    class="relative overflow-hidden w-full"
    style="height: 68vh"
  >
    <canvas ref="mapFactory" style="cursor: grab"></canvas>
    <div class="absolute bottom-0 right-0">
      <el-button type="primary" @click="resetMap">reset</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "mapCanvas",
  data() {
    return {
      WIDTH: 0,
      HEIGHT: 0,
      scale: 1,
      current: {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
      },
      move: false,
      moveBefore: { x: 0, y: 0 },
    };
  },
  mounted() {
    this.initCanvas();
  },
  methods: {
    limit(min, max) {
      return (val) => Math.min(Math.max(val, min), max);
    },
    // canvas缩放
    async zoom(position) {
      const mapFactory = this.$refs.mapFactory;
      const mapContext = mapFactory.getContext("2d");
      if (!img) return;
      mapContext.clearRect(0, 0, this.WIDTH, this.HEIGHT);
      const origin = {
        x: position.x - this.current.x,
        y: position.y - this.current.y,
      };

      const newWidth = this.WIDTH * this.scale;
      const newHeight = this.HEIGHT * this.scale;

      const dx =
        this.current.x +
        (origin.x - (origin.x / this.current.width) * newWidth);
      const dy =
        this.current.y +
        (origin.y - (origin.y / this.current.height) * newHeight);

      this.current.x = dx;
      this.current.y = dy;
      this.current.width = newWidth;
      this.current.height = newHeight;
      mapContext.drawImage(img, dx, dy, newWidth, newHeight);
    },
    // canvas开始移动
    canvasDown(e) {
      const mapFactory = this.$refs.mapFactory;
      mapFactory.style.cursor = "grabbing";
      this.move = true;
      const mousePos = this.getCanvasMousePos(e);
      this.moveBefore = { ...mousePos };
    },
    // canvas移动中
    async canvasMove(e) {
      if (this.move) {
        const mousePos = this.getCanvasMousePos(e);
        const mapFactory = this.$refs.mapFactory;
        const mapContext = mapFactory.getContext("2d");
        if (!img) return;

        mapContext.clearRect(0, 0, this.WIDTH, this.HEIGHT);
        this.current.x += mousePos.x - this.moveBefore.x;
        this.current.y += mousePos.y - this.moveBefore.y;
        this.moveBefore = { ...mousePos };
        mapContext.drawImage(
          img,
          this.current.x,
          this.current.y,
          this.current.width,
          this.current.height
        );
      }
    },
    // canvas结束移动
    canvasUp() {},
    /**
     * @description: 鼠标坐标转换,将鼠标点的位置，转换为canvas元素内部点击的位置
     * @param {*} e 鼠标事件
     * @return {*}
     */
    getCanvasMousePos(e) {
      const mapFactory = this.$refs.mapFactory;
      let rect = mapFactory.getBoundingClientRect();
      let x = ((e.clientX - rect.left) * mapFactory.width) / rect.width;
      let y = ((e.clientY - rect.top) * mapFactory.height) / rect.height;

      return {
        x: x,
        y: y,
      };
    },
    initCanvas() {
      const mapWrapper = this.$refs.mapWrapper;
      const mapFactory = this.$refs.mapFactory;
      this.WIDTH = mapFactory.width = mapWrapper.clientWidth;
      this.HEIGHT = mapFactory.height = mapWrapper.clientHeight;

      this.current = { x: 0, y: 0, width: this.WIDTH, height: this.HEIGHT };

      this.zoom({ x: 0, y: 0 });
      // 中键缩放事件
      mapFactory.addEventListener("mousewheel", (e) => {
        e.preventDefault();
        const direction = this.limit(-1, 1)(e.deltaY || e.detail);
        this.scale -= direction * 0.5;
        if (this.scale < 1) return (this.scale = 1);
        let mousePos = this.getCanvasMousePos(e);
        this.zoom(mousePos);
      });
      // 鼠标点下事件
      mapFactory.addEventListener("mousedown", (e) => {
        e.preventDefault();
        this.canvasDown(e);
      });
      // 鼠标移动事件
      mapFactory.addEventListener("mousemove", (e) => {
        e.preventDefault();
        this.canvasMove(e);
      });
      // 鼠标松开事件
      mapFactory.addEventListener("mouseup", (e) => {
        e.preventDefault();
        mapFactory.style.cursor = "grab";
        this.move = false;
      });
      // 鼠标离开事件
      mapFactory.addEventListener("mouseleave", (e) => {
        e.preventDefault();
        mapFactory.style.cursor = "grab";
        this.move = false;
      });
    },
    resetMap() {
      this.scale = 1;
      this.current.x = 0;
      this.current.y = 0;
      this.current.width = this.WIDTH;
      this.current.height = this.HEIGHT;
      this.zoom({ x: 0, y: 0 });
    },
  },
};
</script>
```
:::
## 借鉴源码

### 缩放

> codepen：https://codepen.io/xty1992a/pen/gOOjoqK?editors=0010


### 拖拽

> https://blog.csdn.net/y396397735/article/details/117692565
