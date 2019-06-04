const router = require('express').Router();

const Bears = require('./bears-model.js'); 

router.get('/', (req, res) => {
    Bears.find()
    .then(bear => {
        res.status(200).json(bear)
    })
    .catch(error => {
        res.status(500).json(error)
    })
})

router.get('/:id', validateUserId, (req, res) => {
    const id = req.params.id;
    Bears.findById(id)
    .then(bear => {
        res.status(200).json(bear)
    })
    .catch(error => {
        res.status(500).json(error)
    })
})

router.post('/', (req, res) => {
    Bears.insert(req.body)
    .then( newBear => {
        res.status(201).json(newBear)
    })
    .catch(error => {
        res.status(500).json(error)
    })
})

router.delete('/:id', validateUserId, (req, res) => {
    const id = req.params.id;

    Bears.remove(id)
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

    Bears.update(id, changes)
    .then( updatedBear => {
        res.status(200).json(updatedBear)
    })
    .catch(error => {
        res.status(500).json(error)
    })
})

function validateUserId(req, res, next) {
    const id = req.params.id;

    Bears.findById(id)
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