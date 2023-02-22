const Contact = require("../models/contactModel");

const asyncHandler = require("express-async-handler");

//@desc Get all contact
//@route GET /api/contacts
//@access public

const getContact = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({});
  res.status(200).json(contacts);
});

//@desc Get contact with ID
//@route GET /api/contacts/:id
//@access public

const getContactId = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      res.status(404);
      return;
      console.log("Contact does not exist")
        throw new Error("No such contact in the database.")
    } else {
      console.log("Contact found in the database")
      res.status(200).json(contact);
    }
});

//@desc Post contact to database
//@route POST /api/contacts
//@access public

const postContact = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(404);
    throw new Error("All fields are mandatory");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id
  });
  res.status(201).json(contact);
});

//@desc Updating contact with ID
//@route PUT /api/contacts/:id
//@access public

const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("File does not exist for deletion");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User is not authorized to update contact")
  }

    const putContact = await Contact.findByIdAndUpdate(
        req.params.id, 
        req.body,
        {new: true}
  );
  res.status(200).json(putContact);
});

//@desc Deleting contact from database
//@route DELETE /api/contacts/:id
//@access public

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("File does not exist for deletion")
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User is not authorized to delete contact")
  }

  const delContact = await Contact.findByIdAndDelete(req.params.id);
  res.status(200).json(delContact);
});

module.exports = {
  getContact,
  getContactId,
  postContact,
  updateContact,
  deleteContact,
};
