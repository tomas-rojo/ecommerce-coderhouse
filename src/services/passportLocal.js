const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../dal/mongoose/models/User');
const { sendMailWithNewRegisteredUser } = require('../services/sendMailWithGmail')

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

passport.use('local-signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  const user = await User.findOne({'email': email})
  if(user) {
    return done(null, false,  {message: 'Datos ingresados invalidos'});
  } 
  else {
    try {
      const newUser = new User();
      newUser.name = req.body.name;
      newUser.phone_number = req.body.phone_number;
      newUser.email = email;
      newUser.password = newUser.encryptPassword(password);
      if (req.file){ newUser.profile_img = req.file.filename } 
      sendMailWithNewRegisteredUser(req.body)
      await newUser.save();
      done(null, newUser)}
    catch {
      return done(null, false,  {message: 'Datos ingresados invalidos'});
    }
  }
} ));

passport.use('local-signin', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  const user = await User.findOne({email: email});
  if(!user) {
    return done(null, false, {message: 'Datos ingresados invalidos'});
  }
  if(!user.comparePassword(password)) {
    return done(null, false, {message: 'Contraseña Incorrecta'});
  }
  return done(null, user);
}));
