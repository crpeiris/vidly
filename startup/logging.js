const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

module.exports = function() {
    //catch uncaought exception and pass to winston
   
   winston.exceptions.handle(
    new winston.transports.Console({collorize: true, prettyPrint: true}),
        new winston.transports.File({filename: 'uncaughtExceptions.log'})
   )
   
    process.on('unhandledRejection', (ex)=>{
        //console.log ('WE FAILD in STARTUP');
        throw (ex);
        //process.exit(1);
    });

    winston.add(new winston.transports.File({filename: 'winstonlog.log'}));
    winston.add(new winston.transports.MongoDB({
        db:'mongodb://127.0.0.1:27017/vidly', 
        level: 'info'
    }));
    //winston.add(new winston.transports.Console,{ handleExceptions: true });
}



