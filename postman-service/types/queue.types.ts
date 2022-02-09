export interface QueueInterface {
    connect: any,
    sendToQueue: any,
    disconnect: any
}

export const QUEUE = Symbol.for('QUEUE');