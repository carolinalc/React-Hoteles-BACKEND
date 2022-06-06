const { Schema, model } = require("mongoose");
const categorias = require("../utils/categorias");
const pension = require("../utils/pension");

const  HotelSchema = new Schema({
    nombre: {
        type: String
    },
    imagen: {
        type: String
    },
    estrellas: {
        type: String
    },
   categorias: {
        type: String,
        enum: categorias
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
        enum: pension
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
