import { Worker } from "worker_threads";
import path from 'path';

import { serviceContainer } from '../config/inversify.config';
import { DB, DBInterface } from "../types/db.types";
import { EmailService, Statuses } from "../services/email.service";

export const subscribeMailer = ( emailId: string ) => {
    const EmailServiceInstance = new EmailService( serviceContainer.get<DBInterface>(DB) );
    const worker = new Worker( path.resolve( __dirname, "./mailer.worker.js" ), { workerData: { emailId }});

    worker.once("message", async ({ emailId, count }) => {
        console.log( `subscribeMailer worker message: ${ emailId } will be updated with count: ${ count }` );

        const status: Statuses = await EmailServiceInstance.updateEmailsBatchStatus( emailId, count );

        if ( status === Statuses.SUCCESS ) {
            worker.emit('exit');
        }

        console.log( `Status: ${ emailId } was updated successfully` );
    });

    worker.on( "error", error => {
        throw new Error( error.message );
    });

    worker.on( "exit" , exitCode => {
        console.log(exitCode);
    })
};