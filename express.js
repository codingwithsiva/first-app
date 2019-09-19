const express = require('express');
const app = express();

app.use(express.json());

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
    res.send(courses);
});

app.post('/api/course', (req, res) => {
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('The course id that your given not found...');
    else res.send(course);
    //res.send([1, 2, 3]);
});


app.listen(port, () => console.log(`Listening on port ${3000}...`));