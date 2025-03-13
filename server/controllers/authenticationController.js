const { User } = require("../models/userPreferenceModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authenticationController = {};

authenticationController.login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    // Find user by username and password
    const user = await User.findOne({ username });

    if(!user) {
        console.log('🤔 User.findOne has exited early!')
        return next({
          log: 'Incorrect username in authenticationController',
          status: 400,
          message: { error: 'Incorrect Username.' },
        })
    } else if (user) {
      console.log("User authenticated:", user);
      const checker = await bcrypt.compare(password, user.password);
      console.log('Checker', checker);
      if(!checker) {
        console.log('bcrypt.compare is mad')
        return next({
            log: "Incorrect password in authenticationController.login (bcrypt.compare)",
            status: 400, 
            message: { error: "Incorrect Password" }
        })
      }
      return next();
    } else {
      return res.status(400).json("Invalid username or password");
    }
  } catch (error) {
    console.error("Error:", error);
    return next({
      log: "You are receiving an error from the authenticationController.login",
      status: 500,
      message: { err: "This is a 500 error message" },
    });
  }
};

authenticationController.register = async (req, res, next) => {
  const { username, password, location } = req.body;
  try {
    const userExists = await User.findOne({ username: username });
    if (userExists) {
      return next({
        log: "Already existing username in authenticationController",
        status: 400,
        message: { error: "User already exists" },
      });
    }

    const salt = await bcrypt.genSalt(6);
    const hashedPass = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username: username,
      password: hashedPass,
      location: location,
    });
    return next();
  } catch (error) {
    console.error("Error:", error);
    return next({
      log: "You are receiving an error from the authenticationController.register",
      status: 500,
      message: { err: "This is a 500 error message" },
    });
  }
};

authenticationController.delete = async (req, res, next) => {
  const deleteUsers = await User.deleteMany({});
  console.log("Cleared the database.");
  return next();
};

module.exports = authenticationController;
