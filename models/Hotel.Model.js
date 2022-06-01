const { Schema, model } = require("mongoose");

const  HotelSchema = new Schema({
    nombre: {
        type: String
    },
    estrellas: {
        type: String
    },
   categorías: {
        type: String,
        enum: []
    },
   ubicación: {
        type: String
(mapa)
    },
   precios: {
        type: Number,
        enum: []     
    },
pension: {
   type: String,
   enum: [ "Con desayuno",  "media pension",  "pension completa"]
},
   descripción: {
        type: String
    }
   },
   {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
  )

const HotelModel = model("Hotel", HotelSchema)

module.exports = HotelModel
