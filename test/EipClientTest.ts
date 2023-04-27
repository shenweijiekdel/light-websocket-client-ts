import {BrowserPushClient} from './BrowserPushClient';

describe('test', () => {
    it('client', (done) => {
        const client = new BrowserPushClient('ws://localhost:8988/endpoint');
        client.onClose(() => onOpen);
        client.onOpen(() => onClose);
        client.onMessage((message: any) => onMessage);
        client.connect();
        setTimeout(() => {
            client.close();
            done();
        }, 1500);
    });
});

function onOpen() {
    console.log('onClose');
}


function onClose() {
    console.log('onClose');
}

function onMessage(message: any) {
    console.log('onMessage: ', message);
}
