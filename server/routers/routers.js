//Boilerplate imports------------------------------
const express = require("express");
const router = express.Router();
// const authenticationController = require('../controllers/authenticationController');
const googleApiController = require("../controllers/googleApiController");
const userQueryController = require("../controllers/userQueryController");
const openaiApiController = require("../controllers/openaiController");
const authenticationController = require("../controllers/authenticationController")

// //post request to handle logins -> tested and works
router.post('/login', authenticationController.login, (req, res) => {
  return res.status(200).send('This is the working login button');
});

router.post("/register", authenticationController.register, (req, res) => {
  return res.status(200).send("This is the working register submit button");
});

router.post("/clear", authenticationController.delete, (req, res) => {
  return res.status(200).send("Cleared the database.");
})

router.post(
  "/userquery",
  userQueryController.parseQuery,
  openaiApiController.userQuery,
  googleApiController.getEvents,
  openaiApiController.createResponse,
  (req, res) => {
    return res.status(200).send(res.locals.gptFields);
  }
);


//Export the router---------------------------
module.exports = router;
