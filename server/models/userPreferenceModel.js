const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
const dotenv = require("dotenv")

const mongoDB_URI = process.env.MONGO_URI

mongoose
  .connect(mongoDB_URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    dbName: "recApp",
  })
  .then(() => "Connected to Mongo DB.")
  .catch((err) => console.log(err));

const Schema = mongoose.Schema;

const userInfo = new Schema({
    username: {type: String, required:true},
    password: {type: String, required:true},
    location: {type: String, required:true},
    preferences: [{
        likedOrNot: String,
        placeName: String
    }],
})
const User = mongoose.model("user", userInfo)

module.exports = { User }
