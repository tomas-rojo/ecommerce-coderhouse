const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, SMS_TWILIO_NUMBER, WHATSAPP_TWILIO_NUMBER, WHATSAPP_ADMIN_NUMBER } = require("../config/globals");

const twilioClient = require("twilio")(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

exports.sendWhatsappToAdmin = async (name, email) => {
  try {
    await twilioClient.messages.create({
      body: `\n Nuevo pedido de: ${name} \n ${email}`,
      from: `whatsapp:${WHATSAPP_TWILIO_NUMBER}`,
      to: `whatsapp:${WHATSAPP_ADMIN_NUMBER}`
    });
  } catch (err) {
    console.log(err)
  }
  return
};

exports.sendSmsToUser = async (phone_number) => {
  try {
    await twilioClient.messages.create({
      body: "Recibimos tu pedido y ya se encuentra en proceso.",
      from: SMS_TWILIO_NUMBER,
      to: phone_number
    });
  } catch (err) {
    console.log(err)
  }
  return
};
