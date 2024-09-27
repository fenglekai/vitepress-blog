# 节流

节流函数

```js
function throttle(fn, delay) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      inThrottle = true;
      setTimeout(() => {
        fn.apply(context, args);
        inThrottle = false;
      }, delay);
    }
  };
}
```
