import { v4 as uuidv4 } from 'uuid';
import { injectable } from 'inversify';
import 'reflect-metadata';

import { DBInterface } from '../types/db.types';
import { serviceLogger as log } from '../libs/logger.helpers';
import { serviceContainer } from '../config/inversify.config';
import { LoggerInterface, Logger } from '../types/logger.types';

export enum Statuses {
    PENDING,
    SUCCESS
}

interface IEmail {
    id: string;
    emailsCount: number;
    sentCount: number;
    status: Statuses
}

@injectable()
class EmailService{
    private readonly DB: DBInterface;
    private readonly table = `emails`;
    private readonly logger: LoggerInterface;

    constructor( DB: DBInterface ) {
        this.DB = DB;
        this.logger = serviceContainer.get<LoggerInterface>( Logger );
    }

    @log
    public async getEmailsBatchStatus( emailId: string): Promise<IEmail>{
        const { rows: [ email ] } = await this.DB.query(
            `SELECT FROM ${ this.table }
                    WHERE id = ?`, 
                    [ emailId ]
        );
        return email;
    }

    @log
    public async createEmailsBatch( emailsCount: number | string): Promise<string> {
        this.logger.logServiceRequest(`createEmailsBatch emailsCount: ${emailsCount}`);
        const id: string = uuidv4();
        this.logger.logServiceRequest(`createEmailsBatch id: ${id}`);

        await this.DB.query(
            `INSERT INTO ${ this.table }
                ( id, emailsCount, sentCount, status )
                    VALUES ( ?, ?, ?, ? );`, 
                    [ id, Number(emailsCount), 0, Statuses.PENDING ]
        );
        return id;
    }

    @log
    public async updateEmailsBatchStatus( emailId: string, sentCount: number ): Promise<Statuses>{
        const { rows: [ email ] }: { rows: IEmail[] } = await this.DB.query(
            `SELECT FROM ${ this.table }
                    WHERE id = ?`, 
                    [ emailId ]
        );
        const newCountOfSentEmails = email.sentCount + sentCount;
        const newStatus = email.emailsCount === newCountOfSentEmails ? Statuses.SUCCESS : Statuses.PENDING;
        await this.DB.query(
            `UPDATE ${ this.table }
                SET sentCount = ?
                    AND status = ?
                        WHERE id = ?`, 
                [ newCountOfSentEmails, newStatus , emailId ]
        );
        return newStatus;
    }
}

export { EmailService };