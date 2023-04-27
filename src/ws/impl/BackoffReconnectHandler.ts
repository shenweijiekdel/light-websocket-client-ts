import {ReconnectHandler} from '../ReconnectHandler';
import {BasePushClient} from '../BasePushClient';

export class BackoffReconnectHandler implements ReconnectHandler {

    private client: BasePushClient;
    private interval: number;
    private enable: boolean;
    private readonly minInterval: number;
    private readonly maxInterval: number;

    constructor(client: BasePushClient, enable: boolean, minInterval: number, maxInterval: number) {
        this.client = client;
        this.enable = enable;
        this.minInterval = minInterval;
        this.maxInterval = maxInterval;
        this.interval = minInterval;
    }

    onConnect() {
        this.interval = this.minInterval;
    }

    onDisconnected() {
        if (this.enable) {
            setTimeout(() => this.client.connect(), this.interval);
            this.resetInterval();
        }
    }

    private resetInterval() {
        this.interval *= 2;
        if (this.interval > this.maxInterval) {
            this.interval = this.maxInterval;
        }
    }

    setEnable(enable: boolean): void {
        this.enable = enable;
    }
}
