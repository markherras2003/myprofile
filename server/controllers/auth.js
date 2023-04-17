import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* Register User Execution */
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* Login Controller Execution */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    // Email Does not exist
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    // Check user password if match
    const isMatch = await bcrypt.compare(password, user.password);
    // return invalid credentials if not match
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });
    //execute jwt token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;

    //output token and user data
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
