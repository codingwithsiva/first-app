const express = require('express');
const router = express.Router();

const courses = [
    { id: 1, name: "Course 1" },
    { id: 2, name: "Course 2" },
    { id: 3, name: "Course 3" },
    { id: 4, name: "Course 4" }
];



router.get('/', (req, res) => {
    return res.send(courses);
});

router.post('/', (req, res) => {
    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    return res.send(course);
});

router.put('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));

    if (!course) return res.status(404).send('Selected Course does\'t exist');

    const { error } = validateCourse({ name: req.body.name });
    if (error) return res.status(400).send(error.details[0].message);
    course.name = req.body.name;

    return res.json(course);
});


router.get('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('The course id that your given not found...');
    return res.send(course);
});


router.delete('/:id', (req, res) => {
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

module.exports = router;