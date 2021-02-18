// Require dependencies
const express = require('express')
const cors = require('cors')

// Create App as an instance of Express
const app = express()

// Set up middleware
app.use(express.urlencoded({extended: false})) // Accepts Form data
app.use(express.json()) // Handle data from AJAX requests
app.use(cors()) // Allow requests from other origins

// Include any pertinent controllers
app.use('/v1/bounties', require('./controllers/v1/bounties'))
app.use('/v1/hunters', require('./controllers/v1/hunters'))

// Wildcard route to handle every invalid request!
app.get('*', (req, res) => {
    res.status(404).send({ message: 'Not Found!' })
})

app.listen(3000, () => { console.log('App is listening on Port 3k 🦩')})