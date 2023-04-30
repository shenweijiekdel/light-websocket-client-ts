import {BasePushClient} from '../BasePushClient';
import {Message, Ping, Pong, Stanza} from '../../stanza/Stanza';
import {StanzaCodec} from '../../stanza/StanzaCodec';
import {Options} from '../Options';
import {AbstractPushClient} from './AbstractPushClient';
import {ReconnectHandler} from '../ReconnectHandler';
import {BackoffReconnectHandler} from './BackoffReconnectHandler';

export class PushClientImpl extends AbstractPushClient implements BasePushClient {

    private readonly pingInterval: number;
    private readonly url: string;
    private readonly protocol?: string[];

    private reconnectHandler: ReconnectHandler;
    private options: Options;
    private idleTimerId: NodeJS.Timeout | null = null;
    private pingTimerId: NodeJS.Timeout | null = null;

    private connected = false;
    private ws: any | null = null;
    private disconnectHandler: (() => void) = () => {
    };
    private connectHandler: () => void = () => {
    };
    private messageHandler: (message: string) => void = () => {
    };

    constructor(url: string, protocol?: string[], options ?: Options) {
        super();
        this.options = options || new Options();
        this.url = url;
        this.protocol = protocol;
        this.pingInterval = this.options.idleTimeout / this.options.pingTimes;
        if (this.pingInterval < 1000) {
            throw new Error('invalid options.pingTimes or options.idleTimeout');
        }
        this.reconnectHandler = new BackoffReconnectHandler(this, this.options.autoReconnect, this.options.reconnectMinInterval,
            this.options.reconnectMaxInterval);
    }

    createWebsocket(url: string, protocols?: string[] | undefined): any {
        throw new Error('Method not implemented.');
    }

    connect(): void {
        console.log('connect...');
        this.reconnectHandler.setEnable(true);
        this.ws = this.createWebsocket(this.url, this.protocol);
        this.ws.onopen = () => this.handleConnected();
        this.ws.onclose = () => this.handleClosed();
        this.ws.onerror = (err: any) => this.handleError(err);
        this.ws.onmessage = (message: any) => this.handleFrame(message);
    }

    disconnect(): void {
        this.reconnectHandler.setEnable(false);
        close();
    }

    close(): void {
        if (!this.connected) {
            return;
        }

        if (this.ws != null) {
            this.ws.close();
            this.handleClosed();
        }
    }

    onOpen(handler: () => void): void {
        this.connectHandler = handler;
    }

    onClose(handler: () => void) {
        this.disconnectHandler = handler;
    }

    onMessage(handler: (message: any) => void) {
        this.messageHandler = handler;
    }

    send(message: any): void {
        return this.write(StanzaCodec.encode(new Message(message)));
    }

    private handleConnected(): void {
        console.log(Date() + ' connected');
        this.connected = true;
        this.startIdleTimer();
        this.startPingTimer();
        this.reconnectHandler.onConnect();
        if (this.connectHandler != null) {
            this.connectHandler();
        }
    }

    private handleClosed(): void {
        if (this.connected) {
            console.log('onClose: ');
            this.stopPingTimer();
            this.stopIdleTimer();
            this.ws = null;
            this.connected = false;
            this.reconnectHandler.onDisconnected();
            this.disconnectHandler();
        }
    }

    private handleFrame(message: any): void {
        if (message.data == null) {
            return;
        }

        console.log(new Date() + ' onMessage: ');
        this.startIdleTimer();
        this.startPingTimer();

        try {
            if (message.data instanceof Uint8Array) {
                this.handleStanza(StanzaCodec.decode(message.data));
            }
        } catch (err) {
            console.error('handleStanza error. skip: ', err);
            return;
        }
    }

    private handleStanza(stanza: Stanza | null): void {
        if (stanza == null) {
            return;
        }

        if (stanza instanceof Pong) {
            return this.handlePong();
        }

        if (stanza instanceof Message) {
            this.handleMessage(stanza);
        }
    }


    private write(o: any): void {
        console.log(Date() + ' write: ', o);
        const stanza = StanzaCodec.encode(o);
        if (this.ws != null) {
            this.ws.send(stanza);
        }
    }

    private startIdleTimer(): void {
        this.stopIdleTimer();
        this.idleTimerId = setTimeout(() => this.close(), this.options.idleTimeout);
    }

    private stopIdleTimer(): void {
        if (this.idleTimerId != null) {
            clearTimeout(this.idleTimerId);
        }
    }

    private startPingTimer(): void {
        this.stopPingTimer();

        this.pingTimerId = setTimeout(() => this.write(new Ping()), this.pingInterval);
    }

    private stopPingTimer(): void {
        if (this.pingTimerId != null) {
            clearTimeout(this.pingTimerId);
        }
    }

    private handleError(err: any) {
        this.reconnectHandler.onDisconnected();
        console.log('handleError: ', err);
    }

    private handlePong() {
        console.log('handlePong');
    }

    private handleMessage(message: Message) {
        if (this.messageHandler != null) {
            this.messageHandler(message.payload);
        }
    }
}

