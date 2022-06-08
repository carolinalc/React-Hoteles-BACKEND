const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case

const  UserSchema = new Schema({
  username: {
      type: String,
      required: true
  },
  email: {
      type: String,
      unique: true, 
      required: true
  },
 password: {
      type: String,
      required: true
  },
 password2: {
      type: String,
      required: true
  },
imagen: {
      type: String,
      default: "https://res.cloudinary.com/dm5zetu40/image/upload/v1654706961/Imagen%20hoteles/MUJER-USER_idxzgl.png"
  },
 role: {
      type: String,
     enum: ["cliente", "admin"],
     default: "cliente"
  },
  
 },
 {
  // this second object adds extra properties: `createdAt` and `updatedAt`
  timestamps: true,
}
)

const UserModel = model("User", UserSchema)

module.exports = UserModel


