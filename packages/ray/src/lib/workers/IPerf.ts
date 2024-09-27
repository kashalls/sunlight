import { Worker, isMainThread, parentPort } from 'node:worker_threads'
import { spawn } from 'node:child_process'

export interface Timings {
    dns?: boolean;
    tcp?: boolean;
    tls?: boolean;
    ttfb?: boolean;
    transfer?: boolean;
}