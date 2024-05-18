import 'dotenv/config'
import os from 'node:os'

import { hc } from 'hono/client'
import type { WebSocketApp } from '../../api/src/index'

import { Socket, parseAndValidateMessage } from '@sunlight/utilities'

const hostname = os.hostname().toLocaleLowerCase()
const mac = [...new Set(Object.values(os.networkInterfaces()).flat().filter((iface) => !iface?.internal).map((iface) => iface?.mac))]

console.log(`Sunlight Ray | Hostname: "${hostname}" | MAC(s): ${mac.join(', ')}\n`)

const endpoint = process.env.ENDPOINT!
if (!endpoint) {
    throw Error('Missing endpoint address')
}

let heartbeat: Timer;
const client = hc<WebSocketApp>(endpoint)
const socket = client.ws.$ws()

socket.onmessage = async (event) => {
    if (event.type !== 'message') console.log(event)
    
    const data = await parseAndValidateMessage(event.data, Socket.WebsocketResponse)
    if (!data) return socket.close(1003, 'Invalid Message Data')
    
    if (data.op === 0) {
        if (data.d?.heartbeat_interval) {
            // Init Socket and Initialize Heartbeat
            clearInterval(heartbeat)
            heartbeat = setInterval(() => {
                return socket.send(JSON.stringify(Socket.Heartbeat))
            }, data.d?.heartbeat_interval as number)
            
            // Identify ourselves to the socket server so it can send preferred settings.
            return socket.send(JSON.stringify({ op: 2, d: { hostname, mac }}))
        }

        if (data.t === 'INIT_STATE') {
            // The server has set new preferences.
        }

        if (data.t === 'WORKLOAD_REQUEST') {
            const workload = data.d
            if (workload) {}
        }
    }
    console.log(event)
}

socket.onclose = async (event) => {
    clearInterval(heartbeat)
    console.log(`Lost connection to sunlight server...\nReason: ${event.code} - ${event.reason}`)
    return process.exit(1)
}