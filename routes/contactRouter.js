const express = require("express");
const router = express.Router();
const {
  getContact,
  getContactId,
  postContact,
  updateContact,
  deleteContact,
} = require("../controller/contactController");
const validateToken = require("../middleware/validatToken");

router.use(validateToken)
router.route("/").get(getContact).post(postContact);
router.route("/:id").get(getContactId).put(updateContact).delete(deleteContact);

module.exports = router;
