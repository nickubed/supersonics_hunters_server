const router = require('express').Router()
const db = require('../../models')

// WITH PROMISES
router.get('/', (req, res) => {
    db.Bounty.find()
    .then(bounties => {
        res.status(200).send(bounties)
    })
    .catch(err => {
        console.log(`Error in GET /bounties: ${err}`)
        res.status(503).send({ message: 'Database Asleep?'})
    })
})

// Create a new Bounty!
router.post('/', (req, res) => {
    db.Bounty.create(req.body)
    .then(newBounty => {
        res.status(201).send(newBounty)
    })
    .catch(err => {
        console.log(`Error in POST /bounties: ${err}`)
        if(err.name === 'ValidationError'){
            res.status(406).send({message: 'Validation Error. Your Fault.'})
        }
        else {
            res.status(503).send({message: 'I dunno, somethin wrong with tha DB'})
        }
    })
})

router.get('/:id', (req, res) => {
    db.Bounty.findById(req.params.id)
    .then(bounty => {
        if(bounty){
            res.status(200).send(bounty)
        } else {
            res.status(404).send({message: 'Resource not Found'})
        }
    })
    .catch(err => {
        console.log(`error fetching ONE bounty: ${err}`)
        res.status(503).send({ message: 'Service unavailable' })
    })
})

router.delete('/:id', (req, res) => {
    db.Bounty.findByIdAndDelete(req.params.id)
    .then(() => {
        res.status(200).send({ message: 'Delete Successful!' })
    })
    .catch(err => {
        console.log(`Error when deleting ONE bounty: ${err}`)
        res.status(503).send({message: 'Server-side error'})
    })
})

router.put('/:id', (req, res) => {
    db.Bounty.findOneAndUpdate({
        _id: req.params.id
    }, req.body, {
        new: true // <-- Returns the bounty *after* the update!
    })
    .then(updatedBounty => {
        res.status(200).send(updatedBounty)
    })
    .catch(err => {
        console.log(`error when updating a single bounty: ${err}`)
        res.status(503).send({ message: 'Server Error'})
    })
})

// ERROR FIRST HANDLING
router.get('/errorFirst', (req, res) => {
    db.Bounty.find({}, (err, bounties) => {
        if(err) res.status(503).send({message: 'DB sleepy?'})
        res.status(200).send(bounties)
    })
})

module.exports = router