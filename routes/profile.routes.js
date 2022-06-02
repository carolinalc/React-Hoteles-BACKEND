const router = require("express").Router();
const UserModel = require("../models/User.model")
const isAuthenticated = require("../middleware/isAuthenticated")

//EL CRUD DEL PERFIL

//GET "/aip/profile" =>poder ver el perfil del user
router.get("/profile", isAuthenticated, async  (req, res, next) =>{

    try {
        const reponse = await UserModel.find().select("username", "email", "DOB", "imagen")
        res.json(reponse)
        
    } catch (error) {
        next(error)
    }
   
})


module.exports = router;