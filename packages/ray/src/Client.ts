import { EventEmitter } from 'events';
import { inflate, deflate } from 'pako';
import { consola } from "consola";
enum Op {
    Init,
    Heartbeat,
    Workload,
    Configuration
}

interface SocketData {
    heartbeat_interval?: number
}

interface SocketMessage {
    op: Op;
    t?: Event;
    d?: SocketData | { [key: string]: any };
}

export interface Configuration {
    wireless?: WirelessDetails
}

export interface WirelessDetails {
    ssid: string;
    psk: string;
    hidden?: boolean;
}

export interface Workload {
    id: string;
    task: "PUPPETEER" | "IPERF" | "OPENSPEEDTEST";
    timings?: Timings;
    timestamp?: string;
    host: string;
    port?: number;
    duration?: number;
    status?: number;
    options?: Object
}

export interface Timings {
    dns?: boolean;
    tcp?: boolean;
    tls?: boolean;
    ttfb?: boolean;
    transfer?: boolean;
}

export interface Client {
    ws: WebSocket;
    heartbeat: ReturnType<typeof setTimeout>;

    connectionAttempt: number;
    connectionTimeout: ReturnType<typeof setTimeout> | null;

    url: string;
    encoding: string; // 'etf' | 'json'
    compression: string; // 'zlib' | 'none'

    on(event: 'configuration', listener: (data: Configuration) => void): this;
    on(event: 'workload', listener: (data: Workload) => void): this;
    on(event: 'connected', listener: () => void): this;
    on(event: 'init', listener: () => void): this;
}

export class Client extends EventEmitter {
    constructor(url = 'ws://sunlight.internal', encoding = 'json', compression = 'zlib') {
        super();

        this.compression = compression;
        this.encoding = encoding;
        this.url = url;

        this.connectionAttempt = 0;

        this.init();
    }

    private init(): void {
        this.ws = new WebSocket(`${this.url}/socket?encoding=${this.encoding}&compression=${this.compression}`);
        if (this.compression != 'none') this.ws.binaryType = 'arraybuffer';

        // Socket open handler
        this.ws.addEventListener('open', () => this.opened());

        // @ts-ignore
        window.ws = this.ws;

        // Message listener
        this.ws.addEventListener('message', (e) => {
            const message = this.compression != 'none' ? JSON.parse(inflate(e.data, { to: 'string' })) : JSON.parse(e.data);

            try {
                this.message(message);
            } catch (error) { }
        });

        // Close event for websocket
        this.ws.addEventListener('close', () => this.closed());
    }

    private resetConnectionThrottle(): void {
        this.connectionAttempt = 0;
        if (this.connectionTimeout) clearTimeout(this.connectionTimeout);
    }

    private reconnectThrottle(): void {
        this.connectionAttempt++;
        this.connectionTimeout = setTimeout(
            () => this.init(),
            this.connectionAttempt == 1
                ? 1000 * 10
                : this.connectionAttempt == 2
                    ? 1000 * 40
                    : this.connectionAttempt == 3
                        ? 1000 * 60 * 1
                        : 1000 * 60 * 5,
        ); // 10sx40sx1mx5m*
    }

    send(op: Op, d?: any): void {
        if (this.ws.readyState != this.ws.OPEN) return;
        const data = this.compression != 'none' ? deflate(JSON.stringify({ op, d })) : JSON.stringify({ op, d });
        return this.ws.send(data);
    }

    private sendHeartbeat(): void {
        return this.send(Op.Heartbeat);
    }

    private message(data: SocketMessage): void {
        switch (data.op) {
            case Op.Init:
                // Got hello, start our heartbeat interval
                this.heartbeat = setInterval(() => this.sendHeartbeat(), data.d?.heartbeat_interval);
                this.emit('init');
                break;

            case Op.Workload:
                //
                this.emit('workload', data.d)
                break;

            case Op.Configuration:
                this.emit('configuration', data.d)
                break;

            default:
                break;
        }
    }

    private opened(): void {
        consola.info('Socket connection opened.')
        this.emit('connected');
        this.resetConnectionThrottle();
    }

    private closed(): void {
        consola.info('Socket connection closed.')
        clearInterval(this.heartbeat);
        this.reconnectThrottle();
    }
}

export const client = new Client();