import { NextApiRequest, NextApiResponse } from "next";
import { serviceContainer } from '../../../config/inversify.config';
import { LoggerInterface, Logger } from "../../../types/logger.types";

const emailStatusHandler = (req: NextApiRequest, res: NextApiResponse) => {
    const loggerInstance = serviceContainer.get<LoggerInterface>(Logger);
    if (req.method === 'GET') {
        loggerInstance.logServiceRequest(`emailStatusHandler GET query: ${JSON.stringify(req.query)}`);
        const { statusId } = req.query;
        return res.status(200).json({data: statusId});
    }
}

export default emailStatusHandler;