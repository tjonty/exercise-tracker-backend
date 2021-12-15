const router = require('express').Router();
let User = require('../models/user.model');

router.get('/', (req, res) => {
    User.find({}, (err, docs) => {
        console.log(err);
        if(err) return res.status(400).json('Error: ' + err.message);

        res.json(docs)
    });
});

router.post('/add', async (req, res) => {
    const username = req.body.username;
    
    const newUser = new User({username});
    newUser.save((err, docs) => {
        if(err) return res.status(400).json('Error: ' + err.message);

        res.json('User added!');
    });
})

module.exports = router;