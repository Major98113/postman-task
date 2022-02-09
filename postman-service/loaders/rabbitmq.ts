import amqplib, { Connection, Channel } from 'amqplib';
import { injectable } from 'inversify';
import 'reflect-metadata';
import { serviceContainer } from '../config/inversify.config';
import { LoggerInterface, Logger } from '../types/logger.types';
import { QueueInterface } from '../types/queue.types';

@injectable()
class RabbitMQ implements QueueInterface {
    private readonly logger: LoggerInterface;
    private readonly amqpUrl: string;
    private readonly queue: string;

    private connection: Connection | undefined;
    private channel: Channel | undefined;

    constructor() {
        // @ts-ignore
        this.amqpUrl = process.env.AMQP_URL;
        // @ts-ignore
        this.queue = process.env.QUEUE;
        this.logger = serviceContainer.get<LoggerInterface>( Logger );
    }

    async connect() {
        try {
            this.logger.logDBRequest(`Start connecting to RabbitMQ: ${this.amqpUrl}`);

            this.connection = await amqplib.connect( this.amqpUrl );
            this.channel = await this.connection.createChannel();
            
            await this.channel.assertQueue( this.queue, { durable: true });

            this.logger.logDBRequest("Connection to RabbitMQ successfully finished");
        }
        catch ( err: any ){
            this.logger.logError( err.message || "RabbitMQ connection error" + JSON.stringify( err ) );
            throw new Error( "Internal error happended" );
        }
    }

    async sendToQueue( message: string ) {
        try {
            this.logger.logDBRequest(`Start sending message to queue: ${ this.queue }`);

            await this.channel?.sendToQueue( this.queue, Buffer.from( message ) );

            this.logger.logDBRequest("message successfully sent");
        }
        catch ( err: any ){
            this.logger.logError( err.message || "RabbitMQ sending message error" + JSON.stringify( err ) );
            throw new Error( "Internal error happended" );
        }
    }

    async disconnect() {
        try {
            this.logger.logDBRequest("Start disconnecting from RabbitMQ");
            
            if( this.channel && this.connection ) {
                await this.channel.close();
                await this.connection.close();
            }

            this.logger.logDBRequest("Disconnection from RabbitMQ successfully finished");
        }
        catch  ( err: any ) {
            this.logger.logError( err.message || "RabbitMQ disconnection error" + JSON.stringify( err ) )
            throw new Error( "Internal error happended" );
        }
    }
}

export { RabbitMQ };