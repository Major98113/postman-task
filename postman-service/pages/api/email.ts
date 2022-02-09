import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import { RabbitMQ } from '../../loaders/rabbitmq';

const emailsHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        console.log("emailsHandler POST body:", JSON.stringify(req.body));
        const messageBroker = new RabbitMQ();
        const id = uuidv4();
        const {data} = req.body; 
        console.log("emailsHandler POST id:", id);
        await messageBroker.connect();
        await messageBroker.sendToQueue(JSON.stringify({id, emailsCount: Number(data)}));
        await messageBroker.disconnect();
        return res.status(200).json({id});
    }
  }

export default emailsHandler;