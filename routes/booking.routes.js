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
//  router.get("/:idBooking/booking", isAuthenticated, async (req, res, next) =>{

//      const {idBooking} = req.params
//      const {_id} = req.payload
//      const { idHotel } = req.body

//      try {
//          const bookingModel = await BookingModel.findById(idBooking).populate("fechaEntrada fechaSalida huespedes checkin comentarios")
//          const dataHotel = HotelModel.findById(idHotel).populate("pension precios")
//          const dataUser = UserModel.findById(_id).populate( "username")
//          res.json({bookingModel, dataHotel, dataUser})
        
//      } catch (error) {
//          next(error)
//      }
//  })

router.get("/:idBooking/booking", isAuthenticated, async (req, res, next) =>{

    const {idBooking} = req.params
    const {_id} = req.payload
    const {idHotel} = req.body

    try {
       const dataHotel = await HotelModel.findById(idHotel)
       const bookingtHotel = await BookingModel.find(idBooking).populate("clienteId", "username")
       const dataUser = await UserModel.findById(_id).select("username")
       res.json({
           dataHotel,
           bookingtHotel,
           dataUser
       })

        
    } catch (error) {
          next(error)
 }
  })


module.exports = router;