export class Options {

    public static readonly DEFAULT_IDLE_TIMEOUT = 60000;
    public static readonly DEFAULT_PING_TIMES = 5;
    public static readonly DEFAULT_RECONNECT_MIN_INTERVAL = 100;
    public static readonly DEFAULT_RECONNECT_MAX_INTERVAL = 10000;
    public static readonly DEFAULT_AUTO_RECONNECT = true;
    public static readonly DEFAULT_DEBUG_LOG = false;

    private _idleTimeout: number = Options.DEFAULT_IDLE_TIMEOUT;
    private _pingTimes: number = Options.DEFAULT_PING_TIMES;
    private _autoReconnect: boolean = Options.DEFAULT_AUTO_RECONNECT;
    private _reconnectMinInterval: number = Options.DEFAULT_RECONNECT_MIN_INTERVAL;
    private _reconnectMaxInterval: number = Options.DEFAULT_RECONNECT_MAX_INTERVAL;
    private _debug: boolean = Options.DEFAULT_DEBUG_LOG;


    set debug(value: boolean) {
        this._debug = value;
    }

    get debug(): boolean {
        return this._debug;
    }

    get idleTimeout(): number {
        return this._idleTimeout;
    }

    set idleTimeout(value: number) {
        this._idleTimeout = value;
    }

    get pingTimes(): number {
        return this._pingTimes;
    }

    set pingTimes(value: number) {
        this._pingTimes = value;
    }

    get autoReconnect(): boolean {
        return this._autoReconnect;
    }

    set autoReconnect(value: boolean) {
        this._autoReconnect = value;
    }

    get reconnectMinInterval(): number {
        return this._reconnectMinInterval;
    }

    set reconnectMinInterval(value: number) {
        this._reconnectMinInterval = value;
    }

    get reconnectMaxInterval(): number {
        return this._reconnectMaxInterval;
    }

    set reconnectMaxInterval(value: number) {
        this._reconnectMaxInterval = value;
    }
}
