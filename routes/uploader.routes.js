const router = require("express").Router();

const uploader = require("../middleware/cloudinary.js")

router.post("/", uploader.single("imagen"), (req, res, next) => {

    console.log(req.file.path)

    res.json(req.file.path)
    

})


module.exports = router;
