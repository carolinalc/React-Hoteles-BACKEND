const router = require("express").Router();
const HotelModel = require("../models/Hotel.Model")
const isAdmin = require("../middleware/isAdmin.js")
const categorias = require("../utils/categorias")
const pension = require("../utils/pension")
const hotelsCreados = require("../seeds/hoteles.json");
const isAuthenticated = require("../middleware/isAuthenticated");
const cloudinary = require("../middleware/cloudinary.js") 

//EL CRUD DE LOS HOTELES

//GET "/api/hotels" => ver todos los hoteles
router.get("/", async (req, res, next)=>{

    //console.log(req.payload.id) // para ver si esta logueado

    try {
        const response = await HotelModel.find()
        res.json(response)
        console.log(response)
        
    } catch (error) {
        next(error)
        
    }


})


//POST "/api/create" => crear un nuevo hotel 
router.post("/create", isAuthenticated, isAdmin, cloudinary.single("imagen"), async (req, res, next) => {

    const {nombre, estrellas, categorias, ubicacion, precios, pension, descripcion} = req.body

    try {
        const response = await HotelModel.create({
            nombre, 
            estrellas, 
            categorias, 
            ubicacion, 
            precios, 
            pension, 
            descripcion,
            image: req.file.path
         
        })
        res.json(response)
    } catch (error) {
        next(error)
    }


})


//GET "/api/hotels/:id" => ver los detalles de un hotel
router.get("/:id", isAuthenticated, async (req, res, next)=>{

    const {id} =req.params

    try {
        const reponse = await HotelModel.findById(id)
        res.json(reponse)
        
    } catch (error) {
        next(error)
    }

})


//DELETE "/api/hotels/:id" => borrar un hotel
router.delete("/:id", isAuthenticated, isAdmin, async (req, res, next)=>{

    const {id} =req.params

    try {
        
        await HotelModel.findByIdAndDelete(id)
        res.json("El Hotel ha sido elimidado de nuestras listas")
        
    } catch (error) {
        next(error)
    }

})


//PATCH "/api/hotels/:id" => editar un hotel
router.patch("/:id", isAuthenticated, isAdmin, cloudinary.single("imagen"), async (req, res, next)=>{
   
    const {id} = req.params
    const {nombre, estrellas, categorias, ubicacion, precios, pension, descripcion } = req.body
    console.log(req.body)

    // if(!nombre || !estrellas || !categorias || !ubicacion || !precios || !pension || !descripcion){
    //     return res.status(400).json("Todos los campos deben estar completados")
    // } => No queremos que se actualicen todos los datos, solo los que sean necesarios

    try {
        //no hace falta const porque no  necesita lla llamada de la base de datos con lo que esta borrando
        await HotelModel.findByIdAndUpdate(id, {
            nombre, 
            estrellas, 
            categorias, 
            ubicacion, 
            precios, 
            pension, 
            descripcion,
            imagen: req.file.path
        }, { new: true })
        res.json("La informacion del hotel ha sido actualizada")//no importa el que pero siempre tiene que haber una respuesta
        
    } catch (error) {
        next(error)
    }

})

module.exports = router;