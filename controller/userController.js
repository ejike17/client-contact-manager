const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const bCrypt = require("bcrypt");

//@desc Login user
//@route POST /api/user
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Please enter an email and password");
  }
    const user = await User.findOne({ email });
    if (user && (await bCrypt.compare(password, user.password))) {
        const accessToken = jwt.sign(
          {
            user: {
              username: user.username,
              email: user.email,
              id: user.id,
            },
          },
            process.env.ACCESS_TOKEN,
          {expiresIn:"15m"}
        );
        res.status(200).json({accessToken})
    } else {
        res.status(401)
        throw new Error("No such email or password")
    }
/*   res.send({ message: "Login User" }); */
});

//@desc Register user
//@route POST /api/user
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const userContact = await User.findOne({ email });
  if (userContact) {
    res.status(400);
    throw new Error("Email already exist in database");
  }

  const hashedPassword = await bCrypt.hash(password, 10);

  const user = User.create({
    username,
    email,
    password: hashedPassword,
  });

  if (user) {
    console.log("User Created successffully...");
    res.status(200).json({
      _id: user.id,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Error occurred while creating user...");
  }
});

//@desc Show current user
//@route GET /api/user
//@access private

const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user)
});

module.exports = { loginUser, registerUser, currentUser };
