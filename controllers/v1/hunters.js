const router = require('express').Router()
const db = require('../../models')

// WITH PROMISES
router.get('/', (req, res) => {
    db.Hunters.find()
    .then(hunters => {
        res.status(200).send(hunters)
    })
    .catch(err => {
        console.log(`Error in GET /bounties: ${err}`)
        res.status(503).send({ message: 'Database Asleep?'})
    })
})

router.post('/', (req, res) => {
    db.Hunter.create(req.body)
    .then(newHunter => {
        res.status(201).send(newHunter)
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

router.post('/:id', (req, res) => {
    db.Hunter.create(req.body)
    .then(newHunter => {
        db.Bounty.findById(req.params.id)
        .then(bounty => {
            bounty.hunters.push(newHunter.id)
            bounty.save()
            .then(() => {
                res.send('Done.')
            })
        })
    })
})

module.exports = router