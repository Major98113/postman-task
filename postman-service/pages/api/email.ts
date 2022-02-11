import { NextApiRequest, NextApiResponse } from 'next';
import { serviceContainer } from '../../config/inversify.config';
import { QueueInterface, QUEUE } from '../../types/queue.types';
import { LoggerInterface, Logger } from "../../types/logger.types";
import { DB, DBInterface } from "../../types/db.types";
import { EmailService } from '../../services/email.service';
import { subscribeMailer } from '../../libs/mailer';

const emailsHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const loggerInstance = serviceContainer.get<LoggerInterface>(Logger);
  const DBInstance = serviceContainer.get<DBInterface>(DB);
  const QueueInstance = serviceContainer.get<QueueInterface>(QUEUE);

  const EmailServiceInstance = new EmailService( serviceContainer.get<DBInterface>(DB) );
  if (req.method === 'POST') {
    loggerInstance.logServiceRequest(`emailsHandler POST body: ${JSON.stringify(req.body)}`);
    const {data} = req.body; 

    await DBInstance.connect();
    await QueueInstance.connect();
    const emailId = await EmailServiceInstance.createEmailsBatch(Number(data));
    loggerInstance.logServiceRequest(`emailsHandler emailId: ${emailId}`);
    await QueueInstance.sendToQueue(JSON.stringify({emailId, emailsCount: Number(data)}));
    
    subscribeMailer(emailId);
    
    await QueueInstance.disconnect();
    await DBInstance.disconnect();

    return res.status(200).json({emailId});
  }
  }

export default emailsHandler;