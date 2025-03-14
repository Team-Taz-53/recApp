//Boilerplate imports------------------------------
const express = require("express");
const router = express.Router();
// const authenticationController = require('../controllers/authenticationController');
const googleApiController = require("../controllers/googleApiController");
const userQueryController = require("../controllers/userQueryController");
const openaiApiController = require("../controllers/openaiController");
const authenticationController = require("../controllers/authenticationController")
const preferenceController = require("../controllers/preferenceController")

// //post request to handle logins -> tested and works
router.post('/login', authenticationController.login, (req, res) => {
  return res.status(200).send('This is the working login button');
});

router.post("/register", authenticationController.register, (req, res) => {
  return res.status(200).send("This is the working register submit button");
});
router.post("/likeOrDislike", openaiApiController.likeOrDislike, (req, res) => {
  return res.status(200).send("Opinion sent.")
})

router.post(
  '/userquery',
  userQueryController.parseQuery,
  openaiApiController.userQuery,
  googleApiController.getEvents,
  openaiApiController.createResponse,
  (req, res) => {
    return res.status(200).send(res.locals.filteredRecs);
  }
);

router.post(
  '/userMusicQuery',
  userQueryController.parseQuery,
  openaiApiController.userQuery,
  googleApiController.getEvents,
  openaiApiController.createMusicResponse,
  (req, res) => {
    return res.status(200).send(res.locals.gptMusicFields);
  }
);

router.post(
  '/userFoodQuery',
  userQueryController.parseQuery,
  openaiApiController.userQuery,
  googleApiController.getEvents,
  openaiApiController.createFoodResponse,
  (req, res) => {
    return res.status(200).send(res.locals.gptFoodFields);
  }
);

router.post('/preference',(req, res) => {
  return res.status(200).send(res.locals.gptFoodFields);
})

router.post("/clear", authenticationController.delete, (req, res) => {
  return res.status(200).send("Cleared the database.");
})

//Export the router---------------------------
module.exports = router;
