const { Schema, model } = require("mongoose");
const { NODE_ENV } = require('../../../config/globals')

const productSchema = new Schema({

        timestamp: { 
          type: Date, 
          default: Date.now 
        },

        name: { 
          type: String, 
          trim: true,
          required: [true, "Completar campo Nombre"] 
        },

        code: {
          type: String,
          trim: true,
          required: [true, "Completar campo Codigo"],
          unique: true,
        },

        description: {
          type: String,
          trim: true,
          required: [true, "Completar campo Descripcion"],
        },

        thumbnail: { 
          type: String,
          trim: true,
          required: [true, "Completar campo Thumbnail"] 
        },

        price: { 
          type: Number,
          trim: true,
          required: [true, "Completar campo Precio"] 
        },

        stock: { 
          type: Number,
          trim: true,
          required: [true, "Completar campo Stock"] 
        }

      },

      { versionKey: false }

);

if (NODE_ENV == "development") {
  console.log("*** RUNNING ON DEV MODE ***")
  module.exports = model('Products_DEV', productSchema)
} else {
  console.log("*** RUNNING ON PRODUCTION MODE ***")
  module.exports = model('Products', productSchema)
}
