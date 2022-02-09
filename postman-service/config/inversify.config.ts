import { Container } from "inversify";

import { LoggerInterface, Logger } from '../types/logger.types';
import { QueueInterface, QUEUE } from "../types/queue.types";

import { RabbitMQ } from "../loaders/rabbitmq";
import { WinstonLogger } from '../loaders/winston-logger';

const serviceContainer = new Container();

serviceContainer.bind<QueueInterface>(QUEUE).to(RabbitMQ).inSingletonScope();
serviceContainer.bind<LoggerInterface>(Logger).to(WinstonLogger).inSingletonScope();

export { serviceContainer };