import * as WebSocket from 'ws';
import {PushClientImpl} from '../src/ws/impl/PushClientImpl';

export class BrowserPushClient extends PushClientImpl {

    createWebsocket(url: string, protocols?: string[] | undefined): any {
        return new WebSocket(url, protocols, {});
    }
}
