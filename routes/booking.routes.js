const BookingModel = require("../models/Booking.Model");
const HotelModel = require("../models/Hotel.Model");
const UserModel = require("../models/User.model")
const isAuthenticated = require("../middleware/isAuthenticated")

const router = require("express").Router();

//CRUD DEL BOOKING

  //GET todo los booking
  router.get("/", isAuthenticated, async (req, res, next) =>{

    try {
       
       const bookingData = await BookingModel.find().populate("clienteId", "username").populate("hotelId", "nombre")
       res.json( bookingData )

        
    } catch (error) {
          next(error)
 }
  })




//POST "/api/booking/:id/create" => crear el booking
router.post("/:id/create", isAuthenticated, async (req, res, next) =>{

    const {id} = req.params
    const {_id} = req.payload
    const { fechaEntrada, huespedes, checkin , comentarios, fechaSalida, clienteId, hotelId } = req.body

console.log(req.body)
console.log(checkin)
    try {
        
        const dataBooking = await BookingModel.create({
            fechaEntrada,
            fechaSalida, 
            huespedes, 
            checkin, 
            comentarios, 
            clienteId: _id, 
            hotelId: id
        })
        res.json(dataBooking)
        
    } catch (error) {
        next(error)
    }
})

//GET "/api/booking/:idBooking"=> visualizar los bookings
router.get("/:idBooking", isAuthenticated, async (req, res, next) =>{

    const {idBooking} = req.params

    try {
       
       const bookingData = await BookingModel.findById(idBooking).populate("clienteId", "username").populate("hotelId", "nombre")
       
       res.json( bookingData )

        
    } catch (error) {
          next(error)
 }
  })


//DELETE "/api/booking/:idBooking/delete" => borrar un booking
router.delete("/:id/delete", isAuthenticated, async (req, res, next)=>{

    const {id} = req.params

    try {
        
        await BookingModel.findByIdAndDelete(id)
        res.json("El Booking ha sido elimidado de la lista")
        
    } catch (error) {
        next(error)
    }

})

//GET "/api/booking/:id/details" => ver los detalles de un booking 
router.get("/:id/details", isAuthenticated, async (req, res, next)=>{

    const {id} = req.params

    try {
        const reponse = await BookingModel.findById(id).populate("clienteId", "username").populate("hotelId", "nombre")
        console.log(reponse)
        res.json(reponse)
        
    } catch (error) {
        next(error)
    }

})




module.exports = router;