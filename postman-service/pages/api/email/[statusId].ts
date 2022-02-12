import { NextApiRequest, NextApiResponse } from "next";
import { serviceContainer } from '../../../config/inversify.config';
import { LoggerInterface, Logger } from "../../../types/logger.types";
import { DB, DBInterface } from "../../../types/db.types";
import { EmailService } from '../../../services/email.service';

const emailStatusHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const loggerInstance = serviceContainer.get<LoggerInterface>(Logger);
    const DBInstance = serviceContainer.get<DBInterface>(DB);
    const EmailServiceInstance = new EmailService( DBInstance );
    if (req.method === 'GET') {
        loggerInstance.logServiceRequest(`emailStatusHandler GET query: ${JSON.stringify(req.query)}`);
        const { statusId } = req.query;
        if (typeof statusId !== 'string') {
            loggerInstance.logError(`emailStatusHandler statusId is not a string`);
            return res.status(500).json({message: "Something went wrong"});
        }
        await DBInstance.connect();
        const email = await EmailServiceInstance.getEmailsBatchStatus(statusId);
        loggerInstance.logServiceRequest(`emailStatusHandler email: ${email}`);
        await DBInstance.disconnect();
        return res.status(200).json({data: email});
    }
}

export default emailStatusHandler;