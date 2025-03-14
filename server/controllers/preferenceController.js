const { User } = require("../models/userPreferenceModel");

const preferenceController = {};

preferenceController.likeOrDislike = async () => {
  // const { username, nameOfPlace, types } = req.body;
  const username = "username";
  const nameOfPlace = "McDonalds";
  const types = ["restaurant", "food", "customer service"];
  const update = {};

  if(rating === "like") {
    
  } else if (rating === "dislike") {

  } else if (rating === "neutral") {

  }

  const updateUser = await User.findOneAndUpdate({ user }, update, { upsert: true, new: true })
};

module.exports = preferenceController;
