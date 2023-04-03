let User = require('../models/user');

describe('/models/user', () => {
	before(() => {
		User.new({
			username: 'sun',
			password: 123
		})
	})
	it('should return an Object when find by username=sun', () => {
		User.find({
			username: 'sun'
		})
	})
})