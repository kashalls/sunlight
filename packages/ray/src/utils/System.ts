import os from 'node:os'

export function getHostname() {
    return os.hostname().toLocaleLowerCase()
}

export function getMacAddresses() {
    return [...new Set(Object.values(os.networkInterfaces()).flat().filter((iface) => !iface?.internal).map((iface) => iface?.mac))]

}