const { Schema, model } = require("mongoose");

const  ComentSchema = new Schema({
    clienteId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    comentario: {
        type: String
    },
    valoracion: {
        type: Number,
        enum: [0, 1, 2, 3, 4, 5]
    },
   hotelId: {
        type: Schema.Types.ObjectId,
        ref: "Hotel"
    }
   },
   {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
    }
)

const ComentModel = model("Coment", ComentSchema)

module.exports = ComentModel
