import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      msg: "Bad request. Please add email and password in the request body",
    });
  }

  try {
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      const isMatch = await foundUser.comparePassword(password);

      if (isMatch) {
        const token = jwt.sign(
          { id: foundUser._id, name: foundUser.name },
          process.env.JWT_SECRET,
          { expiresIn: "30d" }
        );

        return res.status(200).json({ msg: "User logged in", token });
      } else {
        return res.status(400).json({ msg: "Bad password" });
      }
    } else {
      return res.status(400).json({ msg: "Bad credentials" });
    }
  } catch (error) {
    console.error("Error in login:", error); // Debugging log
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);

  res.status(200).json({
    msg: `Hello, ${req.user.name}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

export const getAllUsers = async (req, res) => {
  const users = await User.find({});
  return res.status(200).json({ users });
};

export const register = async (req, res) => {
  const foundUser = await User.findOne({ email: req.body.email });
  if (foundUser === null) {
    const { username, email, password } = req.body;
    if (username && email && password) {
      const person = new User({
        name: username,
        email,
        password,
      });
      await person.save();
      return res.status(201).json({ person });
    } else {
      return res.status(400).json({ msg: "Please add all values in the request body" });
    }
  } else {
    return res.status(400).json({ msg: "Email already in use" });
  }
};
