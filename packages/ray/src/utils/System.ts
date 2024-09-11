import os from 'node:os'

export function getHostname() {
    return os.hostname().toLocaleLowerCase()
}

export function getMacAddresses() {
    return [...new Set(Object.values(os.networkInterfaces()).flat().filter((iface) => !iface?.internal).map((iface) => iface?.mac))]
}

export function getCpuCount() {
    return os.cpus().length
}

export function getMemory() {
    const totalMemory = os.totalmem()
    const freeMemory = os.freemem()

    return {
        total: totalMemory,
        free: freeMemory,
        used: totalMemory - freeMemory
    }
}

export function getInterface() {
    return os.networkInterfaces()
}