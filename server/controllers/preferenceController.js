const { User } = require("../models/userPreferenceModel");

const preferenceController = {};

preferenceController.likeOrDislike = async () => {
  // const { username, nameOfPlace, types } = req.body;
  const username = "username";
  const nameOfPlace = "McDonalds";
  const types = ["restaurant", "food", "customer service"];

  const updateUser = await User.findOneAndUpdate({})
};

module.exports = preferenceController;
