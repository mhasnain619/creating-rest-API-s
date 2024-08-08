const mongoose = require('mongoose')


//Connection

async function connectMongodb(url) {
    return mongoose.connect(url)
}

module.exports = {
    connectMongodb,
}