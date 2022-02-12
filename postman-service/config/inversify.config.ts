import { Container } from "inversify";

import { DBInterface, DB } from '../types/db.types';
import { LoggerInterface, Logger } from '../types/logger.types';
import { QueueInterface, QUEUE } from "../types/queue.types";

import { MySQLDB } from '../loaders/mysql';
import { RabbitMQ } from "../loaders/rabbitmq";
import { WinstonLogger } from '../loaders/winston-logger';

const serviceContainer = new Container();

serviceContainer.bind<DBInterface>(DB).to(MySQLDB);
serviceContainer.bind<QueueInterface>(QUEUE).to(RabbitMQ).inSingletonScope();
serviceContainer.bind<LoggerInterface>(Logger).to(WinstonLogger).inSingletonScope();

export { serviceContainer };