const mongoose = require('mongoose')

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log("MongoDB connection ok");
	  })
	.catch(err => {
		console.error('MongoDB connection error:', err.message)
	})

const db = mongoose.connection

module.exports = db
