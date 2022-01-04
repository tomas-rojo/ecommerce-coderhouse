require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 8080,
    NODE_ENV: process.env.NODE_ENV,
    STORAGE: process.env.STORAGE || "mongodb",
    MONGO_URI: process.env.MONGO_URI || "",
    GMAIL_EMAIL: process.env.GMAIL_EMAIL,
    GMAIL_PASS: process.env.GMAIL_PASS,
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    EMAIL_ADMIN: process.env.EMAIL_ADMIN,
    SMS_TWILIO_NUMBER: process.env.SMS_TWILIO_NUMBER,
    WHATSAPP_TWILIO_NUMBER: process.env.WHATSAPP_TWILIO_NUMBER,
    WHATSAPP_ADMIN_NUMBER: process.env.WHATSAPP_ADMIN_NUMBER
}