import {Message, Ping, Pong, Stanza} from './Stanza';
import {StanzaType} from './StanzaType';
import {Buffer} from 'buffer/';

export class StanzaCodec {

    public static encode(stanza: Stanza): Uint8Array | null {
        if (stanza instanceof Ping) {
            return this.encodePing();
        }

        if (stanza instanceof Pong) {
            return this.encodePong();
        }

        if (stanza instanceof Message) {
            return this.encodeMessage(stanza);
        }

        return null;
    }

    public static decode(data: Uint8Array): Stanza | null {
        const buf = Buffer.from(data);

        switch (buf.readUInt8(0)) {
            case StanzaType.PING:
                return StanzaCodec.decodePing();

            case StanzaType.PONG:
                return StanzaCodec.decodePong();

            case StanzaType.MESSAGE:
                return StanzaCodec.decodeMessage(Buffer.from(buf.buffer.slice(1)));

            default:
                return null;
        }
    }

    private static encodeMessage(message: Message): Uint8Array {
        const buf = Buffer.from([StanzaType.MESSAGE]);
        buf.write(message.payload);
        return buf;
    }

    private static encodePing(): Uint8Array {
        return Buffer.from([StanzaType.PING]);
    }

    private static encodePong(): Uint8Array {
        return Buffer.from([StanzaType.PONG]);
    }

    private static decodePing(): Ping {
        return new Ping();
    }

    private static decodePong(): Pong {
        return new Pong();
    }

    private static decodeMessage(data: Buffer): Message {
        return new Message(new TextDecoder().decode(data.buffer));
    }
}
