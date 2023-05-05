# light-websocket-client-ts

轻量封装 Websocket 客户端 ts 版

## 简介

一个基于 Websocket 进行简单封装的轻量协议客户端，需配合 `light-websocket-server` 使用

### 1. 连接保活
  
由于 websocket 的 js API 无法发送 websocket 的 ping 帧，导致只能在应用层协议再实现一遍保活机制，所以在 Websocket 数据帧首部分出一个字节作为协议头，实现了相对 websocket 协议更上层，但是相对应用层更下层的保活机制

### 2. 自动重连

- 自动重连默认开启，可以通过 Options 来进一步控制
- 客户端主动调用 disconnect() 关闭连接会禁用自动重连，直到重新调用 connect()
- 自动重连采用退避超时策略，可以通过 Options 来进一步控制
- 收到来自服务端的 `Kickoff` 报文也会禁止重连

## 快速开始

### 浏览器

- 安装依赖

```sh
$ npm install light-websocket-client-ts --saved
```

- 创建连接

```typescript
import {LightWebsocketClientImpl} from 'light-websocket-client-ts';

const client = new LightWebsocketClientImpl('ws://xxx/xxx');
client.onDisconnect(onDisconnect);
client.onConnect(onConnect);
client.onMessage(onMessage);

client.connect();

function onConnect() {
}

function onDisconnect() {
    //每次连接丢失都会回调
}

function onMessage(message: string) {
}
```

### Node.js 端

- 安装依赖

```sh
$ npm install light-websocket-client-ts --saved
$ npm install ws --saved
```

- 创建 Node.js ws 实现

```typescript
import {LightWebsocketClientImpl} from 'light-websocket-client-ts';
import * as Websocket from 'ws';

export class LightWebsocketCLientNodeImpl extends LightWebsocketClientImpl {

    createWebsocket(url: string, protocols?: string[] | undefined): any {
        return new Websocket(url, protocols, {});
    }
}
````

- 使用 Node.js 实现创建连接

```typescript
const client = new LightWebsocketCLientNodeImpl('ws://xxx/xxx');
client.onDisconnect(onDisconnect);
client.onConnect(onConnect);
client.onMessage(onMessage);

client.connect();

function onConnect() {
}

function onDisconnect() {
    //每次连接丢失都会回调
}

function onMessage(message: string) {
}
```
