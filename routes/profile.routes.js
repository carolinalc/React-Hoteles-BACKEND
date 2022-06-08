const router = require("express").Router();
const UserModel = require("../models/User.model")
const isAuthenticated = require("../middleware/isAuthenticated")
const cloudinary = require("../middleware/cloudinary.js"); 
const isAdmin = require("../middleware/isAdmin");
const BookingModel = require("../models/Booking.Model");

//EL CRUD DEL PERFIL

//GET "/api/profile/admin"

router.get("/admin", isAuthenticated, isAdmin, async (req, res, next )=> {

    try {

        const admin = await UserModel.find().select("admin")
        res.json(admin)
        
    } catch (error) {
        next(error)
    }

})

router.get("/booking", isAuthenticated, async (req, res, next)=>{

    const {_id} = req.payload
     
    try {
 
    const bookingUser = await BookingModel.find({clienteId: _id}).populate("hotelId", "nombre")
       console.log(bookingUser)
        res.json(bookingUser) 

   
    } catch (error) {
        next(error)
    }

})


//GET "/api/profile" =>poder ver el perfil del user
router.get("/:_id", isAuthenticated, async  (req, res, next) =>{

    const { _id } = req.payload

    try {
        const reponse = await UserModel.findById(_id).select("username email imagen")
        res.json(reponse)
        
    } catch (error) {
        next(error)
    }
   
})


//PATCH "/api/profile/:id" => editar el perfil del usuario
router.patch("/:id", isAuthenticated, async (req, res, next) => {

        const {id} = req.params
        const { username, email} = req.body

    try {
       await UserModel.findByIdAndUpdate(id, {
            username, 
            email, 
            imagen

       }, { new: true })
       res.json("Perfil actualizado")
        
    } catch (error) {
        next(error)
    }
})



module.exports = router;