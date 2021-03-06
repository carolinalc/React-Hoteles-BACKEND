const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

// You put the next routes here 👇
// example: router.use("/auth", authRoutes)

const authRoutes = require("./auth.routes.js")
router.use("/auth", authRoutes)

const profileRoutes = require("./profile.routes.js")
router.use("/profile", profileRoutes)

const hotelsRoutes = require("./hotel.routes.js")
router.use("/hotels", hotelsRoutes)

const comentRoutes = require("./coment.routes.js")
router.use("/coment", comentRoutes)

const bookingRoutes = require("./booking.routes.js")
router.use("/booking", bookingRoutes)

const uploaderRouter = require("./uploader.routes.js")
router.use("/uploader", uploaderRouter)

module.exports = router;
