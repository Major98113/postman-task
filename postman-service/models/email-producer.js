import { Kafka } from 'kafkajs';

class KafkaBroker {
    constructor() {
        this.messageBroker = new Kafka({
            clientId: process.env.QUEUE,
            brokers: ['kafka1:9092', 'kafka2:9092']
        });
        this.producer = this.messageBroker.producer();
        this.topic = 'email_messages';
    }

    async connect() {
        try {
            await this.producer.connect();
        }
        catch ( err ){
            throw new Error( "Internal error happended" );
        }
    }

    async sendToQueue( message ) {
        try {
            await this.producer.send({
                topic: this.topic,
                messages: [
                    { value: message },
                ],
            });
        }
        catch ( err ){
            throw new Error( "Internal error happended" );
        }
    }

    async disconnect() {
        try {
            await this.producer.disconnect();
        }
        catch  (err ) { 
            throw new Error( "Internal error happended" );
        }
    }
}

export { KafkaBroker };