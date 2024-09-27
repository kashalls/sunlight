import { spawn } from 'child_process';

interface IPerf3Options {
    host?: string;
    port?: number;
    udp?: boolean;
    reverse?: boolean;
    bandwidth?: string;
    time?: number;
    [key: string]: any; // To allow any additional options
}

/**
 * Translates JSON options to iperf3 command arguments.
 * @param options IPerf3Options object representing iperf3 options.
 * @returns Array of command-line arguments.
 */
function translateOptionsToArgs(options: IPerf3Options): string[] {
    const args: string[] = [];

    if (options.host) {
        args.push('-c', options.host);
    }

    if (options.port) {
        args.push('-p', options.port.toString());
    }

    if (options.udp) {
        args.push('-u');
    }

    if (options.reverse) {
        args.push('-R');
    }

    if (options.bandwidth) {
        args.push('-b', options.bandwidth);
    }

    if (options.time) {
        args.push('-t', options.time.toString());
    }

    // Handle any additional options
    Object.keys(options).forEach((key) => {
        if (!['server', 'port', 'udp', 'reverse', 'bandwidth', 'time'].includes(key)) {
            const value = options[key];
            if (typeof value === 'boolean' && value) {
                args.push(`--${key}`);
            } else if (value !== undefined && value !== null) {
                args.push(`--${key}`, value.toString());
            }
        }
    });

    return args;
}

/**
 * Runs iperf3 with the specified options.
 * @param options IPerf3Options object representing iperf3 options.
 */
export function runIPerf3(options: IPerf3Options): void {
    const args = translateOptionsToArgs(options);
    const iperf3 = spawn('iperf3', args);

    iperf3.stdout.on('data', (data) => {
        console.log(`iperf3 stdout: ${data}`);
    });

    iperf3.stderr.on('data', (data) => {
        console.error(`iperf3 stderr: ${data}`);
    });

    iperf3.on('close', (code) => {
        console.log(`iperf3 process exited with code ${code}`);
    });
}
