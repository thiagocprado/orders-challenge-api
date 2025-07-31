import { createLogger, format, transports } from "winston";

const timezoned = () => {
  return new Date().toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
  });
};

const loggerConfig = createLogger({
  exceptionHandlers: [
    new transports.Console({
      level: "error",
    }),
  ],
  exitOnError: false,
  format: format.combine(
    format.timestamp({ format: timezoned }),
    format.json()
  ),
  transports: [new transports.Console()],
});

export default loggerConfig;
