import "dotenv/config"
import consola from "consola"

import { db } from "./db"
import { device, network, node, test } from "./schema"

async function main() {

    consola.log("Seeding database...")

    await db.insert(device)
        .values([
            {
                id: 1,
                name: 'U7 Pro',
                brand: 'Ubiquiti',
                image: 'https://cdn.ecomm.ui.com/products/fa8dd4e4-36c8-4c79-a928-22c7bff2ce29/ab5bc8a4-6135-402e-a695-e3ea5e16d3e6.png',
                productLink: 'https://store.ui.com/us/en/products/u7-pro'
            },
            {
                id: 2,
                name: 'U6-LR',
                brand: 'Ubiquiti',
                image: 'https://images.svc.ui.com/?u=https%3A%2F%2Fcdn.ecomm.ui.com%2Fproducts%2Fd8fee47d-b53e-4a86-a5cb-cf2f6ab1c5ef%2F4f1f5856-05c2-4989-970e-6751e6af7eb9.png',
                productLink: 'https://store.ui.com/us/en/products/u6-lr'
            },
            {
                id: 3,
                name: 'UAP-AC-Pro',
                brand: 'Ubiquiti',
                image: 'https://store.ui.com/us/en/category/all-wifi/products/uap-ac-pro',
                productLink: 'https://store.ui.com/us/en/category/all-wifi/products/uap-ac-pro'
            },
            {
                id: 4,
                name: 'UK-Ultra',
                brand: 'Ubiquiti',
                image: 'https://m.media-amazon.com/images/I/21tYPepBSKL.jpg',
                productLink: 'https://store.ui.com/us/en/products/uk-ultra'
            }
        ])

    await db.insert(network)
        .values([
            {
                id: 1,
                ssid: "Dial-Up WiFi",
                password: ""
            },
            {
                id: 2,
                ssid: "Never Gonna Give You",
                password: "Uptime"
            }
        ])

    await db.insert(node)
        .values([
            {
                id: 1,
                name: "Node Test 1",
                description: "Node Test 1",
                status: "offline",
                mac: ["ff:ff:ff:ff:ff:ff", "00:00:00:00:00:00"],
                discovery: "manual",
                networkId: 1,
            },
            {
                id: 2,
                name: "Node Test 2",
                description: "Node Test 2",
                status: "working",
                mac: ["00:15:5d:69:ca:2c"],
                discovery: "manual",
                networkId: 1,
            },
            {
                id: 3,
                name: "Node Test 3",
                description: "Node Test 3",
                status: "online",
                mac: ["02:42:fe:ff:65:ff"],
                discovery: "manual",
                networkId: 2,
            }
        ])

    await db.insert(test)
        .values([
            {
                id: 1,
                deviceId: 1,
                type: "iperf3",
                host: "sunlight.local",
                port: 5201,
                options: '{}',
                nodeId: 1
            },
            {
                id: 2,
                deviceId: 1,
                type: "iperf3",
                host: "sunlight.local",
                port: 5202,
                options: '{}',
                nodeId: 3
            },
            {
                id: 3,
                deviceId: 2,
                type: "iperf3",
                host: "sunlight.local",
                port: 5201,
                options: '{}',
                nodeId: 2
            },
            {
                id: 4,
                deviceId: 2,
                type: "iperf2",
                host: "sunlight.local",
                port: 5201,
                options: '{}',
                nodeId: 3
            }
        ])

    process.exit(0)
}

main().catch((error) => {
    consola.error('Seeding database failed...')
    consola.error(error)
    process.exit(1)
})