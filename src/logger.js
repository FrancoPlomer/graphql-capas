import winston from "winston";

function buildDevLogger() {
    const prodDev = winston.createLogger({
        transports: [
            new winston.transports.Console({ level: 'info' }),
            new winston.transports.File({ filename: 'error.log', level: 'error'}),
            new winston.transports.File({ filename: 'warn.log', level: 'warn'})
        ]
    })

    return prodDev;
}

const logger = buildDevLogger();

export default logger;