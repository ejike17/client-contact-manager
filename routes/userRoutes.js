const express = require("express");
const { loginUser, registerUser, currentUser } = require("../controller/userController");
const validateToken = require("../middleware/validatToken.js");

const router = express.Router();

router.route("/login").post(loginUser);
router.route("/register").post(registerUser);
router.get("/current-user", validateToken, currentUser)
/* router.route("/current-user").get(currentUser); */

module.exports = router;