import { exec } from 'child_process';

function percentile(arr: number[], p: number): number {
    const sorted = [...arr].sort((a, b) => a - b);
    const idx = Math.ceil(p * (sorted.length - 1));
    return sorted[idx];
}

function parsePingOutput(output: string): number[] {
    const times: number[] = [];
    const lines = output.split('\n');

    lines.forEach((line) => {
        const match = line.match(/time[=<]\s*(\d+(\.\d+)?)/);
        if (match) {
            times.push(parseFloat(match[1]));
        }
    });

    return times;
}

function ping(ip: string, count: number = 10): Promise<Record<string, number | string>> {
    return new Promise((resolve, reject) => {
        const cmd = process.platform === 'win32' ? `ping -n ${count} ${ip}` : `ping -c ${count} ${ip}`;

        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                return reject(`Ping failed: ${stdout} ${stderr}`);
            }

            const times = parsePingOutput(stdout);

            if (times.length === 0) {
                return reject('No valid ping results.');
            }

            const min = Math.min(...times);
            const max = Math.max(...times);
            const avg = times.reduce((sum, val) => sum + val, 0) / times.length;
            const median = percentile(times, 0.5);
            const pct10 = percentile(times, 0.1);
            const pct90 = percentile(times, 0.9);

            resolve({
                ip,
                min,
                pct10,
                median,
                avg,
                pct90,
                max,
            });
        });
    });
}

(async () => {
    const ip = process.argv[2] || '8.8.8.8';
    const count = parseInt(process.argv[3]) || 10;

    try {
        console.log('Starting ping statistic collection...')
        const results = await ping(ip, count);
        console.log(`Ping statistics for ${ip}:`, results);
    } catch (err) {
        console.error(err);
    }
})();
