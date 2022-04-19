const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = new mongoose.Schema({
      email: String,
      username: String,
      password: String,
      admin: Boolean
    });
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  };
  const User = mongoose.model('Admins', userSchema);
  module.exports = (email, username, password, admin) => {
      let newUserAdmin = new User({
          email: email,
          username: username,
          password: bcrypt.hashSync(password, bcrypt.genSaltSync(8), null),
          admin: admin
      })
      newUserAdmin.save();
      console.log("usuario admin creado con exito!")
  }