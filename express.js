const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const config = require('config');
const express = require('express');
const Joi = require('joi');
const app = express();
const log = require('./middleware/logger');
const helmet = require('helmet');
const morgan = require('morgan');
const courses = require('./router/courses');
const home = require('./router/home');

/**
 * PUG Usage
 */
app.set('view engine', 'pug');
app.set('views', './views'); // default


app.use(express.json()); // Use to Convert payload To req.body
app.use(express.urlencoded({ extended: true })); // Use to Convert FormData To req.body
app.use(express.static('public')); // To serve static File Inside public Folder Like readme.txt or readme.html
app.use(log);
app.use(helmet());

/*
* Gives Us The Application Environment like production, stagging, development
* console.log(`NODE_ENV :- ${process.env.NODE_ENV}`);/
* console.log(`ENV :- ${app.get('env')}`);
*/

/**
 * Configuration
 * This Is Serve values from confi folder based on NODE_ENV variables
 * it look for file aganist that(NODE_ENV) And load aganist That File
 * But custom-environment-variables.js is used to reference environment variables
 */
console.log('Application Name:- ' + config.get('name'));
console.log('mail Server :- ' + config.get('mail.host'));
console.log('mail Password :- ' + config.get('mail.password')); // Serve From config custom-environment-variables

/**
 * debug
 * 'app:startup' -- use to log application logs
 * 'app:db' -- use to log DB logs
 * Both Are Used To replace console.log
 * This debug package give us more power to log which type of data to log either application or db
 * We can manage both using environment variable called "DEBUG"\
 * if DEBUG=app:startup only to log application consoles
 * if DEBUG=app:db only to log db consoles
 * if Log Both At a Time use DEBUG=app:startup,app:db X(or) DEBUG=app:*
 * 
 * usage:-
 * startupDebugger('Morgon Enabled...'); for application level debug
 * dbDebugger('DB Logged'); for DB level log
 */

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    //console.log('Morgon Enabled...'); // We can Replace Console.log with starpDebugger
    startupDebugger('Morgon Enabled...');
    dbDebugger('DB log Enabled');
}

const port = process.env.PORT || 3000;



app.use('/api/courses', courses);
app.use('/', home);

app.listen(port, () => console.log(`Listening on port ${port}...`));