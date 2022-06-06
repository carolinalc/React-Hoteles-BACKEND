const { Schema, model } = require("mongoose");
const valoracion = require("../utils/valoracion");

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
        enum: valoracion
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
