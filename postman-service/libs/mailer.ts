import { serviceContainer } from '../config/inversify.config';
import { DB, DBInterface } from "../types/db.types";
import { LoggerInterface, Logger } from '../types/logger.types';
import { EmailService, IEmail, Statuses } from "../services/email.service";

export const subscribeMailer = async ( emailId: string ) => {
    const DBInstance = serviceContainer.get<DBInterface>(DB);
    const loggerInstance = serviceContainer.get<LoggerInterface>( Logger );
    const EmailServiceInstance = new EmailService( DBInstance );
    await DBInstance.connect();
    const email: IEmail = await EmailServiceInstance.getEmailsBatchStatus(emailId);
    for( let i = 1; i <= email.emailsCount; i++ ) {
        loggerInstance.logServiceRequest(`subscribeMailer worker message: ${ emailId } will be updated with count: ${i}`);
        const status: Statuses = await EmailServiceInstance.updateEmailsBatchStatus( emailId, i, email.emailsCount );
        if ( status === Statuses.SUCCESS ) {
            loggerInstance.logServiceRequest(`subscribeMailer cleared Interval for emailId: ${emailId}`);
        }
        loggerInstance.logServiceRequest(`subscribeMailer status: ${ emailId } was updated successfully`);
    }
    await DBInstance.disconnect();
};