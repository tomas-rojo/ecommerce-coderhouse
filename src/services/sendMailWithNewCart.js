const nodemailer = require("nodemailer");
const { GMAIL_EMAIL, GMAIL_PASS, EMAIL_ADMIN } = require('../config/globals')

exports.sendMailWithNewCart = (data, user_name) => {  
  const cartData = JSON.parse((JSON.stringify(data)))
  const arr = cartData[0].products
  // const arr = cartData[0].products
  // arr.map(product => console.log(product))
  //cartData[0].user_id
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
      subject: `Nuevo pedido de ${user_name}`,
      html: `<h1>Nueva compra realizada: </h1> 
            <div>
                 ${arr.map(product => ` <p> * ${product.name} - $ ${product.price}</p>  ` )}
            </div>
            `,
      }
    
    transporter.sendMail(mailOptions);

  } catch (error){
    res.send(error)
  }

  return
};
