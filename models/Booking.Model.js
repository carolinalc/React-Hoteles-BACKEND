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
        enum: ["10:00-13:00", "16:00- 19:00", "Special Time" ]
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
