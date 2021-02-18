const mongoose = require('mongoose')

const hunterSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    guns: Number,
    ship: String
})

module.exports = mongoose.model('Hunter', hunterSchema)