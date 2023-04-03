const mongoose = require('mongoose');
const Schema = mongoose.Schema

const ProjectSchema = new Schema({
  id: {
    type: String,
    unique: true,
		require: true,
  },
  date: {
    type: String,
    require: true
	},
	name: {
    type: String,
    require: true
	},
	user: {
    type: String,
    require: true
  },
  count: {
    type: Number,
    require: false
  }
});

module.exports = mongoose.model('Project', ProjectSchema)

