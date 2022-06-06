const BookingModel = require("../models/Booking.Model");
const HotelModel = require("../models/Hotel.Model");
const UserModel = require("../models/User.model");
const isAuthenticated = require("../middleware/isAuthenticated")

const router = require("express").Router();

//CRUD DEL BOOKING

//GET "/api/hotels/:id/booking"=> visualizar bookings
router.get("/:id/booking", isAuthenticated, async (req, res, next) =>{

    const {id} = req.params
    const {_id} = req.payload
    

    try {
        const dataHotel = await HotelModel.findById(id).select("precios pension")
        const bookingtHotel = await BookingModel.find({hotelId: id}).populate("clienteId", "username")
        res.json({
            dataHotel,
            bookingtHotel
        })
        
    } catch (error) {
        next(error)
    }
})



//POST "/api/hotels/:id/booking" => crear el booking
router.post("/:id/booking/create", isAuthenticated, async (req, res, next) =>{

    const {id} = req.params
    const {_id} = req.payload
    const { fecha, huespedes, checkin, comentarios, clienteId, hotelId } = req.body


    try {
        const dataHotel = await HotelModel.findById(id).select("name precios pension")
        const dataUser = await UserModel.findById(_id).select("username")
        const dataBooking = await BookingModel.create({
            fecha, 
            huespedes, 
            checkin, 
            comentarios, 
            clienteId: dataUser, 
            hotelId: dataHotel
        })
        res.json(dataBooking)
        
    } catch (error) {
        next(error)
    }
})





module.exports = router;