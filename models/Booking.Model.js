const { Schema, model } = require("mongoose")
const checkin = require("../utils/checkin")

const  BookingSchema = new Schema({
    fechaEntrada: {
        type: String,
    },
    fechaSalida: {
        type: String
    },
    huespedes: {
        type: Number
    },
   checkin: {
        type: String,
        enum: checkin
    },
   comentarios: {
        type: String,
            
    },
    clienteId: {
        type: Schema.Types.ObjectId,
        ref: "User"
  },
    hotelId: {
        type: Schema.Types.ObjectId,
        ref: "Hotel"
  },
   })

const  BookingModel = model(" Booking",  BookingSchema)

module.exports =  BookingModel
