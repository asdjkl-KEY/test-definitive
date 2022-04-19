const LocalStrategy = require('passport-local').Strategy;
const User = require('../app/models/user');
const bcrypt = require('bcrypt-nodejs');

module.exports = function (passport) {
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

  // Signup
  passport.use('local-register', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback : true
  },
  function (req, username, password, done) {


    let pass1 = req.body.password;
    let pass2 = req.body.password2;
    let regex = /^(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ]/;
    let regex2 = /^[0-9A-Za-z\s\-]+$/;
    //conditionals
    if(pass1 != pass2){
      return done(null, null, req.flash('signUpMessage', "Las contraseñas no coinciden"))
    }
    if(pass1.length < 8){
      return done(null, null, req.flash('signUpMessage', "La contraseña debe tener un mínimo de 8 caracteres"))
    }
    if(!regex.test(pass1)) {
      return done(null, null, req.flash('signUpMessage', "La contraseña debe incluir por lo menos 1 de cada uno estos tipos de caracteres: Números(0-9), caracteres especiales(~ñ_-=?*&%$#@ etc.), minúsculas(a-z), mayúsculas(A-Z)"))
    }
    let name = req.body.username;
    if(name.length < 5){
      return done(null, null, req.flash('signUpMessage', "El nombre de usuario debe tener almenos 5 caracteres y no puede contener caracteres especiales, solo números,letras guiones(-)"))
    }
    if(!regex2.test(name)){
      return done(null, null, req.flash('signUpMessage', "El nombre de usuario solo puede contener guiones, numeros, mayúsculas y minúsculas."))
    }

    User.findOne({'username': username}, function (err, user) {
      if (err) {
        return done(err);
      }
      if (user) {
        return done(null, false, req.flash('signUpMessage', 'El correo ya está en uso'));
      } else {
        var newUser = new User({
          email: req.body.email,
          username: username,
          admin: true,
          avatar: user,
          password: bcrypt.hashSync(password, bcrypt.genSaltSync(8), null),
          notifications: req.body.notifications,
          pptu: req.body.pptu,
          registeredBy: false,
          createdAt: new Date(),
          accountType: "admin"
        });
        newUser.save(function (err) {
          if (err) { throw err; }
          return done(null, newUser);
        });
      }
    });
  }));
  passport.use('local-login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  },
  function (req, username, password, done) {
    User.findOne({'username': username}, function (err, user) {
      if (err) { return done(err, false, req.flash('loginMessage', "Ha ocurrido un error inesperado inténtelo de nuevo más tarde")); }
      if (!user) {
        return done(null, false, req.flash('loginMessage', 'Usuario no encontrado'))
      }
      if (!user.validPassword(password)) {
        return done(null, false, req.flash('loginMessage', 'Contraseña incorrecta'));
      }
      return done(null, user);
    });
  }));
  passport.use('admin-login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  },
  function (req, username, password, done) {
    User.findOne({'username': username, 'admin': true}, function (err, user) {
      if (err) { return done(err, false, req.flash('loginMessage', "Ha ocurrido un error inesperado inténtelo de nuevo más tarde")); }
      if (!user) {
        return done(null, false, req.flash('adminMessage', 'Usuario no encontrado'))
      }
      if (!user.validPassword(password)) {
        return done(null, false, req.flash('adminMessage', 'Contraseña incorrecta'));
      }
      return done(null, user);
    });
  }));
}

//bcrypt.compareSync(password, this.password)