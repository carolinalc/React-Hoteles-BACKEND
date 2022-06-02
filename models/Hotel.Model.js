const { Schema, model } = require("mongoose");

const  HotelSchema = new Schema({
    nombre: {
        type: String
    },
    image: {
        type: String
    },
    estrellas: {
        type: String
    },
   categorias: {
        type: String,
        enum: ["ciudad", "resort", "rural", "tematico"]
    },
   ubicacion: {
        type: String
        //(mapa)
    },
   precios: {
        type: Number,     
    },
   pension: {
        type: String,
        enum: [ "Con desayuno",  "media pension",  "pension completa"]
    },
   descripcion: {
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
