require("../db")

const mongoose = require("mongoose")
let hotelsArr = require("./hoteles.json")
const HotelModel = require("../models/Hotel.Model")

const addHotels = async () => {
    try {
        await HotelModel.insertMany(hotelsArr)
        //mongoose.connection.close()
        
    } catch (error) {
        console.log(error)
    }
}

addHotels()