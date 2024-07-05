# Koa2 插件使用

## 使用@koa/router和@koa/bodyparser

要先使用bodyParser，再使用router；并且bodyParser需要配置`patchNode: true`;

> - **patchNode**: patch request body to Node's `ctx.req`, default is `false`.
> - patchNode：将请求正文修补到 Node 的 ctx.req，默认为 false。

```js
// index.js
const koa = new Koa();
koa.use(
    bodyParser({
        patchNode: true,
    })
);
koa.use(router.routes()).use(router.allowedMethods());

// router.js
const Router = require("@koa/router");
const router = new Router();

router.post("/data", async (ctx, next) => {
    console.log(ctx.request.query);
    console.log(ctx.request.body);
})
```

## 使用ws创建websocket连接

```js
const Koa = require("koa");
const { WebSocketServer } = require("ws");

/**
 * 创建websocket连接
 * @param {http.Server} service http server
 */
function CreateWs(service) {
    const wss = new WebSocketServer({ server: service, path: "/ws" });

    wss.on("connection", (ws) => {
        ws.on("error", console.error);
    });

    wss.on("connection", function connection(ws) {
        ws.on("message", function incoming(message) {
			ws.send(`receive: ${message}`);
        });
        ws.send(`{"msg":"web socket connection"}`);
    });
}

const koa = new Koa();
const service = http.createServer(koa.callback());
CreateWs(service);
service.listen(9000, () => {
    const url = `http://localhost:9000`;
    console.log(`koa server start successfully, on: ${url}`);
});
```

