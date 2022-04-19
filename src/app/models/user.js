const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = new mongoose.Schema({
      email: String,
      username: String,
      password: String,
      admin: Boolean,
      avatar: String,
      notifications: String,
      pptu: String,
      registeredBy: String,
      createdAt: Date,
      accountType: String
  });

userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  };
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);