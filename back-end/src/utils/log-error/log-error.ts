import { createLogger, format, transports } from 'winston'
import { LogErrorFile } from '../protocols/log-error-file'
export class LogError implements LogErrorFile {
    private dirName = './error-system/'
    private fileName = 'logs-error.txt'

    log(stack: string): void {
        const logger = createLogger({
            transports: [
                new transports.File({
                    dirname: 'logs',
                    filename: 'log-errors.log',
                }),
            ],
            format: format.combine(
                format.timestamp(),
                format.printf(({ timestamp, level, message, service }) => {
                    return `[${timestamp}] ${service} ${level}: ${message}`
                })
            ),
            defaultMeta: {
                service: 'server-errors',
            },
        })
      
        logger.error(stack)
    }
}
 