import {createConnection} from 'mysql2/promise';
import { injectable } from 'inversify';
import 'reflect-metadata';
import { serviceContainer } from '../config/inversify.config';
import { LoggerInterface, Logger } from '../types/logger.types';
import { DBInterface } from '../types/db.types';

@injectable()
class MySQLDB implements DBInterface{
    private connection : any;
    private readonly logger: any;
    private readonly dbOptions: { 
        host: string | undefined;
        port: number;
        database: string | undefined;
        user: string | undefined;
        password: string | undefined;
    };

    constructor() {
        const { DB_HOST, DB_PORT, DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env;
        this.dbOptions = {
            host: DB_HOST,
            port: Number( DB_PORT ),
            database: DB_NAME,
            user: DB_USERNAME,
            password: DB_PASSWORD
        };

        this.logger = serviceContainer.get<LoggerInterface>( Logger );
        this.logger.logDBRequest(`DB_HOST: ${DB_HOST}`);
    }

    async connect() {
        try {
            this.logger.logDBRequest("Start connecting to DB");
            this.connection = await createConnection(this.dbOptions);
            this.logger.logDBRequest("Connection to DB successfully finished");
        }
        catch ( err: any ){
            this.logger.logError( err.message || "DB connection error" + JSON.stringify( err ) );
            throw new Error( "Internal error happended" );
        }
    }

    async disconnect() {
        try {
            this.logger.logDBRequest("Start disconnecting from DB");
            await this.connection.end();
            this.logger.logDBRequest("Disconnection from DB successfully finished");
        }
        catch  (err: any ) {
            this.logger.logError( err.message || "DB disconnection error" + JSON.stringify( err ) )
            throw new Error( "Internal error happended" );
        }
    }

    async query( queryStr: string, params: any[] ) {
        try {
            this.logger.logDBRequest("DB query: " + queryStr );
            if (params) {
                return await this.connection.query(queryStr, params);
            }
            return await this.connection.query(queryStr);
        }
        catch ( err: any ) {
            this.logger.logError( err.message || "DB query error" + JSON.stringify( err ) );
            throw new Error( "Internal error happended" );
        }
    }
}

export { MySQLDB };