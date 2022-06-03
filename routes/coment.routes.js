const router = require("express").Router();
const ComentModel = require("../models/Coment.model.js");
const HotelModel = require("../models/Hotel.Model.js");
const UserModel = require("../models/User.model.js");
const isAuthenticated = require("../middleware/isAuthenticated")

//CRUD DE LOS COMENTARIOS

//GET "/api/hotels/:id"
router.get("/:id/coment", isAuthenticated, async (req, res, next)=>{

    const {id} = req.params
    const {_id} = req.payload
     
    try {
        const comentHotel = await ComentModel.find({hotelId: id}).populate("clienteId", "username")
        const hotelDetails = await HotelModel.findById(id)
        res.json({
            hotelDetails, 
            comentHotel
        })
        
    } catch (error) {
        next(error)
    }

})


//POST "/api/hotels/:id" => crear comentario
router.post("/:id/coment", isAuthenticated, async (req, res, next) =>{

    const {id} = req.params
    const {_id} = req.payload
    const {clienteId, comentario, valoracion, hotelId} = req.body

    try {
        const nameUser = await UserModel.findById(_id)
        const comentHotel = await ComentModel.create({
            clienteId: nameUser, 
            comentario, 
            valoracion, 
            hotelId: id
        })
        res.json(comentHotel)
        
    } catch (error) {
        next(error)
    }
})




module.exports = router;