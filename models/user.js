const mongoose = require('mongoose');

const foodShema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

})

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  pantry: [foodShema]
});


const User = mongoose.model('User', userSchema);

module.exports = User;
