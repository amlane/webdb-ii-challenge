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

router.get('/:id', validateUserId, (req, res) => {
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
    .catch(error => {
        res.status(500).json(error)
    })
})

router.delete('/:id', validateUserId, (req, res) => {
    const id = req.params.id;

    Zoos.remove(id)
    .then( deleted => {
        const unit = deleted > 1 ? 'records' : 'record';
        res.status(200).json({ message: `${deleted} ${unit} deleted.` });
    })
    .catch(error => {
        res.status(500).json(error)
    })
})

router.put('/:id', validateUserId, (req, res) => {
    const id = req.params.id;
    const changes = req.body;

    Zoos.update(id, changes)
    .then( updatedZoo => {
        res.status(200).json(updatedZoo)
    })
    .catch(error => {
        res.status(500).json(error)
    })
})

function validateUserId(req, res, next) {
    const id = req.params.id;

    Zoos.findById(id)
    .then( item => {
        if(item){
            req.item = item;
            next();
        } else {
            res.status(404).json({ error: "Invalid user id." })
        }
    })
    .catch(error => {
        res.status(500).json(error)
    })
}

module.exports = router;