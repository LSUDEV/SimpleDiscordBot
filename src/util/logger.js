
const winston = require("winston");
require("winston-daily-rotate-file");

const customFormat = winston.format.printf(function(data) {
    return `[${data.level.toUpperCase()}] [${data.timestamp}]: ${data.message}`;
});

module.exports = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp(),
        customFormat
    ),
    transports: [
        new winston.transports.DailyRotateFile({
            level: "info",
            dirname: "./logs/info/",
            filename: "api-%DATE%.log",
            datePattern: "DD-MM-YYYY",
            frequency: "24h"
        }),
        new winston.transports.DailyRotateFile({
            level: "error",
            dirname: "./logs/error/",
            filename: "api-%DATE%.log",
            datePattern: "DD-MM-YYYY",
            frequency: "24h"
        }),
        new winston.transports.Console()
    ]
});