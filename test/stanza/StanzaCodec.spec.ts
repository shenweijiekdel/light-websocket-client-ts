import {StanzaCodec} from '../../src';

describe('stanzaCodec', () => {
    it('codec', (done) => {
        const inputs = [
            [4, 65, 66, 67, 68],
            [5],
            [6]
        ];

        for (const input of inputs) {
            const stanza = StanzaCodec.decode(Uint8Array.from(input));
            if (stanza != null) {
                const stanzaBytes = StanzaCodec.encode(stanza);
                console.log(stanzaBytes);
            }
        }
        done();
    });
});
