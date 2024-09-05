import 'dotenv/config'
import { consola } from "consola";
import { Client, type Workload } from './Client'
import { getHostname, getMacAddresses } from './utils/System'
import { Socket, parseAndValidateMessage } from '@sunlight/utilities'
import { changeWifi } from './utils/WiFi';

import { runIPerf3 } from './utils/iPerf3';

consola.info(`Sunlight Ray | Hostname: "${getHostname()}" | MAC(s): ${getMacAddresses().join(', ')}\n`)

const client = new Client(process.env.ENDPOINT, 'json', 'none')
client.on('workload', async (data: Workload) => {
    const options = {
        host: data.host,
        port: data.port,
        duration: data.duration,
        status: data.status,
        ...data.options
    }
    if (data.task === 'IPERF') {
        // Preform Iperf Test

        //Currently outputs to console. In future, collect and parse output + send to sunlight.
        const output = await runIPerf3(options)
    }

    if (data.task === 'OPENSPEEDTEST') {
        // Requires external speedtest server (hopefully deployed on server.)
        // Should use puppeteer to actually preform the speed test as it requires you to view the page.
    }

    if (data.task === 'PUPPETEER') {
        // Automate surfing cached content from websites.
    }
})

client.on('configuration', async (data) => {
    if (data.wireless) {
        await changeWifi(data.wireless.ssid, data.wireless.psk)
    }
})