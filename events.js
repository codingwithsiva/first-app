const EventEmitter = require('events');

const Logger = require('./logger');
const logger = new Logger();

logger.on('messageLogged', function (args) {
    console.log("Listner Called", args);
});

logger.log("message");
