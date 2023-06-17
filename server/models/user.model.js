const UserSchema = new mongoose.Schema({

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
    required: [true, "Email is required"]
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be 8 characters or longer"]
  }
}, {timestamps: true});