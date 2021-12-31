const { Schema, model } = require('mongoose')

const orderSchema = new Schema({

        user_id: {
            type: String
        }, 

        products: { 
            type : Array, 
            default: [] 
        },

        timestamp: { 
            type : Date, 
            default: Date.now 
        }

    }, 

    { versionKey: false }

);

module.exports = model('Order', orderSchema)