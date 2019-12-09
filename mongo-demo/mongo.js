const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connect to mongodb...'))
    .catch(err => console.log('Could not Connect to mongodb...'));

const courseSchema = mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'angular Course',
        author: 'sivareddy',
        tags: ['angular', 'frontend'],
        isPublished: true
    });

    const result = await course.save();
    console.log(result);
}

/**
 * get Query
 * .find() -- get all data aganist that model schema
 * .find({}) -- querying data based on filters
 * .limit(size) -- get limited set of results
 * .sort({ key1: 1, key2: -1 }) -- 1 desc, -1 asc
 */
async function getCourses() {
    const courses = await Course
        .find({ author: 'sivareddy', isPublished: true })
        .limit(10)
        .sort({ name: 1 })
    console.log(courses);
}

getCourses();