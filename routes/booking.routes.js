const BookingModel = require("../models/Booking.Model");
const HotelModel = require("../models/Hotel.Model");
const UserModel = require("../models/User.model")
const isAuthenticated = require("../middleware/isAuthenticated")
const checkin = require("../utils/checkin")

const router = require("express").Router();

//CRUD DEL BOOKING


//POST "/api/hotels/:id/booking" => crear el booking
router.post("/:idHotel/booking/create", isAuthenticated, async (req, res, next) =>{

    const {idHotel} = req.params
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
            hotelId: idHotel
        }, {new: true})
        res.json(dataBooking)
        
    } catch (error) {
        next(error)
    }
})

//GET "/api/hotels/booking"=> visualizar bookings
router.get("/:idBooking/booking", isAuthenticated, async (req, res, next) =>{

    const {idBooking} = req.params

    try {
       
       const bookingData = await BookingModel.findById(idBooking).populate("clienteId", "username").populate("hotelId", "nombre")
       
       res.json({ bookingData })

        
    } catch (error) {
          next(error)
 }
  })


module.exports = router;