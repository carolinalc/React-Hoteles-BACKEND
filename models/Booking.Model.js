const { Schema, model } = require("mongoose")

const  ReservaSchema = new Schema({
    fecha: {
        type: String
    },
    huespedes: {
        type: Number
    },
   checkin: {
        type: String,
        enum: []
    },
   comentarios: {
        type: String,
            
    },
clienteId: {
   type: Schma.Type.ObjectId,
  ref: "Usuario"
  },
   hotelId: {
   type: Schma.Type.ObjectId,
  ref: "Hotel"
  },
   })

const  ReservaModel = model(" Reserva",  ReservaSchema)

module.exports =  ReservaModel
