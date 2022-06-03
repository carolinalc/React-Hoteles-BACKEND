
const isAdmin = (req, res, next) => {
    if(req.payload.role === "admin"){
        next()
    }else{
        res.json({errorMessage: "No eres administrador"});
    }
}

module.exports = isAdmin