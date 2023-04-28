import {BrowserPushClient} from './BrowserPushClient';

describe('test', () => {
    it('client', (done) => {
        const client = new BrowserPushClient('xx');
        client.onClose(() => onClose);
        client.onOpen(() => onOpen);
        client.onMessage((message: any) => onMessage);
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
