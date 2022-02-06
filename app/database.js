const mongoose = require('mongoose')

const databaseLink = 'mongodb://localhost/aegrosdb'

mongoose
	.connect(databaseLink, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(db => console.log('DB is connected'))
	.catch(err => console.log(err))
