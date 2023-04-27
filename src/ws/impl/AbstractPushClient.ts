export abstract class AbstractPushClient {
    abstract createWebsocket(url: string, protocols?: string[]): any;
}
