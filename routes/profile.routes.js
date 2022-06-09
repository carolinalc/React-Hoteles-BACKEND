const router = require("express").Router();
const UserModel = require("../models/User.model")
const isAuthenticated = require("../middleware/isAuthenticated") 
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


//GET "/api/profile/booking" => visualizar los propios bookings en el perfil del cliente
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


//GET "/api/profile" => poder ver el perfil del user
router.get("/user", isAuthenticated, async  (req, res, next) =>{

    const { _id } = req.payload

    try {
        const response = await UserModel.findById(_id).select("username email imagen")
        res.json(response)
        
    } catch (error) {
        next(error)
    }
   
})


//PATCH "/api/profile/edit" => editar el perfil del usuario
router.patch("/:id/edit", isAuthenticated, async (req, res, next) => {

        const {_id} = req.payload
        const { username, email, imagen} = req.body

    try {
       await UserModel.findByIdAndUpdate(_id, {
            username, 
            email, 
            imagen

       })
       res.status(200).json("Perfil actualizado")
        
    } catch (error) {
        next(error)
    }
})


//DELETE "/api/profile/:id/delete"
router.delete("/delete", isAuthenticated, async (req, res, next)=>{



    try {
        
        await BookingModel.findOneAndDelete()
        res.json("El Booking ha sido elimidado de la lista")
        
    } catch (error) {
        next(error)
    }

})



module.exports = router;