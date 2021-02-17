// require mongoose
const mongoose = require('mongoose')

// Create a bounty schema
const bountySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 64
    },
    wantedFor: {
        type: String,
        required: true
    },
    client: {
        type: String,
        required: true
    },
    reward: {
        type: Number,
        default: 10000
    },
    ship: String,
    hunters: Array,
    captured: {
        type: Boolean,
        default: false
    },
    lastSeen: String
})

module.exports = mongoose.model('Bounty', bountySchema)