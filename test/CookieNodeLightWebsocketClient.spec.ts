import {CookieNodeLightWebsocketClient} from './CookiedNodeLigitWebsocketClient';

describe('test', () => {
    it('client', (done) => {
        // beforeEach(() => {
        //     this.timeout(0);
        // });
        const client = new CookieNodeLightWebsocketClient('http://localhost:8080/push/endpoint?csrf=Jk38deaiEe28oobm636OOA');
        client.onDisconnected(onClose);
        client.onConnected(onOpen);
        client.onMessage(onMessage);
        client.connect();
    });
});

function onOpen() {
    console.log('onOpen');
}


function onClose() {
    console.log('onClose');
}

function onMessage(message: any) {
    console.log('onMessage: ', message);
}
