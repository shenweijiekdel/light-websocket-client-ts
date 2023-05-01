import {LightWebsocketClientImpl} from './LightWebsocketClientImpl';

export class BrowserLightWebsocketClient extends LightWebsocketClientImpl {

    createWebsocket(url: string, protocols?: string[] | undefined): any {
        return new WebSocket(url, protocols);
    }
}
