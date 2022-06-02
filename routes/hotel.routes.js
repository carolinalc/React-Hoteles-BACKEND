const router = require("express").Router();
const HotelModel = require("../models/Hotel.Model")
const isAuthenticated = require("../middleware/isAuthenticated")
const isAdmin = require("../middleware/isAdmin")

//EL CRUD DE LOS HOTELES

//GET "/api/hotels" => ver todos los hoteles
router.get("/", isAuthenticated, async (req, res, next)=>{

    console.log(req.payload._id) // para ver si esta logueado

    try {
        const response = await HotelModel.find().select("nombre", "estrellas", "image")
        res.json(response)
        
    } catch (error) {
        next(error)
        
    }


})


//POST "/api/create" => crear un nuevo hotel 
router.post("/create", isAdmin, async (req, res, next)=>{

    const {nombre, estrellas, categorias, ubicacion, precios, pension, descripcion} = req.body

    try {
        const response = await HotelModel.create({
            nombre, 
            estrellas, 
            categorias, 
            ubicacion, 
            precios, 
            pension, 
            descripcion
        })
    } catch (error) {
        next(error)
    }


})


//GET "/api/hotels/:id" => ver los detalles de un hotel
router.get("/:id", async (req, res, next)=>{

    const {id} =req.params

    try {
        const reponse = await HotelModel.findById(id)
        res.json(reponse)
        
    } catch (error) {
        next(error)
    }

})


//DELETE "/api/hotels/:id" => borrar un hotel
router.delete("/:id", isAdmin, async (req, res, next)=>{

    const {id} =req.params

    try {
        
        await HotelModel.findByIdAndDelete(id)
        res.json("El Hotel ha sido elimidado de nuestras listas")
        
    } catch (error) {
        next(error)
    }

})


//PATCH "/api/hotels/:id" => editar un hotel
router.patch("/:id", async (req, res, next)=>{
   
    const {id} =req.params
    const {nombre, estrellas, categorias, ubicacion, precios, pension, descripcion } = req.body
    console.log(req.body)

    try {
        //no hace falta const porque no  necesita lla llamada de la base de datos con lo que esta borrando
        await TodoModel.findByIdAndUpdate(id, {
            nombre, 
            estrellas, 
            categorias, 
            ubicacion, 
            precios, 
            pension, 
            descripcion
        })
        res.json("La informacion del hotel ha sido actualizada")//no importa el que pero siempre tiene que haber una respuesta
        
    } catch (error) {
        next(error)
    }

})

module.exports = router;