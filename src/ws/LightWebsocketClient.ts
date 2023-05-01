export interface LightWebsocketClient {

    connect(): void;

    disconnect(): void;

    send(message: any): void;

    onMessage(handler: (message: any) => void): void;

    onConnected(handler: () => void): void;

    onDisconnected(handler: () => void): void;
}

