const { Schema, model } = require('mongoose')

const cartSchema = new Schema({

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

module.exports = model('Cart', cartSchema)
