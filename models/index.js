// Require mongoose!
const mongoose = require('mongoose')

// Provide a mongo connection string
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/hunters2', 
{
    useUnifiedTopology: true,
    useNewUrlParser: true
})

// Export all of our mongoose models that we have in the models folder
module.exports.Bounty = require('./bounty')