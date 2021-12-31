const nodemailer = require("nodemailer");
const { GMAIL_EMAIL, GMAIL_PASS, EMAIL_ADMIN } = require('../config/globals')

exports.sendMailWithNewRegisteredUser = (data) => {  
  const userData = JSON.parse(JSON.stringify(data))

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
          user: GMAIL_EMAIL,
          pass: GMAIL_PASS,
        },
      tls: {
          rejectUnauthorized: false
      }
    });

    const mailOptions = {
      from: "Servidor Node.js",
      to: EMAIL_ADMIN,
      subject: "Nuevo Registro",
      html: `<h1><span>Nuevo usuario registrado: </span>
              <p>Nombre: ${userData.name}</p>      
              <p>Email: ${userData.email}</p>      
            </h1>`,
      }
    
    transporter.sendMail(mailOptions);

  } catch (error){
    res.send(error)
  }

  return
};
