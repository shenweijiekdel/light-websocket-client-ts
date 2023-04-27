import {Message, Ping, Pong, Stanza} from './Stanza';
import {StanzaType} from './StanzaType';


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
        const buffer = Buffer.from(data);

        switch (buffer.readUInt8()) {
            case StanzaType.PING:
                return StanzaCodec.decodePing();

            case StanzaType.PONG:
                return StanzaCodec.decodePong();

            case StanzaType.MESSAGE:
                return StanzaCodec.decodeMessage(buffer);

            default:
                return null;
        }
    }

    private static encodeMessage(message: Message): Uint8Array {
        const buffer = Buffer.alloc(1, message.payload);
        buffer.writeUInt8(StanzaType.MESSAGE);
        buffer.write(message.payload);
        return buffer;
    }

    private static encodePing(): Uint8Array {
        const buffer = Buffer.alloc(1);
        buffer.writeUInt8(StanzaType.PING);
        return buffer;
    }

    private static encodePong(): Uint8Array {
        const buffer = Buffer.alloc(1);
        buffer.writeUInt8(StanzaType.PONG);
        return buffer;
    }

    private static decodePing(): Ping {
        return new Ping();
    }

    private static decodePong(): Pong {
        return new Pong();
    }

    private static decodeMessage(data: Uint8Array): Message {
        return new Message(data);
    }
}
