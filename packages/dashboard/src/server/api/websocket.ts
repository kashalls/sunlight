import type { Message } from 'crossws'

const hooks = new Map<string, () => void>()
const subscriptions = new Set<string>();

export default defineWebSocketHandler({
    open(peer) {
        console.log(`New Websocket: ${peer}`)
        peer.send({ op: ProtocolOp.Hello })
    },
    close(peer) {
        if (hooks.has(peer.id)) {
            hooks.get(peer.id)?.()
            hooks.delete(peer.id)
        }
        console.log(`Closed Websocket: ${peer}`)
    },
    error(peer, error) {
        console.log(`Error on Websocket: ${peer} ${error}`)
    },
    message(peer, message) {
        console.log(`${peer} -> B=${message.isBinary} ${message}`)
        const data = parseMessage(message)
        console.log(JSON.stringify(data))

        if (data.op === ProtocolOp.Initialize) {

        }
        const data = JSON.parse(message.text())
        if (data.op === ProtocolOp.Initialize) {
            for (const subscription of data.d) {
                peer.subscribe(subscription)
            }
        }
    }
})

function parseMessage(message: Message) {
    try {
        return JSON.parse(message.text()) as unknown;
    } catch (e) {
        console.error('Failed to parse JSON string:', e);
        return null;
    }
}