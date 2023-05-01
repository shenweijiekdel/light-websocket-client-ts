export interface ReconnectHandler {

    setEnable(enable: boolean): void;

    onConnect(): void;

    onDisconnect(): void;
}

