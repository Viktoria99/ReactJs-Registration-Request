/* eslint-disable global-require */
import { format } from 'date-fns';
import { ru } from 'date-fns/locale/ru';
import winston from 'winston';

import config from 'config';

const DATE_FORMAT = 'DD-MM-YYYY HH:mm:ss';

let transports = [];
let timestamp = format(
    new Date(),
    DATE_FORMAT,
    { locale: ru }
);

transports.push(new (winston.transports.Console)({
    ...config.logger.console,
    timestamp
}));

const log = new winston.Logger({ transports });

export default log;
