const router = require("express").Router();
const UserModel = require("../models/User.model.js")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const isAuthenticated = require("../middleware/isAuthenticated")


//POST "/api/auth/signup" => registrar un usuario
router.post("/signup", async(req, res, next) =>{
    const { email, password, password2, username } = req.body

    if(!email || !password || !password2 || !username) {
        res.status(400).json({errorMessage: "There are some details missing"})
        return;
    }

    if( password !== password2){
        res.status(400).json({errorMessage: "Password don´t match!"})
        return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/

    if(!passwordRegex.test(password)){
        res.status(400).json({errorMessage: "Your password need between 8 and 15 characters, one number, at least one capital and lower letter, one special character and not blank space"})
        return;
    }

    try {
        const foundUser = await UserModel.findOne({$or: [{username: username}, {email: email}]})
        if(foundUser !== null){
            res.status(400).json({errorMessage: "You already have an account"})
            return;
        }

        const salt = await bcryptjs.genSalt(12);
        const hashPasword = await bcryptjs.hash(password, salt)
        const hashPasword2 = await bcryptjs.hash(password2, salt)
        const createUser = await UserModel.create({
            username, 
            email,
            password: hashPasword,
            password2: hashPasword2
        })

        res.json("Todo bien, usuario creado")


    } catch (error) {
        next(error)
    }

})

// POST "/api/auth/login" => acceder como usuario: verificar las credenciales y abrir sesion
router.post("/login", async(req, res, next) =>{

    const{email, password} = req.body

    try {
        const foundUser = await UserModel.findOne({email})
        if(foundUser === null){
            res.status(400).json({errorMessage: "This email already have an account"})
            return;
        }

        const passwordMatch = await bcryptjs.compare(password, foundUser.password)
        if(passwordMatch === false){
            res.status(401).json({errorMessage: "Your password is incorrect"})
            return;
        }

        const payload = {
            _id: foundUser._id,
            email: foundUser.email,
            username: foundUser.username,
            role: foundUser.role
        }

        const authToken = jwt.sign(
            payload,
            process.env.TOKEN_SECRET,
            {algorithm: "HS256", expiresIn: "10h"}
        )
        
        res.json({authToken: authToken})

    } catch (error) {
        next(error)
    }

})



//GET "api/auth/verify" => chequea que el Token es valido, la ruta se usa para el flujo de FrontEnd
router.get("/verify", isAuthenticated, (req, res, next) => {
    res.json(req.payload)
})


module.exports = router;