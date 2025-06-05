const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/users.model");
const { registerSchema, loginSchema } = require("../validators/authValidator");
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key"; // Use env var in prod

// Export it
module.exports = { register, login };

async function register(req, res) {
  try {
    // Validate request body using Zod schema
    const { username, password } = registerSchema.parse(req.body);

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the user's password securely
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user document
    const newUser = new User({
      username,
      password: hashedPassword,
      name: "Ritik", // You can make this dynamic if needed
    });

    //Save the user to the database
    await newUser.save();

    // Send a success response with created user (excluding password ideally)
    const { password: _, ...userData } = newUser.toObject(); // omit password
    res.status(201).json({
      message: "User registered successfully",
      data: userData,
    });
  } catch (err) {
    if (err.name === "ZodError") {
      return res.status(400).json({
        error: "Validation error",
        message: err.errors[0].message,
        details: err.errors,
      });
    }

    console.error("Registration error:", err);
    res.status(500).json({ error: "Server error" });
  }
}



async function login(req, res) {
  try {
    //Validate incoming data
    const { username, password } = loginSchema.parse(req.body);

    //Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    //Compare password hashes
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    //Success: return user data (exclude password)
    const { password: _, ...userData } = user.toObject();

    // Generate JWT token
    const tokenPayload = {
      userId: user._id,
      username: user.username,
    };
    const token = jwt.sign(tokenPayload, JWT_SECRET, {
      expiresIn: "1h", // Token valid for 1 hour
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: userData,
    });
  } catch (err) {
    if (err.name === "ZodError") {
      return res.status(400).json({
        error: "Validation error",
        message: err.errors[0].message,
        details: err.errors,
      });
    }
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
}
  
