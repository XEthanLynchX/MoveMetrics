const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');

// Login user
module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid email or password');
    }

    // Generate a JWT
    const token = jwt.sign({ userId: user._id }, 'your-secret-key');
    console.log('User logged in:', user);
    res.status(200).json({ token });
  } catch (err) {
    console.log('Login error:', err);
    res.status(400).json({ message: err.message });
  }
}

// Signup user
module.exports.signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {

    // Validation
    if (!firstName || !lastName) {
      throw Error('First and last name are required');
    }
  
    if(firstName.length < 2 || lastName.length < 2) {
      throw Error('First and last name must be at least 2 characters long');  
    }
  
    if (!email || !password) {
      throw Error('Email and password are required');
    }
  
    if (!validator.isEmail(email)) {
      throw Error('Email is invalid');
    }
  
    if (!validator.isStrongPassword(password)) {
      throw Error('Password Must be at least 8 characters long, contain at least 1 lowercase, 1 uppercase, 1 number, and 1 symbol');
  }
    const exists = await User.findOne({ email });
    if (exists) {
      throw new Error('Email already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ firstName, lastName, email, password: hashedPassword });
    console.log('User created:', user);

    // Generate a JWT
    const token = jwt.sign({ userId: user._id }, 'your-secret-key');
    res.status(201).json({ token });
  } catch (err) {
    console.log('Signup error:', err);
    console.log("hi");
    res.status(400).json({ message: err.message });
  }
}
