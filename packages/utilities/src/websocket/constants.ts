export const WebsocketState = [
    "INIT_STATE",   // This is the first time the server/client is sending this data.
    "CONFIG_UPDATE", // New node settings
    "WORKLOAD_REQUEST", // The server has work for the client.
    "WORKLOAD_RESULT" // The client is reporting back on the work.
] as const;

// Define a type alias for the union of the string literals
export type WebsocketState = typeof WebsocketState[number];

export const WebsocketHeartbeatInterval = 30000
