import {StanzaType} from './StanzaType';

export abstract class Stanza {
    abstract stanzaType(): StanzaType;
}

export class Ping extends Stanza {
    stanzaType(): StanzaType {
        return StanzaType.PING;
    }
}

export class Pong extends Stanza {
    stanzaType(): StanzaType {
        return StanzaType.PONG;
    }
}

export class Kickoff extends Stanza {
    stanzaType(): StanzaType {
        return StanzaType.KICKOFF;
    }
}

export class Message extends Stanza {
    private readonly _payload: string;

    constructor(payload: string) {
        super();
        this._payload = payload;
    }

    stanzaType(): StanzaType {
        return StanzaType.MESSAGE;
    }

    get payload(): string {
        return this._payload;
    }
}
