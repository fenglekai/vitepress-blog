# Token存储方式

- 支持Cookie的开发人员会强烈建议不要将敏感信息（例如JWT）存储在localStorage中，因为它对于XSS毫无抵抗力。
- 支持localStorage的一派则认为：撇开localStorage的各种优点不谈，如果做好适当的XSS防护，收益是远大于风险的。
- 放在cookie中看似安全，看似“解决”（因为仍然存在XSS的问题）一个问题，却引入了另一个问题（CSRF）
- XSS -> 跨网站指令码 Cross-site scripting
- CSRF -> 跨站请求伪造 Cross-site request forgery

## 参考资料

> [Token一般存放在哪里？](https://juejin.cn/post/6922782392390746125)
>
> [前端安全-XSS](https://juejin.cn/post/6892938793901359112)