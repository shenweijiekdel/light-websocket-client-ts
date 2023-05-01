import {LightWebsocketClientImpl} from '../src';
import * as Websocket from 'ws';

export class CookieNodeLightWebsocketClient extends LightWebsocketClientImpl {

    createWebsocket(url: string, protocols?: string[] | undefined): any {
        return new Websocket(url, protocols, {
            headers: {
                // tslint:disable-next-line:max-line-length
                cookie: 'client-id=Jlhe_s7NEe27jcoMxksdqg; token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODUzNzM5NjIwMDgsInUiOjEwMDY2LCJ4IjoiSmszOGRlYWlFZTI4b29ibTYzNk9PQSJ9.QDQq2ZrswxNIbkDePwiJ6YeDJzVqQ9o_EsN5bsPmwqc'
            }
        });
    }
}
