/**
 * Created by Benzo Media.
 * http://www.benzomedia.com
 * User: Oren Reuveni
 * Date: 05/07/2016
 * Time: 08:30
 */
const winston = require('winston')



module.exports = new winston.Logger({
    transports: [
        new (winston.transports.Console)({
            handleExceptions: true,
            humanReadableUnhandledException: true
        }),
        new (winston.transports.File)({filename: 'pornbookclub.log'})
    ],
    exceptionHandlers: [
        new winston.transports.File({
            filename: 'exceptions.log',
            humanReadableUnhandledException: true
        })
    ]
})