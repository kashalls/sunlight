import { Worker } from 'worker_threads';
import path from 'path';

interface PageConfig {
    host: string;
    port: number;
    duration: number;
    status: 'active' | 'inactive';
    [key: string]: any
}

// Function to create and run a worker
export function runWorker(workerData: PageConfig): Promise<void> {
    return new Promise((resolve, reject) => {
        if (workerData.status !== 'active') {
            console.log(`Skipping inactive page: ${workerData.host}`);
            return resolve();
        }

        const worker = new Worker(path.resolve(__dirname, 'streamWorker.js'), {
            workerData: workerData,
        });

        // Listen for messages from the worker
        worker.on('message', (message) => {
            if (message.error) {
                console.error(`Error from worker: ${message.error}`);
            } else {
                console.log(`Content from ${workerData.host}:`, message);
            }
        });

        // Handle worker completion
        worker.on('exit', (code) => {
            if (code !== 0) {
                reject(new Error(`Worker stopped with exit code ${code}`));
            } else {
                resolve();
            }
        });

        // Handle errors in the worker
        worker.on('error', reject);
    });
}
