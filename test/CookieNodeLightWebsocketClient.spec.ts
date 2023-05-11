import {CookieNodeLightWebsocketClient} from './CookiedNodeLigitWebsocketClient';

describe('test', () => {
    it('client', (done) => {
        // beforeEach(() => {
        //     this.setTimeout(done, 0);
        // });
        const client = new CookieNodeLightWebsocketClient('ws://localhost:8080/push/endpoint?csrf=Jk38deaiEe28oobm636OOA');
        client.onDisconnect(onClose);
        client.onConnect(onOpen);
        client.onMessage(onMessage);
        client.connect();
    });
});

function onOpen() {
    this.log('onOpen');
}


function onClose() {
    this.log('onClose');
}

function onMessage(message: any) {
    this.log('onMessage: ', message);
}
