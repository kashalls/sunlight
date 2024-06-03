import type { Message } from 'crossws'

export function safeJsonParse<T>(json: string): T | null {
    try {
        return JSON.parse(json) as T;
    } catch (e) {
        console.error('Failed to parse JSON string:', e);
        return null;
    }
}

export async function parseMessage<T>(message: Message): <T | null> {
    const parsed = safeJsonParse(message.text())
}