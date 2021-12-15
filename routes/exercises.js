const router = require('express').Router();
let Exercise = require('../models/exercise.model');

router.get('/', (req, res) => {
    Exercise.find({}, (err, docs) => {
        if (err) return res.status(400).json('Error: ' + err.message);

        res.json(docs)
    });
})

router.post('/add', async (req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new Exercise({
        username: username, 
        description: description,
        duration: duration,
        date: date
    });

    await newExercise.save((err, docs) => {
        console.log(err);
        console.log(docs);
        if(err) return res.status(400).json('Error: ' + err);
        res.json('Exercise saved!');
    })
})


router.get('/:id', (req, res) => {
    console.log('in console.log')
    Exercise.findById(req.params.id, (err, docs) => {
        console.log(err);
        if(err) return res.status(400).json('Error: ' + err);
        console.log(docs);
        res.json(docs);
    });
});

router.delete('/:id', (req, res) => {
    Exercise.findByIdAndDelete(req.params.id, (err, docs) => {
        if(err) return res.status(400).json('Error: ' + err);
        res.json('Deteled!');
    })
});

router.post('/update/:id', (req, res) => {
    Exercise.findById(req.params.id, (err, docs) => {        
        if (err) return res.status(400).json('Error: ' + err);
        
        docs.username = req.body.username;
        docs.description = req.body.description; 
        docs.duration = Number(req.body.duration);
        docs.date = Date.parse(req.body.date);
        
        docs.save((err, docs) => {
            if (err) return res.status(400).json('Error: ' + err);
            return res.json('User update!');
        });
    })
});


module.exports = router;