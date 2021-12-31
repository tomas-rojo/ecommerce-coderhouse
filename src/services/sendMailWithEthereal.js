const nodemailer = require('nodemailer');
const moment = require("moment");

exports.sendMailWithEthereal = (req, res, next) => {
    if (req.url == "/success"){
        method = "Log In"
    }
    if(req.url == "/logout/"){
        method = "Log Out"
    }
    const name = req.session.passport.user.name.givenName
    const apellido = req.session.passport.user.name.familyName
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'jaeden.hills0@ethereal.email',
            pass: 'CgmKPZAsqNJfemdW2k'
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    
   transporter.sendMail({
        from: 'Servidor Node.js',
        to: 'jaeden.hills0@ethereal.email',
        subject: `${method}`,
        html: `[${moment().format("DD/MM/YYYY hh:mm:ss")}] - ${name} ${apellido}`
    })

    next()
    
    }



