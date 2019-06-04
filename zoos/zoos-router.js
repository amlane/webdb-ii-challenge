const router = require('express').Router();

const Zoos = require('./zoos-model.js'); 

router.get('/', (req, res) => {
    Zoos.find()
    .then(zoos => {
        res.status(200).json(zoos)
    })
    .catch(error => {
        res.status(500).json(error)
    })
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    Zoos.findById(id)
    .then(zoo => {
        res.status(200).json(zoo)
    })
    .catch(error => {
        res.status(500).json(error)
    })
})

router.post('/', (req, res) => {
    Zoos.insert(req.body)
    .then( newZoo => {
        res.status(201).json(newZoo)
    })
    .catch()
})

module.exports = router;