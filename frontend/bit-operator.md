# 位运算符实例

### 取整

使用 `~`、`>>`、`<<`、`>>>`、`|` 来取整。

```js
console.log(~~6.83); // 6
console.log(6.83 >> 0); // 6
console.log(6.83 << 0); // 6
console.log(6.83 | 0); // 6
// >>>不可对负数取整
console.log(6.83 >>> 0); // 6
```

### 值交换

使用按位异或 `^` 来完成值交换

```js
var a = 5;var b = 8;
a ^= b;b ^= a;a ^= b;
console.log(a); // 8console.log(b); // 5
```

异或还经常被用于加密。

### 十进制转二进制

```js
var number = 3;var result = number.toString(2);
var result2 = (14).toString(2);// "1110"
```

### 颜色值转换

使用 `&`、`>>`、`|` 来完成 RGB 值和 16 进制颜色值之间的转换

```js
/** * 16进制颜色值转RGB * @param  {String} hex 16进制颜色字符串 * @return {String}     RGB颜色字符串 */
function hexToRGB(hex) {
    var hexx = hex.replace('#', '0x');
    var r = hexx >> 16;  var g = (hexx >> 8) & 0xff;
    var b = hexx & 0xff;
    return `rgb(${r}, ${g}, ${b})`;
}
/** * RGB颜色转16进制颜色 * @param  {String} rgb RGB进制颜色字符串 * @return {String}     16进制颜色字符串 */
function RGBToHex(rgb) {
    var rgbArr = rgb.split(/[^\d]+/);
    var color = (rgbArr[1] << 16) | (rgbArr[2] << 8) | rgbArr[3];
    return '#' + color.toString(16);
}
// -------------------------------------------------hexToRGB('#ffffff'); // 'rgb(255,255,255)'RGBToHex('rgb(255,255,255)'); // '#ffffff'
```

### 判断正负

```js
function isPos(n) {
  return n === n >>> 0 ? true : false;
}
isPos(-1); // false
isPos(1); // true
```

### 判断符号是否相同

通常, 比较两个数是否符号相同, 我们使用 `x * y > 0` 来判断即可. 但如果利用按位异或 `^`, 运算速度将更快。

```js
console.log(-17 ^ (9 > 0));
// false
```

### 判断奇偶

使用 `&` 运算符判断一个数的奇偶

如果把 n 以二进制的形式展示的话，其实我们只需要判断最后一个二进制位是 1 还是 0 就行了。

```js
// 偶数 & 1 = 0
// 奇数 & 1 = 1
console.log(2 & 1); // 0
console.log(3 & 1); // 1
```

### 判断索引是否存在

这是一个很常用的技巧，如判断一个数是否在数组里面：

```js
// 如果url含有 ? 号，则后面拼上&符号，否则加上?号
url += ~url.indexOf('?') ? '&' : '?';
```

因为：`~-1 === 0`

-1 在内存的表示的二进制符号全为 1，按位非之后就变成了 0. 进一步说明——1 在内存的表示为：`0000...0001`，第一位 0 表示符号位为正，如果是 -1 的话符号位为负用 1 表示 `1000...0001`，这个是 -1 的原码，然后符号位不动，其余位取反变成 `1111...1110`，这个就是 -1 的反码表示，反码再加 1 就变成了 `1111...1111`，这个就是 -1 的补码，负数在内存里面（机器数）使用补码表示，正数是用原码。所以全部都是 1 的机器数按位非之后就变成了全为 0。剩下的其它所有数按位非都不为 0，所以利用这个特性可以用来做 `indexOf` 的判断，这样代码看起来更简洁一点。



**来源：https://tsejx.github.io/javascript-guidebook/basic-concept/expressions/operators/bitwise-operators/**