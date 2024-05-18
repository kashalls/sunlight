import http from 'http'
import type { WebsocketState } from "./constants"

export const WebsocketWorkloadTypes = [
    "REQUEST", // Server is asking client to preform this work.
    "RESULT", // Client has done the work and is wanting praise.
] as const;

export type WebsocketWorkload = typeof WebsocketWorkloadTypes[number];

export const WebsocketWorkloadRequest = {
    op: 1,
    seq: 1,
    t: "INIT_STATE" as WebsocketState,
    w: "REQUEST" as WebsocketWorkload,
    d: { } as WorkloadRequestData
}

export type WorkloadRequestData = {
    dns?: WorkloadDataDNS,
    endpoints: Array<WorkloadEndpointData>
}

export type WorkloadEndpointData = {
    code: "iperf3",
    host: string,
    port?: string,
    options: string,
}

export const WebsocketWorkloadResult = {
    op: 0,
    seq: 1,
    t: "INIT_STATE" as WebsocketState,
    w: "RESULT" as WebsocketWorkload,
    d: { } as WorkloadResultData
}

export type WorkloadResultData = {
    dns?: WorkloadDataDNS,
    http?: Array<WorkloadResultDataHttp>
}

export type WorkloadDataDNS = {
    servers?: Array<String>,
    forced?: Boolean
}

export type WorkloadResultDataHttp = {
    host: String,
    timings?: {
        dns: number,
        tcp: number,
        tls: number,
        ttfb: number,
        transfer: number,
        latency: number,
    },
    headers?: Array<StandardHeaders>,
    status: HttpStatusCode
}


export type StandardHeaders = {
    // copy every declared property from http.IncomingHttpHeaders
    // but remove index signatures
    [K in keyof http.IncomingHttpHeaders as string extends K
        ? never
        : number extends K
        ? never
        : K]: http.IncomingHttpHeaders[K];
};
export type StandardHeader = keyof StandardHeaders;

export type HttpStatusCode =
    | 100 | 101 | 102 | 103
    | 200 | 201 | 202 | 203 | 204 | 205 | 206 | 207 | 208 | 226
    | 300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308
    | 400 | 401 | 402 | 403 | 404 | 405 | 406 | 407 | 408 | 409 | 410
    | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 421 | 422 | 423
    | 424 | 425 | 426 | 428 | 429 | 431 | 451
    | 500 | 501 | 502 | 503 | 504 | 505 | 506 | 507 | 508 | 510 | 511;