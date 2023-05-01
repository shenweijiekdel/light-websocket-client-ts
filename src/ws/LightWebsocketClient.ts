export interface LightWebsocketClient {

    connect(): void;

    disconnect(): void;

    send(message: any): void;

    onMessage(handler: (message: any) => void): void;

    onConnect(handler: () => void): void;

    onDisconnect(handler: () => void): void;
}

