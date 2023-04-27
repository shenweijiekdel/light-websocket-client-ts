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

export class Message extends Stanza {
    private readonly _payload: any;

    constructor(payload: any) {
        super();
        this._payload = payload;
    }

    stanzaType(): StanzaType {
        return StanzaType.MESSAGE;
    }

    get payload(): any {
        return this._payload;
    }
}
