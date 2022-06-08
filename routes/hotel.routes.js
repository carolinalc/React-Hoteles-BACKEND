const router = require("express").Router();
const HotelModel = require("../models/Hotel.Model")
const isAdmin = require("../middleware/isAdmin.js")
const categorias = require("../utils/categorias")
const pension = require("../utils/pension")
const checkin = require("../utils/checkin")
const valoracion = require("../utils/valoracion");
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

//GET "/api/hotels/selectores" => Esta ruta está creada para mostrar en la selección del formulario las categorias y pension del modelo
 router.get("/selectores",isAuthenticated, async (req, res, next) => {
    try {

         res.json({categorias, pension, checkin, valoracion})
        
     } catch (error) {
         next(error)
     }

})

//GET "/api/hotels/ciudad" => renderizar solo la categoría ciudad
router.get("/ciudad", async (req, res, next) => {
    try {
        const ciudadCategorie = await HotelModel.find({categorias: "ciudad"})
        res.json(ciudadCategorie)
        
    } catch (error) {
        next(error)
    }
})

//GET "/api/hotels/resort" => renderizar solo la categoría resort
router.get("/resort", async (req, res, next) => {
    try {
        const resortCategorie = await HotelModel.find({categorias: "resort"})
        res.json(resortCategorie)
        
    } catch (error) {
        next(error)
    }
})

//GET "/api/hotels/rural" => renderizar solo la categoría rural
router.get("/rural", async (req, res, next) => {
    try {
        const ruralCategorie = await HotelModel.find({categorias: "rural"})
        res.json(ruralCategorie)
        
    } catch (error) {
        next(error)
    }
})

//GET "/api/hotels/tematico" => renderizar solo la categoría tematico
router.get("/tematico", async (req, res, next) => {
    try {
        const tematicoCategorie = await HotelModel.find({categorias: "tematico"})
        res.json(tematicoCategorie)
        
    } catch (error) {
        next(error)
    }
})


<<<<<<< HEAD
//POST "/api/hotels/create" => crear un nuevo hotel -- cloudinary.single("imagen")
=======
//POST "/api/hotels/create" => crear un nuevo hotel 
>>>>>>> b593c13f9fb6ea26974bcb4cf166a8f192718aa6
router.post("/create", isAuthenticated, isAdmin, async (req, res, next) => {

    const {nombre, estrellas, categorias, ubicacion, precios, pension, descripcion } = req.body

    try {
        const response = await HotelModel.create({
            nombre, 
            estrellas, 
            categorias, 
            ubicacion, 
            precios, 
            pension, 
            descripcion,
<<<<<<< HEAD
            //imagen: req.file.path
=======
            imagen
>>>>>>> b593c13f9fb6ea26974bcb4cf166a8f192718aa6
         
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
router.patch("/:id", isAuthenticated, isAdmin, async (req, res, next)=>{
    
    const {id} = req.params
    const {nombre, estrellas, categorias, ubicacion, precios, pension, descripcion, imagen } = req.body
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
            imagen

        }, {new: true})

        res.status(200).json("La informacion del hotel ha sido actualizada")//no importa el que pero siempre tiene que haber una respuesta
        
    } catch (error) {
        next(error)
    }

})

module.exports = router;