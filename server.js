const dotenv = require("dotenv").config();
const express = require("express");
const connectDB = require("./config/dbConnect");
const errorHandler = require("./middleware/errorHandler");
const app = express();
const contactRoutes = require("./routes/contactRouter")
const userRoutes = require("./routes/userRoutes")

const port = process.env.PORT || 5000;
connectDB()
app.use(express.json())
app.use("/api/contacts", contactRoutes)
app.use("/api/user", userRoutes)
app.use(errorHandler)

app.listen(port, () => {
  console.log("Server is listening on port 5000... so go get it")
})