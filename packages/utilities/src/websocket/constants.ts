export const WebsocketStates = [
    "INIT_STATE",   // This is the first time the server/client is sending this data.
    "REPL_STATE",   // The server/client already has this data, but we want to replace it.
] as const;

// Define a type alias for the union of the string literals
export type WebsocketState = typeof WebsocketStates[number];

export const WebsocketHeartbeatInterval = 30000
