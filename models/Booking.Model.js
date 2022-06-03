const { Schema, model } = require("mongoose")

const  BookingSchema = new Schema({
    fecha: {
        type: String,
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
