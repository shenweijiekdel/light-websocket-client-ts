export abstract class AbstractLightWebsocketClient {
    abstract createWebsocket(url: string, protocols?: string[]): any;
}
