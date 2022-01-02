//----------------------------------------------------------------------
//IMPORTS
//----------------------------------------------------------------------

const path = require('path')
const express = require('express');
const cors = require('cors')
const productsRoutes = require('./routes/productRoutes')
const cartRoutes = require('./routes/cartRoutes')
const invalidRoute = require('./routes/invalidRoutes')
const userRoutes = require('./routes/userRoutes')
const messagesRoutes = require('./routes/messagesRoutes')
const app = express();
const server = require("http").Server(app);
const session = require('express-session');
const passport = require('passport')
const flash = require('connect-flash');
const { isAuthenticated }  = require('./middlewares/isAuthenticated')
var moment = require('moment');
require('./services/passportLocal')


//----------------------------------------------------------------------
//SETTINGS
//----------------------------------------------------------------------

app.set('views', path.join(__dirname + '/views'))
app.set('view engine', 'ejs')

//----------------------------------------------------------------------
//MIDDLEWARES
//----------------------------------------------------------------------

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(express.static(__dirname + '/public'));

//----------------------------------------------------------------------
//SESSION
//----------------------------------------------------------------------

app.use(session({
    secret: 'secreto',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 20 * 1000 * 60,
      },
}));

//----------------------------------------------------------------------
//PASSPORT
//----------------------------------------------------------------------

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//----------------------------------------------------------------------
//ROUTES
//----------------------------------------------------------------------

app.use((req, res, next) => {
  app.locals.error = req.flash('error')
  app.locals.user = req.user;
  next();
});

app.use('/', userRoutes)

app.use('/productos', isAuthenticated, productsRoutes)

app.use('/carrito', isAuthenticated, cartRoutes)

app.use('/chat', isAuthenticated, messagesRoutes)

app.use('*', invalidRoute)

//----------------------------------------------------------------------
// WEBSOCKETS
//----------------------------------------------------------------------

const io = require('socket.io')(server);

var messages = []

io.on('connection', socket => {

      // Enviar todos los mensajes cuando un cliente se conecta
      socket.emit(`todos-los-mensajes`, { mensajes: messages})

      // Recibo el mensaje y lo proceso
      socket.on('nuevo-mensaje', (messageData) => {

        let time = moment().format('DD/MM/YYYY hh:mm')

        let newMessage = {
          name: app.locals.user.name,
          mensaje: messageData.mensaje,
          time: time
        }

        messages.push(newMessage)

        io.sockets.emit('recibir nuevoMensaje', [newMessage])
      })

});


module.exports = server