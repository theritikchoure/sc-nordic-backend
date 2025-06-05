require("dotenv").config();

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const db = require("./config/database");

const User = require("./models/users.model");
const apiRoutes = require("./routes/index.route");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(cors());

app.use("/api", apiRoutes);

app.listen(PORT, () => {
    console.log(`Server started on PORT: `, PORT)
})