const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const  createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
}
// Login user
module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body 
  try {
    const user = await User.login( email , password );
    
    const token = User.createToken(user._id);

    res.status(200).json({ email, token });
  } catch (err) {
    console.log('Login error:', err);
    res.status(400).json({ message: err.message });
  }
}

// Signup user
module.exports.signupUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const user = await User.signUp(firstName, lastName, email, password);

    // Generate a JWT
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (err) {
    console.log('Signup error:', err);
    console.log("hi");
    res.status(400).json({ message: err.message });
  }
}
