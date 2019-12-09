const express = require('express');
const router = express.use();


router.get('/', (req, res) => {
    //res.send(`Hello World.....`);
    // Syntax to send PUG as a html
    res.render('index', { title: "My Express App", message: "Hello World" });
});

module.exports = router;