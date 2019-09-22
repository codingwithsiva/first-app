const express = require('express');
const Joi = require('joi');
const app = express();
const log = require('./logger');

app.use(express.json()); // Use to Convert payload To req.body
app.use(express.urlencoded({ extended: true })); // Use to Convert FormData To req.body
app.use(express.static('public')); // To serve static File Inside public Folder Like readme.txt or readme.html
app.use(log)

const port = process.env.PORT || 3000;
const courses = [
    { id: 1, name: "Course 1" },
    { id: 2, name: "Course 2" },
    { id: 3, name: "Course 3" },
    { id: 4, name: "Course 4" }
];

app.get('/', (req, res) => {
    res.send(`Hello World.....`);
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