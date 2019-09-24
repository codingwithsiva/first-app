const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const config = require('config');
const express = require('express');
const Joi = require('joi');
const app = express();
const log = require('./logger');
const helmet = require('helmet');
const morgan = require('morgan');

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
const courses = [
    { id: 1, name: "Course 1" },
    { id: 2, name: "Course 2" },
    { id: 3, name: "Course 3" },
    { id: 4, name: "Course 4" }
];

app.get('/', (req, res) => {
    //res.send(`Hello World.....`);
    // Syntax to send PUG as a html
    res.render('index', { title: "My Express App", message: "Hello World" });
});

app.get('/api/courses', (req, res) => {
    return res.send(courses);
});

app.post('/api/courses', (req, res) => {
    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    return res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));

    if (!course) return res.status(404).send('Selected Course does\'t exist');

    const { error } = validateCourse({ name: req.body.name });
    if (error) return res.status(400).send(error.details[0].message);
    course.name = req.body.name;

    return res.json(course);
});


app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('The course id that your given not found...');
    return res.send(course);
});


app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('The course id that your given not found...');

    const idx = courses.indexOf(course);
    courses.splice(idx, 1);

    return res.json(course);
});


function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    }

    return Joi.validate(course, schema);
}


app.listen(port, () => console.log(`Listening on port ${port}...`));