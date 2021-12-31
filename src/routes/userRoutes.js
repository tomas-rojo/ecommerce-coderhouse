const router = require('express').Router();
const passport = require('passport');
const upload = require('../services/multer')

router.get('/', (req, res, next) => {
  res.redirect('/login');
});

router.get('/register', (req, res, next) => {
  res.render('register');
});

router.post('/register', upload.single('profile_img'), passport.authenticate('local-signup', {
    badRequestMessage: 'Complete todos los campos',
    successRedirect: '/productos/listar',
    failureRedirect: '/register',
    failureFlash: true
})); 

router.get('/login', (req, res, next) => {
  res.render('login');
});

router.post('/login', passport.authenticate('local-signin', {
  badRequestMessage: 'Complete todos los campos',
  successRedirect: '/productos/listar',
  failureRedirect: '/login',
  failureFlash: true
}));

router.get('/profile', (req, res, next) => {
  res.render('profile');
});

router.get('/logout', (req, res, next) => {
  req.logout();
  res.render('logout')
});

module.exports = router;
