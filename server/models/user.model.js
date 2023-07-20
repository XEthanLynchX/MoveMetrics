const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const validator = require('validator');
const userSchema = new mongoose.Schema({

  //This is going to be the blueprint for our User objects in our database
  //We are going to use this blueprint in our controller file
  firstName: {
    type: String,
    required: [true, "First name is required"]
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be 8 characters or longer"]
  }

}, {timestamps: true});


//sign up
userSchema.statics.signUp = async function(firstName, lastName, email, password) {

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error('Email already exists');
  }

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

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await this.create({ firstName, lastName, email, password: hashedPassword });
  console.log(user);
  return user;
};

//static login method
userSchema.statics.login = async function(email, password) {

  //validation
  if (!email || !password) {
    throw Error('Email and password are required');
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error('Invalid email or password');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw Error('Invalid email or password');
  }

  return user;
};




module.exports = mongoose.model("User", userSchema);




