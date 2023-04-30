import {BrowserPushClient} from '../src';

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

describe('1', () => {
    it('2', (done) => {
        const buf = Buffer.alloc(1);
        buf.write(JSON.stringify({a: 'a'}));
    });
});
