import { createLogger, format, transports } from 'winston';
import environment from './environment.js';

const timezoned = () => {
  return new Date().toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
  });
};

const getLogLevel = () => {
  const level = environment.app.logLevel?.toLowerCase();

  switch (level) {
    case 'test':
      return 'silent';
    case 'error':
      return 'error';
    case 'debug':
    default:
      return 'debug';
  }
};

const level = getLogLevel();

const loggerConfig = createLogger({
  level: level === 'silent' ? 'error' : level,
  silent: level === 'silent',
  exitOnError: false,
  format: format.combine(format.timestamp({ format: timezoned }), format.json()),
  transports: [
    new transports.Console({
      silent: level === 'silent',
    }),
  ],
  exceptionHandlers: [
    new transports.Console({
      level: 'error',
      silent: level === 'silent',
    }),
  ],
});

export default loggerConfig;
