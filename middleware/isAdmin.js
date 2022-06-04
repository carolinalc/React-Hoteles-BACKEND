
const isAdmin = (req, res, next) => {
    if(req.payload.role === "admin"){
        next()
    }else{
        res.json({errorMessage: "You are not manager"});
    }
}

module.exports = isAdmin