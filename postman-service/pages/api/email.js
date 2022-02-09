import { v4 as uuidv4 } from 'uuid';
import { KafkaBroker } from '../../models/email-producer';

export const EMAILS = [
    {
        id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
        emailsCount: 20
    }
];

export default async function emailsHandler(req, res) {
    if (req.method === 'POST') {
        console.log("emailsHandler POST body:", JSON.stringify(req.body));
        const messageBroker = new KafkaBroker();
        const id = uuidv4();
        const {data} = req.body; 
        console.log("emailsHandler POST id:", id);
        await messageBroker.connect();
        await messageBroker.sendToQueue({id, emailsCount: Number(data)});
        await messageBroker.disconnect();
        console.log("emailsHandler POST EMAILS:", EMAILS);
        return res.status(200).json({id});
    }
  }