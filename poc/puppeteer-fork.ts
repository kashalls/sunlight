import { fork } from 'child_process';
import os from 'os';

// Get the number of CPUs available
const numCPUs = os.cpus().length;

// Parse the number of runners from the command-line arguments or default to the number of CPUs
const numRunners = parseInt(process.argv[2], 10) || numCPUs;

console.log(`Starting ${numRunners} speed test runners...`);

// Function to start a runner
function startRunner(index: number) {
    console.log(`Starting runner ${index + 1}...`);
    const child = fork('./puppeteer.ts'); // Fork the compiled speedtest.js script

    // Handle messages or errors from the child process
    child.on('message', (message) => {
        console.log(`Runner ${index + 1}: ${message}`);
    });

    child.on('error', (error) => {
        console.error(`Runner ${index + 1} encountered an error:`, error);
    });

    child.on('exit', (code) => {
        console.log(`Runner ${index + 1} exited with code ${code}`);
    });
}

// Start the specified number of runners
for (let i = 0; i < numRunners; i++) {
    startRunner(i);
}
