# JSDoc使用

## 给函数方法添加说明

```javascript
/**
 * 补充说明
 * @param {string} params 参数说明
 * @returns {string} 返回说明
 */
function todoSomething(params) {
    // TODO
}
```

## 声明类型并使用

```javascript
/**
 * @typedef {object} Point
 * @property {number} name 键的说明
 * @property {number} value 键的说明
 */

/**
 * 补充说明
 * @param {string} params 参数说明
 * @returns {Point} 返回说明
 */
function todoSomething(params) {
    // TODO
}
```

## 自定义对象类型

```javascript
/**
 *
 * @param {Object<string, string>} point 得到一个自定义对象
 */
```

