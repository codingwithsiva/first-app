

function log(req, res, next) {
    console.log('Logging...........');
    next();
}

module.exports = log;


/*
const EventEmitter = require('events');

var url = "http://code.com/api/";

class Logger extends EventEmitter {
    log(message) {
        console.log(message);
        this.emit('messageLogged', { id: 1, url: "http://dsfa.com" });
    }

    register(value) {
        console.log(value);
    }
}

module.exports = Logger;
*/