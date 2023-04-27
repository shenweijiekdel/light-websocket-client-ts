export interface BasePushClient {

    connect(): void;

    disconnect(): void;

    send(message: any): void;

    onMessage(handler: (message: any) => void): void;

    onOpen(handler: () => void): void;

    onClose(handler: () => void): void;
}

