 
const mongoose = require("mongoose") // new
const config = require('./config');

// Connect to MongoDB database

const mongodbUrl = config.ENV =='local' ? config.LOCAL_MONGODB_URL : config.MONGODB_URL;

mongoose.connect(mongodbUrl, { useNewUrlParser: true })
	.then(() => {
        console.log("Connected to the database");
	})

module.exports = mongoose